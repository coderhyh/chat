import { request } from '~/axios/index'

export const reqGraph: () => any = () => {
  return request({
    url: '/api/data/asset/data/les-miserables.json',
  })
}
