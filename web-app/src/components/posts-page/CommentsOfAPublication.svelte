<script lang="ts">
  import {modeComment, moreVert, share, thumbDownAlt, thumbUpAlt} from "../../utils/frontend/appIcon";
  import Icon from "$lib/Icon.svelte";

  let isCommentMoreOpen = false;
</script>


<!----------------------------- HTML ----------------------------->
<section>
  <div class="CenterRowFlex filter">
    <div class="filter__label">
      Sorted By:
    </div>
    <div class="filter__type">
      <select>
        <option value="review">Most Liked</option>
        <option value="feedback">Latest</option>
      </select>
    </div>
    <!--    <div class="filter__line"></div>-->
    <hr class="filter__line">
    <div class="filter__comment-count">
      40 Comments
    </div>
  </div>
  <div class="body">
    <div class="comment">
      <div class="comment__pic">
        <img src="https://ik.imagekit.io/lens/media-snapshot/tr:w-300,h-300/536c0894df100c301cefdd7f97d4f6e7ab2d6e4019fa99ea933934fe3ffe66c1.webp"
             alt="avatar">
      </div>
      <div class="comment__body">
        <div class="CenterRowFlex comment__body__top">
          <div class="CenterRowFlex comment__body__top__left">
            <div class="comment__body__top__left__name">
              John Doe
            </div>
            <div class="comment__body__top__left__dot"></div>
            <div class="comment__body__top__left__handle">
              johndoe.lens
            </div>
          </div>
          <div class="CenterRowFlex comment__body__top__right">
            <div class="CenterRowFlex comment__body__top__right__reaction">
              <div class="CenterRowFlex comment__body__top__right__reaction__val">
                <Icon d={thumbUpAlt}/>
                20
              </div>
              <div class="comment__body__top__right__reaction__vertical-line"></div>
              <div class="CenterRowFlex comment__body__top__right__reaction__val">
                <Icon d={thumbDownAlt}/>
                5
              </div>
            </div>
            <div class="CenterRowFlex comment__body__top__right__posts-count">
              <Icon d={modeComment}/>
              10
            </div>
            <div class="comment__body__top__right__more">
              <button on:click={() => {isCommentMoreOpen = !isCommentMoreOpen}}>
                <Icon d={moreVert} size="1.65em"/>
              </button>
              {#if isCommentMoreOpen}
                <div class="CenterColumnFlex comment__body__more">
                  <div class="CenterRowFlex comment__body__more__share">
                    <div class="CenterRowFlex comment__body__more__share__icon">
                      <Icon d={share} size="1.2em"/>
                    </div>
                    Share
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
        <div class="comment__body__time">
          2 hours ago
        </div>
        <div class="comment__body__content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam asperiores aut ducimus eaque hic id
          laboriosam libero nam nemo non quam quibusdam quod, saepe similique tenetur veniam vitae voluptatem!
        </div>
      </div>
    </div>
  </div>
</section>

<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 33rem;
  }

  .filter {
    gap: 1rem;
  }

  .filter__label {
    min-width: fit-content;
  }

  .filter__type {
    padding: 0.5rem;
    background: #0a1217;
    border-radius: 5px;
  }

  .filter__line {
    border: 0.5px solid #3d454a;
    width: 100%;
  }

  .filter__comment-count {
    margin-left: auto;
    min-width: fit-content;
  }

  .comment {
    display: flex;
    flex-direction: row;
    padding: 1rem;
    gap: 1rem;
    background: #1e4748;
    border-radius: 10px;
  }

  .comment__pic {
    margin-bottom: auto;
  }

  .comment__pic img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid #32F9FF;
  }

  .comment__body {
    display: flex;
    flex-direction: column;
  }

  .comment__body__top {
    justify-content: space-between;
  }

  .comment__body__top__left {
    gap: 0.6rem;
  }

  .comment__body__top__left__dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #fff;
  }

  .comment__body__top__left__handle {
    padding: 0.2rem 0.5rem;
    background: #18393a;
    border-radius: 5px;
    color: #32F9FF;
  }

  .comment__body__top__right {
    gap: 0.5rem;
  }

  .comment__body__top__right__reaction {
    padding: 0.5rem 0.7rem;
    background: #18393a;
    gap: 0.5rem;
    border-radius: 6.8px;
    opacity: 70%;
  }

  .comment__body__top__right__reaction__val {
    gap: 0.4rem;
  }

  .comment__body__top__right__reaction__vertical-line {
    border-left: 2px solid #ffffff45;
    height: 21px;
  }

  .comment__body__top__right__posts-count {
    background: #18393a;
    padding: 0.5rem 0.7rem;
    gap: 0.5rem;
    border-radius: 5.8px;
    opacity: 85%;
  }

  .comment__body__top__right__more {
    position: relative;
  }

  .comment__body__more {
    align-items: flex-start;
    width: 10rem;
    background: #185359;
    padding: 0.45rem;
    border-radius: 5.8px;
    margin-left: auto;
    margin-right: 0.5rem;
    position: absolute;
    right: 0;
    margin-top: 1rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .comment__body__more__share {
    gap: 0.5rem;
  }

  .comment__body__more__share__icon {
    background: #2c4042;
    padding: 0.5rem;
    border-radius: 50%;
  }

  .comment__body__time {
    font-size: var(--small-font-size);
    color: var(--text-accent);
  }

  .comment__body__content {
    overflow-wrap: break-word;
  }
</style>
<!----------------------------------------------------------------->


<!--<script lang="ts">-->
<!--  import {addReactionToAPost} from "../../utils/frontend/addReactionToAPost";-->
<!--  import {isSignedIn} from "../../services/signInStatus";-->
<!--  import {invalidate} from "$app/navigation";-->
<!--  import getFormattedDate from "../../utils/frontend/getFormattedDate";-->


<!--  export let commentsList;-->
<!--  export let hashedURL;-->

<!--  /**-->
<!--   * It handles the error if any field is missing in comment-->
<!--   * which are getting used.-->
<!--   * UPDATE THIS FUNCTION IF ANY NEW FIELD IS ADDED IN comment-->
<!--   * @param comment-->
<!--   */-->
<!--  const isCommentValid = (comment) => {-->

<!--    if (!comment?.profile?.handle)-->
<!--      return false;-->

<!--    if (!comment?.createdAt)-->
<!--      return false;-->

<!--    if (!comment?.metadata?.content)-->
<!--      return false;-->

<!--    if (!comment?.stats) {-->
<!--      if (comment.stats.totalUpvotes === undefined)-->
<!--        return false;-->

<!--      if (comment.stats.totalDownvotes === undefined)-->
<!--        return false;-->

<!--      if (comment.stats.totalAmountOfComments === undefined)-->
<!--        return false;-->

<!--      if (comment.stats.totalAmountOfMirrors === undefined)-->
<!--        return false;-->
<!--    }-->

<!--    return true;-->
<!--  };-->

<!--  const getPictureURL = (fetchedLensURL, ownedByAddress) => {-->
<!--    if (fetchedLensURL === undefined) {-->
<!--      return `https://cdn.stamp.fyi/avatar/eth:${ownedByAddress}?s=300`;-->
<!--    }-->

<!--    if (fetchedLensURL.substring(0, 4) === "ipfs") {-->
<!--      return `https://gateway.ipfscdn.io/ipfs/${fetchedLensURL.substring(6)}`;-->
<!--    } else {-->
<!--      return fetchedLensURL;-->
<!--    }-->
<!--  };-->


<!--  const callAddReaction = async (pubID, reaction) => {-->
<!--    let signedStatus;-->
<!--    const unsub = isSignedIn.subscribe((value) => {-->
<!--      signedStatus = value;-->
<!--    });-->
<!--    unsub();-->

<!--    if (!signedStatus) {-->
<!--      alert("Please connect wallet and sign in to react to a comment");-->
<!--    } else {-->
<!--      const response = await addReactionToAPost(pubID, reaction);-->

<!--      if (response?.error) {-->
<!--        alert(response?.error?.graphQLErrors[0]?.message);-->
<!--        return;-->
<!--      }-->
<!--      await invalidate("posts: updated-posts");-->
<!--    }-->

<!--  };-->
<!--</script>-->


<!--&lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; HTML -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--{#if commentsList.length !== 0}-->
<!--  <div class="CenterColumnFlex comments">-->
<!--    {#each commentsList as comment}-->
<!--      {#if isCommentValid(comment)}-->
<!--        <div class="comments__comment">-->
<!--          <div class="comments__comment__avatar">-->
<!--            <img-->
<!--              src={ getPictureURL(comment?.profile?.picture?.original?.url, comment?.profile?.ownedBy)}-->
<!--              alt="avatar" />-->
<!--          </div>-->
<!--          <div class="comments__comment__data">-->
<!--            <div class="comments__comment__data__header">-->
<!--              <div class="comments__comment__data__header__handle">@{comment["profile"]["handle"]}</div>-->
<!--              <div class="comments__comment__data__header__date">{getFormattedDate(comment["createdAt"])}</div>-->
<!--            </div>-->
<!--            <div class="comments__comment__data__content">{comment["metadata"]["content"]}</div>-->
<!--            <div class="comments__comment__data__reaction-bar">-->
<!--              <div class="comments__comment__data__reaction-bar__reaction">-->
<!--                {comment["stats"]["totalUpvotes"]}-->
<!--                <button on:click={callAddReaction(comment["id"], "UPVOTE")}>-->
<!--                  👍-->
<!--                </button>-->
<!--              </div>-->
<!--              <div class="comments__comment__data__reaction-bar__reaction">-->
<!--                {comment["stats"]["totalDownvotes"]}-->
<!--                <button on:click={callAddReaction(comment["id"], "DOWNVOTE")}>-->
<!--                  👎-->
<!--                </button>-->
<!--              </div>-->
<!--              <div class="comments__comment__data__reaction-bar__reaction">-->
<!--                {comment["stats"]["totalAmountOfComments"]}-->
<!--                <a href={`/posts/${hashedURL}/${comment?.id}`}>-->
<!--                  💬-->
<!--                </a>-->
<!--              </div>-->
<!--              <div class="comments__comment__data__reaction-bar__reaction">{comment["stats"]["totalAmountOfMirrors"]}📨-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      {/if}-->
<!--    {/each}-->
<!--  </div>-->
<!--{:else}-->
<!--  <div class="no-comments">Be the first to share your views.</div>-->
<!--{/if}-->


<!--&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->


<!--&lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; STYLE -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--<style lang="scss">-->

<!--  .no-comments {-->
<!--    display: flex;-->
<!--    justify-content: center;-->
<!--    font-weight: bold;-->
<!--    font-size: 1.3rem;-->
<!--    height: 75vh;-->
<!--    align-items: center;-->
<!--  }-->

<!--  .comments {-->
<!--    width: 100%;-->
<!--    gap: 1rem;-->
<!--    background: white;-->
<!--    padding: 1rem;-->
<!--    border-radius: 12px;-->
<!--    align-items: flex-start;-->
<!--    height: 75vh;-->
<!--    overflow: auto;-->
<!--    justify-content: flex-start;-->
<!--  }-->


<!--  .comments__comment {-->
<!--    display: flex;-->
<!--    flex-direction: row;-->
<!--    gap: 1rem;-->
<!--    padding: 1rem;-->
<!--    border-radius: 10px;-->
<!--    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;-->
<!--    width: 100%;-->
<!--  }-->

<!--  .comments__comment__data {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    gap: 2rem;-->
<!--    width: 100%;-->
<!--  }-->

<!--  .comments__comment__data__header {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    gap: 0.5rem;-->
<!--  }-->

<!--  .comments__comment__data__header__handle {-->
<!--    font-weight: 600;-->
<!--  }-->

<!--  .comments__comment__data__header__date {-->
<!--    font-size: small;-->
<!--  }-->

<!--  .comments__comment__data__content {-->
<!--    font-size: large;-->
<!--  }-->

<!--  .comments__comment__data__reaction-bar {-->
<!--    display: flex;-->
<!--    flex-direction: row;-->
<!--    align-items: center;-->
<!--    gap: 2rem;-->
<!--  }-->

<!--  .comments__comment__data__reaction-bar__reaction button {-->
<!--    background: none;-->
<!--    border: none;-->
<!--    cursor: pointer;-->
<!--  }-->


<!--  img {-->
<!--    width: 60px;-->
<!--    height: 60px;-->
<!--    border-radius: 50%;-->
<!--  }-->

<!--</style>-->
<!--&lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
