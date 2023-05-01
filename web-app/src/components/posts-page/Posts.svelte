<script lang="ts">
  export let postsList;
</script>


<!----------------------------- HTML ----------------------------->
  <div class="CenterColumnFlex posts">
    {#each postsList as post}
      <div class="posts__post">
        <div class="posts__post__content">{post["metadata"]["description"]}</div>
        <div class="CenterRowFlex posts__post__reaction-bar">
          <div class="posts__post__reaction-bar__reaction">10 👍</div>
          <div class="posts__post__reaction-bar__reaction">1 👎</div>
          <div class="posts__post__reaction-bar__reaction">5 💬</div>
          <div class="posts__post__reaction-bar__reaction">2 📨</div>
        </div>
      </div>
    {/each}
  </div>
<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  .posts{
    width: 100%;
    gap: 1rem;
    background: white;
    padding: 1rem;
    border-radius: 12px;
    align-items: flex-start;
    height: 75vh;
    overflow: auto;
    justify-content: flex-start;
  }

  .posts__post{
    padding: 1rem;
    border-radius: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    width: 100%;
  }

  .posts__post__reaction-bar {
    margin-top: 1rem;
    justify-content: space-between;
  }
</style>
<!----------------------------------------------------------------->
