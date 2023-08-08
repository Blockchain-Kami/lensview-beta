<script lang="ts">
    import AddNewPost from "../main-page/AddNewPost.svelte";

    let showAddNewPostModal = false;
</script>


<!----------------------------- HTML ----------------------------->
<section>
    <div class="content">
        <div class="h3 content__sub-title">
            Oops, we might not have what you are looking for right now.
        </div>
        <div class="h2 content__title">
            But you can always start a new discussion or share your views by
            <span style="color: var(--primary);">creating one!</span>
        </div>
    </div>
    <div class="create-btn">
        <button on:click={() => showAddNewPostModal = true}
                class="btn">
            Create a Post
        </button>
    </div>

</section>

<AddNewPost bind:showAddNewPostModal/>

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
    max-width: 72rem;
  }

  .create-btn {
    margin-top: auto;
    margin-left: auto;
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

    .create-btn {
      flex-direction: row;
      margin-left: unset;
      justify-content: flex-start;
    }
  }
</style>
<!----------------------------------------------------------------->
