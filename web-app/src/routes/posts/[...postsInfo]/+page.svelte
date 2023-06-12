<script lang="ts">
  import LinkPreview from "../../../components/posts-page/LinkPreview.svelte";
  import PostAPublication from "../../../components/posts-page/PostAPublication.svelte";
  import CommentsOfAPublication from "../../../components/posts-page/CommentsOfAPublication.svelte";
  import Publication from "../../../components/posts-page/Publication.svelte";

  export let data;

</script>


<!------------------------------ HTML ------------------------------>
<section class="CenterRowFlex">
  {#if data}
    <div class="CenterColumnFlex link-preview">
      <LinkPreview mainPostPub={data["mainPostPub"]} url={data["URL"]} />
    </div>
    <div class="CenterColumnFlex posts">
      {#if data["openCommentSection"]}
        <Publication hashedURL={data["hashedURL"]} pub={data["pub"]} />
      {/if}
      <PostAPublication hashedURL={data["hashedURL"]} pubId={data["pubId"]}
                        openCommentSection={data["openCommentSection"]} />
      <CommentsOfAPublication hashedURL={data["hashedURL"]} commentsList={data["items"]} />
    </div>
  {:else}
    <h1>404</h1>
  {/if}

</section>
<!-------------------------------------------------------------------->


<!------------------------------ Style ------------------------------>
<style lang="scss">
  section {
    width: 100%;
    height: 100vh;
  }

  .link-preview {
    width: 45%;
    height: 100vh;
    background-color: aliceblue;
  }

  .posts {
    width: 55%;
    height: 100vh;
    background: azure;
    gap: 1rem;
  }

  @media only screen and (max-width: 700px) {
    section {
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 4rem;
        }

        .posts {
            width: 100%;
        }

        .link-preview {
            width: 100%;
        }
    }
</style>

<!-------------------------------------------------------------------->
