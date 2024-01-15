import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import explorePublicationsQueryGraphql from "../../graphql/queries/explore-publications.query.graphql";
import {
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
  LimitType
} from "../../gql/graphql";
import type { ExplorePublicationsLensModel } from "../../models/lens/explore-publications.lens.model";
const { VITE_SOURCE_APP_ID } = import.meta.env;
const { VITE_DATA_SINCE } = import.meta.env;

const explorePublicationLensService = async () => {
  const result = await baseClientAuthenticationUtil
    .query(explorePublicationsQueryGraphql, {
      request: {
        orderBy: ExplorePublicationsOrderByType.Latest,
        limit: LimitType.Fifty,
        where: {
          publicationTypes: [ExplorePublicationType.Post],
          since: Number(VITE_DATA_SINCE),
          metadata: {
            publishedOn: [VITE_SOURCE_APP_ID]
          }
        }
      }
    })
    .toPromise();

  return result.data?.explorePublications as ExplorePublicationsLensModel;
};

export default explorePublicationLensService;
