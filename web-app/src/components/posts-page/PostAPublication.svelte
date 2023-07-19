<script lang="ts">
    import Icon from "$lib/Icon.svelte";
    import {addPhoto} from "../../utils/frontend/appIcon";

    let userEnteredText = "";

</script>


<!----------------------------- HTML ----------------------------->
<section>
    <div class="CenterRowFlex body">
        <div class="body__user-pic">
            <img src="https://cdn.stamp.fyi/avatar/eth:0xbffce813b6c14d8659057dd3111d3f83cee271b8?s=300" alt="">
        </div>
        <div contenteditable="true"
             placeholder="What do think about this ?"
             class="body__input">
        </div>
    </div>
    <div class="CenterRowFlex footer">
        <div class="CenterRowFlex footer__insert">
            <div class="CenterRowFlex footer__insert__item">
                <Icon d={addPhoto}/>
                Photo
            </div>
        </div>
        <div class="footer__operations">
            <button class="btn">Post it</button>
        </div>
    </div>
</section>

<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">

  section {
    padding: 6rem 2rem 2rem 2rem;
  }

  .body {
    background: #18393A;
    padding: 1.3rem;
    gap: 1rem;
    justify-content: space-between;
    border-radius: 10px 10px 0 0;
  }

  .body__user-pic {
    margin-bottom: auto;
  }

  .body__user-pic img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid #32F9FF;
  }

  [contenteditable=true]:empty:before {
    content: attr(placeholder);
  }

  .body__input {
    content: attr(placeholder);
    width: 100%;
    border-radius: 0.75rem;
    background: linear-gradient(172deg, rgba(50, 249, 255, 0.15) 33.55%, rgba(236, 254, 255, 0.15) 100%);
    padding: 1rem;
  }

  .body__input:focus {
    border: 2px solid var(--primary);
  }

  .footer {
    background: #1e4748;
    padding: 1.3rem;
    gap: 1rem;
    justify-content: space-between;
    border-radius: 0 0 10px 10px;
  }

  .footer__insert__item {
    padding: 0.7rem;
    background: #18393a;
    gap: 0.7rem;
    align-items: flex-end;
    border-radius: 7px;
  }
</style>
<!----------------------------------------------------------------->


<!--<script lang="ts">-->
<!--  import { isSignedIn } from "../../services/signInStatus";-->
<!--  import uploadToIPFS from "../../utils/frontend/uploadToIPFS";-->
<!--  import signCreateCommentTypedData from "../../utils/frontend/signCreateCommentTypedData";-->
<!--  import { ethers, utils } from "ethers";-->
<!--  import LENSHUB from "../.././abi/lenshub.json";-->
<!--  import { getSigner } from "../../utils/web3";-->
<!--  import { invalidate } from "$app/navigation";-->
<!--  import { userEnteredURL } from "../../services/userEnteredURL";-->
<!--  import { PUBLIC_LENS_HUB_CONTRACT_ADDRESS } from "$env/static/public";-->
<!--  import { userProfile } from "../../services/profile";-->
<!--  import checkTxHashBeenIndexed from "../../utils/checkTxHashBeenIndexed";-->

<!--  export let hashedURL;-->
<!--  export let pubId;-->
<!--  export let openCommentSection;-->

<!--  let userEnteredContent = "";-->
<!--  let isPosting = false;-->
<!--  let addingLink = false;-->


<!--  function splitSignature(signature) {-->
<!--    return utils.splitSignature(signature);-->
<!--  }-->

