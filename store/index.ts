export const useGlobalStore = defineStore('global', {
  state: () => ({
    count: 0,
    prisma: null,
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
