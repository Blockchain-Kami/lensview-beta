<script lang="ts">
  import {modeComment, moreVert, share, thumbDownAlt, thumbUpAlt} from "../../utils/frontend/appIcon";
  import Icon from "$lib/Icon.svelte";
  import {page} from "$app/stores";
  import getFormattedDate from "../../utils/frontend/getFormattedDate";
  import {getCommentOfPublication} from "../../utils/frontend/getCommentOfPublication";
  import {totalComments} from "../../services/totalComments";


  let postPubId = $page.data.postPubId;
  let isPostMoreOpen = false;
  let promiseOfGetPost = getCommentOfPublication(postPubId, 1, "post");

  $: if (postPubId !== $page.data.postPubId) {
    postPubId = $page.data.postPubId;
    promiseOfGetPost = getCommentOfPublication(postPubId, 1, "post");
  }

  const getTotalComments = (fetchedTotalComments: number) => {
    totalComments.setTotalComments(fetchedTotalComments);
    return fetchedTotalComments;
  }
</script>


<!----------------------------- HTML ----------------------------->
<section>
  {#await promiseOfGetPost}
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
  {:then postPub}
    <div class="comment">
      <div class="comment__pic">
        <img src={postPub?.data?.publications?.items[0]?.profile?.picture?.original?.url}
             alt="avatar">
      </div>
      <div class="comment__body">
        <div class="CenterRowFlex comment__body__top">
          <div class="CenterRowFlex comment__body__top__left">
            {#if postPub?.data?.publications?.items[0]?.profile?.name !== null}
              <div class="comment__body__top__left__name">
                {postPub?.data?.publications?.items[0]?.profile?.name}
              </div>
              <div class="comment__body__top__left__dot"></div>
            {/if}
            <div class="comment__body__top__left__handle">
              {postPub?.data?.publications?.items[0]?.profile?.handle}
            </div>
          </div>
          <div class="CenterRowFlex comment__body__top__right">
            <div class="CenterRowFlex comment__body__top__right__reaction">
              <div class="CenterRowFlex comment__body__top__right__reaction__val">
                <Icon d={thumbUpAlt}/>
                {postPub?.data?.publications?.items[0]?.stats?.totalUpvotes}
              </div>
              <div class="comment__body__top__right__reaction__vertical-line"></div>
              <div class="CenterRowFlex comment__body__top__right__reaction__val">
                <Icon d={thumbDownAlt}/>
                {postPub?.data?.publications?.items[0]?.stats?.totalDownvotes}
              </div>
            </div>
            <div class="CenterRowFlex comment__body__top__right__posts-count">
              <Icon d={modeComment}/>
              {getTotalComments(postPub?.data?.publications?.items[0]?.stats?.totalAmountOfComments)}
            </div>
            <div class="comment__body__top__right__more">
              <button on:click={() => {isPostMoreOpen = !isPostMoreOpen}}>
                <Icon d={moreVert} size="1.65em"/>
              </button>
              {#if isPostMoreOpen}
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
          {getFormattedDate(postPub?.data?.publications?.items[0]?.createdAt)}
        </div>
        <div class="comment__body__content">
          {postPub?.data?.publications?.items[0]?.metadata?.content}
        </div>
      </div>
    </div>
  {/await}
</section>

<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">

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
    overflow-wrap: break-word;
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

<!--  import { isSignedIn } from "../../services/signInStatus";-->
<!--  import { addReactionToAPost } from "../../utils/frontend/addReactionToAPost";-->
<!--  import { invalidate } from "$app/navigation";-->

<!--  export let pub;-->
<!--  export let hashedURL;-->

<!--  /**-->
<!--   * It handles the error if any field is missing in comment-->
<!--   * which are getting used.-->
<!--   * UPDATE THIS FUNCTION IF ANY NEW FIELD IS ADDED IN comment-->
<!--   * @param pub-->
<!--   */-->
<!--  const isPubValid = (pub) => {-->

<!--    if (!pub?.profile?.handle)-->
<!--      return false;-->

<!--    if (!pub?.createdAt)-->
<!--      return false;-->

<!--    if (!pub?.metadata?.content)-->
<!--      return false;-->

<!--    if (!pub?.stats) {-->
<!--      if (pub.stats.totalUpvotes === undefined)-->
<!--        return false;-->

<!--      if (pub.stats.totalDownvotes === undefined)-->
<!--        return false;-->

<!--      if (pub.stats.totalAmountOfpubs === undefined)-->
<!--        return false;-->

<!--      if (pub.stats.totalAmountOfMirrors === undefined)-->
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

<!--  /**-->
<!--   * It returns the formatted date based on the date passed-->
<!--   * If the date is of today, it returns the seconds, minutes or hours-->
<!--   * If the date is of 1 month from today, it returns the days-->
<!--   * If the date is of 1 year from today, it returns the months-->
<!--   * If the date is of more than 1 year from today, it returns the years-->
<!--   * @param date-->
<!--   */-->
<!--  const getFormattedDate = (date) => {-->
<!--    const today = new Date();-->
<!--    const commentDate = new Date(date);-->

<!--    const diffTime = Math.abs(today.getTime() - commentDate.getTime());-->
<!--    const oneDay = 24 * 60 * 60 * 1000;-->
<!--    const diffDays = Math.floor(diffTime / oneDay);-->

<!--    if (diffDays === 0) {-->
<!--      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));-->
<!--      if (diffHours === 0) {-->
<!--        const diffMinutes = Math.floor(diffTime / (1000 * 60));-->
<!--        if (diffMinutes === 0) {-->
<!--          const diffSeconds = Math.floor(diffTime / (1000));-->
<!--          return `${diffSeconds} seconds ago`;-->
<!--        } else {-->
<!--          return `${diffMinutes} minutes ago`;-->
<!--        }-->
<!--      } else {-->
<!--        return `${diffHours} hours ago`;-->
<!--      }-->
<!--    } else if (diffDays === 1) {-->
<!--      return `${diffDays} day ago`;-->
<!--    } else if (diffDays < 30) {-->
<!--      return `${diffDays} days ago`;-->
<!--    } else if (diffDays < 365) {-->
<!--      const diffMonths = Math.floor(diffDays / 30);-->
<!--      if (diffMonths === 1) {-->
<!--        return `${diffMonths} month ago`;-->
<!--      } else {-->
<!--        return `${diffMonths} months ago`;-->
<!--      }-->
<!--    } else {-->
<!--      const diffYears = Math.floor(diffDays / 365);-->
<!--      if (diffYears === 1) {-->
<!--        return `${diffYears} year ago`;-->
<!--      } else {-->
<!--        return `${diffYears} years ago`;-->
<!--      }-->
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
<!--{#if isPubValid}-->
<!--  <div class="pub">-->
<!--    <div class="pub__avatar">-->
<!--      <img-->
<!--        src={ getPictureURL(pub?.profile?.picture?.original?.url, pub?.profile?.ownedBy)}-->
<!--        alt="avatar" />-->
<!--    </div>-->
<!--    <div class="pub__data">-->
<!--      <div class="pub__data__header">-->
<!--        <div class="pub__data__header__handle">@{pub["profile"]["handle"]}</div>-->
<!--        <div class="pub__data__header__date">{getFormattedDate(pub["createdAt"])}</div>-->
<!--      </div>-->
<!--      <div class="pub__data__content">{pub["metadata"]["content"]}</div>-->
<!--      <div class="pub__data__reaction-bar">-->
<!--        <div class="pub__data__reaction-bar__reaction">-->
<!--          {pub["stats"]["totalUpvotes"]}-->
<!--          <button on:click={callAddReaction(pub["id"], "UPVOTE")}>-->
<!--            👍-->
<!--          </button>-->
<!--        </div>-->
<!--        <div class="pub__data__reaction-bar__reaction">-->
<!--          {pub["stats"]["totalDownvotes"]}-->
<!--          <button on:click={callAddReaction(pub["id"], "DOWNVOTE")}>-->
<!--            👎-->
<!--          </button>-->
<!--        </div>-->
<!--        <div class="pub__data__reaction-bar__reaction">-->
<!--          {pub["stats"]["totalAmountOfComments"]}-->
<!--          <a href={`/posts/${hashedURL}/${pub?.id}`}>-->
<!--            💬-->
<!--          </a>-->
<!--        </div>-->
<!--        <div class="pub__data__reaction-bar__reaction">{pub["stats"]["totalAmountOfMirrors"]} 📨</div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--{/if}-->

<!--&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->


<!--&lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; STYLE -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--<style lang="scss">-->

<!--  .pub {-->
<!--    display: flex;-->
<!--    flex-direction: row;-->
<!--    gap: 1rem;-->
<!--    padding: 1rem;-->
<!--    border-radius: 10px;-->
<!--    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;-->
<!--    width: 100%;-->
<!--    background: white;-->
<!--    margin-top: 0.3rem;-->
<!--  }-->

<!--  .pub__data {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    gap: 2rem;-->
<!--    width: 100%;-->
<!--  }-->

<!--  .pub__data__header {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    gap: 0.5rem;-->
<!--  }-->

<!--  .pub__data__header__handle {-->
<!--    font-weight: 600;-->
<!--  }-->

<!--  .pub__data__header__date {-->
<!--    font-size: small;-->
<!--  }-->

<!--  .pub__data__content {-->
<!--    font-size: large;-->
<!--  }-->

<!--  .pub__data__reaction-bar {-->
<!--    display: flex;-->
<!--    flex-direction: row;-->
<!--    align-items: center;-->
<!--    gap: 2rem;-->
<!--  }-->

<!--  .pub__data__reaction-bar__reaction button {-->
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
