import type { LoadEvent } from "@sveltejs/kit";

export async function load({ fetch, params }: LoadEvent) {
  const { hashedURL } = params;
  const res = await fetch(`/api/posts?hashedURL=${hashedURL}`);
  const fetchedData = await res.json();
  return {
    "hashedURL": hashedURL,
    "URL": fetchedData["URL"],
    "items": fetchedData["items"],
    "mainPostPubId": fetchedData["parentPublicationID"]
  };
}
