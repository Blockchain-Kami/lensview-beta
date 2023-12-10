<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import { close } from "../utils/app-icon.util";
  import { fly } from "svelte/transition";
  import { backInOut } from "svelte/easing";
  import { isLoggedInUserStore } from "../stores/user/is-logged-in.user.store";
  import Login from "./Login.svelte";

  export let showMessageModal: boolean;
  let dialog: HTMLDialogElement;
  $: if (dialog && showMessageModal) dialog.showModal();
  export let displayName: string;
  export let profilePicUrl: string;

  let showLoginModal = false;
  let onLoginIntialization: () => Promise<void>;
  let userEnteredContent = "";

  const openLoginModal = () => {
    showLoginModal = true;
    onLoginIntialization();
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:close={() => (showMessageModal = false)}
  on:click|self={() => dialog.close()}
>
  {#if showMessageModal}
    <main
      on:click|stopPropagation
      transition:fly={{ y: 40, easing: backInOut, duration: 700 }}
    >
      <div class="CenterRowFlex head">
        <div class="CenterRowFlex head__user">
          <div class="head__user__pic">
            <img src={profilePicUrl} alt="avatar" />
          </div>
          <div class="head__user__name">
            {displayName}
          </div>
        </div>
        <div class="head__close-btn">
          <button on:click={() => dialog.close()}>
            <Icon d={close} />
          </button>
        </div>
      </div>

      {#if $isLoggedInUserStore}
        <div class="body">
          <div class="CenterColumnFlex body__msg-area">
              <div class="body__msg-area__placeholder">
                  You could always start with a hi!
              </div>
          </div>
          <div class="CenterRowFlex body__msg-box">
                  <div
                          contenteditable="true"
                          placeholder="Type your message"
                          class="body__msg-box__input"
                          id="editableDiv"
                          bind:innerHTML={userEnteredContent}
                  />
              <div class="body__msg-box__button">
                  <button class="btn">Send</button>
              </div>
          </div>
        </div>
      {:else}
        <div class="body">
          <div class="CenterRowFlex body__login__msg">
            Please login with Lens to start messaging
          </div>
        </div>
        <div class="line" />
        <div class="footer">
          <button on:click={openLoginModal} class="btn footer-login-btn"> Login </button>
        </div>
      {/if}
    </main>
  {/if}
</dialog>

<Login bind:showLoginModal bind:onLoginIntialization />

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    background: #1e4748 fixed;
    color: var(--text);
    min-width: 21rem;
    border-radius: 10px;
  }

  .head {
    justify-content: space-between;
    background: #18393a;
    padding: 0.4rem 1rem;
    color: var(--primary);
    border-radius: 10px 10px 0 0;
  }

  .body {
    padding: 1rem;
    min-width: 25rem;
  }

  .body__msg-area{
    width: 35rem;
    height: 15rem;
  }

  .body__msg-area__placeholder{
    font-size: var(--medium-font-size);
    font-weight: var(--medium-font-weight);
    color:var(--text-accent);
  }

  .body__msg-box{
    padding: 0.5rem;
    gap: 1rem;
    background-color: #1b393a;
    border-radius: 10px;
  }

  .body__msg-box__input{
    content: attr(placeholder);
    width: 100%;
    border-radius: 0.75rem;
    background: linear-gradient(
                    172deg,
                    rgba(50, 249, 255, 0.15) 33.55%,
                    rgba(236, 254, 255, 0.15) 100%
    );
    padding: 1rem;
    overflow-wrap: anywhere;
  }

  .body__login__msg{
    padding: 1rem;
  }

  .head__user{
    gap: 1rem;
  }

  .head__user__pic img{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    //border: 2px solid #32f9ff;
  }

  .head__user__name{
    font-size: var(--medium-font-size);
    color: white;
  }

  .line {
    border: 0.5px solid #4b6c6d;
    width: 90%;
    margin-top: auto;
    align-self: center;
  }

  .footer {
    padding: 1rem;
  }

  .footer-login-btn{
    margin-left: auto;
  }
</style>
