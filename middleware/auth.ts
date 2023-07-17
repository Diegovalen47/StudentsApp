import { useStudentsStore } from '@/store/student'

export default defineNuxtRouteMiddleware(() => {
  const studentsStore = useStudentsStore()

  if (studentsStore.isLoggedIn === false) {
    return navigateTo('/login')
  }
})
