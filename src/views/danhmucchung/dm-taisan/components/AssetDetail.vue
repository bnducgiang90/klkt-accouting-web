<template>
  <el-dialog
    title="Chi tiết tài sản"
    :visible.sync="dialogVisible"
    width="1000px"
    :before-close="handleClose"
  >
    <div v-if="assetData" class="asset-detail-form">
      <!-- Thông tin chung -->
      <div class="section-title">Thông tin chung</div>
      <div class="form-row">
        <div class="form-label">MST:</div>
        <div class="form-value">{{ assetData.mst || 'N/A' }}</div>
        <div class="form-label">Số hiệu TK:</div>
        <div class="form-value">{{ assetData.sohieutk || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Mã tài sản:</div>
        <div class="form-value">{{ assetData.ma_taisan || 'N/A' }}</div>
        <div class="form-label">Tên tài sản:</div>
        <div class="form-value">{{ assetData.ten_taisan || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Đơn vị tính:</div>
        <div class="form-value">{{ assetData.dvt || 'N/A' }}</div>
        <div class="form-label">Số thẻ:</div>
        <div class="form-value">{{ assetData.so_the || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Ngày lập thẻ:</div>
        <div class="form-value">{{ formatDate(assetData.ngaylap_the) }}</div>
        <div class="form-label">Hãng tài sản:</div>
        <div class="form-value">{{ assetData.hang_taisan || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Công suất thiết kế:</div>
        <div class="form-value">{{ assetData.congsuat_thietke || 'N/A' }}</div>
        <div class="form-label">Nước sản xuất:</div>
        <div class="form-value">{{ assetData.nuoc_sanxuat || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Năm sản xuất:</div>
        <div class="form-value">{{ assetData.nam_sanxuat || 'N/A' }}</div>
        <div class="form-label">Hiện trạng:</div>
        <div class="form-value">{{ assetData.hientrang || 'N/A' }}</div>
      </div>

      <!-- Thông tin quản lý -->
      <div class="section-title">Thông tin quản lý</div>
      <div class="form-row">
        <div class="form-label">Mã đơn vị quản lý:</div>
        <div class="form-value">{{ assetData.donvi_quanly || 'N/A' }}</div>
        <div class="form-label">Tên đơn vị quản lý:</div>
        <div class="form-value">{{ assetData.ten_donvi_quanly || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Nguồn vốn:</div>
        <div class="form-value">{{ assetData.nguonvon || 'N/A' }}</div>
      </div>

      <!-- Thông tin bàn giao/điều chỉnh -->
      <div class="section-title">Thông tin bàn giao/điều chỉnh</div>
      <div class="form-row">
        <div class="form-label">Số biên bản bàn giao:</div>
        <div class="form-value">{{ assetData.so_bienban_bangiao || 'N/A' }}</div>
        <div class="form-label">Ngày biên bản bàn giao:</div>
        <div class="form-value">{{ formatDate(assetData.ngay_bienban_bangiao) }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Ngày điều chỉnh:</div>
        <div class="form-value">{{ formatDate(assetData.ngay_dieuchinh) }}</div>
        <div class="form-label">Lý do điều chỉnh:</div>
        <div class="form-value">{{ assetData.lydo_dieuchinh || 'N/A' }}</div>
      </div>

      <!-- Thông tin kế toán -->
      <div class="section-title">Thông tin kế toán</div>
      <div class="form-row">
        <div class="form-label">Số lượng đầu kỳ:</div>
        <div class="form-value">{{ formatNumber(assetData.soluong_dauky) }}</div>
        <div class="form-label">Nguyên giá:</div>
        <div class="form-value amount">{{ formatCurrency(assetData.nguyengia) }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Hao mòn lũy kế:</div>
        <div class="form-value amount">{{ formatCurrency(assetData.haomon_luyke) }}</div>
        <div class="form-label">Giá trị còn lại:</div>
        <div class="form-value amount">{{ formatCurrency(assetData.giatri_conlai) }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Số năm phân bổ:</div>
        <div class="form-value">{{ formatNumber(assetData.so_nam_phanbo) }}</div>
        <div class="form-label">Kỳ phân bổ:</div>
        <div class="form-value">{{ assetData.ky_phanbo || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Số tháng phân bổ:</div>
        <div class="form-value">{{ formatNumber(assetData.sothang_phanbo) }}</div>
        <div class="form-label">TK phân bổ:</div>
        <div class="form-value">{{ assetData.taikhoan_phanbo || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Mã kho CT:</div>
        <div class="form-value">{{ assetData.ma_kho_ct || 'N/A' }}</div>
        <div class="form-label">Mã nhóm CT:</div>
        <div class="form-value">{{ assetData.ma_nhom_ct || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Chi tiết TK phân bổ:</div>
        <div class="form-value">{{ assetData.chitiet_taikhoan_phanbo || 'N/A' }}</div>
        <div class="form-label">Công đoạn sản xuất:</div>
        <div class="form-value">{{ assetData.congdoan_sanxuat || 'N/A' }}</div>
      </div>
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
.asset-detail-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px 0;
}
.section-title {
  font-weight: bold;
  margin: 12px 0 4px 0;
  color: #409eff;
  font-size: 16px;
}
.form-row {
  display: grid;
  grid-template-columns: 140px 1fr 140px 1fr;
  gap: 8px 16px;
  align-items: center;
  margin-bottom: 4px;
}
.form-label {
  font-weight: 500;
  color: #606266;
  text-align: right;
}
.form-value {
  color: #303133;
  font-weight: 400;
}
.amount {
  font-weight: bold;
  font-size: 14px;
  color: #409eff;
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