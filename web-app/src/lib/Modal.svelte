<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import {close} from "../utils/frontend/appIcon";

  export let showTestModal: boolean;

  let dialog: HTMLDialogElement;

  $: if (dialog && showTestModal) dialog.showModal();

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
        bind:this={dialog}
        on:close={() => (showTestModal = false)}
        on:click|self={() => dialog.close()}
>
  <main on:click|stopPropagation>
    <div class="CenterRowFlex head">
      <div class="h3 head__title">
        Heading
      </div>
      <div class="head__close-btn">
        <button on:click={() => dialog.close()}>
          <Icon d={close}/>
        </button>
      </div>
    </div>
    <div class="body">
      Testing
    </div>
    <div class="line"></div>
    <div class="footer">
      <button class="btn">Test</button>
    </div>
  </main>
</dialog>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    background: #1e4748 fixed;
    color: var(--text);
    min-width: 21rem;
  }

  .head {
    justify-content: space-between;
    background: #18393a;
    padding: 1.2rem;
    color: var(--primary);
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
