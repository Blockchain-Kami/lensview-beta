import { readContract } from "@wagmi/core";
import { LENSVIEW_TIPPING_ADDRESS } from "../../config/app-constants.config";
import { tokenAddress } from "../../config/app-constants.config";
import { wagmiConfig } from "../web3modal.util";
import LENSVIEW_TIPPING_ABI from "../../abis/contracts/tip/tip.contract.abi.json";

export const hasAmountApprovedGetContractTipsUtil = async (
  selectedToken: keyof typeof tokenAddress,
  fromAddress: `0x${string}`,
  enteredAmount: number
) => {
  try {
    const tokenContractAddress: `0x${string}` = tokenAddress[selectedToken];
    const approvedTokenAmount = await readContract(wagmiConfig, {
      abi: LENSVIEW_TIPPING_ABI,
      address: LENSVIEW_TIPPING_ADDRESS,
      functionName: "checkAllowance",
      args: [tokenContractAddress, fromAddress],
      account: fromAddress
    });
    console.log(
      "Return",
      Number(approvedTokenAmount) / 10 ** 18 >= enteredAmount
    );
    return Number(approvedTokenAmount) / 10 ** 18 >= enteredAmount;
  } catch (error) {
    console.log("Error occurred while checking allowance", error);
    return false;
  }
};
