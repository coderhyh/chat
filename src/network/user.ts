import { AxiosPromise } from 'axios'

import { request } from '~/axios/index'

type Signup = (data: FormData) => Promise<any>
export const reqSignup: Signup = (data) => {
  return request({
    url: '/api/signup',
    method: 'post',
    data,
  })
}

type Login = (data: { userName: string; passWord: string }) => Promise<any>
export const reqLogin: Login = (data) => {
  return request({
    url: '/api/login',
    method: 'post',
    data,
  })
}

export const userInfo = (token: string): Promise<any> => {
  return request({
    url: '/api/userInfo',
    method: 'post',
    data: { token },
  })
}
