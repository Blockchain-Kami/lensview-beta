import puppeteer from "puppeteer";
import { create } from "@web3-storage/w3up-client";

import { InternalServerError } from "../../errors/internal-server-error.error.js";

import { WEB3_STORAGE_DID_KEY } from "../../config/env.config.js";
import { minimal_args } from "../../config/puppetteer.config.js";
import { logger } from "../../log/log-manager.log.js";

/**
 * Fetches a screenshot from the given URL and uploads it to IPFS.
 *
 * @param {string} url - The URL of the website to take a screenshot of.
 * @return {Promise<string>} - A promise that resolves to the URL of the uploaded image on IPFS.
 */
export const fetchScreenshotAndUploadToIPFSJobUtil = async (url: string) => {
  logger.info(
    "fetch-screenshot-and-upload-to-ipfs.job.ts: fetchScreenshotAndUploadToIPFSJobUtil: Execution Started."
  );
  logger.info(
    "fetch-screenshot-and-upload-to-ipfs.job.ts: fetchScreenshotAndUploadToIPFSJobUtil: URL: " +
      url
  );
  // const imgName = "image.jpg";
  const client = await create();
  await client.setCurrentSpace(`did:key:${WEB3_STORAGE_DID_KEY}`);

  try {
    const screenshot = await Screenshot(url);
    const screenshotBlob = new Blob([screenshot]);
    // const file = new File([screenshotBlob as BlobPart], imgName);
    // const client = new Web3Storage({ token: WEB3STORAGE_TOKEN });
    // const imgCID = await client.put([file], { name: imgName });
    const imgCID = await client.uploadFile(screenshotBlob);
    const imgCIDURL = `https://${imgCID}.ipfs.w3s.link/`;
    logger.info(
      "fetch-screenshot-and-upload-to-ipfs.job.ts: fetchScreenshotAndUploadToIPFSJobUtil: Execution Ended. Image CID: " +
        imgCIDURL
    );
    return imgCIDURL;
  } catch (error) {
    logger.error(
      "fetch-screenshot-and-upload-to-ipfs.job.ts: fetchScreenshotAndUploadToIPFSJobUtil: Execution Ended. Error in Execution: " +
        error
    );
    throw new InternalServerError(
      "Error while uploading screenshot to IPFS: " + error,
      500,
      "Internal Server Error",
      false
    );
  }
};

/**
 * Takes a screenshot of a webpage given its URL.
 *
 * @param {string} url - The URL of the webpage to take a screenshot of.
 * @return {Promise<Buffer>} A Promise that resolves to the screenshot image as a Buffer.
 * @throws {InternalServerError} If there is an error while taking the screenshot.
 */
const Screenshot = async (url: string) => {
  logger.info(
    "fetch-screenshot-and-upload-to-ipfs.job.ts: Screenshot: Execution Started."
  );
  logger.info(
    "fetch-screenshot-and-upload-to-ipfs.job.ts: Screenshot: Fetching screenshot for URL: " +
      url
  );
  try {
    logger.info(
      "fetch-screenshot-and-upload-to-ipfs.job.ts: Screenshot: Lauching Puppeteer"
    );
    const browser = await puppeteer.launch({
      headless: true,
      args: minimal_args
    });
    const page = await browser.newPage();

    /** Disable Unnecessary Resources **/
    const blocked_domains = ["googlesyndication.com", "adservice.google.com"];
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      const url = request.url();
      if (blocked_domains.some((domain) => url.includes(domain))) {
        request.abort();
      } else {
        request.continue();
      }
    });
    logger.info(
      "fetch-screenshot-and-upload-to-ipfs.job.ts: Screenshot: Navigating to URL: " +
        url
    );
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.setViewport({ width: 1400, height: 3000 });
    await page.waitForTimeout(3000);
    const screenshot = await page.screenshot({ type: "jpeg" });
    await page.close();
    await browser.close();
    logger.info(
      "fetch-screenshot-and-upload-to-ipfs.job.ts: Screenshot: Execution Ended. Screenshot taken successfully."
    );
    return screenshot;
  } catch (error) {
    logger.error(
      "fetch-screenshot-and-upload-to-ipfs.job.ts: Screenshot: Execution Ended. Error in taking screenshot: " +
        error
    );
    throw new InternalServerError(
      "Error while taking screenshot",
      500,
      "Internal Server Error",
      false
    );
  }
};
