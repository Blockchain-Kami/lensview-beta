import {
  PUBLIC_DOMAIN_NAME,
  PUBLIC_SOURCE_APP_ID,
  PUBLIC_WEB3STORAGE_TOKEN
} from "$env/static/public";
import { Web3Storage } from "web3.storage";
import { v4 as uuid } from "uuid";

function makeStorageClient() {
  return new Web3Storage({ token: PUBLIC_WEB3STORAGE_TOKEN });
}

function makeFileObjects(profileHandle: string, userEnteredContent: string) {
  // You can create File objects from a Blob of binary data
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!

  const metaData = {
    version: "2.0.0",
    name: `Post by ${profileHandle}`,
    content: userEnteredContent,
    description: userEnteredContent,
    attributes: [
      {
        display_type: "string",
        trait_type: "creator",
        value: profileHandle
      },
      {
        display_type: "string",
        trait_type: "app",
        value: PUBLIC_SOURCE_APP_ID
      },
      {
        display_type: "string",
        trait_type: "created on",
        value: `${new Date().toJSON().slice(0, 10)}`
      }
    ],
    mainContentFocus: "TEXT_ONLY",
    locale: "en-US",
    tags: ["0f89daeb0a63c7b73224315c5514c21ba0453985"],
    metadata_id: uuid(),
    appId: PUBLIC_SOURCE_APP_ID,
    external_url: `https://${PUBLIC_DOMAIN_NAME}/profile/${profileHandle}`
  };
  const blob = new Blob([JSON.stringify(metaData)], {
    type: "application/json"
  });

  return [
    new File(["contents-of-file-1"], "plain-utf8.txt"),
    new File([blob], "metaData.json")
  ];
}

const uploadToIPFS = async (
  profileHandle: string,
  userEnteredContent: string
) => {
  /*** Web3.storage ***/
  const client = makeStorageClient();
  const cid = await client.put(
    makeFileObjects(profileHandle, userEnteredContent)
  );
  console.log("stored files with cid:", cid);
  const uri = `https://${cid}.ipfs.w3s.link/metaData.json`;

  console.log("URI : " + uri);
  return uri;
};

export default uploadToIPFS;
