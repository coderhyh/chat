import { io } from 'socket.io-client'
import { App } from 'vue'

import { $alert, $message } from './utils'
const globalProperties: GlobalProperties = {
  $message,
  $alert,
}
export default {
  install(Vue: App) {
    for (const key in globalProperties) {
      Vue.config.globalProperties[key] = globalProperties[key]
    }
  },
}

export const socket = io(import.meta.env.VITE_SOCKET_BASE_URL)
