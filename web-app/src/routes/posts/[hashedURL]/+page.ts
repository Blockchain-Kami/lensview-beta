import type { LoadEvent } from "@sveltejs/kit";
import { userEnteredURL } from "../../../services/userEnteredURL";
import { currentTotalPosts, isMainPostAdded } from "../../../services/isPostAddedToLensGraph";

export async function load({ fetch, params, depends }: LoadEvent) {
  depends("posts: updated-posts");
  const { hashedURL } = params;
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
      "mainPostPubId": ""
    };
  }

  console.log("No error");
  isMainPostAdded.set(true);
  currentTotalPosts.set(fetchedData["items"].length);

  return {
    "hashedURL": hashedURL,
    "URL": fetchedData["URL"],
    "items": fetchedData["items"],
    "mainPostPubId": fetchedData["parentPublicationID"]
  };
}
