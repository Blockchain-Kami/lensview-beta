import { URL } from "url";
import { logger } from "../../log/logManager";

export const isInputTypeUrl = (url: string) => {
  logger.info(
    "utils/backend: check-input-type :: " +
      "EXECUTION START: isInputTypeUrl: " +
      url
  );
  let urlRequest = url;
  try {
    // remove whitespaces and the fragment(#) part of the URL
    url = url.trim().split("#")[0];
    // remove www from the url
    urlRequest = stripWww(url);
    // remove whitespaces from the start and end of the string
    urlRequest = urlRequest.trim();
    // check if there is at least one dot in the string, string does not start with a dot and there are no spaces in between
    // new URL(string) returns a valid url even if there are spaces between the letters after hostname.
    if (urlRequest.indexOf(".") <= 0 || urlRequest.indexOf(" ") > 0) {
      logger.info(
        "utils/backend: check-input-type :: " +
          "EXECUTION END: isInputTypeUrl: " +
          "Input type is a tag: " +
          urlRequest
      );
      return null;
    }
    // append https:// to the string if the string does not contain protocol
    if (
      urlRequest.substring(0, 8) != "https://" &&
      urlRequest.substring(0, 7) != "http://"
    ) {
      urlRequest = "https://" + urlRequest;
    }
    // make the string a URL object if possible, otherwise throw an error
    new URL(urlRequest);
  } catch (error) {
    // return null if error was thrown
    logger.error(
      "utils/backend: check-input-type :: " +
        "EXECUTION END: isInputTypeUrl: " +
        "Error processing the input: " +
        error
    );
    return null;
  }
  logger.info(
    "utils/backend: check-input-type :: " +
      "EXECUTION END: isInputTypeUrl: URL: " +
      urlRequest
  );
  return urlRequest;
};

const stripWww = (s) => {
  const regExp = /^(https?:\/\/)?(www\.)?(.*)/;
  const regExpArr = regExp.exec(s);
  if (!regExpArr) return s;
  return `${regExpArr[1] ?? ""}${regExpArr[3]}`;
};
