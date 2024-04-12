import { GetTextOnlyCommentsLensModel } from "../../models/lens/get-text-only-comments.lens.model";

export const getTextOnlyCommentsInputDataHelperUtil = (
  texOnlyComments: GetTextOnlyCommentsLensModel
) => {
  let inputString = "";
  texOnlyComments.items.forEach((comment) => {
    const userComment = removeTags(comment.metadata.content);
    inputString += userComment + ". ";
  });
  console.log("input string", inputString);
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
