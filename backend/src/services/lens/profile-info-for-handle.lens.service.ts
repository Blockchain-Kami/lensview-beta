import getBaseClientHelperUtil from "../../utils/helpers/get-base-client.helper.util";
import { getProfileDetailsForHandleQueryGraphql } from "../../graphql/queries/get-profile-details-for-handle.query.graphql"
import {ProfileRequest} from "../../gql/graphql";

export const profileInfoForHandleLensService = async (lensHandle: string) => {
    const request: ProfileRequest = {
        forHandle: lensHandle
    }
    const result = await getBaseClientHelperUtil
        .query(getProfileDetailsForHandleQueryGraphql, { request })
        .toPromise();
}