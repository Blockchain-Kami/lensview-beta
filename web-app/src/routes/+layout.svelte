<script lang="ts">
    import "../global.css";
    import { userAddress } from "../services/userAddress";
    import { userAuthentication } from "../utils/frontend/authenticate";

    let isConnected = false;
    let isSignedIn = false;
    let signingIn = false;
    let userEnteredLink = "";

    /**TODO: 1. Check for chain and if it is not polygon testnet then do necessary changes
     *       2. Check if there is any stored address in local storage if yes then do not ask for connect wallet
     *       3. Check if refresh token is present in local storage and not expired, if yes then do not ask for sign in
     */

    async function connect() {
        /* this allows the user to connect their wallet */
        try {
            const account = await window.ethereum.request({method :'eth_requestAccounts'});
            console.log("Account : " + JSON.stringify(account));
            if (account.length) {
                userAddress.setUserAddress(account[0]);
                isConnected = true;
            } else {
                isConnected = false;
            }
        } catch (error) {
            console.log(error)
        }
    }

    const signInWithLens = async () => {
        /*** Authenticate **/
        try{
            signingIn = true;
            await userAuthentication();
            signingIn = false;
            isSignedIn = true;
        }
        catch (error){
            console.log("Error authenticating user");
            isSignedIn = false;
            signingIn = false;
        }
    }

</script>


<!---------------------------------- HTML --------------------------->
<main>
        <div class="CenterColumnFlex menu">
            <div class="CenterColumnFlex menu__items">
                <div class="menu__items__item menu__items__item--logo">
                    <img src="https://img.icons8.com/ios/50/000000/medium-monogram--v1.png" alt="logo"/>
                </div>
                <div class="menu__items__item">Home</div>
                <div class="menu__items__item">Explore</div>
                <div class="menu__items__item">How It Works</div>
                <div class="menu__items__item">About</div>
            </div>
            <div class="menu__user">
                {#if !isConnected}
                    <button on:click="{connect}" class="btn">Connect  Wallet</button>
                {:else}
                    {#if !isSignedIn}
                        {#if !signingIn}
                            <button on:click="{signInWithLens}" class="btn">Sign-In With Lens</button>
                        {:else}
                            Signing In ...
                        {/if}
                    {:else}
                        <div class="menu__user__profile">
                            {$userAddress.slice(0,5)} ... {$userAddress.slice(-5)}
                        </div>
                    {/if}
                {/if}
            </div>
        </div>
        <div class="CenterRowFlex search-box">
        <input bind:value={userEnteredLink} type="text" class="search-box__input" placeholder="Search for a publication">
        <button disabled={userEnteredLink.length === 0} class="btn">
            Search
        </button>
    </div>
        <slot/>
</main>
<!------------------------------------------------------------------->

<!---------------------------------- Style --------------------------->
<style lang="scss">
    main{
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    .menu{
        width: 15%;
        height: 100vh;
        justify-content: space-between;
        padding: 2rem 1rem;
    }

    .menu__user__profile{
        padding: 1rem;
        background: greenyellow;
        border-radius: 39px;
    }

    .menu__items{
        width: 100%;
        gap: 1rem;
    }

    .menu__items__item{
        width: 100%;
        background: lightgray;
        padding: 0.75rem;
        border-radius: 8px;
    }

    .search-box{
        position: absolute;
        width: 35%;
        justify-content: space-around;
        top: 2rem;
        left: 15%;
    }

    .search-box__input{
        width: 68%;
        padding: 0.65rem;
        border-radius: 8px;
        border: 1px solid lightgray;
        outline: 0;
    }

</style>
<!-------------------------------------------------------------------->