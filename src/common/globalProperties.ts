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
