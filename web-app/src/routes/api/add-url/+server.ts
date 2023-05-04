import {json} from '@sveltejs/kit'
import {createHash} from "../../../utils/backend/sha1";
import {signInWithLens} from '../../../utils/backend/lens-sign-in';


import savePost from "../../../utils/backend/add-url";

export async function POST(requestEvent) {
    const url = requestEvent.url.searchParams.get('url');
    const hashedURL = createHash(url);
    console.log(hashedURL)
    const [client, signer, profile] = await signInWithLens();
    const res = savePost(url, hashedURL, client, signer, profile);
    return json({
        url: url,
        hashedURL: hashedURL
    })

}