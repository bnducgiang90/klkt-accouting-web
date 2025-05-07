<template>
  <div>
    <TableData
      :columns="columns"
      :data="hoaDonBanRaData"
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
      ]
    }
  },
  computed: {
    ...mapState('nhapchungtu', ['popup', 'lstTaiKhoan', 'lstKhoHang', 'lstVatTu', 'chungTu', 'loaiChungTu', 'lstNhaCungCap','lstThueSuatBanRa']),
    hoaDonBanRaData() {
      return this.chungTu[this.loaiChungTu].hoaDonBanRa;
    },
    comboboxDataHangHoa() {
      return this.lstThueSuatBanRa.map(item => ({
        code: item.ma_loai,
        name: item.ten_loai
      }));
    },
    columns() {
      return [
        { prop: 'id', label: 'ID', minWidth: '100px', align: 'center', disableEditing: true, identity: true },
        { prop: 'tkThueDauRa', label: 'TK Thuế đầu ra', minWidth: '110px' },
        { prop: 'hoaDonDt', label: 'Hóa đơn ĐT', minWidth: '100px', align: 'center', type: 'boolean' },
        { prop: 'soHoaDon', label: 'Số hóa đơn', minWidth: '120px', align: 'center' },
        { prop: 'ngayHoaDon', label: 'Ngày hóa đơn', minWidth: '120px', align: 'left', format: 'date' },
        { prop: 'nguoiMuaBan', label: 'Người mua/bán', minWidth: '180px', align: 'left', onSpaceKey: true  },
        { prop: 'hangHoaChiuThue', label: 'Hàng hóa chịu thuế', minWidth: '250px', align: 'left', type: 'combobox', combodata: this.comboboxDataHangHoa },
        { prop: 'maSoThue', label: 'Mã số thuế', minWidth: '200px', align: 'right' },
        { prop: 'tienHang', label: 'Tiền hàng', minWidth: '200px', align: 'right', format: 'currency', onChangeValue: true },
        { prop: 'thueSuat', label: 'Thuế suất', minWidth: '180px', align: 'right  ' },
        { prop: 'tienThue', label: 'Tiền thuế', minWidth: '180px', align: 'center', format: 'currency', onChangeValue: true },
        { prop: 'tongTien', label: 'Tổng tiền', minWidth: '180px', format: 'currency' },
        { prop: 'ghiChu', label: 'Ghi chú', minWidth: '250px' }
      ]
    }
  },
  methods: {
    ...mapActions('nhapchungtu', ['setRowFlag', 'updateHoaDonBanRaCell', 'loadDmThueSuatBanRa']),
    handleRow(type, row) {
      console.log('handle', type, row)
      this.setRowFlag({ stateName: 'hoaDonBanRa', key: 'id', value: row.id, flagName: type, row: row })
    },
    async handlePressSpaceKey(data) {
      console.log('truyen vao', data)
      alert(`Space pressed in ${data.col.prop}: ${data.row[data.col.prop]}`)
      if (data.col.prop === 'nguoiMuaBan') {
        if (this.popupRef) {
          const result = await this.popupRef.openPopup({
            title: 'DANH MỤC CÔNG TY CUNG CẤP',
            width: '50%',
            columns: this.columnNhaCungCapPopupTable,
            data: this.lstNhaCungCap
          })
          if (result) {
            this.selectedRow = result
            this.updateHoaDonBanRaCell({
              id: data.row.id, // Số dòng cần update
              column: 'maSoThue', // Cột cần update
              value: result.mst_kh_ncc // Giá trị mới
            })
            this.updateHoaDonBanRaCell({
              id: data.row.id, // Số dòng cần update
              column: 'nguoiMuaBan', // Cột cần update
              value: result.ten_congty // Giá trị mới
            })
          }
        }
      } 
    },
    async handleChangeValue(data) {
      console.log('truyen vao', data)
      alert(`Space pressed in ${data.col.prop}: ${data.row[data.col.prop]}`)
      if (data.col.prop === 'tienHang' || data.col.prop === 'tienThue' ) {
        if (data.row['tienHang'] && data.row['tienThue']) {
          this.updateHoaDonBanRaCell({
            id: data.row.id, // Số dòng cần update
            column: 'tongTien', // Cột cần update
            value: Number(data.row['tienHang']) + Number(data.row['tienThue']) // Giá trị mới
          })
        }
      }
    },
  },
  mounted() {
    this.loadDmThueSuatBanRa()
  }
}
</script>

<style>
</style>
