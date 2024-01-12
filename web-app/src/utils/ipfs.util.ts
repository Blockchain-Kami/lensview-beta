import { NFTStorage } from "nft.storage";
const { VITE_NFT_STORAGE_TOKEN } = import.meta.env;

if (!VITE_NFT_STORAGE_TOKEN) {
  throw new Error("Must define VITE_WEB3STORAGE_TOKEN in the .env to run this");
}

function makeFileObjects(data: string) {
  // You can create File objects from a Blob of binary data
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const blob = new Blob([data], {
    type: "application/json"
  });

  return [
    new File(["contents-of-file-1"], "plain-utf8.txt"),
    new File([blob], "metaData.json")
  ];
}

function makeStorageClient() {
  return new NFTStorage({ token: VITE_NFT_STORAGE_TOKEN });
}

export const uploadIpfs = async (data: string) => {
  const client = makeStorageClient();
  const cid = await client.storeDirectory(makeFileObjects(data));
  console.log("stored files with cid:", cid);
  const uri = `https://${cid}.ipfs.w3s.link/metaData.json`;

  console.log("URI : " + uri);
  return uri;
};
