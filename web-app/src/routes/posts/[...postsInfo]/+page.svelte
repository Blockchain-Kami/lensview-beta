<script>
  import LinkPreview from "../../../components/posts-page/LinkPreview.svelte";
  import UserPost from "../../../components/posts-page/UserPost.svelte";
  import Posts from "../../../components/posts-page/Posts.svelte";

  export let data;

</script>


<!------------------------------ HTML ------------------------------>
<section class="CenterRowFlex">
  <div class="CenterColumnFlex link-preview">
    <LinkPreview userEnteredURL={data["URL"]} />
  </div>
  <div class="CenterColumnFlex posts">
    <UserPost hashedURL={data["hashedURL"]} pubId={data["pubId"]} />
    <Posts hashedURL={data["hashedURL"]} postsList={data["items"]} />
  </div>
</section>
<!-------------------------------------------------------------------->


<!------------------------------ Style ------------------------------>
<style>
    section{
        width: 100%;
        height: 100vh;
    }

    .link-preview{
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
</style>

<!-------------------------------------------------------------------->
