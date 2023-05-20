import {URL} from 'url';

export const preprocessURL = (url) => {
    url = new URL(url);
    const parsedURL = new URL(url);
    const origin = parsedURL.origin;
    const path = origin + parsedURL.pathname;
    return [origin.trim(), path.trim()];
}