<script lang="ts">
  import { wallet, error, flightTakeoff } from "../utils/app-icon.util";
  import { backInOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import { close } from "../utils/app-icon.util.js";
  import {
    polygonLogo,
    baseLogo,
    lineaLogo
  } from "../lib/assets/base64/network-logo.base64.asset.json";
  import Icon from "$lib/Icon.svelte";
  import { getAccount } from "@wagmi/core";
  import { wagmiConfig } from "../utils/web3modal.util";
  import web3Modal from "../utils/web3modal.util";
  import {
    networIds,
    networks,
    baseTokenSymbol,
    polygonTokenSymbol,
    lineaTokenSymbol
  } from "../config/app-constants.config";
  import { getNotificationsContext } from "svelte-notifications";
  import { getTokenBalanceGetContractTipsUtil } from "../utils/tips/get-contract.tips.util";
  import { hasAmountApprovedGetContractTipsUtil } from "../utils/tips/get-contract.tips.util";
  import { approveTokenWriteContractUtil } from "../utils/tips/write-contract.tips.util";
  import { tipTokenWriteContractUtil } from "../utils/tips/write-contract.tips.util";
  import { onMount } from "svelte";

  import { switchChain } from "@wagmi/core";

  const { addNotification } = getNotificationsContext();
  let dialog: HTMLDialogElement;

  export let showTippingModal: boolean;
  export let toAddress: string;
  export let toHandle: string;
  let fromAddress: `0x${string}`;
  let selectedToken:
    | keyof typeof baseTokenSymbol
    | keyof typeof polygonTokenSymbol
    | keyof typeof lineaTokenSymbol;
  let selectedNetwork = networks.BASE;
  let userEnteredAmount: number;
  let isAmountInvalid = true;
  let tippingSuccess = false;
  let isSendingTip = false;
  let AmountInvalidReason = "";
  let buttonValue = "Send";
  $: if (dialog && showTippingModal) dialog.showModal();

  const networkTokens = {
    POLYGON: [
      { value: "BONSAI", label: "BONSAI", balance: 0 },
      { value: "POINTLESS", label: "POINTLESS", balance: 0 },
      { value: "USDT", label: "USDT", balance: 0 }
    ],
    BASE: [
      { value: "BONSAI", label: "BONSAI", balance: 0 },
      { value: "TOBY", label: "TOBY", balance: 0 },
      { value: "TOSHI", label: "TOSHI", balance: 0 }
      // { value: "USDT", label: "USDT" },
      // { value: "USDC", label: "USDC" }
    ],
    LINEA: [
      { value: "FOXY", label: "FOXY", balance: 0 },
      { value: "USDC", label: "USDC", balance: 0 },
      { value: "USDT", label: "USDT", balance: 0 }
    ]
  };

  onMount(() => {
    fromAddress = getAccount(wagmiConfig).address;
  });

  const checkAmountIsValid = async (amount: number) => {
    buttonValue = "...";
    const enteredAmount = Number(amount);
    console.log("enteredAmount", enteredAmount);
    if (enteredAmount >= 0.00001) {
      isAmountInvalid = false;
      AmountInvalidReason = "";
      if (
        await hasAmountApprovedGetContractTipsUtil(
          selectedNetwork,
          selectedToken,
          fromAddress,
          enteredAmount
        )
      ) {
        buttonValue = "Send";
      } else {
        buttonValue = "Approve";
      }
      return true;
    } else if (enteredAmount === 0) {
      isAmountInvalid = true;
      AmountInvalidReason = "";
    } else if (enteredAmount < 0.00001) {
      isAmountInvalid = true;
      AmountInvalidReason = "Minimum Tip Amount is 0.000001";
    } else if (isNaN(enteredAmount)) {
      isAmountInvalid = true;
      AmountInvalidReason = "";
      buttonValue = "Send";
    } else {
      isAmountInvalid = true;
      AmountInvalidReason = "Please enter a valid amount";
    }
    return false;
  };

  const clickButtonEvent = async () => {
    try {
      await switchChain(wagmiConfig, { chainId: networIds[selectedNetwork] });
      userEnteredAmount = Number(userEnteredAmount);
      if (buttonValue === "Approve") {
        await approve(userEnteredAmount);
      } else if (buttonValue === "Send") {
        await sendTip(userEnteredAmount);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const approve = async (amount) => {
    try {
      isSendingTip = true;
      buttonValue = "Approving...";
      const transactionStatus = await approveTokenWriteContractUtil(
        selectedNetwork,
        selectedToken,
        fromAddress,
        amount
      );
      await checkAmountIsValid(amount);
      if (transactionStatus.success && transactionStatus.result) {
        addNotificationEvent(
          "Tokens Approved",
          `Your tip to ready to be sent to @${toHandle}`,
          flightTakeoff,
          2000
        );
      } else {
        addNotificationEvent(
          "Failed To Approve",
          transactionStatus.error,
          error,
          2000
        );
      }
      isSendingTip = false;
      return;
    } catch (e) {
      console.log("Error while approving", e);
      addNotificationEvent("Failed To Approve", e.message, error, 2000);
    }
  };

  const sendTip = async (amount) => {
    if (!(await checkAmountIsValid(userEnteredAmount))) {
      return;
    }
    buttonValue = "Sending...";
    isSendingTip = true;
    let tipDetails;
    let index = getTokenIndex(selectedToken);
    if (amount > networkTokens[selectedNetwork][index].balance) {
      sendInsufficientBalanceEvent();
      return;
    }
    tipDetails = await tipTokenWriteContractUtil(
      selectedNetwork,
      selectedToken,
      toAddress,
      amount,
      123,
      234,
      456,
      fromAddress
    );

    if (tipDetails.success && !tipDetails.error) {
      userEnteredAmount = null;
      isSendingTip = false;
      tippingSuccess = true;
      return;
    } else {
      dialog.close();
      addNotificationEvent(
        "Error while sending tip",
        "Failed to send tip, please try again",
        error,
        4000
      );
      isSendingTip = false;
      buttonValue = "Send";
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

  const sendInsufficientBalanceEvent = () => {
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
  };

  const setBalance = (token, balance) => {
    try {
      // console.log("checkAmountIsValid(userEnteredAmount)", checkAmountIsValid(userEnteredAmount));
      if (checkAmountIsValid(userEnteredAmount)) {
        let index = getTokenIndex(token);
        networkTokens[selectedNetwork][index].balance = balance;
        return Math.round(balance * 100) / 100;
      }
    } catch (error) {
      console.log("Error while fetching balance: ", error);
      return 0;
    }
  };

  const getTokenIndex = (token) => {
    return networkTokens[selectedNetwork].findIndex(
      (val) => val.label === token
    );
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:close={() => {
    showTippingModal = false;
    tippingSuccess = false;
    return showTippingModal;
  }}
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
                Your contributions help our viewers keep doing what they love
                most!
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

          <div class="network-selection">
            <button
              type="button"
              class:selected={selectedNetwork === networks.BASE}
              on:click={() => {
                selectedNetwork = networks.BASE;
                selectedToken = baseTokenSymbol.BONSAI;
              }}
            >
              <img src={baseLogo} alt="Base Logo" />
              Base
            </button>
            <button
              type="button"
              class:selected={selectedNetwork === networks.POLYGON}
              on:click={() => {
                selectedNetwork = networks.POLYGON;
                selectedToken = polygonTokenSymbol.BONSAI;
              }}
            >
              <img src={polygonLogo} alt="Polygon Logo" />
              Polygon
            </button>

            <button
              type="button"
              class:selected={selectedNetwork === networks.LINEA}
              on:click={() => {
                selectedNetwork = networks.LINEA;
                selectedToken = lineaTokenSymbol.FOXY;
              }}
            >
              <img src={lineaLogo} alt="Linea Logo" />
              Linea
            </button>
          </div>
          <label for="tokens"> Select A Token </label>
          <div>
            <select name="tokens" id="tokens" bind:value={selectedToken}>
              {#each networkTokens[selectedNetwork] as token}
                <option value={token.value}>{token.label}</option>
              {/each}
            </select>
            <div id="token-info">
              {#await getTokenBalanceGetContractTipsUtil(selectedNetwork, selectedToken, fromAddress)}
                <span class="fetching">Fetching token balance...</span>
              {:then amount}
                <span class="available">
                  Available: {setBalance(selectedToken, amount)}
                </span>
              {:catch _error}
                <span class="error">Failed to load balance</span>
              {/await}
            </div>
          </div>
        </div>
        <div class="body">
          <div class="input-box body__url">
            <div class="input-box__label body__url__label">Amount</div>
            <div class="input-box__input body__url__input">
              <input
                bind:value={userEnteredAmount}
                on:input={() => checkAmountIsValid(userEnteredAmount)}
                type="number"
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
            <button
              class="btn"
              on:click={clickButtonEvent}
              disabled={isAmountInvalid || isSendingTip}
            >
              {buttonValue}
            </button>
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

  .network-selection button {
    border: none;
    background-color: #1f4045;
    padding: 10px;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    opacity: 50%;
  }

  .network-selection img {
    height: 20px;
    width: 20px;
    margin-right: 8px;
  }

  .network-selection button.selected {
    background-color: #2b5a60; /* Highlight selected button */
    color: white;
    cursor: default;
    opacity: 100%;
  }
</style>
