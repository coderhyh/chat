import { AxiosPromise } from 'axios'

import { userInfo } from '~/network/user'

const userList = [{ name: '群聊', avatar: '', userId: 'all', list: [] }]
export default defineStore({
  id: 'user',
  persist: {
    // 开启持久化
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['userName', 'userList', 'token'] }],
  },
  state: () => ({
    userInfo: { userName: '', userId: '', avatar: '' },
    token: '',
    userList: <FriendList[]>userList,
    friendTargets: <User.FriendTargets[]>[], // @ 功能
    userCount: 0,
  }),
  getters: {},
  actions: {
    async getUserInfo() {
      type Info = typeof this.userInfo
      const info: Info = await userInfo(this.token)
      this.userInfo = info
    },
  },
})
