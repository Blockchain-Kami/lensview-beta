import { refreshAuthToken } from './accessTokenHelper';
import baseClient from './baseClient';
import { createClient, Client } from '@urql/core';
import { PUBLIC_LENS_API_URL } from '$env/static/public';

const STORAGE_KEY = 'LH_STORAGE_KEY';

/**
 * Below client is used user address and will be used
 * for anything done specific to the user
 */
export async function createUserClient() {
	const ls = localStorage || window.localStorage;

	if (!ls) {
		throw new Error('LocalStorage is not available');
	}

	const storageData = ls.getItem(STORAGE_KEY);

	if (storageData) {
		try {
			const accessToken = await refreshAuthToken();
			const userClient: Client = createClient({
				url: PUBLIC_LENS_API_URL,
				fetchOptions: {
					headers: {
						'x-access-token': `Bearer ${accessToken}`
					}
				}
			});
			return userClient;
		} catch (err) {
			return baseClient;
		}
	} else {
		return baseClient;
	}
}
