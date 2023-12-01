import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import createOnchainCommentTypedDataMutationGraphql from "../../graphql/mutations/create-onchain-comment-typed-data.mutation.graphql";
import type { OnchainCommentRequest } from "../../gql/graphql";

const createOnchainCommentTypedDataLensService = async (
  request: OnchainCommentRequest
) => {
  console.log("createOnchainCommentTypedDataLensService request", request);
  const client = await authenticatedClientAuthenticationUtil();
  const result = await client
    .mutation(createOnchainCommentTypedDataMutationGraphql, { request })
    .toPromise();

  return result.data?.createOnchainCommentTypedData;
};

export default createOnchainCommentTypedDataLensService;
