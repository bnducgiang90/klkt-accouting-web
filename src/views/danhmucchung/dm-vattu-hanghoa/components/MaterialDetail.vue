<template>
  <el-dialog
    title="Chi tiết vật tư"
    :visible.sync="dialogVisible"
    width="1000px"
    :before-close="handleClose"
  >
    <div v-if="materialData" class="material-detail-form">
      <!-- Thông tin chung -->
      <div class="section-title">Thông tin chung</div>
      <div class="form-row">
        <div class="form-label">MST:</div>
        <div class="form-value">{{ materialData.mst || 'N/A' }}</div>
        <div class="form-label">Số hiệu TK:</div>
        <div class="form-value">{{ materialData.sohieutk || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Mã kho:</div>
        <div class="form-value">{{ materialData.ma_kho || 'N/A' }}</div>
        <div class="form-label">Mã nhóm:</div>
        <div class="form-value">{{ materialData.ma_nhom || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Mã vật tư:</div>
        <div class="form-value">{{ materialData.ma_vattu || 'N/A' }}</div>
        <div class="form-label">Tên vật tư:</div>
        <div class="form-value">{{ materialData.ten_vattu || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Đơn vị tính:</div>
        <div class="form-value">{{ materialData.dvt || 'N/A' }}</div>
        <div class="form-label">Năm:</div>
        <div class="form-value">{{ materialData.nam || 'N/A' }}</div>
      </div>

      <!-- Thông tin đầu kỳ -->
      <div class="section-title">Thông tin đầu kỳ</div>
      <div class="form-row">
        <div class="form-label">Lượng đầu kỳ:</div>
        <div class="form-value amount">{{ formatNumber(materialData.luong_dau_ky) }}</div>
        <div class="form-label">Giá trị đầu kỳ:</div>
        <div class="form-value amount">{{ formatCurrency(materialData.gia_tri_dau_ky) }}</div>
      </div>

      <!-- Thông tin quy đổi -->
      <div class="section-title">Thông tin quy đổi</div>
      <div class="form-row">
        <div class="form-label">Hệ số quy đổi:</div>
        <div class="form-value">{{ formatNumber(materialData.he_so_quy_doi) }}</div>
        <div class="form-label">Mã đơn vị quy đổi:</div>
        <div class="form-value">{{ materialData.ma_don_vi_quy_doi || 'N/A' }}</div>
      </div>

      <!-- Thông tin lưu trữ & ghi chú -->
      <div class="section-title">Thông tin lưu trữ & ghi chú</div>
      <div class="form-row">
        <div class="form-label">Vị trí lưu trữ:</div>
        <div class="form-value" style="grid-column: span 3;">{{ materialData.vi_tri_luu_tru || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Ghi chú:</div>
        <div class="form-value" style="grid-column: span 3;">{{ materialData.ghi_chu || 'Không có ghi chú' }}</div>
      </div>

      <!-- Trạng thái & ngày tạo/cập nhật -->
      <div class="section-title">Trạng thái & ngày tạo/cập nhật</div>
      <div class="form-row">
        <div class="form-label">Trạng thái:</div>
        <div class="form-value">
          <el-tag :type="materialData.trang_thai === 1 ? 'success' : 'danger'">
            {{ materialData.trang_thai === 1 ? 'Hoạt động' : 'Vô hiệu hóa' }}
          </el-tag>
        </div>
        <div class="form-label">Ngày tạo:</div>
        <div class="form-value">{{ formatDate(materialData.created_at) }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Ngày cập nhật:</div>
        <div class="form-value">{{ formatDate(materialData.updated_at) }}</div>
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
  name: 'MaterialDetail',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    materialData: {
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
.material-detail-form {
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