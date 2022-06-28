import { io, Socket } from 'socket.io-client'
export default defineStore({
  id: 'socket',
  // persist: {
  //   // 开启持久化
  //   enabled: true,
  // },
  state: () => {
    return {
      socket: undefined as Socket | undefined,
    }
  },
  actions: {
    initSocket() {
      this.socket = io(import.meta.env.VITE_SOCKET_BASE_URL)
    },
  },
})
