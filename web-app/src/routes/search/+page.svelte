<script lang="ts">
    import FoundedPosts from "../../components/search-page/FoundedPosts.svelte";
    import CreateANewThread from "../../components/search-page/CreateANewThread.svelte";
</script>


<!----------------------------- HTML ----------------------------->
<section>
    <CreateANewThread/>
    <FoundedPosts/>
</section>

<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  section {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
  }
</style>
<!----------------------------------------------------------------->
