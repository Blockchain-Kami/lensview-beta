import getBaseClientHelperUtil from "../../utils/helpers/get-base-client.helper.util";
import getMainPublicationImageQueryGraphql from "../../graphql/queries/get-main-publication-image.query.graphql";
import { InternalServerError } from "../../errors/internal-server-error.error";
import {
  LimitType,
  PublicationsRequest,
  PublicationsWhere
} from "../../gql/graphql";
import {GetPublicationImageLensModel} from "../../models/lens/get-publication-image.lens.model";

export const getMainPublicationImageLensService = async (
  publicationID: string
) => {
  try {
    const publicationsWhere: PublicationsWhere = {
      commentOn: {
        id: publicationID
      },
      metadata: {
        tags: {
          oneOf: ["dd472d3370b389eb8399ea7c795ca9e76ff0d4d7"]
        }
      }
    };

    const publicationsRequest: PublicationsRequest = {
      limit: LimitType.Fifty,
      where: publicationsWhere
    };
    const result = await getBaseClientHelperUtil
      .query(getMainPublicationImageQueryGraphql, {
        request: publicationsRequest
      })
      .toPromise();
    return result?.data?.publications as GetPublicationImageLensModel;
  } catch (error) {
    throw new InternalServerError("Error Fetching Data From Lens API", 504);
  }
};
