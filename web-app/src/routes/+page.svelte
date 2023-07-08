<script lang="ts">

import Icon from "$lib/Icon.svelte";
import {modeComment, redirect, thumbDownAlt, thumbUpAlt, trendingUp} from "../utils/frontend/appIcon";
</script>


<!----------------------------- HTML ----------------------------->
<section>
    <div class="card">
        <div class="card__image" style="background-image: url('https://bafybeidu23cshcsrg4vbcdsk47uvqtahyzlbkgnksv5wvpnzetfjpa6bxm.ipfs.w3s.link/image.jpg')">
        </div>
        <div class="CenterRowFlex card__info">
            <div class="CenterRowFlex card__info__reaction">
                <div class="CenterRowFlex card__info__reaction__val">
                    <Icon d={thumbUpAlt}/>4
                </div>
                <div class="card__info__reaction__vertical-line"></div>
                <div class="CenterRowFlex card__info__reaction__val">
                    <Icon d={thumbDownAlt}/> 2
                </div>
            </div>
            <div class="CenterColumnFlex card__info__content">
                <div class="CenterRowFlex card__info__content__link">
                    <Icon d={redirect}/>{"fireship.io/lessons/"}...
                </div>
                <div class="card__info__content__time">
                    8 hours ago
                </div>
            </div>
        </div>
        <div class="CenterRowFlex card__post">
            <div class="card__post__user-pic">
                <img src="https://cdn.stamp.fyi/avatar/eth:0xbffce813b6c14d8659057dd3111d3f83cee271b8?s=300" alt="avatar">
            </div>
            <div class="card__post__info">
                <div class="CenterRowFlex card__post__info__head">
                    <div class="card__post__info__head__username">
                        naruto.lens
                    </div>
                    <div class="CenterRowFlex card__post__info__head__trend">
                        <div class="card__post__info__head__trend__icon">
                            <Icon d={trendingUp}/>
                        </div>
                        <div class="card__post__info__head__trend__count">
                            7
                        </div>
                    </div>
                    <div class="card__post__info__head__time">
                        15 minutes ago
                    </div>
                </div>
                <div class="card__post__info__body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi laboriosam minima neque nisi omnis pariatur provident, totam ut.
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card__image" style="background-image: url('https://bafybeidu23cshcsrg4vbcdsk47uvqtahyzlbkgnksv5wvpnzetfjpa6bxm.ipfs.w3s.link/image.jpg')">
            <div class="CenterRowFlex card__image__posts-count">
               <Icon d={modeComment}/>
                4
            </div>
        </div>
        <div class="CenterRowFlex card__info">
            <div class="CenterRowFlex card__info__reaction">
                <div class="CenterRowFlex card__info__reaction__val">
                    <Icon d={thumbUpAlt}/> 4
                </div>
                <div class="card__info__reaction__vertical-line"></div>
                <div class="CenterRowFlex card__info__reaction__val">
                    <Icon d={thumbDownAlt}/> 2
                </div>
            </div>
            <div class="CenterColumnFlex card__info__content">
                <div class="CenterRowFlex card__info__content__link">
                    <Icon d={redirect}/>{"fireship.io/lessons/"}...
                </div>
                <div class="card__info__content__time">
                    8 hours ago
                </div>
            </div>
        </div>
        <div class="CenterRowFlex card__post">
            <div class="card__post__user-pic">
                <img src="https://cdn.stamp.fyi/avatar/eth:0xbffce813b6c14d8659057dd3111d3f83cee271b8?s=300" alt="avatar">
            </div>
            <div class="card__post__info">
                <div class="CenterRowFlex card__post__info__head">
                    <div class="card__post__info__head__username">
                        naruto.lens
                    </div>
                    <div class="CenterRowFlex card__post__info__head__trend">
                        <div class="card__post__info__head__trend__icon">
                            <Icon d={trendingUp}/>
                        </div>
                        <div class="card__post__info__head__trend__count">
                            7
                        </div>
                    </div>
                    <div class="card__post__info__head__time">
                        15 minutes ago
                    </div>
                </div>
                <div class="card__post__info__body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi laboriosam minima neque nisi omnis pariatur provident, totam ut.
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card__image" style="background-image: url('https://bafybeidu23cshcsrg4vbcdsk47uvqtahyzlbkgnksv5wvpnzetfjpa6bxm.ipfs.w3s.link/image.jpg')">
        </div>
        <div class="CenterRowFlex card__info">
            <div class="CenterRowFlex card__info__reaction">
                <div class="CenterRowFlex card__info__reaction__val">
                    <Icon d={thumbUpAlt}/>4
                </div>
                <div class="card__info__reaction__vertical-line"></div>
                <div class="CenterRowFlex card__info__reaction__val">
                    <Icon d={thumbDownAlt}/> 2
                </div>
            </div>
            <div class="CenterColumnFlex card__info__content">
                <div class="CenterRowFlex card__info__content__link">
                    <Icon d={redirect}/>{"fireship.io/lessons/"}...
                </div>
                <div class="card__info__content__time">
                    8 hours ago
                </div>
            </div>
        </div>
        <div class="CenterRowFlex card__post">
            <div class="card__post__user-pic">
                <img src="https://cdn.stamp.fyi/avatar/eth:0xbffce813b6c14d8659057dd3111d3f83cee271b8?s=300" alt="avatar">
            </div>
            <div class="card__post__info">
                <div class="CenterRowFlex card__post__info__head">
                    <div class="card__post__info__head__username">
                        naruto.lens
                    </div>
                    <div class="CenterRowFlex card__post__info__head__trend">
                        <div class="card__post__info__head__trend__icon">
                            <Icon d={trendingUp}/>
                        </div>
                        <div class="card__post__info__head__trend__count">
                            7
                        </div>
                    </div>
                    <div class="card__post__info__head__time">
                        15 minutes ago
                    </div>
                </div>
                <div class="card__post__info__body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi laboriosam minima neque nisi omnis pariatur provident, totam ut.
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card__image" style="background-image: url('https://bafybeidu23cshcsrg4vbcdsk47uvqtahyzlbkgnksv5wvpnzetfjpa6bxm.ipfs.w3s.link/image.jpg')">
        </div>
        <div class="CenterRowFlex card__info">
            <div class="CenterRowFlex card__info__reaction">
                <div class="CenterRowFlex card__info__reaction__val">
                    <Icon d={thumbUpAlt}/>4
                </div>
                <div class="card__info__reaction__vertical-line"></div>
                <div class="CenterRowFlex card__info__reaction__val">
                    <Icon d={thumbDownAlt}/> 2
                </div>
            </div>
            <div class="CenterColumnFlex card__info__content">
                <div class="CenterRowFlex card__info__content__link">
                    <Icon d={redirect}/>{"fireship.io/lessons/"}...
                </div>
                <div class="card__info__content__time">
                    8 hours ago
                </div>
            </div>
        </div>
        <div class="CenterRowFlex card__post">
            <div class="card__post__user-pic">
                <img src="https://cdn.stamp.fyi/avatar/eth:0xbffce813b6c14d8659057dd3111d3f83cee271b8?s=300" alt="avatar">
            </div>
            <div class="card__post__info">
                <div class="CenterRowFlex card__post__info__head">
                    <div class="card__post__info__head__username">
                        naruto.lens
                    </div>
                    <div class="CenterRowFlex card__post__info__head__trend">
                        <div class="card__post__info__head__trend__icon">
                            <Icon d={trendingUp}/>
                        </div>
                        <div class="card__post__info__head__trend__count">
                            7
                        </div>
                    </div>
                    <div class="card__post__info__head__time">
                        15 minutes ago
                    </div>
                </div>
                <div class="card__post__info__body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi laboriosam minima neque nisi omnis pariatur provident, totam ut.
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card__image" style="background-image: url('https://bafybeidu23cshcsrg4vbcdsk47uvqtahyzlbkgnksv5wvpnzetfjpa6bxm.ipfs.w3s.link/image.jpg')">
        </div>
        <div class="CenterRowFlex card__info">
            <div class="CenterRowFlex card__info__reaction">
                <div class="CenterRowFlex card__info__reaction__val">
                    <Icon d={thumbUpAlt}/>4
                </div>
                <div class="card__info__reaction__vertical-line"></div>
                <div class="CenterRowFlex card__info__reaction__val">
                    <Icon d={thumbDownAlt}/> 2
                </div>
            </div>
            <div class="CenterColumnFlex card__info__content">
                <div class="CenterRowFlex card__info__content__link">
                    <Icon d={redirect}/>{"fireship.io/lessons/"}...
                </div>
                <div class="card__info__content__time">
                    8 hours ago
                </div>
            </div>
        </div>
        <div class="CenterRowFlex card__post">
            <div class="card__post__user-pic">
                <img src="https://cdn.stamp.fyi/avatar/eth:0xbffce813b6c14d8659057dd3111d3f83cee271b8?s=300" alt="avatar">
            </div>
            <div class="card__post__info">
                <div class="CenterRowFlex card__post__info__head">
                    <div class="card__post__info__head__username">
                        naruto.lens
                    </div>
                    <div class="CenterRowFlex card__post__info__head__trend">
                        <div class="card__post__info__head__trend__icon">
                            <Icon d={trendingUp}/>
                        </div>
                        <div class="card__post__info__head__trend__count">
                            7
                        </div>
                    </div>
                    <div class="card__post__info__head__time">
                        15 minutes ago
                    </div>
                </div>
                <div class="card__post__info__body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi laboriosam minima neque nisi omnis pariatur provident, totam ut.
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card__image" style="background-image: url('https://bafybeidu23cshcsrg4vbcdsk47uvqtahyzlbkgnksv5wvpnzetfjpa6bxm.ipfs.w3s.link/image.jpg')">
        </div>
        <div class="CenterRowFlex card__info">
            <div class="CenterRowFlex card__info__reaction">
                <div class="CenterRowFlex card__info__reaction__val">
                    <Icon d={thumbUpAlt}/>4
                </div>
                <div class="card__info__reaction__vertical-line"></div>
                <div class="CenterRowFlex card__info__reaction__val">
                    <Icon d={thumbDownAlt}/> 2
                </div>
            </div>
            <div class="CenterColumnFlex card__info__content">
                <div class="CenterRowFlex card__info__content__link">
                    <Icon d={redirect}/>{"fireship.io/lessons/"}...
                </div>
                <div class="card__info__content__time">
                    8 hours ago
                </div>
            </div>
        </div>
        <div class="CenterRowFlex card__post">
            <div class="card__post__user-pic">
                <img src="https://cdn.stamp.fyi/avatar/eth:0xbffce813b6c14d8659057dd3111d3f83cee271b8?s=300" alt="avatar">
            </div>
            <div class="card__post__info">
                <div class="CenterRowFlex card__post__info__head">
                    <div class="card__post__info__head__username">
                        naruto.lens
                    </div>
                    <div class="CenterRowFlex card__post__info__head__trend">
                        <div class="card__post__info__head__trend__icon">
                            <Icon d={trendingUp}/>
                        </div>
                        <div class="card__post__info__head__trend__count">
                            7
                        </div>
                    </div>
                    <div class="card__post__info__head__time">
                        15 minutes ago
                    </div>
                </div>
                <div class="card__post__info__body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi laboriosam minima neque nisi omnis pariatur provident, totam ut.
                </div>
            </div>
        </div>
    </div>
