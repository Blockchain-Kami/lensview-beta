import type { CreatePostRequest } from "../../gql/graphql.js";

import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util.js";

import createTextPostMutationGraphql from "../../graphql/mutations/create-text-post.mutation.graphql.js";
import { logger } from "../../log/log-manager.log.js";

const createTextPostLensService = async (request: CreatePostRequest) => {
  logger.info(
    "create-text-post.lens.service.ts: createTextPostLensService: Execution Started."
  );
  const authenticatedClient = await getAuthenticatedClientAuthenticationUtil();
  logger.info(
    "create-text-post.lens.service.ts: createTextPostLensService: Executing CreateMomokaPostTypedDataMutationGraphql with request: " +
      JSON.stringify(request)
  );
  const result = await authenticatedClient
    .mutation(createTextPostMutationGraphql, {
      request
    })
    .toPromise();

  const createTextPostData = result.data!.post;
  logger.info(
    "create-text-post.lens.service.ts: createTextPostLensService: Execution End. Response: " +
      JSON.stringify(createTextPostData)
  );
  return createTextPostData;
};

export default createTextPostLensService;
