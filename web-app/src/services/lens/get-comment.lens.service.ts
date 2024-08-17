import type { PublicationsRequest } from "../../gql/graphql";
import { isLoggedInUserStore } from "../../stores/user/is-logged-in.user.store";
import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import commentsPublicationQueryGraphql from "../../graphql/queries/comments-publication.query.graphql";
import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import type { CommentsPublicationLensModel } from "../../models/lens/comments-publication.lens.model";

const getCommentLensService = async (request: PublicationsRequest) => {
  // console.log("getCommentLensService request", request);

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

  if (result?.data?.publications.__typename === "PaginatedPublicationsResult") {
    return result?.data?.publications?.items as CommentsPublicationLensModel[];
  } else {
    return [];
  }
};

export default getCommentLensService;
