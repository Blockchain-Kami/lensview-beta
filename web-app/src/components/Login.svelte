<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import { close, cross, tick } from "../utils/app-icon.util";
  import Loader from "$lib/Loader.svelte";
  import CreateLensProfile from "./CreateLensProfile.svelte";
  import { fly } from "svelte/transition";
  import { backInOut } from "svelte/easing";
  import { getNotificationsContext } from "svelte-notifications";
  import {
    reloadAPublication,
    reloadCommentOfAPublication,
    reloadMainPost
  } from "../stores/reload-publication.store";
  import getMetamaskAddressAuthenticationUtil from "../utils/authentication/get-metamask-address.authentication.util";
  import isValidAccessTokenPresentInLsForAddressAuthenticationUtil from "../utils/authentication/is-valid-access-token-present-in-ls-for-address.authentication.util";
  import { addressUserStore } from "../stores/user/address.user.store";
  import parseNotificationObjectWithFunctionUtil from "../utils/parse-notification-object-with-function.util";
  import { isLoggedInUserStore } from "../stores/user/is-logged-in.user.store";
  import { idsAndHandlesUserStore } from "../stores/user/ids-and-handles.user.store";
  import retrieveAccessTokenAuthenticationUtil from "../utils/authentication/retrieve-access-token.authentication.util";
  import setProfileAuthenticationUtil from "../utils/authentication/set-profile.authentication.util";

  const { addNotification } = getNotificationsContext();
  export let showLoginModal: boolean;
  let dialog: HTMLDialogElement;
  $: if (dialog && showLoginModal) dialog.showModal();

  let loggingIn = false;
  let showCreateLensProfileModal = false;

  export const onLoginIntialization = async () => {
    console.log("onLoginIntialization");
    try {
      await getMetamaskAddressAuthenticationUtil(true);
      await loggedUserInIfAccessTokenPresent();
    } catch (error) {
      dialog.close();
      console.log(error);
      addNotification(
        parseNotificationObjectWithFunctionUtil((error as Error).message)
      );
    }
  };

  const logInWithLens = async () => {
    loggingIn = true;
    try {
      await retrieveAccessTokenAuthenticationUtil();
      await setProfileAuthenticationUtil();

      isLoggedInUserStore.setLoggedInStatus(true);
      setReloadMethods();
      loggingIn = false;
      successfullySignInNotification();

      console.log(
        "Local Storage: " +
          JSON.parse(localStorage.getItem("IDS_AUTH_DATA") as string)
      );
    } catch (error) {
      loggingIn = false;
      dialog.close();
      console.log("error: " + error);
      addNotification({
        position: "top-right",
        heading: "Error while logging in",
        description: (error as Error).message + ". Please try again",
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

  const connect = async () => {
    try {
      await getMetamaskAddressAuthenticationUtil(false);
      await loggedUserInIfAccessTokenPresent();
    } catch (error) {
      console.log("connect error : ", error);
      dialog.close();
      addNotification(
        parseNotificationObjectWithFunctionUtil((error as Error).message)
      );
    }
  };

  const successfullySignInNotification = () => {
    dialog.close();
    addNotification({
      position: "top-right",
      heading: "Successfully logged-in",
      description: "You have successfully logged-in to LensView",
      type: tick,
      removeAfter: 3000
    });
  };

  // const openCreateLensProfileModal = () => {
  //   showCreateLensProfileModal = true;
  //   dialog.close();
  // };

  const loggedUserInIfAccessTokenPresent = async () => {
    const isValidAccessTokenPresentInLocalStorage =
      await isValidAccessTokenPresentInLsForAddressAuthenticationUtil();
    console.log(
      "isValidAccessTokenPresentInLocalStorage: " +
        isValidAccessTokenPresentInLocalStorage
    );
    if (isValidAccessTokenPresentInLocalStorage) {
      await setProfileAuthenticationUtil();
      isLoggedInUserStore.setLoggedInStatus(true);
      loggingIn = false;
      setReloadMethods();
      dialog.close();
      addNotification({
        position: "top-right",
        heading: "Successfully logged in",
        description: "You are now logged in",
        type: tick,
        removeAfter: 10000
      });
    }
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:close={() => (showLoginModal = false)}
  on:click|self={() => dialog.close()}
>
  {#if showLoginModal}
    <main
      on:click|stopPropagation
      transition:fly={{ y: 40, easing: backInOut, duration: 700 }}
    >
      {#if !$addressUserStore}
        <div class="CenterRowFlex head">
          <div class="h3">Login</div>
          <div class="head__close-btn">
            <button on:click={() => dialog.close()}>
              <Icon d={close} />
            </button>
          </div>
        </div>
        <div class="body">Please connect your wallet to continue</div>
        <div class="line" />
        <div class="footer">
          <button on:click={connect} class="btn"> Connect wallet</button>
        </div>
      {:else if !$isLoggedInUserStore}
        {#if !loggingIn}
          {#if $idsAndHandlesUserStore.length > 0}
            <div class="CenterRowFlex head">
              <div class="h3">Login</div>
              <div class="head__close-btn">
                <button on:click={() => dialog.close()}>
                  <Icon d={close} />
                </button>
              </div>
            </div>
            <div class="body">
              Please login with Lens
              <br />
              <br />
              Handle linked to
              <span class="italic-text"
                >{$addressUserStore.substring(0, 5) +
                  "..." +
                  $addressUserStore.slice(-5)}</span
              >
              is
              <span class="body__handle"
                >{$idsAndHandlesUserStore[0].handle.substring(5)}</span
              >
            </div>
            <div class="line" />
            <div class="footer">
              <button on:click={logInWithLens} class="btn">
                Login With Lens
              </button>
            </div>
          {:else}
            <div class="CenterRowFlex head">
              <div class="h3">Oops, you don't have a Lens Handle</div>
              <div class="head__close-btn">
                <button on:click={() => dialog.close()}>
                  <Icon d={close} />
                </button>
              </div>
            </div>
            <div class="body">
              <div style="font-weight: bold">
                But that's okay, let's get you one to unlock your full LensView
                experience
              </div>
              <br />
              If you don’t wish to claim a handle, you can still use LensView in
              the anonymous mode by sharing your views using the
              <span class="italic-text">“Post Anonymously”</span> button. We eagerly
              await your contributions.
            </div>
            <div class="line" />
            <div class="footer">
              <button
                on:click={() => window.open("https://lens.xyz/mint", "_blank")}
                class="btn"
              >
                Claim your handle
              </button>
            </div>
            <!--            <div class="body">-->
            <!--              No Account found!-->
            <!--              <br />-->
            <!--              Please create Lens Profile to continue-->
            <!--            </div>-->
            <!--            <div class="line" />-->
            <!--            <div class="footer">-->
            <!--              <button on:click={openCreateLensProfileModal} class="btn">-->
            <!--                Create Lens Profile-->
            <!--              </button>-->
            <!--            </div>-->
          {/if}
        {:else}
          <div class="CenterRowFlex head">
            <div class="h3">Login</div>
            <div class="head__close-btn">
              <button on:click={() => dialog.close()}>
                <Icon d={close} />
              </button>
            </div>
          </div>
          <div class="body">
            Please login with Lens
            <br />
            <br />
            Handle linked to
            <span class="italic-text"
              >{$addressUserStore.substring(0, 5) +
                "..." +
                $addressUserStore.slice(-5)}</span
            >
            is
            <span class="body__handle"
              >{$idsAndHandlesUserStore[0].handle.substring(5)}</span
            >
          </div>
          <div class="line" />
          <div class="footer">
            <button class="btn" disabled>
              Logging In &nbsp;
              <Loader />
            </button>
          </div>
        {/if}
      {/if}
    </main>
  {/if}
</dialog>

<CreateLensProfile bind:showCreateLensProfileModal />

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
    padding: 1rem;
    min-width: 25rem;
  }

  .italic-text {
    font-style: italic;
  }

  .body__handle {
    font-weight: var(--semi-medium-font-weight);
    color: var(--primary);
    font-size: var(--medium-font-size);
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
