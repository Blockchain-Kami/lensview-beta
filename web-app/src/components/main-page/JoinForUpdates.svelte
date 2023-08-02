<script>

    export let showJoinForUpdatesModal; // boolean

    let dialog;

    $: if (dialog && showJoinForUpdatesModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
        bind:this={dialog}
        on:close={() => (showJoinForUpdatesModal = false)}
        on:click|self={() => dialog.close()}
>
    <main on:click|stopPropagation>
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
  }

  .head {
    justify-content: center;
  }

  .body {
    gap: 2rem;
  }

  .body img {
    width: 4rem;
    height: 4rem;
  }

</style>
