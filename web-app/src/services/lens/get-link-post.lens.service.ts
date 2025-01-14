import { isLoggedInUserStore } from "../../stores/user/is-logged-in.user.store";
import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import linkPostQueryGraphql from "../../graphql/queries/link-post.query.graphql";
import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";

const getLinkPostLensService = async (postId: string) => {
  console.log("getLinkPostLensService postId", postId);

  let isUserLoggedIn = false;
  const unsub = isLoggedInUserStore.subscribe((status) => {
    isUserLoggedIn = status;
  });
  unsub();

  let result;
  if (isUserLoggedIn) {
    result = await authenticatedClientAuthenticationUtil()
      .query(linkPostQueryGraphql, {
        request: {
          post: postId
        }
      })
      .toPromise();
  } else {
    result = await baseClientAuthenticationUtil
      .query(linkPostQueryGraphql, {
        request: {
          post: postId
        }
      })
      .toPromise();
  }

  return result?.data?.post;
};

export default getLinkPostLensService;
