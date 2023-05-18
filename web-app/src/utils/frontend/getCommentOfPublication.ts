import getComments from "../../graphql/getComments";
import baseClient from "./baseClient";

export const getCommentOfPublication = async (publicationId: string) => {
  try {
    console.log("publicationId" + publicationId);
    const client = baseClient;
    return await client.query(getComments, {
      "publicationId": publicationId
    }).toPromise();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
