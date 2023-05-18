<script lang="ts">
  import { addReactionToAPost } from "../../utils/frontend/addReactionToAPost";
  import { isSignedIn } from "../../services/signInStatus";
  import { invalidate } from "$app/navigation";


  export let postsList;
  export let hashedURL;

  /**
   * It handles the error if any field is missing in post
   * which are getting used.
   * UPDATE THIS FUNCTION IF ANY NEW FIELD IS ADDED IN POST
   * @param post
   */
  const isPostValid = (post) => {

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

  const getPictureURL = (fetchedLensURL, ownedByAddress) => {
    if (fetchedLensURL === undefined) {
      return `https://cdn.stamp.fyi/avatar/eth:${ownedByAddress}?s=300`;
    }

    if (fetchedLensURL.substring(0, 4) === "ipfs") {
      return `https://gateway.ipfscdn.io/ipfs/${fetchedLensURL.substring(6)}`;
    } else {
      return fetchedLensURL;
    }
  };

  /**
   * It returns the formatted date based on the date passed
   * If the date is of today, it returns the seconds, minutes or hours
   * If the date is of 1 month from today, it returns the days
   * If the date is of 1 year from today, it returns the months
   * If the date is of more than 1 year from today, it returns the years
   * @param date
   */
  const getFormattedDate = (date) => {
    const today = new Date();
    const postDate = new Date(date);

    const diffTime = Math.abs(today.getTime() - postDate.getTime());
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.floor(diffTime / oneDay);

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        if (diffMinutes === 0) {
          const diffSeconds = Math.floor(diffTime / (1000));
          return `${diffSeconds} seconds ago`;
        } else {
          return `${diffMinutes} minutes ago`;
        }
      } else {
        return `${diffHours} hours ago`;
      }
    } else if (diffDays === 1) {
      return `${diffDays} day ago`;
    } else if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const diffMonths = Math.floor(diffDays / 30);
      if (diffMonths === 1) {
        return `${diffMonths} month ago`;
      } else {
        return `${diffMonths} months ago`;
      }
    } else {
      const diffYears = Math.floor(diffDays / 365);
      if (diffYears === 1) {
        return `${diffYears} year ago`;
      } else {
        return `${diffYears} years ago`;
      }
    }
  };

  const callAddReaction = async (postID, reaction) => {
    let signedStatus;
    const unsub = isSignedIn.subscribe((value) => {
      signedStatus = value;
    });
    unsub();

    if (!signedStatus) {
      alert("Please connect wallet and sign in to react to a post");
    } else {
      const response = await addReactionToAPost(postID, reaction);

      if (response?.error) {
        alert(response?.error?.graphQLErrors[0]?.message);
        return;
      }
      await invalidate("posts: updated-posts");
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
              src={ getPictureURL(post?.profile?.picture?.original?.url, post?.profile?.ownedBy)}
              alt="avatar" />
          </div>
          <div class="posts__post__data">
            <div class="posts__post__data__header">
              <div class="posts__post__data__header__handle">@{post["profile"]["handle"]}</div>
              <div class="posts__post__data__header__date">{getFormattedDate(post["createdAt"])}</div>
            </div>
            <div class="posts__post__data__content">{post["metadata"]["content"]}</div>
            <div class="posts__post__data__reaction-bar">
              <div class="posts__post__data__reaction-bar__reaction">
                {post["stats"]["totalUpvotes"]}
                <button on:click={callAddReaction(post["id"], "UPVOTE")}>
                  👍
                </button>
              </div>
              <div class="posts__post__data__reaction-bar__reaction">
                {post["stats"]["totalDownvotes"]}
                <button on:click={callAddReaction(post["id"], "DOWNVOTE")}>
                  👎
                </button>
              </div>
              <div class="posts__post__data__reaction-bar__reaction">
                {post["stats"]["totalAmountOfComments"]}
                <a href={`/posts/${hashedURL}/${post?.id}`}>
                  💬
                </a>
              </div>
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

  .posts__post__data__reaction-bar__reaction button {
    background: none;
    border: none;
    cursor: pointer;
  }


  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
</style>
<!----------------------------------------------------------------->
