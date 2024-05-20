<script lang="ts">
  const { VITE_DOMAIN_NAME } = import.meta.env;

  const redirectToPostCreation = async () => {
    const [tab] = await chrome.tabs.query({ active: true });
    console.log("tab : ", tab);

    if (!tab || !tab?.url) {
      throw new Error("tab not found");
    }
    window.open(
      `https://${VITE_DOMAIN_NAME}?compose=${encodeURI(tab?.url)}`,
      "_blank"
    );
  };

  const redirectToApp = () => {
    window.open(`https://${VITE_DOMAIN_NAME}`, "_blank");
  };
</script>

<!----------------------------- HTML ----------------------------->

<article class="message">
  <img src="../../images/spotlight.svg" alt="spotlight" class="spotlight" />
  <p>
    It’s quiet in here, but you could <span style="color: var(--primary)"
      >share your view</span
    > meanwhile to help out others!
  </p>
</article>

<footer class="action">
  <button on:click={redirectToPostCreation} class="btn">Share your view</button>
  <button on:click={redirectToApp} class="btn btn-alt"
    >Check out LensView</button
  >
</footer>

<!----------------------------------- style -------------------------------->

<style lang="scss">
  .message {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 3rem 0 3rem;
    align-items: center;
  }

  .message img {
    width: 527px;
  }

  .message p {
    position: absolute;
    font-family: var(--special-font);
    font-size: var(--medium-font-size);
    text-align: center;
    line-height: 1.5em;
    top: 300px;
    padding: 3rem;
  }

  .action {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: fixed;
    bottom: 0;
    padding: 4rem 1.5rem 1.5rem 1.5rem;
    width: 100%;
    background: linear-gradient(360deg, #0d171d 39.31%, #22454b12 82%);
  }

  .action button {
    width: 94%;
  }
</style>
