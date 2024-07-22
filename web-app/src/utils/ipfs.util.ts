import { ThirdwebStorage } from "@thirdweb-dev/storage";
const { VITE_THIRD_WEB_CLIENT_ID } = import.meta.env;

export const uploadIpfs = async (data: string) => {
  // First, instantiate the thirdweb IPFS storage
  const storage = new ThirdwebStorage({
    clientId: VITE_THIRD_WEB_CLIENT_ID
  });

  // Here we get the IPFS URI of where our metadata has been uploaded
  const uri = await storage.upload(data);
  // This will log a URL like ipfs://QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
  console.info(uri);

  // Here we a URL with a gateway that we can look at in the browser
  const url = await storage.resolveScheme(uri);
  // This will log a URL like https://ipfs.thirdwebstorage.com/ipfs/QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
  console.info(url);

  return url;
};
