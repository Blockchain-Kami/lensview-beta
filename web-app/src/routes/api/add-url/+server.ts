import {json} from '@sveltejs/kit'
import {createHash} from "../../../utils/backend/sha1.server";
import {signInWithLens} from '../../../utils/backend/lens-sign-in.server';


import savePost from "../../../utils/backend/add-url.server";

export async function POST(requestEvent) {
    //TODO: Get status code from graphQL server. (NOTE:A GraphQL API
    // will always return a 200 OK Status Code, even in case of error.
    // You'll get a 5xx error in case the server is not available at all.)
    try {
        const {request} = requestEvent;
        const url = await request.json();
        const hashedURL = createHash(url);
        try {
            const [client, signer, profile] = await signInWithLens();

            try {
                await savePost(url, hashedURL, client, signer, profile);
                return json({
                    statusCode: 200,
                    url: url,
                    hashedURL: hashedURL
                })
            } catch (err) {
                return json({
                    status_code: 400,
                    error: "Error adding URL to LensView"
                });
            }

        } catch (err) {
            return json({
                status_code: 400,
                error: "Error signing in with Lens"
            });
        }
    } catch (err) {
        return json({
            status_code: 400,
            error: "Could not extract url from body of the request"
        });
    }
}