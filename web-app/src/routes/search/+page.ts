import type { LoadEvent } from "@sveltejs/kit";
import type { PageLoad } from "../../../.svelte-kit/types/src/routes/$types";

export const load = (async ({ url }: LoadEvent) => {
  const userEnteredUrlOrKeywordsEncode = url.searchParams.get("search_query");
  const isInputUrlString = url.searchParams.get("is_url");

  let userEnteredUrlOrKeywordsDecode;
  if (userEnteredUrlOrKeywordsEncode !== null) {
    userEnteredUrlOrKeywordsDecode = decodeURI(userEnteredUrlOrKeywordsEncode);
  }

  let isInputUrlBoolean;
  if (isInputUrlString !== null) {
    isInputUrlBoolean = isInputUrlString === "true";
  }

  console.log("userEnteredUrlOrKeywordsDecode", userEnteredUrlOrKeywordsDecode);
  console.log("isInputUrlBoolean", isInputUrlBoolean);

  return {
    userEnteredUrlOrKeywords: userEnteredUrlOrKeywordsDecode,
    isInputUrl: isInputUrlBoolean
  };
}) satisfies PageLoad;
