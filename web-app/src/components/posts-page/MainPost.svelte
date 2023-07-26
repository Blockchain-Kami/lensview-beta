<script lang="ts">

    import Icon from "$lib/Icon.svelte";
    import {modeComment, moreVert, redirect, thumbDownAlt, thumbUpAlt} from "../../utils/frontend/appIcon";
    import RelatedPost from "./RelatedPost.svelte";
</script>


<!----------------------------- HTML ----------------------------->

<section>
    <img src="https://ipfs.io/ipfs/QmSr4BvCdk4V2Tiogzdtw7FY2HdRDktyHzfb81vfh1tM3f/0" alt="">
    <div class="CenterColumnFlex main-post">
        <div class="CenterColumnFlex main-post__content">
            <div class="CenterRowFlex main-post__content__top">
                <div class="CenterRowFlex main-post__content__top__redirect">
                    <Icon d={redirect}/>
                </div>
                <div class="main-post__content__top__url">
                    https://ipfs.io/ipfs/QmSr4Bv
                </div>
                <div class="main-post__content__top__time">
                    2 hours ago
                </div>
                <div class="CenterRowFlex main-post__content__top__more">
                    <Icon d={moreVert}/>
                </div>
            </div>
            <div class="CenterRowFlex main-post__content__bottom">
                <div class="CenterRowFlex main-post__content__bottom__reaction">
                    <div class="CenterRowFlex main-post__content__bottom__reaction__val">
                        <Icon d={thumbUpAlt}/>
                        20
                    </div>
                    <div class="main-post__content__bottom__reaction__vertical-line"></div>
                    <div class="CenterRowFlex main-post__content__bottom__reaction__val">
                        <Icon d={thumbDownAlt}/>
                        5
                    </div>
                </div>
                <div class="CenterRowFlex main-post__content__bottom__posts-count">
                    <Icon d={modeComment}/>
                    10 Posts
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
        </div>
    </div>
    <div class="related-posts-head">
        Related Posts
    </div>
    <div class="related-posts-body">
        <RelatedPost/>
    </div>
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
    font-size: var(--semi-large-font-size);
    position: sticky;
    top: 10rem;
    font-family: var(--special-font);
    background: #0d171d;
    padding: 1.5rem;
    z-index: 10;
  }
</style>
<!----------------------------------------------------------------->
