import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const apikey = process.env.NEXT_PUBLIC_API_KEY;
export const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    apikey,
    Authorization: `Bearer ${apikey}`,
  },
});

export default axiosInstance;
