import request from '@/utils/request'
const baseUrl = process.env.VUE_APP_KLKT_APP_BASE_API
export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: baseUrl + '/auth/login',
    method: 'post',
    data
  })
}

export function getFinancialYears(mst) {
  return request({
    url: baseUrl + '/auth/years',
    method: 'post',
    data: {
      tax_code: mst,
      table_code: 'tbldmnamtaichinh'
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(data) {
  return request({
    // url: '/vue-element-admin/user/logout',
    url: baseUrl + '/auth/logout',
    method: 'post',
    data
  })
}
