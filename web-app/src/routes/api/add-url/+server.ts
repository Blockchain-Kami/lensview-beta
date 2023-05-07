import {json} from '@sveltejs/kit'
import {createHash} from "../../../utils/backend/sha1.server";
import {signInWithLens} from '../../../utils/backend/lens-sign-in.server';


import savePost from "../../../utils/backend/add-url.server";

export async function POST(requestEvent) {
    try {
        const {request} = requestEvent;
        const url = await request.json();
        const hashedURL = createHash(url);
        try {
            const [client, signer, profile] = await signInWithLens();

            try {
                await savePost(url, hashedURL, client, signer, profile);
                return json({
                    url: url,
                    hashedURL: hashedURL
                })
            } catch (err) {
                return json({
                    error: err,
                    reason: "Error adding URL to LensView"
                });
            }

        } catch (err) {
            return json({
                error: err,
                reason: "Error signing in with Lens"
            });
        }
    } catch (err) {
        return json({
            error: err,
            reason: "Could not extract url from body of the request"
        });
    }
}