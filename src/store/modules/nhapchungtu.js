// import axios from 'axios'
import request from '@/utils/request'

const state = {
  loaiChungTu: '',
  tabtype: 'TAB_NHAT_KY_CHUNG',

  lstKhachHang: [],
  lstNhaCungCap: [],

  columnTaiKhoanPopupTable: [
    { prop: 'soHieuTK', label: 'Số hiệu tài khoản' },
    { prop: 'tenTK', label: 'Tên tài khoản' }
  ],
  lstTaiKhoanNganHang: [],
  lstHinhThucTT: [],
  lstNguoiGiaoDich: [],
  lstTaiKhoan: [],
  lstTaiKhoanChiTiet: [],
  lstTaiKhoanNganHang: [],
  lstVatTu: [],
  lstCanBo141: [],
  lstKhoHang: [],

  nhatKyChung: {
    chungTu: {
      sttgs: '',
      kyHieuSoCT: '',
      ngay: '',
      hienSoChungTu: true,
      noiDung: '',
      khachHang: ''
    },
    thongTinKhachHang: {
      maSoThue: '123',
      tenDonVi: '',
      diaChi: 'd',
      dienThoai: '',
      soTaiKhoan: '',
      nganHang: '',
      hinhThucTT: '',
      maNguoiGiaoDich: '',
      tenNguoiGiaoDich: '',
      nhaCungCap: '',
      hachToanNgoaiTe: true
    }
  },
  hachToanData: [
    { dongChungTu: 1, tkNo: 112, chiTietNo: 12345, tkCo: 234, chiTietCo: 2345, soTien: 2332432432, thoiHanThanhToan: '01/02/2023', thoiHanChietKhau: '2 thang', kyHieuSoHoaDon: 1, editType: 'raw' },
    { dongChungTu: 2, tkNo: 112, chiTietNo: 12345, tkCo: 234, chiTietCo: 2345, soTien: 2332432432, thoiHanThanhToan: '15/02/2024', thoiHanChietKhau: '2 thang', kyHieuSoHoaDon: 1, editType: 'raw' },
    { dongChungTu: 3, tkNo: 112, chiTietNo: 12345, tkCo: 234, chiTietCo: 2345, soTien: 2332432432, thoiHanThanhToan: '09/10/2024', thoiHanChietKhau: '2 thang', kyHieuSoHoaDon: 1, editType: 'raw' }
  ],
  // nhapVatTuData: [
  //   { id: 1, tkNhap: 1, maKhoNhap: 112, maVatTu: 12345, tenVatTu: 234, dvt: 2345, soLuong: 2332432432, soLuongTheoChungTu: 'sàdsf', donGiaBan: '2 thang', thanhTien: 1, khuyenMai: true, chietKhau: 1, thanhToan: 1, ghiChu: 1, dongHachToan: 1, editType: 'raw' },
  //   { id: 2, tkNhap: 2, maKhoNhap: 112, maVatTu: 12345, tenVatTu: 234, dvt: 2345, soLuong: 2332432432, soLuongTheoChungTu: 'sàdsf', donGiaBan: '2 thang', thanhTien: 1, khuyenMai: false, chietKhau: 1, thanhToan: 1, ghiChu: 1, dongHachToan: 2, editType: 'raw' },
  //   { id: 3, tkNhap: 3, maKhoNhap: 112, maVatTu: 12345, tenVatTu: 234, dvt: 2345, soLuong: 2332432432, soLuongTheoChungTu: 'sàdsf', donGiaBan: '2 thang', thanhTien: 1, khuyenMai: true, chietKhau: 1, thanhToan: 1, ghiChu: 1, dongHachToan: 3, editType: 'raw' }
  // ],
  nhapVatTuData: [
    {"id":1,"tkNhap":"152","maKhoNhap":"K01","maVatTu":"VT001","tenVatTu":"Thép hộp 50x50","dvt":"Kg","soLuong":1000,"soLuongTheoChungTu":1000,"donGiaBan":25000,"thanhTien":25000000,"khuyenMai":false,"chietKhau":"0%","thanhToan":"Chuyển khoản","ghiChu":"Nhập kho chính","dongHachToan":"1"},
    {"id":2,"tkNhap":"153","maKhoNhap":"K02","maVatTu":"VT002","tenVatTu":"Xi măng Hà Tiên","dvt":"Bao","soLuong":500,"soLuongTheoChungTu":480,"donGiaBan":80000,"thanhTien":40000000,"khuyenMai":true,"chietKhau":"5%","thanhToan":"Tiền mặt","ghiChu":"","dongHachToan":"2"},
    {"id":3,"tkNhap":"156","maKhoNhap":"K03","maVatTu":"VT003","tenVatTu":"Gạch ống Đồng Tâm","dvt":"Viên","soLuong":10000,"soLuongTheoChungTu":10000,"donGiaBan":1500,"thanhTien":15000000,"khuyenMai":false,"chietKhau":"2%","thanhToan":"Công nợ","ghiChu":"Ưu đãi khách hàng thân thiết","dongHachToan":"3"}
  ],
  // xuatVatTuData: [
  //   { id: 1, tkXuat: 1, maKhoXuat: 112, maVatTu: 12345, tenVatTu: 234, dvt: 2345, soLuong: 2332432432, soLuongTheoChungTu: 'sàdsf', donGiaBan: '2 thang', thanhTien: 1, khuyenMai: true, chietKhau: 1, thanhToan: 1, ghiChu: 1, dongHachToan: 1, editType: 'raw' },
  //   { id: 2, tkXuat: 2, maKhoXuat: 112, maVatTu: 12345, tenVatTu: 234, dvt: 2345, soLuong: 2332432432, soLuongTheoChungTu: 'sàdsf', donGiaBan: '2 thang', thanhTien: 1, khuyenMai: false, chietKhau: 1, thanhToan: 1, ghiChu: 1, dongHachToan: 2, editType: 'raw' },
  //   { id: 3, tkXuat: 3, maKhoXuat: 112, maVatTu: 12345, tenVatTu: 234, dvt: 2345, soLuong: 2332432432, soLuongTheoChungTu: 'sàdsf', donGiaBan: '2 thang', thanhTien: 1, khuyenMai: true, chietKhau: 1, thanhToan: 1, ghiChu: 1, dongHachToan: 3, editType: 'raw' }
  // ],
  xuatVatTuData: [
    {"id":1,"tkXuat":"632","maKhoXuat":"K01","maVatTu":"VT1001","tenVatTu":"Ống thép mạ kẽm phi 21","dvt":"m","soLuong":500,"soLuongTheoChungTu":500,"donGiaBan":12000,"thanhTien":6000000,"khuyenMai":false,"chietKhau":"0%","thanhToan":"Công nợ","ghiChu":"Xuất cho công trình A","dongHachToan":"632", editType: 'raw'},
    {"id":2,"tkXuat":"156","maKhoXuat":"K02","maVatTu":"VT1002","tenVatTu":"Cáp điện CADIVI 2x2.5mm","dvt":"m","soLuong":300,"soLuongTheoChungTu":290,"donGiaBan":15000,"thanhTien":4500000,"khuyenMai":true,"chietKhau":"3%","thanhToan":"Tiền mặt","ghiChu":"Khuyến mãi tháng 4","dongHachToan":"156", editType: 'raw'},
    {"id":3,"tkXuat":"155","maKhoXuat":"K03","maVatTu":"VT1003","tenVatTu":"Sơn nước Jotun nội thất","dvt":"Lít","soLuong":200,"soLuongTheoChungTu":200,"donGiaBan":95000,"thanhTien":19000000,"khuyenMai":false,"chietKhau":"2%","thanhToan":"Chuyển khoản","ghiChu":"Khách hàng thân thiết","dongHachToan":"155", editType: 'raw'}
  ],
  // hoaDonBanRaData: [
  //   { id: 1, tkThueDauRa: '33311', hoaDonDt: true, soHoaDon: 'HD001', ngayHoaDon: '2024-02-29', nguoiMuaBan: 'Công ty TNHH ABC', hangHoaChiuThue: 'Laptop Dell XPS 15', maSoThue: '0101234567', tienHang: 30000000, thueSuat: '10%', tienThue: 3000000, tongTien: 33000000, ghiChu: 'Thanh toán chuyển khoản', editType: 'raw' },
  //   { id: 2, tkThueDauRa: '33312', hoaDonDt: false, soHoaDon: 'HD002', ngayHoaDon: '2024-03-01', nguoiMuaBan: 'Công ty CP XYZ', hangHoaChiuThue: 'Điện thoại iPhone 15 Pro Max', maSoThue: '0307654321', tienHang: 25000000, thueSuat: '8%', tienThue: 2000000, tongTien: 27000000, ghiChu: 'Đã xuất kho', editType: 'raw' },
  //   { id: 3, tkThueDauRa: '33313', hoaDonDt: true, soHoaDon: 'HD003', ngayHoaDon: '2024-03-02', nguoiMuaBan: 'Công ty TNHH DEF', hangHoaChiuThue: 'Máy in Canon LBP2900', maSoThue: '0409988776', tienHang: 5000000, thueSuat: '5%', tienThue: 250000, tongTien: 5250000, ghiChu: 'Khách hàng thanh toán tiền mặt', editType: 'raw' }
  // ],
  hoaDonBanRaData: [
    {"id":1,"tkThueDauRa":"1331","hoaDonDt":true,"soHoaDon":"HD00123","ngayHoaDon":"2025-04-01","nguoiMuaBan":"Công ty TNHH ABC","hangHoaChiuThue":"Máy in laser HP M404dn","maSoThue":"0101234567","tienHang":5000000,"thueSuat":"10%","tienThue":500000,"tongTien":5500000,"ghiChu":"Thanh toán bằng chuyển khoản", editType: 'raw' },
    {"id":2,"tkThueDauRa":"1332","hoaDonDt":false,"soHoaDon":"HD00124","ngayHoaDon":"2025-04-02","nguoiMuaBan":"Công ty CP XYZ","hangHoaChiuThue":"Bàn phím cơ Logitech G413","maSoThue":"0309876543","tienHang":1200000,"thueSuat":"8%","tienThue":96000,"tongTien":1296000,"ghiChu":"", editType: 'raw' },
    {"id":3,"tkThueDauRa":"1331","hoaDonDt":true,"soHoaDon":"HD00125","ngayHoaDon":"2025-04-03","nguoiMuaBan":"Công ty TNHH DEF","hangHoaChiuThue":"Máy chiếu Epson EB-X06","maSoThue":"0401122334","tienHang":8500000,"thueSuat":"10%","tienThue":850000,"tongTien":9350000,"ghiChu":"Giao hàng kèm hóa đơn", editType: 'raw' }
  ]
}

