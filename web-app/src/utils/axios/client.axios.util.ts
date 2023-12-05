import axios from "axios";
import {
  PUBLIC_APP_API_URL,
  PUBLIC_IS_PROD,
  PUBLIC_APP_DEV_API_URL
} from "$env/static/public";

const clientAxiosUtil = axios.create({
  baseURL:
    PUBLIC_IS_PROD === "true" ? PUBLIC_APP_API_URL : PUBLIC_APP_DEV_API_URL,
  timeout: 180000
});

export default clientAxiosUtil;
