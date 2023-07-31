import {uploadImage} from "./upload-page-screenshot.server";
import addComment from "./add-comment.server";
import {signInWithLens} from "./lens-sign-in.server";
import {getParentPost} from "./get-parent-url.server";


export const addImageToPublication = async (job) => {

    const [ client, signer, profile ] = await signInWithLens();
    const { imageUrlObj } = job['data'];
    const hashedURL = imageUrlObj['hashedURL'];

    const res = await getParentPost(hashedURL);
    const parentPostID = res['parent_post_ID'];
    const sourceURL = res['source_url'];

    imageUrlObj['image'] = await uploadImage(sourceURL);

    await addComment(imageUrlObj, parentPostID , client, signer, profile);
    return


}