import { io, Socket } from 'socket.io-client'

interface ServerToClientEvents {
  connectSuccess: (val: string) => void
  userCount: (userCount: number) => void
  sendMsg: (sendData: FriendListMsg) => void
  userList: (userList: UserList[]) => void
  contextmenu_avatar: (msg: '@AITE_NAME' | 'PAI_YI_PAI', options?: contextmenu_avatar_type) => void
}
interface ClientToServerEvents {
  disconnect: () => void
  sendMsg: (sendData: FriendListMsg, aiteTargets?: string[]) => void
  contextmenu_avatar: (options: contextmenu_avatar_type) => void
}
interface UserList {
  userId: string
  userName?: string
}
interface contextmenu_avatar_type {
  type: '@AITE_NAME' | 'PAI_YI_PAI'
  receiveId: string
  receiveName: string
  launchName: string
  launchId: string
}

const url = import.meta.env.VITE_SOCKET_BASE_URL
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(url, { autoConnect: false })
socket?.on('connect', () => {
  socket?.on('connectSuccess', (e: string) => {
    console.log(e)
  })
  socket.on('userCount', async (count: number) => {
    useStore('user').userCount.value = count
  })
  socket.onAny((event, ...args) => {
    console.log(event, args)
  })
})
socket.on('connect_error', (err) => {
  if (err.message === '无效token') {
    console.log('无效token')
  }
})
export const useSocket = () => socket
