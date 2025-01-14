import { isLoggedInUserStore } from "../../stores/user/is-logged-in.user.store";
import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import commentsQueryGraphql from "../../graphql/queries/comments.query.graphql";
import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import { PageSize, PostReferenceType } from "../../gql/graphql";
import type { CommentLensModel } from "../../models/lens/comment.lens.model";

const getCommentsLensService = async (referencedPostId: string) => {
  console.log("getCommentsLensService referencedPostId", referencedPostId);

  let isUserLoggedIn = false;
  const unsub = isLoggedInUserStore.subscribe((status) => {
    isUserLoggedIn = status;
  });

  unsub();

  let result;
  const request = {
    referencedPost: referencedPostId,
    referenceTypes: [PostReferenceType.CommentOn],
    pageSize: PageSize.Fifty
  };

  if (isUserLoggedIn) {
    result = await authenticatedClientAuthenticationUtil()
      .query(commentsQueryGraphql, { request })
      .toPromise();
  } else {
    result = await baseClientAuthenticationUtil
      .query(commentsQueryGraphql, { request })
      .toPromise();
  }

  return result?.data?.postReferences?.items as CommentLensModel[];
};

export default getCommentsLensService;
