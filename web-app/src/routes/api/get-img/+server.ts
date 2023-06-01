import puppeteer from "puppeteer";
import { json } from "@sveltejs/kit";

export async function POST(requestEvent) {

    const { request } = requestEvent;
    const url = await request.json();
    /**
     * Reason why we need pass args: ['--no-sandbox'] is because we are running this in docker container
     * https://stackoverflow.com/questions/59087200/google-chrome-failed-to-move-to-new-namespace
     */
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url, { timeout: 0 });
    const img = await page.screenshot({ path: "example.png" });
    await browser.close();

    return json({
        image: img
    });
}
