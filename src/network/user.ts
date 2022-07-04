import { request } from '~/axios/index'
// { userName: string; passWord: string; avatar: File }
type Signup = (data: FormData) => Promise<any>
export const reqSignup: Signup = (data) => {
  return request({
    url: '/api/signup',
    method: 'post',
    data,
  })
}
