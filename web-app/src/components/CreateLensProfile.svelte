<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import { awesome, close, cross, handleTaken } from "../utils/app-icon.util";
  import Loader from "$lib/Loader.svelte";
  import { fly } from "svelte/transition";
  import { backInOut } from "svelte/easing";
  import { getNotificationsContext } from "svelte-notifications";
  import createProfileWithHandleLensService from "../services/lens/create-profile-with-handle.lens.service";
  import {
    reloadAPublication,
    reloadCommentOfAPublication,
    reloadMainPost
  } from "../stores/reload-publication.store";
  import retrieveAccessTokenAuthenticationUtil from "../utils/authentication/retrieve-access-token.authentication.util";
  import setProfileAuthenticationUtil from "../utils/authentication/set-profile.authentication.util";
  import { isLoggedInUserStore } from "../stores/user/is-logged-in.user.store";
  import isValidAccessTokenPresentInLsForAddressAuthenticationUtil from "../utils/authentication/is-valid-access-token-present-in-ls-for-address.authentication.util";
  import { waitUntilComplete } from "../utils/indexer/has-transaction-been-indexed.indexer.util";

  const { addNotification } = getNotificationsContext();
  export let showCreateLensProfileModal: boolean;
  let dialog: HTMLDialogElement;
  $: if (dialog && showCreateLensProfileModal) dialog.showModal();

  let userEnteredHandle = "";
  let isCreatingLensProfile = false;
  let isInputInvalid = true;
  let inputInvalidReason = "";

  const createLensProfileWithHandle = async () => {
    isCreatingLensProfile = true;

    try {
      const response = await createProfileWithHandleLensService(
        userEnteredHandle
      );

      const createProfileWithHandleData =
        response?.data?.createProfileWithHandle;

      if (createProfileWithHandleData?.__typename === "RelaySuccess") {
        const txId = createProfileWithHandleData?.txId;

        await waitUntilComplete({ forTxId: txId }, Date.now());
        console.log("waiting for tx to be indexed");
        await isValidAccessTokenPresentInLsForAddressAuthenticationUtil();
        await retrieveAccessTokenAuthenticationUtil();
        await setProfileAuthenticationUtil();

        isLoggedInUserStore.setLoggedInStatus(true);
        setReloadMethods();
        successfullyProfileCreationNotification();
      }

      if (
        createProfileWithHandleData?.__typename ===
        "CreateProfileWithHandleErrorResult"
      ) {
        isCreatingLensProfile = false;
        dialog.close();
        if (createProfileWithHandleData?.reason === "HANDLE_TAKEN") {
          isCreatingLensProfile = false;
          addNotification({
            position: "top-right",
            heading: "Handle already taken",
            description: "Please try again with a different handle",
            type: handleTaken,
            removeAfter: 10000
          });
        }

        if (createProfileWithHandleData?.reason === "FAILED") {
          isCreatingLensProfile = false;
          addNotification({
            position: "top-right",
            heading: "Failed to create profile",
            description: "Please try again",
            type: handleTaken,
            removeAfter: 10000
          });
        }
      }
    } catch (error) {
      isCreatingLensProfile = false;
      dialog.close();
      addNotification({
        position: "top-right",
        heading: "Error occurred",
        description: "Something went wrong, please try again",
        type: cross,
        removeAfter: 10000
      });
    }
  };

  const setReloadMethods = () => {
    reloadMainPost.setReloadMainPost(Date.now());
    reloadCommentOfAPublication.setReloadCommentOfAPublication(Date.now());
    reloadAPublication.setReloadAPublication(Date.now());
  };

  const successfullyProfileCreationNotification = () => {
    isCreatingLensProfile = false;
    dialog.close();
    addNotification({
      position: "top-right",
      heading: "Profile successfully created",
      description:
        "Congratulations, your Lens Profile has been successfully created",
      type: awesome,
      removeAfter: 5000
    });
  };

  const checkInputIsValid = () => {
    if (userEnteredHandle.length === 0) {
      isInputInvalid = true;
      inputInvalidReason = "";
    } else if (/[A-Z]/.test(userEnteredHandle)) {
      isInputInvalid = true;
      inputInvalidReason = "Handle must be lowercase";
    } else if (!/^[a-z0-9]+$/.test(userEnteredHandle)) {
      isInputInvalid = true;
      inputInvalidReason = "Handle must be alphanumeric";
    } else if (userEnteredHandle.length < 5) {
      isInputInvalid = true;
      inputInvalidReason = "Handle must be at least 5 characters long";
    } else if (userEnteredHandle.length > 20) {
      isInputInvalid = true;
      inputInvalidReason = "Handle must be less than 20 characters long";
    } else {
      isInputInvalid = false;
      inputInvalidReason = "";
    }
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:close={() => (showCreateLensProfileModal = false)}
  on:click|self={() => dialog.close()}
>
  {#if showCreateLensProfileModal}
    <main
      on:click|stopPropagation
      transition:fly={{ y: 40, easing: backInOut, duration: 700 }}
    >
      <div class="CenterRowFlex head">
        <div class="h3 head__title">Create Lens Profile</div>
        <div class="head__close-btn">
          <button on:click={() => dialog.close()}>
            <Icon d={close} />
          </button>
        </div>
      </div>
      <div class="body">
        <div class="body__content">
          Create your Lens Profile, enter handle below
        </div>
        <div class="body__input">
          <input
            type="text"
            placeholder="vitalik"
            bind:value={userEnteredHandle}
            on:input={checkInputIsValid}
          />
          {#if isInputInvalid}
            <div class="body__input__err-msg">{inputInvalidReason}</div>
          {/if}
        </div>
        <div class="body__notes">
          <div class="body__notes__note">
            Your Lens Handle is a unique identifier that will be used to
            identify you on the Lens Network.
          </div>
        </div>
      </div>
      <div class="line" />
      <div class="footer">
        {#if !isCreatingLensProfile}
          <button
            class="btn"
            on:click={createLensProfileWithHandle}
            disabled={isInputInvalid}
            >Create Lens Profile
          </button>
        {:else}
          <button class="btn" disabled
            >Creating &nbsp;
            <Loader />
          </button>
        {/if}
      </div>
    </main>
  {/if}
</dialog>

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
    padding: 1rem;
    min-width: 25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .body__input__err-msg {
    margin-top: 0.7rem;
    color: red;
    font-size: var(--small-font-size);
  }

  .body__content {
    font-weight: var(--semi-medium-font-weight);
  }

  .body__input input {
    width: 60%;
  }

  .body__input input:focus {
    border: 2px solid var(--primary);
  }

  .body__notes {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: var(--small-font-size);
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
  }
</style>
