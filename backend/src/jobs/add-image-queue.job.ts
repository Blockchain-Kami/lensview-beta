import Queue from "bull";
import { addImageToPublicationUtil } from "../utils/jobs/add-image-to-publication.job.util";

export const imageQueue = new Queue("imageQueue");

imageQueue.process(async (job, done) => {
  await addImageToPublicationUtil(job);
  done();
});

imageQueue.on("completed", (job) => {
  console.log(
    "/src/jobs : imageQueue.ts:: " +
      "EXECUTION END: Job Completed for URL: " +
      job
  );
});
