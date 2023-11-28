<script lang="ts">
  import "../global.scss";
  import { goto } from "$app/navigation";
  import { searchInputDetails } from "../services/searchInputDetails";
  import { onMount } from "svelte";
  import { PUBLIC_IS_PROD } from "$env/static/public";
  import {
    home,
    homeDualTone,
    menu,
    menuOpen,
    search
  } from "../utils/frontend/appIcon";
  import Icon from "$lib/Icon.svelte";
  import DualToneIcon from "$lib/DualToneIcon.svelte";
  import Loader from "$lib/Loader.svelte";
  import JoinForUpdates from "../components/main-page/JoinForUpdates.svelte";
  import type { FetchedInfoForSearchedInputModel } from "../models/fetchedInfoForSearchedInput.model";
  import Notifications from "svelte-notifications";
  import CustomNotification from "$lib/CustomNotification.svelte";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import LensviewLogo from "$lib/assets/LensviewLogo.svg";
  import {
    reloadAPublication,
    reloadCommentOfAPublication,
    reloadMainPost
  } from "../stores/reload-publication.store";
  import { MetaTags } from "svelte-meta-tags";
  import { metaTagsTitle } from "../services/metaTags";

  import Login from "../components/Login.svelte";
  import getMetamaskAddressAuthenticationUtil from "../utils/authentication/get-metamask-address.authentication.util";
  import isValidAccessTokenPresentInLsForAddressAuthenticationUtil from "../utils/authentication/is-valid-access-token-present-in-ls-for-address.authentication.util";
  import { addressUserStore } from "../stores/user/address.user.store";
  import { isLoggedInUserStore } from "../stores/user/is-logged-in.user.store";
  import { profileUserStore } from "../stores/user/profile.user.store";
  import setProfileAuthenticationUtil from "../utils/authentication/set-profile.authentication.util";
  import postOnChainPublicationUtil from "../utils/publications/post-onchain.publication.util";
  // import commentOnChainPublicationUtil from "../utils/publications/comment-onchain.publication.util";
  import getPictureURLUtil from "../utils/get-picture-URL.util";

  let userEnteredUrlOrKeywords = "";
  let showJoinForUpdatesModal = false;
  let menuActive = false;
  let isSearching = false;
  let showLoginModal = false;
  let onLoginIntialization: () => Promise<void>;

  onMount(async () => {
    try {
      await getMetamaskAddressAuthenticationUtil(true);

      let address;
      const unsub = addressUserStore.subscribe((_address) => {
        address = _address;
      });
      unsub();

      if (address) {
        const isValidAccessTokenPresentInLocalStorage =
          await isValidAccessTokenPresentInLsForAddressAuthenticationUtil();

        console.log(
          "isValidAccessTokenPresentInLocalStorage : " +
            isValidAccessTokenPresentInLocalStorage
        );

        if (isValidAccessTokenPresentInLocalStorage) {
          await setProfileAuthenticationUtil();
          isLoggedInUserStore.setLoggedInStatus(true);

          setReloadMethods();
        }
      }
    } catch (error) {
      showLoginModal = false;
      console.log(error);
    }

    accountAndChainChangedMethods();
  });

  const accountAndChainChangedMethods = () => {
    let chainIDToBeUsed: string;
    if (PUBLIC_IS_PROD === "false") {
      chainIDToBeUsed = "0x13881";
    } else {
      chainIDToBeUsed = "0x89";
    }

    window.ethereum.on("chainChanged", (chainId: string) => {
      if (chainId !== chainIDToBeUsed) {
        window.location.reload();
      }
    });

    addressUserStore.subscribe((address) => {
      window.ethereum.on("accountsChanged", (switchedAddress: string) => {
        console.log("account changed: " + switchedAddress);
        console.log("address: " + address);
        if (address !== null && switchedAddress !== address) {
          window.location.reload();
        }
      });
    });
  };

  const setReloadMethods = () => {
    reloadMainPost.setReloadMainPost(Date.now());
    reloadCommentOfAPublication.setReloadCommentOfAPublication(Date.now());
    reloadAPublication.setReloadAPublication(Date.now());
  };

  const openLoginModal = () => {
    showLoginModal = true;
    onLoginIntialization();
  };

  const postTest = () => {
    postOnChainPublicationUtil();
  };

  const commentTest = () => {
    // commentOnChainPublicationUtil();
  };

  const redirectToPostsOrSearchPage = async () => {
    console.log("Redirecting to posts or search page");
    isSearching = true;

    try {
      const fetchedInfoForSearchedInput: FetchedInfoForSearchedInputModel =
        await fetch("/api/is-url-valid-get-parent-pubId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userEnteredUrlOrKeywords)
        }).then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Error fetching info for searched input");
          }
        });

      isSearching = false;

      if (fetchedInfoForSearchedInput.parentPublicationID === null) {
        console.log("No parent publication found for searched input");

        searchInputDetails.setSearchInputDetails({
          userEnteredUrlOrKeywords: userEnteredUrlOrKeywords,
          isInputUrl: fetchedInfoForSearchedInput.isURL
        });
        await goto(`/search`);
      } else {
        await goto(`/posts/${fetchedInfoForSearchedInput.parentPublicationID}`);
      }
    } catch (error) {
      console.log("Error fetching info for searched input");
      isSearching = false;
      //TODO: Ask user to try again or visit the website after sometime
    }
  };