<!--  let savePost = async () => {-->
<!--    isPosting = true;-->
<!--    let profile;-->
<!--    const unsub = userProfile.subscribe((value) => {-->
<!--      profile = value;-->
<!--    });-->
<!--    unsub();-->

<!--    console.log("profile: ", profile);-->

<!--    const contentURI = await uploadToIPFS(profile.id, userEnteredContent, hashedURL);-->
<!--    const createCommentRequest = {-->
<!--      profileId: profile.id,-->
<!--      publicationId: pubId,-->
<!--      contentURI,-->
<!--      collectModule: {-->
<!--        freeCollectModule: { followerOnly: true }-->
<!--      },-->
<!--      referenceModule: {-->
<!--        followerOnlyReferenceModule: false-->
<!--      }-->
<!--    };-->

<!--    try {-->
<!--      const signedResult = await signCreateCommentTypedData(createCommentRequest);-->
<!--      const typedData = signedResult.result.typedData;-->
<!--      const { v, r, s } = splitSignature(signedResult.signature);-->
<!--      const signer = await getSigner();-->

<!--      const contract = new ethers.Contract(-->
<!--        PUBLIC_LENS_HUB_CONTRACT_ADDRESS,-->
<!--        LENSHUB,-->
<!--        signer-->
<!--      );-->

<!--      const tx = await contract.commentWithSig({-->
<!--        profileId: typedData.value.profileId,-->
<!--        contentURI: typedData.value.contentURI,-->
<!--        profileIdPointed: typedData.value.profileIdPointed,-->
<!--        pubIdPointed: typedData.value.pubIdPointed,-->
<!--        collectModule: typedData.value.collectModule,-->
<!--        collectModuleInitData: typedData.value.collectModuleInitData,-->
<!--        referenceModule: typedData.value.referenceModule,-->
<!--        referenceModuleInitData: typedData.value.referenceModuleInitData,-->
<!--        referenceModuleData: typedData.value.referenceModuleData,-->
<!--        sig: {-->
<!--          v,-->
<!--          r,-->
<!--          s,-->
<!--          deadline: typedData.value.deadline-->
<!--        }-->
<!--      });-->

<!--      await tx.wait();-->

<!--      console.log("successfully created Comment: tx hash", tx.hash);-->
<!--      console.log("successfully created Comment: tx hash", JSON.stringify(tx));-->

<!--      await checkUntilPostAdded(tx.hash, Date.now());-->
<!--    } catch (err) {-->
<!--      console.log("error: ", err);-->
<!--      isPosting = false;-->
<!--    }-->
<!--  };-->

<!--  let addURLToLensview = async () => {-->
<!--    addingLink = true;-->

<!--    let urlToBeAdded;-->
<!--    const unsub = userEnteredURL.subscribe((value) => {-->
<!--      urlToBeAdded = value;-->
<!--    });-->
<!--    unsub();-->

<!--    await fetch(`/api/add-url`, {-->
<!--      method: "POST",-->
<!--      body: JSON.stringify(urlToBeAdded),-->
<!--      headers: {-->
<!--        "Content-Type": "application/json"-->
<!--      }-->
<!--    }).then(response => response.json()).then(async (responseData) => {-->
<!--      if (responseData?.statusCode === 201) {-->
<!--        console.log("responseData : ", responseData);-->
<!--        await checkUntilMainPostAdded(responseData?.txHash, Date.now());-->
<!--      } else {-->
<!--        addingLink = false;-->
<!--        throw new Error("Error adding link");-->
<!--      }-->
<!--    }).catch(err => {-->
<!--        console.log("Error : ", err);-->
<!--      }-->
<!--    );-->
<!--  };-->


<!--  const checkUntilMainPostAdded = async (txHash, startTime) => {-->
<!--    /** If link is not added to lensview within 25 seconds, then stop checking */-->
<!--    if (Date.now() - startTime > 25000) {-->
<!--      addingLink = false;-->
<!--      alert("Error adding post");-->
<!--      return;-->
<!--    }-->

<!--    const hasIndexedResponse = await checkTxHashBeenIndexed(txHash);-->

<!--    if (hasIndexedResponse?.data?.hasTxHashBeenIndexed?.indexed === false) {-->
<!--      console.log("Waiting for link to be added to lensview");-->
<!--      setTimeout(() => checkUntilMainPostAdded(txHash, startTime), 100);-->
<!--    } else {-->
<!--      addingLink = false;-->
<!--      await invalidate("posts: updated-posts");-->
<!--      alert("Link added to Lensview");-->
<!--    }-->
<!--  };-->

<!--  const checkUntilPostAdded = async (txHash, startTime) => {-->

<!--    /** If post is not added to lens within 25 seconds, then stop checking */-->
<!--    if (Date.now() - startTime > 25000) {-->
<!--      isPosting = false;-->
<!--      userEnteredContent = "";-->
<!--      alert("Error adding post");-->
<!--      return;-->
<!--    }-->

<!--    const hasIndexedResponse = await checkTxHashBeenIndexed(txHash);-->

<!--    if (hasIndexedResponse?.data?.hasTxHashBeenIndexed?.indexed === false) {-->
<!--      console.log("Waiting for post to be added to graph");-->
<!--      setTimeout(() => checkUntilPostAdded(txHash, startTime), 100);-->
<!--    } else {-->
<!--      isPosting = false;-->
<!--      userEnteredContent = "";-->
<!--      await invalidate("posts: updated-posts");-->
<!--    }-->
<!--  };-->
<!--</script>-->


