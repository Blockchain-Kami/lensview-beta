import {PUBLIC_WEB3STORAGE_TOKEN} from "$env/static/public";
import {Web3Storage} from "web3.storage";
import puppeteer from "puppeteer";
import {Blob} from "buffer";

function makeGatewayURLImage(imgCID, imgName) {
    return `https://${imgCID}.ipfs.w3s.link/${imgName}`;
}

export const uploadImage = async (url, hashedURL) => {

    try {

        const browser = await puppeteer.launch({headless: "new"});
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle2'});
        const img = await page.screenshot();
        const imgName = 'img.jpg'

        // const imgBlob = new Blob([img]);
        const screenshotBlob = new Blob([img]);
        const file = new File([screenshotBlob as BlobPart], imgName)

        const client = new Web3Storage({token: PUBLIC_WEB3STORAGE_TOKEN});

        const imgCID = await client.put([file], {name: imgName});
        const imgURL = makeGatewayURLImage(imgCID, imgName);

        console.log("Screenshot URI:", imgURL);

        await browser.close();


        return imgURL;

    } catch {
        console.log("Failed to save");
        return;
    }


}