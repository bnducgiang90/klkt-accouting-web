import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// Request interceptor (giữ nguyên)
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}` // Thường dùng Bearer token
      // config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor (chỉnh sửa để xử lý HTTP status)
service.interceptors.response.use(
  response => {
    // Mọi response có status 2xx đều đi qua đây
    return response.data
  },
  error => {
    // Xử lý lỗi HTTP status hoặc lỗi mạng
    const { response } = error

    // Thông báo lỗi mặc định
    let errorMessage = 'Lỗi không xác định'

    // Lỗi từ phản hồi server (có status code)
    if (response) {
      const status = response.status
      const data = response.data

      // Tùy chỉnh thông báo theo status code
      switch (status) {
        case 400:
          errorMessage = data.message || 'Yêu cầu không hợp lệ'
          break
        case 401:
          errorMessage = 'Phiên đăng nhập hết hạn'
          // Hiển thị dialog yêu cầu đăng nhập lại
          MessageBox.confirm(
            'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại',
            'Xác nhận đăng xuất',
            {
              confirmButtonText: 'Đăng nhập lại',
              cancelButtonText: 'Hủy',
              type: 'warning'
            }
          ).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
          break
        case 403:
          errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.'
          break
        case 404:
          errorMessage = 'Tài nguyên không tồn tại'
          break
        case 500:
          errorMessage = 'Lỗi máy chủ nội bộ'
          break
        default:
          errorMessage = `Lỗi không xác định (${status})`
      }
    }
    // Lỗi không có phản hồi (mất mạng, timeout...)
    else if (error.request) {
      errorMessage = 'Không kết nối được với máy chủ'
    }
    // Lỗi khi thiết lập request
    else {
      errorMessage = error.message
    }

    // Hiển thị thông báo lỗi
    Message({
      message: errorMessage,
      type: 'error',
      duration: 5 * 1000
    })

    return Promise.reject(error)
  }
)

export default service