<!--&lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; HTML -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--<div class="CenterColumnFlex user-post">-->
<!--  {#if pubId === ""}-->
<!--    <div class="user-post__link">-->
<!--      <input bind:value={$userEnteredURL} type="text" class="user-post__link__input"-->
<!--             placeholder="Please insert link over here">-->
<!--      {#if !addingLink}-->
<!--        <button on:click={addURLToLensview} class="btn" disabled="{$userEnteredURL === ''}">Add Link On LensView-->
<!--        </button>-->
<!--      {:else}-->
<!--        Adding Link....-->
<!--      {/if}-->
<!--    </div>-->
<!--  {/if}-->
<!--  <div class="user-post__info">Connect your wallet for-->
<!--    {#if openCommentSection}-->
<!--      commenting-->
<!--    {:else}-->
<!--      posting-->
<!--    {/if}-->
<!--  </div>-->
<!--  <div class="user-post__text">-->
<!--    <input bind:value={userEnteredContent} type="text" class="user-post__text__input"-->
<!--           placeholder="What's on your mind?">-->
<!--  </div>-->
<!--  <div class="CenterRowFlex user-post__option-bar">-->
<!--    <div class="CenterRowFlex user-post__option-bar__options">-->
<!--      <div class="user-post__option-bar__options__option">Media</div>-->
<!--      <div class="user-post__option-bar__options__option">@Mention</div>-->
<!--    </div>-->
<!--    <div class="user-post__option-bar__post-btn">-->
<!--      {#if !isPosting}-->
<!--        <button on:click={savePost} disabled='{userEnteredContent === "" || !$isSignedIn || pubId === ""}'-->
<!--                class="btn">-->
<!--          {#if openCommentSection}-->
<!--            Comment-->
<!--          {:else}-->
<!--            Post-->
<!--          {/if}-->
<!--        </button>-->
<!--      {:else}-->
<!--        {#if openCommentSection}-->
<!--          commenting...-->
<!--        {:else}-->
<!--          posting...-->
<!--        {/if}-->
<!--      {/if}-->
<!--    </div>-->
<!--  </div>-->
<!--</div>-->
<!--&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->


<!--&lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; STYLE -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--<style lang="scss">-->
<!--  .user-post {-->
<!--    width: 100%;-->
<!--    justify-content: space-between;-->
<!--    gap: 1rem;-->
<!--    background: white;-->
<!--    padding: 1rem;-->
<!--    border-radius: 12px;-->
<!--    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;-->
<!--    margin-top: 4rem;-->
<!--  }-->

<!--  .user-post__info {-->
<!--    font-weight: bold;-->
<!--  }-->

<!--  .user-post__text {-->
<!--    width: 100%;-->
<!--  }-->

<!--  .user-post__text__input {-->
<!--    width: 100%;-->
<!--    padding: 0.65rem;-->
<!--    border-radius: 8px;-->
<!--    border: 1px solid lightgray;-->
<!--    outline: 0;-->
<!--  }-->

<!--  .user-post__link {-->
<!--    width: 100%;-->
<!--    display: flex;-->
<!--    gap: 1rem;-->
<!--  }-->

<!--  .user-post__link__input {-->
<!--    width: 100%;-->
<!--    padding: 0.65rem;-->
<!--    border-radius: 8px;-->
<!--    border: 1px solid lightgray;-->
<!--    outline: 0;-->
<!--  }-->

<!--  .user-post__option-bar {-->
<!--    width: 100%;-->
<!--    justify-content: space-between;-->
<!--  }-->

<!--  .user-post__option-bar__options {-->
<!--    gap: 0.5rem;-->
<!--  }-->

<!--  .user-post__option-bar__options__option {-->
<!--    padding: 0.5rem;-->
<!--    font-size: medium;-->
<!--    font-weight: 500;-->
<!--  }-->
<!--</style>-->
<!--&lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
