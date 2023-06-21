import baseClient from "./baseClient";
import getPublication from "../../graphql/getPublication";
import createURLHash from "./createURLHash";

const getImageFromURL = async (url: string) => {

  const urlHash = await createURLHash(url);
  try {
    const client = baseClient;
    const request = {
      "profileId": "0x7e11",
      "publicationTypes": ["COMMENT"],
      "metadata": {
        "locale": "en-us",
        "tags": {
          "all": [urlHash]
        }
      }
    };
    const response = await client.query(getPublication, {
      request
    }).toPromise();

    return response?.data?.publications?.items[0]?.metadata?.image;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getImageFromURL;
