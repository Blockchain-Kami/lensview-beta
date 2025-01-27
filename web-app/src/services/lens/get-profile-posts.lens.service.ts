import { isLoggedInUserStore } from "../../stores/user/is-logged-in.user.store";
import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import profilePostsQueryGraphql from "../../graphql/queries/profile-posts.query.graphql";
import type { CommentLensModel } from "../../models/lens/comment.lens.model";
const { VITE_USER_POST } = import.meta.env;

const getProfilePostsLensService = async (profileId: string) => {
  console.log("getProfilePostsLensService profileId", profileId);

  let isUserLoggedIn = false;
  const unsub = isLoggedInUserStore.subscribe((status) => {
    isUserLoggedIn = status;
  });

  unsub();

  let result;
  const request = {
    filter: {
      authors: [profileId],
      metadata: {
        tags: {
          oneOf: [VITE_USER_POST]
        }
      }
    }
  };

  if (isUserLoggedIn) {
    result = await authenticatedClientAuthenticationUtil()
      .query(profilePostsQueryGraphql, { request })
      .toPromise();
  } else {
    result = await baseClientAuthenticationUtil
      .query(profilePostsQueryGraphql, { request })
      .toPromise();
  }

  return result?.data?.posts?.items as CommentLensModel[];
};

export default getProfilePostsLensService;
