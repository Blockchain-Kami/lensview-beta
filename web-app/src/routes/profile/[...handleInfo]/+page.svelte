<script lang="ts">
  import { page } from "$app/stores";
  import {
    clock,
    feather,
    followers,
    personAdd,
    poap,
    similarity,
    target,
    star,
    cross
  } from "../../../utils/app-icon.util";
  import Icon from "$lib/Icon.svelte";
  import LensLogo from "$lib/assets/lens-logo.jpg";
  import FarcasterLogo from "$lib/assets/farcaster-logo.jpg";
  import ENSLogo from "$lib/assets/ens-logo.jpg";
  import GnosisLogo from "$lib/assets/gnosis-logo.jpg";
  import profileInfoAppService from "../../../services/app/profile-info.app.service";
  import type { CisDashboardResponseAppModel } from "../../../models/app/responses/cis-dashboard.response.app.model";
  import cisDashboardAppService from "../../../services/app/cis-dashboard.app.service";
  import { getNotificationsContext } from "svelte-notifications";

  let handle = $page.data.handleInfo;
  const { addNotification } = getNotificationsContext();

  $: if (handle !== $page.data.handleInfo) {
    handle = $page.data.handleInfo;
  }

  let activeTab = "posts";
  let cisBreakdownData: CisDashboardResponseAppModel = {
    followerScore: null,
    postScore: null,
    reactionScore: null,
    poapScore: null,
    CIS: null
  };
  let isFetchingCisBreakdownData = false;

  const fetchCisBreakdownData = async () => {
    isFetchingCisBreakdownData = true;
    activeTab = "cisBreakdown";
    try {
      cisBreakdownData = await cisDashboardAppService(handle);
      console.log("cisBreakdownData", cisBreakdownData);
      isFetchingCisBreakdownData = false;
    } catch (error) {
      isFetchingCisBreakdownData = false;
      console.log("fetchCisBreakdownData error", error);
      addNotification({
        position: "top-right",
        heading: "Error occurred",
        description: "Something went wrong, please try again",
        type: cross,
        removeAfter: 10000
      });
    }
  };
</script>

