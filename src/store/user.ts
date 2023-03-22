import { $message } from '~/common/utils'
import { userInfo } from '~/network/user'
import router from '~/router/index'

const userList = [{ name: '群聊', avatar: '', userId: 'groupChat', list: [] }]
export default defineStore({
  id: 'user',
  persist: {
    // 开启持久化
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['userList', 'token'] }],
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
      type T = { code: number; msg: string }
      const info: T & Info = await userInfo(this.token)
      if (info.code === 200) this.userInfo = info
      else {
        this.token = ''
        $message('登录失效', 'info')
        router.push('/login&register')
      }
    },
  },
})
