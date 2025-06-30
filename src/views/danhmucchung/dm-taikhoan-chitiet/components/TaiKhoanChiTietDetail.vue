<template>
  <el-dialog
    title="Chi tiết tài khoản chi tiết"
    :visible.sync="dialogVisible"
    width="600px"
    :before-close="handleClose"
  >
    <div v-if="accountData" class="account-detail">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="MST">
          {{ accountData.mst || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Số hiệu TK">
          {{ accountData.sohieutk || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Mã chi tiết">
          {{ accountData.ma_chitiet || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Tên chi tiết">
          {{ accountData.ten_chitiet || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Dư nợ đầu kỳ">
          <span class="amount debit">{{ formatCurrency(accountData.du_no_dau_ky) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="Dư có đầu kỳ">
          <span class="amount credit">{{ formatCurrency(accountData.du_co_dau_ky) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="Sử dụng">
          <el-tag :type="accountData.su_dung ? 'success' : 'info'">
            {{ accountData.su_dung ? 'Có' : 'Không' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Ngày tạo" v-if="accountData.created_at">
          {{ formatDate(accountData.created_at) }}
        </el-descriptions-item>
        <el-descriptions-item label="Ngày cập nhật" v-if="accountData.updated_at">
          {{ formatDate(accountData.updated_at) }}
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
  name: 'TaiKhoanChiTietDetail',
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
.account-detail {
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
.el-descriptions-item__label {
  font-weight: 600;
  color: #606266;
}
.el-descriptions-item__content {
  color: #303133;
}
</style> 