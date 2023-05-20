import {PUBLIC_WEB3STORAGE_TOKEN} from "$env/static/public";
import {getFilesFromPath, Web3Storage} from "web3.storage";
import * as fs from "fs";
import puppeteer from "puppeteer";

function makeGatewayURLImage(imgCID, imgName) {
    return `https://${imgCID}.ipfs.w3s.link/${imgName}`;
}

export const uploadImage = async (url, hashedURL) => {

    try {

        const browser = await puppeteer.launch({headless: "new"});
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle2'});
        await page.screenshot({path: './img.jpg'});
        await browser.close();

    } catch {
        console.log("Failed to save");
        return;
    }

    const client = new Web3Storage({token: PUBLIC_WEB3STORAGE_TOKEN});
    const img = await getFilesFromPath('./img.jpg');
    const imgName = img[0].name;
    console.log(imgName);

    const imgCID = await client.put(img, {name: imgName});
    const imgURL = makeGatewayURLImage(imgCID, imgName);

    console.log(imgURL);

    fs.unlinkSync('./img.jpg');


    return imgURL;
}