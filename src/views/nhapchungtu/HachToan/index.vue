<template>
  <div>
    <TableData
      :columns="columns"
      :data="hachToanData"
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
      columns: [
        { prop: 'dongChungTu', label: 'Dòng chứng từ', minWidth: '110px', align: 'center', disableEditing: true, identity: true },
        { prop: 'tkNo', label: 'TK Nợ', minWidth: '100px', align: 'center', onSpaceKey: true, regexPattern: '^[0-9]*$', maxLength: 10, errorMessage: 'Chỉ được nhập số!' },
        { prop: 'chiTietNo', label: 'Chi tiết nợ', minWidth: '120px', align: 'center', regexPattern: '^[0-9]*$', maxLength: 10, errorMessage: 'Chỉ được nhập số!' },
        { prop: 'tkCo', label: 'TK Có', minWidth: '100px', align: 'center', onSpaceKey: true, regexPattern: '^[0-9]*$', maxLength: 10, errorMessage: 'Chỉ được nhập số!' },
        { prop: 'chiTietCo', label: 'Chi tiết có', minWidth: '120px', align: 'center', regexPattern: '^[0-9]*$', maxLength: 10, errorMessage: 'Chỉ được nhập số!' },
        { prop: 'soTien', label: 'Số tiền', minWidth: '180px', align: 'right', format: 'currency', regexPattern: '^[0-9]*$', maxLength: 20, errorMessage: 'Chỉ được nhập số!' },
        { prop: 'thoiHanThanhToan', label: 'Thời hạn thanh toán', minWidth: '200px', align: 'right', format: 'date' },
        { prop: 'thoiHanChietKhau', label: 'Thời hạn chiết khấu', minWidth: '200px', align: 'right', format: 'date' },
        { prop: 'kyHieuSoHoaDon', label: 'Ký hiệu số Hóa đơn', minWidth: '180px', regexPattern: '^[a-zA-Z0-9-_]+$', maxLength: 20, errorMessage: 'Chỉ nhập chữ, số, dấu - hoặc _!' }
      ]
    }
  },
  computed: {
    ...mapState('nhapchungtu', ['hachToanData', 'lstTaiKhoan'])
  },
  methods: {
    ...mapActions('nhapchungtu', ['setRowFlag', 'updateHachToanCell']), // 'upsertHachToan', 'deleteHachToan',
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

          // nếu tk nợ hoặc tk có = 331 -> lấy mã nhà cung cấp bên trên điều xuống

          // nếu tk nợ hoặc tk có = 141 hoặc 334 -> show popup là danh mục cán bộ 141

          // nếu tk nợ hoặc tk có = 154 -> show popup là danh mục vật tư

          // nếu khác show popup danh mục tài khoản chi tiết

          const result = await this.popupRef.openPopup({
            title: 'DANH MỤC TÀI KHOẢN',
            width: '50%',
            columns: this.columnTaiKhoanPopupTable,
            data: this.lstTaiKhoan
          })
          if (result) {
            this.selectedRow = result
            this.updateHachToanCell({
              dongChungTu: data.row.dongChungTu, // Số dòng cần update
              column: data.col.prop, // Cột cần update
              value: result.soHieuTK // Giá trị mới
            })
          }
        }
      }
    },
    deleteTableData(id) {
      this.deleteHachToan(id)
    }
  }
}
</script>

<style>
</style>
