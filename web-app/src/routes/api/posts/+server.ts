import { PUBLIC_LENS_API_URL } from "$env/static/public";
import getPosts from '../../../graphql/getPosts';
import { json } from '@sveltejs/kit';
import { APP_LENS_ID } from '$env/static/private';
import getComments from "../../../graphql/getComments";


export async function GET(request) {

    const hashedURL = request.url.searchParams.get('hashedURL');

    try {
        const posts = await fetch(PUBLIC_LENS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: getPosts,
                    variables: {
                      hashedURL: hashedURL,
                      lensId: APP_LENS_ID
                    },
                }),
            })

        const response = await posts.json()
        const parentPostID = response.data.publications.items[0].id;
        const sourceURL = response.data.publications.items[0].metadata.description;

        console.log(sourceURL);

        try {
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
            })

            const commentsJSON = await comments.json();
            const commentItems = commentsJSON.data.publications.items;

            const responseComments = {
                URL: sourceURL,
                parentPublicationID:parentPostID,
                items : commentItems
            };


            return json(responseComments)

        } catch {
            console.log("error")
        }

    } catch {
        console.log("error");
    }
}

