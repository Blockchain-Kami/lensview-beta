import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import {PUBLIC_LENS_API_URL} from "$env/static/public";
import getPosts from "../../../graphql/getPosts";
import {createHash} from "../../../utils/backend/sha1.server";
import {APP_LENS_ID} from "$env/static/private";
import {preprocessURL} from "../../../utils/backend/process-url.server";
import {isInputTypeUrl} from "../../../utils/backend/check-input-type.server";

export async function POST(requestEvent) {
    const { request } = requestEvent;

    const inputString = await request.json();
    const URL = isInputTypeUrl(inputString);
    let tag;

    if (URL) {
        const [, hostname , ,] = preprocessURL(URL);
        tag = createHash(hostname);
    } else {
        tag = inputString.trim();
    }

    const posts = await fetch(PUBLIC_LENS_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: getPosts,
            variables: {
                hashedURL: tag,
                lensId: APP_LENS_ID
            },
        }),
    });

    const postJSON = await posts.json();
    const relatedPosts = postJSON.data.publications;

    if (relatedPosts.items.length < 1) {
        throw error(404, {
            message: "No related publications found",
        })
    }
    return json(relatedPosts);
}