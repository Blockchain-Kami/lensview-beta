<script lang="ts">
import getPictureURLUtil from "../../utils/get-picture-URL.util";
import {
    copy, cross, login,
    modeComment,
    moreVert,
    person, redirect,
    share,
    thumbDown,
    thumbDownAlt,
    thumbUp,
    thumbUpAlt
} from "../../utils/app-icon.util";
import {AppReactionType} from "../../config/app-constants.config";
import getFormattedDateHelperUtil from "../../utils/helper/get-formatted-date.helper.util";
import Autolinker from "autolinker";
import DOMPurify from "dompurify";
import getLinkPreviewHtmlHelperUtil from "../../utils/helper/get-link-preview-html.helper.util";
import Icon from "$lib/Icon.svelte";
import {page} from "$app/stores";
import {isLoggedInUserStore} from "../../stores/user/is-logged-in.user.store";
import addReactionLensService from "../../services/lens/add-reaction.lens.service";
import removeReactionLensService from "../../services/lens/remove-reaction.lens.service";
import getReactionBasedOnLoginStatusHelperUtil from "../../utils/helper/get-reaction-based-on-login-status.helper.util";
import type {ReactionDetailsModel} from "../../models/reactionDetails.model";

let isPostMoreOpen = false;
let reactionDetails: ReactionDetailsModel = {};


