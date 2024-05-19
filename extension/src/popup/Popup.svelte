<script lang="ts">
  import { onMount } from "svelte";
  import getChallengeInfoLensService from "../services/lens/get-challenge-info.lens.service";
  import searchPublicationAppService from "../services/app/search-publication.app.service";
  import Icon from "../lib/Icon.svelte";
  import { feather, notificationNone } from "../utils/app-icon.util";
  import { NavItems } from "../config/app-constants.config";
  import { tooltip } from "@svelte-plugins/tooltips";
  import Posts from "./posts/Posts.svelte";
  import Notifications from "./notifications/Notifications.svelte";

  let activeItem = NavItems.post;

  const handleItemClick = (item: NavItems) => {
    activeItem = item;
  };

  onMount(() => {
    test();

    testlensviewAPI();
  });

  const test = async () => {
    const challenge = await getChallengeInfoLensService(
      "0xa03dbDA93D960BBDa97B9a2F74729de186C22638",
      "0x018776"
    );
    console.log("challenge: ", challenge);
  };

  const testlensviewAPI = async () => {
    const resp = await searchPublicationAppService("https://revoke.cash/");
    console.log("resp : ", resp);
  };
</script>

<!----------------------------- HTML ----------------------------->

<main class="CenterColumnFlex">
  <nav aria-label="Main Navigation">
    <ul>
      <li>
        <button
          aria-label="Posts"
          aria-current={activeItem === NavItems.post ? "page" : undefined}
          class:active={activeItem === NavItems.post}
          on:click={() => handleItemClick(NavItems.post)}
        >
          <Icon
            d={feather}
            fill={activeItem === NavItems.post
              ? "var(--primary)"
              : "var(--text-accent)"}
            size="2.5em"
          />
        </button>
      </li>
      <li
        use:tooltip={{
          content: "Coming Soon",
          position: "right",
          autoPosition: true,
          align: "center",
          animation: "slide",
          theme: "custom-tooltip"
        }}
      >
        <button
          aria-label="Notifications"
          aria-current={activeItem === NavItems.notification
            ? "page"
            : undefined}
          class:active={activeItem === NavItems.notification}
          on:click={() => handleItemClick(NavItems.notification)}
          disabled
        >
          <Icon
            d={notificationNone}
            fill={activeItem === NavItems.notification
              ? "var(--primary)"
              : "var(--text-accent)"}
            size="2.5em"
          />
        </button>
      </li>
    </ul>
  </nav>

  <section>
    {#if activeItem === NavItems.post}
      <Posts />
    {/if}
    {#if activeItem === NavItems.notification}
      <Notifications />
    {/if}
  </section>
</main>

<!----------------------------- STYLE ----------------------------->

<style lang="scss">
  nav {
    width: 100%;
  }

  ul {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid var(--text-accent);
    padding-left: 1.8rem;
  }

  button {
    border: 0;
    background: transparent;
    padding: 1rem;
    cursor: pointer;
  }

  button.active {
    border-bottom: 2px solid var(--primary);
  }
</style>
