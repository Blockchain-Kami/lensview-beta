<script lang="ts">

    import Icon from "$lib/Icon.svelte";
    import {modeComment, moreVert, redirect, thumbUpAlt, trendingUp} from "../../utils/frontend/appIcon";
    import {page} from "$app/stores";
    import {getPublicationByPubId} from "../../utils/frontend/getPublicationByPubId";
    import getImageURLFromURLHash from "../../utils/frontend/getImageURLFromURLHash";
    import getFormattedDate from "../../utils/frontend/getFormattedDate";
    import {getCommentOfPublication} from "../../utils/frontend/getCommentOfPublication";

    const foundedMainPostPubId = $page.data.foundedMainPostPubId;
</script>


<!----------------------------- HTML ----------------------------->
<section>
    <div class="h2 heading">
        This is what we found
    </div>
    <div class="body">
        {#each foundedMainPostPubId as mainPostPubId}
            <div class="card">
                {#await getPublicationByPubId(mainPostPubId)}
                    <div class="card__img-box__loader">
                    </div>
                    <div class="card__body">
                        <div class="card__body__info__loader"></div>
                        <div class="card__body__post__loader"></div>
                    </div>
                {:then mainPostPub}
                    {#await getImageURLFromURLHash(mainPostPub?.data?.publications?.items[0]?.metadata?.tags[0])}
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
                                <a href={mainPostPub?.data?.publications?.items[0]?.metadata.content} target="_blank"
                                   class="card__body__info__head__url-val">
                                    {mainPostPub?.data?.publications?.items[0]?.metadata.content.substring(0, 60)}...
                                </a>
                                <button class="card__body__info__head__more">
                                    <Icon d={moreVert}/>
                                </button>
                            </div>
                            <div class="CenterRowFlex card__body__info__details">
                                <div class="CenterRowFlex card__body__info__details__likes">
                                    <Icon d={thumbUpAlt}/>&nbsp;
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
                                        {comment?.data?.publications?.items[0]?.metadata?.content.substring(0, 310)}
                                    </div>
                                </div>
                            </div>
                        {/await}
                    </div>
                {/await}
            </div>
        {/each}
    </div>
    <div class="footer">
        Couldn’t find what you were looking for? Maybe you can try a different keyword?
    </div>
</section>

<!---------------------------------------------------------------->

<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  .dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #fff;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .card {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    border-bottom: 1.5px solid #3f494e;
    padding: 2rem 0;
  }

  .card__img-box {
    width: 33rem;
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
