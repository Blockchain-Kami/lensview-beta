import { logger } from "../../log/log-manager.log.js";
import { PaginatedAnyPostsResult, Post } from "../../gql/graphql";

export const formatTextOnlyInputDataHelperUtil = (
  texOnlyComments: PaginatedAnyPostsResult
) => {
  logger.info(
    "format-text-only-input-data.helper.util.ts: formatTextOnlyInputDataHelperUtil: Execution Started."
  );
  const rankWiseComments = sortComments(texOnlyComments.items as Post[]);
  const commentString = getCommentsFromObject(rankWiseComments);
  logger.info(
    "format-text-only-input-data.helper.util.ts: formatTextOnlyInputDataHelperUtil: Execution Ended."
  );
  return commentString;
};

const sortComments = (comments: Post[]): Post[] => {
  logger.info(
    "format-text-only-input-data.helper.util.ts: sortComments: Sorting comments based on upvote."
  );
  return comments.sort(
    (a: Post, b: Post) => b.stats?.reactions - a.stats?.reactions
  );
};

const getCommentsFromObject = (comments: Post[]) => {
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
