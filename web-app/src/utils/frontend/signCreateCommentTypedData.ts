import { createUserClient } from "./createClient";
import createCommentTypedData from "../../graphql/createCommentTypedData";
import { getSigner } from "../web3";
import omitDeep from "omit-deep";

function signedTypeData(domain, types, value) {
  const signer = getSigner();
  return signer._signTypedData(
    omitDeep(domain, "__typename"),
    omitDeep(types, "__typename"),
    omitDeep(value, "__typename")
  );
}

const signCreateCommentTypedData = async (request) => {
  const client = await createUserClient();

  let result = await client.mutation(createCommentTypedData, {
    request
  }).toPromise();
  result = result.data.createCommentTypedData;
  const typedData = result.typedData;

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);

  return { result, signature };
};

export default signCreateCommentTypedData;
