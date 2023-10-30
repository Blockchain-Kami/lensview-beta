import { error, json } from "@sveltejs/kit";
import { getParentPost } from "../../../utils/backend/get-parent-url.server";
import { preprocessURL } from "../../../utils/backend/process-url.server";
import { createHash } from "../../../utils/backend/sha1.server";
import { isInputTypeUrl } from "../../../utils/backend/check-input-type.server";
import { logger } from "../../../log/logManager";

export async function POST(requestEvent) {
  logger.info(
    "routes/api/is-url-valid-get-parent-pubId: +server.ts :: " +
      "EXECUTION START"
  );
  const { request } = requestEvent;
  const urlRequest = await request.json();

  const Url = isInputTypeUrl(urlRequest);

  if (Url) {
    const [url, , ,] = preprocessURL(Url);

    if (!url) {
      logger.error(
        "routes/api/is-url-valid-get-parent-pubId: +server.ts :: " +
          "EXECUTION END: Failed to process URL: " +
          Url
      );
      throw error(400, {
        message: "Error processing the URL"
      });
    }
    const hashedURL = createHash(url);
    const res = await getParentPost(hashedURL);

    if (res["parent_post_ID"]) {
      const parentPostID = res["parent_post_ID"];

      const response = {
        parentPublicationID: parentPostID,
        isURL: true,
        message: "Parent publication ID was fetched successfully"
      };
      logger.info(
        "routes/api/is-url-valid-get-parent-pubId: +server.ts :: " +
          "EXECUTION END: DONE: Parent Pub ID of URL " +
          url +
          " is: " +
          parentPostID
      );
      return json(response);
    } else if (res["status"] == 404) {
      const response = {
        parentPublicationID: null,
        isURL: true,
        message: "Could not find any publications on Lens Protocol"
      };
      logger.info(
        "routes/api/is-url-valid-get-parent-pubId: +server.ts :: " +
          "EXECUTION END: DONE: Could not find any publications for: " +
          url
      );
      return json(response);
    } else {
      logger.error(
        "routes/api/is-url-valid-get-parent-pubId: +server.ts :: " +
          "EXECUTION END: FAILED: Could Not Connect To Lens Protocol"
      );
      throw error(500, {
        parentPublicationID: null,
        isURL: true,
        message: "Could not connect to Lens Protocol."
      });
    }
  } else {
    logger.info(
      "routes/api/is-url-valid-get-parent-pubId: +server.ts :: " +
        "EXECUTION END: DONE: Incorrect URL Format or User Entered a Tag"
    );
    const response = {
      parentPublicationID: null,
      isURL: false,
      message: "Incorrect URL format or user entered a tag"
    };
    return json(response);
  }
}
