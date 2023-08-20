<script lang="ts">
    import Icon from "$lib/Icon.svelte";
    import { close, cross, tick, wallet } from "../utils/frontend/appIcon";
    import Loader from "$lib/Loader.svelte";
    import { userAuthentication } from "../utils/frontend/authenticate";
    import getUserProfiles from "../utils/frontend/getUserProfiles";
    import getDefaultUserProfile from "../utils/frontend/getDefaultUserProfile";
    import { userProfile } from "../services/profile";
    import CreateLensHandle from "./CreateLensHandle.svelte";
    import { isSignedIn } from "../services/signInStatus";
    import { userAddress } from "../services/userAddress";
    import { PUBLIC_IS_PROD } from "$env/static/public";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { backInOut } from "svelte/easing";
    import { getNotificationsContext } from "svelte-notifications";
    import { reloadCommentOfAPublication } from "../services/reloadCommentOfAPublication";


    const {addNotification} = getNotificationsContext();
    export let showLoginModal: boolean;
    let dialog: HTMLDialogElement;
    $: if (dialog && showLoginModal) dialog.showModal();

    let isConnected = false;
    let signingIn = false;
    let isHandleCreated = true;
    let showCreateLensHandleModal = false;
    let isThisConnectWalletAccountChange = false;
    let chainIDToBeUsed: string;


    onMount(async () => {

        if (PUBLIC_IS_PROD === "false") {
            chainIDToBeUsed = "0x13881";
        } else {
            chainIDToBeUsed = "0x89";
        }

        if (typeof window.ethereum === "undefined") {
            // alert("Please install metamask to interact with this application, but you can still view the others posts");
        }

        window.ethereum.on("chainChanged", (chainId: string) => {
            if (chainId !== chainIDToBeUsed) {
                window.location.reload();
            }
        });

        window.ethereum.on("accountsChanged", (switchedAddress: string) => {
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
            dialog.close();
            addNotification({
                position: 'top-right',
                heading: 'Please install Metamask',
                description: 'Please install metamask to post as yourself, you can still view others posts and post anonymously',
                type: wallet,
                removeAfter: 15000,
                ctaBtnName: "Install Metamask",
                ctaFunction: () => {
                    window.open("https://metamask.io/", "_blank");
                }
            });
        } else {
            /* this allows the user to connect their wallet */
            try {
                await switchUserToCorrectChain();

                isThisConnectWalletAccountChange = true;

                const account = await window.ethereum.request({method: "eth_requestAccounts"});

                isThisConnectWalletAccountChange = false;
                if (account.length) {
                    userAddress.setUserAddress(account[0]);
                    isConnected = true;
                } else {
                    isConnected = false;
                }
                console.log("Account : " + JSON.stringify(account));
                console.log("isConnected : " + isConnected);
                console.log("")
            } catch (error) {
                isThisConnectWalletAccountChange = false;
                console.log(error);
                dialog.close();
                addNotification({
                    position: 'top-right',
                    heading: 'Error while connecting wallet',
                    description: 'Please try again to connect',
                    type: cross,
                    removeAfter: 3000
                });
            }
        }
    }

    const switchUserToCorrectChain = async () => {
        const chainId = await window.ethereum.request({method: "eth_chainId"});

        console.log("Chain Id : " + chainId);

        if (chainId !== chainIDToBeUsed) {
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{chainId: chainIDToBeUsed}]
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
                successfullySignInNotification();
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
                successfullySignInNotification();
            }

        } catch (error) {
            console.log("Error authenticating user");
            isSignedIn.setSignInStatus(false);
            signingIn = false;
            dialog.close();
            addNotification({
                position: 'top-right',
                heading: 'Error while signing-in',
                description: 'Please try again to sign-in',
                type: cross,
                removeAfter: 3000
            });
        }
    };

    const successfullySignInNotification = () => {
        dialog.close();
        addNotification({
            position: 'top-right',
            heading: 'Successfully signed-in',
            description: 'You have successfully signed-in to Lens Views',
            type: tick,
            removeAfter: 3000
        });
    }

    const openCreateLensHandleModal = () => {
        showCreateLensHandleModal = true;
        dialog.close();
    }

    const checkIsSignedIn = () => {
        let isSignedInVal;
        const unsubscribe = isSignedIn.subscribe((val) => {
                isSignedInVal = val;
            }
        );
        unsubscribe();

        return isSignedInVal;
    }

    const bodyMessage = () => {
        if (!isConnected) {
            return;
        }

        if (!checkIsSignedIn()) {
            return
        }

        if (!isHandleCreated) {
            return
        }
    }

    $: if (isConnected !== isConnected ||
        checkIsSignedIn() !== checkIsSignedIn() ||
        isHandleCreated !== isHandleCreated
    ) {
        bodyMessage();
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
        bind:this={dialog}
        on:close={() => (showLoginModal = false)}
        on:click|self={() => dialog.close()}
>
    {#if showLoginModal}
        <main on:click|stopPropagation transition:fly={{ y: 40, easing: backInOut, duration: 700 }}>
            <div class="CenterRowFlex head">
                <div class="h3">
                    Login
                </div>
                <div class="head__close-btn">
                    <button on:click={() => dialog.close()}>
                        <Icon d={close}/>
                    </button>
                </div>
            </div>

            {#if !isConnected}
                <div class="body">
                    Please connect your wallet to continue
                </div>
                <div class="line"></div>
                <div class="footer">
                    <button on:click="{connect}"
                            class="btn">
                        Connect Wallet
                    </button>
                </div>
            {:else}
                {#if !$isSignedIn}
                    {#if !signingIn}
                        {#if isHandleCreated}
                            <div class="body">
                                Please sign-in with Lens
                            </div>
                            <div class="line"></div>
                            <div class="footer">
                                <button on:click="{signInWithLens}"
                                        class="btn">
                                    Sign-In With Lens
                                </button>
                            </div>
                        {:else}
                            <div class="body">
                                No Account found!
                                <br>
                                Please create lens handle to sign-up
                            </div>
                            <div class="line"></div>
                            <div class="footer">
                                <button on:click="{openCreateLensHandleModal}" class="btn">
                                    Create Lens Handle
                                </button>
                            </div>
                        {/if}
                    {:else}
                        <div class="body">
                            Please sign-in with Lens
                        </div>
                        <div class="line"></div>
                        <div class="footer">
                            <button class="btn" disabled>
                                Signing In &nbsp;
                                <Loader/>
                            </button>
                        </div>
                    {/if}
                {/if}
            {/if}

        </main>
    {/if}

</dialog>

<CreateLensHandle bind:showCreateLensHandleModal/>


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
