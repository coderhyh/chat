export default defineStore({
  id: 'user',
  persist: {
    // 开启持久化
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['userName'] }],
  },
  state: () => ({ userName: '' }),
  getters: {},
  actions: {
    setUserName(data: string) {
      this.userName = data
    },
  },
})
