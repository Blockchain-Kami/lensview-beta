import { error, json } from "@sveltejs/kit";
import { signInWithLens } from "../../../utils/backend/lens-sign-in.server";
import commentAnonymously from "../../../utils/backend/comment-anonymously.server";
import { logger } from "../../../log/logManager";

export async function POST(requestEvent) {
  logger.info(
    "routes/api/comment-anonymously: +server.ts :: " + "EXECUTION START"
  );
  const { request } = requestEvent;
  const requestBody = await request.json();

  const pubId = requestBody["pubId"];
  logger.info(
    "routes/api/comment-anonymously: +server.ts :: " +
      "Commenting on Publication: " +
      pubId
  );
  const commentContent = requestBody["commentContent"];

  const [client, signer, profile] = await signInWithLens();

  const txHash = await commentAnonymously(
    pubId,
    commentContent,
    client,
    signer,
    profile
  );

  if (txHash) {
    logger.info(
      "routes/api/comment-anonymously: +server.ts :: " +
        "EXECUTION END: DONE: Anonymous Comment Added to Publication: " +
        pubId
    );
    return json({
      message: `Anonymous comment added to publication ID: ${pubId}`
    });
  } else {
    logger.info(
      "routes/api/comment-anonymously: +server.ts :: " +
        "EXECUTION END: FAILED: Could Not Comment Anonymously on Publication: " +
        pubId
    );
    throw error(500, {
      message: "Error: Failed to add anonymous comment."
    });
  }
}
