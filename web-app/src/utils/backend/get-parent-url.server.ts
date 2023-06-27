import {PUBLIC_LENS_API_URL} from "$env/static/public";
import {APP_LENS_ID} from "$env/static/private";
import getPosts from "../../graphql/getPosts";

export const getParentPost = async (hashedURL) => {
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
        });
        const response = await posts.json();

        try {
            const parentPostID = response.data.publications.items[0].id;
            const sourceURL = response.data.publications.items[0].metadata.content;

            return {
                status_code: 200,
                parent_post_ID: parentPostID,
                source_url: sourceURL,
                message: "Successfully fetched parent publication ID"
            };
        } catch (err) {
            return {
                status_code: 404,
                parent_post_ID: null,
                source_url: null,
                message: "Error: Could not extract publication ID from response"
            };
        }

    } catch (err) {
        return {
            status_code: 404,
            parent_post_ID: null,
            source_url: null,
            message: "ERROR: failed to fetch details about parent Publication ID"
        };
    }
}