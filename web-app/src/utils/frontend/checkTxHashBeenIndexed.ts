import baseClient from "./baseClient";
import hasTxHashBeenIndexed from "../../graphql/hasTxHashBeenIndexed";

const checkTxHashBeenIndexed = async (txHash: string) => {
  try {
    const client = baseClient;
    return await client.query(hasTxHashBeenIndexed, {
      "request": {
        "txHash": txHash
      }
    }).toPromise();
  } catch (err) {
    console.log("error fetching tx status...: ", err);
  }
};

export default checkTxHashBeenIndexed;
