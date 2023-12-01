import { CIDString, Web3Storage, File } from "web3.storage";
import { Blob } from "buffer";
import puppeteer from "puppeteer";
import { PUBLIC_WEB3STORAGE_TOKEN } from "../../config/env.config";
import { minimal_args } from "../../config/puppetteer.config";
import { InternalServerError } from "../../errors/internal-server-error.error";

/**
 * Generates a gateway URL for an image based on the image CID and image name.
 *
 * @param {CIDString} imgCID - The CID of the image.
 * @param {string} imgName - The name of the image.
 * @return {string} The generated gateway URL for the image.
 */
const makeGatewayURLImage = (imgCID: CIDString, imgName: string) => {
  return `https://${imgCID}.ipfs.w3s.link/${imgName}`;
};

/**
 * Takes a screenshot of a webpage given its URL.
 *
 * @param {string} url - The URL of the webpage to take a screenshot of.
 * @return {Promise<Buffer>} A Promise that resolves to the screenshot image as a Buffer.
 * @throws {InternalServerError} If there is an error while taking the screenshot.
 */
const Screenshot = async (url: string) => {
  try {
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

    await page.goto(url, { waitUntil: "networkidle2" });
    await page.setViewport({ width: 1400, height: 3000 });
    await page.waitForTimeout(3000);
    const screenshot = await page.screenshot({ type: "jpeg" });
    await page.close();
    await browser.close();
    return screenshot;
  } catch (error) {
    throw new InternalServerError(
      "Error while taking screenshot",
      500,
      "Internal Server Error",
      false
    );
  }
};

/**
 * Fetches a screenshot from the given URL and uploads it to IPFS.
 *
 * @param {string} url - The URL of the website to take a screenshot of.
 * @return {Promise<string>} - A promise that resolves to the URL of the uploaded image on IPFS.
 */
export const fetchScreenshotUploadIPFSUtil = async (url: string) => {
  const imgName = "image.jpg";

  try {
    const screenshot = await Screenshot(url);
    console.log("Screenshot taken successfully");
    const screenshotBlob = new Blob([screenshot]);
    const file = new File([screenshotBlob as BlobPart], imgName);
    const client = new Web3Storage({ token: PUBLIC_WEB3STORAGE_TOKEN });
    const imgCID = await client.put([file], { name: imgName });
    console.log("Screenshot image stored: " + makeGatewayURLImage(imgCID, imgName))
    return makeGatewayURLImage(imgCID, imgName);
  } catch ( error ) {
    throw new InternalServerError(
      "Error while uploading screenshot to IPFS: " + error,
      500,
      "Internal Server Error",
      false
    );
  }
};
