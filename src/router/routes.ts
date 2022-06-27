import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/',
    name: 'Layout',
    component: () => import('~/layout/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'FriendList',
        component: () => import('~/views/FriendList/FriendList.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('~/views/Login/Login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('~/views/NotFound/NotFound.vue'),
  },
]
