<script lang="ts">
  import { fly } from "svelte/transition";
  import { backInOut } from "svelte/easing";
  import Twitter from "$lib/assets/Twitter.svg";
  import Linkedin from "$lib/assets/Linkedin.svg";
  import Mail from "$lib/assets/Mail.svg";
  import Discord from "$lib/assets/Discord.svg";
  import Instagram from "$lib/assets/Instagram.svg";
  import Reddit from "$lib/assets/Reddit.svg";
  import Telegram from "$lib/assets/Telegram.svg";

  export let showJoinForUpdatesModal: boolean; // boolean

    let dialog: HTMLDialogElement;

    $: if (dialog && showJoinForUpdatesModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
        bind:this={dialog}
        on:close={() => (showJoinForUpdatesModal = false)}
        on:click|self={() => dialog.close()}
>
    {#if showJoinForUpdatesModal}
        <main on:click|stopPropagation transition:fly={{ y: 40, easing: backInOut, duration: 700 }}>
            <div class="CenterRowFlex head">
                <div class="h3 head__title">
                  Join for updates
                </div>
            </div>
            <div class="CenterRowFlex body">
                <a href="https://twitter.com/lensview_" target="_blank">
                    <img src={Twitter} alt="">
                </a>
              <a href="https://discord.gg/ZB6snNmTnh" target="_blank">
                <img src={Discord} alt="">
                </a>
                <a href="https://www.linkedin.com/company/lensviewio" target="_blank">
                    <img src={Linkedin} alt="">
                </a>
                <a href="https://getwaitlist.com/waitlist/8129" target="_blank">
                    <img src={Mail} alt="">
                </a>
              <a href="https://www.instagram.com/lensview.lens/" target="_blank">
                    <img src={Instagram} alt="">
                </a>
              <a href="https://www.reddit.com/r/lensview/" target="_blank">
                <img src={Reddit} alt="">
              </a>
              <a href="https://t.me/lensviewio" target="_blank">
                <img src={Telegram} alt="">
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