const mutations = {
  SET_STATE(state, { key, value }) {
    if (key in state) {
      state[key] = value
    } else {
      console.warn(`Key "${key}" không tồn tại trong state`)
    }
  },
  UPDATE_MULTIPLE_FIELDS_NHAT_KY_CHUNG(state, updates) {
    updates.forEach(({ path, value }) => {
      const keys = path.split('.') // Chuyển đường dẫn thành mảng
      let obj = state.nhatKyChung

      // Duyệt qua các key để truy cập đến thuộc tính cuối cùng
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) {
          console.warn(`Đường dẫn '${path}' không tồn tại`)
          return
        }
        obj = obj[keys[i]]
      }

      // Cập nhật giá trị
      obj[keys[keys.length - 1]] = value
    })
  },
  UPDATE_HACH_TOAN_CELL(state, { dongChungTu, column, value }) {
    const row = state.hachToanData.find(item => item.dongChungTu === dongChungTu)
    if (row && Object.prototype.hasOwnProperty.call(row, column)) {
      row[column] = value
    }
  },
  UPDATE_XUAT_VAT_TU_CELL(state, { dongHachToan, column, value }) {
    const row = state.xuatVatTuData.find(item => item.dongHachToan === dongHachToan)
    if (row && Object.prototype.hasOwnProperty.call(row, column)) {
      row[column] = value
    }
  },
  UPDATE_NHAP_VAT_TU_CELL(state, { dongHachToan, column, value }) {
    const row = state.nhapVatTuData.find(item => item.dongHachToan === dongHachToan)
    if (row && Object.prototype.hasOwnProperty.call(row, column)) {
      row[column] = value
    }
  },
  UPDATE_HOA_DON_BAN_RA_CELL(state, { id, column, value }) {
    const row = state.hoaDonBanRaData.find(item => item.id === id)
    if (row && Object.prototype.hasOwnProperty.call(row, column)) {
      row[column] = value
    }
  },
  UPDATE_ROW_ACTION(state, { stateName, key, value, flagName, row }) {
    console.log('UPDATE_ROW_ACTION: stateName, key, value, flagName: ', stateName, key, value, flagName, row)
    // Kiểm tra stateName có tồn tại hay không
    if (!state[stateName] || !Array.isArray(state[stateName])) {
      console.error(`State "${stateName}" không tồn tại hoặc không phải là một mảng.`)
      return
    }

    let item = null

    if (flagName === 'inserting') {
      // Kiểm tra nếu row hợp lệ thì thêm vào danh sách
      if (row && typeof row === 'object') {
        state[stateName].push(row)
      } else {
        console.error('Dữ liệu row không hợp lệ để insert.')
      }
    } else {
      // Tìm bản ghi cần cập nhật
      item = state[stateName].find(record => record[key] === value)
      if (!item) {
        console.error(`Không tìm thấy bản ghi có ${key} = ${value} trong state "${stateName}".`)
        return
      }
      // Xử lý theo flagName
      switch (flagName) {
        case 'updating':
        case 'deleting':

          if (!item.originalData) {
          // Lưu trạng thái ban đầu trước khi chỉnh sửa hoặc xóa
            item.originalData = { ...item }
          }
          item['editType'] = flagName

          break

        case 'canceling':
          if (row.editType === 'inserting') {
            // Nếu là bản ghi đang được thêm mới thì xóa khỏi state
            state[stateName] = state[stateName].filter(record => record[key] !== value)
          } else {
            if (item.originalData) {
              // Phục hồi dữ liệu cũ từ originalData
              Object.keys(item.originalData).forEach(prop => {
                item[prop] = item.originalData[prop]
              })
              // Xóa thuộc tính originalData
              delete item.originalData
            }
          }

          break

        case 'saving':
          if (item.editType === 'inserting') {
            item.editType = 'inserted'
          } else if (item.editType === 'updating') {
            item.editType = 'updated'
          } else if (item.editType === 'deleting') {
            item.editType = 'deleted'
          }
          delete item.originalData // Xóa dữ liệu gốc sau khi lưu

          break

        default:
          console.error(`flagName "${flagName}" không hợp lệ.`)
      }
    }
  }
}

