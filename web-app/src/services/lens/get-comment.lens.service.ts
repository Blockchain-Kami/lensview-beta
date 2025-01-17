import { isLoggedInUserStore } from "../../stores/user/is-logged-in.user.store";
import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import commentQueryGraphql from "../../graphql/queries/comment.query.graphql";
import type { CommentLensModel } from "../../models/lens/comment.lens.model";

const getCommentLensService = async (commentId: string) => {
  console.log("getCommentLensService commentId", commentId);

  let isUserLoggedIn = false;
  const unsub = isLoggedInUserStore.subscribe((status) => {
    isUserLoggedIn = status;
  });

  unsub();

  let result;
  const request = {
    post: commentId
  };

  if (isUserLoggedIn) {
    result = await authenticatedClientAuthenticationUtil()
      .query(commentQueryGraphql, { request })
      .toPromise();
  } else {
    result = await baseClientAuthenticationUtil
      .query(commentQueryGraphql, { request })
      .toPromise();
  }

  return result?.data?.post as CommentLensModel;
};

export default getCommentLensService;
