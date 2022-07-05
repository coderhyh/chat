import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routes'
const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  const { token } = useStore('user')
  if (token.value) {
    if (to.name !== 'FriendList') return next('/')
  } else if (to.name !== 'Login&Register') return next('/login&register')
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
