import { defineStore } from 'pinia'

export const useStudentsStore = defineStore('student', {
  state: () => {
    return {
      isLoggedIn: false,
      student: null,
    }
  },
  persist: true,
})
