<script lang="ts">
  import PostsList from "../../components/popup/posts/PostsList.svelte";
  import PostsListLoader from "../../components/popup/posts/PostsListLoader.svelte";
  import getPublicationIdAppService from "../../services/app/get-publication-id.app.service";
  import NoPost from "../../components/popup/posts/NoPost.svelte";
</script>

<!---------------------------- HTML -------------------------------->

{#await getPublicationIdAppService()}
  <PostsListLoader />
{:then pubId}
  {#if pubId}
    <PostsList commentPubId={pubId} />
  {:else}
    <NoPost />
  {/if}
{/await}
