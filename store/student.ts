import { Student } from 'models/Student'

export const useStudentsStore = defineStore('student', {
  state: () => {
    return {
      isLoggedIn: false as boolean,
      student: null as Student | null,
    }
  },
  persist: true,
})
