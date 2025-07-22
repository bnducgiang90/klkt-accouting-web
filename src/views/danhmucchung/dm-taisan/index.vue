<template>
  <div class="taisan-container">
    <el-card>
      <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center; justify-content: space-between;">
        <div style="display: flex; gap: 10px; align-items: center;">
          <el-input
            v-model="searchQuery"
            placeholder="Nhập MST, số hiệu TK hoặc tên tài sản để tìm kiếm"
            clearable
            style="width: 400px;"
            @keyup.enter.native="handleSearch"
          />
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>
        </div>
        <el-button type="success" icon="el-icon-plus" @click="openCreateDialog">Thêm mới</el-button>
      </div>
      <el-table
        :data="assets"
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
        <el-table-column prop="mst" label="MST" width="120" v-if="false"/>
        <el-table-column prop="sohieutk" label="Số hiệu TK" width="120" />
        <el-table-column prop="ma_kho" label="Mã kho" width="100" />
        <el-table-column prop="ma_nhom" label="Mã nhóm" width="100" />
        <el-table-column prop="ma_taisan" label="Mã tài sản" width="120" />
        <el-table-column prop="ten_taisan" label="Tên tài sản" min-width="200" />
        <el-table-column prop="dvt" label="Đơn vị tính" width="100" />
        <el-table-column prop="so_the" label="Số thẻ" width="120" />
        <el-table-column prop="ngaylap_the" label="Ngày lập thẻ" width="120">
          <template slot-scope="scope">
            {{ formatDate(scope.row.ngaylap_the) }}
          </template>
        </el-table-column>
        <el-table-column prop="hang_taisan" label="Hãng tài sản" width="120" />
        <el-table-column prop="congsuat_thietke" label="Công suất thiết kế" width="140" />
        <el-table-column prop="nuoc_sanxuat" label="Nước sản xuất" width="120" />
        <el-table-column prop="nam_sanxuat" label="Năm sản xuất" width="120" align="center">
          <template slot-scope="scope">
            {{ formatNumber(scope.row.nam_sanxuat) }}
          </template>
        </el-table-column>
        <el-table-column prop="trang_thai" label="Trạng thái" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.trang_thai === 1 ? 'success' : 'danger'">
              {{ scope.row.trang_thai === 1 ? 'Hoạt động' : 'Vô hiệu' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="donvi_quanly" label="Mã đơn vị quản lý" width="140" />
        <el-table-column prop="ten_donvi_quanly" label="Tên đơn vị quản lý" min-width="150" />
        <el-table-column prop="nguonvon" label="Nguồn vốn" width="120" />
        <el-table-column prop="so_bienban_bangiao" label="Số biên bản bàn giao" width="150" />
        <el-table-column prop="ngay_bienban_bangiao" label="Ngày biên bản bàn giao" width="150">
          <template slot-scope="scope">
            {{ formatDate(scope.row.ngay_bienban_bangiao) }}
          </template>
        </el-table-column>
        <el-table-column prop="ngay_dieuchinh" label="Ngày điều chỉnh" width="120">
          <template slot-scope="scope">
            {{ formatDate(scope.row.ngay_dieuchinh) }}
          </template>
        </el-table-column>
        <el-table-column prop="lydo_dieuchinh" label="Lý do điều chỉnh" width="140" />
        <el-table-column prop="soluong_dauky" label="Số lượng đầu kỳ" width="130" align="right">
          <template slot-scope="scope">
            {{ formatNumber(scope.row.soluong_dauky) }}
          </template>
        </el-table-column>
        <el-table-column prop="nguyengia" label="Nguyên giá" width="120" align="right">
          <template slot-scope="scope">
            {{ formatCurrency(scope.row.nguyengia) }}
          </template>
        </el-table-column>
        <el-table-column prop="haomon_luyke" label="Hao mòn lũy kế" width="140" align="right">
          <template slot-scope="scope">
            {{ formatCurrency(scope.row.haomon_luyke) }}
          </template>
        </el-table-column>
        <el-table-column prop="giatri_conlai" label="Giá trị còn lại" width="130" align="right">
          <template slot-scope="scope">
            {{ formatCurrency(scope.row.giatri_conlai) }}
          </template>
        </el-table-column>
        <el-table-column prop="so_nam_phanbo" label="Số năm phân bổ" width="130" align="center">
          <template slot-scope="scope">
            {{ formatNumber(scope.row.so_nam_phanbo) }}
          </template>
        </el-table-column>
        <el-table-column prop="ky_phanbo" label="Kỳ phân bổ" width="100" />
        <el-table-column prop="sothang_phanbo" label="Số tháng phân bổ" width="140" align="center">
          <template slot-scope="scope">
            {{ formatNumber(scope.row.sothang_phanbo) }}
          </template>
        </el-table-column>
        <el-table-column prop="taikhoan_phanbo" label="TK phân bổ" width="120" />
        <el-table-column prop="ma_kho_ct" label="Mã kho CT" width="100" />
        <el-table-column prop="ma_nhom_ct" label="Mã nhóm CT" width="100" />
        <el-table-column prop="chitiet_taikhoan_phanbo" label="Chi tiết TK phân bổ" width="150" />
        <el-table-column prop="congdoan_sanxuat" label="Công đoạn sản xuất" width="150" />
        <!-- Cột hành động -->
        <el-table-column align="center" label="Action" width="280" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              icon="el-icon-info"
              @click="openDetailDialog(scope.row)"
            >Detail</el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="openEditDialog(scope.row)"
            >Edit</el-button>
            <el-button
              :type="scope.row.trang_thai === 1 ? 'danger' : 'warning'"
              size="small"
              :icon="scope.row.trang_thai === 1 ? 'el-icon-delete' : 'el-icon-check'"
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
    <AssetForm
      :visible.sync="formDialog.visible"
      :is-edit="formDialog.isEdit"
      :asset-data="formDialog.assetData"
      @success="handleFormSuccess"
      @close="handleFormClose"
    />
    <AssetDetail
      :visible.sync="detailDialog.visible"
      :asset-data="detailDialog.assetData"
      @close="handleDetailClose"
    />
  </div>
</template>

<script>
import service from '@/utils/request';
import AssetForm from './components/AssetForm.vue';
import AssetDetail from './components/AssetDetail.vue';
const baseUrl = process.env.VUE_APP_KLKT_APP_BASE_API;

export default {
  name: 'DmTaiSanList',
  components: {
    AssetForm,
    AssetDetail
  },
  data() {
    return {
      searchQuery: '',
      assets: [],
      loading: false,
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      formDialog: {
        visible: false,
        isEdit: false,
        assetData: {}
      },
      detailDialog: {
        visible: false,
        assetData: {}
      }
    };
  },
  methods: {
    async fetchAssets() {
      this.loading = true;
      try {
        const payload = {
          table_code: 'tbldmtaisan',
          mst: this.searchQuery || undefined,
          sohieutk: this.searchQuery || undefined,
          ten_taisan: this.searchQuery || undefined,
          page: this.pagination.page,
          pageSize: this.pagination.pageSize,
        };
        const res = await service.post(`${baseUrl}/dm/search`, payload);
        console.log('API result:', res);
        this.assets = (res.data.items || []);
        this.pagination.total = res.data.total || 0;
      } catch (e) {
        console.error('Error fetching data:', e);
        this.assets = [];
        this.pagination.total = 0;
        this.$message.error('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        this.loading = false;
      }
    },
    handleSearch() {
      this.pagination.page = 1;
      this.fetchAssets();
    },
    handlePageChange(page) {
      this.pagination.page = page;
      this.fetchAssets();
    },
    indexMethod(index) {
      return (this.pagination.page - 1) * this.pagination.pageSize + index + 1;
    },
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString('vi-VN');
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
    openCreateDialog() {
      this.formDialog = {
        visible: true,
        isEdit: false,
        assetData: {}
      };
    },
    openEditDialog(row) {
      this.formDialog = {
        visible: true,
        isEdit: true,
        assetData: { ...row }
      };
    },
    openDetailDialog(row) {
      this.detailDialog = {
        visible: true,
        assetData: { ...row }
      };
    },
    handleFormSuccess() {
      this.fetchAssets();
      this.formDialog.visible = false;
    },
    handleFormClose() {
      this.formDialog.visible = false;
    },
    handleDetailClose() {
      this.detailDialog.visible = false;
    },
    async handleDisable(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn vô hiệu hóa tài khoản chi tiết "${row.ma_nhom}" (${row.ma_taisan})?`,
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
          table_code: 'tbldmtaisan',
          mst: row.mst,
          sohieutk: row.sohieutk,
          ma_kho: row.ma_kho,
          ma_nhom: row.ma_nhom,
          ma_taisan: row.ma_taisan,
          trang_thai: 0
        };
        await service.post(`${baseUrl}/dm/update-status`, payload);
        this.$message.success('Vô hiệu tài sản thành công');
        this.fetchAssets();
      } catch (error) {
        if (error !== 'cancel') {
          console.error('Error disabling account detail:', error);
          this.$message.error('Có lỗi xảy ra khi vô hiệu hóa tài sản');
        }
      } finally {
        this.loading = false;
      }
    },
    async handleEnable(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn kích hoạt tài sản "${row.ma_nhom}" (${row.ma_taisan})?`,
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
          table_code: 'tbldmtaisan',
          mst: row.mst,
          sohieutk: row.sohieutk,
          ma_kho: row.ma_kho,
          ma_nhom: row.ma_nhom,
          ma_taisan: row.ma_taisan,
          trang_thai: 1
        };
        await service.post(`${baseUrl}/dm/update-status`, payload);
        this.$message.success('Kích hoạt tài sản thành công');
        this.fetchAssets();
      } catch (error) {
        if (error !== 'cancel') {
          console.error('Error enabling account detail:', error);
          this.$message.error('Có lỗi xảy ra khi kích hoạt tài sản');
        }
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.fetchAssets();
  },
};
</script>

<style scoped>
.taisan-container {
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
  .taisan-container {
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