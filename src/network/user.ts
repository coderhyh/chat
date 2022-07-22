import { AxiosResponse } from 'axios'

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
// type res<T> = Promise<AxiosResponse<T>['data']>

// type Login = (data: { userName: string; passWord: string }) => res<{ name: '11' }>
// export const reqLogin: Login = (data) => {
//   return request({
//     url: '/api/login',
//     method: 'post',
//     data,
//   }) as unknown as res<{ name: '11' }>
// }
// reqLogin({ userName: '1', passWord: '2' }).then((res) => res.name)

export const userInfo = (token: string): Promise<any> => {
  return request({
    url: '/api/userInfo',
    method: 'post',
    data: { token },
  })
}
