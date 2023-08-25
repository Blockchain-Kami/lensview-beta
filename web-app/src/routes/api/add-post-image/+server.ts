import {isInputTypeUrl} from "../../../utils/backend/check-input-type.server";
import {error, json} from "@sveltejs/kit";
import {preprocessURL} from "../../../utils/backend/process-url.server";
import {createHash} from "../../../utils/backend/sha1.server";
import {signInWithLens} from "../../../utils/backend/lens-sign-in.server";
import {PUBLIC_APP_LENS_ID, PUBLIC_LENS_API_URL} from "$env/static/public";
import getPosts from "../../../graphql/getPosts";
import {uploadImage} from "../../../utils/backend/upload-page-screenshot.server";
import addImageComment from "../../../utils/backend/add-comment.server";

export async function POST(requestEvent) {

    try {
        const {request} = requestEvent;
        const enteredURL = await request.json();

        const urlString = isInputTypeUrl(enteredURL);
        let lensHandle, pubId, sourceURL;

        if (!urlString) {
            throw error(500, {
                isURL: false,
                message: 'User entered a tag'
            });
        }

        const [url, hostname, domain, path, query] = preprocessURL(urlString);
        const hashedURL = createHash(url);
        const hashedHostname = createHash(hostname);
        const hashedPath = createHash(path);

        const authToken = await signInWithLens();

        if (!authToken) {
            throw error(500, {
                message: 'Error: Could not sign in with Lens.'
            });
        }

        const [client, signer, profile] = authToken;

        try {
            const posts = await fetch(PUBLIC_LENS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: getPosts,
                    variables: {
                        hashedURL: hashedURL,
                        lensId: PUBLIC_APP_LENS_ID
                    }
                })
            });
            const response = await posts.json();
            lensHandle = response.data.publications.items[0].profile.handle;
            pubId = response.data.publications.items[0].id;
            sourceURL = response.data.publications.items[0].metadata.content;

        } catch (err) {
            throw error(500, 'Could not connect to Lens Protocol');
        }

        const urlObj = {
            url,
            hashedURL,
            hostname,
            hashedHostname,
            domain,
            path,
            hashedPath,
            query,
            lensHandle,
            postContent: '',
            tags: '',
            image: ''
        };

        urlObj['image'] = await uploadImage(sourceURL);
        await addImageComment(urlObj, pubId, client, signer, profile);

        return json('Image has been added.');

    } catch (e) {
        return error(500, {
            message: 'Failed to add screenshot.'
        })
    }


}