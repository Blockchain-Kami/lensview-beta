<script>
  import { thumbDown, thumbUp } from "../../../utils/app-icon.util";
  import Icon from "../../../lib/Icon.svelte";
</script>

<!---------------------------- HTML -------------------------------->

<ul>
  <li>
    <article
      class="CenterColumnFlex card"
      aria-labelledby="post-title-1"
      aria-describedby="post-content-1"
    >
      <header class="card__header">
        <img
          class="card__header__profile-pic"
          src="https://ik.imagekit.io/lens/media-snapshot/0ad60fb5ee609a3d844cac958c05404389b7f2d4a15d051a8b709d1a203af6c8.jpg"
          alt=""
        />
        <div class="card__header__info">
          <div class="CenterRowFlex card__header__info__top">
            <div class="card__header__info__top__name" id="post-title-1">
              Nader Dabit
            </div>
            <div class="CenterRowFlex card__header__info__top__reaction">
              <div
                class="CenterRowFlex card__header__info__top__reaction__val"
                aria-label="6 likes"
              >
                <Icon d={thumbUp} />
                {4}
              </div>
              <div
                class="card__header__info__top__reaction__vertical-line"
                aria-hidden="true"
              />
              <div
                class="CenterRowFlex card__header__info__top__reaction__val"
                aria-label="6 dislikes"
              >
                <Icon d={thumbDown} />
                {6}
              </div>
            </div>
          </div>
          <div class="CenterRowFlex card__header__info__bottom">
            <div
              class="card__header__info__bottom__username"
              aria-label="username"
            >
              @naderdabit
            </div>
            <div class="dot" aria-hidden="true" />
            <div class="card__header__info__bottom__time">8 hours ago</div>
          </div>
        </div>
      </header>
      <p class="card__body" id="post-content-1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
        asperiores dolore dolores enim eum fugiat illo inventore laboriosam
        maiores maxime minima nobis obcaecati perspiciatis ratione, suscipit
        unde, ut. Ex, mollitia!
      </p>
    </article>
  </li>
</ul>

<!----------------------------------- style -------------------------------->

<style lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background: var(--bg-solid-4);
    border-radius: 10px;
    gap: 0.7rem;
  }

  .card__header {
    display: flex;
    flex-direction: row;
    gap: 0.7rem;
    width: 100%;
  }

  .card__header__profile-pic {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    border: 1.5px solid var(--primary);
  }

  .card__header__info {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }

  .card__header__info__top {
    justify-content: space-between;
  }

  .card__header__info__top__name {
    font-size: var(--semi-medium-font-size);
    font-weight: var(--medium-font-weight);
  }

  .card__header__info__top__reaction {
    gap: 0.5rem;
    border-radius: 6.8px;
    opacity: 70%;
    max-width: fit-content;
  }

  .card__header__info__top__reaction__val {
    gap: 0.4rem;
  }

  .card__header__info__top__reaction__vertical-line {
    border-left: 1px solid #ffffff45;
    height: 21px;
  }

  .card__header__info__bottom {
    gap: 0.5rem;
    justify-content: flex-start;
  }

  .card__header__info__bottom__username {
    padding: 0.2rem 0.5rem;
    background: #113232;
    border-radius: 5px;
    color: var(--primary);
  }

  .card__header__info__bottom__time {
    font-size: var(--small-font-size);
    color: var(--text-accent);
  }

  .card__body {
    overflow-wrap: anywhere;
    overflow: hidden;
    font-size: var(--semi-medium-font-size);
  }
</style>
