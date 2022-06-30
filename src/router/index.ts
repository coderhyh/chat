import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routes'
const socket = useSocket()
const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  const { userName } = useStore('user')
  if (userName.value) {
    socket.connect()
    if (to.name !== 'FriendList') return next('/')
  } else if (to.name !== 'Login') return next('/login')
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
