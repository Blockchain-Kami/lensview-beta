<script lang="ts">
  import Icon from "../../../lib/Icon.svelte";
  import { feather, thumbUpAlt } from "../../../utils/app-icon.util";
  import getLinkPublicationLensService from "../../../services/lens/get-link-publication.lens.service";
  import StatsLoader from "./StatsLoader.svelte";
  const { VITE_DOMAIN_NAME } = import.meta.env;

  export let pubId;

  let promiseOfGetMainPost = getLinkPublicationLensService(pubId);

  const redirectToPost = () => {
    window.open(`https://${VITE_DOMAIN_NAME}/posts/${pubId}`, "_blank");
  };
</script>

<!----------------------------- HTML ----------------------------->

{#await promiseOfGetMainPost}
  <StatsLoader />
{:then mainPostPub}
  <section class="stats">
    <ul class="stats__list">
      <li class="stats__list__item">
        <div class="CenterRowFlex stats__list__item__icon">
          <Icon d={thumbUpAlt} size="2em" fill="black" />
        </div>
        <p class="stats__list__item__count">{mainPostPub?.stats?.upvotes}</p>
        <p class="stats__list__item__text">Likes</p>
      </li>
      <li class="stats__list__item">
        <div class="CenterRowFlex stats__list__item__icon">
          <Icon d={feather} size="2em" fill="black" />
        </div>
        <p class="stats__list__item__count">{mainPostPub?.stats?.comments}</p>
        <p class="stats__list__item__text">Posts</p>
      </li>
    </ul>
    <button on:click={redirectToPost}> Check out this on LensView </button>
  </section>
{/await}

<!------------------------------- STYLE ----------------------------->
<style lang="scss">
  .stats {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.3rem;
    border-radius: 10px;
    background: var(--bg-solid-5);
    margin: 1rem;
  }

  .stats__list {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: space-evenly;
  }

  .stats__list__item {
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
    align-items: center;
  }

  .stats__list__item__icon {
    padding: 0.6rem 0.7rem;
    border-radius: 50%;
    background: var(--primary);
  }

  .stats__list__item__count {
    font-size: var(--medium-font-size);
    margin-left: 0.5rem;
  }

  .stats__list__item__text {
    font-size: var(--small-font-size);
    color: var(--text-accent);
    margin-top: 0.4rem;
  }

  button {
    padding: 0.7em 1.2em;
    font-weight: var(--semi-medium-font-weight);
    border: 1px solid var(--primary);
    border-radius: 5px;
    display: flex;
    justify-content: center;
  }
</style>
