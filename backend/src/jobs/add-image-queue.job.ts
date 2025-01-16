import Queue from "bull";

import { addImageToPublicationJobUtil } from "../utils/jobs/add-image-to-publication.job.util.js";

import { logger } from "../log/log-manager.log.js";

export const imageQueue = new Queue("imageQueue");

imageQueue.process(async (job, done) => {
  logger.info("add-image-queue.job.ts: Process: Execution Started");
  try {
    logger.info(
      "add-image-queue.job.ts: Process: Adding Job to Queue. Job: " +
        JSON.stringify(job)
    );
    await addImageToPublicationJobUtil(job);
    done();
  } catch (error) {
    console.log("Error adding image to publication: ", error);
    done();
  }
});

imageQueue.on("completed", (job) => {
  logger.info(
    "add-image-queue.job.ts: Process: Job Completed. Job:" + JSON.stringify(job)
  );
});
