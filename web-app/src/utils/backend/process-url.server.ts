import {URL} from 'url';

export const preprocessURL = (url) => {
    try {
        url = url.trim().split('#')[0];

        const parsedURL  = new URL(url);

        url = 'https://' + parsedURL.toString().substring(8,).replaceAll(/[/]+/g,'/');
        const processedURL = new URL(url);
        const origin = processedURL.origin;
        const path = origin + processedURL.pathname;
        const query = processedURL.searchParams;

        return [
            processedURL.toString().trim(),
            origin.trim(),
            path.trim(),
            query.toString().trim(),
        ];


    } catch {
        console.log('Failed to process URL');
        throw new Error();
    }
}