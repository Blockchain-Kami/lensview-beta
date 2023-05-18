<script lang="ts">

  import { isSignedIn } from "../../services/signInStatus";
  import { addReactionToAPost } from "../../utils/frontend/addReactionToAPost";
  import { invalidate } from "$app/navigation";

  export let pub;
  export let hashedURL;

  /**
   * It handles the error if any field is missing in comment
   * which are getting used.
   * UPDATE THIS FUNCTION IF ANY NEW FIELD IS ADDED IN comment
   * @param pub
   */
  const isPubValid = (pub) => {

    if (!pub?.profile?.handle)
      return false;

    if (!pub?.createdAt)
      return false;

    if (!pub?.metadata?.content)
      return false;

    if (!pub?.stats) {
      if (pub.stats.totalUpvotes === undefined)
        return false;

      if (pub.stats.totalDownvotes === undefined)
        return false;

      if (pub.stats.totalAmountOfpubs === undefined)
        return false;

      if (pub.stats.totalAmountOfMirrors === undefined)
        return false;
    }

    return true;
  };

  const getPictureURL = (fetchedLensURL, ownedByAddress) => {
    if (fetchedLensURL === undefined) {
      return `https://cdn.stamp.fyi/avatar/eth:${ownedByAddress}?s=300`;
    }

    if (fetchedLensURL.substring(0, 4) === "ipfs") {
      return `https://gateway.ipfscdn.io/ipfs/${fetchedLensURL.substring(6)}`;
    } else {
      return fetchedLensURL;
    }
  };

  /**
   * It returns the formatted date based on the date passed
   * If the date is of today, it returns the seconds, minutes or hours
   * If the date is of 1 month from today, it returns the days
   * If the date is of 1 year from today, it returns the months
   * If the date is of more than 1 year from today, it returns the years
   * @param date
   */
  const getFormattedDate = (date) => {
    const today = new Date();
    const commentDate = new Date(date);

    const diffTime = Math.abs(today.getTime() - commentDate.getTime());
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.floor(diffTime / oneDay);

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        if (diffMinutes === 0) {
          const diffSeconds = Math.floor(diffTime / (1000));
          return `${diffSeconds} seconds ago`;
        } else {
          return `${diffMinutes} minutes ago`;
        }
      } else {
        return `${diffHours} hours ago`;
      }
    } else if (diffDays === 1) {
      return `${diffDays} day ago`;
    } else if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const diffMonths = Math.floor(diffDays / 30);
      if (diffMonths === 1) {
        return `${diffMonths} month ago`;
      } else {
        return `${diffMonths} months ago`;
      }
    } else {
      const diffYears = Math.floor(diffDays / 365);
      if (diffYears === 1) {
        return `${diffYears} year ago`;
      } else {
        return `${diffYears} years ago`;
      }
    }
  };

  const callAddReaction = async (pubID, reaction) => {
    let signedStatus;
    const unsub = isSignedIn.subscribe((value) => {
      signedStatus = value;
    });
    unsub();

    if (!signedStatus) {
      alert("Please connect wallet and sign in to react to a comment");
    } else {
      const response = await addReactionToAPost(pubID, reaction);

      if (response?.error) {
        alert(response?.error?.graphQLErrors[0]?.message);
        return;
      }
      await invalidate("posts: updated-posts");
    }

  };

</script>


<!----------------------------- HTML ----------------------------->
{#if isPubValid}
  <div class="pub">
    <div class="pub__avatar">
      <img
        src={ getPictureURL(pub?.profile?.picture?.original?.url, pub?.profile?.ownedBy)}
        alt="avatar" />
    </div>
    <div class="pub__data">
      <div class="pub__data__header">
        <div class="pub__data__header__handle">@{pub["profile"]["handle"]}</div>
        <div class="pub__data__header__date">{getFormattedDate(pub["createdAt"])}</div>
      </div>
      <div class="pub__data__content">{pub["metadata"]["content"]}</div>
      <div class="pub__data__reaction-bar">
        <div class="pub__data__reaction-bar__reaction">
          {pub["stats"]["totalUpvotes"]}
          <button on:click={callAddReaction(pub["id"], "UPVOTE")}>
            👍
          </button>
        </div>
        <div class="pub__data__reaction-bar__reaction">
          {pub["stats"]["totalDownvotes"]}
          <button on:click={callAddReaction(pub["id"], "DOWNVOTE")}>
            👎
          </button>
        </div>
        <div class="pub__data__reaction-bar__reaction">
          {pub["stats"]["totalAmountOfComments"]}
          <a href={`/posts/${hashedURL}/${pub?.id}`}>
            💬
          </a>
        </div>
        <div class="pub__data__reaction-bar__reaction">{pub["stats"]["totalAmountOfMirrors"]} 📨</div>
      </div>
    </div>
  </div>
{/if}

<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">

  .pub {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    width: 100%;
    background: white;
    margin-top: 0.3rem;
  }

  .pub__data {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  }

  .pub__data__header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .pub__data__header__handle {
    font-weight: 600;
  }

  .pub__data__header__date {
    font-size: small;
  }

  .pub__data__content {
    font-size: large;
  }

  .pub__data__reaction-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }

  .pub__data__reaction-bar__reaction button {
    background: none;
    border: none;
    cursor: pointer;
  }


  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
</style>
<!----------------------------------------------------------------->
