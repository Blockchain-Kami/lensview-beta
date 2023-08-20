<script lang="ts">
    import "../global.scss";
    import { userAddress } from "../services/userAddress";
    import { userAuthentication } from "../utils/frontend/authenticate";
    import { goto } from "$app/navigation";
    import { isSignedIn } from "../services/signInStatus";
    import { searchInputDetails } from "../services/searchInputDetails";
    import getDefaultUserProfile from "../utils/frontend/getDefaultUserProfile";
    import CreateLensHandle from "../components/CreateLensHandle.svelte";
    import { userProfile } from "../services/profile";
    import getUserProfiles from "../utils/frontend/getUserProfiles";
    import { onMount } from "svelte";
    import { PUBLIC_IS_PROD } from "$env/static/public";
    import { home, homeDualTone, menu, menuOpen, search } from "../utils/frontend/appIcon";
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
    import { reloadCommentOfAPublication } from "../services/reloadCommentOfAPublication";

    let isConnected = false;
    let signingIn = false;
    let userEnteredUrlOrKeywords = "";
    let showCreateLensHandleModal = false;
    let showJoinForUpdatesModal = false;
    let isHandleCreated = true;
    let isThisConnectWalletAccountChange = false;
    let chainIDToBeUsed: string;
    let menuActive = false;
    let isSearching = false;


  onMount(async () => {

    if (PUBLIC_IS_PROD === "false") {
      chainIDToBeUsed = "0x13881";
    } else {
      chainIDToBeUsed = "0x89";
    }

    if (typeof window.ethereum === "undefined") {
        // alert("Please install metamask to interact with this application, but you can still view the others posts");
    }

    window.ethereum.on("chainChanged", (chainId) => {
      if (chainId !== chainIDToBeUsed) {
        window.location.reload();
      }
    });

    window.ethereum.on("accountsChanged", (switchedAddress) => {
      if (!isThisConnectWalletAccountChange) {
        window.location.reload();
      } else {
        isThisConnectWalletAccountChange = false;
      }
    });
  });

  /**TODO: 1. Check for chain and if it is not polygon testnet then do necessary changes
   *       2. Check if there is any stored address in local storage if yes then do not ask for connect wallet
   *       3. Check if refresh token is present in local storage and not expired, if yes then do not ask for sign in
   *       4. Handle scenarios when user switches network
   */
  async function connect() {
    if (typeof window.ethereum === "undefined") {
        alert("Please install metamask to interact with this application, but you can still view the others posts");
    } else {
      /* this allows the user to connect their wallet */
      try {
        await switchUserToCorrectChain();

        isThisConnectWalletAccountChange = true;

        const account = await window.ethereum.request({ method: "eth_requestAccounts" });

        isThisConnectWalletAccountChange = false;
        if (account.length) {
          userAddress.setUserAddress(account[0]);
          isConnected = true;
        } else {
          isConnected = false;
        }
        console.log("Account : " + JSON.stringify(account));
      } catch (error) {
        isThisConnectWalletAccountChange = false;
        console.log(error);
      }
    }
  }

  const switchUserToCorrectChain = async () => {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });

    console.log("Chain Id : " + chainId);

    if (chainId !== chainIDToBeUsed) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIDToBeUsed }]
        });

      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {

            if (PUBLIC_IS_PROD === "false") {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x13881",
                    chainName: "Mumbai",
                      rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
                    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
                    nativeCurrency: {
                      name: "MATIC",
                      symbol: "MATIC",
                      decimals: 18
                    }
                  }
                ]
              });
            } else {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x89",
                    chainName: "Polygon",
                    rpcUrls: ["https://polygon-rpc.com"],
                    blockExplorerUrls: ["https://polygonscan.com"],
                    nativeCurrency: {
                      name: "MATIC",
                      symbol: "MATIC",
                      decimals: 18
                    }
                  }
                ]
              });
            }

          } catch (addError) {
            console.log("Error adding chain", addError);
            throw new Error(addError);
          }
        } else {
          console.log("Error switching chain", switchError);
          throw new Error(switchError);
        }
      }
    }
  };

  const signInWithLens = async () => {
    /*** Authenticate **/
    try {
      signingIn = true;
      await userAuthentication();
      const fetchedProfiles = await getUserProfiles();

      if (fetchedProfiles.length === 0) {
        console.log("Fetched Profile : " + JSON.stringify(fetchedProfiles));
        showCreateLensHandleModal = true;
        signingIn = false;
        isHandleCreated = false;
      } else {
        isHandleCreated = true;
        showCreateLensHandleModal = false;
        const defaultProfile = await getDefaultUserProfile();

        if (defaultProfile !== null) {
          userProfile.setUserProfile(defaultProfile);
        } else {
          userProfile.setUserProfile(fetchedProfiles[0]);
        }
          reloadCommentOfAPublication.setReloadCommentOfAPublication(Date.now());
          signingIn = false;
          isSignedIn.setSignInStatus(true);
      }

    } catch (error) {
        console.log("Error authenticating user");
        isSignedIn.setSignInStatus(false);
        signingIn = false;
    }
  };

    const redirectToPostsOrSearchPage = async () => {
        console.log("Redirecting to posts or search page");
        isSearching = true;

        try {
            const fetchedInfoForSearchedInput: FetchedInfoForSearchedInputModel = await fetch('/api/is-url-valid-get-parent-pubId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userEnteredUrlOrKeywords)
            }).then(res => {
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
                    "userEnteredUrlOrKeywords": userEnteredUrlOrKeywords,
                    "isInputUrl": fetchedInfoForSearchedInput.isURL
                })
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
        <button on:click={() => {menuActive = true}}>
            <Icon d={menu} color="#fff" size="2em"/>
        </button>
    </div>
    <form on:submit|preventDefault={() => redirectToPostsOrSearchPage()}
          class="nav__search">
        <input bind:value={userEnteredUrlOrKeywords}
               type="text"
               placeholder="Enter a URL or keywords"
               class="nav__search__input"
        />
        {#if userEnteredUrlOrKeywords.length === 0}
            <button class="btn"
                    style="cursor: initial;"
                    disabled
            >
                <Icon d={search} size="1.9em" color="#fff"/>
            </button>
        {:else}
            {#if !isSearching}
                <button on:click={() => redirectToPostsOrSearchPage()}
                        class="btn"
                >
                    <Icon d={search} size="1.9em"/>
                </button>
            {:else}
                <button disabled
                        class="btn"
                >
                    <Loader/>
                </button>
            {/if}
        {/if}
    </form>
    <a href="/" class="CenterRowFlex nav__logo"><img alt="Untitled-presentation-3"
                                                     src={LensviewLogo}
        />
        </a>
</div>
<main>
    {#if menuActive}
        <div transition:fly={{delay: 250, duration: 300, x: -50, easing: quintOut  }} on:introstart on:outroend
             class="menu">
            <div class="menu__hamburger">
                <button on:click={() => {menuActive = false}}>
                    <Icon d={menuOpen} color="#fff" size="2em"/>
                </button>
            </div>
            {#if $isSignedIn}
                <div class="CenterColumnFlex menu__user-box">
                    <div class="menu__user-box__avatar">
                        <img src={$userProfile.picture.original.url} alt="">
                    </div>
                    <div class="menu__user-box__handle">
                        {$userProfile.handle}
                    </div>
                    <!--{$userAddress.slice(0, 5)} ... {$userAddress.slice(-5)}-->
                </div>
            {:else}
                {#if !isConnected}
                    <div class="menu__connect-box">
                        <div class="menu__connect-box__text">
                            Hello Friend! Welcome to LensView.
                        </div>
                        <div class="menu__connect-box__btn">
                            <button on:click="{connect}"
                                    class="btn">
                                Connect Wallet
                            </button>
                        </div>
                    </div>
                {:else}
                    {#if !$isSignedIn}
                        <div class="menu__connect-box">
                            <div class="menu__connect-box__text">
                                Hello Friend! Welcome to LensView.
                            </div>
                            <div class="menu__connect-box__btn">
                                {#if !signingIn }
                                    {#if isHandleCreated}
                                        <button on:click="{signInWithLens}"
                                                class="btn">Sign-In With Lens
                                        </button>
                                    {:else}
                                        <button on:click="{() => showCreateLensHandleModal = true}" class="btn">Create
                                            Lens
                                            Handle
                                        </button>
                                    {/if}
                                {:else}
                                    <button class="btn" disabled>
                                        Signing In &nbsp;
                                        <Loader/>
                                    </button>
                                {/if}
                            </div>
                        </div>
                    {/if}
                {/if}
            {/if}
            <div class="menu__options">
                <a href="/" class="CenterRowFlex menu__options__item">
                    <div class="menu__options__item__icon">
                        <DualToneIcon d1={home} d2={homeDualTone}/>
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
                    <button on:click="{() => showJoinForUpdatesModal = true}"
                            class="btn-alt"
                            style="--btn-alt-color: #1e4748;">
                        Join For Updates
                    </button>
                </div>
            </div>
        </div>
    {/if}
    <div class:body-margin-on-menu-active={menuActive}
         class="body">
        <slot/>
    </div>
</main>

<CreateLensHandle bind:showCreateLensHandleModal/>

<JoinForUpdates bind:showJoinForUpdatesModal/>
</Notifications>
<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  .nav {
    justify-content: space-between;
    padding: 0.3rem 2rem;
    gap: 1rem;
    background: rgba(0, 0, 0, 0.10);
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
    background: linear-gradient(172deg, rgba(50, 249, 255, 0.15) 33.55%, rgba(236, 254, 255, 0.15) 100%);
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
    height: 3.5rem;
    width: 3.5rem;
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
    border: 4px solid #32F9FF;
  }

  .menu__user-box__handle {
    padding: 1rem 2rem;
    background: #034242;
    border-radius: 20px;
    color: #32F9FF;
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
