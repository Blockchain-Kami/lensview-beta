import baseClientUtil from "./lens-protocol/base-client.util";
import relatedPubs from "../graphql/get-related-pubs.graphql";
import { PUBLIC_APP_LENS_ID } from "../config/env.config";
export const getRelatedParentPublicationsUtil = async (tag: string) => {
  try {
    const posts = await baseClientUtil
      .query(relatedPubs, {
        hashedURL: tag,
        lensId: PUBLIC_APP_LENS_ID
      })
      .toPromise();

    return posts?.data?.publications;
  } catch (error) {
    console.log("Error in getRelatedParentPublications", error);
    return null;
  }
};
