import type { PageLoad } from "./$types";
import getExploreLinkPostsLensService from "../services/lens/get-explore-link-posts.lens.service";

export const load = (async () => {
  return await getExploreLinkPostsLensService();
}) satisfies PageLoad;
