<script lang="ts">
  import { fly } from "svelte/transition";
  import { backInOut } from "svelte/easing";
  import Twitter from "$lib/assets/Twitter.svg";
  import Discord from "$lib/assets/Discord.svg";
  import Telegram from "$lib/assets/Telegram.svg";

  export let showGetTestMaticModal: boolean; // boolean

  let dialog: HTMLDialogElement;

  $: if (dialog && showGetTestMaticModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:close={() => (showGetTestMaticModal = false)}
  on:click|self={() => dialog.close()}
>
  {#if showGetTestMaticModal}
    <main
      on:click|stopPropagation
      transition:fly={{ y: 40, easing: backInOut, duration: 700 }}
    >
      <div class="CenterRowFlex head">
        <div class="h3 head__title">Get test MATIC</div>
      </div>
      <div class="CenterRowFlex body">
        <a
          href="https://twitter.com/messages/compose?recipient_id=791284079370973184&text=Hello%20Anjay%21%20%F0%9F%91%8B%2C%20%20If%20possible%2C%20could%20you%20kindly%20send%20over%20some%20test%20MATIC%3F%20%20%0AI%27m%20planning%20to%20make%20a%20post%20on%20%40lensview_%0AMy%20wallet%20address%3A%20"
          data-screen-name="@AnjaySahoo"
          target="_blank"
        >
          <img src={Twitter} alt="" />
        </a>
        <a href="https://discord.gg/GAg3YuNB3a" target="_blank">
          <img src={Discord} alt="" />
        </a>
        <a href="https://t.me/lensviewiosupport" target="_blank">
          <img src={Telegram} alt="" />
        </a>
      </div>
    </main>
  {/if}
</dialog>

<style lang="scss">
  main {
    display: flex;
    padding: 2rem;
    flex-direction: column;
    gap: 2rem;
    background: var(--bg) fixed;
    color: var(--text);
    min-width: 29rem;
    border-radius: 10px;
  }

  .head {
    justify-content: center;
    border-radius: 10px;
  }

  .body {
    gap: 2rem;
    flex-wrap: wrap;
  }

  .body img {
    width: 4rem;
    height: 4rem;
  }
</style>
