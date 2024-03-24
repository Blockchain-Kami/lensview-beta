<script lang="ts">
  import {
    clock,
    feather,
    followers,
    modeComment,
    personAdd,
    star
  } from "../../utils/app-icon.util";
  import Icon from "$lib/Icon.svelte";
  import { page } from "$app/stores";
  import getPictureURLUtil from "../../utils/get-picture-URL.util";
  import getFormattedDateHelperUtil from "../../utils/helper/get-formatted-date.helper.util";
  import { DateType } from "../../config/app-constants.config";
  import getProfileUsingIdLensService from "../../services/lens/get-profile-using-id.lens.service";
  import { profileUserStore } from "../../stores/user/profile.user.store";
</script>

<!----------------------------- HTML ----------------------------->

<section>
  {#await getProfileUsingIdLensService($page.data.profileId)}
    <div class="cover-image-loader" />
    <div class="profile-details">
      <div class="CenterColumnFlex profile-details__left">
        <div class="profile-details__left__picture-loader" />
      </div>
      <div class="profile-details__right">
        <div class="CenterRowFlex profile-details__right__top-loader" />
        <div class="CenterRowFlex profile-details__right__middle-loader" />
        <div class="profile-details__right__bottom-loader" />
      </div>
    </div>
    <div class="stats">
      <div class="CenterRowFlex stats__box stats__followers">
        <div class="CenterColumnFlex stats__box__icon">
          <Icon d={followers} size="1.7em" />
        </div>
        <div class="CenterRowFlex stats__box__right">
          <div class="stats__box__right__title">Number of followers</div>
          <div class="stats__box__right__value-loader" />
        </div>
      </div>
      <div class="CenterRowFlex stats__box stats__posts">
        <div class="stats__box__icon">
          <Icon d={feather} size="1.7em" />
        </div>
        <div class="CenterColumnFlex stats__box__right">
          <div class="stats__box__right__title">Number of posts</div>
          <div class="stats__box__right__value-loader" />
        </div>
      </div>
      <div class="CenterRowFlex stats__box stats__comments">
        <div class="stats__box__icon">
          <Icon d={modeComment} size="1.7em" />
        </div>
        <div class="CenterColumnFlex stats__box__right">
          <div class="stats__box__right__title">Number of comments</div>
          <div class="stats__box__right__value-loader" />
        </div>
      </div>
      <div class="CenterRowFlex stats__box stats__reactions">
        <div class="stats__box__icon">
          <Icon d={star} size="1.7em" />
        </div>
        <div class="CenterColumnFlex stats__box__right">
          <div class="stats__box__right__title">Reaction count</div>
          <div class="stats__box__right__value-loader" />
        </div>
      </div>
    </div>
  {:then response}
    <div
      class="cover-image"
      style="background-image: url({response?.data?.profile?.metadata
        ?.coverPicture?.optimized?.uri})"
    />
    <div class="profile-details">
      <div class="CenterColumnFlex profile-details__left">
        <div class="profile-details__left__picture">
          <img
            src={getPictureURLUtil(
              response?.data?.profile?.metadata?.picture?.__typename ===
                "ImageSet"
                ? response?.data?.profile?.metadata?.picture?.optimized?.uri
                : "",
              response?.data?.profile?.ownedBy?.address
            )}
            alt="avatar"
          />
        </div>
      </div>
      <div class="profile-details__right">
        <div class="CenterRowFlex profile-details__right__top">
          <div class="profile-details__right__top__name">
            {response?.data?.profile?.metadata?.displayName
              ? response?.data?.profile?.metadata?.displayName
              : ""}
          </div>
          {#if $page.data.profileId !== $profileUserStore?.id}
            <div class="profile-details__right__top__follow">
              <button class="CenterRowFlex btn">
                <Icon d={personAdd} color="black" />
                &nbsp; &nbsp;Follow
              </button>
            </div>
          {/if}
        </div>
        <div class="CenterRowFlex profile-details__right__middle">
          <div class="profile-details__right__middle__handle">
            {response?.data?.profile?.handle?.fullHandle
              ? response?.data?.profile?.handle?.fullHandle
              : ""}
          </div>
          <div class="CenterRowFlex">
            <div
              class="CenterRowFlex profile-details__right__middle__grey-text"
            >
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Icon d={clock} color="#a1a1a1" />
              &nbsp; Joined {getFormattedDateHelperUtil(
                response?.data?.profile?.createdAt,
                DateType.ExactDate
              )}
            </div>
            <div
              class="CenterRowFlex profile-details__right__middle__grey-text"
            >
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Icon d={followers} color="#a1a1a1" />
              &nbsp; {response?.data?.profile?.stats?.following
                ? response?.data?.profile?.stats?.following
                : 0} Following
            </div>
          </div>
        </div>
        <div class="profile-details__right__bottom">
          {response?.data?.profile?.metadata?.bio
            ? response?.data?.profile?.metadata?.bio
            : ""}
        </div>
      </div>
    </div>
    <div class="stats">
      <div class="CenterRowFlex stats__box stats__followers">
        <div class="CenterColumnFlex stats__box__icon">
          <Icon d={followers} size="1.7em" />
        </div>
        <div class="CenterRowFlex stats__box__right">
          <div class="stats__box__right__title">Number of followers</div>
          <div class="stats__box__right__value">
            {response?.data?.profile?.stats?.followers}
          </div>
        </div>
      </div>
      <div class="CenterRowFlex stats__box stats__posts">
        <div class="stats__box__icon">
          <Icon d={feather} size="1.7em" />
        </div>
        <div class="CenterColumnFlex stats__box__right">
          <div class="stats__box__right__title">Number of posts</div>
          <div class="stats__box__right__value">
            {response?.data?.profile?.stats?.posts}
          </div>
        </div>
      </div>
      <div class="CenterRowFlex stats__box stats__comments">
        <div class="stats__box__icon">
          <Icon d={modeComment} size="1.7em" />
        </div>
        <div class="CenterColumnFlex stats__box__right">
          <div class="stats__box__right__title">Number of comments</div>
          <div class="stats__box__right__value">
            {response?.data?.profile?.stats?.comments}
          </div>
        </div>
      </div>
      <div class="CenterRowFlex stats__box stats__reactions">
        <div class="stats__box__icon">
          <Icon d={star} size="1.7em" />
        </div>
        <div class="CenterColumnFlex stats__box__right">
          <div class="stats__box__right__title">Reaction count</div>
          <div class="stats__box__right__value">
            {response?.data?.profile?.stats?.reactions}
          </div>
        </div>
      </div>
    </div>
  {:catch _error}
    <div>Failed to load profile</div>
  {/await}
</section>

<!---------------------------------------------------------------->

<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  .cover-image {
    width: 100%;
    height: 12rem;
    background-size: cover;
    background-position: center;
    background-color: var(--secondary);
  }

  .cover-image-loader {
    width: 100%;
    height: 15rem;
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

  .profile-details__right {
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
    width: 100%;
  }

  .profile-details__right__top {
    gap: 3rem;
    width: 100%;
    justify-content: flex-start;
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
    line-height: 1em;
    text-align: center;
  }

  .profile-details__right__middle {
    gap: 1rem;
  }

  .profile-details__right__middle-loader {
    width: 25rem;
    height: 1rem;
    border-radius: 10px;
  }

  .profile-details__right__middle__handle {
    padding: 0.2rem 0.5rem;
    background: #113232;
    border-radius: 5px;
    color: var(--primary);
  }

  .profile-details__right__middle__grey-text {
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
    padding: 1.5rem 1.5rem 0.5rem 1.5rem;
    margin: 1rem 5rem;
    background: #0c151a;
    border-radius: 15px;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  .stats__box {
    width: 25%;
    flex-grow: 1;
    flex-shrink: 1;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .stats__box__right__value-loader {
    width: 4rem;
    height: 1.5rem;
    border-radius: 5px;
  }

  .stats__box__icon {
    border-radius: 50%;
    background: var(--bg-solid-3);
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

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }

  .cover-image-loader,
  .profile-details__left__picture-loader,
  .profile-details__right__top-loader,
  .profile-details__right__middle-loader,
  .profile-details__right__bottom-loader,
  .stats__box__right__value-loader {
    background: linear-gradient(110deg, #0d9397 8%, #63bdc8 18%, #0d9397 33%);
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
  }

  @media only screen and (max-width: 1024px) {
    .profile-details {
      flex-direction: column;
      padding: 0 2rem;
    }

    .profile-details__right {
      width: 100%;
      align-items: center;
    }

    .profile-details__right__top {
      flex-direction: column;
    }

    .profile-details__right__top-loader {
      width: 15rem;
    }

    .profile-details__right__top__follow {
      width: 100%;
    }

    .profile-details__right__top__follow button {
      width: 100%;
    }

    .profile-details__right__middle {
      flex-direction: column;
      width: 100%;
    }

    .profile-details__right__middle-loader {
      width: 20rem;
    }

    .profile-details__right__bottom-loader {
      width: 10rem;
    }

    .stats {
      margin: 0 2rem 1rem 2rem;
    }

    .stats__box {
      width: 50%;
    }
  }
</style>
