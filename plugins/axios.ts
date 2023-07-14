import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = process.env.BASE_URL

  let axiosInstance = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {},
    },
  });

  axiosInstance.interceptors.response.use((config) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('peticion 200', config)
    return config;
  }, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('peticion 400', error)
    if (error.response.data.message === '1001') {
      console.log('Access Token Vencido')
      await axiosInstance.get('/api/auth/refresh')
    }
    return Promise.reject(error);
  })


  return {
    provide: {
      axios: axiosInstance,
    },
  };
});