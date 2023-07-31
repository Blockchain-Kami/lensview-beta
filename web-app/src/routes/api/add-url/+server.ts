import { error, json } from "@sveltejs/kit";
import { createHash } from "../../../utils/backend/sha1.server";
import { signInWithLens } from "../../../utils/backend/lens-sign-in.server";
import { preprocessURL } from "../../../utils/backend/process-url.server";
import savePost from "../../../utils/backend/add-url.server";
import { imageQueue } from "../../../jobs/imageQueue";
import { isInputTypeUrl } from "../../../utils/backend/check-input-type.server";
import { checkUntilMainPostAdded } from "../../../utils/backend/check-until-post-added.server";
import { getParentPost } from "../../../utils/backend/get-parent-url.server";
import addComment from "../../../utils/backend/add-comment.server";


export async function POST(requestEvent) {
    //TODO: Get status code from graphQL server. (NOTE:A GraphQL API
    // will always return a 200 OK Status Code, even in case of error.
    // You'll get a 5xx error in case the server is not available at all.)

    const {request} = requestEvent;
    const urlRequest = await request.json();

    const enteredURL = urlRequest['enteredURL'];
    const lensHandle = urlRequest['lensHandle'];
    const postContent = urlRequest['postContent'];
    // user entered tags

    const urlString = isInputTypeUrl(enteredURL);

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
        postContent,
        "isScreenshotComment": false
    };

    const imageUrlObj = {
        url,
        hashedURL,
        hostname,
        hashedHostname,
        path,
        hashedPath,
        query,
        "image": '',
        "isScreenshotComment": true
    }

    const authToken = await signInWithLens();

    if (!authToken) {
        throw error(500, {
            message: "Error: Could not sign in with Lens."
        });
    }

    const [client, signer, profile] = authToken;

    const publicationExists = await getParentPost(hashedURL);

    if (publicationExists['parent_post_ID']) {

        if (lensHandle) {
            // front end will do the posting, throw error
            return json({
                parentPubId: publicationExists['parent_post_ID'],
                successCode: 1,
                message: "Link is already added to LensView."
            })
        } else if (postContent) {
            const commentAdded = await addComment(urlObj, publicationExists['parent_post_ID'], client, signer, profile);

            if (commentAdded) {
                return json({
                    parentPubId: publicationExists['parent_post_ID'],
                    successCode: 2,
                    message: "Link was already present in LensView. User comment added to the post."
                })
            }
        }
    }

    const txHash = await savePost(urlObj, client, signer, profile);

    if (!txHash) {
        throw error(500, {
            message: "Error: Failed to save URL to LensView"
        });
    }
    const indexed = await checkUntilMainPostAdded(txHash, Date.now());

    if (indexed) {
        imageQueue.add({ imageUrlObj });
        const publicationID = await getParentPost(hashedURL);

        if (lensHandle) {
            // front end will post the user comment, return response
            return json({
                parentPubId: publicationID['parent_post_ID'],
                successCode: 3,
                message: 'New URL added to LensView successfully',
            })
        } else {
            // user adds comment anonymously
            const commentAdded = await addComment(urlObj, publicationID['parent_post_ID'], client, signer, profile);
            if (commentAdded) {
                return json({
                    parentPubId: publicationID['parent_post_ID'],
                    successCode: 4,
                    message: "User comment added to the post"
                })
            }
        }


    } else {
        throw error(500, {
            message: "Error: Transaction not indexed by Lens API. Time exceeded 60 seconds."
        })
    }
}
