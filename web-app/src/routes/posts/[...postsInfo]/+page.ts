import type { LoadEvent } from "@sveltejs/kit";
import { userEnteredURL } from "../../../services/userEnteredURL";
import { currentTotalPosts, isMainPostAdded } from "../../../services/isPostAddedToLensGraph";
import { getCommentOfPublication } from "../../../utils/frontend/getCommentOfPublication";

export async function load({ fetch, params, depends }: LoadEvent) {
  depends("posts: updated-posts");
  console.log("Params", JSON.stringify(params));
  const postInfo: string[] | undefined = params.postsInfo?.split("/");

  let hashedURL;
  let pubId;
  if (postInfo !== undefined) {
    hashedURL = postInfo[0];
    pubId = postInfo[1];
    console.log("hashedURL" + hashedURL);
    console.log("pubId" + pubId);
  }

  let comments;
  if (pubId !== undefined) {
    console.log("pubId" + pubId);
    comments = await getCommentOfPublication(pubId);
    console.log("comments" + JSON.stringify(comments));
  }


  const res = await fetch(`/api/posts?hashedURL=${hashedURL}`);
  const fetchedData = await res.json();

  console.log("fetchedData", fetchedData);

  if (fetchedData["error"] != null) {
    let enteredURL;
    const unsub = userEnteredURL.subscribe((url) => {
      enteredURL = url;
    });
    unsub();

    return {
      "hashedURL": hashedURL,
      "URL": enteredURL,
      "items": [],
      "mainPostPubId": "",
      "comments": []
    };
  }

  console.log("No error");
  isMainPostAdded.set(true);
  currentTotalPosts.set(fetchedData["items"].length);

  return {
    "hashedURL": hashedURL,
    "URL": fetchedData["URL"],
    "items": fetchedData["items"],
    "mainPostPubId": fetchedData["parentPublicationID"],
    "comments": comments
  };
}
