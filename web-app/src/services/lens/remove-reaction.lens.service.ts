import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import removeReactionMutationGraphql from "../../graphql/mutations/remove-reaction.mutation.graphql";
import { AppReactionType } from "../../config/app-constants.config";
import { PostReactionType } from "../../gql/graphql";

const removeReactionLensService = async (
  publicationId: string,
  reaction: AppReactionType
) => {
  console.log("removeReactionLensService publicationId", publicationId);
  console.log("removeReactionLensService reaction", reaction);

  const userReaction =
    reaction === AppReactionType.UpVote
      ? PostReactionType.Upvote
      : PostReactionType.Downvote;

  const result = await authenticatedClientAuthenticationUtil()
    .mutation(removeReactionMutationGraphql, {
      request: {
        post: publicationId,
        reaction: userReaction
      }
    })
    .toPromise();

  return result?.data?.undoReaction;
};

export default removeReactionLensService;