const sharePost = (event: Event) => {
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

</script>

<!----------------------------- HTML ----------------------------->

<section>
<!--    <div class="card">-->
<!--        <div class="card__left card__left-loader">-->
<!--        </div>-->
<!--        <div class="card__right card__right-loader">-->
<!--        </div>-->
<!--    </div>-->

    <div class="card">
        <div class="card__left">
            <div class="card__left__image" style="background-image: url('https://ik.imagekit.io/lens/media-snapshot/e7aa952ad7af711681d8ab8527b2960a7bca2cc44064bd6cb9317256c5b92f65.jpg')"></div>
        </div>
        <div class="card__right">
            <div class="card__right__content">
                <div class="card__right__content__pic">
                    <img
                            src="https://ik.imagekit.io/lens/media-snapshot/9b8d775698eb53717be5471eeb20d47e0f334e730a7962d39457e841da4e4951.jpg"
                            alt="avatar"
                    />
                </div>
                <div class="card__right__content__body">
                    <div class="CenterRowFlex card__right__content__body__top">
                        <div class="CenterRowFlex card__right__content__body__top__left">
                            <!--{#if card__right__contents.items[0]?.by?.metadata?.displayName !== undefined}-->
                                <div class="card__right__content__body__top__left__name">
                                    Nader Dabit
                                </div>
                                <div class="card__right__content__body__top__left__dot" />
                            <!--{/if}-->
                            <div class="card__right__content__body__top__left__handle">
                                nader
                            </div>
                            <div class="card__right__content__body__top__left__dot" />
                            <div class="card__right__content__body__top__left__date">
                                8 months ago
                            </div>
                        </div>
                        <div class="CenterRowFlex card__right__content__body__top__right">
                            <div class="card__right__content__body__top__right__more">
                                <button>
                                    <Icon d={moreVert} size="1.65em" />
                                </button>
                                {#if isPostMoreOpen}
                                    <div class="CenterColumnFlex card__right__content__body__more">
                                        <div class="CenterRowFlex card__right__content__body__more__share">
                                            <div class="CenterRowFlex card__right__content__body__more__share__icon">
                                                <Icon d={share} size="1.2em" />
                                            </div>
                                            Share
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>

                    <div class="card__right__content__body__content">
                        We firmly believe that user experience must come first for decentralized social to succeed. Momoka is a natural result of this belief, joining our other innovations in abstracting away blockchain complexities and making Lens feel familiar and easy to use.
                        We firmly believe that user experience must come first for decentralized social to succeed. Momoka is a natural result of this belief, joining our other innovations in abstracting away blockchain complexities and making Lens feel familiar and easy to use.
                        We firmly believe that user experience must come first for decentralized social to succeed. Momoka is a natural result of this belief, joining our other innovations in abstracting away blockchain complexities and making Lens feel familiar and easy to use.
                        <!--eslint-disable-next-line svelte/no-at-html-tags -->
              <!--          {@html Autolinker.link(-->
              <!--              DOMPurify.sanitize(card__right__contents.items[0]?.metadata?.content),-->
              <!--              {-->
              <!--                  className: "links"-->
              <!--              }-->
              <!--          )}-->
              <!--          <blockquote-->
              <!--                  class="twitter-tweet"-->
              <!--                  data-conversation="none"-->
              <!--                  data-theme="dark"-->
              <!--          >-->
              <!--              <a-->
              <!--                      href={`https://twitter.com/username/status/${getLinkPreviewHtmlHelperUtil(-->
              <!--  DOMPurify.sanitize(card__right__contents.items[0]?.metadata?.content)-->
              <!--)}`}>&nbsp;</a-->
              <!--              >-->
              <!--          </blockquote>-->
              <!--          <script-->
              <!--                  async-->
              <!--                  src="https://platform.twitter.com/widgets.js"-->
              <!--                  charset="utf-8"-->
              <!--          ></script>-->
                    </div>
                    ...
                </div>
            </div>
            <div class="CenterRowFlex card__footer">
                <div class="CenterRowFlex card__footer__left">
                    <div
                            class="CenterRowFlex card__footer__left__reaction"
                    >
                        <button
                                class="CenterRowFlex card__footer__left__reaction__val"
                        >
                            <Icon d={thumbUp} />
                            1
                        </button>

                        <div
                                class="card__footer__left__reaction__vertical-line"
                        />
                        <button
                                class="CenterRowFlex card__footer__left__reaction__val"
                        >
                            <Icon d={thumbDown} />
                            1
                        </button>

                    </div>
                    <div
                            class="CenterRowFlex card__footer__left__posts-count"
                    >
                        <Icon d={modeComment} />
                        5
                    </div>
                </div>
                <div class="card__footer__right">
                    <div class="CenterRowFlex card__footer__right__url">
                        <Icon d={redirect} />
                        https://www.flipkart.com
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!----------------------------------------------------------------->

<!---------------------------------------------------------------->

<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  section{
    display: flex;
    flex-direction: column;
    background-color: var(--bg-solid-1);
    backdrop-filter: blur(10px);
    padding: 1rem 1.5rem;
    border-radius: 10px;
    margin: 2rem;
  }

  .card {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    border-bottom: 1.5px solid #3f494e;
    padding: 1.5rem 0;
  }

  .card__left {
    width: 30%;
  }

  .card__left-loader {
    height: 15.5rem;
    border-radius: 10px;
  }

  .card__left__image {
    width: 100%;
    height: 15.5rem;
    background-color: #000;
    overflow: hidden;
    padding-bottom: 50%; /* Adjust this value to control the aspect ratio */
    background-size: cover;
    border-radius: 10.8px;
    transition: background-position 1s ease;
  }

  .card__left__image:hover {
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

  .card__right{
    width: 70%;
  }

  .card__right-loader{
    height: 15.5rem;
    border-radius: 10px;
  }

  .card__right__content {
    display: flex;
    flex-direction: row;
    padding: 1rem;
    gap: 1rem;
    background: #1e4748;
    border-radius: 10px 10px 0 0;
    width: 100%;
    height: 11rem;
  }

  .card__right__content__pic {
    margin-bottom: auto;
  }

  .card__right__content__pic img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid #32f9ff;
  }

  .card__right__content__body {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }

  .card__right__content__body__top {
    justify-content: space-between;
  }

  .card__right__content__body__top__left {
    gap: 0.6rem;
  }

  .card__right__content__body__top__left__dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #fff;
  }

  .card__right__content__body__top__left__handle {
    padding: 0.2rem 0.5rem;
    background: var(--bg-solid-2);
    border-radius: 5px;
    color: var(--primary);
  }

  .card__right__content__body__top__right {
    gap: 0.5rem;
  }

  .card__right__content__body__top__right__share {
    border-radius: 50%;
    background: var(--bg-solid-2);
    padding: 0.5rem;
  }

  .card__right__content__body__top__right__reaction {
    background: var(--bg-solid-2);
    border-radius: 6.8px;
    opacity: 70%;
  }

  .card__right__content__body__top__right__reaction__val {
    padding: 0.5rem 0.7rem;
    gap: 0.4rem;
  }

  .card__right__content__body__top__right__reaction__vertical-line {
    border-left: 2px solid #ffffff45;
    height: 21px;
  }

  .card__right__content__body__top__right__posts-count {
    background: var(--bg-solid-2);
    padding: 0.5rem 0.7rem;
    gap: 0.5rem;
    border-radius: 5.8px;
    opacity: 85%;
  }

  .card__right__content__body__top__right__more {
    position: relative;
  }

  .card__right__content__body__more {
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

  .card__right__content__body__more__share {
    gap: 0.5rem;
  }

  .card__right__content__body__more__share__icon {
    background: #2c4042;
    padding: 0.5rem;
    border-radius: 50%;
  }

  .card__right__content__body__time {
    font-size: var(--small-font-size);
    color: var(--text-accent);
    margin-top: -0.2rem;
    margin-bottom: 0.5rem;
  }

  .card__right__content__body__content {
    overflow-wrap: break-word;
    overflow: hidden;
  }

  .card__right__content__body__content__loader {
    width: 100%;
    height: 5rem;
    border-radius: 10px;
    margin-top: 1rem;
  }

  .card__footer{
    padding: 1rem;
    background: var(--bg-solid-2);
    border-radius: 0 0 10px 10px;
    justify-content: space-between;
  }

  .card__footer__left {
    gap: 0.5rem;
  }

  .card__footer__left__loader {
    width: 15rem;
    height: 2rem;
    border-radius: 5px;
  }

  .card__footer__left__reaction {
    background: var(--bg-solid-3);
    border-radius: 6.8px;
    opacity: 70%;
  }

  .card__footer__left__reaction__val {
    padding: 0.5rem 0.7rem;
    gap: 0.4rem;
  }

  .card__footer__left__reaction__vertical-line {
    border-left: 2px solid #ffffff45;
    height: 21px;
  }

  .card__footer__left__posts-count {
    background: var(--bg-solid-3);
    padding: 0.5rem 0.7rem;
    gap: 0.5rem;
    border-radius: 5.8px;
    opacity: 85%;
  }

  .card__footer__right__url{
    gap: 0.5rem;
  }

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }

  .card__left-loader,
  .card__right-loader {
    background: linear-gradient(110deg, #0d9397 8%, #63bdc8 18%, #0d9397 33%);
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
  }

  @media only screen and (max-width: 1024px){
    section{
      background-color: transparent;
      padding: 0;
      margin: 2rem;
    }

    .card {
      flex-direction: column;
      gap: 1rem;
      border-bottom: 1.5px solid #3f494e;
      padding: 1.5rem 0;
    }

    .card__left{
      width: 100%;
    }

    .card__left-loader{
      height: 20rem;
    }

    .card__left__image{
      height: 20rem;
    }

    .card__right{
      width: 100%;
    }
  }
</style>
