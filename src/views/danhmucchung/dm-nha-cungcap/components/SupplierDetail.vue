<template>
  <el-dialog
    title="Chi tiết nhà cung cấp"
    :visible.sync="dialogVisible"
    width="1000px"
    :before-close="handleClose"
  >
    <div v-if="supplierData" class="supplier-detail-form">
      <!-- Thông tin chung -->
      <div class="section-title">Thông tin chung</div>
      <div class="form-row">
        <div class="form-label">MST:</div>
        <div class="form-value">{{ supplierData.mst || 'N/A' }}</div>
        <div class="form-label">MST KH NCC:</div>
        <div class="form-value">{{ supplierData.mst_kh_ncc || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Tên công ty:</div>
        <div class="form-value" style="grid-column: span 3;">{{ supplierData.ten_congty || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Địa chỉ:</div>
        <div class="form-value" style="grid-column: span 3;">{{ supplierData.dia_chi || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Huyện:</div>
        <div class="form-value">{{ supplierData.huyen || 'N/A' }}</div>
        <div class="form-label">Tỉnh:</div>
        <div class="form-value">{{ supplierData.tinh || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Điện thoại:</div>
        <div class="form-value">{{ supplierData.dien_thoai || 'N/A' }}</div>
      </div>

      <!-- Thông tin tài chính -->
      <div class="section-title">Thông tin tài chính</div>
      <div class="form-row">
        <div class="form-label">Dư nợ:</div>
        <div class="form-value amount debit">{{ formatCurrency(supplierData.du_no) }}</div>
        <div class="form-label">Dư có:</div>
        <div class="form-value amount credit">{{ formatCurrency(supplierData.du_co) }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Tài khoản:</div>
        <div class="form-value">{{ supplierData.tai_khoan || 'N/A' }}</div>
        <div class="form-label">Ngân hàng:</div>
        <div class="form-value">{{ supplierData.ngan_hang || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Cấp:</div>
        <div class="form-value">{{ supplierData.cap || 'N/A' }}</div>
      </div>

      <!-- Thông tin liên hệ -->
      <div class="section-title">Thông tin liên hệ</div>
      <div class="form-row">
        <div class="form-label">Tên giám đốc:</div>
        <div class="form-value">{{ supplierData.ten_giamdoc || 'N/A' }}</div>
        <div class="form-label">Tên kế toán:</div>
        <div class="form-value">{{ supplierData.ten_ketoan || 'N/A' }}</div>
      </div>

      <!-- Thông tin khác -->
      <div class="section-title">Thông tin khác</div>
      <div class="form-row">
        <div class="form-label">Lĩnh vực KD:</div>
        <div class="form-value" style="grid-column: span 3;">{{ supplierData.linh_vuc_kd || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Khách hàng:</div>
        <div class="form-value">
          <el-tag :type="supplierData.khach_hang ? 'success' : 'info'">
            {{ supplierData.khach_hang ? 'Có' : 'Không' }}
          </el-tag>
        </div>
        <div class="form-label">Nhà cung cấp:</div>
        <div class="form-value">
          <el-tag :type="supplierData.nha_cungcap ? 'success' : 'info'">
            {{ supplierData.nha_cungcap ? 'Có' : 'Không' }}
          </el-tag>
        </div>
      </div>
      <div class="form-row">
        <div class="form-label">Ngày tạo:</div>
        <div class="form-value">{{ formatDate(supplierData.created_at) }}</div>
        <div class="form-label">Ngày cập nhật:</div>
        <div class="form-value">{{ formatDate(supplierData.updated_at) }}</div>
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
  name: 'SupplierDetail',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    supplierData: {
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
.supplier-detail-form {
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
}
.amount.debit {
  color: #f56c6c;
}
.amount.credit {
  color: #67c23a;
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