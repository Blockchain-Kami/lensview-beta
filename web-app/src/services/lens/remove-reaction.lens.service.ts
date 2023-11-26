import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import removeReactionMutationGraphql from "../../graphql/mutations/remove-reaction.mutation.graphql";
import { AppReactionType } from "../../config/app-constants.config";
import { PublicationReactionType } from "../../gql/graphql";

const removeReactionLensService = async (
  publicationId: string,
  reaction: AppReactionType
) => {
  console.log("removeReactionLensService publicationId", publicationId);
  console.log("removeReactionLensService reaction", reaction);

  const userReaction =
    reaction === AppReactionType.UpVote
      ? PublicationReactionType.Upvote
      : PublicationReactionType.Downvote;

  const result = await authenticatedClientAuthenticationUtil().mutation(
    removeReactionMutationGraphql,
    {
      request: {
        for: publicationId,
        reaction: userReaction
      }
    }
  );

  return result?.data?.removeReaction;
};

export default removeReactionLensService;
