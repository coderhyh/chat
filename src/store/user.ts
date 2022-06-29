const friendList = [
  { name: '群聊', avatar: '', userId: 'all', list: [] },
  { name: '黄玉豪', avatar: '', userId: '1', list: [] },
  { name: '黄玉豪', avatar: '', userId: '2', list: [] },
  { name: '黄玉豪', avatar: '', userId: '3', list: [] },
  { name: '黄玉豪', avatar: '', userId: '4', list: [] },
]

export default defineStore({
  id: 'user',
  persist: {
    // 开启持久化
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['userName', 'friendList'] }],
  },
  state: () => ({ userName: '', friendList: <FriendList[]>friendList }),
  getters: {},
  actions: {
    setUserName(data: string) {
      this.userName = data
    },
  },
})
