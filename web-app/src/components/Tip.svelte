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
  import {
    sendTipUtilBonsai,
    sendTipUtilMatic
  } from "../utils/tips/send.tip.util";
  import {
    getTokenBalanceTipUtilMatic,
    getTokenBalanceTipUtilBonsai
  } from "../utils/tips/get-token-balance.tip.util";
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
    if (
      userEnteredAmount.length === 0 ||
      userEnteredAmount.trim().length === 0
    ) {
      isAmountInvalid = true;
      AmountInvalidReason = "";
      return;
    }

    if (Number(userEnteredAmount) <= 0.000001) {
      isAmountInvalid = true;
      AmountInvalidReason = "Minimum Tip Amount is 0.000001";
      return;
    }

    const indexOfSpace = userEnteredAmount.trim().indexOf(" ");
    if (isNaN(Number(userEnteredAmount)) || indexOfSpace > -1) {
      isAmountInvalid = true;
      AmountInvalidReason = "Please enter a valid amount.";
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
    userEnteredAmount = userEnteredAmount.trim();
    isSendingTip = true;
    let tipDetails;
    if (selectedToken == tokenSymbol.BONSAI) {
      if (userEnteredAmount > bonsaiBalance) {
        addNotificationEvent(
          "Insufficient Balance",
          "You do not have the required balance. Please buy some tokens before sending a tip",
          wallet,
          4000
        );
        setTimeout(async () => {
          await web3Modal.open();
        }, 2000);
        dialog.close();
        tippingSuccess = false;
        isSendingTip = false;
        return;
      }
      tipDetails = await sendTipUtilBonsai(
        fromAddress,
        toAddress,
        userEnteredAmount
      );
    } else if (selectedToken == tokenSymbol.MATIC) {
      if (userEnteredAmount > maticBalance) {
        addNotificationEvent(
          "Insufficient Balance",
          "You do not have the required balance. Please buy some tokens before sending a tip",
          wallet,
          4000
        );
        setTimeout(async () => {
          await web3Modal.open();
        }, 2000);
        dialog.close();
        tippingSuccess = false;
        isSendingTip = false;
        return;
      }
      tipDetails = await sendTipUtilMatic(toAddress, userEnteredAmount);
    }
    if (tipDetails.success && !tipDetails.error) {
      userEnteredAmount = "";
      isSendingTip = false;
      tippingSuccess = true;
      setTimeout(() => {
        tippingSuccess = false;
        dialog.close();
      }, 10000);
      return;
    } else {
      dialog.close();
      addNotificationEvent(
        "Error while sending tip",
        "Failed to send tip, please try again",
        cross,
        4000
      );
      isSendingTip = false;
      return;
    }
  };

  const addNotificationEvent = (heading, description, type, removeAfter) => {
    addNotification({
      position: "top-right",
      heading,
      description,
      type,
      removeAfter
    });
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
              <p>
                Your tip was successfully sent to
                <span style="font-weight: bold; color: #23f9ff"
                  >@{toHandle}</span
                >.
              </p>
              <div
                style="height: 80px; font-size: 100px; margin-top: 100px; text-align: center;"
              >
                🎉
              </div>
              <br />
              <p>
                Your contributions help our Viewers to keep doing what they love
                the most!
              </p>
            </div>
          </div>
        </div>
        <div class="line" />
        <div class="CenterRowFlex footer">
          <div class="footer__left" />
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
              style="font-weight: bold; color: #23f9ff">@{toHandle}</span
            >
          </p>
          <label for="tokens"> Select a token </label>
          <div>
            <select name="tokens" id="tokens" bind:value={selectedToken}>
              <option value="MATIC">MATIC</option>
              <option value="BONSAI" selected>BONSAI</option>
            </select>

            <div id="token-info">
              {#if selectedToken === "MATIC"}
                {#await getTokenBalanceTipUtilMatic(fromAddress)}
                  <span class="fetching">Fetching token balance...</span>
                {:then data}
                  <span class="available">
                    Available: {setMaticBalance(data)}
                  </span>
                {:catch _error}
                  <span class="error">Failed to load balance</span>
                {/await}
              {/if}

              {#if selectedToken === "BONSAI"}
                {#await getTokenBalanceTipUtilBonsai(fromAddress)}
                  <span class="fetching">Fetching token balance...</span>
                {:then data}
                  <span class="available">
                    Available: {setBonsaiBalance(data)}
                  </span>
                {:catch _error}
                  <span class="error">Failed to load balance</span>
                {/await}
              {/if}
            </div>
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
          <div class="footer__left" />
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
  /* General Styling */
  select {
    background-color: #1f4045;
    color: #fff;
    font-size: 1rem;
    padding: 0.5em;
    border: none;
    border-radius: 8px;
    appearance: none; /* Remove default arrow */
    width: 100%;
    max-width: 300px; /* Adjust as needed */
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  option {
    background-color: #1f4045;
    color: #fff;
    padding: 0.5em;
  }

  /* Option Hover Effect */
  select:hover {
    background-color: #2b5a60;
  }

  /* Loading and Error Styling */
  .fetching,
  .available,
  .error {
    display: block;
    padding: 0.5em 0;
    font-size: 0.85rem;
    color: #ddd;
  }

  .fetching {
    color: #ffd700; /* Gold color for fetching */
    //margin-left: 225px;
  }

  .available {
    color: #23f9ff; /* Spring green color for available */
    //margin-left: 225px;
  }

  .error {
    color: #ff4500; /* Orange red color for error */
    //margin-left: 225px;
  }
</style>
