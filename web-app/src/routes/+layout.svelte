<script lang="ts">
    import "../global.css";
    import userAddress from "../services/userAddress";

    let isConnected = false;
    let isSignedIn = false;

    async function connect() {
        /* this allows the user to connect their wallet */
        try {
            const account = await window.ethereum.send('eth_requestAccounts')
            if (account.result.length) {
                userAddress.set(account.result[0]);
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

            isSignedIn = true;
        }
        catch (error){
            console.log("Error creating client");
            isSignedIn = false;
        }
        /**** Get User Profile ****/
    }

</script>


<!---------------------------------- HTML --------------------------->
<main>
    <div class="CenterRowFlex main">
        <div class="CenterColumnFlex menu">
            <div class="CenterColumnFlex main__menu__items">
                <div class="main__menu__items__item main__menu__items__item--logo">
                    <img src="https://img.icons8.com/ios/50/000000/medium-monogram--v1.png" alt="logo"/>
                </div>
                <div class="main__menu__items__item">Home</div>
                <div class="main__menu__items__item">Explore</div>
                <div class="main__menu__items__item">How It Works</div>
                <div class="main__menu__items__item">About</div>
            </div>
            <div class="main__menu__user">
                {#if !isConnected}
                    <button on:click="{connect}" class="btn">Connect  Wallet</button>
                {:else}
                    {#if !isSignedIn}
                        <button on:click="{signInWithLens}" class="btn">Sign-In With Lens</button>
                    {:else}
                        <div class="main__menu__user__profile">
                            {$userAddress.slice(0,5)} ... {$userAddress.slice(-5)}
                        </div>
                    {/if}
                {/if}
            </div>
        </div>
        <div class="CenterColumnFlex middle">
            <slot name="middle"></slot>
        </div>$userA<div class="right">
            <slot name="CenterColumnFlex right"></slot>
        </div>
    </div>
</main>
<!-------------------------------------------------------------------------->

<!---------------------------------- Style --------------------------->
<style lang="scss">
    .menu{
        width: 15%;
        height: 100vh;
        justify-content: space-between;
        padding: 2rem 1rem;
    }

    .middle{
      width: 35%;
      height: 100vh;
      background-color: aliceblue;
      padding: 2rem 1.5rem;
      justify-content: flex-start;
      gap: 1rem;
    }

    .right{
      width: 50%;
      height: 100vh;
      padding: 2rem 1.5rem;
      justify-content: flex-start;
      gap: 1rem;
      background: azure;
    }


</style>

<!-------------------------------------------------------------------->
