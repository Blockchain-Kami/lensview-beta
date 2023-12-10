import { checkHandleXmtpEnabledAirstackService } from "../../services/airstack/check-handle-xmtp-enabled.airstack.service";

export const checkHandleIsXMTPEnabledUtil = async (
  handle: string
): Promise<boolean> => {
  const response = await checkHandleXmtpEnabledAirstackService(handle);
  return response.Wallet?.xmtp[0]?.isXMTPEnabled;
};
