<template>
  <el-dialog
    title="Chi tiết vật tư"
    :visible.sync="dialogVisible"
    width="700px"
    :before-close="handleClose"
  >
    <div v-if="materialData" class="material-detail">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="MST">
          {{ materialData.mst || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Số hiệu TK">
          {{ materialData.sohieutk || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Mã kho">
          {{ materialData.ma_kho || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Mã nhóm">
          {{ materialData.ma_nhom || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Mã vật tư">
          {{ materialData.ma_vattu || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Tên vật tư">
          {{ materialData.ten_vattu || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Đơn vị tính">
          {{ materialData.dvt || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Năm">
          {{ materialData.nam || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Lượng đầu kỳ">
          <span class="amount">{{ formatNumber(materialData.luong_dau_ky) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="Giá trị đầu kỳ">
          <span class="amount">{{ formatCurrency(materialData.gia_tri_dau_ky) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="Hệ số quy đổi">
          {{ formatNumber(materialData.he_so_quy_doi) }}
        </el-descriptions-item>
        <el-descriptions-item label="Mã đơn vị quy đổi">
          {{ materialData.ma_don_vi_quy_doi || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Vị trí lưu trữ" :span="2">
          {{ materialData.vi_tri_luu_tru || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Ghi chú" :span="2">
          {{ materialData.ghi_chu || 'Không có ghi chú' }}
        </el-descriptions-item>
        <el-descriptions-item label="Trạng thái" :span="2">
          <el-tag :type="materialData.trang_thai === 1 ? 'success' : 'danger'">
            {{ materialData.trang_thai === 1 ? 'Hoạt động' : 'Vô hiệu hóa' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Ngày tạo" v-if="materialData.created_at">
          {{ formatDate(materialData.created_at) }}
        </el-descriptions-item>
        <el-descriptions-item label="Ngày cập nhật" v-if="materialData.updated_at">
          {{ formatDate(materialData.updated_at) }}
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
.material-detail {
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
</style> 