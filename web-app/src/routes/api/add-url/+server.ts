import {error, json} from "@sveltejs/kit";
import { createHash } from "../../../utils/backend/sha1.server";
import { signInWithLens } from "../../../utils/backend/lens-sign-in.server";
import { preprocessURL } from "../../../utils/backend/process-url.server";
import savePost from "../../../utils/backend/add-url.server";
import {imageQueue} from "../../../jobs/imageQueue";
import {isInputTypeUrl} from "../../../utils/backend/check-input-type.server";


export async function POST(requestEvent) {
    //TODO: Get status code from graphQL server. (NOTE:A GraphQL API
    // will always return a 200 OK Status Code, even in case of error.
    // You'll get a 5xx error in case the server is not available at all.)

    const {request} = requestEvent;
    const urlRequest = await request.json();

    const urlString = isInputTypeUrl(urlRequest);

    if (!urlString) {
        throw error(500, {
            isURL: false,
            message: "User entered a tag"
        });
    }

    const [url, hostname, path, query] = preprocessURL(urlString);
    const hashedURL = createHash(url);
    const hashedHostname = createHash(hostname);
    const hashedPath = createHash(path);


    const urlObj = {
        url,
        hashedURL,
        hostname,
        hashedHostname,
        path,
        hashedPath,
        query,
        "image": ''
    };

    const authToken = await signInWithLens();

    if (!authToken) {
        throw error(500, {
            message: "Error: Could not sign in with Lens."
        });
    }

    const [client, signer, profile] = authToken;

    const txHash = await savePost(urlObj, client, signer, profile);

    if (!txHash) {
        throw error(500, {
            message: "Error: Failed to save URL to LensView"
        });
    }

    await imageQueue.add({ txHash, urlObj });

    return json({
        statusCode: 201,
        message: 'Post saved successfully',
        url: url,
        hashedURL: hashedURL,
        txHash
    })
}
