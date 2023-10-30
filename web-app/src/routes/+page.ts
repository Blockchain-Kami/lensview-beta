import type { PageLoad } from "./$types";
import { getExplorePublicationsForApp } from "../utils/frontend/getExplorePublicationsForApp";

export const load = (async () => {
  const fetchedExplorePublicationsForApp = await getExplorePublicationsForApp();
  const explorePublicationsForApp =
    fetchedExplorePublicationsForApp?.data?.explorePublications;

  return {
    explorePublicationsForApp: explorePublicationsForApp
  };
}) satisfies PageLoad;
