<template>
  <el-dialog
    title="Chi tiết chi phí trả trước"
    :visible.sync="visible"
    width="1000px"
    :before-close="handleClose"
  >
    <div v-if="chiphiTratruocData" class="chiphi-tratruoc-detail-form">
      <!-- Thông tin chung -->
      <div class="section-title">Thông tin chung</div>
      <div class="form-row">
        <div class="form-label">MST:</div>
        <div class="form-value">{{ chiphiTratruocData.mst || 'N/A' }}</div>
        <div class="form-label">Số hiệu TK:</div>
        <div class="form-value">{{ chiphiTratruocData.sohieutk || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Mã kho:</div>
        <div class="form-value">{{ chiphiTratruocData.ma_kho || 'N/A' }}</div>
        <div class="form-label">Mã nhóm:</div>
        <div class="form-value">{{ chiphiTratruocData.ma_nhom || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Mã tài sản:</div>
        <div class="form-value">{{ chiphiTratruocData.ma_taisan || 'N/A' }}</div>
        <div class="form-label">Đơn vị tính:</div>
        <div class="form-value">{{ chiphiTratruocData.dvt || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Tên tài sản:</div>
        <div class="form-value" style="grid-column: span 3;">{{ chiphiTratruocData.ten_taisan || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Ngày lập thẻ:</div>
        <div class="form-value">{{ formatDate(chiphiTratruocData.ngaylap_the) }}</div>
        <div class="form-label">Mã đơn vị quản lý:</div>
        <div class="form-value">{{ chiphiTratruocData.donvi_quanly || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Tên đơn vị quản lý:</div>
        <div class="form-value" style="grid-column: span 3;">{{ chiphiTratruocData.ten_donvi_quanly || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Nguồn vốn:</div>
        <div class="form-value">{{ chiphiTratruocData.nguonvon || 'N/A' }}</div>
      </div>

      <!-- Thông tin kế toán -->
      <div class="section-title">Thông tin kế toán</div>
      <div class="form-row">
        <div class="form-label">Số lượng đầu kỳ:</div>
        <div class="form-value amount">{{ formatNumber(chiphiTratruocData.soluong_dauky) }}</div>
        <div class="form-label">Đơn giá:</div>
        <div class="form-value amount">{{ formatCurrency(chiphiTratruocData.dongia) }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Nguyên giá:</div>
        <div class="form-value amount">{{ formatCurrency(chiphiTratruocData.nguyengia) }}</div>
        <div class="form-label">Hao mòn lũy kế:</div>
        <div class="form-value amount">{{ formatCurrency(chiphiTratruocData.haomon_luyke) }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Giá trị còn lại:</div>
        <div class="form-value amount">{{ formatCurrency(chiphiTratruocData.giatri_conlai) }}</div>
        <div class="form-label">Số tháng phân bổ:</div>
        <div class="form-value amount">{{ formatNumber(chiphiTratruocData.so_thang_phan_bo) }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Kỳ phân bổ:</div>
        <div class="form-value">{{ chiphiTratruocData.ky_phanbo || 'N/A' }}</div>
        <div class="form-label">Số tháng phân bổ:</div>
        <div class="form-value amount">{{ formatNumber(chiphiTratruocData.sothang_phanbo) }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">TK phân bổ:</div>
        <div class="form-value">{{ chiphiTratruocData.taikhoan_phanbo || 'N/A' }}</div>
        <div class="form-label">Mã kho CT:</div>
        <div class="form-value">{{ chiphiTratruocData.ma_kho_ct || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Mã nhóm CT:</div>
        <div class="form-value">{{ chiphiTratruocData.ma_nhom_ct || 'N/A' }}</div>
        <div class="form-label">Chi tiết TK phân bổ:</div>
        <div class="form-value">{{ chiphiTratruocData.chitiet_taikhoan_phanbo || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Công đoạn sản xuất:</div>
        <div class="form-value">{{ chiphiTratruocData.congdoan_sanxuat || 'N/A' }}</div>
      </div>

      <!-- Trạng thái và ngày tạo/cập nhật -->
      <div class="section-title">Trạng thái</div>
      <div class="form-row">
        <div class="form-label">Trạng thái:</div>
        <div class="form-value">
          <el-tag :type="chiphiTratruocData.trang_thai === 1 ? 'success' : 'danger'">
            {{ chiphiTratruocData.trang_thai === 1 ? 'Hoạt động' : 'Vô hiệu hóa' }}
          </el-tag>
        </div>
        <div class="form-label">Ngày tạo:</div>
        <div class="form-value">{{ formatDate(chiphiTratruocData.created_at) }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Ngày cập nhật:</div>
        <div class="form-value">{{ formatDate(chiphiTratruocData.updated_at) }}</div>
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
  name: 'ChiphiTratruocDetail',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    chiphiTratruocData: {
      type: Object,
      default: () => ({})
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
      if (value === null || value === undefined) return '0';
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
      this.$emit('update:visible', false);
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.chiphi-tratruoc-detail-form {
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