import crypto from 'crypto';

export const createHash = (url: string) => {
	return crypto.createHash('sha1').update(url).digest('hex');
};
