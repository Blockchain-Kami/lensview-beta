<script lang="ts">
  import { isSignedIn } from "../../services/signInStatus";
  import uploadToIPFS from "../../utils/frontend/uploadToIPFS";
  import signCreateCommentTypedData from "../../utils/frontend/signCreateCommentTypedData";
  import { ethers, utils } from "ethers";
  import LENSHUB from "../.././abi/lenshub.json";
  import { getSigner } from "../../utils/web3";
  import { invalidate } from "$app/navigation";
  import { userEnteredURL } from "../../services/userEnteredURL";
  import { PUBLIC_LENS_HUB_CONTRACT_ADDRESS } from "$env/static/public";
  import { isMainPostAdded } from "../../services/isPostAddedToLensGraph";
  import { userProfile } from "../../services/profile";
  import checkTxHashBeenIndexed from "../../utils/frontend/checkTxHashBeenIndexed";

  export let hashedURL;
  export let pubId;
  export let openCommentSection;

  let userEnteredContent = "";
  let isPosting = false;
  let addingLink = false;


  function splitSignature(signature) {
    return utils.splitSignature(signature);
  }

  let savePost = async () => {
    isPosting = true;
    let profile;
    const unsub = userProfile.subscribe((value) => {
      profile = value;
    });
    unsub();

    console.log("profile: ", profile);

    const contentURI = await uploadToIPFS(profile.id, userEnteredContent, hashedURL);
    const createCommentRequest = {
      profileId: profile.id,
      publicationId: pubId,
      contentURI,
      collectModule: {
        freeCollectModule: { followerOnly: true }
      },
      referenceModule: {
        followerOnlyReferenceModule: false
      }
    };

    try {
      const signedResult = await signCreateCommentTypedData(createCommentRequest);
      const typedData = signedResult.result.typedData;
      const { v, r, s } = splitSignature(signedResult.signature);
      const signer = await getSigner();

      const contract = new ethers.Contract(
        PUBLIC_LENS_HUB_CONTRACT_ADDRESS,
        LENSHUB,
        signer
      );

      const tx = await contract.commentWithSig({
        profileId: typedData.value.profileId,
        contentURI: typedData.value.contentURI,
        profileIdPointed: typedData.value.profileIdPointed,
        pubIdPointed: typedData.value.pubIdPointed,
        collectModule: typedData.value.collectModule,
        collectModuleInitData: typedData.value.collectModuleInitData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
        referenceModuleData: typedData.value.referenceModuleData,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline
        }
      });

      await tx.wait();

      console.log("successfully created Comment: tx hash", tx.hash);
      console.log("successfully created Comment: tx hash", JSON.stringify(tx));

      await checkUntilPostAdded(tx.hash);
    } catch (err) {
      console.log("error: ", err);
      isPosting = false;
    }
  };

  let addURLToLensview = async () => {
    addingLink = true;

    let urlToBeAdded;
    const unsub = userEnteredURL.subscribe((value) => {
      urlToBeAdded = value;
    });
    unsub();

    await fetch(`/api/add-url`, {
      method: "POST",
      body: JSON.stringify(urlToBeAdded),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async (res) => {
      if (res.status === 200) {
        console.log("Res : ", res);
        isMainPostAdded.set(false);
        checkUntilMainPostAdded();
      } else {
        addingLink = false;
        throw new Error("Error adding link");
      }
    }).catch(err => {
        console.log("Error : ", err);
      }
    );
  };

  //TODO: Handle edges cases of below function running into infinite loop
  //TODO: Update this function with checkUntilPostAdded() which uses hasTxHashBeenIndexed
  const checkUntilMainPostAdded = () => {

    let isMainPostAddedStatus;
    const unsub = isMainPostAdded.subscribe((value) => {
      console.log("isMainPostAddedStatus : ", value);
      isMainPostAddedStatus = value;
    });

    if (!isMainPostAddedStatus) {
      console.log("Waiting for main post to be added to graph");
      invalidate("posts: updated-posts");
      setTimeout(checkUntilMainPostAdded, 1000);
    } else {
      console.log("Main post added to graph");
      alert("Link added to Lensview");
      addingLink = false;
    }
    unsub();
  };

  const checkUntilPostAdded = async (txHash) => {

    const hasIndexedResponse = await checkTxHashBeenIndexed(txHash);

    if (hasIndexedResponse?.data?.hasTxHashBeenIndexed?.indexed === false) {
      console.log("Waiting for post to be added to graph");
      setTimeout(() => checkUntilPostAdded(txHash), 10);
    } else {
      isPosting = false;
      userEnteredContent = "";
      txHash = "";
      await invalidate("posts: updated-posts");
    }
  };
</script>


<!----------------------------- HTML ----------------------------->
<div class="CenterColumnFlex user-post">
  {#if pubId === ""}
    <div class="user-post__link">
      <input bind:value={$userEnteredURL} type="text" class="user-post__link__input"
             placeholder="Please insert link over here">
      {#if !addingLink}
        <button on:click={addURLToLensview} class="btn" disabled="{$userEnteredURL === ''}">Add Link On LensView
        </button>
      {:else}
        Adding Link....
      {/if}
    </div>
  {/if}
  <div class="user-post__info">Connect your wallet for
    {#if openCommentSection}
      commenting
    {:else}
      posting
    {/if}
  </div>
  <div class="user-post__text">
    <input bind:value={userEnteredContent} type="text" class="user-post__text__input"
           placeholder="What's on your mind?">
  </div>
  <div class="CenterRowFlex user-post__option-bar">
    <div class="CenterRowFlex user-post__option-bar__options">
      <div class="user-post__option-bar__options__option">Media</div>
      <div class="user-post__option-bar__options__option">Hashtags</div>
      <div class="user-post__option-bar__options__option">@Mention</div>
    </div>
    <div class="user-post__option-bar__post-btn">
      {#if !isPosting}
        <button on:click={savePost} disabled='{userEnteredContent === "" || !$isSignedIn || pubId === ""}'
                class="btn">
          {#if openCommentSection}
            Comment
          {:else}
            Post
          {/if}
        </button>
      {:else}
        {#if openCommentSection}
          commenting...
        {:else}
          posting...
        {/if}
      {/if}
    </div>
  </div>
</div>
<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  .user-post {
    width: 100%;
    justify-content: space-between;
    gap: 1rem;
    background: white;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  }

  .user-post__info {
    font-weight: bold;
  }

  .user-post__text {
    width: 100%;
  }

  .user-post__text__input {
    width: 100%;
    padding: 0.65rem;
    border-radius: 8px;
    border: 1px solid lightgray;
    outline: 0;
  }

  .user-post__link {
    width: 100%;
    display: flex;
    gap: 1rem;
  }

  .user-post__link__input {
    width: 100%;
    padding: 0.65rem;
    border-radius: 8px;
    border: 1px solid lightgray;
    outline: 0;
  }

  .user-post__option-bar {
    width: 100%;
    justify-content: space-between;
  }

  .user-post__option-bar__options {
    gap: 0.5rem;
  }

  .user-post__option-bar__options__option {
    padding: 0.5rem;
    font-size: medium;
    font-weight: 500;
  }
</style>
<!----------------------------------------------------------------->
