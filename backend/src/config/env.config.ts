import dotenv from "dotenv";
dotenv.config();

export const PORT = Number(process.env.PORT);
export const IS_PROD = process.env.IS_PROD === "true";
export const USE_GASLESS = process.env.USE_GASLESS === "true";
export const LENS_API_URL = process.env.LENS_API_URL as string;
export const APP_LENS_ID = process.env.APP_LENS_ID as string;
export const APP_ADDRESS = process.env.APP_ADDRESS as string;
export const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
export const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY as string;
export const NETWORK = process.env.NETWORK as string;
export const SOURCE_APP_ID = process.env.SOURCE_APP_ID as string;
export const WEB3STORAGE_TOKEN = process.env.WEB3STORAGE_TOKEN as string;
export const APP_LENS_HANDLE = process.env.APP_LENS_HANDLE as string;
export const PUBLIC_LENS_HUB_CONTRACT_ADDRESS = process.env
  .PUBLIC_LENS_HUB_CONTRACT_ADDRESS as string;

export const GASSTATION_URL = process.env.GASSTATION_URL as string;
export const TAG_IMAGE_PUB = process.env.TAG_IMAGE_PUB as string;
export const TAG_USER_PUB = process.env.TAG_USER_PUB as string;
export const TAG_ANONYMOUS_PUB = process.env.TAG_ANONYMOUS_PUB as string;
export const TAG_USER_POST = process.env.TAG_USER_POST as string;
export const TAG_USER_COMMENT = process.env.TAG_USER_COMMENT as string;
