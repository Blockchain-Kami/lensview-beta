import Queue from 'bull';
import {addImageToPublication} from "../utils/backend/add-image-to-publication.server";
import checkTxHashBeenIndexed from "../utils/checkTxHashBeenIndexed";

export const imageQueue = new Queue('imageQueue');

imageQueue.process(async (job, done) => {
    await checkUntilMainPostAdded(job['data']['txHash'], Date.now());
    await addImageToPublication(job);
    done();
})

imageQueue.on('completed', (job) => {
    console.log("Job completed for", job['data']);
});

const checkUntilMainPostAdded = async (txHash, startTime) => {
    /** If link is not added to lensview within 25 seconds, then stop checking */
    if (Date.now() - startTime > 25000) {
        console.log("Error indexing main post, time exceeded 25 seconds");
    }

    const hasIndexedResponse = await checkTxHashBeenIndexed(txHash);

    if (hasIndexedResponse?.data?.hasTxHashBeenIndexed?.indexed === false) {
        console.log("Waiting for link to be added to lensview");
        setTimeout(() => checkUntilMainPostAdded(txHash, startTime), 1000);
    } else {
        console.log("Transaction indexed");
        return
    }
};