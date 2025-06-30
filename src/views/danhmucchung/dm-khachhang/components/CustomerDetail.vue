<template>
  <el-dialog
    title="Chi tiết khách hàng"
    :visible.sync="dialogVisible"
    width="1000px"
    :before-close="handleClose"
  >
    <div class="customer-detail-form">
      <!-- Thông tin chung -->
      <div class="section-title">Thông tin chung</div>
      <div class="form-row">
        <div class="form-label">ID:</div>
        <div class="form-value">{{ customerData.id || '-' }}</div>
        <div class="form-label">MST:</div>
        <div class="form-value">{{ customerData.mst || '-' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">MST KH NCC:</div>
        <div class="form-value">{{ customerData.mst_kh_ncc || '-' }}</div>
        <div class="form-label">Tên công ty:</div>
        <div class="form-value">{{ customerData.ten_congty || '-' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Địa chỉ:</div>
        <div class="form-value" style="grid-column: span 3;">{{ customerData.dia_chi || '-' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Huyện:</div>
        <div class="form-value">{{ customerData.huyen || '-' }}</div>
        <div class="form-label">Tỉnh:</div>
        <div class="form-value">{{ customerData.tinh || '-' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Điện thoại:</div>
        <div class="form-value">{{ customerData.dien_thoai || '-' }}</div>
      </div>

      <!-- Thông tin tài chính -->
      <div class="section-title">Thông tin tài chính</div>
      <div class="form-row">
        <div class="form-label">Dư nợ:</div>
        <div class="form-value amount">{{ formatCurrency(customerData.du_no) }}</div>
        <div class="form-label">Dư có:</div>
        <div class="form-value amount">{{ formatCurrency(customerData.du_co) }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Tài khoản:</div>
        <div class="form-value">{{ customerData.tai_khoan || '-' }}</div>
        <div class="form-label">Ngân hàng:</div>
        <div class="form-value">{{ customerData.ngan_hang || '-' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Cấp:</div>
        <div class="form-value">{{ formatNumber(customerData.cap) }}</div>
      </div>

      <!-- Thông tin liên hệ -->
      <div class="section-title">Thông tin liên hệ</div>
      <div class="form-row">
        <div class="form-label">Tên giám đốc:</div>
        <div class="form-value">{{ customerData.ten_giamdoc || '-' }}</div>
        <div class="form-label">Tên kế toán:</div>
        <div class="form-value">{{ customerData.ten_ketoan || '-' }}</div>
      </div>

      <!-- Thông tin khác -->
      <div class="section-title">Thông tin khác</div>
      <div class="form-row">
        <div class="form-label">Lĩnh vực KD:</div>
        <div class="form-value" style="grid-column: span 3;">{{ customerData.linh_vuc_kd || '-' }}</div>
      </div>
      <div class="form-row">
        <div class="form-label">Khách hàng:</div>
        <div class="form-value">
          <el-tag :type="customerData.khach_hang ? 'success' : 'info'" size="small">
            {{ customerData.khach_hang ? 'Có' : 'Không' }}
          </el-tag>
        </div>
        <div class="form-label">Nhà cung cấp:</div>
        <div class="form-value">
          <el-tag :type="customerData.nha_cungcap ? 'success' : 'info'" size="small">
            {{ customerData.nha_cungcap ? 'Có' : 'Không' }}
          </el-tag>
        </div>
      </div>
      <div class="form-row">
        <div class="form-label">Trạng thái:</div>
        <div class="form-value">
          <el-tag :type="customerData.trang_thai === 1 ? 'success' : 'danger'" size="small">
            {{ customerData.trang_thai === 1 ? 'Hoạt động' : 'Vô hiệu' }}
          </el-tag>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Đóng</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CustomerDetail',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    customerData: {
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
    formatNumber(value) {
      if (value === null || value === undefined) return '-';
      return new Intl.NumberFormat('vi-VN').format(value);
    },
    formatCurrency(value) {
      if (value === null || value === undefined) return '-';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(value);
    },
    handleClose() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.customer-detail-form {
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
.dialog-footer {
  text-align: right;
}
</style> 