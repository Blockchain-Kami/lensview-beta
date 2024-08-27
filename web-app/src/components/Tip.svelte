<script lang="ts">
  import { cross, wallet } from "../utils/app-icon.util";
  import { backInOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import { close } from "../utils/app-icon.util.js";
  import Icon from "$lib/Icon.svelte";
  import { getAccount } from "@wagmi/core";
  import { wagmiConfig } from "../utils/web3modal.util";
  import web3Modal from "../utils/web3modal.util";
  import { tokenSymbol } from "../config/app-constants.config";
  import { getNotificationsContext } from "svelte-notifications";
  import { sendTipBonsai, sendTipMatic } from "../utils/tips/send.tip";
  import {
    getTokenBalanceMatic,
    getTokenBalanceBonsai
  } from "../utils/tips/get-token-balance.tip";
  import { onMount } from "svelte";

  const { addNotification } = getNotificationsContext();
  let dialog: HTMLDialogElement;

  export let showTippingModal: boolean;
  export let toAddress: string;
  export let toHandle: string;
  let maticBalance = 0;
  let bonsaiBalance = 0;
  let fromAddress: `0x${string}`;
  let selectedToken: string;
  let userEnteredAmount = "";
  let isAmountInvalid = true;
  let tippingSuccess = false;
  let isSendingTip = false;
  let AmountInvalidReason = "";
  $: if (dialog && showTippingModal) dialog.showModal();

  onMount(() => {
    fromAddress = getAccount(wagmiConfig).address;
  });

  const checkAmountIsValid = () => {
    if (userEnteredAmount.length === 0) {
      isAmountInvalid = false;
      // urlInvalidReason = "URL cannot be empty";
      return;
    }

    const indexOfSpace = userEnteredAmount.indexOf(" ");
    if (indexOfSpace !== -1) {
      isAmountInvalid = true;
      AmountInvalidReason = "Amount is not specified properly";
      return;
    }

    if (Number(userEnteredAmount) <= 0.000000000000000001) {
      console.log("Entered amount", userEnteredAmount);
      isAmountInvalid = true;
      AmountInvalidReason = "Amount cannot be negative or too small";
      console.log(AmountInvalidReason);
      return;
    }

    if (/^-?\d+$/.test(userEnteredAmount)) {
      isAmountInvalid = false;
      return;
    }
    isAmountInvalid = false;
    return;
  };

  const sendTip = async () => {
    isSendingTip = true;
    let tipDetails;
    if (selectedToken == tokenSymbol.BONSAI) {
      console.log("userEnteredAmount", userEnteredAmount);
      console.log("bonsaiBalance", bonsaiBalance);
      if (userEnteredAmount > bonsaiBalance) {
        addNotification({
          position: "top-right",
          heading: "Insufficient Balance",
          description:
            "You do not have the required balance. Please buy some tokens before sending a tip",
          type: wallet,
          removeAfter: 4000
        });
        setTimeout(async () => {
          await web3Modal.open();
        }, 2000);
        dialog.close();
        tippingSuccess = false;
        isSendingTip = false;
        return;
      }
      tipDetails = await sendTipBonsai(
        fromAddress,
        toAddress,
        userEnteredAmount
      );
      if (tipDetails.success) {
        userEnteredAmount = "";
        isSendingTip = false;
        tippingSuccess = true;
        setTimeout(() => {
          dialog.close();
        }, 5000);
        return;
      } else {
        dialog.close();
        addNotification({
          position: "top-right",
          heading: "Error while sending tip",
          description: "Failed to send tip, please try again",
          type: cross,
          removeAfter: 4000
        });
        isSendingTip = false;
        return;
      }
    } else if (selectedToken == tokenSymbol.MATIC) {
      if (userEnteredAmount > maticBalance) {
        addNotification({
          position: "top-right",
          heading: "Insufficient Balance",
          description:
            "You do not have the required balance. Please buy some tokens before sending a tip",
          type: wallet,
          removeAfter: 4000
        });
        setTimeout(async () => {
          await web3Modal.open();
        }, 2000);
        dialog.close();
        tippingSuccess = false;
        isSendingTip = false;
        return;
      }
      tipDetails = await sendTipMatic(toAddress, userEnteredAmount);
      if (tipDetails.success) {
        userEnteredAmount = "";
        isSendingTip = false;
        tippingSuccess = true;
        setTimeout(() => {
          dialog.close();
        }, 5000);
        return;
      } else {
        dialog.close();
        addNotification({
          position: "top-right",
          heading: "Error while sending tip",
          description: "Failed to send tip, please try again",
          type: cross,
          removeAfter: 4000
        });
        isSendingTip = false;
        return;
      }
    }
  };

  const setMaticBalance = (balance) => {
    maticBalance = balance;
    return Math.round(maticBalance * 100) / 100;
  };

  const setBonsaiBalance = (balance) => {
    bonsaiBalance = balance;
    return Math.round(bonsaiBalance * 100) / 100;
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:close={() => (showTippingModal = false)}
  on:click|self={() => dialog.close()}
>
  {#if showTippingModal}
    <main
      on:click|stopPropagation
      transition:fly={{ y: 40, easing: backInOut, duration: 700 }}
    >
      {#if tippingSuccess}
        <div class="CenterRowFlex head">
          <div class="h3 head__title">Tip Sent</div>
          <div class="head__close-btn">
            <button on:click={() => dialog.close()}>
              <Icon d={close} />
            </button>
          </div>
        </div>
        <div class="body">
          <div class="input-box body__url">
            <div class="input-box__label body__url__label">
              <p>Congratulations!! 🥳</p>
              <br />
              <p>
                Your tip <span style="font-weight: bold; color: #23f9ff"
                  >{userEnteredAmount}</span
                >
                was successfully sent to
                <span style="font-weight: bold; color: #23f9ff">{toHandle}</span
                >. Your support means a lot and helps our viewers keep doing
                what they love. We really appreciate it!
              </p>
            </div>
          </div>
        </div>
        <div class="line" />
        <div class="CenterRowFlex footer">
          <div class="footer__left">
            <!--          <button-->
            <!--            class="footer__left__matic"-->
            <!--            on:click={() => (showGetTestMaticModal = true)}-->
            <!--          >-->
            <!--            Get test MATIC-->
            <!--          </button>-->
          </div>
        </div>
      {:else}
        <div class="CenterRowFlex head">
          <div class="h3 head__title">Send A Tip</div>
          <div class="head__close-btn">
            <button on:click={() => dialog.close()}>
              <Icon d={close} />
            </button>
          </div>
        </div>
        <div class="body">
          <p>
            Let your favourite Viewers know how much you appreciate their views
          </p>
          <p>
            You are sending a tip to: <span
              style="font-weight: bold; color: #23f9ff">{toHandle}</span
            >
          </p>
          <label for="tokens"> Select a token </label>
          <div>
            <select
              name="tokens"
              id="tokens"
              style="background: #1f4045"
              bind:value={selectedToken}
            >
              <option value="MATIC"
                >MATIC
                {#await getTokenBalanceMatic(fromAddress)}
                  <span>Fetching token balance...</span>
                {:then data}
                  <span>
                    (Available:
                    {setMaticBalance(data)})
                  </span>
                {:catch _error}
                  <span>Failed to load balace</span>
                {/await}
              </option>
              <option value="BONSAI" selected
                >BONSAI
                {#await getTokenBalanceBonsai(fromAddress)}
                  <span>Fetching token balance...</span>
                {:then data}
                  <span>
                    (Available:
                    {setBonsaiBalance(data)})
                  </span>
                {:catch _error}
                  <span>Failed to load balace</span>
                {/await}
              </option>
            </select>
          </div>
        </div>
        <div class="body">
          <div class="input-box body__url">
            <div class="input-box__label body__url__label">Amount</div>
            <div class="input-box__input body__url__input">
              <input
                bind:value={userEnteredAmount}
                on:input={checkAmountIsValid}
                type="text"
              />
            </div>
            {#if isAmountInvalid}
              <div class="body__url__input__err-msg">
                {AmountInvalidReason}
              </div>
            {/if}
          </div>
        </div>
        <div class="line" />
        <div class="CenterRowFlex footer">
          <div class="footer__left">
            <!--          <button-->
            <!--            class="footer__left__matic"-->
            <!--            on:click={() => (showGetTestMaticModal = true)}-->
            <!--          >-->
            <!--            Get test MATIC-->
            <!--          </button>-->
          </div>
          <div class="CenterRowFlex footer__right">
            {#if !isSendingTip}
              <button
                class="btn"
                on:click={(event) => sendTip(event)}
                disabled={isAmountInvalid}
              >
                Send
              </button>
            {:else}
              <button class="btn" disabled> Sending.. </button>
            {/if}
          </div>
        </div>
      {/if}
    </main>
  {/if}
</dialog>

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
    background: var(--bg-solid-2);
    padding: 1.2rem;
    color: var(--primary);
    border-radius: 10px 10px 0 0;
  }

  .body {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    min-width: 50rem;
    gap: 1rem;
  }

  .input-box {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input-box__label {
    font-size: var(--semi-medium-font-size);
    font-weight: var(--semi-medium-font-weight);
  }

  .body__url__input input:focus {
    border: 2px solid var(--primary);
  }

  .body__url__input__err-msg {
    color: red;
    font-size: var(--small-font-size);
  }

  .line {
    border: 0.5px solid #4b6c6d;
    width: 90%;
    margin-top: auto;
    align-self: center;
  }

  .footer {
    justify-content: space-between;
    padding: 1rem;
  }

  .footer__right {
    gap: 1rem;
  }

  @media only screen and (max-width: 1024px) {
    .body {
      min-width: 30rem;
    }
  }
</style>
