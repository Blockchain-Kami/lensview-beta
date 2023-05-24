// import puppeteer from "puppeteer-core";
import { json } from "@sveltejs/kit";
// import { PRIVATE_BROWSERLESS_KEY } from "$env/static/private";
import {chromium} from "playwright";

// const getBrowser = () => {
//     return puppeteer.connect({ browserWSEndpoint: `wss://chrome.browserless.io?token=${PRIVATE_BROWSERLESS_KEY}` })
// }
//
//
// export async function POST(requestEvent) {
//     const {request} = requestEvent;
//     const url = await request.json();
//
//     let browser;
//
//     try {
//         const browser = await getBrowser();
//         const page = await browser.newPage();
//
//         await page.goto(url);
//         const screenshot = await page.screenshot();
//
//         return json({
//             image: screenshot
//         })
//
//
//     } catch (error) {
//         console.log("failed to take screenshot")
//     } finally {
//         if (browser) {
//             browser.close();
//         }
//     }
// }

export async function POST(requestEvent) {
    const browser = await chromium.launch();

    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 1080 });
    await page.goto("http://nytimes.com");
    const result = await page.screenshot();
    await browser.close();

    return json({
        data:result
    })
}
