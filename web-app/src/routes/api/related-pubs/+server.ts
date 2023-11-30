import { error, json } from "@sveltejs/kit";
import { PUBLIC_APP_LENS_ID, PUBLIC_LENS_API_URL } from "$env/static/public";
import relatedPubs from "../../../graphql/relatedPubs";
import { createHash } from "../../../utils/backend/sha1.server";
import { preprocessURL } from "../../../utils/backend/process-url.server";
import { isInputTypeUrl } from "../../../utils/backend/check-input-type.server";
import { logger } from "../../../log/logManager";

const getRelatedParentPublications = async (tag) => {
  logger.info(
    "routes/api/related-pubs: +server.ts :: " +
      "EXECUTION START: getRelatedParentPublications: Entered Tag: " +
      tag
  );
  try {
    const posts = await fetch(PUBLIC_LENS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: relatedPubs,
        variables: {
          hashedURL: tag,
          lensId: PUBLIC_APP_LENS_ID
        }
      })
    });

    const postJSON = await posts.json();
    logger.info(
      "routes/api/related-pubs: +server.ts :: " +
        "EXECUTION END: getRelatedParentPublications: DONE: Entered Tag: " +
        tag
    );
    return postJSON.data.publications;
  } catch (error) {
    logger.error(
      "routes/api/related-pubs: +server.ts :: " +
        "EXECUTION END: getRelatedParentPublications: FAILED: Entered Tag: " +
        tag +
        " : Error: " +
        error
    );
  }
};

export async function POST(requestEvent) {
  logger.info(
    "routes/api/related-pubs: +server.ts :: " +
      "EXECUTION START: GET RELATED PUBS"
  );
  const { request } = requestEvent;

  const inputString = await request.json();

  const URL = isInputTypeUrl(inputString);
  const relatedPubArray = [];
  let tag;

  if (URL) {
    const [, hostname, ,] = preprocessURL(URL);
    tag = createHash(hostname);

    const relatedPosts = await getRelatedParentPublications(tag);

    if (relatedPosts.items.length < 1) {
      logger.error(
        "routes/api/related-pubs: +server.ts :: " +
          "EXECUTION END: GET RELATED PUBS: No related publications found for URL: " +
          URL
      );
      throw error(404, {
        message: "No related publications found"
      });
    }

    for (let i = 0; i < relatedPosts.items.length; i++) {
      relatedPubArray.push(relatedPosts.items[i]["id"]);
    }
    logger.info(
      "routes/api/related-pubs: +server.ts :: " +
        "EXECUTION END: GET RELATED PUBS: DONE: Related Publications Fetched for URL: " +
        URL
    );
    return json(relatedPubArray);
  } else {
    const keywords = inputString.trim().split(" ");

    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i].trim();

      if (keyword != "") {
        const { items } = await getRelatedParentPublications(
          keyword.toLowerCase()
        );
        items.forEach((publication) => {
          relatedPubArray.push(publication.id);
        });
      }
    }
    if (relatedPubArray.length > 0) {
      logger.info(
        "routes/api/related-pubs: +server.ts :: " +
          "EXECUTION END: GET RELATED PUBS: DONE: Related Publication IDs Fetched for keywords" +
          keywords
      );
      return json(relatedPubArray);
    } else {
      logger.info(
        "routes/api/related-pubs: +server.ts :: " +
          "EXECUTION END: GET RELATED PUBS: DONE: Could Not Find Related Publication IDs for keywords" +
          keywords
      );
      return relatedPubArray;
    }
  }
}
