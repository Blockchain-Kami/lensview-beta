<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import { close, tick, error } from "../utils/app-icon.util";
  import { fly } from "svelte/transition";
  import { backInOut } from "svelte/easing";
  import { getNotificationsContext } from "svelte-notifications";
  import { addressUserStore } from "../stores/user/address.user.store";
  import web3ModalUtil, { wagmiConfig } from "../utils/web3modal.util";
  import { getAccount } from "@wagmi/core";
  import getProfileListUsingAddressLensService from "../services/lens/get-profile-list-using-address.lens.service";
  import logUserInAuthenticationUtil from "../utils/authentication/log-user-in.authentication.util";
  import type { ProfileManagedLensModel } from "../models/lens/profile-managed.lens.model";
  import getPictureURLUtil from "../utils/get-picture-URL.util";
  import Loader from "$lib/Loader.svelte";

  const { addNotification } = getNotificationsContext();
  export let showLoginModal = false;
  let dialog: HTMLDialogElement;
  $: if (dialog && showLoginModal) dialog.showModal();

  let isLoggingIn = false;
  let selectedProfileId: string;
  let fetchingProfilesList = false;
  let profileList: ProfileManagedLensModel[];
  let prevConnectedAddress = "";

  export const onLoginIntialization = () => {
    try {
      const connectedAddress = getAccount(wagmiConfig).address;
      if (connectedAddress) {
        showLoginModal = true;
        addressUserStore.setUserAddress(connectedAddress);
        fetchProfilesList();
      } else {
        web3ModalUtil.open();
        web3ModalUtil.subscribeState((newState) => {
          console.log("newState : ", newState);
          const address = getAccount(wagmiConfig).address;
          console.log("Account address: ", address);

          if (address && address !== prevConnectedAddress) {
            prevConnectedAddress = address;
            showLoginModal = true;
            web3ModalUtil.close();
            addressUserStore.setUserAddress(address);
            fetchProfilesList();
          }
        });
      }
    } catch (error) {
      console.log("onLoginIntialization error: ", error);
    }
  };

  const logInWithLens = async (id: string) => {
    try {
      isLoggingIn = true;
      const address = getAccount(wagmiConfig).address;

      if (!address) {
        onLoginIntialization();
        dialog.close();
      }

      await logUserInAuthenticationUtil(address as string, id);

      isLoggingIn = false;
      dialog.close();
      successfullySignInNotification();
    } catch (error) {
      console.log("error: " + error);
      isLoggingIn = false;
      errorSignInNotification();
    }
  };

  const fetchProfilesList = async () => {
    try {
      fetchingProfilesList = true;

      const connectedAddress = getAccount(wagmiConfig).address;

      if (!connectedAddress) {
        onLoginIntialization();
      } else {
        profileList = await getProfileListUsingAddressLensService(
          connectedAddress
        );

        if (profileList?.length > 0) selectedProfileId = profileList[0].id;

        fetchingProfilesList = false;
      }
    } catch (error) {
      fetchingProfilesList = false;
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

  const errorSignInNotification = () => {
    dialog.close();
    addNotification({
      position: "top-right",
      heading: "Failed to login",
      description: "Please try again to login",
      type: error,
      removeAfter: 6000
    });
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:close={() => (showLoginModal = false)}
  on:click|self={() => dialog.close()}
>
  {#if showLoginModal && $addressUserStore}
    <main
      on:click|stopPropagation
      transition:fly={{ y: 40, easing: backInOut, duration: 700 }}
    >
      {#if fetchingProfilesList}
        <div class="CenterRowFlex head">
          <div class="h3">Fetching Profiles ...</div>
          <div class="head__close-btn">
            <button on:click={() => dialog.close()}>
              <Icon d={close} />
            </button>
          </div>
        </div>
        <div class="body-profiles">
          <div class="body-profiles__profile body-profiles__profile-loader">
            <div class="body-profiles__profile__pic-loader" />
            <div class="body-profiles__profile__info">
              <div class="body-profiles__profile__info__name-loader" />
              <div class="body-profiles__profile__info__handle-loader" />
            </div>
          </div>
        </div>
      {:else if profileList.length > 0}
        <div class="CenterRowFlex head">
          <div class="h3">Login</div>
          <div class="head__close-btn">
            <button on:click={() => dialog.close()}>
              <Icon d={close} />
            </button>
          </div>
        </div>
        <div class="body-profiles">
          <h3 class="h3">
            {profileList.length > 1 ? "Select and login" : "Login"} with your Lens
            profile
          </h3>
          <p>
            LensView uses this signature to verify that you’re the owner of this
            profile.
          </p>
          {#each profileList as item}
            <input
              type="radio"
              bind:group={selectedProfileId}
              name="profile"
              value={item?.id}
              id={item?.id}
            />
            <label
              for={item?.id}
              class="body-profiles__profile {item?.id === selectedProfileId
                ? 'body-profiles__profile-selected'
                : ''}"
            >
              <div class="body-profiles__profile__pic">
                <img
                  src={getPictureURLUtil(
                    item?.metadata?.picture?.optimized?.uri,
                    item?.ownedBy?.address
                  )}
                  alt={`${item?.metadata?.displayName} profile picture`}
                />
              </div>
              <div class="body-profiles__profile__info">
                <div class="body-profiles__profile__info__name">
                  {item?.metadata?.displayName}
                </div>
                <div class="body-profiles__profile__info__handle">
                  {item?.handle?.fullHandle.slice(5)}
                </div>
              </div>
            </label>
          {/each}
        </div>
        <div class="line" />
        <div class="footer">
          {#if !isLoggingIn}
            <button
              on:click={() => logInWithLens(selectedProfileId)}
              class="btn">Login with Lens</button
            >
          {:else}
            <button class="btn" disabled
              >Logging in &nbsp;&nbsp; <Loader /></button
            >
          {/if}
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
          If you don’t wish to claim a handle, you can still use LensView in the
          anonymous mode by sharing your views using the
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
      {/if}
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

  .body-profiles {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .body-profiles input {
    all: unset;
  }

  .body-profiles__profile {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 0.7rem;
  }

  .body-profiles__profile-selected,
  .body-profiles__profile-loader {
    background: #173b3e;
    border-radius: 10px;
    border: 1px solid var(--primary);
  }

  .body-profiles__profile-loader {
    width: 23rem;
  }

  .body-profiles__profile__pic img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid #32f9ff;
  }

  .body-profiles__profile__pic-loader {
    height: 3em;
    width: 3rem;
    margin-bottom: auto;
    border-radius: 50%;
  }

  .body-profiles__profile__info__name {
    font-weight: var(--semi-medium-font-weight);
    padding: 0.2rem 0.5rem;
  }

  .body-profiles__profile__info__name-loader {
    width: 13rem;
    height: 2rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
  }

  .body-profiles__profile__info__handle {
    padding: 0.2rem 0.5rem;
    background: var(--bg-solid-3);
    border-radius: 5px;
    color: var(--primary);
  }

  .body-profiles__profile__info__handle-loader {
    width: 9rem;
    height: 1.5rem;
    border-radius: 5px;
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

  .body-profiles__profile__pic-loader,
  .body-profiles__profile__info__name-loader,
  .body-profiles__profile__info__handle-loader {
    background: linear-gradient(110deg, #0d9397 8%, #63bdc8 18%, #0d9397 33%);
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
  }
</style>
