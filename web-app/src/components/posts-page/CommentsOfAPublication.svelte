<script lang="ts">
  import {
    copy,
    cross,
    login,
    modeComment,
    moreVert,
    person,
    share,
    thumbDown,
    thumbDownAlt,
    thumbUp,
    thumbUpAlt
  } from "../../utils/frontend/appIcon";
  import Icon from "$lib/Icon.svelte";
  import { page } from "$app/stores";
  import { getCommentOfPublication } from "../../utils/frontend/getCommentOfPublication";
  import getFormattedDate from "../../utils/frontend/getFormattedDate";
  import { totalPosts } from "../../services/totalPosts";
  import { totalComments } from "../../services/totalComments";
  import { reloadCommentOfAPublication } from "../../services/reloadPublication";
  import { onMount } from "svelte";
  import DOMPurify from "dompurify";
  import { getNotificationsContext } from "svelte-notifications";
  import { PUBLIC_APP_LENS_ID } from "$env/static/public";
  import { Tooltip } from "@svelte-plugins/tooltips";
  import { addReactionToAPost, removeReactionFromAPost } from "../../utils/frontend/updateReactionForAPost";
  import Login from "../Login.svelte";
  import { isSignedIn } from "../../services/signInStatus";
  import type { ReactionDetailsModel } from "../../models/reactionDetails.model";
  import getPictureURL from "../../utils/frontend/getPictureURL";
  import Autolinker from "autolinker";
  import getLinkPreviewHtml from "../../utils/frontend/getLinkPreviewHtml";


  type CommentMoreStatus = {
    [key: string]: boolean;
  };

  const {addNotification} = getNotificationsContext();
  let commentPubId = $page.data.commentPubId;
  let isCommentMoreOpen: CommentMoreStatus = {};
  let selectedFilterType = "mostLiked";
  let showLoginModal = false;
  let reactionDetails: ReactionDetailsModel = {};

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

  const callAddReaction = async (event: Event, pubID: string, reaction: string) => {
    event.preventDefault();
    event.stopPropagation();

    let signedStatus;
    const unsub = isSignedIn.subscribe((value) => {
      signedStatus = value;
    });
    unsub();

    if (!signedStatus) {
      openLoginNotification();
    } else {
      try {
        if (reactionDetails[pubID]["reaction"] !== null) {
          await callRemoveReaction(event, pubID, reactionDetails[pubID]["reaction"]);
        }

        const localUpVoteCount = reaction === "UPVOTE" ? reactionDetails[pubID]["upVoteCount"] + 1 : reactionDetails[pubID]["upVoteCount"];
        const localDownVoteCount = reaction === "DOWNVOTE" ? reactionDetails[pubID]["downVoteCount"] + 1 : reactionDetails[pubID]["downVoteCount"];
        reactionDetails[pubID] = {
          reaction: reaction,
          upVoteCount: localUpVoteCount,
          downVoteCount: localDownVoteCount
        };

        await addReactionToAPost(pubID, reaction);

      } catch (error) {
        console.log("Error while reacting", error);

        addNotification({
          position: "top-right",
          heading: "Error while reacting",
          description: "Please try again .",
          type: cross,
          removeAfter: 4000
        });
      }
    }

  };

  const callRemoveReaction = async (event: Event, pubID: string, reaction: string) => {
    event.preventDefault();
    event.stopPropagation();

    let signedStatus;
    const unsub = isSignedIn.subscribe((value) => {
      signedStatus = value;
    });
    unsub();

    if (!signedStatus) {
      openLoginNotification();
    } else {
      try {
        const localUpVoteCount = reaction === "UPVOTE" ? reactionDetails[pubID]["upVoteCount"] - 1 : reactionDetails[pubID]["upVoteCount"];
        const localDownVoteCount = reaction === "DOWNVOTE" ? reactionDetails[pubID]["downVoteCount"] - 1 : reactionDetails[pubID]["downVoteCount"];
        reactionDetails[pubID] = {
          reaction: null,
          upVoteCount: localUpVoteCount,
          downVoteCount: localDownVoteCount
        };

        await removeReactionFromAPost(pubID, reaction);
      } catch (error) {
        console.log("Error while reacting", error);

        addNotification({
          position: "top-right",
          heading: "Error removing",
          description: "Error while removing your reaction. Please try again .",
          type: cross,
          removeAfter: 4000
        });
      }
    }

  };

  const openLoginNotification = () => {
    addNotification({
      position: "top-right",
      heading: "Please Login",
      description: "Kindly log-in to react to this post. Simply click on \"Login\" button to proceed with your login.",
      type: login,
      removeAfter: 10000,
      ctaBtnName: "Login",
      ctaFunction: () => {
        showLoginModal = true;
      }
    });
  };

  const updateReactionDetails = (pubID: string, reaction: string, upVoteCount: number, downVoteCount: number) => {
    reactionDetails[pubID] = {
      "reaction": reaction,
      "upVoteCount": upVoteCount,
      "downVoteCount": downVoteCount
    };
    return "";
  };
