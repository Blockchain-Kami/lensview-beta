<script lang="ts">
    import Icon from "$lib/Icon.svelte";
    import {modeComment, moreVert, redirect, thumbDownAlt, thumbUpAlt} from "../../utils/frontend/appIcon";
    import RelatedPost from "./RelatedPost.svelte";
    import {page} from '$app/stores';
    import {getPublicationByPubId} from "../../utils/frontend/getPublicationByPubId";
    import getFormattedDate from "../../utils/frontend/getFormattedDate";
    import getImageURLFromURLHash from "../../utils/frontend/getImageURLFromURLHash";
    import {totalPosts} from "../../services/totalPosts";

    let mainPostPubId = $page.data.mainPostPubId;
    let promiseOfGetMainPost = getPublicationByPubId(mainPostPubId);

    $: if (mainPostPubId !== $page.data.mainPostPubId) {
        mainPostPubId = $page.data.mainPostPubId;
        promiseOfGetMainPost = getPublicationByPubId(mainPostPubId);
    }

    const getTotalPosts = (fetchedTotalPosts: number) => {
        totalPosts.setTotalPosts(fetchedTotalPosts);
        return fetchedTotalPosts;
    }
</script>


<!----------------------------- HTML ----------------------------->

<section>
    {#await promiseOfGetMainPost}
        <div class="main-post">
            <div class="main-post__content__loader"></div>
        </div>
        <div class="h2 related-posts-head">
            Related Posts
        </div>
        <div class="related-posts-body">
            <RelatedPost userEnteredUrl={""}/>
        </div>
    {:then mainPostPub}
        {#await getImageURLFromURLHash(mainPostPub?.data?.publications?.items[0]?.metadata?.tags[0])}
            <div class="image__loader"></div>
        {:then imageUrl}
            <a href={`/posts/${mainPostPubId}`}>
                <img src={imageUrl} alt="">
            </a>
        {/await}
        <div class="CenterColumnFlex main-post">
            <a href={`/posts/${mainPostPubId}`}
               class="CenterColumnFlex main-post__content">
                <div class="CenterRowFlex main-post__content__top">
                    <a href={mainPostPub?.data?.publications?.items[0]?.metadata.content}
                       target="_blank"
                       class="CenterRowFlex"
                    >
                        <div class="CenterRowFlex main-post__content__top__redirect">
                            <Icon d={redirect}/>
                        </div>
                        <div class="main-post__content__top__url">
                            &nbsp;&nbsp;{mainPostPub?.data?.publications?.items[0]?.metadata.content.substring(0, 40)}
                            ...
                        </div>
                    </a>
                    <div class="main-post__content__top__time">
                        {getFormattedDate(mainPostPub?.data?.publications?.items[0]?.createdAt)}
                    </div>
                    <div class="CenterRowFlex main-post__content__top__more">
                        <Icon d={moreVert}/>
                    </div>
                </div>
                <div class="CenterRowFlex main-post__content__bottom">
                    <div class="CenterRowFlex main-post__content__bottom__reaction">
                        <div class="CenterRowFlex main-post__content__bottom__reaction__val">
                            <Icon d={thumbUpAlt}/>
                            {mainPostPub?.data?.publications?.items[0]?.stats?.totalUpvotes}
                        </div>
                        <div class="main-post__content__bottom__reaction__vertical-line"></div>
                        <div class="CenterRowFlex main-post__content__bottom__reaction__val">
                            <Icon d={thumbDownAlt}/>
                            {mainPostPub?.data?.publications?.items[0]?.stats?.totalDownvotes}
                        </div>
                    </div>
                    <div class="CenterRowFlex main-post__content__bottom__posts-count">
                        <Icon d={modeComment}/>
                        {getTotalPosts(mainPostPub?.data?.publications?.items[0]?.stats?.totalAmountOfComments)} &nbsp;Posts
                    </div>
                    <div class="CenterRowFlex main-post__content__bottom__added-by">
                        <div class="main-post__content__bottom__added-by__label">
                            Added by:
                        </div>
                        <div class="main-post__content__bottom__added-by__handle">
                            username.lens
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div class="h2 related-posts-head">
            Related Posts
        </div>
        <div class="related-posts-body">
            <RelatedPost userEnteredUrl={mainPostPub?.data?.publications?.items[0]?.metadata.content}/>
        </div>
    {/await}
</section>

<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  section {
    padding-top: 2rem;
  }

  section img {
    width: 100%;
    border-radius: 10px;
  }

  .image__loader {
    width: 100%;
    border-radius: 10px;
    height: 40rem;
  }

  .main-post {
    height: 10rem;
    width: 100%;
    position: sticky;
    top: 0;
    bottom: 0;
    margin: auto;
    background: rgba(13, 23, 29, 0.50);
    backdrop-filter: blur(8.5px);
    padding: 1.3rem 2rem;
    z-index: 10;
  }

  .main-post__content {
    width: 100%;
    min-width: 31rem;
  }

  .main-post__content__loader {
    width: 100%;
    min-width: 31rem;
    border-radius: 10.8px;
    height: 8rem;
  }

  .main-post__content__top {
    background: #18393a;
    padding: 1rem;
    gap: 0.5rem;
    width: 100%;
    border-radius: 10px 10px 0 0;

  }

  .main-post__content__top__time {
    font-size: var(--small-font-size);
    color: var(--text-accent);
    margin-left: auto;
  }

  .main-post__content__bottom {
    background: #1e4748;
    padding: 1rem;
    gap: 0.5rem;
    width: 100%;
    border-radius: 0 0 10px 10px;
  }

  .main-post__content__bottom__reaction {
    padding: 0.5rem 0.7rem;
    background: #18393a;
    gap: 0.5rem;
    border-radius: 6.8px;
    opacity: 70%;
  }

  .main-post__content__bottom__reaction__val {
    gap: 0.4rem;
  }

  .main-post__content__bottom__reaction__vertical-line {
    border-left: 2px solid #ffffff45;
    height: 21px;
  }

  .main-post__content__bottom__posts-count {
    background: #18393a;
    padding: 0.5rem 0.7rem;
    gap: 0.5rem;
    border-radius: 5.8px;
    opacity: 85%;
  }

  .main-post__content__bottom__added-by {
    margin-left: auto;
    gap: 0.5rem;
  }

  .main-post__content__bottom__added-by__label {
    color: var(--text-accent);
  }

  .main-post__content__bottom__added-by__handle {
    padding: 0.2rem 0.5rem;
    background: #18393a;
    border-radius: 5px;
    color: var(--primary);
  }

  .related-posts-head {
    position: sticky;
    top: 10rem;
    background: #0d171d;
    padding: 1.5rem;
    z-index: 10;
  }

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }

  .image__loader,
  .main-post__content__loader {
    background: linear-gradient(110deg, #0d9397 8%, #63bdc8 18%, #0d9397 33%);
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
  }
</style>
<!----------------------------------------------------------------->
