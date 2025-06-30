<template>
  <div class="vattu-hanghoa-container">
    <el-card>
      <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center; justify-content: space-between;">
        <div style="display: flex; gap: 10px; align-items: center;">
          <el-input
            v-model="searchQuery"
            placeholder="Nhập MST, số hiệu TK hoặc tên vật tư để tìm kiếm"
            clearable
            style="width: 400px;"
            @keyup.enter.native="handleSearch"
          />
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">Tìm kiếm</el-button>
        </div>
        <el-button type="success" icon="el-icon-plus" @click="openDialog('create')">
          Thêm mới
        </el-button>
      </div>
      <el-table
        :data="materials"
        border
        style="width: 100%"
        v-loading="loading"
        empty-text="Không có dữ liệu"
        max-height="600"
      >
        <el-table-column
          label="STT"
          type="index"
          width="60"
          :index="indexMethod"
          align="center"
        />
        <el-table-column prop="mst" label="MST" width="120" />
        <el-table-column prop="sohieutk" label="Số hiệu TK" width="120" />
        <el-table-column prop="ma_kho" label="Mã kho" width="100" />
        <el-table-column prop="ma_nhom" label="Mã nhóm" width="100" />
        <el-table-column prop="ma_vattu" label="Mã vật tư" width="120" />
        <el-table-column prop="ten_vattu" label="Tên vật tư" min-width="200" />
        <el-table-column prop="dvt" label="Đơn vị tính" width="100" />
        <el-table-column prop="luong_dau_ky" label="Lượng đầu kỳ" width="120" align="right">
          <template slot-scope="scope">
            {{ formatNumber(scope.row.luong_dau_ky) }}
          </template>
        </el-table-column>
        <el-table-column prop="gia_tri_dau_ky" label="Giá trị đầu kỳ" width="130" align="right">
          <template slot-scope="scope">
            {{ formatCurrency(scope.row.gia_tri_dau_ky) }}
          </template>
        </el-table-column>
        <el-table-column prop="he_so_quy_doi" label="Hệ số quy đổi" width="120" align="right">
          <template slot-scope="scope">
            {{ formatNumber(scope.row.he_so_quy_doi) }}
          </template>
        </el-table-column>
        <el-table-column prop="ma_don_vi_quy_doi" label="Mã đơn vị quy đổi" width="140" />
        <el-table-column prop="vi_tri_luu_tru" label="Vị trí lưu trữ" min-width="150" />
        <el-table-column prop="nam" label="Năm" width="80" align="center">
          <template slot-scope="scope">
            {{ formatNumber(scope.row.nam) }}
          </template>
        </el-table-column>
        <el-table-column prop="trang_thai" label="Trạng thái" width="120" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.trang_thai === 1 ? 'success' : 'danger'">
              {{ scope.row.trang_thai === 1 ? 'Hoạt động' : 'Vô hiệu hóa' }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- Cột hành động -->
        <el-table-column align="center" label="Action" width="280" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              class="el-icon-info"
              @click="onDetail(scope.row)"
            >Detail</el-button>
            <el-button
              type="primary"
              size="small"
              class="el-icon-edit"
              @click="openDialog('update', scope.row)"
            >Edit</el-button>
            <el-button
              :type="scope.row.trang_thai === 1 ? 'danger' : 'warning'"
              size="small"
              :class="scope.row.trang_thai === 1 ? 'el-icon-delete' : 'el-icon-check'"
              @click="scope.row.trang_thai === 1 ? handleDisable(scope.row) : handleEnable(scope.row)"
            >{{ scope.row.trang_thai === 1 ? 'Disable' : 'Enable' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px; text-align: right;">
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          :current-page="pagination.page"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>
    <!-- Popup components -->
    <MaterialForm
      :visible.sync="dialogVisible"
      :is-edit="dialogType === 'update'"
      :material-data="selectedMaterial"
      v-if="dialogType === 'create' || dialogType === 'update'"
      @success="onFormSuccess"
      @close="closeDialog"
    />
    <MaterialDetail
      :visible.sync="detailVisible"
      :material-data="selectedMaterial"
      @close="closeDetail"
    />
  </div>
</template>

<script>
import service from '@/utils/request';
const baseUrl = process.env.VUE_APP_KLKT_APP_BASE_API;
// Import popup components (to be created)
import MaterialForm from './components/MaterialForm.vue';
import MaterialDetail from './components/MaterialDetail.vue';

export default {
  name: 'DmVatTuHangHoaList',
  components: {
    MaterialForm,
    MaterialDetail,
  },
  data() {
    return {
      searchQuery: '',
      materials: [],
      loading: false,
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      dialogVisible: false,
      dialogType: '', // 'create' | 'update'
      detailVisible: false,
      selectedMaterial: null,
    };
  },
  methods: {
    async fetchMaterials() {
      this.loading = true;
      try {
        const payload = {
          table_code: 'tbldmvattu_hanghoa',
          mst: this.searchQuery || undefined,
          sohieutk: this.searchQuery || undefined,
          ten_vattu: this.searchQuery || undefined,
          page: this.pagination.page,
          pageSize: this.pagination.pageSize,
        };
        const res = await service.post(`${baseUrl}/dm/search`, payload);
        console.log('API result:', res);
        this.materials = (res.data.items || []);
        this.pagination.total = res.data.total || 0;
      } catch (e) {
        console.error('Error fetching data:', e);
        this.materials = [];
        this.pagination.total = 0;
        this.$message.error('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        this.loading = false;
      }
    },
    handleSearch() {
      this.pagination.page = 1;
      this.fetchMaterials();
    },
    handlePageChange(page) {
      this.pagination.page = page;
      this.fetchMaterials();
    },
    indexMethod(index) {
      return (this.pagination.page - 1) * this.pagination.pageSize + index + 1;
    },
    formatNumber(value) {
      if (value === null || value === undefined) return '';
      return new Intl.NumberFormat('vi-VN').format(value);
    },
    formatCurrency(value) {
      if (value === null || value === undefined) return '';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(value);
    },
    onDetail(row) {
      this.selectedMaterial = row;
      this.detailVisible = true;
    },
    openDialog(type, record = {}) {
      this.dialogType = type;
      this.selectedMaterial = type === 'update' ? { ...record } : null;
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.selectedMaterial = null;
    },
    closeDetail() {
      this.detailVisible = false;
      this.selectedMaterial = null;
    },
    onFormSuccess() {
      this.closeDialog();
      this.fetchMaterials();
    },
    async handleDisable(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn vô hiệu hóa vật tư "${row.ten_vattu}" (${row.ma_vattu})?`,
          'Xác nhận vô hiệu hóa',
          {
            confirmButtonText: 'Vô hiệu hóa',
            cancelButtonText: 'Hủy',
            type: 'warning',
            confirmButtonClass: 'el-button--danger'
          }
        );
        this.loading = true;
        const payload = {
          table_code: 'tbldmvattu_hanghoa',
          mst: row.mst,
          sohieutk: row.sohieutk,
          ma_kho: row.ma_kho,
          ma_nhom: row.ma_nhom,
          ma_vattu: row.ma_vattu,
          trang_thai: 0
        };
        await service.post(`${baseUrl}/dm/update-status`, payload);
        this.$message.success('Vô hiệu hóa vật tư thành công');
        this.fetchMaterials();
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('Có lỗi xảy ra khi vô hiệu hóa vật tư');
        }
      } finally {
        this.loading = false;
      }
    },
    async handleEnable(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn kích hoạt vật tư "${row.ten_vattu}" (${row.ma_vattu})?`,
          'Xác nhận kích hoạt',
          {
            confirmButtonText: 'Kích hoạt',
            cancelButtonText: 'Hủy',
            type: 'warning',
            confirmButtonClass: 'el-button--success'
          }
        );
        this.loading = true;
        const payload = {
          table_code: 'tbldmvattu_hanghoa',
          mst: row.mst,
          sohieutk: row.sohieutk,
          ma_kho: row.ma_kho,
          ma_nhom: row.ma_nhom,
          ma_vattu: row.ma_vattu,
          trang_thai: 1
        };
        await service.post(`${baseUrl}/dm/update-status`, payload);
        this.$message.success('Kích hoạt vật tư thành công');
        this.fetchMaterials();
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('Có lỗi xảy ra khi kích hoạt vật tư');
        }
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.fetchMaterials();
  },
};
</script>

<style scoped>
.vattu-hanghoa-container {
  padding: 24px;
}

.el-table {
  font-size: 12px;
}

.el-table .cell {
  padding: 8px 0;
}

/* Ensure pagination is visible at 100% zoom */
.el-pagination {
  margin-top: 20px;
  padding: 10px 0;
  background-color: #fff;
  border-top: 1px solid #ebeef5;
}

.el-pagination .el-pager li {
  margin: 0 2px;
}

.el-pagination .btn-prev,
.el-pagination .btn-next {
  margin: 0 5px;
}

/* Responsive adjustments for better visibility */
@media screen and (max-width: 1200px) {
  .vattu-hanghoa-container {
    padding: 16px;
  }
  
  .el-table {
    font-size: 11px;
  }
  
  .el-table .cell {
    padding: 6px 0;
  }
}
</style> 