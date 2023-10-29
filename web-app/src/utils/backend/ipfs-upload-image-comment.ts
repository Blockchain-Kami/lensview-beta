/**
 * Web3 Storage Code
 */
import {
	PUBLIC_APP_LENS_HANDLE,
	PUBLIC_DOMAIN_NAME,
	PUBLIC_SOURCE_APP_ID,
	PUBLIC_WEB3STORAGE_TOKEN
} from '$env/static/public';
import { File, Web3Storage } from 'web3.storage';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../../log/logManager';

function getAccessToken() {
	// If you're just testing, you can paste in a token
	// and uncomment the following line:
	// return 'paste-your-token-here'

	// In a real app, it's better to read an access token from an
	// environment variable or other configuration that's kept outside of
	// your code base. For this to work, you need to set the
	// WEB3STORAGE_TOKEN environment variable before you run your code.
	// Get the web3.storage access token from the API token section

	return PUBLIC_WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
	return new Web3Storage({ token: getAccessToken() });
}

function makeFileObjects(urlObj) {
	// You can create File objects from a Blob of binary data
	// see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
	// Here we're just storing a JSON object, but you can store images,
	// audio, or whatever you want!

	// //Getting profile of the connected user and saving it to "profile" variable
	// getUserProfile(address);
	logger.info(
		'utils/backend: ipfs-image-upload.server.ts :: ' + 'EXECUTION START: makeFileObjects'
	);
	const lensHandle = urlObj['lensHandle'] ? `${urlObj['lensHandle']}` : PUBLIC_APP_LENS_HANDLE;

	const metaData = {
		version: '2.0.0',
		content: `The image link for the url is ${urlObj['image']}`,
		description: `The image link for the url is ${urlObj['image']}`,
		name: `Post by ${lensHandle}`,
		attributes: [
			{
				traitType: 'creator',
				displayType: 'string',
				value: lensHandle
			},
			{
				traitType: 'app',
				displayType: 'string',
				value: PUBLIC_SOURCE_APP_ID
			},
			{
				traitType: 'addedOn',
				displayType: 'string',
				value: `${new Date().toJSON().slice(0, 10)}`
			}
		],
		external_url: `https://${PUBLIC_DOMAIN_NAME}/profile/${lensHandle}`,
		image: urlObj['image'],
		media: [
			{
				item: urlObj['image'],
				type: 'image/jpeg',
				cover: null
			}
		],
		metadata_id: uuidv4(),
		mainContentFocus: 'IMAGE',
		locale: 'en-US',
		appId: PUBLIC_SOURCE_APP_ID,
		tags: ['dd472d3370b389eb8399ea7c795ca9e76ff0d4d7']
	};

	try {
		return [
			new File(['contents-of-file-1'], 'plain-utf8.txt'),
			new File([JSON.stringify(metaData)], 'metaData.json')
		];
	} catch {
		logger.error(
			'utils/backend: ipfs-image-upload.server.ts :: ' +
				'EXECUTION END: makeFileObjects: Failed to create files'
		);
		return null;
	}
}

/*********************************/

/**
 * 4. Upload to IPFS
 */
const uploadImageCommentToIPFS = async (urlObj) => {
	logger.info(
		'utils/backend: ipfs-image-upload.server.ts :: ' + 'EXECUTION START: uploadImageCommentToIPFS'
	);
	try {
		/*** Web3.storage ***/
		const client = makeStorageClient();
		const files = makeFileObjects(urlObj);
		if (files === null) {
			logger.error(
				'utils/backend: ipfs-image-upload.server.ts :: ' +
					'EXECUTION END: uploadImageCommentToIPFS: Failed To Make File Object'
			);
			return null;
		}
		logger.info(
			'utils/backend: ipfs-image-upload.server.ts :: ' +
				'EXECUTION END: makeFileObjects: Successful'
		);
		const cid = await client.put(files);
		const uri = `https://${cid}.ipfs.w3s.link/metaData.json`;
		logger.info(
			'utils/backend: ipfs-image-upload.server.ts :: ' +
				'EXECUTION END: uploadImageCommentToIPFS: Successfully Uploaded. URI: ' +
				uri
		);
		return uri;
	} catch (error) {
		logger.error(
			'utils/backend: ipfs-image-upload.server.ts :: ' +
				'EXECUTION END: uploadImageCommentToIPFS : Failed to upload metadata to IPFS: ' +
				error
		);
		return null;
	}
};

export default uploadImageCommentToIPFS;
