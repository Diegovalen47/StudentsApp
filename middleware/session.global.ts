export default defineNuxtRouteMiddleware(async () => {
  const axios = useNuxtApp().$axios

  try {
    await axios.get('/api/auth/access')
  } catch (error) {
    console.log(error)
  }
})
