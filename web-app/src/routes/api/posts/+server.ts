import { PUBLIC_LENS_API_URL } from "$env/static/public";
import { json } from "@sveltejs/kit";
import getComments from "../../../graphql/getComments";
import { getParentPost } from "../../../utils/backend/get-parent-url.server";

export async function GET(request) {

    try {
        const res = await getParentPost(request);
        const parentPostID = res?.parent_post_ID;
        const sourceURL = res?.source_url;

        const comments = await fetch(PUBLIC_LENS_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: getComments,
                variables: {
                    publicationId: parentPostID
                },
            }),
        });

        const commentsJSON = await comments.json();
        const commentItems = commentsJSON.data.publications.items;

        const responseComments = {
            status_code: 200,
            URL: sourceURL,
            parentPublicationID: parentPostID,
            items: commentItems
        };


        return json(responseComments)

    } catch (err) {
        console.log(err);
        return json({
            status_code: 404,
            error: `Could not fetch comments for Publication ID, hashed URl: ${request.url.searchParams.get('hashedURL')}`
        });
    }
}
