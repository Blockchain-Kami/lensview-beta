<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import {
    modeComment,
    moreHoriz,
    person,
    redirect,
    share,
    thumbDown,
    thumbUp,
    trendingUp
  } from "../../utils/frontend/appIcon";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import DOMPurify from "dompurify";
  import { PUBLIC_APP_LENS_ID } from "$env/static/public";
  import { Tooltip } from "@svelte-plugins/tooltips";
  import type { ObserverEventDetails, Options } from "svelte-inview";
  import { inview } from "svelte-inview";
  import MediaQuery from "$lib/MediaQuery.svelte";
  import getLinkPublicationLensService from "../../services/lens/get-link-publication.lens.service";
  import getImageCommentLensService from "../../services/lens/get-image-comment.lens.service";
  import getFormattedDateHelperUtil from "../../utils/helper/get-formatted-date.helper.util";
  import getCommentBasedOnParameterPublicationUtil from "../../utils/publications/get-comment-based-on-parameter.publication.util";
  import { LimitType } from "../../gql/graphql";
  import { CommentFilterType } from "../../config/app-constants.config";
  import getPictureURLUtil from "../../utils/get-picture-URL.util";
  import getRelatedPostPubIdsAppService from "../../services/app/get-related-post-pub-ids.app.service";

  type KeyStringValBoolean = {
    [key: string]: boolean;
  };

  let isCardsMoreOpen = false;
  export let searchLinkOrKeywords: string;

  let foundedMainPostPubIds: string[] = [];
  let fetchingFoundedMainPostPubIds = false;
  const options: Options = {
    threshold: 1,
    rootMargin: "-10%"
  };
  let isInView: KeyStringValBoolean = {};

  const handleChange = (
    event: CustomEvent<ObserverEventDetails>,
    id: string
  ) => {
    isInView[id] = event.detail.inView;
  };

  onMount(async () => {
    fetchingFoundedMainPostPubIds = true;
    console.log("searchLinkOrKeywords", searchLinkOrKeywords);
    if (searchLinkOrKeywords !== "") {
      try {
        const resp = await getRelatedPostPubIdsAppService(searchLinkOrKeywords);
        foundedMainPostPubIds = resp?.publications;
        console.log("foundedMainPostPubIds", foundedMainPostPubIds);
        fetchingFoundedMainPostPubIds = false;
      } catch (error) {
        fetchingFoundedMainPostPubIds = false;
        console.log("error", error);
        foundedMainPostPubIds = [];
      }
    }
  });
</script>

