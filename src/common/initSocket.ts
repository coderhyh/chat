import { io, Socket } from 'socket.io-client'

const socket: Socket = io(import.meta.env.VITE_SOCKET_BASE_URL)
socket?.on('connect', () => {
  socket?.on('connectSuccess', (e: string) => {
    console.log(e)
  })
})
export const useSocket = () => socket
