import clientAxiosUtil from "../../utils/axios/client.axios.util";
import type { AxiosResponse } from "axios";
import type { PostCommentResponseAppModel } from "../../models/app/post-comment-response.app.model";

const createPostAnonymouslyAppService = async (
  url: string,
  userEnteredContent: string
) => {
  console.log("createPostAnonymouslyAppService url:", url);
  console.log(
    "createPostAnonymouslyAppService userEnteredContent:",
    userEnteredContent
  );

  try {
    return await clientAxiosUtil
      .post("comment/anonymous", {
        url: url,
        content: userEnteredContent
      })
      .then((resp: AxiosResponse<PostCommentResponseAppModel>) => {
        return resp.data.publicationID;
      });
  } catch (err) {
    // TODO: Handle error as mentioned in this article
    // https://www.builder.io/blog/safe-data-fetching
    console.log("getRelatedPostPubIdsAppService err:", err);
    throw err;
  }
};

export default createPostAnonymouslyAppService;
