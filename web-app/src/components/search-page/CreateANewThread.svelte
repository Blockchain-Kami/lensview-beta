<script lang="ts">
    import AddNewPost from "../main-page/AddNewPost.svelte";

    let showAddNewPostModal = false;
</script>


<!----------------------------- HTML ----------------------------->
<section>
    <div class="content">
        <div class="h3 content__err-msg">
            Oops, we might not have what you are looking for right now.
        </div>
        <div class="h2 content__next-step-msg">
            <div class="content__next-step-msg__1">
                But you can always start a new discussion by
            </div>
            <div class="content__next-step-msg__2">
                creating one!
            </div>
        </div>
    </div>
    <div class="create-btn">
        <button on:click={() => showAddNewPostModal = true}
                class="btn">
            Create a thread
        </button>
    </div>

</section>

<AddNewPost title="Create a new thread" bind:showAddNewPostModal/>

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
    border-top: 0.1px solid var(--primary);
    border-left: 0.1px solid var(--primary);
    box-shadow: rgba(0, 0, 0, 0.25) 0 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .content__next-step-msg {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .content__next-step-msg__2 {
    color: var(--primary);
  }

  .create-btn {
    margin-top: auto;
    margin-left: auto;
  }
</style>
<!----------------------------------------------------------------->
