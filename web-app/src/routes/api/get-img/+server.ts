import puppeteer from "puppeteer-core";
import { json } from "@sveltejs/kit";
import { PRIVATE_BROWSERLESS_KEY } from "$env/static/private";


const getBrowser = () => {
    return puppeteer.connect({ browserWSEndpoint: `wss://chrome.browserless.io?token=${PRIVATE_BROWSERLESS_KEY}` })
}


export async function POST(requestEvent) {
    const {request} = requestEvent;
    const url = await request.json();

    let browser;

    try {
        const browser = await getBrowser();
        const page = await browser.newPage();

        await page.goto(url);
        const screenshot = await page.screenshot();

        return json({
            image: screenshot
        })


    } catch (error) {
        console.log("failed to take screenshot")
    } finally {
        if (browser) {
            browser.close();
        }
    }
}

