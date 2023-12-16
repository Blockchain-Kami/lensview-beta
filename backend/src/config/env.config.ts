import dotenv from "dotenv";
dotenv.config();

export const PORT = 3000 as number;
export const PUBLIC_LENS_API_URL = process.env.PUBLIC_LENS_API_URL as string;
export const PUBLIC_APP_LENS_ID = process.env.PUBLIC_APP_LENS_ID as string;
export const APP_ADDRESS = process.env.APP_ADDRESS as string;
export const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
export const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY as string;
export const PUBLIC_SOURCE_APP_ID = process.env.PUBLIC_SOURCE_APP_ID as string;
export const WEB3STORAGE_TOKEN = process.env.WEB3STORAGE_TOKEN as string;
export const PUBLIC_APP_LENS_HANDLE = process.env
  .PUBLIC_APP_LENS_HANDLE as string;
export const PUBLIC_USE_GASLESS: boolean = false;
export const PUBLIC_LENS_HUB_CONTRACT_ADDRESS = process.env
  .PUBLIC_LENS_HUB_CONTRACT_ADDRESS as string;
