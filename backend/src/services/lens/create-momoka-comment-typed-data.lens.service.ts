import type { MomokaCommentRequest } from "../../gql/graphql.js";

import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util.js";

import createMomokaCommentTypedDataMutationGraphql from "../../graphql/mutations/create-momoka-comment-typed-data.mutation.graphql.js";

const createMomokaCommentTypedDataLensService = async (
  request: MomokaCommentRequest
) => {
  const authenticateClient = await getAuthenticatedClientAuthenticationUtil();
  const result = await authenticateClient
    .mutation(createMomokaCommentTypedDataMutationGraphql, {
      request
    })
    .toPromise();

  return result.data!.createMomokaCommentTypedData;
};

export default createMomokaCommentTypedDataLensService;
