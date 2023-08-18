<script lang="ts">

    import Icon from "$lib/Icon.svelte";
    import {
        modeComment,
        moreVert,
        person,
        redirect,
        thumbDown,
        thumbUp,
        trendingUp
    } from "../../utils/frontend/appIcon";
    import {getPublicationByPubId} from "../../utils/frontend/getPublicationByPubId";
    import getImageURLUsingParentPubId from "../../utils/frontend/getImageURLUsingParentPubId";
    import getFormattedDate from "../../utils/frontend/getFormattedDate";
    import {getCommentOfPublication} from "../../utils/frontend/getCommentOfPublication";
    import {searchInputDetails} from "../../services/searchInputDetails";
    import type {SearchInputDetailsModel} from "../../models/searchInputDetails.model";
    import DOMPurify from "dompurify";
    import {Tooltip} from "@svelte-plugins/tooltips";
    import {PUBLIC_APP_LENS_ID} from "$env/static/public";
    import MediaQuery from "$lib/MediaQuery.svelte";

    let foundedMainPostPubId: string[] = [];
    let fetchingMainPostPubId = false;

    searchInputDetails.subscribe(async (details: SearchInputDetailsModel) => {
        const userEnteredUrlOrKeywords = details.userEnteredUrlOrKeywords;
        fetchingMainPostPubId = true;
        try {
            foundedMainPostPubId = await fetch('/api/related-pubs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userEnteredUrlOrKeywords)
            }).then((res) => {
                fetchingMainPostPubId = false;
                if (res.ok)
                    return res.json();
                else
                    throw new Error(res.statusText);
            });
        } catch (error) {
            console.log('error', error);
            foundedMainPostPubId = [];
            fetchingMainPostPubId = false;
        }
    });
</script>


