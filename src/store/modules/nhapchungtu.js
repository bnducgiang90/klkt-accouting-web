import axios from 'axios'

const state = {
  loaiChungTu: '',
  tabtype: 'TAB_NHAT_KY_CHUNG',
  popup: {
    showPopup: false,
    popupCode: '',
    data: [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 }
    ],
    columns: [
      { prop: 'id', label: 'ID' },
      { prop: 'name', label: 'Name' },
      { prop: 'age', label: 'Age' }
    ],
    selectedRow: {
    }
  },
  columnKhachHangPopupTable: [
    { prop: 'id', label: 'ID', width: '120px' },
    { prop: 'cap', label: 'Cấp', width: '80px', align: 'center' },
    { prop: 'mst', label: 'Mã số thuế', width: '100px' },
    { prop: 'tenDonVi', label: 'Tên đơn vị', width: '250px' },
    { prop: 'duNo', label: 'Dư nợ', width: '150px', align: 'right', format: 'currency' },
    { prop: 'duCo', label: 'Dư có', width: '150px', align: 'right', format: 'currency' },
    { prop: 'diaChi', label: 'Địa chỉ', width: '250px', wrapText: true },
    { prop: 'huyen', label: 'Huyện', width: '150px' },
    { prop: 'tinh', label: 'Tỉnh', width: '150px' },
    { prop: 'dienThoai', label: 'Điện thoại', width: '120px' },
    { prop: 'tenGiamDoc', label: 'Tên giám đốc', width: '180px' },
    { prop: 'tenKeToan', label: 'Tên kế toán', width: '180px' },
    { prop: 'linhVucKd', label: 'Lĩnh vực DK', width: '150px' },
    { prop: 'khachHang', label: 'Khách hàng', width: '180px' },
    { prop: 'nhaCungCap', label: 'Nhà cung cấp', width: '180px' },
    { prop: 'taiKhoan', label: 'Tài khoản', width: '120px' },
    { prop: 'nganHang', label: 'Ngân hàng', width: '200px' },
    { prop: 'email', label: 'Địa chỉ Email', width: '200px' }
  ],
  lstKhachHang: [],

  columnNhaCungCapPopupTable: [
    { prop: 'id', label: 'ID', width: '120px' },
    { prop: 'cap', label: 'Cấp', width: '80px', align: 'center' },
    { prop: 'mst', label: 'Mã số thuế', width: '100px' },
    { prop: 'tenDonVi', label: 'Tên đơn vị', width: '250px' },
    { prop: 'duNo', label: 'Dư nợ', width: '150px', align: 'right', format: 'currency' },
    { prop: 'duCo', label: 'Dư có', width: '150px', align: 'right', format: 'currency' },
    { prop: 'diaChi', label: 'Địa chỉ', width: '250px', wrapText: true },
    { prop: 'huyen', label: 'Huyện', width: '150px' },
    { prop: 'tinh', label: 'Tỉnh', width: '150px' },
    { prop: 'dienThoai', label: 'Điện thoại', width: '120px' },
    { prop: 'tenGiamDoc', label: 'Tên giám đốc', width: '180px' },
    { prop: 'tenKeToan', label: 'Tên kế toán', width: '180px' },
    { prop: 'linhVucKd', label: 'Lĩnh vực DK', width: '150px' },
    { prop: 'khachHang', label: 'Khách hàng', width: '180px' },
    { prop: 'nhaCungCap', label: 'Nhà cung cấp', width: '180px' },
    { prop: 'taiKhoan', label: 'Tài khoản', width: '120px' },
    { prop: 'nganHang', label: 'Ngân hàng', width: '200px' },
    { prop: 'email', label: 'Địa chỉ Email', width: '200px' }
  ],
  lstNhaCungCap: [],

  columnTaiKhoanPopupTable: [
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: 'Name' },
    { prop: 'age', label: 'Age' }
  ],
  lstTaiKhoan: [],

  lstHinhThucTT: [],

  columnNguoiGiaoDichPopupTable: [
    { prop: 'maNguoiGd', label: 'Mã người giao dịch', width: '100px' },
    { prop: 'tenNguoiGd', label: 'Tên người giao dịch', width: '180px' }
  ],
  lstNguoiGiaoDich: [],

  nhatKyChung: {
    chungTu: {
      sttgs: '123',
      kyHieuSoCT: '222',
      ngay: '',
      hienSoChungTu: true,
      noiDung: 'dsfsdfsd',
      khachHang: 'a tung'
    },
    thongTinKhachHang: {
      maSoThue: '123',
      tenDonVi: 'ten don vi test',
      diaChi: 'dia chi test',
      dienThoai: 'dien thoai test',
      soTaiKhoan: '222',
      nganHang: 'ngan hang test',
      hinhThucTT: 'hinh thuc tt test',
      nguoiGiaoDich: 'nguoi giao dic',
      nhaCungCap: 'nha cung cap test',
      hachToanNgoaiTe: true
    }
  },
  hachToan: {
    data: [
      { dongChungTu: 1, tkNo: 112, chiTietNo: 12345, tkCo: 234, chiTietCo: 2345, soTien: 2332432432, thoiHanThanhToan: '01/02/2023', thoiHanChietKhau: '2 thang', kyHieuSoHoaDon: 1 },
      { dongChungTu: 2, tkNo: 112, chiTietNo: 12345, tkCo: 234, chiTietCo: 2345, soTien: 2332432432, thoiHanThanhToan: '15/02/2024', thoiHanChietKhau: '2 thang', kyHieuSoHoaDon: 1 },
      { dongChungTu: 3, tkNo: 112, chiTietNo: 12345, tkCo: 234, chiTietCo: 2345, soTien: 2332432432, thoiHanThanhToan: '09/10/2024', thoiHanChietKhau: '2 thang', kyHieuSoHoaDon: 1 }
    ],
    columns: [
      { prop: 'dongChungTu', label: 'Dòng chứng từ', minWidth: '110px', align: 'center', disableEditing: true, identity: true },
      { prop: 'tkNo', label: 'TK Nợ', minWidth: '100px', align: 'center', onSpaceKey: true },
      { prop: 'chiTietNo', label: 'Chi tiết nợ', minWidth: '120px', align: 'center' },
      { prop: 'tkCo', label: 'TK Có', minWidth: '100px', align: 'center' },
      { prop: 'chiTietCo', label: 'Chi tiết có', minWidth: '120px', align: 'center' },
      { prop: 'soTien', label: 'Số tiền', minWidth: '180px', align: 'right', format: 'currency' },
      { prop: 'thoiHanThanhToan', label: 'Thời hạn thanh toán', minWidth: '200px', align: 'right', format: 'date' },
      { prop: 'thoiHanChietKhau', label: 'Thời hạn chiết khấu', minWidth: '200px', align: 'right', format: 'date' },
      { prop: 'kyHieuSoHoaDon', label: 'Ký hiệu số Hóa đơn', minWidth: '180px' }
    ]
  }
}

