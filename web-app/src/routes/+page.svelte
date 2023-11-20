<script lang="ts">
  console.log("test");
</script>

<!--<pre>{JSON.stringify($charactersQueryStore.data, null, 2)}</pre>-->
<!--<script lang="ts">-->
<!--  import Icon from "$lib/Icon.svelte";-->
<!--  import {-->
<!--    copy,-->
<!--    modeComment,-->
<!--    moreHoriz,-->
<!--    person,-->
<!--    plus,-->
<!--    redirect,-->
<!--    share,-->
<!--    thumbDown,-->
<!--    thumbUp,-->
<!--    trendingUp-->
<!--  } from "../utils/frontend/appIcon";-->
<!--  import type { PageData } from "./$types";-->
<!--  import getFormattedDate from "../utils/frontend/getFormattedDate";-->
<!--  import { getCommentOfPublication } from "../utils/frontend/getCommentOfPublication";-->
<!--  import getImageURLUsingParentPubId from "../utils/frontend/getImageURLUsingParentPubId";-->
<!--  import AddNewPost from "../components/main-page/AddNewPost.svelte";-->
<!--  import IntroPrompt from "../components/main-page/IntroPrompt.svelte";-->
<!--  import { getNotificationsContext } from "svelte-notifications";-->
<!--  import DOMPurify from "dompurify";-->
<!--  import { Tooltip } from "@svelte-plugins/tooltips";-->
<!--  import { PUBLIC_APP_LENS_ID } from "$env/static/public";-->
<!--  import type { ObserverEventDetails, Options } from "svelte-inview";-->
<!--  import { inview } from "svelte-inview";-->
<!--  import MediaQuery from "$lib/MediaQuery.svelte";-->
<!--  import getPictureURL from "../utils/frontend/getPictureURL";-->
<!--  import { onMount } from "svelte";-->
<!--  import {-->
<!--    metaTagsDescription,-->
<!--    metaTagsImageAlt,-->
<!--    metaTagsImageUrl,-->
<!--    metaTagsTitle-->
<!--  } from "../services/metaTags";-->

<!--  type KeyStringValBoolean = {-->
<!--    [key: string]: boolean;-->
<!--  };-->

<!--  const { addNotification } = getNotificationsContext();-->
<!--  export let data: PageData;-->
<!--  let isCardsMoreOpen: KeyStringValBoolean = {};-->
<!--  let showAddNewPostModal = false;-->
<!--  const options: Options = {-->
<!--    threshold: 1-->
<!--  };-->
<!--  let isInView: KeyStringValBoolean = {};-->

<!--  onMount(() => {-->
<!--    metaTagsTitle.setMetaTagsTitle("LensView");-->
<!--    metaTagsDescription.setMetaTagsDescription(-->
<!--      "The omnipresent comment section to discuss, fact-check, and share your views about any web page"-->
<!--    );-->
<!--    metaTagsImageUrl.setMetaTagsImageUrl(-->
<!--      `https://i.postimg.cc/sXM5Hf9v/Lens-View-Banner-min.png`-->
<!--    );-->
<!--    metaTagsImageAlt.setMetaTagsImageAlt("LensView Banner Image");-->
<!--  });-->

<!--  const handleChange = (-->
<!--    event: CustomEvent<ObserverEventDetails>,-->
<!--    id: string-->
<!--  ) => {-->
<!--    isInView[id] = event.detail.inView;-->
<!--  };-->

<!--  const openCloseCardsMore = (event: Event, id: string) => {-->
<!--    event.preventDefault();-->
<!--    event.stopPropagation();-->
<!--    isCardsMoreOpen[id] = !isCardsMoreOpen[id];-->
<!--  };-->

<!--  const sharePost = (event: Event, id: string) => {-->
<!--    event.preventDefault();-->
<!--    event.stopPropagation();-->
<!--    navigator.clipboard.writeText(window.location.origin + "/posts/" + id);-->
<!--    addNotification({-->
<!--      position: "top-right",-->
<!--      heading: "Copied to clipboard",-->
<!--      description: "The link to this post has been copied to your clipboard.",-->
<!--      type: copy,-->
<!--      removeAfter: 5000-->
<!--    });-->
<!--  };-->
<!--</script>-->

