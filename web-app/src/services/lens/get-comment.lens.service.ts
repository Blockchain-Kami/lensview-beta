import type { PublicationsRequest } from "../../gql/graphql";
import { isLoggedInUserStore } from "../../stores/user/is-logged-in.user.store";
import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import commentsPublicationQueryGraphql from "../../graphql/queries/comments-publication.query.graphql";
import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";

const getCommentLensService = async (request: PublicationsRequest) => {
  console.log("getCommentLensService request", request);

  let isUserLoggedIn = false;
  const unsub = isLoggedInUserStore.subscribe((status) => {
    isUserLoggedIn = status;
  });

  unsub();

  let result;
  if (isUserLoggedIn) {
    result = await authenticatedClientAuthenticationUtil()
      .query(commentsPublicationQueryGraphql, { request })
      .toPromise();
  } else {
    result = await baseClientAuthenticationUtil
      .query(commentsPublicationQueryGraphql, { request })
      .toPromise();
  }

  return result?.data?.publications;
};

export default getCommentLensService;