const actions = {
  async updateLoaiChungTu({ commit }, loaiChungTu) {
    commit('SET_STATE', { key: 'loaiChungTu', value: loaiChungTu })
  },
  async updateTabType({ commit }, tabtype) {
    commit('SET_STATE', { key: 'tabtype', value: tabtype })
  },

  // async loadKhachHang({ commit }) {
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/khachhang')
  //     const data = response.data
  //     commit('SET_STATE', { key: 'lstKhachHang', value: data })
  //   } catch (error) {
  //     console.error('Lỗi khi tải danh sách khách hàng:', error)
  //   }
  // },
  async loadKhachHang({ commit }) {
      try {
        const response = await request.post('/core/get-list-data', {
          table_code: 'tbldmkhachhang',
          size: 200,
          page: 1
        })

        commit('SET_STATE', { key: 'lstKhachHang', value: response })
      } catch (error) {
        console.error('Lỗi khi tải danh sách khách hàng:', error)
      }
    },
  async loadNhaCungCap({ commit }) {
      try {
        const response = await request.post('/core/get-list-data', {
          table_code: 'tbldmnhacungcap',
          size: 5000,
          page: 1
        })

        commit('SET_STATE', { key: 'lstNhaCungCap', value: response })
      } catch (error) {
        console.error('Lỗi khi tải danh sách nhà cung cấp 2:', error)
      }
    },
  // async loadTaiKhoan({ commit }) {
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/taikhoan')
  //     const data = response.data
  //     commit('SET_STATE', { key: 'lstTaiKhoan', value: data })
  //   } catch (error) {
  //     console.error('Lỗi khi tải danh sách tài khoản:', error)
  //   }
  // },
  async loadTaiKhoan({ commit }) {
      try {
        const response = await request.post('/core/get-list-data', {
          table_code: 'tbldmtaikhoan',
          size: 5000,
          page: 1
        })

        commit('SET_STATE', { key: 'lstTaiKhoan', value: response })
      } catch (error) {
        console.error('Lỗi khi tải danh sách tài khoản:', error)
      }
    },
  async loadTaiKhoanChiTiet({ commit }, sohieutk) {
      try {
        console.log('loadTaiKhoanChiTiet: ' + sohieutk)
        const response = await request.post('/core/get-list-data', {
          table_code: 'tbldmtaikhoan_chitiet',
          sohieutk: sohieutk,
          size: 5000,
          page: 1
        })

        commit('SET_STATE', { key: 'lstTaiKhoanChiTiet', value: response })
      } catch (error) {
        console.error('Lỗi khi tải danh sách tài khoản chi tiết:', error)
      }
    },
  // async loadNguoiGiaoDich({ commit }) {
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/nguoi-giao-dich')
  //     const data = response.data
  //     commit('SET_STATE', { key: 'lstNguoiGiaoDich', value: data })
  //   } catch (error) {
  //     console.error('Lỗi khi tải danh sách người giao dịch:', error)
  //   }
  // },
  async loadNguoiGiaoDich({ commit }) {
      try {
        const response = await request.post('/core/get-list-data', {
          table_code: 'tbldmnguoi_giaodich',
          size: 5000,
          page: 1
        })

        commit('SET_STATE', { key: 'lstNguoiGiaoDich', value: response })
      } catch (error) {
        console.error('Lỗi khi tải danh sách người giao dịch:', error)
      }
    },
  // async loadHinhThucTT({ commit }) {
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/hinhthuctt')
  //     const data = response.data
  //     commit('SET_STATE', { key: 'lstHinhThucTT', value: data })
  //   } catch (error) {
  //     console.error('Lỗi khi tải danh sách hình thức thanh toán:', error)
  //   }
  // },
  async loadHinhThucTT({ commit }) {
      try {
        const response = await request.post('/core/get-list-data', {
          table_code: 'tbldmhinhthuctt',
          size: 5000,
          page: 1
        })

        commit('SET_STATE', { key: 'lstHinhThucTT', value: response })
      } catch (error) {
        console.error('Lỗi khi tải danh sách hình thức thanh toán:', error)
      }
    },
  // async loadVatTu({ commit }) {
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/vat-tu-hang-hoa')
  //     const data = response.data
  //     commit('SET_STATE', { key: 'lstVatTu', value: data })
  //   } catch (error) {
  //     console.error('Lỗi khi tải danh sách vật tư:', error)
  //   }
  // },
  async loadVatTu({ commit }) {
      try {
        const response = await request.post('/core/get-list-data', {
          table_code: 'tbldmvattu_hanghoa',
          size: 100,
          page: 1
        })
        console.log(response)
        commit('SET_STATE', { key: 'lstVatTu', value: response })
      } catch (error) {
        console.error('Lỗi khi tải danh sách vật tư:', error)
      }
    },
  // async loadKhoHang({ commit }) {
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/khohang')
  //     const data = response.data
  //     commit('SET_STATE', { key: 'lstKhoHang', value: data })
  //   } catch (error) {
  //     console.error('Lỗi khi tải danh sách kho hàng:', error)
  //   }
  // },
  async loadKhoHang({ commit }) {
      try {
        const response = await request.post('/core/get-list-data', {
          table_code: 'tbldmkhohang',
          size: 5000,
          page: 1
        })

        commit('SET_STATE', { key: 'lstKhoHang', value: response })
      } catch (error) {
        console.error('Lỗi khi tải danh sách kho hàng:', error)
      }
    },
  async loadTaiKhoanNganHang({ commit }) {
      try {
        const response = await request.post('/core/get-list-data', {
          table_code: 'tbldm_taikhoan_nganhang_donvi_sudung',
          size: 5000,
          page: 1
        })

        commit('SET_STATE', { key: 'lstTaiKhoanNganHang', value: response })
      } catch (error) {
        console.error('Lỗi khi tải danh sách tài khoản ngân hàng:', error)
      }
    },
  async loadCanBo141({ commit }) {
      try {
        const response = await request.post('/core/get-list-data', {
          table_code: 'tbldmcanbo_141',
          size: 5000,
          page: 1
        })

        commit('SET_STATE', { key: 'lstCanBo141', value: response })
      } catch (error) {
        console.error('Lỗi khi tải danh sách cán bộ:', error)
      }
    },
  async updateHachToanCell({ commit }, payload) {
    commit('UPDATE_HACH_TOAN_CELL', payload)
  },
  async updateXuatVatTuCell({ commit }, payload) {
    commit('UPDATE_XUAT_VAT_TU_CELL', payload)
  },
  async updateNhapVatTuCell({ commit }, payload) {
    commit('UPDATE_NHAP_VAT_TU_CELL', payload)
  },
  async updateHoaDonBanRaCell({ commit }, payload) {
    commit('UPDATE_HOA_DON_BAN_RA_CELL', payload)
  },
  setRowFlag({ commit }, payload) {
    console.log('setRowFlag', payload)
    commit('UPDATE_ROW_ACTION', payload)
  },
  updateMultipleNhatKyChung({ commit }, updates) {
    commit('UPDATE_MULTIPLE_FIELDS_NHAT_KY_CHUNG', updates)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
