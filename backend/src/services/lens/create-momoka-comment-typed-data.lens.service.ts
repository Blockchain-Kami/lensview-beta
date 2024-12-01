import type { MomokaCommentRequest } from "../../gql/graphql.js";

import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util.js";

import CreateMomokaCommentTypedDataMutationGraphql from "../../graphql/mutations/create-momoka-comment-typed-data.mutation.graphql.js";

const createMomokaCommentTypedDataLensService = async (
  request: MomokaCommentRequest
) => {
  const authenticateClient = await getAuthenticatedClientAuthenticationUtil();
  const result = await authenticateClient
    .mutation(CreateMomokaCommentTypedDataMutationGraphql, {
      request
    })
    .toPromise();

  return result.data!.createMomokaCommentTypedData;
};

export default createMomokaCommentTypedDataLensService;
