<script lang="ts">
  import { onMount } from "svelte";
  import getChallengeInfoLensService from "../services/lens/get-challenge-info.lens.service";

  onMount(() => {
    test();
  });

  const test = async () => {
    const challenge = await getChallengeInfoLensService(
      "0xa03dbDA93D960BBDa97B9a2F74729de186C22638",
      "0x018776"
    );
    console.log("challenge: ", challenge);
  };
</script>

<main>
  <h1>Popup</h1>
</main>

<style lang="scss">
</style>
