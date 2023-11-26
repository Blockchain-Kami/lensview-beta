import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import explorePublicationsQueryGraphql from "../../graphql/queries/explore-publications.query.graphql";
import {
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
  LimitType
} from "../../gql/graphql";
import { PUBLIC_SOURCE_APP_ID } from "$env/static/public";
import type { ExplorePublicationsLensModel } from "../../models/lens/explore-publications.lens.model";

const explorePublicationLensService = async () => {
  const result = await baseClientAuthenticationUtil
    .query(explorePublicationsQueryGraphql, {
      request: {
        orderBy: ExplorePublicationsOrderByType.Latest,
        limit: LimitType.Fifty,
        where: {
          publicationTypes: [ExplorePublicationType.Post],
          metadata: {
            publishedOn: [PUBLIC_SOURCE_APP_ID]
          }
        }
      }
    })
    .toPromise();

  return result.data?.explorePublications as ExplorePublicationsLensModel;
};

export default explorePublicationLensService;