<!----------------------------- HTML ----------------------------->
<MediaQuery query="(max-width: 825px)" let:matches>
    {#if matches}
        <section class="mobile">
            {#if foundedMainPostPubId.length !== 0}
                <div class="h3 heading">
                    This is what we found
                </div>
            {/if}
            {#if fetchingMainPostPubId}
                <div class="mobile__card">
                    <div class="mobile__card__image-loader">
                    </div>
                    <div class="mobile__card__info__loader"></div>
                    <div class="CenterRowFlex mobile__card__post">
                        <div class="mobile__card__post__user-pic-loader">

                        </div>
                        <div class="mobile__card__post__info">
                            <div class="CenterRowFlex mobile__card__post__info__head-loader">

                            </div>
                            <div class="mobile__card__post__info__body-loader">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="mobile__card">
                    <div class="mobile__card__image-loader">
                    </div>
                    <div class="mobile__card__info__loader"></div>
                    <div class="CenterRowFlex mobile__card__post">
                        <div class="mobile__card__post__user-pic-loader">

                        </div>
                        <div class="mobile__card__post__info">
                            <div class="CenterRowFlex mobile__card__post__info__head-loader">

                            </div>
                            <div class="mobile__card__post__info__body-loader">

                            </div>
                        </div>
                    </div>
                </div>
            {:else}
                <div class="mobile__body">
                    {#each foundedMainPostPubId as mainPostPubId}
                        <a href={`/posts/${mainPostPubId}`}
                           class="mobile__card">
                            {#await getPublicationByPubId(mainPostPubId)}
                                <div class="mobile__card__image-loader">
                                </div>
                                <div class="mobile__card__info__loader"></div>
                                <div class="CenterRowFlex mobile__card__post">
                                    <div class="mobile__card__post__user-pic-loader">

                                    </div>
                                    <div class="mobile__card__post__info">
                                        <div class="CenterRowFlex mobile__card__post__info__head-loader">

                                        </div>
                                        <div class="mobile__card__post__info__body-loader">

                                        </div>
                                    </div>
                                </div>
                            {:then mainPostPub}
                                {#await getImageURLUsingParentPubId(mainPostPub?.data?.publications?.items[0]?.id)}
                                    <div class="mobile__card__image-loader">
                                    </div>
                                {:then imageUrl}
                                    <div class="mobile__card__image"
                                         style="background-image: url({imageUrl})">
                                    </div>
                                {:catch error}
                                    <div class="mobile__card__image"
                                         style="background-image: url('https://media.istockphoto.com/id/1392182937/vector/no-image-available-photo-coming-soon.jpg?s=170667a&w=0&k=20&c=HOCGNLwt3LkB92ZlyHAupxbwHY5X2143KDlbA-978dE=')">
                                    </div>
                                {/await}
                                <div class="CenterRowFlex mobile__card__info">
                                    <div class="CenterRowFlex mobile__card__info__reaction">
                                        <div class="CenterRowFlex mobile__card__info__reaction__val">
                                            <Icon d={thumbUp}/>
                                            {mainPostPub?.data?.publications?.items[0]?.stats?.totalUpvotes}
                                        </div>
                                        <div class="mobile__card__info__reaction__vertical-line"></div>
                                        <div class="CenterRowFlex mobile__card__info__reaction__val">
                                            <Icon d={thumbDown}/>
                                            {mainPostPub?.data?.publications?.items[0]?.stats?.totalDownvotes}
                                        </div>
                                    </div>
                                    <div class="CenterRowFlex mobile__card__info__posts-count">
                                        <Icon d={modeComment}/>
                                        {mainPostPub?.data?.publications?.items[0]?.stats?.totalAmountOfComments}
                                    </div>
                                    <a href={mainPostPub?.data?.publications?.items[0]?.metadata.content}
                                       target="_blank"
                                       class="CenterRowFlex mobile__card__info__link"
                                    >
                                        <Icon d={redirect}/>{mainPostPub?.data?.publications?.items[0]?.metadata.content.substring(0, 15)}
                                        ...
                                    </a>
                                </div>
                                {#await getCommentOfPublication(mainPostPubId, 1, 'imagePub')}
                                    <div class="CenterRowFlex mobile__card__post">
                                        <div class="mobile__card__post__user-pic-loader">

                                        </div>
                                        <div class="mobile__card__post__info">
                                            <div class="CenterRowFlex mobile__card__post__info__head-loader">

                                            </div>
                                            <div class="mobile__card__post__info__body-loader">

                                            </div>
                                        </div>
                                    </div>
                                {:then comment}
                                    {#if comment?.data?.publications?.items[0]?.profile?.handle === undefined}
                                        <div class="CenterRowFlex mobile__card__post">
                                            No Top Post
                                        </div>
                                    {:else}
                                        <div class="CenterRowFlex mobile__card__post">
                                            <div class="mobile__card__post__user-pic">
                                                <img src={comment?.data?.publications?.items[0]?.profile?.picture?.original?.url}
                                                     alt="avatar">
                                            </div>
                                            <div class="mobile__card__post__info">
                                                <div class="CenterRowFlex mobile__card__post__info__head">
                                                    <div class="mobile__card__post__info__head__username">
                                                        {comment?.data?.publications?.items[0]?.profile?.handle.substring(0, 12)}
                                                        {comment?.data?.publications?.items[0]?.profile?.handle.length > 12 ? '...' : ''}
                                                    </div>
                                                    {#if comment?.data?.publications?.items[0]?.profile?.id === PUBLIC_APP_LENS_ID}
                                                        <Tooltip
                                                                content="This post was made by an anonymous user!"
                                                                position="top"
                                                                autoPosition
                                                                align="left"
                                                                theme="custom-tooltip"
                                                                maxWidth="150"
                                                                animation="slide">
                                            <span class="CenterRowFlex mobile__card__post__info__head__anon-comment">
                                              <Icon d={person} size="1.05em"/>
                                            </span>
                                                        </Tooltip>
                                                    {/if}
                                                    <div class="CenterRowFlex mobile__card__post__info__head__trend">
                                                        <div class="CenterRowFlex mobile__card__post__info__head__trend__icon">
                                                            <Icon d={trendingUp}/>
                                                        </div>
                                                        <div class="mobile__card__post__info__head__trend__count">
                                                            {comment?.data?.publications?.items[0]?.stats?.totalUpvotes === undefined ? 0 : comment?.data?.publications?.items[0]?.stats?.totalUpvotes}
                                                        </div>
                                                    </div>
                                                    <div class="mobile__card__post__info__head__time">
                                                        {getFormattedDate(comment?.data?.publications?.items[0]?.createdAt)}
                                                    </div>
                                                </div>
                                                <div class="mobile__card__post__info__body">
                                                    {@html DOMPurify.sanitize(comment?.data?.publications?.items[0]?.metadata?.content).substring(0, 70)}
                                                </div>
                                            </div>
                                        </div>
                                    {/if}
                                {:catch error}
                                    <div class="CenterRowFlex mobile__card__post">
                                        No Top Post
                                    </div>
                                {/await}
                            {/await}
                        </a>
                    {/each}
                </div>
                <div class="footer">
                    Couldn’t find what you were looking for? Maybe you can try a different keyword?
                </div>
            {/if}
        </section>
    {:else}
        <section>
            {#if foundedMainPostPubId.length !== 0}
                <div class="h2 heading">
                    This is what we found
                </div>
            {/if}
            {#if fetchingMainPostPubId}
                <div class="body">
                    <div class="card">
                        <div class="card__img-box__loader">
                        </div>
                        <div class="card__body">
                            <div class="card__body__info__loader"></div>
                            <div class="card__body__post__loader"></div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card__img-box__loader">
                        </div>
                        <div class="card__body">
                            <div class="card__body__info__loader"></div>
                            <div class="card__body__post__loader"></div>
                        </div>
                    </div>
                </div>
            {:else}
                <div class="body">
                    {#each foundedMainPostPubId as mainPostPubId}
                        <a href={"/posts/" + mainPostPubId}
                           class="card">
                            {#await getPublicationByPubId(mainPostPubId)}
                                <div class="card__img-box__loader">
                                </div>
                                <div class="card__body">
                                    <div class="card__body__info__loader"></div>
                                    <div class="card__body__post__loader"></div>
                                </div>
                            {:then mainPostPub}
                                {#await getImageURLUsingParentPubId(mainPostPub?.data?.publications?.items[0]?.id)}
                                    <div class="card__img-box__loader">
                                    </div>
                                {:then imageUrl}
                                    <div class="card__img-box">
                                        <div class="card__img-box__image"
                                             style="background-image: url({imageUrl})">
                                            <div class="CenterRowFlex card__img-box__image__posts-count">
                                                <Icon d={modeComment}/>
                                                {mainPostPub?.data?.publications?.items[0]?.stats?.totalAmountOfComments}
                                            </div>
                                        </div>
                                    </div>
                                {/await}
                                <div class="card__body">
                                    <div class="card__body__info">
                                        <div class="CenterRowFlex card__body__info__head">
                                            <div class="CenterRowFlex card__body__info__head__url-icon">
                                                <Icon d={redirect}/>&nbsp;
                                            </div>
                                            <a href={mainPostPub?.data?.publications?.items[0]?.metadata.content}
                                               target="_blank"
                                               class="card__body__info__head__url-val">
                                                {mainPostPub?.data?.publications?.items[0]?.metadata.content.substring(0, 30)}
                                                ...
                                            </a>
                                            <button class="card__body__info__head__more">
                                                <Icon d={moreVert}/>
                                            </button>
                                        </div>
                                        <div class="CenterRowFlex card__body__info__details">
                                            <div class="CenterRowFlex card__body__info__details__likes">
                                                <Icon d={thumbUp}/>&nbsp;
                                                {mainPostPub?.data?.publications?.items[0]?.stats?.totalUpvotes} Likes
                                            </div>
                                            <div class="dot"></div>
                                            <div class="CenterRowFlex card__body__info__details__added-by">
                                                <div class="card__body__info__details__added-by__label">
                                                    Added by:
                                                </div>
                                                <div class="card__body__info__details__added-by__handle">
                                                    naruto.lens
                                                </div>
                                            </div>
                                            <div class="dot"></div>
                                            <div class="card__body__info__details__time">
                                                {getFormattedDate(mainPostPub?.data?.publications?.items[0]?.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                    {#await getCommentOfPublication(mainPostPubId, 1)}
                                        <div class="CenterRowFlex card__body__post__loader"></div>
                                    {:then comment}
                                        <div class="CenterRowFlex card__body__post">
                                            <div class="card__body__post__pic">
                                                <img src={comment?.data?.publications?.items[0]?.profile?.picture?.original?.url}
                                                     alt="avatar">
                                            </div>
                                            <div class="card__body__post__info">
                                                <div class="CenterRowFlex card__body__post__info__head">
                                                    <div class="card__body__post__info__head__handle">
                                                        {comment?.data?.publications?.items[0]?.profile?.handle}
                                                    </div>
                                                    {#if comment?.data?.publications?.items[0]?.profile?.id === PUBLIC_APP_LENS_ID}
                                                        <Tooltip
                                                                content="This post was made by an anonymous user!"
                                                                position="top"
                                                                autoPosition
                                                                align="left"
                                                                theme="custom-tooltip"
                                                                maxWidth="150"
                                                                animation="slide">
                                            <span class="CenterRowFlex card__post__info__head__anon-comment">
                                              <Icon d={person} size="1.05em"/>
                                            </span>
                                                        </Tooltip>
                                                    {/if}
                                                    <div class="CenterRowFlex card__body__post__info__head__trend">
                                                        <div class="CenterRowFlex card__body__post__info__head__trend__icon">
                                                            <Icon d={trendingUp}/>
                                                        </div>
                                                        <div class="card__body__post__info__head__trend__count">
                                                            {comment?.data?.publications?.items[0]?.stats?.totalUpvotes === undefined ? 0 : comment?.data?.publications?.items[0]?.stats?.totalUpvotes}
                                                        </div>
                                                    </div>
                                                    <div class="dot"></div>
                                                    <div class="card__body__post__info__head__time">
                                                        {getFormattedDate(comment?.data?.publications?.items[0]?.createdAt)}
                                                    </div>
                                                </div>
                                                <div class="card__body__post__info__content">
                                                    {@html DOMPurify.sanitize(comment?.data?.publications?.items[0]?.metadata?.content).substring(0, 215)}
                                                </div>
                                            </div>
                                        </div>
                                    {/await}
                                </div>
                            {/await}
                        </a>
                    {/each}
                </div>
                <div class="footer">
                    Couldn’t find what you were looking for? Maybe you can try a different keyword?
                </div>
            {/if}
        </section>
    {/if}
</MediaQuery>

<!---------------------------------------------------------------->

<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .mobile__body {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    flex-direction: column;
  }

  .mobile__card {
    width: 100%;
    filter: drop-shadow(9.600000381469727px 22.80000114440918px 37.20000076293945px rgba(0, 0, 0, 0.26));
    font-size: var(--small-font-size);
    transition: all .4s ease-in-out;
    border-bottom: 1.5px solid #3f494e;
  }

  .mobile__card:hover {
    transform: scale(1.04);
  }

  .mobile__card__image-loader {
    width: 100%;
    height: 12.3rem;
    border-radius: 10.8px;
  }

  .mobile__card__image {
    width: 100%;
    height: 12.3rem;
    background-color: #000;
    overflow: hidden;
    padding-bottom: 50%; /* Adjust this value to control the aspect ratio */
    background-size: cover;
    border-radius: 10.8px;
    transition: background-position 1s ease;
  }

  .mobile__card__image:hover,
  .mobile__card__image:active {
    animation: scrollBackground 5s linear infinite;
  }

  @keyframes scrollBackground {
    0% {
      background-position: top center;
    }
    100% {
      background-position: bottom center;
    }
  }

  .mobile__card__info {
    width: 100%;
    padding: 0.5rem 0;
    gap: 0.2rem;
  }

  .mobile__card__info__loader {
    width: 100%;
    height: 2rem;
    border-radius: 10.8px;
    margin-top: 1rem;
  }

  .mobile__card__info__reaction {
    padding: 0.5rem;
    background: #132026;
    gap: 0.5rem;
    border-radius: 6.8px;
    opacity: 70%;
  }

  .mobile__card__info__reaction__val {
    gap: 0.4rem;
  }

  .mobile__card__info__reaction__vertical-line {
    border-left: 2px solid #ffffff45;
    height: 15px;
  }

  .mobile__card__info__posts-count {
    background: #132026;
    padding: 0.36rem 0.5rem;
    gap: 0.5rem;
    border-radius: 5.8px;
    opacity: 85%;
  }

  .mobile__card__info__link {
    margin-left: auto;
    gap: 0.3rem;
  }

  .mobile__card__post {
    border-radius: 0 0 10.8px 10.8px;
    gap: 0.8rem;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .mobile__card__post__user-pic-loader {
    height: 4rem;
    width: 3.4rem;
    margin-bottom: auto;
    border-radius: 50%;
    margin-top: 1rem;
  }

  .mobile__card__post__user-pic {
    margin-bottom: auto;
  }

  .mobile__card__post__user-pic img {
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    border: 2px solid #32F9FF;
  }

  .mobile__card__post__info {
    width: 100%;
  }

  .mobile__card__post__info__head-loader {
    width: 70%;
    justify-content: flex-start;
    margin-bottom: 0.8rem;
    height: 0.7rem;
    border-radius: 5px;
    margin-top: 1rem;
  }

  .mobile__card__post__info__head {
    gap: 0.5rem;
    justify-content: flex-start;
    margin-bottom: 0.8rem;
  }

  .mobile__card__post__info__head__username {
    padding: 0.14rem 0.36rem;
    background: #122025;
    border-radius: 5px;
    color: #32F9FF;
  }

  .mobile__card__post__info__head__anon-comment {
    background: #132e2e;
    border-radius: 50%;
    padding: 0.25rem;
  }

  .mobile__card__post__info__head__trend {
    background: #113232;
    border-radius: 14px;
    font-size: var(--semi-small-font-size);
    opacity: 90%;
  }

  .mobile__card__post__info__head__trend__icon {
    padding: 0.1rem 0.2rem;
    border-radius: 50%;
    background: #0e2828;
  }

  .mobile__card__post__info__head__trend__count {
    padding: 0.07rem 0.26rem;
  }

  .mobile__card__post__info__head__time {
    font-size: var(--semi-small-font-size);
    color: var(--text-accent);
    margin-left: auto;
  }

  .mobile__card__post__info__body-loader {
    height: 3.7rem;
    border-radius: 5px;
  }

  .mobile__card__post__info__body {
    overflow-wrap: anywhere;
    width: 14.8rem;
  }

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }

  .mobile__card__info__loader,
  .mobile__card__post__user-pic-loader,
  .mobile__card__post__info__head-loader,
  .mobile__card__post__info__body-loader,
  .mobile__card__image-loader {
    background: linear-gradient(110deg, #0d9397 8%, #63bdc8 18%, #0d9397 33%);
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
  }


  .dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #fff;
  }

  .card {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    border-bottom: 1.5px solid #3f494e;
    padding: 2rem 0;
  }

  .card__img-box {
    width: 100%;
    max-width: 26rem;
  }

  .card__img-box__loader {
    width: 33rem;
    height: 15rem;
    border-radius: 10px;
  }

  .card__img-box__image {
    width: 100%;
    height: 15.5rem;
    background-color: #000;
    overflow: hidden;
    padding-bottom: 50%; /* Adjust this value to control the aspect ratio */
    background-size: cover;
    border-radius: 10.8px;
    transition: background-position 1s ease;
  }

  .card__img-box__image:hover {
    animation: scrollBackground 5s linear infinite;
  }

  @keyframes scrollBackground {
    0% {
      background-position: top center;
    }
    100% {
      background-position: bottom center;
    }
  }

  .card__img-box__image__posts-count {
    background: #0E3439;
    padding: 0.5rem 0.7rem;
    gap: 0.5rem;
    border-radius: 5.8px;
    opacity: 85%;
    width: 4.5rem;
    margin: 0.5rem;
  }

  .card__body {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 15.5rem;
    padding: 1rem;
    width: 100%;
    min-width: 33rem;
    max-width: 85rem;
  }

  .card__body__info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .card__body__info__loader {
    width: 100%;
    height: 5rem;
    border-radius: 10px;
  }

  .card__body__info__head {
    justify-content: flex-start;
  }

  .card__body__info__head__url-val {
    font-weight: var(--medium-font-weight);
    font-size: 17px;
  }

  .card__body__info__head__more {
    margin-left: auto;
  }

  .card__body__info__details {
    gap: 0.5rem;
    justify-content: flex-start;
  }

  .card__body__info__details__likes {
    background: #0b151a;
    padding: 0.5rem;
    border-radius: 5px;
  }

  .card__body__info__details__added-by__handle {
    background: #0b151a;
    padding: 0.2rem 0.3rem;
    border-radius: 5px;
    color: var(--primary);
  }

  .card__body__info__details__time {
    font-size: var(--small-font-size);
    color: var(--text-accent);
  }

  .card__body__post {
    gap: 1rem;
    justify-content: flex-start;
  }

  .card__body__post__loader {
    width: 100%;
    height: 10rem;
    border-radius: 10px;
  }

  .card__body__post__pic {
    margin-bottom: auto;
  }

  .card__body__post__pic img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid #32F9FF;
  }

  .card__body__post__info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .card__body__post__info__head {
    gap: 1rem;
    justify-content: flex-start;
  }

  .card__body__post__info__content {
    overflow-wrap: anywhere;
    max-width: 50rem;
  }

  .card__body__info__details__added-by {
    gap: 0.3rem;
  }

  .card__body__info__details__added-by__label {
    font-size: var(--small-font-size);
    color: var(--text-accent);
  }

  .card__body__post__info__head__handle {
    background: #0b151a;
    padding: 0.2rem 0.3rem;
    border-radius: 5px;
    color: var(--primary);
  }

  .card__post__info__head__anon-comment {
    background: #132e2e;
    border-radius: 50%;
    padding: 0.25rem;
  }

  .card__body__post__info__head__trend {
    background: #113232;
    border-radius: 14px;
    font-size: var(--small-font-size);
    opacity: 90%;
  }

  .card__body__post__info__head__trend__icon {
    padding: 0.15rem 0.3rem;
    border-radius: 50%;
    background: #0e2828;
  }

  .card__body__post__info__head__trend__count {
    padding: 0.15rem 0.5rem;
  }

  .card__body__post__info__head__time {
    font-size: var(--small-font-size);
    color: var(--text-accent);
  }

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }

  .card__img-box__loader,
  .card__body__info__loader,
  .card__body__post__loader {
    background: linear-gradient(110deg, #0d9397 8%, #63bdc8 18%, #0d9397 33%);
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
  }
</style>
<!----------------------------------------------------------------->
