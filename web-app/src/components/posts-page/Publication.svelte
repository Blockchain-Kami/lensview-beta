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
  import getFormattedDate from "../../utils/frontend/getFormattedDate";
  import { getCommentOfPublication } from "../../utils/frontend/getCommentOfPublication";
  import { totalComments } from "../../services/totalComments";
  import { getNotificationsContext } from "svelte-notifications";
  import DOMPurify from "dompurify";
  import { PUBLIC_APP_LENS_ID } from "$env/static/public";
  import { Tooltip } from "@svelte-plugins/tooltips";
  import { onMount } from "svelte";
  import { reloadAPublication } from "../../services/reloadPublication";
  import { isSignedIn } from "../../services/signInStatus";
  import {
    addReactionToAPost,
    removeReactionFromAPost
  } from "../../utils/frontend/updateReactionForAPost";
  import Login from "../Login.svelte";
  import getPictureURL from "../../utils/frontend/getPictureURL";

  const { addNotification } = getNotificationsContext();
  let postPubId = $page.data.postPubId;
  let isPostMoreOpen = false;
  let showLoginModal = false;
  let reaction: string | null = null;
  let upVoteCount = 0;
  let downVoteCount = 0;

  let promiseOfGetPost = getCommentOfPublication(postPubId, 1, "post");

  $: if (postPubId !== $page.data.postPubId) {
    postPubId = $page.data.postPubId;
    promiseOfGetPost = getCommentOfPublication(postPubId, 1, "post");
  }

  onMount(() => {
    reloadAPublication.subscribe((val) => {
      console.log("Reloaded a publication" + val);
      promiseOfGetPost = getCommentOfPublication(postPubId, 1, "post");
    });
  });

  const getTotalComments = (fetchedTotalComments: number) => {
    totalComments.setTotalComments(fetchedTotalComments);
    return fetchedTotalComments;
  };

  const sharePost = (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(
      window.location.origin +
        "/posts/" +
        $page.data.postPubId +
        "/" +
        $page.data.postPubId
    );
    addNotification({
      position: "top-right",
      heading: "Copied to clipboard",
      description: "The link to this post has been copied to your clipboard.",
      type: copy,
      removeAfter: 5000
    });
  };

  const callAddReaction = async (event: Event, passedReaction: string) => {
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
        if (reaction !== null) {
          await callRemoveReaction(event, reaction);
        }

        reaction = passedReaction;
        upVoteCount =
          passedReaction === "UPVOTE" ? upVoteCount + 1 : upVoteCount;
        downVoteCount =
          passedReaction === "DOWNVOTE" ? downVoteCount + 1 : downVoteCount;

        await addReactionToAPost(postPubId, passedReaction);
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

  const callRemoveReaction = async (event: Event, passedReaction: string) => {
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
        reaction = null;
        upVoteCount =
          passedReaction === "UPVOTE" ? upVoteCount - 1 : upVoteCount;
        downVoteCount =
          passedReaction === "DOWNVOTE" ? downVoteCount - 1 : downVoteCount;

        await removeReactionFromAPost(postPubId, passedReaction);
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
      description:
        'Kindly log-in to react to this post. Simply click on "Login" button to proceed with your login.',
      type: login,
      removeAfter: 10000,
      ctaBtnName: "Login",
      ctaFunction: () => {
        showLoginModal = true;
      }
    });
  };

  const updateReactionDetails = (
    passedReaction: string,
    passedUpVoteCount: number,
    passedDownVoteCount: number
  ) => {
    reaction = passedReaction;
    upVoteCount = passedUpVoteCount;
    downVoteCount = passedDownVoteCount;
    return "";
  };
</script>

