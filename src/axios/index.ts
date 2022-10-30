import 'nprogress/nprogress.css'

import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import NProgress from 'nprogress'

export function request(config: AxiosRequestConfig) {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_WX_BASE_URL,
    timeout: 60000,
  })

  interface reqConfig extends AxiosRequestConfig {
    headers?: any
  }
  instance.interceptors.request.use(
    (config: reqConfig) => {
      NProgress.start()
      config.headers.token = '123'
      return config
    },
    (err) => {
      throw new Error(err)
    }
  )

  instance.interceptors.response.use(
    (res: AxiosResponse): AxiosResponse => {
      NProgress.done()
      return res.data
    },
    async (err) => {
      throw new Error(err)
    }
  )

  return instance(config)
}
