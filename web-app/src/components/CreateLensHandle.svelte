<script lang="ts">
  import createLensHandle from "../utils/frontend/createLensHandle";
  import {isSignedIn} from "../services/signInStatus";
  import getDefaultUserProfile from "../utils/frontend/getDefaultUserProfile";
  import {userProfile} from "../services/profile";
  import getUserProfiles from "../utils/frontend/getUserProfiles";
  import checkTxHashBeenIndexed from "../utils/checkTxHashBeenIndexed";
  import Icon from "$lib/Icon.svelte";
  import {close} from "../utils/frontend/appIcon";
  import Loader from "$lib/Loader.svelte";

  export let showCreateLensHandleModal: boolean; // boolean

  let dialog: HTMLDialogElement;
  let userEnteredHandle = "";
  let isCreatingLensHandle = false;
  let isInputInvalid = true;
  let inputInvalidReason = "";

  $: if (dialog && showCreateLensHandleModal) dialog.showModal();

  const initiateCreateLensHandle = async () => {
    isCreatingLensHandle = true;
    const response = await createLensHandle(userEnteredHandle);

    if (response.data.createProfile?.reason === "HANDLE_TAKEN") {
      isCreatingLensHandle = false;
      alert("Handle already taken, please try again with a different handle");
    }

    if (response.data.createProfile?.txHash) {
      await checkUntilProfileIsCreated(response.data.createProfile?.txHash, Date.now());
    } else {
      isCreatingLensHandle = false;
      alert("Something went wrong, please try again");
    }
  };

  const checkUntilProfileIsCreated = async (txHash: string, startTime: number) => {

    /** If handle is not created within 25 seconds, then stop checking */
    if (Date.now() - startTime > 25000) {
      isCreatingLensHandle = false;
      alert("Something went wrong, please try again");
      return;
    }

    const hasIndexedResponse = await checkTxHashBeenIndexed(txHash);

    if (hasIndexedResponse?.data?.hasTxHashBeenIndexed?.indexed === false) {
      console.log("Waiting for tx to be indexed");
      setTimeout(() => checkUntilProfileIsCreated(txHash, startTime), 100);
    } else {
      const defaultProfile = await getDefaultUserProfile();

      if (defaultProfile !== null) {
        userProfile.setUserProfile(defaultProfile);
      } else {
        const fetchedProfiles = await getUserProfiles();
        userProfile.setUserProfile(fetchedProfiles[0]);
      }

      isSignedIn.setSignInStatus(true);
      dialog.close();
    }
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
  on:close={() => (showCreateLensHandleModal = false)}
  on:click|self={() => dialog.close()}
>
  <main on:click|stopPropagation>
    <div class="CenterRowFlex head">
      <div class="h2 head__title">
        Sign Up
      </div>
      <div class="head__close-btn">
        <button on:click={() => dialog.close()}>
          <Icon d={close} color="black"/>
        </button>
      </div>
    </div>
    <div class="body">
      <div class="body__content">
        Create Your Lens Handle
      </div>
      <div class="body__input">
        <input type="text" placeholder="vitalik" bind:value={userEnteredHandle} on:input={checkInputIsValid}>
        {#if isInputInvalid}
          <div class="body__input__err-msg">{inputInvalidReason}</div>
        {/if}
      </div>
      <div class="body__notes">
        <div class="body__notes__note">
          Your Lens Handle is a unique identifier that will be used to identify you on the Lens Network.
        </div>
        <div class="body__notes__note">
          Your handle will receive the `.test` extension on lens testnet.
        </div>
      </div>
    </div>
    <div class="footer">
      {#if !isCreatingLensHandle}
        <button class="btn" on:click={initiateCreateLensHandle} disabled={isInputInvalid}>Create Lens Handle</button>
      {:else}
        <button class="btn" disabled>Creating &nbsp;
          <Loader/>
        </button>
      {/if}
    </div>
  </main>
</dialog>

<style lang="scss">
  main {
    display: flex;
    padding: 2rem;
    flex-direction: column;
    gap: 2rem;
    background: var(--bg) fixed;
    color: var(--text);
    min-width: 21rem;
  }

  .head {
    justify-content: space-between;
  }

  .head__close-btn {
    border-radius: 3px;
    background: var(--btn-bg) fixed;
    padding: 0.2rem;
  }

  .body {
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

  .body__notes {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: var(--small-font-size);
  }

  .footer {
    margin-left: auto;
  }

</style>
