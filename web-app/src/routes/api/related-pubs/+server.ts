import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import {PUBLIC_LENS_API_URL} from "$env/static/public";
import getPosts from "../../../graphql/getPosts";
import {createHash} from "../../../utils/backend/sha1.server";
import {APP_LENS_ID} from "$env/static/private";
import {preprocessURL} from "../../../utils/backend/process-url.server";

export async function POST(requestEvent) {
    const { request } = requestEvent;

    const req = await request.json();
    const { input, isURL } = req;

    let tag;

    if (isURL) {
        const [, hostname , ,] = preprocessURL(input);
        tag = hostname;
    } else {
        tag = input;
    }
    const hashOfTag = createHash(tag);

    const posts = await fetch(PUBLIC_LENS_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: getPosts,
            variables: {
                hashedURL: hashOfTag,
                lensId: APP_LENS_ID
            },
        }),
    });

    const postJSON = await posts.json();
    const relatedPosts = postJSON.data.publications;

    if (relatedPosts.length < 1) {
        throw error(404, {
            message: "No related publications found",
        })
    }
    return json(relatedPosts);
}