import createMomokaCommentTypedDataMutationGraphql from "../../graphql/mutations/create-momoka-comment-typed-data.mutation.graphql";
import type { MomokaCommentRequest } from "../../gql/graphql";
import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";

const createMomokaCommentTypedDataLensService = async (
  request: MomokaCommentRequest
) => {
  const result = await authenticatedClientAuthenticationUtil()
    .mutation(createMomokaCommentTypedDataMutationGraphql, { request })
    .toPromise();

  return result.data?.createMomokaCommentTypedData;
};

export default createMomokaCommentTypedDataLensService;
