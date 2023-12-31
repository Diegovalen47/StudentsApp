import axios from 'axios'
import { useStudentsStore } from '@/store/student'

export default defineNuxtPlugin(() => {
  const defaultUrl = process.env.BASE_URL
  const studentsStore = useStudentsStore()

  const axiosInstance = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {},
    },
  })

  axiosInstance.interceptors.request.use(
    async (config) => {
      const endPoint = config.url
      if (
        endPoint !== '/api/auth/login' &&
        endPoint !== '/api/auth/refresh' &&
        endPoint !== '/api/auth/logout' &&
        endPoint !== '/api/auth/access' &&
        studentsStore.isLoggedIn === true
      ) {
        await axiosInstance.get('/api/auth/access')
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (config) => {
      const endPoint = config.config.url
      if (endPoint === '/api/auth/login') {
        studentsStore.student = config.data.student
        studentsStore.isLoggedIn = true
        return config
      }
      if (endPoint === '/api/auth/logout') {
        studentsStore.student = null
        studentsStore.isLoggedIn = false
        return config
      }
      return config
    },
    (error) => {
      if (error.response.data.statusCode === 403) {
        const errorCode = error.response.data.message.split(':')[0]
        if (errorCode === '4031') {
          return axiosInstance.get('/api/auth/refresh')
        }
        if (errorCode === '4033') {
          studentsStore.student = null
          studentsStore.isLoggedIn = false
          return axiosInstance.post('/api/auth/logout')
        }
      }
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      axios: axiosInstance,
    },
  }
})
