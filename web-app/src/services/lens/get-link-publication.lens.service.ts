import { isLoggedInUserStore } from "../../stores/user/is-logged-in.user.store";
import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import linkPublicationQueryGraphql from "../../graphql/queries/link-publication.query.graphql";
import type { LinkPublicationLensModel } from "../../models/lens/link-publication.lens.model";

const getLinkPublicationLensService = async (publicationId: string) => {
  // console.log("getLinkPublicationLensService publicationId", publicationId);

  let isUserLoggedIn = false;
  const unsub = isLoggedInUserStore.subscribe((status) => {
    isUserLoggedIn = status;
  });
  unsub();

  let result;
  if (isUserLoggedIn) {
    result = await authenticatedClientAuthenticationUtil()
      .query(linkPublicationQueryGraphql, {
        request: {
          forId: publicationId
        }
      })
      .toPromise();
  } else {
    result = await baseClientAuthenticationUtil
      .query(linkPublicationQueryGraphql, {
        request: {
          forId: publicationId
        }
      })
      .toPromise();
  }

  return result?.data?.publication as LinkPublicationLensModel;
};

export default getLinkPublicationLensService;
