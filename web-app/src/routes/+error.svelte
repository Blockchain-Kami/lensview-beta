<script lang="ts">
  import { page } from "$app/stores";
</script>

<!----------------------------- HTML ----------------------------->

<main>
  <h1>{$page.status}</h1>
  <h3>{$page.error.message}</h3>
  <h3>{$page.error.hint}</h3>
</main>

<!----------------------------------------------------------------->

<!---------------------------------------------------------------->

<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
    font-size: var(--large-font-size);
    gap: 3rem;
  }
</style>
