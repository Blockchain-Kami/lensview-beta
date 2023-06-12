<script lang="ts">
  export let explorePublicationsForApp;
</script>


<!----------------------------- HTML ----------------------------->
<div class="main__search-area">
  <div class="main__search-area__heading">
    Trending Links🔥
  </div>
  <div class="CenterColumnFlex main__search-area__results">
    {#each explorePublicationsForApp?.items as item}
      <a class="main__search-area__results__result"
         href={`/posts/` + item?.metadata?.tags[0]}>
        {item?.metadata?.description}
      </a>
    {/each}
  </div>
</div>

<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  .main__search-area {
    padding: 2rem;
    width: 100%;
  }

  .main__search-area__heading {
    font-size: 1.5rem;
    font-weight: 600;
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .main__search-area__results {
    gap: 0.75rem;
    height: 77vh;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
  }

  .main__search-area__results__result {
    background: lightsteelblue;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    margin-right: 0.75rem;
    width: 100%;
    text-align: center;
  }
</style>
<!----------------------------------------------------------------->
