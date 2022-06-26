export default defineStore({
  id: 'user',
  persist: {
    // 开启持久化
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['name'] }],
  },
  state: () => ({ name: '' }),
  getters: {},
  actions: {
    setName(data: string) {
      this.name = data
    },
  },
})
