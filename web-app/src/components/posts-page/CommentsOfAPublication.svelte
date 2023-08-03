<script lang="ts">
  import {copy, modeComment, moreVert, share, thumbDownAlt, thumbUpAlt} from "../../utils/frontend/appIcon";
  import Icon from "$lib/Icon.svelte";
  import {page} from "$app/stores";
  import {getCommentOfPublication} from "../../utils/frontend/getCommentOfPublication";
  import getFormattedDate from "../../utils/frontend/getFormattedDate";
  import {totalPosts} from "../../services/totalPosts";
  import {totalComments} from "../../services/totalComments";
  import {reloadCommentOfAPublication} from "../../services/reloadCommentOfAPublication";
  import {onMount} from "svelte";
  import DOMPurify from 'dompurify';
  import {getNotificationsContext} from 'svelte-notifications';


  type CommentMoreStatus = {
    [key: string]: boolean;
  };

  const {addNotification} = getNotificationsContext();
  let commentPubId = $page.data.commentPubId;
  let isCommentMoreOpen: CommentMoreStatus = {};
  let selectedFilterType = "mostLiked";

  let promiseOfGetComment = getCommentOfPublication(commentPubId, 50);

  const updatedPromiseOfGetComment = () => {
    promiseOfGetComment = getCommentOfPublication(commentPubId, 50, selectedFilterType);
  }

  $: if (commentPubId !== $page.data.commentPubId) {
    commentPubId = $page.data.commentPubId;
    promiseOfGetComment = getCommentOfPublication(commentPubId, 50, selectedFilterType);
    console.log("Changed commentPubId : ", $page.data.commentPubId)
  }

  onMount(() => {
    reloadCommentOfAPublication.subscribe((val) => {
      console.log("Reloaded comment of a publication" + val);
      promiseOfGetComment = getCommentOfPublication(commentPubId, 50, selectedFilterType);
    })
  })

  const openCloseCommentMore = (event: Event, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    isCommentMoreOpen[id] = !isCommentMoreOpen[id];
  }

  const sharePost = (event: Event, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(window.location.origin + "/posts/" + $page.data.mainPostPubId + "/" + id);
    addNotification({
      position: 'top-right',
      heading: 'Copied to clipboard',
      description: 'The link to this post has been copied to your clipboard.',
      type: copy,
      removeAfter: 5000,
    });
  }
</script>


