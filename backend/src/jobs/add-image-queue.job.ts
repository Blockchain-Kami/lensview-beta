import Queue from "bull";
import { addImageToPublicationJobUtil } from "../utils/jobs/add-image-to-publication.job.util";

export const imageQueue = new Queue("imageQueue");

imageQueue.process(async (job, done) => {
  try {
    await addImageToPublicationJobUtil(job);
    done();
  } catch ( error ) {
    console.log("Error adding image to publication: ", error);
    done();
  }

});

imageQueue.on("completed", (job) => {
  console.log(
    "/src/jobs : imageQueue.ts:: " +
      "EXECUTION END: Job Completed for URL: " +
      job
  );
});
