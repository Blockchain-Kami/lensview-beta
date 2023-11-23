import type { OnchainPostRequest } from "../../gql/graphql";
import createOnchainPostTypedDataMutationGraphql from "../../graphql/mutations/create-onchain-post-typed-data.mutation.graphql";
import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";

const createOnchainPostTypedDataLensService = async (
  request: OnchainPostRequest
) => {
  console.log("createOnchainPostTypedDataLensService request", request);

  const result = await authenticatedClientAuthenticationUtil()
    .mutation(createOnchainPostTypedDataMutationGraphql, {
      request
    })
    .toPromise();

  return result.data?.createOnchainPostTypedData;
};

export default createOnchainPostTypedDataLensService;
