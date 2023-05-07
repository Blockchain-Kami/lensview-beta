import type { LoadEvent } from "@sveltejs/kit";
import { userEnteredURL } from "../../../services/userEnteredURL";

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

  return {
    "hashedURL": hashedURL,
    "URL": fetchedData["URL"],
    "items": fetchedData["items"],
    "mainPostPubId": fetchedData["parentPublicationID"]
  };
}
