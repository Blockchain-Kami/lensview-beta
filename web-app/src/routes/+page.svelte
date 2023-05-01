<script lang="ts">
  import Feeds from "../components/main-page/Feeds.svelte";
  import HowItWorks from "../components/main-page/HowItWorks.svelte";
</script>



<!------------------------------ HTML ------------------------------>
<section class="CenterRowFlex">
  <div class="CenterColumnFlex feeds">
    <Feeds/>
  </div>
  <div class="CenterColumnFlex how-it-works">
    <HowItWorks/>
  </div>
</section>
<!-------------------------------------------------------------------->


<!------------------------------ Style ------------------------------>
<style lang="scss">
    section{
        width: 100%;
        height: 100vh;
    }

    .feeds{
        width: 45%;
        height: 100vh;
        background-color: aliceblue;
    }

    .how-it-works{
        width: 55%;
        height: 100vh;
        background: azure;
    }
</style>

<!-------------------------------------------------------------------->
