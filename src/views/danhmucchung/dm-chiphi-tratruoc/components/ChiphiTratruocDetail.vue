<template>
  <el-dialog
    title="Chi tiết chi phí trả trước"
    :visible.sync="visible"
    width="800px"
    :before-close="handleClose"
  >
    <div v-if="chiphiTratruocData" class="chiphi-tratruoc-detail">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="MST">
          {{ chiphiTratruocData.mst || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Số hiệu TK">
          {{ chiphiTratruocData.sohieutk || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Mã kho">
          {{ chiphiTratruocData.ma_kho || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Mã nhóm">
          {{ chiphiTratruocData.ma_nhom || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Mã tài sản">
          {{ chiphiTratruocData.ma_taisan || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Đơn vị tính">
          {{ chiphiTratruocData.dvt || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Tên tài sản" :span="2">
          {{ chiphiTratruocData.ten_taisan || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Ngày lập thẻ">
          {{ formatDate(chiphiTratruocData.ngaylap_the) }}
        </el-descriptions-item>
        <el-descriptions-item label="Mã đơn vị quản lý">
          {{ chiphiTratruocData.donvi_quanly || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Tên đơn vị quản lý" :span="2">
          {{ chiphiTratruocData.ten_donvi_quanly || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Nguồn vốn">
          {{ chiphiTratruocData.nguonvon || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Số lượng đầu kỳ">
          <span class="amount">{{ formatNumber(chiphiTratruocData.soluong_dauky) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="Đơn giá">
          <span class="amount">{{ formatCurrency(chiphiTratruocData.dongia) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="Nguyên giá">
          <span class="amount">{{ formatCurrency(chiphiTratruocData.nguyengia) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="Hao mòn lũy kế">
          <span class="amount">{{ formatCurrency(chiphiTratruocData.haomon_luyke) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="Giá trị còn lại">
          <span class="amount">{{ formatCurrency(chiphiTratruocData.giatri_conlai) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="Số tháng phân bổ">
          <span class="amount">{{ formatNumber(chiphiTratruocData.so_thang_phan_bo) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="Kỳ phân bổ">
          {{ chiphiTratruocData.ky_phanbo || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Số tháng phân bổ">
          <span class="amount">{{ formatNumber(chiphiTratruocData.sothang_phanbo) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="TK phân bổ">
          {{ chiphiTratruocData.taikhoan_phanbo || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Mã kho CT">
          {{ chiphiTratruocData.ma_kho_ct || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Mã nhóm CT">
          {{ chiphiTratruocData.ma_nhom_ct || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Chi tiết TK phân bổ">
          {{ chiphiTratruocData.chitiet_taikhoan_phanbo || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Công đoạn sản xuất">
          {{ chiphiTratruocData.congdoan_sanxuat || 'N/A' }}
        </el-descriptions-item>
        <el-descriptions-item label="Trạng thái" :span="2">
          <el-tag :type="chiphiTratruocData.trang_thai === 1 ? 'success' : 'danger'">
            {{ chiphiTratruocData.trang_thai === 1 ? 'Hoạt động' : 'Vô hiệu hóa' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Ngày tạo" v-if="chiphiTratruocData.created_at">
          {{ formatDate(chiphiTratruocData.created_at) }}
        </el-descriptions-item>
        <el-descriptions-item label="Ngày cập nhật" v-if="chiphiTratruocData.updated_at">
          {{ formatDate(chiphiTratruocData.updated_at) }}
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
.chiphi-tratruoc-detail {
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
  color: #409eff;
}

.el-descriptions-item__label {
  font-weight: 600;
  color: #606266;
}

.el-descriptions-item__content {
  color: #303133;
}
</style> 