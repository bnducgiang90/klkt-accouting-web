<template>
  <el-dialog
    title="Chi tiết nhà cung cấp"
    :visible.sync="dialogVisible"
    width="700px"
    :before-close="handleClose"
  >
    <div v-if="supplierData" class="supplier-detail">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="MST">
          {{ supplierData.mst || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="MST KH NCC">
          {{ supplierData.mst_kh_ncc || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Tên công ty" :span="2">
          {{ supplierData.ten_congty || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Dư nợ">
          <span class="amount debit">{{ formatCurrency(supplierData.du_no) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="Dư có">
          <span class="amount credit">{{ formatCurrency(supplierData.du_co) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="Địa chỉ" :span="2">
          {{ supplierData.dia_chi || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Huyện">
          {{ supplierData.huyen || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Tỉnh">
          {{ supplierData.tinh || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Điện thoại">
          {{ supplierData.dien_thoai || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Tên giám đốc">
          {{ supplierData.ten_giamdoc || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Tên kế toán">
          {{ supplierData.ten_ketoan || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Lĩnh vực KD" :span="2">
          {{ supplierData.linh_vuc_kd || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Khách hàng">
          <el-tag :type="supplierData.khach_hang ? 'success' : 'info'">
            {{ supplierData.khach_hang ? 'Có' : 'Không' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Nhà cung cấp">
          <el-tag :type="supplierData.nha_cungcap ? 'success' : 'info'">
            {{ supplierData.nha_cungcap ? 'Có' : 'Không' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Tài khoản">
          {{ supplierData.tai_khoan || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Ngân hàng">
          {{ supplierData.ngan_hang || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Cấp">
          {{ supplierData.cap || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Ngày tạo" v-if="supplierData.created_at">
          {{ formatDate(supplierData.created_at) }}
        </el-descriptions-item>
        <el-descriptions-item label="Ngày cập nhật" v-if="supplierData.updated_at">
          {{ formatDate(supplierData.updated_at) }}
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
.supplier-detail {
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