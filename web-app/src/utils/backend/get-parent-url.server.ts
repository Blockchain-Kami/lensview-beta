import { error } from '@sveltejs/kit';
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

        if (response.data.publications.items.length < 1) {
            return {
                status: 404,
                parent_post_ID: null,
                message: "No related publications found"
            };
        }

        try {
            const parentPostID = response.data.publications.items[0].id;
            const sourceURL = response.data.publications.items[0].metadata.content;

            return {
                status: 200,
                parent_post_ID: parentPostID,
                source_url: sourceURL,
                message: "Successfully fetched parent publication ID"
            };
        } catch (err) {
            return {
                status: 500,
                parent_post_ID: null,
                source_url: null,
                message: "Error: Could not extract publication ID from response"
            };
        }

    } catch (err) {
        throw error(500, "Could not connect to Lens Protocol");
    }
}