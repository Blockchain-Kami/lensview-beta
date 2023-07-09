import { URL } from 'url';

export const isInputTypeUrl = (urlRequest: string) => {
    let url;
    try {
        url = new URL(urlRequest);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
};