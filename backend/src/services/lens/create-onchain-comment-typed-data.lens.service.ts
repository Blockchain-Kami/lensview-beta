import { getAuthenticatedClientUtil } from "../../utils/authentication/get-authenticated-client.authentication.util";
import createOnchainCommentTypedDataMutationGraphql from "../../graphql/mutations/create-onchain-comment-typed-data.mutation.graphql";
import type { OnchainCommentRequest } from "../../gql/graphql";

const createOnchainCommentTypedDataService = async (
  request: OnchainCommentRequest
) => {
  console.log("createOnchainCommentTypedDataLensService request", request);
  const client = await getAuthenticatedClientUtil();
  const result = await client
    .mutation(createOnchainCommentTypedDataMutationGraphql, { request })
    .toPromise();

  return result.data?.createOnchainCommentTypedData;
};

export default createOnchainCommentTypedDataService;
