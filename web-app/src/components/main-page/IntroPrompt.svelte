<script lang="ts">
    import AddNewPost from "../main-page/AddNewPost.svelte";
    import JoinForUpdates from "./JoinForUpdates.svelte";

    let showAddNewPostModal = false;
    let showJoinForUpdatesModal = false;
</script>


<!----------------------------- HTML ----------------------------->
<section>
    <div class="content">
        <div class="content__sub-title">
            Experience the <span style="color: var(--primary)"> omnipresent comment section </span> of the web
        </div>
        <div class="h2 content__title">
            <span style="color: var(--primary)">Discuss, fact-check & share
            your views</span> about any web page
        </div>
    </div>
    <div class="btn-box">
        <button on:click={() => showAddNewPostModal = true}
                class="btn">
            Create a post
        </button>
        <button on:click={() => showJoinForUpdatesModal = true}
                class="btn-alt">
            Join for updates
        </button>
    </div>
</section>

<AddNewPost bind:showAddNewPostModal/>
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
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .content__sub-title {
    font-size: var(--medium-font-size);
    font-weight: var(--semi-medium-font-weight);
  }

  .content__title {
    line-height: 1.2;
    max-width: 54rem;
  }

  .btn-box {
    display: flex;
    margin-left: auto;
    flex-direction: column;
    justify-content: space-evenly;
    min-width: fit-content;
    gap: 1.5rem;
  }

  .btn-box button {
    min-width: fit-content;
  }

  @media only screen and (max-width: 1024px) {
    section {
      flex-direction: column;
    }

    .content__sub-title {
      font-size: var(--small-font-size);
    }

    .content__title {
      font-size: var(--medium-font-size);
    }

    .btn-box {
      flex-direction: row;
      margin-left: unset;
      justify-content: flex-start;
    }
  }
</style>
<!----------------------------------------------------------------->
