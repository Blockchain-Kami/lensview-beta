<script lang="ts">
    import Icon from "$lib/Icon.svelte";
    import {close, cross, flightTakeoff, tick} from "../../utils/frontend/appIcon";
    import Loader from "$lib/Loader.svelte";
    import {isSignedIn} from "../../services/signInStatus";
    import checkTxHashBeenIndexed from "../../utils/checkTxHashBeenIndexed";
    import Login from "../Login.svelte";
    import postAPublication from "../../utils/frontend/postAPublication";
    import {userProfile} from "../../services/profile";
    import {getNotificationsContext} from 'svelte-notifications';
    import {goto} from "$app/navigation";
    import {fly} from 'svelte/transition'
    import {backInOut} from "svelte/easing";

    const {addNotification} = getNotificationsContext();

    export let showAddNewPostModal: boolean;

    let dialog: HTMLDialogElement;

    $: if (dialog && showAddNewPostModal) dialog.showModal();

    let userEnteredContent = "";
    let contentInvalidReason = "";
    const wordLimit = 1000;
    let isContentInvalid = true;
    let showLoginModal = false;
    let userEnteredUrl = "";
    let isUrlInvalid = false;
    let urlInvalidReason = "";

    let isPublishing = false;

    const checkIfContentIsInvalid = () => {
        const wordCount = calculateWordCount(userEnteredContent);

        console.log("wordCount: ", wordCount);

        if (userEnteredContent.length === 0) {
            contentInvalidReason = "";
            isContentInvalid = true;
        } else if (wordCount > wordLimit) {
            contentInvalidReason = `Words cannot be more than ${wordLimit}`;
            isContentInvalid = true;
        } else {
            contentInvalidReason = "";
            isContentInvalid = false;
        }
    }

    //TODO: When text directly pasted then whole text is calculated as one word, fix this
    const calculateWordCount = (content: string) => {
        // Remove HTML tags using a regular expression
        const cleanContent = content.replace(/<\/?[^>]+(>|$)/g, ' ');

        // Remove extra spaces, new lines, and special characters using regex
        const cleanedText = cleanContent.replace(/\s+/g, ' ').trim();

        // Split the cleaned text into words and count the number of words
        const words = cleanedText.split(' ');

        return words.length;
    }

    const handlePaste = (event) => {
        // Prevent the default paste behavior
        event.preventDefault();

        // Get the pasted text from the clipboard
        const pastedText = (event.clipboardData || window.clipboardData).getData('text/plain');

        // Insert the plain text into the contenteditable div
        const selection = window.getSelection();

        if (selection === null) return;

        if (!selection.rangeCount) return;
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(document.createTextNode(pastedText));

        checkIfContentIsInvalid();
    }

    let postThroughUser = async () => {
        if (!checkIsSignedIn()) {
            showLoginModal = true;
        } else {
            isPublishing = true;
            try {
                const pubId = await addUrlAndGetPubId();
                const txPromise = postAPublication(userEnteredContent, pubId);
                txPromise.then((tx) => {
                    checkUntilPubAdded(tx?.hash, Date.now());
                });
            } catch (err) {
                console.log("error: ", err);
                isPublishing = false;
            }
        }
    };

    const checkUntilPubAdded = async (txHash: string, startTime: number) => {

        /** If post is not added to lens within 25 seconds, then stop checking */
        if (Date.now() - startTime > 25000) {
            isPublishing = false;
            alert("Error adding post");
            return;
        }

        const hasIndexedResponse = await checkTxHashBeenIndexed(txHash);

        if (hasIndexedResponse?.data?.hasTxHashBeenIndexed?.indexed === false) {
            console.log("Waiting for post to be added to graph");
            setTimeout(() => checkUntilPubAdded(txHash, startTime), 100);
        } else {
            isPublishing = false;
            userEnteredContent = "";
            dialog.close();
        }
    };

    const checkIsSignedIn = () => {
        let isSignedInVal;
        const unsubscribe = isSignedIn.subscribe((val) => {
                isSignedInVal = val;
            }
        );
        unsubscribe();

        return isSignedInVal;
    }

    const checkUrlIsValid = () => {
        if (userEnteredUrl.length === 0) {
            isUrlInvalid = true;
            // urlInvalidReason = "URL cannot be empty";
            return;
        }

        const indexOfSpace = userEnteredUrl.indexOf(' ');
        if (indexOfSpace !== -1) {
            isUrlInvalid = true;
            urlInvalidReason = "URL cannot contain spaces";
            return;
        }

        isUrlInvalid = false;
        return;
    }

    const addUrlAndGetPubId = async () => {

        let handle;
        const unsub = userProfile.subscribe((val) => {
            handle = val?.handle;
        });
        unsub();
        try {
            const response = await fetch('/api/add-url-or-post-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "enteredURL": userEnteredUrl,
                    "lensHandle": handle,
                    "postContent": ""
                })
            }).then((res) => {
                if (res.ok)
                    return res.json();
                else
                    throw new Error(res.statusText);
            });

            return response?.parentPubId;
        } catch (error) {
            console.log('error', error);
            throw error;
        }
    }

    const postAnonymously = async () => {
        console.log("successfully requested");
        addNotification({
            position: 'top-right',
            heading: 'Successfully Requested',
            description: 'Your post will be posted anonymously',
            type: flightTakeoff,
            removeAfter: 7000,
        });
        dialog.close();

        try {
            const addedPostDetails = await fetch('/api/add-url-or-post-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "enteredURL": userEnteredUrl,
                    "lensHandle": null,
                    "postContent": userEnteredContent
                })
            }).then((res) => {
                if (res.ok)
                    return res.json();
                else
                    throw new Error(res.statusText);
            });

            console.log("successfully posted anonymously");
            userEnteredContent = "";
            userEnteredUrl = "";

            addNotification({
                position: 'top-right',
                heading: 'Successfully Posted',
                description: 'Your post was successfully posted anonymously. Click on "View Post" to see your post',
                type: tick,
                removeAfter: 12000,
                ctaBtnName: "View Post",
                ctaFunction: () => {
                    goto(`/posts/${addedPostDetails?.parentPubId}`);
                }
            });
        } catch (error) {
            console.log('error', error);
            addNotification({
                position: 'top-right',
                heading: 'Failed To Post',
                description: 'Your post was not posted anonymously. Please try again',
                type: cross,
                removeAfter: 20000
            });
            throw error;
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<dialog
        bind:this={dialog}
        on:close={() => (showAddNewPostModal = false)}
        on:click|self={() => dialog.close()}
>
    {#if showAddNewPostModal}
        <main on:click|stopPropagation transition:fly={{ y: 40, easing: backInOut, duration: 700 }}>
            <div class="CenterRowFlex head">
                <div class="h3 head__title">
                    Create a New Post
                </div>
                <div class="head__close-btn">
                    <button on:click={() => dialog.close()}>
                        <Icon d={close}/>
                    </button>
                </div>
            </div>
            <div class="body">
                <div class="input-box body__url">
                    <div class="input-box__label body__url__label">
                        Paste a URL
                    </div>
                    <div class="input-box__input body__url__input">
                        <input bind:value={userEnteredUrl} on:input={checkUrlIsValid}
                               type="text">
                    </div>
                    {#if isUrlInvalid}
                        <div class="body__url__input__err-msg">
                            {urlInvalidReason}
                        </div>
                    {/if}
                </div>
                <div class="input-box body__content">
                    <div class="input-box__label body__content__label">
                        Share your thoughts about this
                    </div>
                    <div class="input-box__input body__content__input">
                        <div contenteditable="true"
                             placeholder="What do think about this ?"
                             class="body__content__input__box"
                             id="editableDiv"
                             bind:innerHTML={userEnteredContent}
                             on:input={checkIfContentIsInvalid}
                             on:paste={handlePaste}
                        >
                        </div>
                        {#if isContentInvalid}
                            <div class="body__content__input__err-msg">{contentInvalidReason}</div>
                        {/if}
                    </div>
                </div>

            </div>
            <div class="line"></div>
            <div class="CenterRowFlex footer">
                <button on:click={postAnonymously}
                        disabled={isContentInvalid}
                        class="btn-alt"
                        style="--btn-alt-color: #1e4748;">
                    Post anonymously
                </button>
                {#if !isPublishing}
                    <button class="btn" on:click={postThroughUser}
                            disabled={isContentInvalid || isUrlInvalid}>Post as you
                    </button>
                {:else}
                    <button class="btn"
                            disabled>
                        Posting &nbsp;<Loader/>
                    </button>
                {/if}
            </div>
        </main>
    {/if}
</dialog>



<Login bind:showLoginModal/>


<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    background: #1e4748 fixed;
    color: var(--text);
    min-width: 21rem;
    border-radius: 10px;
  }

  .head {
    justify-content: space-between;
    background: #18393a;
    padding: 1.2rem;
    color: var(--primary);
    border-radius: 10px 10px 0 0;
  }

  .body {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    min-width: 50rem;
    gap: 1rem;
  }

  .input-box {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input-box__label {
    font-size: var(--semi-medium-font-size);
    font-weight: var(--semi-medium-font-weight);
  }

  .body__url__input input:focus {
    border: 2px solid var(--primary);
  }

  .body__url__input__err-msg {
    color: red;
    font-size: var(--small-font-size);
  }

  .body__content__input {
    width: 100%;
  }

  .body__content__input__box {
    content: attr(placeholder);
    width: 100%;
    border-radius: 0.75rem;
    background: linear-gradient(172deg, rgba(50, 249, 255, 0.15) 33.55%, rgba(236, 254, 255, 0.15) 100%);
    padding: 1rem;
  }

  .body__content__input__err-msg {
    margin-top: 0.7rem;
    color: red;
    font-size: var(--small-font-size);
  }

  .body__content__input__box:focus {
    border: 2px solid var(--primary);
  }

  .line {
    border: 0.5px solid #4b6c6d;
    width: 90%;
    margin-top: auto;
    align-self: center;
  }

  .footer {
    margin-left: auto;
    padding: 1rem;
    gap: 1rem;
  }

  @media only screen and (max-width: 1024px) {
    .body {
      min-width: 30rem;
    }
  }

</style>
