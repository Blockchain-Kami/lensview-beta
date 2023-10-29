import { PUBLIC_WEB3STORAGE_TOKEN } from '$env/static/public';
import { Web3Storage } from 'web3.storage';
// import { ThirdwebStorage} from "@thirdweb-dev/storage";

import puppeteer from 'puppeteer';
import { Blob } from 'buffer';
import { logger } from '../../log/logManager';

const makeGatewayURLImage = (imgCID, imgName) => {
	return `https://${imgCID}.ipfs.w3s.link/${imgName}`;
};

const Screenshot = async (url) => {
	logger.info(
		'utils/backend : upload-page-screenshot.server.ts:: ' +
			'EXECUTION START: Screenshot: ' +
			'Starting Puppeteer.'
	);
	try {
		/*
		 * 1. Reason why we need pass args: ['--no-sandbox'] is because we are running this in docker container
		 * https://stackoverflow.com/questions/59087200/google-chrome-failed-to-move-to-new-namespace
		 * 2. Below minimal_args run Puppeteer with Minimal Settings
		 */
		const minimal_args = [
			'--autoplay-policy=user-gesture-required',
			'--disable-background-networking',
			'--disable-background-timer-throttling',
			'--disable-backgrounding-occluded-windows',
			'--disable-breakpad',
			'--disable-client-side-phishing-detection',
			'--disable-component-update',
			'--disable-default-apps',
			'--disable-dev-shm-usage',
			'--disable-domain-reliability',
			'--disable-extensions',
			'--disable-features=AudioServiceOutOfProcess',
			'--disable-hang-monitor',
			'--disable-ipc-flooding-protection',
			'--disable-notifications',
			'--disable-offer-store-unmasked-wallet-cards',
			'--disable-popup-blocking',
			'--disable-print-preview',
			'--disable-prompt-on-repost',
			'--disable-renderer-backgrounding',
			'--disable-setuid-sandbox',
			'--disable-speech-api',
			'--disable-sync',
			'--hide-scrollbars',
			'--ignore-gpu-blacklist',
			'--metrics-recording-only',
			'--mute-audio',
			'--no-default-browser-check',
			'--no-first-run',
			'--no-pings',
			'--no-sandbox',
			'--no-zygote',
			'--password-store=basic',
			'--use-gl=swiftshader',
			'--use-mock-keychain'
		];
		const browser = await puppeteer.launch({
			headless: true,
			args: minimal_args
		});
		const page = await browser.newPage();

		/** Disable Unnecessary Resources **/
		const blocked_domains = ['googlesyndication.com', 'adservice.google.com'];

		await page.setRequestInterception(true);
		page.on('request', (request) => {
			const url = request.url();
			if (blocked_domains.some((domain) => url.includes(domain))) {
				request.abort();
			} else {
				request.continue();
			}
		});
		/****************************************/

		await page.goto(url, { waitUntil: 'networkidle2' });
		await page.setViewport({ width: 1400, height: 3000 });
		await page.waitForTimeout(3000);
		const screenshot = await page.screenshot({ type: 'jpeg' });
		await page.close();
		await browser.close();
		logger.info(
			'utils/backend : upload-page-screenshot.server.ts:: ' +
				'EXECUTION END: Screenshot: ' +
				'DONE: Image Captured by Puppeteer.'
		);
		return screenshot;
	} catch (error) {
		logger.info(
			'utils/backend : upload-page-screenshot.server.ts:: ' +
				'EXECUTION START: Screenshot: ' +
				'FAILED: Could not Capture Image using Puppeteer: ' +
				error
		);
		throw new Error(error);
	}
};

export const uploadImage = async (url) => {
	logger.info(
		'utils/backend : upload-page-screenshot.server.ts:: ' +
			'EXECUTION START: uploadImage: ' +
			'Saving Image to Web3Storage, URL: ' +
			url
	);
	const imgName = 'image.jpg';

	try {
		const screenshot = await Screenshot(url);
		const screenshotBlob = new Blob([screenshot]);
		const file = new File([screenshotBlob as BlobPart], imgName);

		const client = new Web3Storage({ token: PUBLIC_WEB3STORAGE_TOKEN });

		const imgCID = await client.put([file], { name: imgName });
		const IPFSImageLink = makeGatewayURLImage(imgCID, imgName);
		logger.info(
			'utils/backend : upload-page-screenshot.server.ts:: ' +
				'EXECUTION END: uploadImage: ' +
				'DONE: Image Saved to Web3Storage: ' +
				IPFSImageLink
		);
		return IPFSImageLink;

		// const screenshot = await Screenshot(url);
		// const client = new ThirdwebStorage();
		// return await client.upload(screenshot);
	} catch {
		logger.error(
			'utils/backend : upload-page-screenshot.server.ts:: ' +
				'EXECUTION END: uploadImage: ' +
				'FAILED: Image Not Saved to Web3Storage.'
		);
		return;
	}
};
