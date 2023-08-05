import {uploadImage} from "./upload-page-screenshot.server";
import addImageComment from "./add-comment.server";
import {signInWithLens} from "./lens-sign-in.server";
import {getParentPost} from "./get-parent-url.server";


export const addImageToPublication = async (job) => {

    const [ client, signer, profile ] = await signInWithLens();
    const { urlObj } = job['data'];
    const hashedURL = urlObj['hashedURL'];

    const res = await getParentPost(hashedURL);
    const parentPostID = res['parent_post_ID'];
    const sourceURL = res['source_url'];

    urlObj['image'] = await uploadImage(sourceURL);

    await addImageComment(urlObj, parentPostID , client, signer, profile);
    return


}