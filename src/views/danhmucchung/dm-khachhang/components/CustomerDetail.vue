<template>
  <el-dialog
    title="Chi tiết khách hàng"
    :visible.sync="dialogVisible"
    width="800px"
    :before-close="handleClose"
  >
    <div class="customer-detail">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="ID">
          {{ customerData.id || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="MST">
          {{ customerData.mst || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="MST KH NCC">
          {{ customerData.mst_kh_ncc || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="Tên công ty">
          {{ customerData.ten_congty || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="Dư nợ">
          {{ formatCurrency(customerData.du_no) }}
        </el-descriptions-item>
        <el-descriptions-item label="Dư có">
          {{ formatCurrency(customerData.du_co) }}
        </el-descriptions-item>
        <el-descriptions-item label="Địa chỉ" :span="2">
          {{ customerData.dia_chi || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="Huyện">
          {{ customerData.huyen || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="Tỉnh">
          {{ customerData.tinh || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="Điện thoại">
          {{ customerData.dien_thoai || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="Tên giám đốc">
          {{ customerData.ten_giamdoc || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="Tên kế toán">
          {{ customerData.ten_ketoan || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="Lĩnh vực KD" :span="2">
          {{ customerData.linh_vuc_kd || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="Khách hàng">
          <el-tag :type="customerData.khach_hang ? 'success' : 'info'" size="small">
            {{ customerData.khach_hang ? 'Có' : 'Không' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Nhà cung cấp">
          <el-tag :type="customerData.nha_cungcap ? 'success' : 'info'" size="small">
            {{ customerData.nha_cungcap ? 'Có' : 'Không' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Tài khoản">
          {{ customerData.tai_khoan || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="Ngân hàng">
          {{ customerData.ngan_hang || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="Cấp">
          {{ formatNumber(customerData.cap) }}
        </el-descriptions-item>
        <el-descriptions-item label="Trạng thái">
          <el-tag :type="customerData.trang_thai === 1 ? 'success' : 'danger'" size="small">
            {{ customerData.trang_thai === 1 ? 'Hoạt động' : 'Vô hiệu' }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
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
.customer-detail {
  padding: 10px 0;
}

.dialog-footer {
  text-align: right;
}

.el-descriptions {
  margin-bottom: 20px;
}

.el-descriptions-item__label {
  font-weight: 600;
  color: #606266;
}
</style> 