<!----------------------------- HTML ----------------------------->
<main>
  {#await profileInfoAppService(handle)}
    <div class="cover-image-loader" />
    <div class="profile-details">
      <div class="CenterColumnFlex profile-details__left">
        <div class="profile-details__left__picture-loader" />
        <div class="CenterRowFlex profile-details__left__score-loader" />
      </div>
      <div class="profile-details__right">
        <div class="CenterRowFlex profile-details__right__top-loader" />
        <div class="CenterRowFlex profile-details__right__middle-loader" />
        <div class="profile-details__right__bottom-loader" />
      </div>
    </div>
    <div class="stats">
      <div class="CenterRowFlex stats__box stats__lens-followers">
        <div class="CenterColumnFlex stats__box__icon">
          <Icon d={followers} color="black" size="1.7em" />
        </div>
        <div class="CenterRowFlex stats__box__right">
          <div class="stats__box__right__title">Lens followers</div>
          <div class="stats__box__right__value-loader" />
        </div>
      </div>
      <div class="CenterRowFlex stats__box stats__lens-followers">
        <div class="stats__box__icon">
          <Icon d={followers} color="black" size="1.7em" />
        </div>
        <div class="CenterColumnFlex stats__box__right">
          <div class="stats__box__right__title">Farcaster followers</div>
          <div class="stats__box__right__value-loader" />
        </div>
      </div>
      <div class="CenterRowFlex stats__box stats__posts">
        <div class="stats__box__icon">
          <Icon d={feather} color="black" size="1.7em" />
        </div>
        <div class="CenterColumnFlex stats__box__right">
          <div class="stats__box__right__title">Number of posts</div>
          <div class="stats__box__right__value-loader" />
        </div>
      </div>
      <div class="CenterRowFlex stats__box stats__reactions">
        <div class="stats__box__icon">
          <Icon d={star} color="black" size="1.7em" />
        </div>
        <div class="CenterColumnFlex stats__box__right">
          <div class="stats__box__right__title">Reaction count</div>
          <div class="stats__box__right__value-loader" />
        </div>
      </div>
      <div class="CenterRowFlex stats__box stats__poaps">
        <div class="stats__box__icon">
          <Icon d={poap} color="black" size="1.7em" />
        </div>
        <div class="CenterColumnFlex stats__box__right">
          <div class="stats__box__right__title">POAP count</div>
          <div class="stats__box__right__value-loader" />
        </div>
      </div>
    </div>
    <div class="menu">
      {#if activeTab === "posts"}
        <div class="CenterRowFlex menu__item__active">
          <Icon d={feather} color="black" />
          &nbsp;&nbsp;Posts
        </div>
      {:else}
        <button
          on:click={() => (activeTab = "posts")}
          class="CenterRowFlex menu__item__inactive"
        >
          <Icon d={feather} color="#a1a1a1" />
          &nbsp;&nbsp;Posts
        </button>
      {/if}
      {#if activeTab === "cisBreakdown"}
        <div class="CenterRowFlex menu__item__active">
          <Icon d={target} color="black" />
          &nbsp;&nbsp;CIS Breakdown
        </div>
      {:else}
        <button
          on:click={() => fetchCisBreakdownData()}
          class="CenterRowFlex menu__item__inactive"
        >
          <Icon d={target} color="#a1a1a1" />
          &nbsp;&nbsp;CIS Breakdown
        </button>
      {/if}
      {#if activeTab === "exploreSimilarity"}
        <div class="CenterRowFlex menu__item__active">
          <Icon d={similarity} color="black" />
          &nbsp;&nbsp;Explore Similarity
        </div>
      {:else}
        <button
          on:click={() => (activeTab = "exploreSimilarity")}
          class="CenterRowFlex menu__item__inactive"
        >
          <Icon d={similarity} color="#a1a1a1" />
          &nbsp;&nbsp;Explore Similarity
        </button>
      {/if}
    </div>
    <div class="coming-soon-posts" />
  {:then profile}
    <div
      class="cover-image"
      style="background-image: url({profile.coverImage})"
    />
    <div class="profile-details">
      <div class="CenterColumnFlex profile-details__left">
        <div class="profile-details__left__picture">
          <img src={profile.displayImage} alt="avatar" />
        </div>
        <div class="CenterRowFlex profile-details__left__score">
          <div class="profile-details__left__score__title">
            Community Impact Score
          </div>
          <div class="profile-details__left__score__value">{profile.CIS}</div>
        </div>
      </div>
      <div class="profile-details__right">
        <div class="CenterRowFlex profile-details__right__top">
          <div class="profile-details__right__top__name">
            {profile.displayName}
          </div>
          <div class="profile-details__right__top__follow">
            <button class="CenterRowFlex btn">
              <Icon d={personAdd} color="black" />
              &nbsp; &nbsp;Follow
            </button>
          </div>
        </div>
        <div class="CenterRowFlex profile-details__right__middle">
          {#if profile.lensProfileName}
            <div class="CenterRowFlex profile-details__right__middle__lens">
              <div class="profile-details__right__middle__handle">
                {profile.lensProfileName ? profile.lensProfileName : ""}
              </div>
              <div class="CenterRowFlex profile-details__right__middle__joined">
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Icon d={clock} color="#a1a1a1" />
                &nbsp; {profile.lensJoinDate ? profile.lensJoinDate : ""}
              </div>
            </div>
          {/if}
          {#if profile.farcasterProfileName}
            <div class="profile-details__right__middle__vertical-line" />
            <div
              class="CenterRowFlex profile-details__right__middle__farcaster"
            >
              <div class="profile-details__right__middle__handle">
                {profile.farcasterProfileName
                  ? profile.farcasterProfileName
                  : ""}
              </div>
              <div class="CenterRowFlex profile-details__right__middle__joined">
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Icon d={clock} color="#a1a1a1" />
                &nbsp; {profile.farcasterJoinDate
                  ? profile.farcasterJoinDate
                  : ""}
              </div>
            </div>
          {/if}
        </div>
        <div class="profile-details__right__bottom">
          {profile.bio ? profile.bio : ""}
        </div>
      </div>
    </div>
    <div class="stats">
      <div class="CenterRowFlex stats__box stats__lens-followers">
        <div class="CenterColumnFlex stats__box__icon">
          <Icon d={followers} color="black" size="1.7em" />
        </div>
        <div class="CenterRowFlex stats__box__right">
          <div class="stats__box__right__title">Lens followers</div>
          <div class="stats__box__right__value">{profile.lensFollowers}</div>
        </div>
      </div>
      <div class="CenterRowFlex stats__box stats__lens-followers">
        <div class="stats__box__icon">
          <Icon d={followers} color="black" size="1.7em" />
        </div>
        <div class="CenterColumnFlex stats__box__right">
          <div class="stats__box__right__title">Farcaster followers</div>
          <div class="stats__box__right__value">
            {profile.farcasterFollowers}
          </div>
        </div>
      </div>
      <div class="CenterRowFlex stats__box stats__posts">
        <div class="stats__box__icon">
          <Icon d={feather} color="black" size="1.7em" />
        </div>
        <div class="CenterColumnFlex stats__box__right">
          <div class="stats__box__right__title">Number of posts</div>
          <div class="stats__box__right__value">{profile.publications}</div>
        </div>
      </div>
      <div class="CenterRowFlex stats__box stats__reactions">
        <div class="stats__box__icon">
          <Icon d={star} color="black" size="1.7em" />
        </div>
        <div class="CenterColumnFlex stats__box__right">
          <div class="stats__box__right__title">Reaction count</div>
          <div class="stats__box__right__value">{profile.reactions}</div>
        </div>
      </div>
      <div class="CenterRowFlex stats__box stats__poaps">
        <div class="stats__box__icon">
          <Icon d={poap} color="black" size="1.7em" />
        </div>
        <div class="CenterColumnFlex stats__box__right">
          <div class="stats__box__right__title">POAP count</div>
          <div class="stats__box__right__value">{profile.poapCount}</div>
        </div>
      </div>
    </div>
    <div class="menu">
      {#if activeTab === "posts"}
        <div class="CenterRowFlex menu__item__active">
          <Icon d={feather} color="black" />
          &nbsp;&nbsp;Posts
        </div>
      {:else}
        <button
          on:click={() => (activeTab = "posts")}
          class="CenterRowFlex menu__item__inactive"
        >
          <Icon d={feather} color="#a1a1a1" />
          &nbsp;&nbsp;Posts
        </button>
      {/if}
      {#if activeTab === "cisBreakdown"}
        <div class="CenterRowFlex menu__item__active">
          <Icon d={target} color="black" />
          &nbsp;&nbsp;CIS Breakdown
        </div>
      {:else}
        <button
          on:click={() => fetchCisBreakdownData()}
          class="CenterRowFlex menu__item__inactive"
        >
          <Icon d={target} color="#a1a1a1" />
          &nbsp;&nbsp;CIS Breakdown
        </button>
      {/if}
      {#if activeTab === "exploreSimilarity"}
        <div class="CenterRowFlex menu__item__active">
          <Icon d={similarity} color="black" />
          &nbsp;&nbsp;Explore Similarity
        </div>
      {:else}
        <button
          on:click={() => (activeTab = "exploreSimilarity")}
          class="CenterRowFlex menu__item__inactive"
        >
          <Icon d={similarity} color="#a1a1a1" />
          &nbsp;&nbsp;Explore Similarity
        </button>
      {/if}
    </div>
    {#if activeTab === "posts"}
      <div class="coming-soon-posts" />
    {:else if activeTab === "cisBreakdown"}
      <div class="CenterColumnFlex cis-breakdown">
        {#if isFetchingCisBreakdownData}
          <div class="CenterRowFlex cis-breakdown__score-loader" />
          <div class="CenterRowFlex cis-breakdown__details">
            <div class="CenterColumnFlex cis-breakdown__details__col">
              <div class="CenterRowFlex cis-breakdown__details__box">
                <div class="cis-breakdown__details__box__value-loader" />
                <div class="cis-breakdown__details__box__title">
                  Follower Score
                </div>
                <div class="cis-breakdown__details__box__icon">
                  <Icon d={followers} color="#1f2e33" size="4em" />
                </div>
              </div>
              <div class="CenterRowFlex cis-breakdown__details__box">
                <div class="cis-breakdown__details__box__value-loader" />
                <div class="cis-breakdown__details__box__title">
                  Reaction Score
                </div>
                <div class="cis-breakdown__details__box__icon">
                  <Icon d={star} color="#1f2e33" size="4em" />
                </div>
              </div>
            </div>
            <div class="CenterColumnFlex cis-breakdown__details__col">
              <div class="CenterRowFlex cis-breakdown__details__box">
                <div class="cis-breakdown__details__box__value-loader" />
                <div class="cis-breakdown__details__box__title">Post Score</div>
                <div class="cis-breakdown__details__box__icon">
                  <Icon d={feather} color="#1f2e33" size="4em" />
                </div>
              </div>
              <div class="CenterRowFlex cis-breakdown__details__box">
                <div class="cis-breakdown__details__box__value-loader" />
                <div class="cis-breakdown__details__box__title">POAP Score</div>
                <div class="cis-breakdown__details__box__icon">
                  <Icon d={poap} color="#1f2e33" size="4em" />
                </div>
              </div>
            </div>
          </div>
        {:else}
          <div class="CenterRowFlex cis-breakdown__score">
            <div class="cis-breakdown__score__title">
              {profile.displayName.split(" ")[0]}'s Community Impact Score is
            </div>
            <div class="cis-breakdown__score__value">
              {cisBreakdownData.CIS}
            </div>
          </div>
          <div class="CenterRowFlex cis-breakdown__details">
            <div class="CenterColumnFlex cis-breakdown__details__col">
              <div class="CenterRowFlex cis-breakdown__details__box">
                <div
                  class="CenterColumnFlex cis-breakdown__details__box__value"
                >
                  {cisBreakdownData.followerScore}
                </div>
                <div class="cis-breakdown__details__box__title">
                  Follower Score
                </div>
                <div class="cis-breakdown__details__box__icon">
                  <Icon d={followers} color="#1f2e33" size="4em" />
                </div>
              </div>
              <div class="CenterRowFlex cis-breakdown__details__box">
                <div
                  class="CenterColumnFlex cis-breakdown__details__box__value"
                >
                  {cisBreakdownData.reactionScore}
                </div>
                <div class="cis-breakdown__details__box__title">
                  Reaction Score
                </div>
                <div class="cis-breakdown__details__box__icon">
                  <Icon d={star} color="#1f2e33" size="4em" />
                </div>
              </div>
            </div>
            <div class="CenterColumnFlex cis-breakdown__details__col">
              <div class="CenterRowFlex cis-breakdown__details__box">
                <div
                  class="CenterColumnFlex cis-breakdown__details__box__value"
                >
                  {cisBreakdownData.postScore}
                </div>
                <div class="cis-breakdown__details__box__title">Post Score</div>
                <div class="cis-breakdown__details__box__icon">
                  <Icon d={feather} color="#1f2e33" size="4em" />
                </div>
              </div>
              <div class="CenterRowFlex cis-breakdown__details__box">
                <div
                  class="CenterColumnFlex cis-breakdown__details__box__value"
                >
                  {cisBreakdownData.poapScore}
                </div>
                <div class="cis-breakdown__details__box__title">POAP Score</div>
                <div class="cis-breakdown__details__box__icon">
                  <Icon d={poap} color="#1f2e33" size="4em" />
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    {:else if activeTab === "exploreSimilarity"}
      <div class="CenterColumnFlex explore-similarity">
        <div class="CenterRowFlex explore-similarity__details">
          <div class="CenterRowFlex explore-similarity__details__box">
            <div class="explore-similarity__details__box__icon">
              <Icon d={poap} color="#1f2e33" size="1.7em" />
            </div>
            <div class="explore-similarity__details__box__info">
              <div class="explore-similarity__details__box__info__title">
                Similarity Score
              </div>
              <div class="explore-similarity__details__box__info__value">
                50%
              </div>
            </div>
          </div>
          <div class="large-vertical-line" />
          <div class="CenterRowFlex explore-similarity__details__box">
            <div class="explore-similarity__details__box__logo">
              <img src={LensLogo} alt="lens-logo" />
            </div>
            <div class="explore-similarity__details__box__info">
              Both have Lens profile
            </div>
          </div>
          <div class="large-vertical-line" />
          <div class="CenterRowFlex explore-similarity__details__box">
            <div class="explore-similarity__details__box__logo">
              <img src={FarcasterLogo} alt="lens-logo" />
            </div>
            <div class="explore-similarity__details__box__info">
              Both have Farcaster
            </div>
          </div>
          <div class="large-vertical-line" />
          <div class="CenterRowFlex explore-similarity__details__box">
            <div class="explore-similarity__details__box__logo">
              <img src={ENSLogo} alt="lens-logo" />
            </div>
            <div class="explore-similarity__details__box__info">
              Both have ENS
            </div>
          </div>
        </div>
        <div class="explore-similarity__poaps">
          <div class="CenterRowFlex explore-similarity__poaps__head">
            <div class="explore-similarity__poaps__head__title">
              Total similar POAPs
            </div>
            <div class="explore-similarity__poaps__head__value">57</div>
            <div class="explore-similarity__poaps__head__logo">
              <img src={GnosisLogo} alt="gnosis logo" />
            </div>
          </div>
          <div class="explore-similarity__poaps__body">
            <div class="CenterColumnFlex explore-similarity__poaps__body__card">
              <div class="explore-similarity__poaps__body__card__details">
                <div
                  class="explore-similarity__poaps__body__card__details__date-location"
                >
                  Dec 2, 2022 (Bangalore)
                </div>
                <div
                  class="explore-similarity__poaps__body__card__details__name"
                >
                  Push at ETHIndia 2022
                </div>
              </div>
            </div>
            <div class="CenterColumnFlex explore-similarity__poaps__body__card">
              <div class="explore-similarity__poaps__body__card__details">
                <div
                  class="explore-similarity__poaps__body__card__details__date-location"
                >
                  Dec 2, 2022 (Bangalore)
                </div>
                <div
                  class="explore-similarity__poaps__body__card__details__name"
                >
                  Push at ETHIndia 2022
                </div>
              </div>
            </div>
            <div class="CenterColumnFlex explore-similarity__poaps__body__card">
              <div class="explore-similarity__poaps__body__card__details">
                <div
                  class="explore-similarity__poaps__body__card__details__date-location"
                >
                  Dec 2, 2022 (Bangalore)
                </div>
                <div
                  class="explore-similarity__poaps__body__card__details__name"
                >
                  Push at ETHIndia 2022
                </div>
              </div>
            </div>
            <div class="CenterColumnFlex explore-similarity__poaps__body__card">
              <div class="explore-similarity__poaps__body__card__details">
                <div
                  class="explore-similarity__poaps__body__card__details__date-location"
                >
                  Dec 2, 2022 (Bangalore)
                </div>
                <div
                  class="explore-similarity__poaps__body__card__details__name"
                >
                  Push at ETHIndia 2022
                </div>
              </div>
            </div>
            <div class="CenterColumnFlex explore-similarity__poaps__body__card">
              <div class="explore-similarity__poaps__body__card__details">
                <div
                  class="explore-similarity__poaps__body__card__details__date-location"
                >
                  Dec 2, 2022 (Bangalore)
                </div>
                <div
                  class="explore-similarity__poaps__body__card__details__name"
                >
                  Push at ETHIndia 2022
                </div>
              </div>
            </div>
            <div class="CenterColumnFlex explore-similarity__poaps__body__card">
              <div class="explore-similarity__poaps__body__card__details">
                <div
                  class="explore-similarity__poaps__body__card__details__date-location"
                >
                  Dec 2, 2022 (Bangalore)
                </div>
                <div
                  class="explore-similarity__poaps__body__card__details__name"
                >
                  Push at ETHIndia 2022
                </div>
              </div>
            </div>
            <div class="CenterColumnFlex explore-similarity__poaps__body__card">
              <div class="explore-similarity__poaps__body__card__details">
                <div
                  class="explore-similarity__poaps__body__card__details__date-location"
                >
                  Dec 2, 2022 (Bangalore)
                </div>
                <div
                  class="explore-similarity__poaps__body__card__details__name"
                >
                  Push at ETHIndia 2022
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/await}
</main>

<!----------------------------------------------------------------->

<!---------------------------------------------------------------->

<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  .cover-image {
    width: 100%;
    height: 12rem;
    background-size: cover;
    background-position: center;
  }

  .cover-image-loader {
    width: 100%;
    height: 13rem;
  }

  .profile-details {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 4rem;
  }

  .profile-details__left__picture img {
    width: 15rem;
    height: 15rem;
    border-radius: 50%;
    border: 3px solid #32f9ff;
    margin-top: -5rem;
  }

  .profile-details__left__picture-loader {
    width: 15rem;
    height: 15rem;
    border-radius: 50%;
    margin-top: -5rem;
  }

  .profile-details__left__score {
    border-radius: 5px;
    background: #234554;
    margin-top: -3rem;
    position: relative;
    padding: 0.4rem 0.8rem;
    gap: 1rem;
    min-width: 10rem;
    max-width: 12rem;
    font-weight: var(--medium-font-weight);
  }

  .profile-details__left__score-loader {
    border-radius: 5px;
    margin-top: -3rem;
    position: relative;
    width: 12rem;
    height: 3.5rem;
  }

  .profile-details__left__score__title {
    font-size: var(--small-font-size);
  }

  .profile-details__left__score__value {
    font-size: var(--medium-font-size);
    color: var(--primary);
  }

  .profile-details__right {
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
  }

  .profile-details__right__top {
    gap: 3rem;
  }

  .profile-details__right__top-loader {
    width: 25rem;
    height: 2rem;
    border-radius: 10px;
  }

  .profile-details__right__top__name {
    font-size: var(--semi-large-font-size);
    font-weight: var(--semi-medium-font-weight);
    font-family: var(--special-font);
  }

  .profile-details__right__middle {
    gap: 1rem;
  }

  .profile-details__right__middle-loader {
    width: 25rem;
    height: 1rem;
    border-radius: 10px;
  }

  .profile-details__right__middle__vertical-line {
    border-left: 2px solid #ffffff45;
    height: 21px;
  }

  .profile-details__right__middle__handle {
    padding: 0.2rem 0.5rem;
    background: #113232;
    border-radius: 5px;
    color: var(--primary);
  }

  .profile-details__right__middle__joined {
    font-size: var(--small-font-size);
    color: var(--text-accent);
  }

  .profile-details__right__bottom {
    max-width: 50rem;
  }

  .profile-details__right__bottom-loader {
    width: 40rem;
    height: 1.5rem;
    border-radius: 10px;
  }

  .stats {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1.5rem;
    margin: 1rem 5rem;
    background: #0c151a;
    border-radius: 15px;
    justify-content: space-around;
  }

  .stats__box {
    gap: 1rem;
  }

  .stats__box__right__value-loader {
    width: 4rem;
    height: 1.5rem;
    border-radius: 5px;
  }

  .stats__box__icon {
    border-radius: 50%;
    background: var(--primary);
    padding: 0.9rem 1rem;
  }

  .stats__box__right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }

  .stats__box__right__title {
    font-size: var(--small-font-size);
  }

  .stats__box__right__value {
    font-size: var(--medium-font-size);
  }

  .menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    font-size: var(--small-font-size);
    font-weight: var(--medium-font-weight);
    padding: 2rem 8rem 1rem 8rem;
    border-bottom: 1.5px solid #3f494e;
  }

  .menu__item__active {
    background: var(--btn-bg);
    padding: 0.7rem;
    color: black;
    border-radius: 5px;
    cursor: pointer;
  }

  .menu__item__inactive {
    background: #0e171c;
    padding: 0.7rem;
    color: white;
    border-radius: 5px;
  }

  .coming-soon-posts {
    width: 100%;
    height: 30rem;
    background-size: cover;
    background-position: center;
    background-image: url("$lib/assets/posts-section-coming-soon.jpg");
  }

  .cis-breakdown {
    padding: 2rem 5rem;
    gap: 2rem;
  }

  .cis-breakdown__score {
    padding: 1.5rem 2rem;
    font-size: var(--medium-font-size);
    font-weight: var(--medium-font-weight);
    background: var(--btn-bg);
    width: 100%;
    border-radius: 10px;
    color: black;
    justify-content: space-between;
  }

  .cis-breakdown__score-loader {
    width: 100%;
    height: 4.5rem;
    border-radius: 10px;
  }

  .cis-breakdown__details {
    gap: 2rem;
    width: 100%;
  }

  .cis-breakdown__details__col {
    gap: 1rem;
    width: 100%;
  }

  .cis-breakdown__details__box {
    padding: 1rem 2rem;
    background: #122025;
    gap: 1rem;
    border-radius: 10px;
    width: 100%;
  }

  .cis-breakdown__details__box__value {
    border-radius: 50%;
    background: var(--primary);
    width: 3rem;
    height: 3rem;
    color: black;
    font-weight: var(--medium-font-weight);
  }

  .cis-breakdown__details__box__value-loader {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  .cis-breakdown__details__box__icon {
    margin-left: auto;
    margin-bottom: -1.3rem;
  }

  .explore-similarity {
    padding: 2rem 5rem;
    gap: 2rem;
  }

  .explore-similarity__details {
    padding: 1.5rem 3rem;
    font-size: var(--semi-medium-font-size);
    font-weight: var(--medium-font-weight);
    background: linear-gradient(180deg, #0d171d 35.38%, #22454b 101.83%);
    width: 100%;
    border-radius: 10px;
    justify-content: space-between;
  }

  .explore-similarity__details__box {
    gap: 1rem;
  }

  .explore-similarity__details__box__icon {
    border-radius: 50%;
    background: var(--primary);
    padding: 0.9rem 1rem;
  }

  .explore-similarity__details__box__logo img {
    width: 4.5rem;
  }

  .explore-similarity__details__box__info {
    gap: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .explore-similarity__details__box__info__value {
    font-size: var(--semi-large-font-size);
  }

  .explore-similarity__poaps {
    padding: 2rem 2rem;
    background: #132126;
    border-radius: 10px;
    width: 100%;
  }

  .explore-similarity__poaps__head {
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .explore-similarity__poaps__head__value {
    font-size: var(--medium-font-size);
    font-weight: var(--medium-font-weight);
    color: var(--primary);
  }

  .explore-similarity__poaps__head__logo {
    margin-left: auto;
  }

  .explore-similarity__poaps__head__logo img {
    width: 2rem;
  }

  .explore-similarity__poaps__body {
    display: grid;
    gap: 3rem;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    justify-items: center;
  }

  .explore-similarity__poaps__body__card {
    min-height: 100%;
    background-image: url("https://assets.airstack.xyz/image/nft/HQJ0b65y0YbkXlWFD05vSTP8uZzP4/Sbs44TZTU3fjAu0R6AQZVUzaN5hGhSTEbM/medium.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    height: 25rem;
    width: 100%;
    border-radius: 10px;
    color: black;
    justify-content: flex-end;
  }

  .explore-similarity__poaps__body__card__details {
    backdrop-filter: blur(25px);
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 10px;
  }

  .explore-similarity__poaps__body__card__details__date-location {
    color: #f8f8e3;
    margin-bottom: 0.3rem;
  }

  .explore-similarity__poaps__body__card__details__name {
    font-weight: var(--medium-font-weight);
    font-size: var(--medium-font-size);
  }

  .large-vertical-line {
    border-left: 2px solid #ffffff45;
    height: 41px;
  }

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }

  .cover-image-loader,
  .profile-details__left__picture-loader,
  .profile-details__left__score-loader,
  .profile-details__right__top-loader,
  .profile-details__right__middle-loader,
  .profile-details__right__bottom-loader,
  .stats__box__right__value-loader,
  .cis-breakdown__score-loader,
  .cis-breakdown__details__box__value-loader {
    background: linear-gradient(110deg, #0d9397 8%, #63bdc8 18%, #0d9397 33%);
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
  }
</style>
