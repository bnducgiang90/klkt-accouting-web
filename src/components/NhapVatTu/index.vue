<template>
  <div>
    <TableData
      :columns="columns"
      :data="data"
    />
  </div>
</template>

<script>
import TableData from '../TableData'

export default {
  components: {
    TableData
  },
  data() {
    return {
      data: [
        { dongChungTu: 1, tkNo: 112, chiTietNo: 12345, tkCo: 234, chiTietCo: 2345, soTien: 2332432432, thoiHanThanhToan: 'sàdsf', thoiHanChietKhau: '2 thang', kyHieuSoHoaDon: 1 },
        { dongChungTu: 1, tkNo: 112, chiTietNo: 12345, tkCo: 234, chiTietCo: 2345, soTien: 2332432432, thoiHanThanhToan: 'sàdsf', thoiHanChietKhau: '2 thang', kyHieuSoHoaDon: 1 },
        { dongChungTu: 1, tkNo: 112, chiTietNo: 12345, tkCo: 234, chiTietCo: 2345, soTien: 2332432432, thoiHanThanhToan: 'sàdsf', thoiHanChietKhau: '2 thang', kyHieuSoHoaDon: 1 }
      ],
      columns: [
        { prop: 'dongChungTu', label: 'Dòng chứng từ', minWidth: '110px' },
        { prop: 'tkNo', label: 'TK Nợ', minWidth: '100px', align: 'center' },
        { prop: 'chiTietNo', label: 'Chi tiết nợ', minWidth: '120px', align: 'center' },
        { prop: 'tkCo', label: 'TK Có', minWidth: '100px', align: 'center' },
        { prop: 'chiTietCo', label: 'Chi tiết có', minWidth: '120px', align: 'center' },
        { prop: 'soTien', label: 'Số tiền', minWidth: '180px', align: 'right', format: 'currency' },
        { prop: 'thoiHanThanhToan', label: 'Thời hạn thanh toán', minWidth: '200px' },
        { prop: 'thoiHanChietKhau', label: 'Thời hạn chiết khấu', minWidth: '200px' },
        { prop: 'kyHieuSoHoaDon', label: 'Ký hiệu số Hóa đơn', minWidth: '180px' }
      ]
    }
  }
}
</script>

<style>
</style>
