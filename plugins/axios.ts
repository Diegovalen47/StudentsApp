import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = process.env.BASE_URL

  let axiosInstance = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {},
    },
  });
  return {
    provide: {
      axios: axiosInstance,
    },
  };
});