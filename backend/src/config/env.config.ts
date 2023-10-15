import dotenv from "dotenv";
dotenv.config();

export const PUBLIC_LENS_API_URL = process.env.PUBLIC_LENS_API_URL as string;
export const PUBLIC_APP_LENS_ID = process.env.PUBLIC_APP_LENS_ID as string;
export const APP_ADDRESS = process.env.APP_ADDRESS as string;
export const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
export const API_KEY = process.env.API_KEY as string;
