<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import { close } from "../utils/app-icon.util";
  import { backInOut } from "svelte/easing";
  import { fly } from "svelte/transition";

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
  {#if showTestModal}
    <main
      on:click|stopPropagation
      transition:fly={{ y: 40, easing: backInOut, duration: 700 }}
    >
      <div class="CenterRowFlex head">
        <div class="h3 head__title">Heading</div>
        <div class="head__close-btn">
          <button on:click={() => dialog.close()}>
            <Icon d={close} />
          </button>
        </div>
      </div>
      <div class="body">Testing</div>
      <div class="line" />
      <div class="footer">
        <button class="btn">Test</button>
      </div>
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
