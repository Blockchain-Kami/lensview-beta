const cleanUrl = (url: string) => {
  // Remove content after #
  url = url.split("#")[0];

  // Remove www from url
  url = url.replace("www.", "");

  // Remove extra forward slash from the end
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }

  // Replace double slash with single, except after https or http
  url = url.replace(/([^:]\/)\/+/g, "$1");

  return url;
};

export default cleanUrl;
