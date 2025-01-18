import { GetTextOnlyCommentsLensModel } from "../../models/lens/get-text-only-comments.lens.model.js";

import { logger } from "../../log/log-manager.log.js";

export const formatTextOnlyInputDataHelperUtil = (
  texOnlyComments: GetTextOnlyCommentsLensModel
) => {
  logger.info(
    "format-text-only-input-data.helper.util.ts: formatTextOnlyInputDataHelperUtil: Execution Started."
  );
  const rankWiseComments = sortComments(texOnlyComments.items);
  const commentString = getCommentsFromObject(rankWiseComments);
  logger.info(
    "format-text-only-input-data.helper.util.ts: formatTextOnlyInputDataHelperUtil: Execution Ended."
  );
  return commentString;
};

const sortComments = (comments: GetTextOnlyCommentsLensModel["items"]) => {
  logger.info(
    "format-text-only-input-data.helper.util.ts: sortComments: Sorting comments based on upvote."
  );
  return comments.sort((a, b) => b.stats?.reactions - a.stats?.reactions);
};

const getCommentsFromObject = (
  comments: GetTextOnlyCommentsLensModel["items"]
) => {
  logger.info(
    "format-text-only-input-data.helper.util.ts: getCommentsFromObject: Creating input string."
  );
  let inputString = ``;
  comments.forEach((comment, index) => {
    const userComment =
      comment.metadata.content != null
        ? removeTags(comment.metadata.content)
        : " ";
    comment.metadata.content != null
      ? (inputString += "user" + index + ": " + userComment + ".\n ")
      : (inputString += " ");
  });
  return inputString;
};

const removeTags = (str: string) => {
  if (str === null || str === "") return false;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "");
};
