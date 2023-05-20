import {json} from '@sveltejs/kit'
import {createHash} from "../../../utils/backend/sha1.server";
import {signInWithLens} from '../../../utils/backend/lens-sign-in.server';
import {preprocessURL} from "../../../utils/backend/process-url.server.ts";
import {uploadImage} from "../../../utils/backend/upload-page-screenshot.server";
import savePost from "../../../utils/backend/add-url.server";

export async function POST(requestEvent) {
    //TODO: Get status code from graphQL server. (NOTE:A GraphQL API
    // will always return a 200 OK Status Code, even in case of error.
    // You'll get a 5xx error in case the server is not available at all.)
    try {
        let imgURL;
        const {request} = requestEvent;
        const body = await request.json();
        const url = body['url'];

        const [origin, path] = preprocessURL(url);
        const hashedURL = createHash(url);
        const hashedOrigin = createHash(origin);
        const hashedPath = createHash(path);

        try {
            imgURL = await uploadImage(path, hashedURL);

        } catch (err) {
            console.log(err);
            return json({
                code: 404,
                description: "Could not add url image to web3.js. Function uploadImage(url, hashedURL)",
            })
        }


        const urlObj = {
            "url": url,
            "hashedURL": hashedURL,
            "origin": origin,
            "hashedOrigin": hashedOrigin,
            "path": path,
            "hashedPath": hashedPath,
            "imageURL": imgURL
        };

        try {
            const [client, signer, profile] = await signInWithLens();

            try {
                await savePost(urlObj, client, signer, profile);
                return json({
                    statusCode: 201,
                    message: 'Post saved successfully',
                    url: url,
                    hashedURL: hashedURL
                })

            } catch (err) {
                return json({
                    status_code: 404,
                    error: "Error adding URL to LensView"
                });
            }

        } catch (err) {
            return json({
                status_code: 404,
                error: "Error signing in with Lens"
            });
        }

    } catch (err) {
        return json({
            code: 404,
            error: err,
            reason: "Invalid URL provided"
        })
    }
}