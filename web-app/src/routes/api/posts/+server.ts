import {PUBLIC_LENS_API_URL} from "$env/static/public";
import {json} from '@sveltejs/kit';
import getComments from "../../../graphql/getComments";
import {getParentPost} from "../../../utils/backend/get-parent-url.server";
import {preprocessURL} from "../../../utils/backend/process-url.server";
import {createHash} from "../../../utils/backend/sha1.server";

export async function POST(requestEvent) {
    const {request} = requestEvent;
    try {
        const urlRequest = await request.json();

        const [url, , ,] = preprocessURL(urlRequest);
        const hashedURL = createHash(url);

        const res = await getParentPost(hashedURL);

        if (res['parent_post_ID']) {
            // return the comments of the publication post
            const parentPostID = res['parent_post_ID'];
            const sourceURL = res['source_url'];

            const comments = await fetch(PUBLIC_LENS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                hashedURL,
                parentPublicationID: parentPostID,
                items: commentItems
            };


            return json(responseComments);

        } else {
            // return related posts on LensView
            /*

            const posts = await fetch(PUBLIC_LENS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: getPosts,
                    variables: {
                        hashedURL: createHash(origin),
                        lensId: APP_LENS_ID
                    },
                }),
            });

            const postJSON = await posts.json();
            const relatedPosts = postJSON.data.publications;


            const response = {
                message: 'Could not find any posts, returning related posts',
                relatedPosts
            }
            return json(response);

             */

            return json({
                status_code: 404,
                error: `URL is not added to LensView`
            });
        }

    } catch (err) {
        console.log(err);
        return json({
            status_code: 404,
            error: `Error: Could not process the URL, please check if the URL is a valid one.`
        });
    }
}
