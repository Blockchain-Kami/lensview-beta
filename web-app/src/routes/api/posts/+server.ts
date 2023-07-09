import {json} from '@sveltejs/kit';
import { error } from '@sveltejs/kit'
import {getParentPost} from "../../../utils/backend/get-parent-url.server";
import {preprocessURL} from "../../../utils/backend/process-url.server";
import {createHash} from "../../../utils/backend/sha1.server";
import {isInputTypeUrl} from "../../../utils/backend/check-input-type.server";

export async function POST(requestEvent) {
    const {request} = requestEvent;
    const urlRequest = await request.json();

    const isUrl = isInputTypeUrl(urlRequest);

    if (isUrl) {
        const [url, , ,] = preprocessURL(urlRequest);

        if (!url) {
            throw error(400, {
                message: "Error processing the URL"
            });
        }
        const hashedURL = createHash(url);
        const res = await getParentPost(hashedURL);

        if (res['parent_post_ID']) {
            const parentPostID = res['parent_post_ID'];

            const response = {
                parentPublicationID: parentPostID,
                isURL: true,
                message: "Parent publication ID was fetched successfully"
            };
            return json(response);
        } else if (res['status'] == 404) {
            const response = {
                parentPublicationID: null,
                isURL: true,
                message: "Could not find any publications on Lens Protocol"
            };
            return json(response);

        } else {
            throw error(500, {
                parentPublicationID: null,
                isURL: true,
                message: "Could not connect to Lens Protocol."
            });
        }
    } else {
        const response = {
            parentPublicationID: null,
            isURL: false,
            message: "User entered a tag"
        };
        return json(response);
    }
}
