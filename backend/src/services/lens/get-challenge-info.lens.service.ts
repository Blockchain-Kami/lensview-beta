import getBaseClientHelperUtil from "../../utils/helpers/get-base-client.helper.util";
import challengeQueryGraphql from "../../graphql/queries/challenge.query.graphql";
import { ChallengeRequest } from "../../gql/graphql";

/**
 * Retrieves challenge information using the lens service.
 *
 * @param {ChallengeRequest} request - The challenge request object.
 * @return {Promise<ReturnType>} - A promise that resolves to the result of the query.
 */
const getChallengeInfoLensService = async (request: ChallengeRequest) => {
  console.log("getChallengeInfoLensService signedBy", request.signedBy);
  console.log("getChallengeInfoLensService for", request.for);

  return await getBaseClientHelperUtil
    .query(challengeQueryGraphql, { request })
    .toPromise();
};

export default getChallengeInfoLensService;
