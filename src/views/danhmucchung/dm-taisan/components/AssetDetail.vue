<template>
  <el-dialog
    title="Chi tiết tài sản"
    :visible.sync="dialogVisible"
    width="800px"
    :before-close="handleClose"
  >
    <div v-if="assetData" class="asset-detail">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="MST">
          {{ assetData.mst || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Số hiệu TK">
          {{ assetData.sohieutk || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Mã tài sản">
          {{ assetData.ma_taisan || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Tên tài sản">
          {{ assetData.ten_taisan || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Đơn vị tính">
          {{ assetData.dvt || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Số thẻ">
          {{ assetData.so_the || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Ngày lập thẻ">
          {{ formatDate(assetData.ngaylap_the) }}
        </el-descriptions-item>
        <el-descriptions-item label="Hãng tài sản">
          {{ assetData.hang_taisan || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Công suất thiết kế">
          {{ assetData.congsuat_thietke || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Nước sản xuất">
          {{ assetData.nuoc_sanxuat || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Năm sản xuất">
          {{ assetData.nam_sanxuat || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Hiện trạng">
          {{ assetData.hientrang || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Mã đơn vị quản lý">
          {{ assetData.donvi_quanly || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Tên đơn vị quản lý">
          {{ assetData.ten_donvi_quanly || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Nguồn vốn">
          {{ assetData.nguonvon || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Số biên bản bàn giao">
          {{ assetData.so_bienban_bangiao || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Ngày biên bản bàn giao">
          {{ formatDate(assetData.ngay_bienban_bangiao) }}
        </el-descriptions-item>
        <el-descriptions-item label="Ngày điều chỉnh">
          {{ formatDate(assetData.ngay_dieuchinh) }}
        </el-descriptions-item>
        <el-descriptions-item label="Lý do điều chỉnh">
          {{ assetData.lydo_dieuchinh || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Số lượng đầu kỳ">
          {{ formatNumber(assetData.soluong_dauky) }}
        </el-descriptions-item>
        <el-descriptions-item label="Nguyên giá">
          {{ formatCurrency(assetData.nguyengia) }}
        </el-descriptions-item>
        <el-descriptions-item label="Hao mòn lũy kế">
          {{ formatCurrency(assetData.haomon_luyke) }}
        </el-descriptions-item>
        <el-descriptions-item label="Giá trị còn lại">
          {{ formatCurrency(assetData.giatri_conlai) }}
        </el-descriptions-item>
        <el-descriptions-item label="Số năm phân bổ">
          {{ formatNumber(assetData.so_nam_phanbo) }}
        </el-descriptions-item>
        <el-descriptions-item label="Kỳ phân bổ">
          {{ assetData.ky_phanbo || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Số tháng phân bổ">
          {{ formatNumber(assetData.sothang_phanbo) }}
        </el-descriptions-item>
        <el-descriptions-item label="TK phân bổ">
          {{ assetData.taikhoan_phanbo || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Mã kho CT">
          {{ assetData.ma_kho_ct || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Mã nhóm CT">
          {{ assetData.ma_nhom_ct || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Chi tiết TK phân bổ">
          {{ assetData.chitiet_taikhoan_phanbo || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Công đoạn sản xuất">
          {{ assetData.congdoan_sanxuat || 'N/A' }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div v-else class="loading-container">
      <el-empty description="Không có dữ liệu" />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Đóng</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AssetDetail',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    assetData: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      }
    }
  },
  methods: {
    formatCurrency(value) {
      if (value === null || value === undefined) return '0 VND';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(value);
    },
    formatNumber(value) {
      if (value === null || value === undefined) return '';
      return new Intl.NumberFormat('vi-VN').format(value);
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    handleClose() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.asset-detail {
  padding: 10px 0;
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
.dialog-footer {
  text-align: right;
}
</style> 