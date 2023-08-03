import { json, error } from "@sveltejs/kit";
import {signInWithLens} from "../../../utils/backend/lens-sign-in.server";
import commentAnonymously from "../../../utils/backend/comment-anonymously.server";

export async function POST( requestEvent ) {
    const { request } = requestEvent;
    const requestBody = await request.json();

    const pubId = requestBody['parentPub'];
    const commentContent = requestBody['commentContent'];

    const [ client, signer, profile ] = await signInWithLens();

    const txHash = await commentAnonymously(pubId, commentContent, client, signer, profile);

    if (txHash) {
        return json({
            message: `Anonymous comment added to publication ID: ${pubId}`
        })
    } else {
        throw error(500, {
            message: "Error: Failed to add anonymous comment."
        })
    }

}