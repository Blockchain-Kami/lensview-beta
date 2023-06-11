import {URL} from 'url';

/**
 * Preprocess the URL before storing.
 * The URL will be stored according to the follwoing rules:
 *  1. fragments (#) from the URL will be removed.
 *  3. www from the url will be removed.
 *  2. if the URL follows https or http protocol, the URL are stored in the following format
 *
 *      a. if URL contains query parameters
 *      and ends with '/' (https://github.com/marketplace/?category=chat&type=apps&query=new+/), the trailing '/'
 *      will not be removed as it is important part of a query parameter.
 *      Hence, stored URL: https://github.com/marketplace/?category=chat&type=apps&query=new+/
 *
 *      b. if URL does not contain query parameters and ends with '/' (https://www.lens.xyz/garden/),
 *      in this case the trailing / will be removed as it is redundant.
 *      Hence, stored URL: https://www.lens.xyz/garden
 *      'https://lens.xyz/dev/?q=true' -> https://lens.xyz/dev?q=true
 *
 *      c. if URL does not contain any path or query parameters (https://www.lens.xyz/)
 *      in this case the trailing / will not be removed as this is the standard way of writing the url
 *
 **/
export const preprocessURL = (url) => {
    try {
        url = url.trim().split('#')[0];

        url = stripWww(url);

        const parsedURL = new URL(url);

        if (parsedURL['protocol'] === 'https:' || parsedURL['protocol'] === 'http:') {

            if (parsedURL['pathname'].toString()[parsedURL['pathname'].length - 1] === '/' && parsedURL['pathname'].toString().length > 1) {
                parsedURL['pathname'] = parsedURL['pathname'].toString().substring(0, parsedURL['pathname'].length - 1);
            }

            if (parsedURL['protocol'] === 'https:') {
                url = parsedURL['protocol'].toString() + '//' + parsedURL['href'].toString().substring(8,).replaceAll(/[/]+/g, '/');

            } else if (parsedURL['protocol'] === 'http:') {

                url = parsedURL['protocol'].toString() + '//' + parsedURL['href'].toString().substring(7,).replaceAll(/[/]+/g, '/');
            }

        } else if (parsedURL['protocol'] === 'data:') {
            url = parsedURL['href'];
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
};

function stripWww(s) {
    const regExp = /^(https?:\/\/)?(www\.)?(.*)/;
    const regExpArr = regExp.exec(s);
    if (!regExpArr) return s;
    return `${regExpArr[1] ?? ""}${regExpArr[3]}`
}