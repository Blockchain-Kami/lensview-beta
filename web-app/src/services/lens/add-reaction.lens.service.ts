import { PublicationReactionType } from "../../gql/graphql";
import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import addReactionMutationGraphql from "../../graphql/mutations/add-reaction.mutation.graphql";
import { AppReactionType } from "../../config/app-constants.config";

const addReactionLensService = async (
  publicationId: string,
  reaction: AppReactionType
) => {
  console.log("addReactionLensService publicationId", publicationId);
  console.log("addReactionLensService reaction", reaction);

  const userReaction =
    reaction === AppReactionType.UpVote
      ? PublicationReactionType.Upvote
      : PublicationReactionType.Downvote;

  const result = await authenticatedClientAuthenticationUtil().mutation(
    addReactionMutationGraphql,
    {
      request: {
        for: publicationId,
        reaction: userReaction
      }
    }
  );

  return result?.data?.addReaction;
};

export default addReactionLensService;
