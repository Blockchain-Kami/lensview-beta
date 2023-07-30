<script lang="ts">
    import AddNewPost from "../main-page/AddNewPost.svelte";
    import JoinForUpdates from "./JoinForUpdates.svelte";

    let showAddNewPostModal = false;
    let showJoinForUpdatesModal = false;
</script>


<!----------------------------- HTML ----------------------------->
<section>
    <div class="h2 content">
        The <span style="color: var(--primary)">omnipresent comment section</span> to discuss, fact-check, and share
        your views about the web page
    </div>
    <div class="btn-box">
        <button on:click={() => showAddNewPostModal = true}
                class="btn">
            Create a thread
        </button>
        <button on:click={() => showJoinForUpdatesModal = true}
                class="btn-alt">
            Join for updates
        </button>
    </div>
</section>

<AddNewPost title="Create a new thread" bind:showAddNewPostModal/>
<JoinForUpdates bind:showJoinForUpdatesModal/>

<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  section {
    display: flex;
    flex-direction: row;
    padding: 3rem;
    gap: 2rem;
    border-radius: 20px;
    background: var(--bg);
    border-left: 2px solid var(--primary);
    box-shadow: rgba(0, 0, 0, 0.25) 0 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

  .content {
    line-height: 1.5;
    max-width: 72rem;
  }

  .btn-box {
    display: flex;
    margin-left: auto;
    flex-direction: column;
    justify-content: space-evenly;
    min-width: fit-content;
    gap: 1.5rem;
  }
</style>
<!----------------------------------------------------------------->
