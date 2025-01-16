import exploreLinkPostsQueryGraphql from "../../graphql/queries/explore-link-posts.query.graphql";
import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import { PageSize, PostType } from "../../gql/graphql";
import type { ExploreLinkPostLensModel } from "../../models/lens/explore-link-post.lens.model";

const { VITE_APP_LENS_ID } = import.meta.env;
const getExploreLinkPostsLensService = async () => {
  const result = await baseClientAuthenticationUtil
    .query(exploreLinkPostsQueryGraphql, {
      request: {
        filter: {
          authors: VITE_APP_LENS_ID,
          postTypes: [PostType.Root]
        },
        pageSize: PageSize.Fifty
      }
    })
    .toPromise();

  return result?.data?.posts as { items: ExploreLinkPostLensModel[] };
};

export default getExploreLinkPostsLensService;
