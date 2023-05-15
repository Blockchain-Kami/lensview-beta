<script lang="ts">
  import "../global.css";
  import { userAddress } from "../services/userAddress";
  import { userAuthentication } from "../utils/frontend/authenticate";
  import { goto } from "$app/navigation";
  import createHash from "../utils/frontend/createURLHash";
  import { isSignedIn } from "../services/signInStatus";
  import { userEnteredURL } from "../services/userEnteredURL";
  import getDefaultUserProfile from "../utils/frontend/getDefaultUserProfile";
  import CreateLensHandle from "../components/main-page/CreateLensHandle.svelte";
  import { userProfile } from "../services/profile";
  import getUserProfiles from "../utils/frontend/getUserProfiles";

  let isConnected = false;
  let signingIn = false;
  let userEnteredLink = "";
  let showCreateLensHandleModal = false;
  let isHandleCreated = true;

  /**TODO: 1. Check for chain and if it is not polygon testnet then do necessary changes
   *       2. Check if there is any stored address in local storage if yes then do not ask for connect wallet
   *       3. Check if refresh token is present in local storage and not expired, if yes then do not ask for sign in
   *       4. Handle scenarios when user switches network
   */

  async function connect() {
    /* this allows the user to connect their wallet */
    try {
      const account = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (account.length) {
        userAddress.setUserAddress(account[0]);
        isConnected = true;
      } else {
        isConnected = false;
      }
      console.log("Account : " + JSON.stringify(account));
    } catch (error) {
      console.log(error);
    }
  }

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
        signingIn = false;
        isSignedIn.setSignInStatus(true);
      }

    } catch (error) {
      console.log("Error authenticating user");
      isSignedIn.setSignInStatus(false);
      signingIn = false;
    }
  };

  const redirectToPostsPage = async () => {
    userEnteredURL.set(userEnteredLink);
    const hash = await createHash(userEnteredLink);
    goto(`/posts/${hash}`);
  };
</script>


<!---------------------------------- HTML --------------------------->
<main>
  <div class="CenterColumnFlex menu">
    <div class="CenterColumnFlex menu__items">
      <div class="menu__items__item menu__items__item--logo"
           style="background:none; margin-right: 60px; padding-bottom: 0; padding-top: 0; margin-bottom: 40px">
        <a href="/"><img alt="Untitled-presentation-3" height="80px"
                         src="https://i.postimg.cc/mgzXmdNF/Screenshot-2023-05-08-at-11-42-29-PM.png"
                         width="190px" /></a>
      </div>
      <div class="menu__items__item">
        <a href="/">Home</a>
      </div>
      <div class="menu__items__item">Explore</div>
      <div class="menu__items__item">How It Works</div>
      <div class="menu__items__item">About</div>
    </div>
    <div class="menu__user">
      {#if !isConnected}
        <button on:click="{connect}" class="btn">Connect Wallet</button>
      {:else}
        {#if !$isSignedIn}
          {#if !signingIn }
            {#if isHandleCreated}
              <button on:click="{signInWithLens}" class="btn">Sign-In With Lens</button>
            {:else}
              <button on:click="{() => showCreateLensHandleModal = true}" class="btn">Create Lens Handle</button>
            {/if}
          {:else}
            Signing In ...
          {/if}
        {:else}
          <div class="menu__user__profile">
            {$userProfile.handle}
            <!--{$userAddress.slice(0, 5)} ... {$userAddress.slice(-5)}-->
          </div>
        {/if}
      {/if}
    </div>
  </div>
  <div class="CenterRowFlex search-box">
    <input bind:value={userEnteredLink} type="text" class="search-box__input" placeholder="Search for a link">
    <button on:click={redirectToPostsPage} disabled={userEnteredLink.length === 0} class="btn">
      Search
    </button>
  </div>
  <slot />

</main>

<CreateLensHandle bind:showCreateLensHandleModal>
</CreateLensHandle>


<!------------------------------------------------------------------->

<!---------------------------------- Style --------------------------->
<style lang="scss">
  main {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .menu {
    width: 15%;
    height: 100vh;
    justify-content: space-between;
    padding: 2rem 1rem;
  }

  .menu__user {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .menu__user__profile {
    padding: 1rem;
    background: greenyellow;
    border-radius: 39px;
  }

  .menu__items {
    width: 100%;
    gap: 1rem;
  }

  .menu__items__item {
    width: 100%;
    background: rgb(191, 230, 107);
    background: radial-gradient(circle, rgba(191, 230, 107, 1) 35%, rgba(215, 251, 144, 1) 100%);
    padding: 0.75rem;
    border-radius: 8px;
  }

  .search-box {
    position: absolute;
    width: 35%;
    justify-content: space-around;
    top: 2rem;
    left: 15%;
  }

  .search-box__input {
    width: 68%;
    padding: 0.65rem;
    border-radius: 8px;
    border: 1px solid lightgray;
    outline: 0;
  }

</style>
<!-------------------------------------------------------------------->
