import {MetadataObjectModel} from "../../models/metadata-object.model";
import {getRelatedPublicationsService} from "../../services/lens/related-parent-publications.lens.service";
import {fetchScreenshotAndUploadToIPFSJobUtil} from "./fetch-screenshot-and-upload-to-ipfs.job.util";
import {createMetaDataForImageCommentHelperUtil} from "../helpers/create-metadata.helper.util";
import commentOnchainPublicationUtil from "../publications/comment-onchain.publication.util";
import {InternalServerError} from "../../errors/internal-server-error.error";

export const uploadScreenshotAndImageCommentJobUtil = async (
    urlObj: MetadataObjectModel
) => {
    try {
        const hashedURL = urlObj.hashedURL;
        const res = await getRelatedPublicationsService([hashedURL]);
        const parentPostID = res?.items[0]?.id;
        console.log("Adding image to: " + parentPostID);
        const sourceURL = urlObj.url;
        console.log("Source URL to add image: " + sourceURL);
        urlObj.image = await fetchScreenshotAndUploadToIPFSJobUtil(sourceURL);
        const imageMetadata = createMetaDataForImageCommentHelperUtil(urlObj);
        await commentOnchainPublicationUtil(parentPostID, imageMetadata);
        console.log("Image Comment Added: " + parentPostID);
        return;
    } catch (e) {
        throw new InternalServerError("Error while adding image to publication: " + e, 500, "Internal Server Error", false);
    }

}