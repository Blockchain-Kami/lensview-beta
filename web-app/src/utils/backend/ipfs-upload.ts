/**
 * Web3 Storage Code
 */
import {WEB3STORAGE_TOKEN} from "$env/static/private";
import {File, Web3Storage} from "web3.storage";
import {v4 as uuidv4} from "uuid";

function getAccessToken() {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    // return 'paste-your-token-here'

    // In a real app, it's better to read an access token from an
    // environment variable or other configuration that's kept outside of
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    // Get the web3.storage access token from the API token section

    return WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
    return new Web3Storage({token: getAccessToken()})
}

function makeFileObjects(url, hashedURL) {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!

    // //Getting profile of the connected user and saving it to "profile" variable
    // getUserProfile(address);

    const metaData = {
        version: '2.0.0',
        content: url,
        description: `LensView post: ${url}`,
        name: `Posting on test-net through lensView`,
        external_url: 'https://lensView.xyz',
        metadata_id: uuidv4(),
        mainContentFocus: 'TEXT_ONLY',
        attributes: [],
        locale: 'en-US',
        appId: 'LensView',
        tags: [hashedURL]
    }
    const blob = new Blob([JSON.stringify(metaData)], {type: 'application/json'})
    // const buffer = Buffer.from(JSON.stringify(metaData))


    const files = [
        new File(['contents-of-file-1'], 'plain-utf8.txt'),
        new File([blob as BlobPart], 'metaData.json')
    ]
    return files
}

/*********************************/

/**
 * 4. Upload to IPFS
 */
const uploadToIPFS = async (url, hashedURL) => {

    /*** Web3.storage ***/
    const client = makeStorageClient()
    const cid = await client.put(makeFileObjects(url, hashedURL))
    console.log('stored files with cid:', cid)
    const uri = `https://${cid}.ipfs.w3s.link/metaData.json`

    console.log("URI : " + uri);
    return uri
}

export default uploadToIPFS;