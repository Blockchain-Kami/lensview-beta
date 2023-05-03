import {json} from '@sveltejs/kit'
import {createHash} from "../../../utils/backend/sha1";
import {signInWithLens} from '../../../utils/backend/lens-sign-in';


import savePost from "../../../utils/backend/add-url";


const API_URL = 'https://api-mumbai.lens.dev'
// const address = "0xb4Ac88D8312fffaF6334FF20Db91594f75ebA899";



export async function GET(request) {
    const url = request.url.searchParams.get('url');
    const hashedURL = createHash(url);
    console.log(hashedURL)
    const [client, signer, profile] = await signInWithLens();
    const res = savePost(url, hashedURL, client, signer, profile);
    return json({
        res: res
    })

}