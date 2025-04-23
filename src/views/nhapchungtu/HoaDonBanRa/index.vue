<template>
  <div>
    <TableData
      :columns="columns"
      :data="hoaDonBanRaData"
      @space-key-pressed="handlePressSpaceKey"
      @handle-row="handleRow"
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
        { prop: 'soHieuTK', label: 'Số hiệu tài khoản' },
        { prop: 'tenTK', label: 'Tên tài khoản' }
      ],
      columnKhoHangPopupTable: [
        { prop: 'maKho', label: 'Mã kho hàng' },
        { prop: 'tenKho', label: 'Tên kho hàng' }
      ],
      columnVatTuPopupTable: [
        { prop: 'maNhom', label: 'Mã nhóm hàng', width: '100px' },
        { prop: 'maVattu', label: 'Mã vật tư', width: '180px' },
        { prop: 'tenVattu', label: 'tên vật tư', width: '180px' },
        { prop: 'dvt', label: 'ĐVT', width: '180px' },
        { prop: 'heSoQuyDoi', label: 'H.Số quy đổi', width: '180px' },
        { prop: 'maDonViQuyDoi', label: 'ĐVT quy đổi', width: '180px' },
        { prop: 'viTriLuuTru', label: 'Vị trí lưu trữ', width: '180px' },
        { prop: 'nam', label: 'Năm', width: '180px' }
      ],
      columns: [
        { prop: 'id', label: 'ID', minWidth: '100px', align: 'center', disableEditing: true, identity: true },
        { prop: 'tkThueDauRa', label: 'TK Thuế đầu ra', minWidth: '110px' },
        { prop: 'hoaDonDt', label: 'Hóa đơn ĐT', minWidth: '100px', align: 'center', type: 'boolean' },
        { prop: 'soHoaDon', label: 'Số hóa đơn', minWidth: '120px', align: 'center' },
        { prop: 'ngayHoaDon', label: 'Ngày hóa đơn', minWidth: '120px', align: 'left', format: 'date' },
        { prop: 'nguoiMuaBan', label: 'Người mua/bán', minWidth: '180px', align: 'left' },
        { prop: 'hangHoaChiuThue', label: 'Hàng hóa chịu thuế', minWidth: '250px', align: 'left' },
        { prop: 'maSoThue', label: 'Mã số thuế', minWidth: '200px', align: 'right' },
        { prop: 'tienHang', label: 'Tiền hàng', minWidth: '200px', align: 'right', format: 'currency' },
        { prop: 'thueSuat', label: 'Thuế suất', minWidth: '180px', align: 'right  ' },
        { prop: 'tienThue', label: 'Tiền thuế', minWidth: '180px', align: 'center', format: 'currency' },
        { prop: 'tongTien', label: 'Tổng tiền', minWidth: '180px', format: 'currency' },
        { prop: 'ghiChu', label: 'Ghi chú', minWidth: '250px' }
      ]
    }
  },
  computed: {
    ...mapState('nhapchungtu', ['popup', 'lstTaiKhoan', 'lstKhoHang', 'lstVatTu', 'hoaDonBanRaData'])
  },
  methods: {
    ...mapActions('nhapchungtu', ['setRowFlag', 'updateXuatVatTuCell']),
    handleRow(type, row) {
      console.log('handle', type, row)
      this.setRowFlag({ stateName: 'hoaDonBanRaData', key: 'id', value: row.id, flagName: type, row: row })
    },
    async handlePressSpaceKey(data) {
      console.log('truyen vao', data)
      alert(`Space pressed in ${data.col.prop}: ${data.row[data.col.prop]}`)
      if (data.col.prop === 'tkXuat') {
        if (this.popupRef) {
          const result = await this.popupRef.openPopup({
            title: 'DANH MỤC TÀI KHOẢN',
            width: '50%',
            columns: this.columnTaiKhoanPopupTable,
            data: this.lstTaiKhoan
          })
          if (result) {
            this.selectedRow = result
            this.updateXuatVatTuCell({
              dongHachToan: data.row.dongHachToan, // Số dòng cần update
              column: data.col.prop, // Cột cần update
              value: result.soHieuTK // Giá trị mới
            })
          }
        }
      } else if (data.col.prop === 'maKhoXuat') {
        if (this.popupRef) {
          const result = await this.popupRef.openPopup({
            title: 'DANH MỤC KHO HÀNG',
            width: '50%',
            columns: this.columnKhoHangPopupTable,
            data: this.lstKhoHang
          })
          if (result) {
            this.selectedRow = result
            this.updateXuatVatTuCell({
              dongHachToan: data.row.dongHachToan, // Số dòng cần update
              column: data.col.prop, // Cột cần update
              value: result.maKho // Giá trị mới
            })
          }
        }
      } else if (data.col.prop === 'maVatTu' || data.col.prop === 'tenVatTu') {
        if (this.popupRef) {
          const result = await this.popupRef.openPopup({
            title: 'DANH MỤC VẬT TƯ HÀNG HÓA',
            width: '90%',
            columns: this.columnVatTuPopupTable,
            data: this.lstVatTu
          })
          if (result) {
            this.selectedRow = result
            this.updateXuatVatTuCell({
              dongHachToan: data.row.dongHachToan, // Số dòng cần update
              column: 'maVatTu', // Cột cần update
              value: result.maVattu // Giá trị mới
            })
            this.updateXuatVatTuCell({
              dongHachToan: data.row.dongHachToan, // Số dòng cần update
              column: 'tenVatTu', // Cột cần update
              value: result.tenVattu // Giá trị mới
            })
          }
        }
      }
    }
  }
}
</script>

<style>
</style>