<!----------------------------- HTML ----------------------------->
<section>
  <div class="CenterRowFlex filter">
    <div class="filter__label">
      Sorted By:
    </div>
    <div class="filter__type">
      <select bind:value={selectedFilterType} on:change={updatedPromiseOfGetComment}>
        <option value="mostLiked">Most Liked</option>
        <option value="latest">Latest</option>
      </select>
    </div>
    <hr class="filter__line">
    <div class="filter__comment-count">

      {#if $page.data.postPubId === undefined}
        {$totalPosts} &nbsp;Posts
      {:else}
        {$totalComments} &nbsp;Comments
      {/if}
    </div>
  </div>
  <div class="CenterColumnFlex body">
    {#await promiseOfGetComment}
      <div class="comment">
        <div class="comment__pic__loader">
        </div>
        <div class="comment__body">
          <div class="CenterRowFlex comment__body__top">
            <div class="CenterRowFlex comment__body__top__left__loader">
            </div>
            <div class="CenterRowFlex comment__body__top__right__loader">
            </div>
          </div>
          <div class="comment__body__content__loader">
          </div>
        </div>
      </div>
      <div class="comment">
        <div class="comment__pic__loader">
        </div>
        <div class="comment__body">
          <div class="CenterRowFlex comment__body__top">
            <div class="CenterRowFlex comment__body__top__left__loader">
            </div>
            <div class="CenterRowFlex comment__body__top__right__loader">
            </div>
          </div>
          <div class="comment__body__content__loader">
          </div>
        </div>
      </div>
      <div class="comment">
        <div class="comment__pic__loader">
        </div>
        <div class="comment__body">
          <div class="CenterRowFlex comment__body__top">
            <div class="CenterRowFlex comment__body__top__left__loader">
            </div>
            <div class="CenterRowFlex comment__body__top__right__loader">
            </div>
          </div>
          <div class="comment__body__content__loader">
          </div>
        </div>
      </div>
    {:then commentsData}
      {#each commentsData?.data?.publications?.items as comment}
        <a href={`/posts/${$page.data.mainPostPubId}/${comment?.id}`}
           class="comment">
          <div class="comment__pic">
            <img src={comment?.profile?.picture?.original?.url}
                 alt="avatar">
          </div>
          <div class="comment__body">
            <div class="CenterRowFlex comment__body__top">
              <div class="CenterRowFlex comment__body__top__left">
                {#if comment?.profile?.name !== null}
                  <div class="comment__body__top__left__name">
                    {comment?.profile?.name}
                  </div>
                  <div class="comment__body__top__left__dot"></div>
                {/if}
                <div class="comment__body__top__left__handle">
                  {comment?.profile?.handle}
                </div>
              </div>
              <div class="CenterRowFlex comment__body__top__right">
                <div class="CenterRowFlex comment__body__top__right__reaction">
                  <div class="CenterRowFlex comment__body__top__right__reaction__val">
                    <Icon d={thumbUpAlt}/>
                    {comment?.stats?.totalUpvotes}
                  </div>
                  <div class="comment__body__top__right__reaction__vertical-line"></div>
                  <div class="CenterRowFlex comment__body__top__right__reaction__val">
                    <Icon d={thumbDownAlt}/>
                    {comment?.stats?.totalDownvotes}
                  </div>
                </div>
                <div class="CenterRowFlex comment__body__top__right__posts-count">
                  <Icon d={modeComment}/>
                  {comment?.stats?.totalAmountOfComments}
                </div>
                <div class="comment__body__top__right__more">
                  <button on:click={() => openCloseCommentMore(event, comment?.id)}>
                    <Icon d={moreVert} size="1.65em"/>
                  </button>
                  {#if isCommentMoreOpen[comment?.id]}
                    <div class="CenterColumnFlex comment__body__more">
                      <button on:click={() => sharePost(event, comment?.id)}
                              class="CenterRowFlex comment__body__more__share">
                        <div class="CenterRowFlex comment__body__more__share__icon">
                          <Icon d={share} size="1.2em"/>
                        </div>
                        Share
                      </button>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
            <div class="comment__body__time">
              {getFormattedDate(comment?.createdAt)}
            </div>
            <div class="comment__body__content">
              {@html DOMPurify.sanitize(comment?.metadata?.content)}
            </div>
          </div>
        </a>
      {/each}
    {/await}
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

  .body {
    gap: 1rem;
  }

  .comment {
    display: flex;
    flex-direction: row;
    padding: 1rem;
    gap: 1rem;
    background: #1e4748;
    border-radius: 10px;
    width: 100%;
  }

  .comment__pic {
    margin-bottom: auto;
  }

  .comment__pic__loader {
    height: 4rem;
    width: 4.7rem;
    margin-bottom: auto;
    border-radius: 50%;
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
    width: 100%;
  }

  .comment__body__top {
    justify-content: space-between;
  }

  .comment__body__top__left {
    gap: 0.6rem;
  }

  .comment__body__top__left__loader {
    width: 9rem;
    height: 2rem;
    border-radius: 5px;
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
    color: var(--primary);
  }

  .comment__body__top__right {
    gap: 0.5rem;
  }

  .comment__body__top__right__loader {
    width: 15rem;
    height: 2rem;
    border-radius: 5px;
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
    box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
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
    margin-top: -0.2rem;
    margin-bottom: 0.5rem;
  }

  .comment__body__content {
    overflow-wrap: anywhere;
  }

  .comment__body__content__loader {
    width: 100%;
    height: 5rem;
    border-radius: 10px;
    margin-top: 1rem;
  }

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }

  .comment__body__top__left__loader,
  .comment__body__top__right__loader,
  .comment__body__content__loader,
  .comment__pic__loader {
    background: linear-gradient(110deg, #0d9397 8%, #63bdc8 18%, #0d9397 33%);
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
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
