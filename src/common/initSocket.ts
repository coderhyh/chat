import { io, Socket } from 'socket.io-client'
const url = import.meta.env.VITE_SOCKET_BASE_URL
const socket: Socket = io(url, { autoConnect: false })
socket?.on('connect', () => {
  socket?.on('connectSuccess', (e: string) => {
    console.log(e)
  })
  socket.on('userCount', async (count: number) => {
    useStore('user').userCount.value = count
  })
})
export const useSocket = () => socket
