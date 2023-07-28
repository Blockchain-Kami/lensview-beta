<script lang="ts">
    import Icon from "$lib/Icon.svelte";
    import {close} from "../../utils/frontend/appIcon";
    import Loader from "$lib/Loader.svelte";
    import {isSignedIn} from "../../services/signInStatus";
    import checkTxHashBeenIndexed from "../../utils/checkTxHashBeenIndexed";
    import Login from "../Login.svelte";
    import postAPublication from "../../utils/frontend/postAPublication";

    export let showAddNewPostModal: boolean;

    let dialog: HTMLDialogElement;

    $: if (dialog && showAddNewPostModal) dialog.showModal();

    let userEnteredContent = "";
    let inputInvalidReason = "";
    const wordLimit = 5;
    let isContentInvalid = true;
    let showLoginModal = false;
    let pubId = "0x8c68-0x0c";
    let userEnteredUrl = "";
    let isUrlInvalid = false;


    let isPublishing = false;

    const checkIfInputIsInvalid = () => {
        const wordCount = calculateWordCount(userEnteredContent);

        console.log("wordCount: ", wordCount);

        if (userEnteredContent.length === 0) {
            inputInvalidReason = "";
            isContentInvalid = true;
        } else if (wordCount > wordLimit) {
            inputInvalidReason = `Words cannot be more than ${wordLimit}`;
            isContentInvalid = true;
        } else {
            inputInvalidReason = "";
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

        checkIfInputIsInvalid();
    }

    let postThroughUser = async () => {
        if (!checkIsSignedIn()) {
            showLoginModal = true;
        } else {
            isPublishing = true;
            try {
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
            return;
        }

        const hasSpaces = / /g;
        const containsSpaces = hasSpaces.test(userEnteredUrl);
        if (containsSpaces) {
            isUrlInvalid = true;
            return;
        }

        isUrlInvalid = false;
        return;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
        bind:this={dialog}
        on:close={() => (showAddNewPostModal = false)}
        on:click|self={() => dialog.close()}
>
    <main on:click|stopPropagation>
        <div class="CenterRowFlex head">
            <div class="h3 head__title">
                Add a new post
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
                         on:input={checkIfInputIsInvalid}
                         on:paste={handlePaste}
                    >
                    </div>
                    {#if isContentInvalid}
                        <div class="body__content__input__err-msg">{inputInvalidReason}</div>
                    {/if}
                </div>
            </div>

        </div>
        <div class="line"></div>
        <div class="CenterRowFlex footer">
            <button disabled={isContentInvalid}
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
</dialog>

<Login bind:showLoginModal/>


<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    background: #1e4748 fixed;
    color: var(--text);
    min-width: 21rem;
  }

  .head {
    justify-content: space-between;
    background: #18393a;
    padding: 1.2rem;
    color: var(--primary);
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