</section>
<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  section{
    display: grid;
    gap: 3rem;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    padding: 3rem 5rem;
    justify-items: center;
  }

    .card{
      width: 27rem;
      filter: drop-shadow(9.600000381469727px 22.80000114440918px 37.20000076293945px rgba(0, 0, 0, 0.26));
    }

    .card__image{
      width: 100%;
      height: 17rem;
      background-color: #000;
      overflow: hidden;
      padding-bottom: 50%; /* Adjust this value to control the aspect ratio */
      background-size: cover;
      border-radius: 10.8px;
    }

    .card__image__posts-count{
      gap: 0.5rem;
      padding: 0.5rem;
        background: #ffffff45;
    }

    .card__info{
        width: 100%;
        background: #124045;
        padding: 1rem;
        justify-content: space-between;
    }

    .card__info__reaction{
      padding: 0.7rem;
      background: #0e2829;
      gap: 0.5rem;
      border-radius: 6.8px;
      opacity: 70%;
    }

    .card__info__reaction__val{
      gap: 0.4rem;
    }

    .card__info__reaction__vertical-line{
      border-left: 2px solid #ffffff45;
      height: 21px;
    }

    .card__info__content{
      align-items: flex-end;
      gap: 0.3rem;
    }

    .card__info__content__link{
      gap: 0.3rem;
    }

    .card__info__content__time{
      font-size: var(--small-font-size);
      color: var(--text-accent);
    }

    .card__post{
      background: #185359;
      border-radius: 0 0 10.8px 10.8px;
      padding: 1.2rem;
      gap: 0.8rem;
    }

    .card__post__user-pic{
      margin-bottom: auto;
    }

    .card__post__user-pic img{
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 2px solid #32F9FF;
  }

    .card__post__info__head{
      gap: 0.5rem;
      justify-content: flex-start;
      margin-bottom: 1rem;
    }

    .card__post__info__head__username{
      padding: 0.5rem;
      background: #113232;
      border-radius: 5px;
      color: #32F9FF;
    }

    .card__post__info__head__trend{
      background: #113232;
      border-radius: 14px;
      font-size: var(--small-font-size);
      opacity: 90%;
    }

    .card__post__info__head__trend__icon{
      padding: 0.25rem;
      border-radius: 50%;
      background: #0e2828;
    }

    .card__post__info__head__trend__count{
      padding: 0.25rem 0.5rem;
    }

    .card__post__info__head__time{
      font-size: var(--small-font-size);
      color: var(--text-accent);
      margin-left: auto;
    }

    .card__post__info__body{
      line-height: 1.3em;
    }

</style>
<!----------------------------------------------------------------->
