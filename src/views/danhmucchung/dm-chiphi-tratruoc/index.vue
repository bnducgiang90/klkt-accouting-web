<template>
  <div class="chiphi-tratruoc-container">
    <el-card>
      <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center; justify-content: space-between;">
        <div style="display: flex; gap: 10px; align-items: center;">
          <el-input
            v-model="searchQuery"
            placeholder="Nhập MST, số hiệu TK, mã kho hoặc tên tài sản để tìm kiếm"
            clearable
            style="width: 400px;"
            @keyup.enter.native="handleSearch"
          />
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>
        </div>
        <el-button type="success" icon="el-icon-plus" @click="openCreateDialog">Thêm mới</el-button>
      </div>
      <el-table
        :data="chiphiTratruocList"
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
        <el-table-column prop="ngaylap_the" label="Ngày lập thẻ" width="120">
          <template slot-scope="scope">
            {{ formatDate(scope.row.ngaylap_the) }}
          </template>
        </el-table-column>
        <el-table-column prop="donvi_quanly" label="Mã đơn vị quản lý" width="140" />
        <el-table-column prop="ten_donvi_quanly" label="Tên đơn vị quản lý" min-width="150" />
        <el-table-column prop="nguonvon" label="Nguồn vốn" width="120" />
        <el-table-column prop="soluong_dauky" label="Số lượng đầu kỳ" width="130" align="right">
          <template slot-scope="scope">
            {{ formatNumber(scope.row.soluong_dauky) }}
          </template>
        </el-table-column>
        <el-table-column prop="dongia" label="Đơn giá" width="120" align="right">
          <template slot-scope="scope">
            {{ formatCurrency(scope.row.dongia) }}
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
        <el-table-column prop="so_thang_phan_bo" label="Số tháng phân bổ" width="140" align="center">
          <template slot-scope="scope">
            {{ formatNumber(scope.row.so_thang_phan_bo) }}
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
        <el-table-column prop="trang_thai" label="Trạng thái" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.trang_thai === 1 ? 'success' : 'danger'">
              {{ scope.row.trang_thai === 1 ? 'Hoạt động' : 'Vô hiệu' }}
            </el-tag>
          </template>
        </el-table-column>
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

    <!-- Chiphi Tratruoc Form Dialog -->
    <ChiphiTratruocForm
      :visible.sync="formDialog.visible"
      :is-edit="formDialog.isEdit"
      :chiphi-tratruoc-data="formDialog.chiphiTratruocData"
      @success="handleFormSuccess"
      @close="handleFormClose"
    />

    <!-- Chiphi Tratruoc Detail Dialog -->
    <ChiphiTratruocDetail
      :visible.sync="detailDialog.visible"
      :chiphi-tratruoc-data="detailDialog.chiphiTratruocData"
      @close="handleDetailClose"
    />
  </div>
</template>

<script>
import service from '@/utils/request';
import ChiphiTratruocForm from './components/ChiphiTratruocForm.vue';
import ChiphiTratruocDetail from './components/ChiphiTratruocDetail.vue';
const baseUrl = process.env.VUE_APP_KLKT_APP_BASE_API;

export default {
  name: 'DmChiphiTratruocList',
  components: {
    ChiphiTratruocForm,
    ChiphiTratruocDetail
  },
  data() {
    return {
      searchQuery: '',
      chiphiTratruocList: [],
      loading: false,
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      formDialog: {
        visible: false,
        isEdit: false,
        chiphiTratruocData: {}
      },
      detailDialog: {
        visible: false,
        chiphiTratruocData: {}
      }
    };
  },
  methods: {
    async fetchChiphiTratruoc() {
      this.loading = true;
      try {
        const payload = {
          table_code: 'tbldmchiphi_tratruoc',
          mst: this.searchQuery || undefined,
          sohieutk: this.searchQuery || undefined,
          ma_kho: this.searchQuery || undefined,
          ten_taisan: this.searchQuery || undefined,
          page: this.pagination.page,
          pageSize: this.pagination.pageSize,
        };
        const res = await service.post(`${baseUrl}/dm/search`, payload);
        console.log('API result:', res);
        this.chiphiTratruocList = (res.data.items || []);
        this.pagination.total = res.data.total || 0;
      } catch (e) {
        console.error('Error fetching data:', e);
        this.chiphiTratruocList = [];
        this.pagination.total = 0;
        this.$message.error('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        this.loading = false;
      }
    },
    
    handleSearch() {
      this.pagination.page = 1;
      this.fetchChiphiTratruoc();
    },
    
    handlePageChange(page) {
      this.pagination.page = page;
      this.fetchChiphiTratruoc();
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
    
    // Form Dialog Methods
    openCreateDialog() {
      this.formDialog = {
        visible: true,
        isEdit: false,
        chiphiTratruocData: {}
      };
    },
    
    openEditDialog(row) {
      this.formDialog = {
        visible: true,
        isEdit: true,
        chiphiTratruocData: { ...row }
      };
    },
    
    handleFormSuccess(data) {
      this.fetchChiphiTratruoc();
      this.$message.success(this.formDialog.isEdit ? 'Cập nhật thành công' : 'Thêm mới thành công');
    },
    
    handleFormClose() {
      this.formDialog = {
        visible: false,
        isEdit: false,
        chiphiTratruocData: {}
      };
    },
    
    // Detail Dialog Methods
    openDetailDialog(row) {
      this.detailDialog = {
        visible: true,
        chiphiTratruocData: { ...row }
      };
    },
    
    handleDetailClose() {
      this.detailDialog = {
        visible: false,
        chiphiTratruocData: {}
      };
    },
    
    // Disable Method
    async handleDisable(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn vô hiệu hóa chi phí trả trước "${row.ten_taisan}" (${row.ma_taisan})?`,
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
          table_code: 'tbldmchiphi_tratruoc',
          sohieutk: row.sohieutk,
          ma_kho: row.ma_kho,
          ma_nhom: row.ma_nhom,
          ma_taisan: row.ma_taisan,
          trang_thai: 0
        };
        
        await service.post(`${baseUrl}/dm/update-status`, payload);
        this.$message.success('Vô hiệu hóa chi phí trả trước thành công');
        this.fetchChiphiTratruoc();
      } catch (error) {
        if (error !== 'cancel') {
          console.error('Error disabling chiphi tratruoc:', error);
          this.$message.error('Có lỗi xảy ra khi vô hiệu hóa chi phí trả trước');
        }
      } finally {
        this.loading = false;
      }
    },
    
    // Enable Method
    async handleEnable(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn kích hoạt chi phí trả trước "${row.ten_taisan}" (${row.ma_taisan})?`,
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
          table_code: 'tbldmchiphi_tratruoc',
          sohieutk: row.sohieutk,
          ma_kho: row.ma_kho,
          ma_nhom: row.ma_nhom,
          ma_taisan: row.ma_taisan,
          trang_thai: 1
        };
        
        await service.post(`${baseUrl}/dm/update-status`, payload);
        this.$message.success('Kích hoạt chi phí trả trước thành công');
        this.fetchChiphiTratruoc();
      } catch (error) {
        if (error !== 'cancel') {
          console.error('Error enabling chiphi tratruoc:', error);
          this.$message.error('Có lỗi xảy ra khi kích hoạt chi phí trả trước');
        }
      } finally {
        this.loading = false;
      }
    }
  },
  
  created() {
    this.fetchChiphiTratruoc();
  },
};
</script>

<style scoped>
.chiphi-tratruoc-container {
  padding: 24px;
}

.el-table {
  font-size: 12px;
}

.el-table .cell {
  padding: 8px 0;
}
</style> 