</script>


<!----------------------------- HTML ----------------------------->
<section>
  <div class="CenterRowFlex filter">
    <div class="filter__label">
      Sorted By:
    </div>
    <div class="filter__type">
      <select bind:value={selectedFilterType} on:change={updatedPromiseOfGetComment}>
        <option value="mostLiked">Most liked</option>
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
            <img src={getPictureURL(
              comment?.profile?.picture?.original?.url,
              comment?.profile?.ownedBy
              )}
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
                {#if comment?.profile?.id === PUBLIC_APP_LENS_ID}
                  <Tooltip
                          content="This post was made by an anonymous user!"
                          position="right"
                          autoPosition
                          align="left"
                          theme="custom-tooltip"
                          maxWidth="150"
                          animation="slide">
                    <span class="CenterRowFlex comment__body__top__left__anon-comment">
                      <Icon d={person} size="1.05em"/>
                    </span>
                  </Tooltip>
                {/if}
              </div>
              <div class="CenterRowFlex comment__body__top__right">
                <div class="CenterRowFlex comment__body__top__right__reaction"
                >
                  {updateReactionDetails(
                    comment?.id,
                    comment?.reaction,
                    comment?.stats?.totalUpvotes,
                    comment?.stats?.totalDownvotes
                  )}
                  {#if reactionDetails[comment?.id]["reaction"] === "UPVOTE"}
                    <button on:click={() => callRemoveReaction(event, comment?.id, "UPVOTE")}
                            class="CenterRowFlex comment__body__top__right__reaction__val">
                      <Icon d={thumbUp} />
                      {reactionDetails[comment?.id]["upVoteCount"]}
                    </button>
                  {:else}
                    <button on:click={() => callAddReaction(event, comment?.id, "UPVOTE")}
                            class="CenterRowFlex comment__body__top__right__reaction__val">
                      <Icon d={thumbUpAlt} />
                      {reactionDetails[comment?.id]["upVoteCount"]}
                    </button>
                  {/if}
                  <div class="comment__body__top__right__reaction__vertical-line"></div>
                  {#if reactionDetails[comment?.id]["reaction"] === "DOWNVOTE"}
                    <button on:click={() => callRemoveReaction(event, comment?.id, "DOWNVOTE")}
                            class="CenterRowFlex comment__body__top__right__reaction__val">
                      <Icon d={thumbDown} />
                      {reactionDetails[comment?.id]["downVoteCount"]}
                    </button>
                  {:else}
                    <button on:click={() => callAddReaction(event, comment?.id, "DOWNVOTE")}
                            class="CenterRowFlex comment__body__top__right__reaction__val">
                      <Icon d={thumbDownAlt} />
                      {reactionDetails[comment?.id]["downVoteCount"]}
                    </button>
                  {/if}
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
              {@html Autolinker.link(DOMPurify.sanitize(comment?.metadata?.content), {
                className: 'links',
              })}
              <blockquote class="twitter-tweet" data-conversation="none" data-theme="dark">
                <a
                  href={`https://twitter.com/username/status/${getLinkPreviewHtml(DOMPurify.sanitize(comment?.metadata?.content))}`}></a>
              </blockquote>
              <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>
          </div>
        </a>
      {/each}
    {/await}
  </div>
</section>

<Login bind:showLoginModal />

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

  .comment__body__top__left__anon-comment {
    background: #132e2e;
    border-radius: 50%;
    padding: 0.25rem;
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
    background: #18393a;
    border-radius: 6.8px;
    opacity: 70%;
  }

  .comment__body__top__right__reaction__val {
    padding: 0.5rem 0.7rem;
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
    width: 100%;
    justify-content: flex-start;
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
