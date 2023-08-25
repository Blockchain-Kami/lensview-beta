<script lang="ts">
  import MainPost from "../../../components/posts-page/MainPost.svelte";
  import PostAPublication from "../../../components/posts-page/PostAPublication.svelte";
  import CommentsOfAPublication from "../../../components/posts-page/CommentsOfAPublication.svelte";
  import Publication from "../../../components/posts-page/Publication.svelte";
  import { page } from "$app/stores";
  import MediaQuery from "$lib/MediaQuery.svelte";
  import { MetaTags } from "svelte-meta-tags";

  let postPubId = $page.data.postPubId;

  $: if (postPubId !== $page.data.postPubId) {
    postPubId = $page.data.postPubId;
  }

</script>


<!----------------------------- HTML ----------------------------->


<MediaQuery query="(max-width: 1024px)" let:matches>
  {#if matches}
    <main class="tablet">
      <MainPost/>
      {#if postPubId !== undefined }
        <Publication/>
      {/if}
      <PostAPublication/>
      <CommentsOfAPublication/>
    </main>
  {:else}
    <main>
      <div class="left">
        <MainPost/>
      </div>
      <div class="right">
        {#if postPubId !== undefined }
          <Publication/>
        {/if}
        <PostAPublication/>
        <CommentsOfAPublication/>
      </div>
    </main>
  {/if}
</MediaQuery>

<MetaTags
  title="Using More of Config"
  titleTemplate="%s | Svelte Meta Tags"
  description="This example uses more of the available config options."
  canonical="https://www.canonical.ie/"
  openGraph={{
    url: 'https://www.url.ie/a',
    title: 'Open Graph Title',
    description: 'Open Graph Description',
    images: [
      {
        url: 'https://www.example.ie/og-image-01.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt'
      },
      {
        url: 'https://www.example.ie/og-image-02.jpg',
        width: 900,
        height: 800,
        alt: 'Og Image Alt Second'
      },
      { url: 'https://www.example.ie/og-image-03.jpg' },
      { url: 'https://www.example.ie/og-image-04.jpg' }
    ],
    siteName: 'SiteName'
  }}
  twitter={{
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
    title: 'Using More of Config',
    description: 'This example uses more of the available config options.',
    image: 'https://www.example.ie/twitter-image.jpg',
    imageAlt: 'Twitter image alt'
  }}
  facebook={{
    appId: '1234567890'
  }}
/>

<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  .tablet {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: #0d171d;
    padding: 2rem;
    margin-top: 4rem;
  }

  main {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    background: #0d171d;
  }

  .left {
    display: flex;
    flex-direction: column;
    width: 45%;
    height: 100dvh;
    overflow: auto;
    padding: 4rem 2rem 0 2rem;
  }

  .right {
    display: flex;
    flex-direction: column;
    width: 55%;
    height: 100dvh;
    overflow: auto;
    padding: 6rem 2rem 2rem 2rem;
    gap: 2rem;
  }
</style>
<!----------------------------------------------------------------->
