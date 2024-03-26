<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import {
    close,
    cross,
    flightTakeoff,
    sendClock,
    signature,
    tick
  } from "../../utils/app-icon.util";
  import Login from "../Login.svelte";
  import { getNotificationsContext } from "svelte-notifications";
  import { goto } from "$app/navigation";
  import { fly } from "svelte/transition";
  import { backInOut } from "svelte/easing";
  import GetTestMatic from "../GetTestMatic.svelte";
  import { isLoggedInUserStore } from "../../stores/user/is-logged-in.user.store";
  import addUrlAppService from "../../services/app/add-url.app.service";
  import commentOnChainPublicationUtil from "../../utils/publications/comment-onchain.publication.util";
  import createCommentAnonymouslyAppService from "../../services/app/create-comment-anonymously.app.service";
  import getRandomIdHelperUtil from "../../utils/helper/get-random-id.helper.util";
  const { VITE_USER_POST } = import.meta.env;

  const { addNotification, removeNotification } = getNotificationsContext();
  export let showAddNewPostModal: boolean;

  let dialog: HTMLDialogElement;

  $: if (dialog && showAddNewPostModal) dialog.showModal();

  let userEnteredContent = "";
  let contentInvalidReason = "";
  const wordLimit = 1000;
  let isContentInvalid = true;
  let showLoginModal = false;
  export let userEnteredUrl = "";
  let isUrlInvalid = true;
  let urlInvalidReason = "";
  let showGetTestMaticModal = false;

  const checkIfContentIsInvalid = () => {
    const wordCount = calculateWordCount(userEnteredContent);

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
  };

  //TODO: When text directly pasted then whole text is calculated as one word, fix this
  const calculateWordCount = (content: string) => {
    // Remove HTML tags using a regular expression
    const cleanContent = content.replace(/<\/?[^>]+(>|$)/g, " ");

    // Remove extra spaces, new lines, and special characters using regex
    const cleanedText = cleanContent.replace(/\s+/g, " ").trim();

    // Split the cleaned text into words and count the number of words
    const words = cleanedText.split(" ");

    return words.length;
  };

  const handlePaste = async (event: ClipboardEvent) => {
    // Prevent the default paste behavior
    event.preventDefault();

    // Get the pasted text from the clipboard
    const pastedText = (event.clipboardData || window.clipboardData).getData(
      "text/plain"
    );

    // Insert the plain text into the contenteditable div
    const selection = window.getSelection();

    if (selection === null) return;

    if (!selection.rangeCount) return;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(pastedText));

    // Update the userEnteredContent variable with the new content
    const editableDiv = document.getElementById("editableDiv");
    if (editableDiv) {
      userEnteredContent = editableDiv.innerHTML;
    }

    // Perform any necessary checks or validations
    checkIfContentIsInvalid();
  };

  let postThroughUser = async () => {
    if (!checkIsLoggedIn()) {
      showLoginModal = true;
    } else {
      dialog.close();

      const userPostNotificationId = getRandomIdHelperUtil();
      addNotification({
        id: userPostNotificationId,
        position: "top-right",
        heading: "Post on its way!",
        description:
          "Your post is getting polished and please wait for Metamask approval! Thanks for your patience.",
        type: sendClock
      });

      try {
        const { publicationID, mainPostImageUrl } = await addUrlAppService(
          userEnteredUrl
        );

        removeNotification(userPostNotificationId);
        addNotification({
          position: "top-right",
          heading: "Metamask approval needed",
          description:
            "Kindly fulfill upcoming Metamask dialog request to seamlessly publish your post on LensView.",
          type: signature,
          removeAfter: 10000
        });

        await commentOnChainPublicationUtil(
          publicationID,
          userEnteredContent,
          VITE_USER_POST,
          userEnteredUrl,
          mainPostImageUrl ? mainPostImageUrl : "empty"
        );

        userEnteredContent = "";
        userEnteredUrl = "";
        addNotification({
          position: "top-right",
          heading: "Successfully Posted",
          description:
            'Your post was successfully posted. Click on "View Post" to see your post',
          type: tick,
          removeAfter: 20000,
          ctaBtnName: "View Post",
          ctaFunction: () => {
            goto(`/posts/${publicationID}`);
          }
        });
      } catch (err) {
        removeNotification(userPostNotificationId);
        addNotification({
          position: "top-right",
          heading: "Failed To Post",
          description: "Your post was not posted. Please try again",
          type: cross,
          removeAfter: 20000
        });
        console.log("error: ", err);
      }
    }
  };

  const checkIsLoggedIn = () => {
    let isUserLoggedIn = false;
    const unsub = isLoggedInUserStore.subscribe((status) => {
      isUserLoggedIn = status;
    });
    unsub();

    return isUserLoggedIn;
  };

  const checkUrlIsValid = () => {
    if (userEnteredUrl.length === 0) {
      isUrlInvalid = true;
      // urlInvalidReason = "URL cannot be empty";
      return;
    }

    const indexOfSpace = userEnteredUrl.indexOf(" ");
    if (indexOfSpace !== -1) {
      isUrlInvalid = true;
      urlInvalidReason = "URL cannot contain spaces";
      return;
    }

    isUrlInvalid = false;
    return;
  };

  const postAnonymously = async () => {
    console.log("Post on its way!");
    addNotification({
      position: "top-right",
      heading: "Post on its way!",
      description:
        "Your anonymous  post is getting ready to shine! Hang tight for a brief moment - your patience is golden!",
      type: flightTakeoff,
      removeAfter: 7000
    });
    dialog.close();

    try {
      const pubId = await createCommentAnonymouslyAppService(
        userEnteredUrl,
        userEnteredContent
      );

      userEnteredContent = "";
      userEnteredUrl = "";
      addNotification({
        position: "top-right",
        heading: "Successfully Posted",
        description:
          'Your post was successfully posted anonymously. Click on "View Post" to see your post',
        type: tick,
        removeAfter: 20000,
        ctaBtnName: "View Post",
        ctaFunction: () => {
          goto(`/posts/${pubId}`);
        }
      });
    } catch (error) {
      console.log("error", error);
      addNotification({
        position: "top-right",
        heading: "Failed To Post",
        description: "Your post was not posted anonymously. Please try again",
        type: cross,
        removeAfter: 20000
      });
      throw error;
    }
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<dialog
  bind:this={dialog}
  on:close={() => (showAddNewPostModal = false)}
  on:click|self={() => dialog.close()}
>
  {#if showAddNewPostModal}
    <main
      on:click|stopPropagation
      transition:fly={{ y: 40, easing: backInOut, duration: 700 }}
    >
      <div class="CenterRowFlex head">
        <div class="h3 head__title">Create a new post</div>
        <div class="head__close-btn">
          <button on:click={() => dialog.close()}>
            <Icon d={close} />
          </button>
        </div>
      </div>
      <div class="body">
        <div class="input-box body__url">
          <div class="input-box__label body__url__label">Paste a URL</div>
          <div class="input-box__input body__url__input">
            <input
              bind:value={userEnteredUrl}
              on:input={checkUrlIsValid}
              type="text"
            />
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
            <div
              contenteditable="true"
              placeholder="What do think about this ?"
              class="body__content__input__box"
              id="editableDiv"
              bind:innerHTML={userEnteredContent}
              on:input={checkIfContentIsInvalid}
              on:paste={handlePaste}
            />
            {#if isContentInvalid}
              <div class="body__content__input__err-msg">
                {contentInvalidReason}
              </div>
            {/if}
          </div>
        </div>
      </div>
      <div class="line" />
      <div class="CenterRowFlex footer">
        <div class="footer__left">
          <!--          <button-->
          <!--            class="footer__left__matic"-->
          <!--            on:click={() => (showGetTestMaticModal = true)}-->
          <!--          >-->
          <!--            Get test MATIC-->
          <!--          </button>-->
        </div>
        <div class="CenterRowFlex footer__right">
          <button
            on:click={postAnonymously}
            disabled={isContentInvalid}
            class="btn-alt"
            style="--btn-alt-color: #1e4748;"
          >
            Post anonymously
          </button>
          <button
            class="btn"
            on:click={postThroughUser}
            disabled={isContentInvalid || isUrlInvalid}
            >Post as you
          </button>
        </div>
      </div>
    </main>
  {/if}
</dialog>

<Login bind:showLoginModal />
<GetTestMatic bind:showGetTestMaticModal />

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
    background: var(--bg-solid-2);
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
    background: linear-gradient(
      172deg,
      rgba(50, 249, 255, 0.15) 33.55%,
      rgba(236, 254, 255, 0.15) 100%
    );
    padding: 1rem;
    overflow-wrap: anywhere;
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
    justify-content: space-between;
    padding: 1rem;
  }

  .footer__right {
    gap: 1rem;
  }

  @media only screen and (max-width: 1024px) {
    .body {
      min-width: 30rem;
    }
  }
</style>
