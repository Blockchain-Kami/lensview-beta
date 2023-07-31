import Queue from 'bull';
import {addImageToPublication} from "../utils/backend/add-image-to-publication.server";

export const imageQueue = new Queue('imageQueue');

imageQueue.process(async (job, done) => {
    await addImageToPublication(job);
    done();
})

imageQueue.on('completed', (job) => {
    console.log("Job completed for", job['data']);
});

