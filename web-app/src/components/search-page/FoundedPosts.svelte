<script lang="ts">

    import Icon from "$lib/Icon.svelte";
    import {redirect, thumbUpAlt, trendingUp} from "../../utils/frontend/appIcon";
</script>


<!----------------------------- HTML ----------------------------->
<section>
    <div class="h2 heading">
        This is what we found
    </div>
    <div class="body">
        <div class="card">
            <div class="card__img-box">
                <div class="card__img-box__image"
                     style="background-image: url('https://ipfs.io/ipfs/QmY1fHGmxAu6VeY4kFwEDA1HTzEGBgF9PzEfDm3rxoUqnt/0')">

                </div>
            </div>
            <div class="card__body">
                <div class="card__body__info">
                    <a href="https://lensdump.com/i/0WY5Qs" target="_blank"
                       class="CenterRowFlex card__body__info__url">
                        <span class="CenterRowFlex card__body__info__url__icon">
                            <Icon d={redirect}/>&nbsp;
                        </span>
                        <span class="card__body__info__url__val">
                            https://lensdump.com/i/0WY5Qs
                        </span>
                    </a>
                    <div class="CenterRowFlex card__body__info__details">
                        <div class="CenterRowFlex card__body__info__details__likes">
                            <Icon d={thumbUpAlt}/>&nbsp;
                            40 Likes
                        </div>
                        <div class="dot"></div>
                        <div class="CenterRowFlex card__body__info__details__added-by">
                            <div class="card__body__info__details__added-by__label">
                                Added by:
                            </div>
                            <div class="card__body__info__details__added-by__handle">
                                naruto.lens
                            </div>
                        </div>
                        <div class="dot"></div>
                        <div class="card__body__info__details__time">
                            2 hours ago
                        </div>
                    </div>
                </div>
                <div class="CenterRowFlex card__body__post">
                    <div class="card__body__post__pic">
                        <img src="https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Buster"
                             alt="avatar">
                    </div>
                    <div class="card__body__post__info">
                        <div class="CenterRowFlex card__body__post__info__head">
                            <div class="card__body__post__info__head__handle">
                                naruto.lens
                            </div>
                            <div class="CenterRowFlex card__body__post__info__head__trend">
                                <div class="CenterRowFlex card__body__post__info__head__trend__icon">
                                    <Icon d={trendingUp}/>
                                </div>
                                <div class="card__body__post__info__head__trend__count">
                                    4
                                </div>
                            </div>
                            <div class="dot"></div>
                            <div class="card__body__post__info__head__time">
                                2 hours ago
                            </div>
                        </div>
                        <div class="card__body__post__info__content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ab delectus deserunt
                            dignissimos eius, illo incidunt laboriosam maxime nemo quaerat quam reiciendis similique
                            vitae, voluptatem voluptatum? Consequuntur nam repudiandae voluptas.
                            ncidunt laboriosam maxime nemo quaerat quam reiciendis similique vitae, voluptatem
                            voluptatum? Consequuntur nam repudiandae voluptas.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card__img-box">
                <div class="card__img-box__image"
                     style="background-image: url('https://ipfs.io/ipfs/QmY1fHGmxAu6VeY4kFwEDA1HTzEGBgF9PzEfDm3rxoUqnt/0')">

                </div>
            </div>
            <div class="card__body">
                <div class="card__body__info">
                    <a href="https://lensdump.com/i/0WY5Qs" target="_blank"
                       class="CenterRowFlex card__body__info__url">
                        <span class="CenterRowFlex card__body__info__url__icon">
                            <Icon d={redirect}/>&nbsp;
                        </span>
                        <span class="card__body__info__url__val">
                            https://lensdump.com/i/0WY5Qs
                        </span>
                    </a>
                    <div class="CenterRowFlex card__body__info__details">
                        <div class="CenterRowFlex card__body__info__details__likes">
                            <Icon d={thumbUpAlt}/>&nbsp;
                            40 Likes
                        </div>
                        <div class="dot"></div>
                        <div class="CenterRowFlex card__body__info__details__added-by">
                            <div class="card__body__info__details__added-by__label">
                                Added by:
                            </div>
                            <div class="card__body__info__details__added-by__handle">
                                naruto.lens
                            </div>
                        </div>
                        <div class="dot"></div>
                        <div class="card__body__info__details__time">
                            2 hours ago
                        </div>
                    </div>
                </div>
                <div class="CenterRowFlex card__body__post">
                    <div class="card__body__post__pic">
                        <img src="https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Buster"
                             alt="avatar">
                    </div>
                    <div class="card__body__post__info">
                        <div class="CenterRowFlex card__body__post__info__head">
                            <div class="card__body__post__info__head__handle">
                                naruto.lens
                            </div>
                            <div class="CenterRowFlex card__body__post__info__head__trend">
                                <div class="CenterRowFlex card__body__post__info__head__trend__icon">
                                    <Icon d={trendingUp}/>
                                </div>
                                <div class="card__body__post__info__head__trend__count">
                                    4
                                </div>
                            </div>
                            <div class="dot"></div>
                            <div class="card__body__post__info__head__time">
                                2 hours ago
                            </div>
                        </div>
                        <div class="card__body__post__info__content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ab delectus deserunt
                            dignissimos eius, illo incidunt laboriosam maxime nemo quaerat quam reiciendis similique
                            vitae, voluptatem voluptatum? Consequuntur nam repudiandae voluptas.
                            ncidunt laboriosam maxime nemo quaerat quam reiciendis similique vitae, voluptatem
                            voluptatum? Consequuntur nam repudiandae voluptas.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card__img-box">
                <div class="card__img-box__image"
                     style="background-image: url('https://ipfs.io/ipfs/QmY1fHGmxAu6VeY4kFwEDA1HTzEGBgF9PzEfDm3rxoUqnt/0')">

                </div>
            </div>
            <div class="card__body">
                <div class="card__body__info">
                    <a href="https://lensdump.com/i/0WY5Qs" target="_blank"
                       class="CenterRowFlex card__body__info__url">
                        <span class="CenterRowFlex card__body__info__url__icon">
                            <Icon d={redirect}/>&nbsp;
                        </span>
                        <span class="card__body__info__url__val">
                            https://lensdump.com/i/0WY5Qs
                        </span>
                    </a>
                    <div class="CenterRowFlex card__body__info__details">
                        <div class="CenterRowFlex card__body__info__details__likes">
                            <Icon d={thumbUpAlt}/>&nbsp;
                            40 Likes
                        </div>
                        <div class="dot"></div>
                        <div class="CenterRowFlex card__body__info__details__added-by">
                            <div class="card__body__info__details__added-by__label">
                                Added by:
                            </div>
                            <div class="card__body__info__details__added-by__handle">
                                naruto.lens
                            </div>
                        </div>
                        <div class="dot"></div>
                        <div class="card__body__info__details__time">
                            2 hours ago
                        </div>
                    </div>
                </div>
                <div class="CenterRowFlex card__body__post">
                    <div class="card__body__post__pic">
                        <img src="https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Buster"
                             alt="avatar">
                    </div>
                    <div class="card__body__post__info">
                        <div class="CenterRowFlex card__body__post__info__head">
                            <div class="card__body__post__info__head__handle">
                                naruto.lens
                            </div>
                            <div class="CenterRowFlex card__body__post__info__head__trend">
                                <div class="CenterRowFlex card__body__post__info__head__trend__icon">
                                    <Icon d={trendingUp}/>
                                </div>
                                <div class="card__body__post__info__head__trend__count">
                                    4
                                </div>
                            </div>
                            <div class="dot"></div>
                            <div class="card__body__post__info__head__time">
                                2 hours ago
                            </div>
                        </div>
                        <div class="card__body__post__info__content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ab delectus deserunt
                            dignissimos eius, illo incidunt laboriosam maxime nemo quaerat quam reiciendis similique
                            vitae, voluptatem voluptatum? Consequuntur nam repudiandae voluptas.
                            ncidunt laboriosam maxime nemo quaerat quam reiciendis similique vitae, voluptatem
                            voluptatum? Consequuntur nam repudiandae voluptas.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card__img-box">
                <div class="card__img-box__image"
                     style="background-image: url('https://ipfs.io/ipfs/QmY1fHGmxAu6VeY4kFwEDA1HTzEGBgF9PzEfDm3rxoUqnt/0')">

                </div>
            </div>
            <div class="card__body">
                <div class="card__body__info">
                    <a href="https://lensdump.com/i/0WY5Qs" target="_blank"
                       class="CenterRowFlex card__body__info__url">
                        <span class="CenterRowFlex card__body__info__url__icon">
                            <Icon d={redirect}/>&nbsp;
                        </span>
                        <span class="card__body__info__url__val">
                            https://lensdump.com/i/0WY5Qs
                        </span>
                    </a>
                    <div class="CenterRowFlex card__body__info__details">
                        <div class="CenterRowFlex card__body__info__details__likes">
                            <Icon d={thumbUpAlt}/>&nbsp;
                            40 Likes
                        </div>
                        <div class="dot"></div>
                        <div class="CenterRowFlex card__body__info__details__added-by">
                            <div class="card__body__info__details__added-by__label">
                                Added by:
                            </div>
                            <div class="card__body__info__details__added-by__handle">
                                naruto.lens
                            </div>
                        </div>
                        <div class="dot"></div>
                        <div class="card__body__info__details__time">
                            2 hours ago
                        </div>
                    </div>
                </div>
                <div class="CenterRowFlex card__body__post">
                    <div class="card__body__post__pic">
                        <img src="https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Buster"
                             alt="avatar">
                    </div>
                    <div class="card__body__post__info">
                        <div class="CenterRowFlex card__body__post__info__head">
                            <div class="card__body__post__info__head__handle">
                                naruto.lens
                            </div>
                            <div class="CenterRowFlex card__body__post__info__head__trend">
                                <div class="CenterRowFlex card__body__post__info__head__trend__icon">
                                    <Icon d={trendingUp}/>
                                </div>
                                <div class="card__body__post__info__head__trend__count">
                                    4
                                </div>
                            </div>
                            <div class="dot"></div>
                            <div class="card__body__post__info__head__time">
                                2 hours ago
                            </div>
                        </div>
                        <div class="card__body__post__info__content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ab delectus deserunt
                            dignissimos eius, illo incidunt laboriosam maxime nemo quaerat quam reiciendis similique
                            vitae, voluptatem voluptatum? Consequuntur nam repudiandae voluptas.
                            ncidunt laboriosam maxime nemo quaerat quam reiciendis similique vitae, voluptatem
                            voluptatum? Consequuntur nam repudiandae voluptas.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card__img-box">
                <div class="card__img-box__image"
                     style="background-image: url('https://ipfs.io/ipfs/QmY1fHGmxAu6VeY4kFwEDA1HTzEGBgF9PzEfDm3rxoUqnt/0')">

                </div>
            </div>
            <div class="card__body">
                <div class="card__body__info">
                    <a href="https://lensdump.com/i/0WY5Qs" target="_blank"
                       class="CenterRowFlex card__body__info__url">
                        <span class="CenterRowFlex card__body__info__url__icon">
                            <Icon d={redirect}/>&nbsp;
                        </span>
                        <span class="card__body__info__url__val">
                            https://lensdump.com/i/0WY5Qs
                        </span>
                    </a>
                    <div class="CenterRowFlex card__body__info__details">
                        <div class="CenterRowFlex card__body__info__details__likes">
                            <Icon d={thumbUpAlt}/>&nbsp;
                            40 Likes
                        </div>
                        <div class="dot"></div>
                        <div class="CenterRowFlex card__body__info__details__added-by">
                            <div class="card__body__info__details__added-by__label">
                                Added by:
                            </div>
                            <div class="card__body__info__details__added-by__handle">
                                naruto.lens
                            </div>
                        </div>
                        <div class="dot"></div>
                        <div class="card__body__info__details__time">
                            2 hours ago
                        </div>
                    </div>
                </div>
                <div class="CenterRowFlex card__body__post">
                    <div class="card__body__post__pic">
                        <img src="https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Buster"
                             alt="avatar">
                    </div>
                    <div class="card__body__post__info">
                        <div class="CenterRowFlex card__body__post__info__head">
                            <div class="card__body__post__info__head__handle">
                                naruto.lens
                            </div>
                            <div class="CenterRowFlex card__body__post__info__head__trend">
                                <div class="CenterRowFlex card__body__post__info__head__trend__icon">
                                    <Icon d={trendingUp}/>
                                </div>
                                <div class="card__body__post__info__head__trend__count">
                                    4
                                </div>
                            </div>
                            <div class="dot"></div>
                            <div class="card__body__post__info__head__time">
                                2 hours ago
                            </div>
                        </div>
                        <div class="card__body__post__info__content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ab delectus deserunt
                            dignissimos eius, illo incidunt laboriosam maxime nemo quaerat quam reiciendis similique
                            vitae, voluptatem voluptatum? Consequuntur nam repudiandae voluptas.
                            ncidunt laboriosam maxime nemo quaerat quam reiciendis similique vitae, voluptatem
                            voluptatum? Consequuntur nam repudiandae voluptas.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card__img-box">
                <div class="card__img-box__image"
                     style="background-image: url('https://ipfs.io/ipfs/QmY1fHGmxAu6VeY4kFwEDA1HTzEGBgF9PzEfDm3rxoUqnt/0')">

                </div>
            </div>
            <div class="card__body">
                <div class="card__body__info">
                    <a href="https://lensdump.com/i/0WY5Qs" target="_blank"
                       class="CenterRowFlex card__body__info__url">
                        <span class="CenterRowFlex card__body__info__url__icon">
                            <Icon d={redirect}/>&nbsp;
                        </span>
                        <span class="card__body__info__url__val">
                            https://lensdump.com/i/0WY5Qs
                        </span>
                    </a>
                    <div class="CenterRowFlex card__body__info__details">
                        <div class="CenterRowFlex card__body__info__details__likes">
                            <Icon d={thumbUpAlt}/>&nbsp;
                            40 Likes
                        </div>
                        <div class="dot"></div>
                        <div class="CenterRowFlex card__body__info__details__added-by">
                            <div class="card__body__info__details__added-by__label">
                                Added by:
                            </div>
                            <div class="card__body__info__details__added-by__handle">
                                naruto.lens
                            </div>
                        </div>
                        <div class="dot"></div>
                        <div class="card__body__info__details__time">
                            2 hours ago
                        </div>
                    </div>
                </div>
                <div class="CenterRowFlex card__body__post">
                    <div class="card__body__post__pic">
                        <img src="https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Buster"
                             alt="avatar">
                    </div>
                    <div class="card__body__post__info">
                        <div class="CenterRowFlex card__body__post__info__head">
                            <div class="card__body__post__info__head__handle">
                                naruto.lens
                            </div>
                            <div class="CenterRowFlex card__body__post__info__head__trend">
                                <div class="CenterRowFlex card__body__post__info__head__trend__icon">
                                    <Icon d={trendingUp}/>
                                </div>
                                <div class="card__body__post__info__head__trend__count">
                                    4
                                </div>
                            </div>
                            <div class="dot"></div>
                            <div class="card__body__post__info__head__time">
                                2 hours ago
                            </div>
                        </div>
                        <div class="card__body__post__info__content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ab delectus deserunt
                            dignissimos eius, illo incidunt laboriosam maxime nemo quaerat quam reiciendis similique
                            vitae, voluptatem voluptatum? Consequuntur nam repudiandae voluptas.
                            ncidunt laboriosam maxime nemo quaerat quam reiciendis similique vitae, voluptatem
                            voluptatum? Consequuntur nam repudiandae voluptas.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  .dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #fff;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
  }

  .card {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    border-bottom: 1.5px solid #3f494e;
    padding: 2rem 0;
  }

  .card__img-box {
    width: 55rem;
  }

  .card__img-box__image {
    width: 100%;
    height: 15rem;
    background-color: #000;
    overflow: hidden;
    padding-bottom: 50%; /* Adjust this value to control the aspect ratio */
    background-size: cover;
    border-radius: 10.8px;
    transition: background-position 1s ease;
  }

  .card__img-box__image:hover {
    animation: scrollBackground 5s linear infinite;
  }

  @keyframes scrollBackground {
    0% {
      background-position: top center;
    }
    100% {
      background-position: bottom center;
    }
  }

  .card__body {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 15rem;
    padding: 1rem;
  }

  .card__body__info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .card__body__info__url {
    justify-content: flex-start;

  }

  .card__body__info__url__val {
    font-weight: var(--medium-font-weight);
    font-size: 17px;
  }

  .card__body__info__details {
    gap: 0.5rem;
    justify-content: flex-start;
  }

  .card__body__info__details__likes {
    background: #0b151a;
    padding: 0.5rem;
    border-radius: 5px;
  }

  .card__body__info__details__added-by__handle {
    background: #0b151a;
    padding: 0.2rem 0.3rem;
    border-radius: 5px;
    color: var(--primary);
  }

  .card__body__info__details__time {
    font-size: var(--small-font-size);
    color: var(--text-accent);
  }

  .card__body__post {
    gap: 1rem;
  }

  .card__body__post__pic {
    margin-bottom: auto;
  }

  .card__body__post__pic img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid #32F9FF;
  }

  .card__body__post__info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .card__body__post__info__head {
    gap: 1rem;
    justify-content: flex-start;
  }

  .card__body__info__details__added-by {
    gap: 0.3rem;
  }

  .card__body__info__details__added-by__label {
    font-size: var(--small-font-size);
    color: var(--text-accent);
  }

  .card__body__post__info__head__handle {
    background: #0b151a;
    padding: 0.2rem 0.3rem;
    border-radius: 5px;
    color: var(--primary);
  }

  .card__body__post__info__head__trend {
    background: #113232;
    border-radius: 14px;
    font-size: var(--small-font-size);
    opacity: 90%;
  }

  .card__body__post__info__head__trend__icon {
    padding: 0.15rem 0.3rem;
    border-radius: 50%;
    background: #0e2828;
  }

  .card__body__post__info__head__trend__count {
    padding: 0.15rem 0.5rem;
  }

  .card__body__post__info__head__time {
    font-size: var(--small-font-size);
    color: var(--text-accent);
  }
</style>
<!----------------------------------------------------------------->
