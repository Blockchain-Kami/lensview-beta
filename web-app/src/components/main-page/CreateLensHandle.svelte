<script>
  import createLensHandle from "../../utils/frontend/createLensHandle.ts";
  import { isSignedIn } from "../../services/signInStatus.ts";
  import checkTxHashBeenIndexed from "../../utils/frontend/checkTxHashBeenIndexed.ts";
  import getDefaultUserProfile from "../../utils/frontend/getDefaultUserProfile.ts";
  import { userProfile } from "../../services/profile.ts";
  import getUserProfiles from "../../utils/frontend/getUserProfiles.ts";

  export let showCreateLensHandleModal; // boolean

  let dialog;
  let userEnteredHandle = "";
  let isCreatingLensHandle = false;

  $: if (dialog && showCreateLensHandleModal) dialog.showModal();

  const initiateCreateLensHandle = async () => {
    isCreatingLensHandle = true;
    const response = await createLensHandle(userEnteredHandle);

    if (response.data.createProfile?.reason === "HANDLE_TAKEN") {
      isCreatingLensHandle = false;
      alert("Handle already taken, please try again with a different handle");
    }

    if (response.data.createProfile?.txHash) {
      await isTxHashed(response.data.createProfile.txHash);
    } else {
      isCreatingLensHandle = false;
      alert("Something went wrong, please try again");
    }
  };

  //TODO: Update this function so that don't have to wait 15 seconds
  const isTxHashed = async (txHash) => {
    const response = await checkTxHashBeenIndexed(txHash);
    console.log("checking if txHashed" + response.data?.hasTxHashBeenIndexed?.indexed);

    // if(response.data?.hasTxHashBeenIndexed?.indexed === 'true'){
    setTimeout(async () => {
      isCreatingLensHandle = false;

      const defaultProfile = await getDefaultUserProfile();

      if (defaultProfile !== null) {
        userProfile.setUserProfile(defaultProfile);
      } else {
        const fetchedProfiles = await getUserProfiles();
        userProfile.setUserProfile(fetchedProfiles[0]);
      }

      isSignedIn.setSignInStatus(true);
      dialog.close();
    }, 15000);

    // }
    // else{
    //   setTimeout(() => {
    //     isTxHashed(txHash)
    //   }, 1000);
    // }
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:close={() => (showCreateLensHandleModal = false)}
  on:click|self={() => dialog.close()}
>
  <main on:click|stopPropagation>
    <div class="head">
      <h2>Sign Up</h2>
      <button on:click={() => dialog.close()}>X</button>
    </div>
    <div class="body">
      <div class="body__content">
        Create Your Lens Handle
      </div>
      <div class="body__input">
        <input type="text" placeholder="Vitalik" bind:value={userEnteredHandle}>
      </div>
      <div class="body__notes">
        <div class="body__notes__note">
          Your Lens Handle is a unique identifier that will be used to identify you on the Lens Network.
        </div>
        <div class="body__notes__note">
          Please enter alphanumeric characters only.Your Lens Handle must be between 5 and 20 characters long.
        </div>
        <div class="body__notes__note">
          Your handle will receive the `.test` extension on lens testnet.
        </div>
      </div>
    </div>
    <div class="footer">
      {#if !isCreatingLensHandle}
        <button class="btn" on:click={initiateCreateLensHandle}>Create</button>
      {:else}
        <button class="btn" disabled>Creating...</button>
      {/if}
    </div>
  </main>
</dialog>

<style lang="scss">
  main {
    display: flex;
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  .head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: larger;
    font-weight: 600;
    align-items: center;
  }

  .head button {
    background: gainsboro;
    padding: 0.5rem 0.75rem;
    border-radius: 50%;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .body__content {
    font-weight: 500;
  }

  .body__notes {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.85rem;
  }

  .footer {
    margin-left: auto;
  }

  input[type="text"] {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  input[type="text"]:focus {
    border-color: #161617;
    outline: none;
  }


  dialog {
    max-width: 32em;
    border-radius: 0.5em;
    border: none;
    padding: 0;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  dialog[open] {
    animation: fade-in 0.3s ease-in-out;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  dialog[open]::backdrop {
    animation: fade-in-backdrop 0.2s ease-out;
  }

  @keyframes fade-in-backdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

</style>
