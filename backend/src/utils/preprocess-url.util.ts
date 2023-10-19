import { URL } from "url";
import { websiteSpecificCleaningUtil } from "./website-specific-cleaning.util";

/**
 * Preprocess and clean the URL before storing.
 * The URL will be stored according to the following rules:
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
export const preprocessURLUtil = (url: string) => {
  try {
    // convert the url to a URL object
    const parsedURL = new URL(url);
    // logic to handle https and http urls
    if (
      parsedURL["protocol"] === "https:" ||
      parsedURL["protocol"] === "http:"
    ) {
      // remove extra hash at the end of the pathname, if it exists in the url
      if (
        parsedURL["pathname"].toString()[parsedURL["pathname"].length - 1] ===
          "/" &&
        parsedURL["pathname"].toString().length > 1
      ) {
        parsedURL["pathname"] = parsedURL["pathname"]
          .toString()
          .substring(0, parsedURL["pathname"].length - 1);
      }
      // remove extra / from the url
      if (parsedURL["protocol"] === "https:") {
        url =
          parsedURL["protocol"].toString() +
          "//" +
          parsedURL["href"].toString().substring(8).replaceAll(/[/]+/g, "/");
      } else if (parsedURL["protocol"] === "http:") {
        url =
          parsedURL["protocol"].toString() +
          "//" +
          parsedURL["href"].toString().substring(7).replaceAll(/[/]+/g, "/");
      }
    }
    // logic to handle data URIs
    else if (parsedURL["protocol"] === "data:") {
      url = parsedURL["href"];
    }

    url = websiteSpecificCleaningUtil(url);

    const processedURL = new URL(url);
    // extract the relevant pieces of the url
    const cleanURL = processedURL["href"];
    const origin = processedURL["origin"];
    const hostname = processedURL["hostname"];
    // path is without query parameter
    const path = origin + processedURL["pathname"];
    const query = processedURL["searchParams"];
    const domain = hostname.substring(0, hostname.indexOf("."));
    // return hostname;
    return [
      cleanURL.toString().trim(),
      hostname.trim(),
      domain.trim(),
      path.trim(),
      query
    ];
  } catch (error) {
    return null;
  }
};
