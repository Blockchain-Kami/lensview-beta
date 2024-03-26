<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import { close } from "../utils/app-icon.util";
  import type { CustomNotificationModel } from "../models/custom-notification.model";
  import { fly } from "svelte/transition";

  export let notification: CustomNotificationModel;
  export let onRemove;

  const callCtaFunctionAndRemove = () => {
    notification.ctaFunction();
    onRemove();
  };
</script>

<!----------------------------- HTML ----------------------------->
<section transition:fly={{ x: 50 }} on:introstart on:outroend>
  <div class="CenterRowFlex head">
    <div class="head__title">
      {notification.heading}
    </div>
    <button on:click={onRemove}>
      <Icon d={close} />
    </button>
  </div>
  <div class="CenterRowFlex body">
    <div class="CenterRowFlex body__icon">
      <Icon d={notification.type} size="2em" />
    </div>
    <div class="body__content">
      {notification.description}
    </div>
  </div>
  {#if notification.ctaBtnName !== undefined}
    <div class="footer">
      <button on:click={callCtaFunctionAndRemove}
        >{notification.ctaBtnName}</button
      >
    </div>
  {/if}
</section>

<!----------------------------------------------------------------->

<!---------------------------------------------------------------->

<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    min-width: 23rem;
    background: #255758;
    border-radius: 1rem;
    border-left: 2px solid var(--primary);
    margin: 0.5rem 0.5rem 0 0;
    box-shadow: rgba(0, 0, 0, 0.25) 0 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

  .head {
    justify-content: space-between;
  }

  .head__title {
    color: var(--primary);
    font-weight: var(--semi-medium-font-weight);
    font-size: 16px;
  }

  .body {
    gap: 1rem;
    justify-content: flex-start;
  }

  .body__icon {
    border-radius: 50%;
    background: var(--bg-solid-2);
    padding: 0.7rem;
  }

  .footer button {
    margin-left: auto;
    padding: 0.5em 1em;
    font-weight: var(--medium-font-weight);
    font-size: var(--small-font-size);
    border-radius: 5px;
    background: var(--btn-bg);
    color: black;
  }
</style>
