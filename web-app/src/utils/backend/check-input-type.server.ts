import { URL } from 'url';
import { cleanURL }  from './strip-prefix-from-url.server'

export const isInputTypeUrl = (url: string) => {
    let urlRequest = url;
    //remove www. from the string if it exists
    urlRequest = cleanURL(urlRequest);
    // remove whitespaces from the start and end of the string
    urlRequest = urlRequest.trim();
    // check if there is at least one dot in the string, string does not start with a dot and there are no spaces in between
    // new URL(string) returns a valid url even if there are spaces between the letters after hostname.
    if (urlRequest.indexOf('.') <= 0 || urlRequest.indexOf(' ') > 0) {
        return null
    }

    try {
        // append https:// to the string if the string does not contain protocol
        if (urlRequest.substring(0,8) != 'https://' && urlRequest.substring(0,7) != 'http://'){
            urlRequest = 'https://' + urlRequest
        }
        // make the string a URL object if possible, otherwise throw an error
        new URL(urlRequest);

    } catch (_) {
        // return null if error was thrown
        return null;
    }
    return urlRequest;
};