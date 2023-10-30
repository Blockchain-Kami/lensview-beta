import { getParentPost } from "../../../utils/backend/get-parent-url.server";
import { json } from "@sveltejs/kit";

export async function GET(request) {
  try {
    const res = await getParentPost(request.url.searchParams.get("hashedURL"));
    console.log(res);

    const parentPostID = res["parent_post_ID"];
    const sourceURL = res["source_url"];

    return json({
      status_code: 200,
      parent_publication_ID: parentPostID,
      source_url: sourceURL
    });
  } catch {
    return json({
      status_code: 404,
      error: "Could not fetch parent publication details"
    });
  }
}
