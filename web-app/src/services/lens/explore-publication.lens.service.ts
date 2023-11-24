import type { ExplorePublicationRequest } from "../../gql/graphql";
import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import explorePublicationsQueryGraphql from "../../graphql/queries/explore-publications.query.graphql";

const explorePublicationLensService = async (
  request: ExplorePublicationRequest
) => {
  const result = await baseClientAuthenticationUtil
    .query(explorePublicationsQueryGraphql, { request })
    .toPromise();

  return result.data?.explorePublications;
};

export default explorePublicationLensService;
