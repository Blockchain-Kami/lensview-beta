import getAirstackClientHelperUtil from "../../utils/helpers/get-airstack-client.helper.util";
import SocialOverlapAirstackQueryGraphql from "../../graphql/airstack-query/social-overlap.airstack-query.graphql";

export const getSocialOverlapAirstackService = async (
  handle1: string,
  handle2: string
) => {
  const request = {
    identity1: `${handle1}.lens`,
    identity2: `${handle2}.lens`
  };
  return await getAirstackClientHelperUtil.request(
    SocialOverlapAirstackQueryGraphql,
    request
  );
};
