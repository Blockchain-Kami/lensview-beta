import type { LoadEvent } from "@sveltejs/kit";
import { userEnteredURL } from "../../../services/userEnteredURL";
import { isMainPostAdded } from "../../../services/isPostAddedToLensGraph";
import { getCommentOfPublication } from "../../../utils/frontend/getCommentOfPublication";

export async function load({ fetch, params, depends }: LoadEvent) {
  depends("posts: updated-posts");

  const postInfo: string[] | undefined = params.postsInfo?.split("/");
  let hashedURL;
  let commentPubId;

  if (postInfo !== undefined) {
    hashedURL = postInfo[0];
    commentPubId = postInfo[1];
  }


  const res = await fetch(`/api/posts?hashedURL=${hashedURL}`);
  const fetchedMainPostData = await res.json();

  console.log("fetchedMainPostData", fetchedMainPostData);

  if (fetchedMainPostData["error"] != null) {
    let enteredURL;
    const unsub = userEnteredURL.subscribe((url) => {
      enteredURL = url;
    });
    unsub();

    return {
      "hashedURL": hashedURL,
      "URL": enteredURL,
      "items": [],
      "pubId": "",
      "openCommentSection": false
    };
  }

  console.log("No error");
  isMainPostAdded.set(true);

  let comments;
  if (commentPubId !== undefined) {
    console.log("commentPubId" + commentPubId);
    comments = await getCommentOfPublication(commentPubId);
    console.log("comment", comments);

    return {
      "hashedURL": hashedURL,
      "URL": fetchedMainPostData["URL"],
      "items": comments?.data?.publications?.items,
      "pubId": commentPubId,
      "openCommentSection": true
    };
  } else {
    return {
      "hashedURL": hashedURL,
      "URL": fetchedMainPostData["URL"],
      "items": fetchedMainPostData["items"],
      "pubId": fetchedMainPostData["parentPublicationID"],
      "openCommentSection": false
    };
  }

}
