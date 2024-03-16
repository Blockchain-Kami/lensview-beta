import type { MomokaPostRequest } from "../../gql/graphql";
import CreateMomokaPostTypedDataDocument from "../../graphql/mutations/create-momoka-post-typed-data-document.graphql";
import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util";

const createMomokaPostTypedDataLensService = async (
  request: MomokaPostRequest
) => {
  const authenticateClient = await getAuthenticatedClientAuthenticationUtil();
  const result = await authenticateClient
    .mutation(CreateMomokaPostTypedDataDocument, {
      request
    })
    .toPromise();

  return result.data!.createMomokaPostTypedData;
};

export default createMomokaPostTypedDataLensService;
