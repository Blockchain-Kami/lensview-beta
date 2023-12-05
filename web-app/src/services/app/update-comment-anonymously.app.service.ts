import clientAxiosUtil from "../../utils/axios/client.axios.util";
import type { AxiosResponse } from "axios";
import type { PostCommentResponseAppModel } from "../../models/app/responses/post-comment.response.app.model";

const updateCommentAnonymouslyAppService = async (
  pubId: string,
  userEnteredContent: string
) => {
  console.log("createPostAnonymouslyAppService pubId:", pubId);
  console.log(
    "createPostAnonymouslyAppService userEnteredContent:",
    userEnteredContent
  );

  try {
    return await clientAxiosUtil
      .put("comment/anonymous", {
        pubId: pubId,
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

export default updateCommentAnonymouslyAppService;