const mutations = {
  SET_LOAI_CHUNG_TU(state, loaiChungTu) {
    state.loaiChungTu = loaiChungTu
  },
  SET_TAB_TYPE(state, tabtype) {
    state.tabtype = tabtype
  },
  TOGGLE_POPUP(state, popupData) {
    state.popup = popupData
  },
  CLOSE_POPUP(state) {
    state.popup.showPopup = false
  },
  SET_LST_KHACH_HANG(state, data) {
    state.lstKhachHang = data
  },
  SET_LST_NHA_CUNG_CAP(state, data) {
    state.lstNhaCungCap = data
  },
  SET_LST_TAI_KHOAN(state, data) {
    state.lstTaiKhoan = data
  },
  SET_LST_HINH_THUC_TT(state, data) {
    state.lstHinhThucTT = data
  },
  SET_LST_NGUOI_GIAO_DICH(state, data) {
    state.lstNguoiGiaoDich = data
  },
  UPDATE_NHAT_KY_CHUNG(state, data) {
    if (state.popup.popupCode === 'POPUP_NHACUNGCAP') {
      state.nhatKyChung.thongTinKhachHang.nhaCungCap = data.id
    } else if (state.popup.popupCode === 'POPUP_KHACHHANG') {
      state.nhatKyChung.chungTu.khachHang = data.id
    }

    state.nhatKyChung.chungTu.khachHang = data.id
    state.nhatKyChung.thongTinKhachHang.maSoThue = data.mst
    state.nhatKyChung.thongTinKhachHang.tenDonVi = data.tenDonVi
    state.nhatKyChung.thongTinKhachHang.diaChi = data.diaChi
    state.nhatKyChung.thongTinKhachHang.dienThoai = data.dienThoai
    state.nhatKyChung.thongTinKhachHang.email = data.email
  },
  UPDATE_NGUOI_GIAO_DICH(state, data) {
    state.nhatKyChung.thongTinKhachHang.nguoiGiaoDich = data.maNguoiGd
  },
  SET_INPUT_NHA_CUNG_CAP(state, data) {
    state.nhatKyChung.thongTinKhachHang.nhaCungCap = data
  },
  SET_INPUT_KHACH_HANG(state, data) {
    state.nhatKyChung.thongTinKhachHang.khachHang = data
  },
  UPSERT_HACH_TOAN(state, newRecord) {
    // Tìm xem có bản ghi nào trùng `dongChungTu` hay không
    const existingRecord = state.hachToan.data.find(item => item.dongChungTu === newRecord.dongChungTu)

    if (existingRecord) {
      Object.assign(existingRecord, newRecord)
    } else {
      state.hachToan.data.push(newRecord)
    }
  },
  DELETE_HACH_TOAN(state, dongChungTu) {
    state.hachToan.data = state.hachToan.data.filter(item => item.dongChungTu !== dongChungTu)
  }
}