<!----------------------------- HTML ----------------------------->
<section>
  {#await promiseOfGetPost}
    <div class="comment">
      <div class="comment__pic__loader" />
      <div class="comment__body">
        <div class="CenterRowFlex comment__body__top">
          <div class="CenterRowFlex comment__body__top__left__loader" />
          <div class="CenterRowFlex comment__body__top__right__loader" />
        </div>
        <div class="comment__body__content__loader" />
      </div>
    </div>
  {:then postPub}
    <div class="comment">
      <div class="comment__pic">
        <img
          src={getPictureURL(
            postPub?.data?.publications?.items[0]?.profile?.picture?.original
              ?.url,
            postPub?.data?.publications?.items[0]?.profile?.ownedBy
          )}
          alt="avatar"
        />
      </div>
      <div class="comment__body">
        <div class="CenterRowFlex comment__body__top">
          <div class="CenterRowFlex comment__body__top__left">
            {#if postPub?.data?.publications?.items[0]?.profile?.name !== null}
              <div class="comment__body__top__left__name">
                {postPub?.data?.publications?.items[0]?.profile?.name}
              </div>
              <div class="comment__body__top__left__dot" />
            {/if}
            <div class="comment__body__top__left__handle">
              {postPub?.data?.publications?.items[0]?.profile?.handle}
            </div>
            {#if postPub?.data?.publications?.items[0]?.profile?.id === PUBLIC_APP_LENS_ID}
              <Tooltip
                content="This post was made by an anonymous user!"
                position="right"
                autoPosition
                align="left"
                theme="custom-tooltip"
                maxWidth="150"
                animation="slide"
              >
                <span
                  class="CenterRowFlex comment__body__top__left__anon-comment"
                >
                  <Icon d={person} size="1.05em" />
                </span>
              </Tooltip>
            {/if}
          </div>
          <div class="CenterRowFlex comment__body__top__right">
            <button
              on:click={() => sharePost(event)}
              class="CenterRowFlex comment__body__top__right__share"
            >
              <Icon d={share} />
            </button>
            <div class="CenterRowFlex comment__body__top__right__reaction">
              {updateReactionDetails(
                postPub?.data?.publications?.items[0]?.reaction,
                postPub?.data?.publications?.items[0]?.stats?.totalUpvotes,
                postPub?.data?.publications?.items[0]?.stats?.totalDownvotes
              )}
              {#if reaction === "UPVOTE"}
                <button
                  on:click={() => callRemoveReaction(event, "UPVOTE")}
                  class="CenterRowFlex comment__body__top__right__reaction__val"
                >
                  <Icon d={thumbUp} />
                  {upVoteCount}
                </button>
              {:else}
                <button
                  on:click={() => callAddReaction(event, "UPVOTE")}
                  class="CenterRowFlex comment__body__top__right__reaction__val"
                >
                  <Icon d={thumbUpAlt} />
                  {upVoteCount}
                </button>
              {/if}
              <div class="comment__body__top__right__reaction__vertical-line" />
              {#if reaction === "DOWNVOTE"}
                <button
                  on:click={() => callRemoveReaction(event, "DOWNVOTE")}
                  class="CenterRowFlex comment__body__top__right__reaction__val"
                >
                  <Icon d={thumbDown} />
                  {downVoteCount}
                </button>
              {:else}
                <button
                  on:click={() => callAddReaction(event, "DOWNVOTE")}
                  class="CenterRowFlex comment__body__top__right__reaction__val"
                >
                  <Icon d={thumbDownAlt} />
                  {downVoteCount}
                </button>
              {/if}
            </div>
            <div class="CenterRowFlex comment__body__top__right__posts-count">
              <Icon d={modeComment} />
              {getTotalComments(
                postPub?.data?.publications?.items[0]?.stats
                  ?.totalAmountOfComments
              )}
            </div>
            <div class="comment__body__top__right__more">
              <button>
                <Icon d={moreVert} size="1.65em" />
              </button>
              {#if isPostMoreOpen}
                <div class="CenterColumnFlex comment__body__more">
                  <div class="CenterRowFlex comment__body__more__share">
                    <div class="CenterRowFlex comment__body__more__share__icon">
                      <Icon d={share} size="1.2em" />
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
          <!--eslint-disable-next-line svelte/no-at-html-tags -->
          {@html DOMPurify.sanitize(
            postPub?.data?.publications?.items[0]?.metadata?.content
          )}
        </div>
      </div>
    </div>
  {/await}
</section>

<Login bind:showLoginModal />

<!----------------------------------------------------------------->

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
    border: 2px solid #32f9ff;
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

  .comment__body__top__right__share {
    border-radius: 50%;
    background: #18393a;
    padding: 0.5rem;
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
