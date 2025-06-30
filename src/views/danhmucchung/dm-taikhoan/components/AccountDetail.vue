<template>
  <el-dialog
    title="Chi tiết tài khoản"
    :visible.sync="dialogVisible"
    width="1000px"
    :before-close="handleClose"
  >
    <div v-if="accountData" class="account-detail-form">
      <!-- Thông tin chung -->
      <div class="section-title">Thông tin chung</div>
      <div class="form-row">
        <div class="form-label">MST:</div>
        <div class="form-value">{{ accountData.mst || 'N/A' }}</div>
        <div class="form-label">Số hiệu TK:</div>
        <div class="form-value">{{ accountData.sohieutk || 'N/A' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Tên tài khoản:</div>
        <div class="form-value" style="grid-column: span 3;">{{ accountData.ten_tk || 'N/A' }}</div>
      </div>

      <!-- Số dư đầu kỳ -->
      <div class="section-title">Số dư đầu kỳ</div>
      <div class="form-row">
        <div class="form-label">Dư nợ đầu kỳ:</div>
        <div class="form-value amount debit">{{ formatCurrency(accountData.du_no_dau_ky) }}</div>
        <div class="form-label">Dư có đầu kỳ:</div>
        <div class="form-value amount credit">{{ formatCurrency(accountData.du_co_dau_ky) }}</div>
      </div>

      <!-- Thông tin khác -->
      <div class="section-title">Thông tin khác</div>
      <div class="form-row">
        <div class="form-label">Ghi chú:</div>
        <div class="form-value" style="grid-column: span 3;">{{ accountData.ghi_chu || 'Không có ghi chú' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Trạng thái:</div>
        <div class="form-value">
          <el-tag :type="accountData.trang_thai === 1 ? 'success' : 'danger'">
            {{ accountData.trang_thai === 1 ? 'Hoạt động' : 'Vô hiệu hóa' }}
          </el-tag>
        </div>
        <div class="form-label">Ngày tạo:</div>
        <div class="form-value">{{ formatDate(accountData.created_at) }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Ngày cập nhật:</div>
        <div class="form-value">{{ formatDate(accountData.updated_at) }}</div>
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
  name: 'AccountDetail',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    accountData: {
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
.account-detail-form {
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