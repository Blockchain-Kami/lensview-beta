import getPublication from "../../graphql/getPublication";
import baseClient from "./baseClient";

export const fetchPublication = async (publicationId: string) => {
  try {
    console.log("publicationId" + publicationId);
    const client = baseClient;
    const request = {
      "publicationIds": [publicationId]
    };
    return await client.query(getPublication, {
      request
    }).toPromise();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