const actions = {
  async updateLoaiChungTu({ commit }, loaiChungTu) {
    commit('SET_LOAI_CHUNG_TU', loaiChungTu)
  },
  async updateTabType({ commit }, tabtype) {
    commit('SET_TAB_TYPE', tabtype)
  },
  async togglePopup({ commit }, type) {
    if (type === 'POPUP_TAIKHOAN') {
      commit('TOGGLE_POPUP', {
        title: 'DANH MỤC TÀI KHOẢN',
        showPopup: true,
        popupCode: type,
        width: '95%',
        fullscreen: false,
        columns: state.columnTaiKhoanPopupTable,
        data: [
          { id: 1, name: 'Alice', age: 25 },
          { id: 2, name: 'Bob', age: 30 }
        ],
        selectedRow: {
        }
      })
    } else if (type === 'POPUP_KHACHHANG') {
      commit('TOGGLE_POPUP', {
        title: 'DANH MỤC KHÁCH HÀNG',
        showPopup: true,
        popupCode: type,
        width: '95%',
        fullscreen: false,
        columns: state.columnKhachHangPopupTable,
        data: state.lstNhaCungCap,
        selectedRow: {
        }
      })
    } else if (type === 'POPUP_NHACUNGCAP') {
      commit('TOGGLE_POPUP', {
        title: 'DANH MỤC NHÀ CUNG CẤP',
        showPopup: true,
        popupCode: type,
        width: '95%',
        fullscreen: false,
        columns: state.columnNhaCungCapPopupTable,
        data: state.lstNhaCungCap,
        selectedRow: {
        }
      })
    } else if (type === 'POPUP_NGUOIGIAODICH') {
      try {
        const mst = state.nhatKyChung.thongTinKhachHang.maSoThue // Mã số thuế cần tìm
        const response = await axios.get(`http://localhost:8080/api/nguoi-giao-dich/mst/${mst}`)
        const data = response.data
        commit('SET_LST_NGUOI_GIAO_DICH', data)
      } catch (error) {
        console.error('Lỗi khi tải danh sách người giao dịch:', error)
      }
      commit('TOGGLE_POPUP', {
        title: 'DANH MỤC NGƯỜI GIAO DỊCH',
        showPopup: true,
        popupCode: type,
        width: '40%',
        fullscreen: false,
        columns: state.columnNguoiGiaoDichPopupTable,
        data: state.lstNguoiGiaoDich,
        selectedRow: {
        }
      })
    }
  },
  async loadKhachHang({ commit }) {
    try {
      const response = await axios.get('http://localhost:8080/api/khachhang')
      const data = response.data
      commit('SET_LST_KHACH_HANG', data)
    } catch (error) {
      console.error('Lỗi khi tải danh sách khách hàng:', error)
    }
  },
  async loadNhaCungCap({ commit }) {
    try {
      const response = await axios.get('http://localhost:8080/api/nhacungcap')
      const data = response.data
      commit('SET_LST_NHA_CUNG_CAP', data)
    } catch (error) {
      console.error('Lỗi khi tải danh sách nhà cung cấp:', error)
    }
  },
  async loadTaiKhoan({ commit }) {
    try {
      const response = await fetch('/api/taikhoan')
      const data = await response.json()
      commit('SET_LST_TAI_KHOAN', data)
    } catch (error) {
      console.error('Lỗi khi tải danh sách tài khoản:', error)
    }
  },
  async loadHinhThucTT({ commit }) {
    try {
      const response = await axios.get('http://localhost:8080/api/hinhthuctt')
      const data = response.data
      commit('SET_LST_HINH_THUC_TT', data)
    } catch (error) {
      console.error('Lỗi khi tải danh sách tài khoản:', error)
    }
  },
  async handleRowSelected({ commit }, payload) {
    try {
      if (state.popup.popupCode === 'POPUP_NHACUNGCAP') {
        // thay đổi giá trị cho ô input abc
        commit('UPDATE_NHAT_KY_CHUNG', payload)
        commit('CLOSE_POPUP')
      } else if (state.popup.popupCode === 'POPUP_TAIKHOAN') {
        // thay đổi giá trị cho ô input abc
      } else if (state.popup.popupCode === 'POPUP_KHACHHANG') {
        commit('UPDATE_NHAT_KY_CHUNG', payload)
        commit('CLOSE_POPUP')
      } else if (state.popup.popupCode === 'POPUP_NGUOIGIAODICH') {
        commit('UPDATE_NGUOI_GIAO_DICH', payload)
        commit('CLOSE_POPUP')
      }
      // commit('SET_LST_TAI_KHOAN', data)
    } catch (error) {
      console.error('Lỗi khi handleRowSelected', error)
    }
  },
  async upsertHachToan({ commit }, newRecord) {
    try {
      // Gọi mutation để cập nhật dữ liệu
      commit('UPSERT_HACH_TOAN', newRecord)

      // Giả sử có thể cần thực hiện một số tác vụ bất đồng bộ (VD: lưu vào server)
      return Promise.resolve('Success')
    } catch (error) {
      return Promise.reject('Failed to update hachToan')
    }
  },
  async deleteHachToan({ commit }, dongChungTu) {
    try {
      commit('DELETE_HACH_TOAN', dongChungTu)
      return Promise.resolve('Success')
    } catch (error) {
      return Promise.reject('Failed to delete hachToan')
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
