import type { PageLoad } from "./$types";
import explorePublicationLensService from "../services/lens/explore-publication.lens.service";

export const load = (async () => {
  return await explorePublicationLensService();
}) satisfies PageLoad;
