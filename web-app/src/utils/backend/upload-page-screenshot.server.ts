import {PUBLIC_WEB3STORAGE_TOKEN} from "$env/static/public";
import {Web3Storage} from "web3.storage";

import puppeteer from 'puppeteer';
import {Blob} from "buffer";

const makeGatewayURLImage = (imgCID, imgName) => {
    return `https://${imgCID}.ipfs.w3s.link/${imgName}`;
}

const Screenshot = async (url) => {

    try {

        console.log("Launching playwright", url);
        const browser = await puppeteer
            .launch({headless:false
            });
        console.log("Launched")
        const page = await browser.newPage();
        await page.goto(url);
        const screenshot = await page.screenshot();
        await page.close();
        await browser.close();
        return screenshot;

    } catch(e){

        console.log("Could not connect to puppeteer");
        console.log(e);

    }

}

export const uploadImage = async (url) => {

    const imgName = "image.jpg";

    try {
        const screenshot = await Screenshot(url);

        console.log(screenshot,"From puppeteer");

        const screenshotBlob = new Blob([screenshot]);

        console.log("Screenshot blob", screenshotBlob);

        const file = new File([screenshotBlob as BlobPart], imgName )

        console.log("File", file);

        const client = new Web3Storage({token: PUBLIC_WEB3STORAGE_TOKEN});

        console.log("Putting files");
        const imgCID = await client.put([file], {name: imgName});
        console.log("Image uploded");
        const imgURL = makeGatewayURLImage(imgCID, imgName);

        console.log("Screenshot URI:", imgURL);

        return imgURL;

    } catch {
        console.log("Failed to save");
        return;
    }


}