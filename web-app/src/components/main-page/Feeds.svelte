<script lang="ts">
  export let explorePublicationsForApp;
</script>


<!----------------------------- HTML ----------------------------->
<div class="main__search-area">
  <div class="main__search-area__heading">
    Trending Links🔥
  </div>
  <div class="CenterColumnFlex main__search-area__results">
    <a class="main__search-area__results__result"
       href="/posts/7eb7685fc0e93b18ac1cc4d0b9f27c22226354be">
      https://buildspace.so
    </a>
    <a class="main__search-area__results__result"
       href="/posts/862a4fb3d7b604df38a6dd5125d341b2fa14b20b">
      https://www.lens.xyz/
    </a>
    <a class="main__search-area__results__result"
       href="/posts/a022d31368593358174caf9a5b08f15d29bb4181">
      https://lenster.xyz
    </a>
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
  @import '../../global';

  @include sideScrollbar("main__search-area__results__result");

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
    display: flex;
    align-items: center;
    //background: lightsteelblue;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    margin-right: 0.75rem;
    width: 100%;
    overflow: hidden;
  }
</style>
<!----------------------------------------------------------------->
