import getAirstackClientHelperUtil from "../../utils/helpers/get-airstack-client.helper.util";
import checkHandleXmtpEnabledAirstackQueryGraphql from "../../graphql/airstack-query/check-handle-xmtp-enabled.airstack-query.graphql";

export const checkHandleXmtpEnabledAirstackService = async (handle: string) => {
  return await getAirstackClientHelperUtil.request(
    checkHandleXmtpEnabledAirstackQueryGraphql,
    { identity: `${handle}.lens` }
  );
};
