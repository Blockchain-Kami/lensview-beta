<script lang="ts">
  import MainPost from "../../../components/posts-page/MainPost.svelte";
  import PostAPublication from "../../../components/posts-page/PostAPublication.svelte";
</script>


<!----------------------------- HTML ----------------------------->
<main>
  <div class="left">
    <MainPost/>
  </div>
  <div class="right">
    <PostAPublication/>
    <!--    <CommentsOfAPublication/>-->
  </div>
</main>

<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  main {
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }

  .left {
    display: flex;
    flex-direction: column;
    width: 45%;
    height: 100dvh;
  }

  .right {
    display: flex;
    flex-direction: column;
    width: 55%;
    height: 100dvh;
  }
</style>
<!----------------------------------------------------------------->


<!--<script lang="ts">-->
<!--  import LinkPreview from "../../../components/posts-page/LinkPreview.svelte";-->
<!--  import PostAPublication from "../../../components/posts-page/PostAPublication.svelte";-->
<!--  import CommentsOfAPublication from "../../../components/posts-page/CommentsOfAPublication.svelte";-->
<!--  import Publication from "../../../components/posts-page/Publication.svelte";-->
<!--  import MainPost from "../../../components/posts-page/MainPost.svelte";-->

<!--  export let data;-->

<!--</script>-->


<!--&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; HTML &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--<section class="CenterRowFlex">-->
<!--  {#if data}-->
<!--    <div class="CenterColumnFlex link-preview">-->
<!--      <MainPost/>-->
<!--&lt;!&ndash;      <LinkPreview mainPostPub={data["mainPostPub"]} url={data["URL"]} />&ndash;&gt;-->
<!--    </div>-->
<!--    <div class="CenterColumnFlex posts">-->
<!--      {#if data["openCommentSection"]}-->
<!--        <Publication hashedURL={data["hashedURL"]} pub={data["pub"]} />-->
<!--      {/if}-->
<!--      <PostAPublication hashedURL={data["hashedURL"]} pubId={data["pubId"]}-->
<!--                        openCommentSection={data["openCommentSection"]} />-->
<!--      <CommentsOfAPublication hashedURL={data["hashedURL"]} commentsList={data["items"]} />-->
<!--    </div>-->
<!--  {:else}-->
<!--    <h1>404</h1>-->
<!--  {/if}-->

<!--</section>-->
<!--&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->


<!--&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; Style &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--<style lang="scss">-->
<!--  section {-->
<!--    width: 100%;-->
<!--    height: 100vh;-->
<!--  }-->

<!--  .link-preview {-->
<!--    width: 45%;-->
<!--    height: 100vh;-->
<!--    //background-color: aliceblue;-->
<!--    justify-content: flex-end;-->
<!--  }-->

<!--  .posts {-->
<!--    width: 55%;-->
<!--    height: 100vh;-->
<!--    //background: azure;-->
<!--    gap: 1rem;-->
<!--  }-->

<!--  @media only screen and (max-width: 700px) {-->
<!--    section {-->
<!--            flex-direction: column;-->
<!--            justify-content: flex-start;-->
<!--            padding-top: 4rem;-->
<!--        }-->

<!--        .posts {-->
<!--            width: 100%;-->
<!--        }-->

<!--        .link-preview {-->
<!--            width: 100%;-->
<!--        }-->
<!--    }-->
<!--</style>-->

<!--&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
