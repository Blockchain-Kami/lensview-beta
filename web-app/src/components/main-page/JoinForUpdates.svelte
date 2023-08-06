<script lang="ts">
    import {fly} from 'svelte/transition'
    import {backInOut} from "svelte/easing";

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
                    Join For Updates
                </div>
            </div>
            <div class="CenterRowFlex body">
                <a href="https://twitter.com/lensview_" target="_blank">
                    <img src={'/src/lib/assets/Twitter.svg'} alt="">
                </a>
                <a href="https://www.linkedin.com/company/lensviewio" target="_blank">
                    <img src={'/src/lib/assets/Linkedin.svg'} alt="">
                </a>
                <a href="https://getwaitlist.com/waitlist/8129" target="_blank">
                    <img src={'/src/lib/assets/Mail.svg'} alt="">
                </a>
                <a href="https://twitter.com/lensview_" target="_blank">
                    <img src={'/src/lib/assets/Discord.svg'} alt="">
                </a>
                <a href="https://twitter.com/lensview_" target="_blank">
                    <img src={'/src/lib/assets/Instagram.svg'} alt="">
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
  }

  .body img {
    width: 4rem;
    height: 4rem;
  }

</style>
