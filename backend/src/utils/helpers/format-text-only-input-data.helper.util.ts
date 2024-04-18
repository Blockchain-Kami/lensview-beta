import { GetTextOnlyCommentsLensModel } from "../../models/lens/get-text-only-comments.lens.model";

export const formatTextOnlyInputDataHelperUtil = (
  texOnlyComments: GetTextOnlyCommentsLensModel
) => {
  const rankWiseComments = sortComments(texOnlyComments.items);
  return getCommentsFromObject(rankWiseComments);
};

const sortComments = (comments: GetTextOnlyCommentsLensModel["items"]) => {
  return comments.sort((a, b) => b.stats.upvotes - a.stats.upvotes);
};

const getCommentsFromObject = (
  comments: GetTextOnlyCommentsLensModel["items"]
) => {
  let inputString = ``;
  comments.forEach((comment, index) => {
    const userComment = removeTags(comment.metadata.content);
    inputString += "user" + index + ": " + userComment + ".\n ";
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