</script>

<!----------------------------- HTML ----------------------------->
<Notifications item={CustomNotification} zIndex="20">
  <div class="CenterRowFlex nav">
    <div class="nav__hamburger">
      <button
        on:click={() => {
          menuActive = true;
        }}
      >
        <Icon d={menu} color="#fff" size="2em" />
      </button>
    </div>
    <form
      on:submit|preventDefault={() => redirectToPostsOrSearchPage()}
      class="nav__search"
    >
      <input
        bind:value={userEnteredUrlOrKeywords}
        type="text"
        placeholder="Enter a URL or keywords"
        class="nav__search__input"
      />
      {#if userEnteredUrlOrKeywords.length === 0}
        <button class="btn" style="cursor: initial;" disabled>
          <Icon d={search} size="1.9em" color="#fff" />
        </button>
      {:else if !isSearching}
        <button on:click={() => redirectToPostsOrSearchPage()} class="btn">
          <Icon d={search} size="1.9em" />
        </button>
      {:else}
        <button disabled class="btn">
          <Loader />
        </button>
      {/if}
    </form>
    <a href="/" class="CenterRowFlex nav__logo"
      ><img alt="Untitled-presentation-3" src={LensviewLogo} />
    </a>
  </div>

  <main>
    {#if menuActive}
      <div
        transition:fly={{ delay: 250, duration: 300, x: -50, easing: quintOut }}
        on:introstart
        on:outroend
        class="menu"
      >
        <div class="menu__hamburger">
          <button
            on:click={() => {
              menuActive = false;
            }}
          >
            <Icon d={menuOpen} color="#fff" size="2em" />
          </button>
        </div>
        {#if $isLoggedInUserStore}
          <div class="CenterColumnFlex menu__user-box">
            <div class="menu__user-box__avatar">
              <img
                src={getPictureURLUtil(
                  $profileUserStore?.metadata?.picture?.optimized?.uri,
                  $profileUserStore?.ownedBy?.address
                )}
                alt=""
              />
            </div>
            <div class="menu__user-box__handle">
              {$profileUserStore?.handle?.fullHandle.substring(5)}
            </div>
          </div>
        {:else}
          <div class="menu__connect-box">
            <div class="menu__connect-box__text">
              Hello friend! Welcome to LensView.
            </div>
            <div class="menu__connect-box__btn">
              <button on:click={openLoginModal} class="btn"> Login </button>
            </div>
          </div>
        {/if}
        <button on:click={postTest} class="btn"> Test Post</button>
        <button on:click={commentTest} class="btn"> Test Comment</button>
        <div class="menu__options">
          <a href="/" class="CenterRowFlex menu__options__item">
            <div class="menu__options__item__icon">
              <DualToneIcon d1={home} d2={homeDualTone} />
            </div>
            Home
          </a>
          <!--                <a href="https-proxy-agent" class="CenterRowFlex menu__options__item">-->
          <!--                    <div >About</div>-->
          <!--                </a>-->
        </div>
        <div class="menu__join-box">
          <div class="menu__join-box__text">
            Join the LensView family and never miss out on any updates!
          </div>
          <div class="menu__join-box__btn">
            <button
              on:click={() => (showJoinForUpdatesModal = true)}
              class="btn-alt"
              style="--btn-alt-color: #1e4748;"
            >
              Join for updates
            </button>
          </div>
        </div>
      </div>
    {/if}
    <div class:body-margin-on-menu-active={menuActive} class="body">
      <slot />
    </div>
  </main>

  <Login bind:showLoginModal bind:onLoginIntialization />

  <JoinForUpdates bind:showJoinForUpdatesModal />
</Notifications>

<MetaTags title={$metaTagsTitle} />

<!--description={$metaTagsDescription}-->
<!--openGraph={{-->
<!--    url: `https://${PUBLIC_DOMAIN_NAME}`,-->
<!--    title: `${$metaTagsTitle}`,-->
<!--    description: `${$metaTagsDescription}`,-->
<!--    images: [-->
<!--        {-->
<!--            url: `${$metaTagsImageUrl}`,-->
<!--            width: 800,-->
<!--            height: 600,-->
<!--            alt: `${$metaTagsImageAlt}`,-->
<!--        }-->
<!--    ],-->
<!--    siteName: 'LensView'-->
<!--}}-->
<!--twitter={{-->
<!--    site: '@lensview_',-->
<!--    cardType: 'summary_large_image',-->
<!--    title: `${$metaTagsTitle}`,-->
<!--    description: `${$metaTagsDescription}`,-->
<!--    image: `${$metaTagsImageUrl}`,-->
<!--    imageAlt: `${$metaTagsImageAlt}`,-->
<!--}}-->
<!---------------------------------------------------------------->

<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  .nav {
    justify-content: space-between;
    padding: 0.3rem 2rem;
    gap: 1rem;
    background: rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    width: 100%;
    background: #0c151a94;
    z-index: 10;
    backdrop-filter: blur(10px);
    filter: drop-shadow(2px 4px 12px rgba(0, 0, 0, 0.25));
  }

  .nav__search {
    display: flex;
    border-radius: 0.75rem;
    background: linear-gradient(
      172deg,
      rgba(50, 249, 255, 0.15) 33.55%,
      rgba(236, 254, 255, 0.15) 100%
    );
    width: 65%;
    max-width: 34rem;
  }

  .nav__search input {
    border-radius: 0.75rem 0 0 0.75rem;
  }

  .nav__search input:focus {
    border: 2px solid var(--primary);
  }

  .nav__search button {
    height: 2.7rem;
    width: 2.7rem;
    border-radius: 0 0.75rem 0.75rem 0;
    padding: 0 0.9em;
    background: #1b5a5d;
  }

  .nav__logo img {
    height: 3rem;
    width: 3rem;
  }

  main {
    display: flex;
    flex-direction: row;
  }

  .menu {
    display: flex;
    flex-direction: column;
    width: 20rem;
    background: #0e2b31;
    position: fixed;
    height: 100%;
    z-index: 20;
    border-radius: 0 20px 20px 0;
    padding: 0 2rem 2rem 2rem;
    gap: 1rem;
  }

  .menu__hamburger {
    display: flex;
    height: 4rem;
  }

  .menu__connect-box {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 10px;
    gap: 2.5rem;
    background-image: url("$lib/assets/connect-wallet-bg.jpg");
    background-repeat: no-repeat;
    background-position: top;
  }

  .menu__user-box {
    gap: 1rem;
  }

  .menu__user-box__avatar img {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    border: 4px solid #32f9ff;
  }

  .menu__user-box__handle {
    padding: 1rem 2rem;
    background: #034242;
    border-radius: 20px;
    color: #32f9ff;
    font-weight: var(--semi-medium-font-weight);
  }

  .menu__options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }

  .menu__options__item {
    padding: 1rem;
    justify-content: flex-start;
    gap: 0.5em;
  }

  .menu__options__item:hover {
    background: #0b2226;
    border-radius: 10px;
  }

  .menu__options__item__icon {
    padding: 0.35rem;
    border-radius: 50%;
    background: #091b1e;
  }

  .menu__connect-box__text {
    font-weight: var(--semi-medium-font-weight);
  }

  .menu__join-box {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .menu__join-box__text {
    font-weight: var(--semi-medium-font-weight);
  }

  .body {
    flex-grow: 1;
    transition: margin-left 300ms ease-in-out;
  }

  .body-margin-on-menu-active {
    margin-left: 20rem; // width of menu
  }

  @media only screen and (max-width: 1024px) {
    .body {
      margin-left: 0;
    }
  }
</style>
