export const useGlobalStore = defineStore('global', {
  state: () => ({ 
    count: 0, 
  }),
  getters: {
    doubleCount: (state): string => {
      return `${state.count} Km`
    },
  },
  actions: {
    increment() {
      this.count++
    },
  },
})