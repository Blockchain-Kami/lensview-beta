import type { PageLoad } from "./$types";
import type { LoadEvent } from "@sveltejs/kit";

export const load = (async ({ params }: LoadEvent) => {
  const postInfo: string[] | undefined = params.postsInfo?.split("/");
  let mainPostPubId;
  let postPubId;

  if (postInfo !== undefined) {
    mainPostPubId = postInfo[0];
    postPubId = postInfo[1];
  }

  console.log("mainPostPubId", mainPostPubId);
  console.log("postPubId", postPubId);

  const commentPubId = postPubId !== undefined && postPubId !== "" ? postPubId : mainPostPubId;

  console.log("commentPubId", commentPubId);

  return {
    mainPostPubId: mainPostPubId,
    postPubId: postPubId,
    commentPubId: commentPubId
  };
}) satisfies PageLoad;