<!--&lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; HTML -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->

<!--<MediaQuery query="(max-width: 825px)" let:matches>-->
<!--  <section>-->
<!--    <IntroPrompt />-->
<!--    <div class="body">-->
<!--      {#each data["explorePublicationsForApp"]?.items as item}-->
<!--        <a-->
<!--          href={"/posts/" + item?.id}-->
<!--          use:inview={options}-->
<!--          on:inview_change={(event) => handleChange(event, item?.id)}-->
<!--        >-->
<!--          <div-->
<!--            class="card"-->
<!--            class:card__hover-effect={isInView[item?.id] && matches}-->
<!--          >-->
<!--            {#await getImageURLUsingParentPubId(item?.id)}-->
<!--              <div class="card__image-loader" />-->
<!--            {:then fetchedImageUrl}-->
<!--              <div-->
<!--                class="card__image"-->
<!--                style="background-image: url({fetchedImageUrl})"-->
<!--                class:card__image__hover-effect={isInView[item?.id] && matches}-->
<!--              >-->
<!--                <div class="CenterRowFlex card__image__layer1">-->
<!--                  <div class="CenterRowFlex card__image__layer1__posts-count">-->
<!--                    <Icon d={modeComment} />-->
<!--                    {item?.stats?.totalAmountOfComments}-->
<!--                  </div>-->
<!--                  <button-->
<!--                    class="card__image__layer1__more-icon"-->
<!--                    on:click={(event) => openCloseCardsMore(event, item?.id)}-->
<!--                  >-->
<!--                    <Icon d={moreHoriz} />-->
<!--                  </button>-->
<!--                </div>-->
<!--                {#if isCardsMoreOpen[item?.id]}-->
<!--                  <div class="CenterColumnFlex card__image__more">-->
<!--                    <button-->
<!--                      on:click={(event) => sharePost(event, item?.id)}-->
<!--                      class="CenterRowFlex card__image__more__share"-->
<!--                    >-->
<!--                      <span-->
<!--                        class="CenterRowFlex card__image__more__share__icon"-->
<!--                      >-->
<!--                        <Icon d={share} size="1.2em" />-->
<!--                      </span>-->
<!--                      Share-->
<!--                    </button>-->
<!--                  </div>-->
<!--                {/if}-->
<!--              </div>-->
<!--            {:catch _error}-->
<!--              <div-->
<!--                class="card__image"-->
<!--                style="background-image: url('https://media.istockphoto.com/id/1392182937/vector/no-image-available-photo-coming-soon.jpg?s=170667a&w=0&k=20&c=HOCGNLwt3LkB92ZlyHAupxbwHY5X2143KDlbA-978dE=')"-->
<!--              />-->
<!--            {/await}-->
<!--            <div class="CenterRowFlex card__info">-->
<!--              <div class="CenterRowFlex card__info__reaction">-->
<!--                <div class="CenterRowFlex card__info__reaction__val">-->
<!--                  <Icon d={thumbUp} />-->
<!--                  {item?.stats?.totalUpvotes}-->
<!--                </div>-->
<!--                <div class="card__info__reaction__vertical-line" />-->
<!--                <div class="CenterRowFlex card__info__reaction__val">-->
<!--                  <Icon d={thumbDown} />-->
<!--                  {item?.stats?.totalDownvotes}-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="CenterColumnFlex card__info__content">-->
<!--                <a href={item?.metadata?.content} target="_blank">-->
<!--                  <div class="CenterRowFlex card__info__content__link">-->
<!--                    <Icon d={redirect} />{item?.metadata?.content.substring(-->
<!--                      0,-->
<!--                      20-->
<!--                    )}...-->
<!--                  </div>-->
<!--                </a>-->
<!--                <div class="card__info__content__time">-->
<!--                  {getFormattedDate(item?.createdAt)}-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            {#await getCommentOfPublication(item?.id, 1, "imagePub")}-->
<!--              <div class="CenterRowFlex card__post">-->
<!--                <div class="card__post__user-pic-loader" />-->
<!--                <div class="card__post__info">-->
<!--                  <div class="CenterRowFlex card__post__info__head-loader" />-->
<!--                  <div class="card__post__info__body-loader" />-->
<!--                </div>-->
<!--              </div>-->
<!--            {:then data}-->
<!--              {#if data?.data?.publications?.items[0]?.profile?.handle === undefined}-->
<!--                <div class="CenterRowFlex card__post">No Top Post</div>-->
<!--              {:else}-->
<!--                <div class="CenterRowFlex card__post">-->
<!--                  <div class="card__post__user-pic">-->
<!--                    <img-->
<!--                      src={getPictureURL(-->
<!--                        data?.data?.publications?.items[0]?.profile?.picture-->
<!--                          ?.original?.url,-->
<!--                        data?.data?.publications?.items[0]?.profile?.ownedBy-->
<!--                      )}-->
<!--                      alt="avatar"-->
<!--                    />-->
<!--                  </div>-->
<!--                  <div class="card__post__info">-->
<!--                    <div class="CenterRowFlex card__post__info__head">-->
<!--                      <div class="card__post__info__head__username">-->
<!--                        {data?.data?.publications?.items[0]?.profile?.handle.substring(-->
<!--                          0,-->
<!--                          12-->
<!--                        )}-->
<!--                        {data?.data?.publications?.items[0]?.profile?.handle-->
<!--                          .length > 12-->
<!--                          ? "..."-->
<!--                          : ""}-->
<!--                      </div>-->
<!--                      {#if data?.data?.publications?.items[0]?.profile?.id === PUBLIC_APP_LENS_ID}-->
<!--                        <Tooltip-->
<!--                          content="This post was made by an anonymous user!"-->
<!--                          position="top"-->
<!--                          autoPosition-->
<!--                          align="left"-->
<!--                          theme="custom-tooltip"-->
<!--                          maxWidth="150"-->
<!--                          animation="slide"-->
<!--                        >-->
<!--                          <span-->
<!--                            class="CenterRowFlex card__post__info__head__anon-comment"-->
<!--                          >-->
<!--                            <Icon d={person} size="1.05em" />-->
<!--                          </span>-->
<!--                        </Tooltip>-->
<!--                      {/if}-->
<!--                      <div class="CenterRowFlex card__post__info__head__trend">-->
<!--                        <div-->
<!--                          class="CenterRowFlex card__post__info__head__trend__icon"-->
<!--                        >-->
<!--                          <Icon d={trendingUp} />-->
<!--                        </div>-->
<!--                        <div class="card__post__info__head__trend__count">-->
<!--                          {data?.data?.publications?.items[0]?.stats-->
<!--                            ?.totalUpvotes === undefined-->
<!--                            ? 0-->
<!--                            : data?.data?.publications?.items[0]?.stats-->
<!--                                ?.totalUpvotes}-->
<!--                        </div>-->
<!--                      </div>-->
<!--                      <div class="card__post__info__head__time">-->
<!--                        {getFormattedDate(-->
<!--                          data?.data?.publications?.items[0]?.createdAt-->
<!--                        )}-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="card__post__info__body">-->
<!--                      &lt;!&ndash;eslint-disable-next-line svelte/no-at-html-tags &ndash;&gt;-->
<!--                      {@html DOMPurify.sanitize(-->
<!--                        data?.data?.publications?.items[0]?.metadata?.content-->
<!--                      ).substring(0, 100)}-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              {/if}-->
<!--            {:catch _error}-->
<!--              <div class="CenterRowFlex card__post">No Top Post</div>-->
<!--            {/await}-->
<!--          </div>-->
<!--        </a>-->
<!--      {/each}-->
<!--    </div>-->
<!--    <button-->
<!--      on:click={() => (showAddNewPostModal = true)}-->
<!--      class="CenterRowFlex add__post"-->
<!--    >-->
<!--      <Icon d={plus} color="#000" strokeWidth={0.8} />-->
<!--    </button>-->
<!--  </section>-->
<!--</MediaQuery>-->

<!--<AddNewPost bind:showAddNewPostModal />-->

<!--&lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->

<!--&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->

<!--&lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; STYLE -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--<style lang="scss">-->
<!--  section {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    gap: 3rem;-->
<!--    margin-top: 4rem;-->
<!--    padding: 3rem;-->
<!--  }-->

<!--  .body {-->
<!--    display: grid;-->
<!--    gap: 3rem;-->
<!--    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));-->
<!--    justify-items: center;-->
<!--  }-->

<!--  .body a {-->
<!--    width: 100%;-->
<!--  }-->

<!--  .card {-->
<!--    width: 100%;-->
<!--    filter: drop-shadow(-->
<!--      9.600000381469727px 22.80000114440918px 37.20000076293945px-->
<!--        rgba(0, 0, 0, 0.26)-->
<!--    );-->
<!--    transition: all 0.4s ease-in-out;-->
<!--  }-->

<!--  .card:hover {-->
<!--    transform: scale(1.04);-->
<!--  }-->

<!--  .card__hover-effect {-->
<!--    transform: scale(1.04);-->
<!--  }-->

<!--  .card__image-loader {-->
<!--    width: 100%;-->
<!--    height: 17rem;-->
<!--    border-radius: 10.8px;-->
<!--  }-->

<!--  .card__image {-->
<!--    width: 100%;-->
<!--    height: 17rem;-->
<!--    background-color: #000;-->
<!--    overflow: hidden;-->
<!--    padding-bottom: 50%; /* Adjust this value to control the aspect ratio */-->
<!--    background-size: cover;-->
<!--    border-radius: 10.8px;-->
<!--    transition: background-position 1s ease;-->
<!--  }-->

<!--  .card__image:hover {-->
<!--    animation: scrollBackground 9s linear infinite;-->
<!--  }-->

<!--  .card__image__hover-effect {-->
<!--    animation: scrollBackground 9s linear infinite;-->
<!--  }-->

<!--  @keyframes scrollBackground {-->
<!--    0% {-->
<!--      background-position: top center;-->
<!--    }-->
<!--    100% {-->
<!--      background-position: bottom center;-->
<!--    }-->
<!--  }-->

<!--  .card__image__layer1 {-->
<!--    justify-content: space-between;-->
<!--    padding: 0.5rem 0.5rem 0 0.5rem;-->
<!--  }-->

<!--  .card__image__layer1__posts-count {-->
<!--    background: #0e3439;-->
<!--    padding: 0.5rem 0.7rem;-->
<!--    gap: 0.5rem;-->
<!--    border-radius: 5.8px;-->
<!--    opacity: 85%;-->
<!--  }-->

<!--  .card__image__layer1__more-icon {-->
<!--    background: #0e3439;-->
<!--    padding: 0.2rem 0.5rem;-->
<!--    border-radius: 5.8px;-->
<!--    opacity: 85%;-->
<!--  }-->

<!--  .card__image__more {-->
<!--    align-items: flex-start;-->
<!--    width: 30%;-->
<!--    background: #185359;-->
<!--    padding: 0.45rem;-->
<!--    border-radius: 5.8px;-->
<!--    margin-left: auto;-->
<!--    margin-right: 0.5rem;-->
<!--  }-->

<!--  .card__image__more__share {-->
<!--    gap: 0.5rem;-->
<!--  }-->

<!--  .card__image__more__share__icon {-->
<!--    background: #2c4042;-->
<!--    padding: 0.5rem;-->
<!--    border-radius: 50%;-->
<!--  }-->

<!--  .card__info {-->
<!--    width: 100%;-->
<!--    background: #124045;-->
<!--    padding: 1rem;-->
<!--    justify-content: space-between;-->
<!--  }-->

<!--  .card__info__reaction {-->
<!--    padding: 0.7rem;-->
<!--    background: #0e2829;-->
<!--    gap: 0.5rem;-->
<!--    border-radius: 6.8px;-->
<!--    opacity: 70%;-->
<!--    max-width: fit-content;-->
<!--  }-->

<!--  .card__info__reaction__val {-->
<!--    gap: 0.4rem;-->
<!--  }-->

<!--  .card__info__reaction__vertical-line {-->
<!--    border-left: 2px solid #ffffff45;-->
<!--    height: 21px;-->
<!--  }-->

<!--  .card__info__content {-->
<!--    align-items: flex-end;-->
<!--    gap: 0.3rem;-->
<!--  }-->

<!--  .card__info__content__link {-->
<!--    gap: 0.3rem;-->
<!--  }-->

<!--  .card__info__content__time {-->
<!--    font-size: var(&#45;&#45;small-font-size);-->
<!--    color: var(&#45;&#45;text-accent);-->
<!--  }-->

<!--  .card__post {-->
<!--    background: #185359;-->
<!--    border-radius: 0 0 10.8px 10.8px;-->
<!--    padding: 1.2rem;-->
<!--    gap: 0.8rem;-->
<!--    height: 10.4rem;-->
<!--  }-->

<!--  .card__post__user-pic-loader {-->
<!--    height: 4rem;-->
<!--    width: 4.7rem;-->
<!--    margin-bottom: auto;-->
<!--    border-radius: 50%;-->
<!--  }-->

<!--  .card__post__user-pic {-->
<!--    margin-bottom: auto;-->
<!--  }-->

<!--  .card__post__user-pic img {-->
<!--    width: 3rem;-->
<!--    height: 3rem;-->
<!--    border-radius: 50%;-->
<!--    border: 2px solid #32f9ff;-->
<!--  }-->

<!--  .card__post__info {-->
<!--    width: 100%;-->
<!--  }-->

<!--  .card__post__info__head-loader {-->
<!--    width: 70%;-->
<!--    justify-content: flex-start;-->
<!--    margin-bottom: 0.8rem;-->
<!--    height: 1rem;-->
<!--    border-radius: 5px;-->
<!--  }-->

<!--  .card__post__info__head {-->
<!--    gap: 0.5rem;-->
<!--    justify-content: flex-start;-->
<!--    margin-bottom: 0.8rem;-->
<!--  }-->

<!--  .card__post__info__head__username {-->
<!--    padding: 0.2rem 0.5rem;-->
<!--    background: #113232;-->
<!--    border-radius: 5px;-->
<!--    color: #32f9ff;-->
<!--  }-->

<!--  .card__post__info__head__anon-comment {-->
<!--    background: #132e2e;-->
<!--    border-radius: 50%;-->
<!--    padding: 0.25rem;-->
<!--  }-->

<!--  .card__post__info__head__trend {-->
<!--    background: #113232;-->
<!--    border-radius: 14px;-->
<!--    font-size: var(&#45;&#45;small-font-size);-->
<!--    opacity: 90%;-->
<!--  }-->

<!--  .card__post__info__head__trend__icon {-->
<!--    padding: 0.15rem 0.3rem;-->
<!--    border-radius: 50%;-->
<!--    background: #0e2828;-->
<!--  }-->

<!--  .card__post__info__head__trend__count {-->
<!--    padding: 0.15rem 0.5rem;-->
<!--  }-->

<!--  .card__post__info__head__time {-->
<!--    font-size: var(&#45;&#45;small-font-size);-->
<!--    color: var(&#45;&#45;text-accent);-->
<!--    margin-left: auto;-->
<!--  }-->

<!--  .card__post__info__body-loader {-->
<!--    height: 5.2rem;-->
<!--    border-radius: 5px;-->
<!--  }-->

<!--  .card__post__info__body {-->
<!--    height: 5.2rem;-->
<!--    overflow-wrap: break-word;-->
<!--    width: 20.5rem;-->
<!--  }-->

<!--  @keyframes shine {-->
<!--    to {-->
<!--      background-position-x: -200%;-->
<!--    }-->
<!--  }-->

<!--  .card__post__user-pic-loader,-->
<!--  .card__post__info__head-loader,-->
<!--  .card__post__info__body-loader,-->
<!--  .card__image-loader {-->
<!--    background: linear-gradient(110deg, #0d9397 8%, #63bdc8 18%, #0d9397 33%);-->
<!--    background-size: 200% 100%;-->
<!--    animation: 1s shine linear infinite;-->
<!--  }-->

<!--  .add__post {-->
<!--    position: fixed;-->
<!--    bottom: 5rem;-->
<!--    right: 3.5rem;-->
<!--    background: var(&#45;&#45;btn-bg);-->
<!--    padding: 1.5rem;-->
<!--    border-radius: 50%;-->
<!--    transition: all 0.4s ease-in-out;-->
<!--    box-shadow: rgba(0, 0, 0, 0.25) 0 54px 55px,-->
<!--      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,-->
<!--      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;-->
<!--  }-->

<!--  .add__post:hover {-->
<!--    transform: scale(1.3);-->
<!--  }-->
<!--</style>-->
