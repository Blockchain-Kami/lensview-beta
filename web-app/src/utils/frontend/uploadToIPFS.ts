import { PUBLIC_WEB3STORAGE_TOKEN } from '$env/static/public';
import { Web3Storage } from 'web3.storage';
import { v4 as uuid } from 'uuid';

function makeStorageClient() {
	return new Web3Storage({ token: PUBLIC_WEB3STORAGE_TOKEN });
}

function makeFileObjects(profileHandle: string, userEnteredContent: string) {
	// You can create File objects from a Blob of binary data
	// see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
	// Here we're just storing a JSON object, but you can store images,
	// audio, or whatever you want!

	const metaData = {
		version: '2.0.0',
		content: userEnteredContent,
		description: userEnteredContent,
		name: `Post by @${profileHandle}`,
		external_url: 'https://lensView.xyz',
		metadata_id: uuid(),
		mainContentFocus: 'TEXT_ONLY',
		attributes: [],
		locale: 'en-US',
		appId: 'lensview-beta'
	};
	const blob = new Blob([JSON.stringify(metaData)], { type: 'application/json' });

	return [new File(['contents-of-file-1'], 'plain-utf8.txt'), new File([blob], 'metaData.json')];
}

const uploadToIPFS = async (profileHandle: string, userEnteredContent: string) => {
	/*** Web3.storage ***/
	const client = makeStorageClient();
	const cid = await client.put(makeFileObjects(profileHandle, userEnteredContent));
	console.log('stored files with cid:', cid);
	const uri = `https://${cid}.ipfs.w3s.link/metaData.json`;

	console.log('URI : ' + uri);
	return uri;
};

export default uploadToIPFS;
