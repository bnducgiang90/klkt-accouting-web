<template>
  <div>
    <TableData
      :columns="columns"
      :data="hachToanData"
      @space-key-pressed="handlePressSpaceKey"
      @handle-row="handleRow"
      @change-value="handleChangeValue"
    />
  </div>
</template>

<script>
import TableData from '../../../components/TableData'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    TableData
  },
  props: ['popupRef'],
  data() {
    return {
      columnTaiKhoanPopupTable: [
        { prop: 'sohieutk', label: 'Số hiệu tài khoản' },
        { prop: 'ten_tk', label: 'Tên tài khoản' }
      ],
      columnTaiKhoanChiTietPopupTable: [
        { prop: 'ma_chitiet', label: 'Mã chi tiết' },
        { prop: 'ten_chitiet', label: 'Tên chi tiết' }
      ],
      columnVatTuPopupTable: [
        { prop: 'ma_nhom', label: 'Mã nhóm hàng' },
        { prop: 'ma_vattu', label: 'Mã vật tư' },
        { prop: 'ten_vattu', label: 'Tên vật tư' }
      ],
      columnCanBo141PopupTable: [
        { prop: 'sohieutk', label: 'Số hiệu TK' },
        { prop: 'ma_kho', label: 'Mã Kho' },
        { prop: 'ma_nhom', label: 'Mã Nhóm' },
        { prop: 'ma_vattu', label: 'Mã cán bộ' },
        { prop: 'ten_vattu', label: 'Tên cán bộ' },
        { prop: 'chuc_vu', label: 'Chức vụ' },
        { prop: 'heso_phucap', label: 'Hệ số phụ cấp' },
        { prop: 'heso_luong', label: 'Hệ số lương' }
      ],
      columnKhachHangPopupTable: [
        { prop: 'id', label: 'ID', width: '120px' },
        { prop: 'cap', label: 'Cấp', width: '80px', align: 'center' },
        { prop: 'mst_kh_ncc', label: 'Mã số thuế', width: '100px' },
        { prop: 'ten_congty', label: 'Tên đơn vị', width: '250px' },
        { prop: 'du_no', label: 'Dư nợ', width: '150px', align: 'right', format: 'currency' },
        { prop: 'du_co', label: 'Dư có', width: '150px', align: 'right', format: 'currency' },
        { prop: 'dia_chi', label: 'Địa chỉ', width: '250px', wrapText: true },
        { prop: 'huyen', label: 'Huyện', width: '150px' },
        { prop: 'tinh', label: 'Tỉnh', width: '150px' },
        { prop: 'dien_thoai', label: 'Điện thoại', width: '120px' },
        { prop: 'ten_giamdoc', label: 'Tên giám đốc', width: '180px' },
        { prop: 'ten_ketoan', label: 'Tên kế toán', width: '180px' },
        { prop: 'linh_vuc_kd', label: 'Lĩnh vực DK', width: '150px' },
        { prop: 'khach_hang', label: 'Khách hàng', width: '180px' },
        { prop: 'nha_cungcap', label: 'Nhà cung cấp', width: '180px' },
        { prop: 'tai_khoan', label: 'Tài khoản', width: '120px' },
        { prop: 'ngan_hang', label: 'Ngân hàng', width: '200px' },
        { prop: 'email', label: 'Địa chỉ Email', width: '200px' }
      ],
      columnNhaCungCapPopupTable: [
        { prop: 'id', label: 'ID', minWidth: '120px' },
        { prop: 'cap', label: 'Cấp', minWidth: '80px', align: 'center' },
        { prop: 'mst_kh_ncc', label: 'Mã số thuế', minWidth: '100px' },
        { prop: 'ten_congty', label: 'Tên đơn vị', minWidth: '200px', maxWidth: '250px', wrapText: true },
        { prop: 'du_no', label: 'Dư nợ', minWidth: '150px', align: 'right', format: 'currency' },
        { prop: 'du_co', label: 'Dư có', minWidth: '150px', align: 'right', format: 'currency' },
        { prop: 'dia_chi', label: 'Địa chỉ', minWidth: '250px', wrapText: true },
        { prop: 'huyen', label: 'Huyện', minWidth: '150px' },
        { prop: 'tinh', label: 'Tỉnh', minWidth: '150px' },
        { prop: 'dien_thoai', label: 'Điện thoại', minWidth: '120px' },
        { prop: 'ten_giamdoc', label: 'Tên giám đốc', minWidth: '180px' },
        { prop: 'ten_ketoan', label: 'Tên kế toán', minWidth: '180px' },
        { prop: 'linh_vuc_kd', label: 'Lĩnh vực DK', minWidth: '150px' },
        { prop: 'khach_hang', label: 'Khách hàng', minWidth: '180px' },
        { prop: 'nha_cungcap', label: 'Nhà cung cấp', minWidth: '180px' },
        { prop: 'tai_khoan', label: 'Tài khoản', minWidth: '120px' },
        { prop: 'ngan_hang', label: 'Ngân hàng', minWidth: '200px' },
        { prop: 'email', label: 'Địa chỉ Email', minWidth: '200px' }
      ],
      columns: [
        { prop: 'dongChungTu', label: 'Dòng chứng từ', minWidth: '110px', align: 'center', disableEditing: true, identity: true },
        { prop: 'tkNo', label: 'TK Nợ', minWidth: '100px', align: 'center', onSpaceKey: true, regexPattern: '^[0-9]*$', maxLength: 10, errorMessage: 'Chỉ được nhập số!' },
        { prop: 'chiTietNo', label: 'Chi tiết nợ', minWidth: '120px', align: 'center', regexPattern: '^[0-9]*$', maxLength: 15, errorMessage: 'Chỉ được nhập số!' },
        { prop: 'tkCo', label: 'TK Có', minWidth: '100px', align: 'center', onSpaceKey: true, regexPattern: '^[0-9]*$', maxLength: 10, errorMessage: 'Chỉ được nhập số!' },
        { prop: 'chiTietCo', label: 'Chi tiết có', minWidth: '120px', align: 'center', regexPattern: '^[0-9]*$', maxLength: 15, errorMessage: 'Chỉ được nhập số!' },
        { prop: 'soTien', label: 'Số tiền', minWidth: '180px', align: 'right', format: 'currency', regexPattern: '^[0-9]*$', maxLength: 20, errorMessage: 'Chỉ được nhập số!' },
        { prop: 'thoiHanThanhToan', label: 'Thời hạn thanh toán', minWidth: '200px', align: 'right', format: 'date' },
        { prop: 'thoiHanChietKhau', label: 'Thời hạn chiết khấu', minWidth: '200px', align: 'right', format: 'date' },
        { prop: 'kyHieuSoHoaDon', label: 'Ký hiệu số Hóa đơn', minWidth: '180px', regexPattern: '^[a-zA-Z0-9-_]+$', maxLength: 20, errorMessage: 'Chỉ nhập chữ, số, dấu - hoặc _!' }
      ]
    }
  },
  computed: {
    ...mapState('nhapchungtu', ['nhatKyChung','hachToanData', 'lstTaiKhoan', 'lstTaiKhoanChiTiet', 'lstKhachHang', 'lstCanBo141', 'lstNhaCungCap', 'lstVatTu' ])
  },
  methods: {
    ...mapActions('nhapchungtu', ['setRowFlag', 'updateHachToanCell', 'updateMultipleNhatKyChung', 'loadTaiKhoanChiTiet']), // 'upsertHachToan', 'deleteHachToan',
    handleRow(type, row) {
      console.log('handle', type, row)
      this.setRowFlag({ stateName: 'hachToanData', key: 'dongChungTu', value: row.dongChungTu, flagName: type, row: row })
    },
    async handlePressSpaceKey(data) {
      console.log('truyen vao', data)
      alert(`Space pressed in ${data.col.prop}: ${data.row[data.col.prop]} : ${data.row.dongChungTu}`)
      if (data.col.prop === 'tkNo' || data.col.prop === 'tkCo') {
        if (this.popupRef) {
          // nếu tk nợ hoặc tài khoản có = 131  -> lấy mã khach hàng bên trên điền xuống
          if (data.row[data.col.prop] === '131') {
            if (!this.nhatKyChung.chungTu.khachHang) {
              await this.openPopupKhachHang()
            }
            this.updateHachToanCell({
              dongChungTu: data.row.dongChungTu, // Số dòng cần update
              column: data.col.prop === 'tkNo' ? 'chiTietNo' : 'chiTietCo' , // Cột cần update
              value: this.nhatKyChung.chungTu.khachHang // Giá trị mới
            })
          } else if (data.row[data.col.prop] === '331') { // nếu tk nợ hoặc tk có = 331 -> lấy mã nhà cung cấp bên trên điều xuống
            if (!this.nhatKyChung.thongTinKhachHang.nhaCungCap) {
              await this.openPopupNhaCungCap()
            } 
            this.updateHachToanCell({
              dongChungTu: data.row.dongChungTu, // Số dòng cần update
              column: data.col.prop === 'tkNo' ? 'chiTietNo' : 'chiTietCo' , // Cột cần update
              value: this.nhatKyChung.thongTinKhachHang.nhaCungCap // Giá trị mới
            })
          } else if (data.row[data.col.prop] === '141' || data.row[data.col.prop] === '334') { // nếu tk nợ hoặc tk có = 141 hoặc 334 -> show popup là danh mục cán bộ 141
            const result = await this.popupRef.openPopup({
              title: 'DANH MỤC CÁN BỘ',
              width: '50%',
              columns: this.columnCanBo141PopupTable,
              data: this.lstCanBo141
            })
            if (result) {
              // this.selectedRow = result
              this.updateHachToanCell({
                dongChungTu: data.row.dongChungTu, // Số dòng cần update
                column: data.col.prop === 'tkNo' ? 'chiTietNo' : 'chiTietCo' , // Cột cần update
                value: result.ma_vattu // Giá trị mới
              })
            }
          } else if (data.row[data.col.prop] === '154') { // nếu tk nợ hoặc tk có = 154 -> show popup là danh mục vật tư
            const result = await this.popupRef.openPopup({
              title: 'DANH MỤC VẬT TƯ',
              width: '50%',
              columns: this.columnVatTuPopupTable,
              data: this.lstVatTu
            })
            if (result) {
              // this.selectedRow = result
              this.updateHachToanCell({
                dongChungTu: data.row.dongChungTu, // Số dòng cần update
                column: data.col.prop, // Cột cần update
                value: result.ma_vattu // Giá trị mới
              })
            }
          } else { // nếu khác show popup danh mục tài khoản & tài khoản chi tiết
            const result = await this.popupRef.openPopup({
              title: 'DANH MỤC TÀI KHOẢN',
              width: '50%',
              columns: this.columnTaiKhoanPopupTable,
              data: this.lstTaiKhoan
            })
            if (result) {
              // this.selectedRow = result
              await this.updateHachToanCell({
                dongChungTu: data.row.dongChungTu, // Số dòng cần update
                column: data.col.prop, // Cột cần update
                value: result.sohieutk // Giá trị mới
              })
              await this.loadTaiKhoanChiTiet(result.sohieutk) // load danh sách toàn khoản chi tiết
              // show popup
              const result2 = await this.popupRef.openPopup({
                title: 'DANH MỤC TÀI KHOẢN CHI TIẾT',
                width: '50%',
                columns: this.columnTaiKhoanChiTietPopupTable,
                data: this.lstTaiKhoanChiTiet
              })
              if (result2) {
                this.updateHachToanCell({
                  dongChungTu: data.row.dongChungTu, // Số dòng cần update
                  column: data.col.prop === 'tkNo' ? 'chiTietNo' : 'chiTietCo' , // Cột cần update
                  value: result2.ma_chitiet // Giá trị mới
                })
              }
            }
          }
        }
      }
    },
    async handleChangeValue(data) {
      null
    },
    deleteTableData(id) {
      this.deleteHachToan(id)
    },
    async openPopupKhachHang() {
      if (this.popupRef) {
        const result = await this.popupRef.openPopup({
          title: 'DANH MỤC KHÁCH HÀNG',
          width: '90%',
          columns: this.columnKhachHangPopupTable,
          data: this.lstKhachHang
        })
        if (result) {
          // this.selectedRow = result
          console.log(result)
          this.updateMultipleNhatKyChung([
            { path: 'chungTu.khachHang', value: result.id },
            { path: 'thongTinKhachHang.maSoThue', value: result.mst_kh_ncc },
            { path: 'thongTinKhachHang.tenDonVi', value: result.ten_congty },
            { path: 'thongTinKhachHang.diaChi', value: result.dia_chi },
            { path: 'thongTinKhachHang.dienThoai', value: result.dien_thoai },
            { path: 'thongTinKhachHang.email', value: result.email }
          ])
        }
      }
    },
    async openPopupNhaCungCap() {
      if (this.popupRef) {
        const result = await this.popupRef.openPopup({
          title: 'DANH MỤC NHÀ CUNG CẤP',
          width: '90%',
          columns: this.columnNhaCungCapPopupTable,
          data: this.lstNhaCungCap
        })
        if (result) {
          // this.selectedRow = result
          console.log(result)
          this.updateMultipleNhatKyChung([
            { path: 'thongTinKhachHang.nhaCungCap', value: result.id },
            { path: 'thongTinKhachHang.maSoThue', value: result.mst_kh_ncc },
            { path: 'thongTinKhachHang.tenDonVi', value: result.ten_congty },
            { path: 'thongTinKhachHang.diaChi', value: result.dia_chi },
            { path: 'thongTinKhachHang.dienThoai', value: result.dien_thoai },
            { path: 'thongTinKhachHang.email', value: result.email }
          ])
        }
      }
    },
  }
}
</script>

<style>
</style>
