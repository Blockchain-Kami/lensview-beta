<script lang="ts">
  import { isSignedIn } from "../../services/signInStatus";
  import { addReactionToAPost } from "../../utils/frontend/addReactionToAPost";
  import { invalidate } from "$app/navigation";
  import getImageFromURL from "../../utils/frontend/getImageFromURL";
  import { afterUpdate } from "svelte";

  export let mainPostPub;
  export let url;
  let imageURL;

  afterUpdate(async () => {
    $: if (url) {
      console.log(url.match(/(https?:\/\/\S+)/g)[0]);
      imageURL = await getImageFromURL(url.match(/(https?:\/\/\S+)/g)[0]);
    }
  });


  const callAddReaction = async (pubID, reaction) => {
    let signedStatus;
    const unsub = isSignedIn.subscribe((value) => {
      signedStatus = value;
    });
    unsub();

    if (!signedStatus) {
      alert("Please connect wallet and sign in to react to a comment");
    } else {
      const response = await addReactionToAPost(pubID, reaction);

      if (response?.error) {
        alert(response?.error?.graphQLErrors[0]?.message);
        return;
      }
      await invalidate("posts: updated-posts");
    }

  };

  const getSlicedURL = (url) => {
    if (!url) return;

    if (url.length > 50) {
      return url.slice(0, 30) + "..." + url.slice(-20);
    }
    return url;
  };

  const copyPostUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Post URL copied to clipboard, now you can share this post with your friends!");
  };

</script>


<!----------------------------- HTML ----------------------------->
{#if Object.keys(mainPostPub).length > 0}
  <div class="CenterColumnFlex main-post">
    <div class="main-post__img">
      {#if imageURL}
        <img
          src={imageURL}
          alt="post image" />
      {:else}
        <!--        <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="">-->
        <iframe src="https://giphy.com/embed/l3nWhI38IWDofyDrW" allowFullScreen></iframe>
      {/if}
    </div>
    <a href={url} target="_blank" class="main-post__url">
      {getSlicedURL(url)}
    </a>
    <div class="CenterRowFlex main-post__stats">
      <div class="CenterRowFlex main-post__stats__reaction-bar">
        <div class="main-post__stats__reaction-bar__reaction">
          {mainPostPub?.stats?.totalUpvotes}
          <button on:click={callAddReaction(mainPostPub["id"], "UPVOTE")}>
            👍
          </button>
        </div>
        <div class="main-post__stats__reaction-bar__reaction">
          {mainPostPub?.stats?.totalDownvotes}
          <button on:click={callAddReaction(mainPostPub?.id, "DOWNVOTE")}>
            👎
          </button>
        </div>
        <div class="main-post__stats__reaction-bar__reaction">
          <button on:click={copyPostUrl}>
            📨
          </button>
        </div>
      </div>
      <div class="main-post__stats__post-count">
        {mainPostPub?.stats?.totalAmountOfComments} Post(s)
      </div>
    </div>
  </div>
{:else}
  <div class="main-no-post">
    <h1>No post found</h1>
  </div>
{/if}

<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  .main-post {
    padding: 1rem;
    width: 100%;
    gap: 1rem;
  }

  .main-post__img {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-post__img img {
    width: 100%;
    border-radius: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  }

  .main-post__url {
    width: 100%;
    font-size: 1rem;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    background: white;
    color: dodgerblue;
  }

  .main-post__stats {
    width: 100%;
    justify-content: space-between;
  }

  .main-post__stats__reaction-bar {
    background: #aedaf3;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    justify-content: space-evenly;
    width: 60%;

  }

  .main-post__stats__reaction-bar button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .main-post__stats__post-count {
    padding: 1rem;
    border-radius: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    background: deeppink;
  }
</style>
<!----------------------------------------------------------------->
