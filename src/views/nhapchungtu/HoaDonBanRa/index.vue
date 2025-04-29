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
      columnTaiKhoanPopupTable: [
        { prop: 'soHieuTK', label: 'Số hiệu tài khoản' },
        { prop: 'tenTK', label: 'Tên tài khoản' }
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
        { prop: 'tienHang', label: 'Tiền hàng', minWidth: '200px', align: 'right', format: 'currency', onChangeValue: true },
        { prop: 'thueSuat', label: 'Thuế suất', minWidth: '180px', align: 'right  ' },
        { prop: 'tienThue', label: 'Tiền thuế', minWidth: '180px', align: 'center', format: 'currency', onChangeValue: true },
        { prop: 'tongTien', label: 'Tổng tiền', minWidth: '180px', format: 'currency' },
        { prop: 'ghiChu', label: 'Ghi chú', minWidth: '250px' }
      ]
    }
  },
  computed: {
    ...mapState('nhapchungtu', ['popup', 'lstTaiKhoan', 'lstKhoHang', 'lstVatTu', 'hoaDonBanRaData'])
  },
  methods: {
    ...mapActions('nhapchungtu', ['setRowFlag', 'updateHoaDonBanRaCell']),
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
            this.updateHoaDonBanRaCell({
              dongHachToan: data.row.dongHachToan, // Số dòng cần update
              column: data.col.prop, // Cột cần update
              value: result.soHieuTK // Giá trị mới
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
  }
}
</script>

<style>
</style>