<!----------------------------- HTML ----------------------------->
<MediaQuery query="(max-width: 600px)" let:matches>
  {#if fetchingFoundedMainPostPubIds}
    <section>
      <div class="card">
        <div class="card__image-loader" />
        <div class="CenterRowFlex card__post">
          <div class="card__post__user-pic-loader" />
          <div class="card__post__info">
            <div class="CenterRowFlex card__post__info__head-loader" />
            <div class="card__post__info__body-loader" />
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card__image-loader" />
        <div class="CenterRowFlex card__post">
          <div class="card__post__user-pic-loader" />
          <div class="card__post__info">
            <div class="CenterRowFlex card__post__info__head-loader" />
            <div class="card__post__info__body-loader" />
          </div>
        </div>
      </div>
    </section>
  {:else if foundedMainPostPubIds.length > 0}
    <section>
      {#each foundedMainPostPubIds as mainPostPubId}
        {#if mainPostPubId !== $page.data.mainPostPubId}
          <a
            href={`/posts/${mainPostPubId}`}
            use:inview={options}
            on:inview_change={(event) => handleChange(event, mainPostPubId)}
            class="card"
            class:card__hover-effect={isInView[mainPostPubId] && matches}
          >
            {#await getLinkPublicationLensService(mainPostPubId)}
              <div class="card__image-loader" />
              <div class="CenterRowFlex card__post">
                <div class="card__post__user-pic-loader" />
                <div class="card__post__info">
                  <div class="CenterRowFlex card__post__info__head-loader" />
                  <div class="card__post__info__body-loader" />
                </div>
              </div>
            {:then mainPostPub}
              {#await getImageCommentLensService(mainPostPub?.id)}
                <div class="card__image-loader" />
              {:then imageUrl}
                <div
                  class="card__image"
                  style="background-image: url({imageUrl})"
                  class:card__image__hover-effect={isInView[mainPostPubId] &&
                    matches}
                >
                  <div class="CenterRowFlex card__image__layer1">
                    <div class="CenterRowFlex card__image__layer1__posts-count">
                      <Icon d={modeComment} />
                      {mainPostPub?.stats?.comments}
                    </div>
                    <div class="card__image__layer1__more-icon">
                      <button
                        on:click={() => {
                          isCardsMoreOpen = !isCardsMoreOpen;
                        }}
                      >
                        <Icon d={moreHoriz} />
                      </button>
                    </div>
                  </div>
                  {#if isCardsMoreOpen}
                    <div class="CenterColumnFlex card__image__more">
                      <div class="CenterRowFlex card__image__more__share">
                        <div
                          class="CenterRowFlex card__image__more__share__icon"
                        >
                          <Icon d={share} size="1.2em" />
                        </div>
                        Share
                      </div>
                    </div>
                  {/if}
                </div>
              {:catch _error}
                <div
                  class="card__image"
                  style="background-image: url('https://media.istockphoto.com/id/1392182937/vector/no-image-available-photo-coming-soon.jpg?s=170667a&w=0&k=20&c=HOCGNLwt3LkB92ZlyHAupxbwHY5X2143KDlbA-978dE=')"
                />
              {/await}
              <div class="CenterRowFlex card__info">
                <div class="CenterRowFlex card__info__reaction">
                  <div class="CenterRowFlex card__info__reaction__val">
                    <Icon d={thumbUp} />
                    {mainPostPub?.stats?.upvotes}
                  </div>
                  <div class="card__info__reaction__vertical-line" />
                  <div class="CenterRowFlex card__info__reaction__val">
                    <Icon d={thumbDown} />
                    {mainPostPub?.stats?.downvotes}
                  </div>
                </div>
                <div class="CenterColumnFlex card__info__content">
                  <a href={mainPostPub?.metadata?.sharingLink} target="_blank">
                    <div class="CenterRowFlex card__info__content__link">
                      <Icon
                        d={redirect}
                      />{mainPostPub?.metadata?.sharingLink.substring(0, 20)}
                      ...
                    </div>
                  </a>
                  <div class="card__info__content__time">
                    {getFormattedDateHelperUtil(mainPostPub?.createdAt)}
                  </div>
                </div>
              </div>
              {#await getCommentBasedOnParameterPublicationUtil(mainPostPubId, LimitType.Ten, CommentFilterType.FirstMostRelevantComments)}
                <div class="CenterRowFlex card__post">
                  <div class="card__post__user-pic-loader" />
                  <div class="card__post__info">
                    <div class="CenterRowFlex card__post__info__head-loader" />
                    <div class="card__post__info__body-loader" />
                  </div>
                </div>
              {:then comments}
                {#if comments.items[0]?.by?.handle?.fullHandle === undefined}
                  <div class="CenterRowFlex card__post">No Top Post</div>
                {:else}
                  <div class="CenterRowFlex card__post">
                    <div class="card__post__user-pic">
                      <img
                        src={getPictureURLUtil(
                          comments.items[0]?.by?.metadata?.picture?.optimized
                            ?.uri,
                          comments.items[0]?.by?.ownedBy?.address
                        )}
                        alt="avatar"
                      />
                    </div>
                    <div class="card__post__info">
                      <div class="CenterRowFlex card__post__info__head">
                        <div class="card__post__info__head__username">
                          {comments.items[0]?.by?.handle?.fullHandle.substring(
                            5,
                            17
                          )}
                          {comments.items[0]?.by?.handle?.fullHandle.length > 12
                            ? "..."
                            : ""}
                        </div>
                        {#if comments.items[0]?.by?.id === PUBLIC_APP_LENS_ID}
                          <Tooltip
                            content="This post was made by an anonymous user!"
                            position="top"
                            autoPosition
                            align="left"
                            theme="custom-tooltip"
                            maxWidth="150"
                            animation="slide"
                          >
                            <span
                              class="CenterRowFlex card__post__info__head__anon-comment"
                            >
                              <Icon d={person} size="1.05em" />
                            </span>
                          </Tooltip>
                        {/if}
                        <div
                          class="CenterRowFlex card__post__info__head__trend"
                        >
                          <div
                            class="CenterRowFlex card__post__info__head__trend__icon"
                          >
                            <Icon d={trendingUp} />
                          </div>
                          <div class="card__post__info__head__trend__count">
                            {comments?.items[0]?.stats?.upvotes === undefined
                              ? 0
                              : comments?.items[0]?.stats?.upvotes}
                          </div>
                        </div>
                        <div class="card__post__info__head__time">
                          {getFormattedDateHelperUtil(
                            comments?.items[0]?.createdAt
                          )}
                        </div>
                      </div>
                      <div class="card__post__info__body">
                        <!--eslint-disable-next-line svelte/no-at-html-tags -->
                        {@html DOMPurify.sanitize(
                          comments?.items[0]?.metadata?.content
                        ).substring(0, 70)}
                      </div>
                    </div>
                  </div>
                {/if}
              {:catch _error}
                <div class="CenterRowFlex card__post">No Top Post</div>
              {/await}
            {/await}
          </a>
        {/if}
      {/each}
    </section>
  {:else}
    <div class="CenterRowFlex" style="margin: 1rem 0">
      No related posts found
    </div>
  {/if}
</MediaQuery>

<!----------------------------------------------------------------->

<!---------------------------------------------------------------->

<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  section {
    display: grid;
    gap: 3rem;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    padding: 1rem 0;
    justify-items: center;
  }

  .card {
    width: 100%;
    filter: drop-shadow(
      9.600000381469727px 22.80000114440918px 37.20000076293945px
        rgba(0, 0, 0, 0.26)
    );
    font-size: var(--small-font-size);
    transition: all 0.4s ease-in-out;
  }

  .card:hover {
    transform: scale(1.04);
  }

  .card__hover-effect {
    transform: scale(1.04);
  }

  .card__image-loader {
    width: 100%;
    height: 12.3rem;
    border-radius: 10.8px;
  }

  .card__image {
    width: 100%;
    height: 12.3rem;
    background-color: #000;
    overflow: hidden;
    padding-bottom: 50%; /* Adjust this value to control the aspect ratio */
    background-size: cover;
    border-radius: 10.8px;
    transition: background-position 1s ease;
  }

  .card__image:hover {
    animation: scrollBackground 9s linear infinite;
  }

  .card__image__hover-effect {
    animation: scrollBackground 9s linear infinite;
  }

  @keyframes scrollBackground {
    0% {
      background-position: top center;
    }
    100% {
      background-position: bottom center;
    }
  }

  .card__image__layer1 {
    justify-content: space-between;
    padding: 0.36rem 0.36rem 0 0.36rem;
  }

  .card__image__layer1__posts-count {
    background: #0e3439;
    padding: 0.36rem 0.5rem;
    gap: 0.5rem;
    border-radius: 5.8px;
    opacity: 85%;
  }

  .card__image__layer1__more-icon {
    background: #0e3439;
    padding: 0.14rem 0.36rem;
    border-radius: 5.8px;
    opacity: 85%;
  }

  .card__image__more {
    align-items: flex-start;
    width: 30%;
    background: #185359;
    padding: 0.32rem;
    border-radius: 5.8px;
    margin-left: auto;
    margin-right: 0.5rem;
  }

  .card__image__more__share {
    gap: 0.5rem;
  }

  .card__image__more__share__icon {
    background: #2c4042;
    padding: 0.36rem;
    border-radius: 50%;
  }

  .card__info {
    width: 100%;
    background: #124045;
    padding: 0.7rem;
    justify-content: space-between;
  }

  .card__info__reaction {
    padding: 0.5rem;
    background: #0e2829;
    gap: 0.5rem;
    border-radius: 6.8px;
    opacity: 70%;
  }

  .card__info__reaction__val {
    gap: 0.4rem;
  }

  .card__info__reaction__vertical-line {
    border-left: 2px solid #ffffff45;
    height: 15px;
  }

  .card__info__content {
    align-items: flex-end;
    gap: 0.3rem;
  }

  .card__info__content__link {
    gap: 0.3rem;
  }

  .card__info__content__time {
    font-size: var(--semi-small-font-size);
    color: var(--text-accent);
  }

  .card__post {
    background: #185359;
    border-radius: 0 0 10.8px 10.8px;
    padding: 0.87rem;
    gap: 0.8rem;
    height: 7.5rem;
  }

  .card__post__user-pic-loader {
    height: 4rem;
    width: 3.4rem;
    margin-bottom: auto;
    border-radius: 50%;
  }

  .card__post__user-pic {
    margin-bottom: auto;
  }

  .card__post__user-pic img {
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    border: 2px solid #32f9ff;
  }

  .card__post__info {
    width: 100%;
  }

  .card__post__info__head-loader {
    width: 70%;
    justify-content: flex-start;
    margin-bottom: 0.8rem;
    height: 0.7rem;
    border-radius: 5px;
  }

  .card__post__info__head {
    gap: 0.5rem;
    justify-content: flex-start;
    margin-bottom: 0.8rem;
  }

  .card__post__info__head__username {
    padding: 0.14rem 0.36rem;
    background: #113232;
    border-radius: 5px;
    color: #32f9ff;
  }

  .card__post__info__head__anon-comment {
    background: #132e2e;
    border-radius: 50%;
    padding: 0.25rem;
  }

  .card__post__info__head__trend {
    background: #113232;
    border-radius: 14px;
    font-size: var(--semi-small-font-size);
    opacity: 90%;
  }

  .card__post__info__head__trend__icon {
    padding: 0.1rem 0.2rem;
    border-radius: 50%;
    background: #0e2828;
  }

  .card__post__info__head__trend__count {
    padding: 0.07rem 0.26rem;
  }

  .card__post__info__head__time {
    font-size: var(--semi-small-font-size);
    color: var(--text-accent);
    margin-left: auto;
  }

  .card__post__info__body-loader {
    height: 3.7rem;
    border-radius: 5px;
  }

  .card__post__info__body {
    height: 3.7rem;
    overflow-wrap: anywhere;
    width: 14.8rem;
  }

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }

  .card__post__user-pic-loader,
  .card__post__info__head-loader,
  .card__post__info__body-loader,
  .card__image-loader {
    background: linear-gradient(110deg, #0d9397 8%, #63bdc8 18%, #0d9397 33%);
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
  }
</style>
