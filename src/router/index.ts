import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  const { name } = useStore('user')
  if (name.value) {
    if (to.name !== 'Index') return next('/')
  } else if (to.name !== 'Login') return next('/login')
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
