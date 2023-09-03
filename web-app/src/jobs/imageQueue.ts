import Queue from 'bull';
import {addImageToPublication} from "../utils/backend/add-image-to-publication.server";
import {logger} from "../log/logManager";

export const imageQueue = new Queue('imageQueue');

imageQueue.process(async (job, done) => {
    logger.info("/src/jobs : imageQueue.ts:: " + "EXECUTION START: Adding Job To Bull Queue" );
    await addImageToPublication(job);
    done();
})

imageQueue.on('completed', (job) => {
    logger.info("/src/jobs : imageQueue.ts:: " + "EXECUTION END: Job Completed for URL: " + job['data']['url'] );
});

