const userList = [{ name: '群聊', avatar: '', userId: 'all', list: [] }]

export default defineStore({
  id: 'user',
  persist: {
    // 开启持久化
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['userName', 'userList', 'token'] }],
  },
  state: () => ({
    userInfo: { name: '', userId: '', avatar: '' },
    token: '',
    userList: <FriendList[]>userList,
    friendTargets: <User.FriendTargets[]>[], // @ 功能
    userCount: 0,
  }),
  getters: {},
  actions: {},
})
