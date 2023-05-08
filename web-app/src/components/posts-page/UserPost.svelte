<script lang="ts">
  import { isSignedIn } from "../../services/signInStatus";
  import getUserProfile from "../../utils/frontend/getUserProfile";
  import uploadToIPFS from "../../utils/frontend/uploadToIPFS";
  import signCreateCommentTypedData from "../../utils/frontend/signCreateCommentTypedData";
  import { ethers, utils } from "ethers";
  import LENSHUB from "../.././abi/lenshub.json";
  import { getSigner } from "../../utils/web3";
  import { invalidate } from "$app/navigation";
  import { userEnteredURL } from "../../services/userEnteredURL";
  import { PUBLIC_LENS_HUB_CONTRACT_ADDRESS } from "$env/static/public";
  import { currentTotalPosts, isMainPostAdded } from "../../services/isPostAddedToLensGraph";

  export let hashedURL;
  export let mainPostPubId;

  let userEnteredContent = "";
  let isPosting = false;
  let addingLink = false;
  let prevTotalPosts: number;


  function splitSignature(signature) {
    return utils.splitSignature(signature);
  }

  let savePost = async () => {
    isPosting = true;
    const profile = await getUserProfile();
    const contentURI = await uploadToIPFS(profile.id, userEnteredContent, hashedURL);
    const createCommentRequest = {
      profileId: profile.id,
      publicationId: mainPostPubId,
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

      const unsub = currentTotalPosts.subscribe((value) => {
        prevTotalPosts = value;
      });
      unsub();

      checkUntilPostAdded();
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
        console.log("Res : " + res);
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

  const checkUntilPostAdded = () => {
    let currentTotalPostsValue;
    const unsub = currentTotalPosts.subscribe((value) => {
      console.log("currentTotalPostsValue : ", value);
      currentTotalPostsValue = value;
    });

    if (currentTotalPostsValue === prevTotalPosts) {
      console.log("Waiting for post to be added to graph");
      invalidate("posts: updated-posts");
      setTimeout(checkUntilPostAdded, 1000);
    } else {
      console.log("post added to graph");
      isPosting = false;
      userEnteredContent = "";
    }
    unsub();
  };
</script>


<!----------------------------- HTML ----------------------------->
<div class="CenterColumnFlex user-post">
  {#if mainPostPubId === ""}
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
  <div class="user-post__info">Connect your wallet for posting</div>
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
        <button on:click={savePost} disabled='{userEnteredContent === "" || !$isSignedIn || mainPostPubId === ""}'
                class="btn">Post
        </button>
      {:else}
        Posting...
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
