import {uploadImage} from "./upload-page-screenshot.server";
import postImageComment from "./add-image-comment.server";
import {signInWithLens} from "./lens-sign-in.server";
import {getParentPost} from "./get-parent-url.server";


export const addImageToPublication = async (job) => {

    const [ client, signer, profile ] = await signInWithLens();
    const { urlObj } = job['data'];
    const hashedURL = urlObj['hashedURL'];

    const res = await getParentPost(hashedURL);
    const parentPostID = res['parent_post_ID'];
    const sourceURL = res['source_url'].substring(15,);

    urlObj['image'] = await uploadImage(sourceURL);

    await postImageComment(urlObj, parentPostID , client, signer, profile);
    return


}