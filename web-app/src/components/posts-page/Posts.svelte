<script lang="ts">
  export let postsList;

  /**
   * It handles the error if any field is missing in post
   * which are getting used.
   * UPDATE THIS FUNCTION IF ANY NEW FIELD IS ADDED IN POST
   * @param post
   */
  const isPostValid = (post) => {

    if (!post?.profile?.picture?.original?.url)
      return false;

    if (!post?.profile?.handle)
      return false;

    if (!post?.createdAt)
      return false;

    if (!post?.metadata?.content)
      return false;

    if (!post?.stats) {
      if (post.stats.totalUpvotes === undefined)
        return false;

      if (post.stats.totalDownvotes === undefined)
        return false;

      if (post.stats.totalAmountOfComments === undefined)
        return false;

      if (post.stats.totalAmountOfMirrors === undefined)
        return false;
    }

    return true;
  };

  const getPictureURL = (fetchedLensURL) => {
    if (fetchedLensURL.substring(0, 4) === "ipfs") {
      return `https://gateway.ipfscdn.io/ipfs/${fetchedLensURL.substring(6)}`;
    } else {
      return fetchedLensURL;
    }
  };
</script>


<!----------------------------- HTML ----------------------------->
  <div class="CenterColumnFlex posts">
    {#each postsList as post}
      {#if isPostValid(post)}
        <div class="posts__post">
          <div class="posts__post__avatar">
            <img
              src={ getPictureURL(post["profile"]["picture"]["original"]["url"])}
              alt="avatar" />
          </div>
          <div class="posts__post__data">
            <div class="posts__post__data__header">
              <div class="posts__post__data__header__handle">@{post["profile"]["handle"]}</div>
              <div class="posts__post__data__header__date">{new Date(post["createdAt"]).toDateString()}</div>
            </div>
            <div class="posts__post__data__content">{post["metadata"]["content"]}</div>
            <div class="posts__post__data__reaction-bar">
              <div class="posts__post__data__reaction-bar__reaction">{post["stats"]["totalUpvotes"]} 👍</div>
              <div class="posts__post__data__reaction-bar__reaction">{post["stats"]["totalDownvotes"]} 👎</div>
              <div class="posts__post__data__reaction-bar__reaction">{post["stats"]["totalAmountOfComments"]} 💬</div>
              <div class="posts__post__data__reaction-bar__reaction">{post["stats"]["totalAmountOfMirrors"]} 📨</div>
            </div>
          </div>
        </div>
      {/if}
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

  .posts__post {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    width: 100%;
  }

  .posts__post__data {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  }

  .posts__post__data__header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .posts__post__data__header__handle {
    font-weight: 600;
  }

  .posts__post__data__header__date {
    font-size: small;
  }

  .posts__post__data__content {
    font-size: large;
  }

  .posts__post__data__reaction-bar {
    display: flex;
    flex-direction: row;
    gap: 2rem;
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
</style>
<!----------------------------------------------------------------->
