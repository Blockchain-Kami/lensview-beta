import { error, json } from "@sveltejs/kit";
import { createHash } from "../../../utils/backend/sha1.server";
import { signInWithLens } from "../../../utils/backend/lens-sign-in.server";
import { preprocessURL } from "../../../utils/backend/process-url.server";
import savePost from "../../../utils/backend/add-url.server";
import { imageQueue } from "../../../jobs/imageQueue";
import { isInputTypeUrl } from "../../../utils/backend/check-input-type.server";
import { checkUntilMainPostAdded } from "../../../utils/backend/check-until-post-added.server";
import { getParentPost } from "../../../utils/backend/get-parent-url.server";
import commentAnonymously from "../../../utils/backend/comment-anonymously.server";
import { logger } from "../../../log/logManager";

export async function POST(requestEvent) {
  try {
    logger.info(
      "add-url-or-post-comment: server.ts:: " +
        "EXECUTION START: ADD URL OR POST COMMENT"
    );
    const { request } = requestEvent;
    const urlRequest = await request.json();

    const enteredURL = urlRequest["enteredURL"];
    const lensHandle = urlRequest["lensHandle"];
    const postContent = urlRequest["postContent"];
    const tags = urlRequest["userTags"];
    let pubId;

    const urlString = isInputTypeUrl(enteredURL);

    if (!urlString) {
      logger.info(
        "add-url-or-post-comment: server.ts:: " + "User Entered a tag"
      );
      throw error(500, {
        isURL: false,
        message: "User entered a tag"
      });
    }

    const [url, hostname, domain, path, query] = preprocessURL(urlString);
    const hashedURL = createHash(url);
    const hashedHostname = createHash(hostname);
    const hashedPath = createHash(path);
    logger.info(
      "add-url-or-post-comment: server.ts:: " +
        "Created the URL hash: " +
        hashedURL
    );

    const urlObj = {
      url,
      hashedURL,
      hostname,
      hashedHostname,
      domain,
      path,
      hashedPath,
      query,
      lensHandle,
      postContent,
      tags,
      image: ""
    };

    const authToken = await signInWithLens();

    if (!authToken) {
      logger.error(
        "add-url-or-post-comment: server.ts:: " + "Could not sign in with Lens"
      );
      throw error(500, {
        message: "Error: Could not sign in with Lens."
      });
    }

    const [client, signer, profile] = authToken;

    const publicationExists = await getParentPost(hashedURL);

    if (publicationExists["parent_post_ID"]) {
      pubId = publicationExists["parent_post_ID"];
      logger.info(
        "add-url-or-post-comment: server.ts:: " +
          "Link is already added to LensView"
      );
      if (lensHandle) {
        // front end will do the posting, throw error
        logger.info(
          "add-url-or-post-comment: server.ts:: " +
            "EXECUTION END: ADD URL OR POST COMMENT: " +
            "Add user comment to " +
            pubId
        );
        return json({
          parentPubId: pubId,
          successCode: 1,
          isUrlAlreadyAdded: true,
          message: "Link is already added to LensView."
        });
      } else if (postContent) {
        const commentAdded = await commentAnonymously(
          pubId,
          postContent,
          client,
          signer,
          profile
        );

        if (commentAdded) {
          logger.info(
            "add-url-or-post-comment: server.ts:: " +
              "EXECUTION END: ADD URL OR POST COMMENT"
          );
          return json({
            parentPubId: pubId,
            successCode: 2,
            isUrlAlreadyAdded: true,
            message:
              "Link was already present in LensView. User comment added to the post."
          });
        } else {
          logger.error(
            "add-url-or-post-comment: server.ts:: " +
              "EXECUTION END: ADD URL OR POST COMMENT:" +
              "Failed to add anonymous comment to post"
          );
          throw error(500, {
            message:
              "Error: Link is already added to LensView. Error adding user comment to the post."
          });
        }
      }
    }

    const txHash = await savePost(urlObj, client, signer, profile);

    if (!txHash) {
      logger.error(
        "add-url-or-post-comment: server.ts:: " +
          "EXECUTION END: ADD URL OR POST COMMENT:"
      );
      throw error(500, {
        message: "Error: Failed to save URL to LensView"
      });
    }
    const indexed = await checkUntilMainPostAdded(txHash, Date.now());
    logger.info(
      "add-url-or-post-comment: server.ts:: " +
        "EXECUTING: ADD URL OR POST COMMENT" +
        "Value of indexed " +
        indexed
    );

    if (indexed) {
      imageQueue.add({ urlObj });
      const publicationID = await getParentPost(hashedURL);
      pubId = publicationID["parent_post_ID"];

      if (lensHandle) {
        // front end will post the user comment, return response
        logger.info(
          "add-url-or-post-comment: server.ts:: " +
            "EXECUTION END: ADD URL OR POST COMMENT" +
            "Add user comment to " +
            pubId
        );
        return json({
          parentPubId: pubId,
          successCode: 3,
          isUrlAlreadyAdded: false,
          message: "New URL added to LensView successfully"
        });
      } else {
        // user adds comment anonymously
        const commentAdded = await commentAnonymously(
          pubId,
          postContent,
          client,
          signer,
          profile
        );

        if (commentAdded) {
          logger.info(
            "add-url-or-post-comment: server.ts:: " +
              "EXECUTION END: ADD URL OR POST COMMENT"
          );
          return json({
            parentPubId: pubId,
            successCode: 4,
            isUrlAlreadyAdded: false,
            message:
              "New URL added to LensView and user comment added to the post"
          });
        } else {
          logger.error(
            "add-url-or-post-comment: server.ts :: " +
              "EXECUTION END: ADD URL OR POST COMMENT:" +
              "Failed to add anonymous comment to post"
          );
          throw error(500, {
            message:
              "Error: Failed to add anonymous user's comment to the post."
          });
        }
      }
    } else {
      logger.error(
        "add-url-or-post-comment: server.ts:: " +
          "EXECUTION END: ADD URL OR POST COMMENT: " +
          "Transaction not indexed by Lens API. Time exceeded 60 seconds"
      );
      throw error(500, {
        message:
          "Error: Transaction not indexed by Lens API. Time exceeded 60 seconds."
      });
    }
  } catch (error) {
    logger.error("add-url-or-post-comment: server.ts:: " + error);
    return error(500, {
      message: "Failed to ADD URL OR POST COMMENT to LensView"
    });
  }
}
