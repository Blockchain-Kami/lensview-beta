import {URL} from 'url';

function stripWww(s) {
    const regExp = /^(https?:\/\/)?(www\.)?(.*)/;
    const regExpArr = regExp.exec(s);
    if (!regExpArr) return s;
    return `${regExpArr[1] ?? ""}${regExpArr[3]}`
}

export const preprocessURL = (url) => {
    try {

        url = url.trim().split('#')[0];

        url = stripWww(url);

        const parsedURL = new URL(url);

        if (parsedURL['protocol'] === 'https:'){
            url = 'https://' + parsedURL.toString().substring(8,).replaceAll(/[/]+/g, '/');

        } else if (parsedURL['protocol'] === 'http:'){
            url = 'http://' + parsedURL.toString().substring(7,).replaceAll(/[/]+/g, '/');
        }

        const processedURL = new URL(url);

        const cleanURL = processedURL['href'];
        const origin = processedURL['origin'];
        const path = origin + processedURL['pathname'];
        const query = processedURL['searchParams'];

        return [
            cleanURL.toString().trim(),
            origin.trim(),
            path.trim(),
            query
        ];


    } catch {
        console.log('Failed to process URL');
        throw new Error();
    }
}