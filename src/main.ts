// eslint-disable-next-line import/no-unresolved
import 'uno.css'
import '~/assets/css/base.css'
import 'animate.css'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import pinia from './store'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
