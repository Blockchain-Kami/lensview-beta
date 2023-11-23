import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import createOnchainCommentTypedDataMutationGraphql from "../../graphql/mutations/create-onchain-comment-typed-data.mutation.graphql";
import type { OnchainCommentRequest } from "../../gql/graphql";

const createOnchainCommentTypedDataLensService = async (
  request: OnchainCommentRequest
) => {
  console.log("createOnchainCommentTypedDataLensService request", request);
  const result = await authenticatedClientAuthenticationUtil().mutation(
    createOnchainCommentTypedDataMutationGraphql,
    { request }
  );

  return result.data?.createOnchainCommentTypedData;
};

export default createOnchainCommentTypedDataLensService;
