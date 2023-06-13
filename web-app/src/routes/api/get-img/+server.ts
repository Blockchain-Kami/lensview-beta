import puppeteer from "puppeteer";
import { json } from "@sveltejs/kit";

export async function POST(requestEvent) {

    const startTime = Date.now();
    const { request } = requestEvent;
    const url = await request.json();
    /**
     * 1. Reason why we need pass args: ['--no-sandbox'] is because we are running this in docker container
     * https://stackoverflow.com/questions/59087200/google-chrome-failed-to-move-to-new-namespace
     * 2. Below minimal_args run Puppeteer with Minimal Settings
     */
    const minimal_args = [
        "--autoplay-policy=user-gesture-required",
        "--disable-background-networking",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-breakpad",
        "--disable-client-side-phishing-detection",
        "--disable-component-update",
        "--disable-default-apps",
        "--disable-dev-shm-usage",
        "--disable-domain-reliability",
        "--disable-extensions",
        "--disable-features=AudioServiceOutOfProcess",
        "--disable-hang-monitor",
        "--disable-ipc-flooding-protection",
        "--disable-notifications",
        "--disable-offer-store-unmasked-wallet-cards",
        "--disable-popup-blocking",
        "--disable-print-preview",
        "--disable-prompt-on-repost",
        "--disable-renderer-backgrounding",
        "--disable-setuid-sandbox",
        "--disable-speech-api",
        "--disable-sync",
        "--hide-scrollbars",
        "--ignore-gpu-blacklist",
        "--metrics-recording-only",
        "--mute-audio",
        "--no-default-browser-check",
        "--no-first-run",
        "--no-pings",
        "--no-sandbox",
        "--no-zygote",
        "--password-store=basic",
        "--use-gl=swiftshader",
        "--use-mock-keychain"
    ];
    const browser = await puppeteer.launch({
        headless: true,
        args: minimal_args
    });
    const page = await browser.newPage();

    /** Disable Unnecessary Resources **/
    const blocked_domains = [
        "googlesyndication.com",
        "adservice.google.com"
    ];

    await page.setRequestInterception(true);
    page.on("request", request => {
        const url = request.url();
        if (blocked_domains.some(domain => url.includes(domain))) {
            request.abort();
        } else {
            request.continue();
        }
    });
    /****************************************/

    await page.goto(url, { waitUntil: "networkidle2" });
    await page.setViewport({ width: 1400, height: 3000 });
    await page.waitForTimeout(3000);
    const img = await page.screenshot({ type: "jpeg" });
    await browser.close();

    const endTime = Date.now();
    console.log("Time taken: ", endTime - startTime);

    return json({
        image: img
    });
}
