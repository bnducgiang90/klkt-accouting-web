<template>
  <div class="khachhang-container">
    <el-card>
      <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center; justify-content: space-between;">
        <div style="display: flex; gap: 10px; align-items: center;">
          <el-input
            v-model="searchQuery"
            placeholder="Nhập MST, MST KH NCC hoặc tên công ty để tìm kiếm"
            clearable
            style="width: 400px;"
            @keyup.enter.native="handleSearch"
          />
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>
        </div>
        <el-button type="success" icon="el-icon-plus" @click="openCreateDialog">Thêm mới</el-button>
      </div>
      <el-table
        :data="customers"
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
        <el-table-column prop="id" label="ID" width="120" />
        <el-table-column prop="mst" label="MST" width="120" v-if="false"/>
        <el-table-column prop="mst_kh_ncc" label="MST KH NCC" width="120" />
        <el-table-column prop="ten_congty" label="Tên công ty" min-width="200" />
        <el-table-column prop="du_no" label="Dư nợ" width="120" align="right">
          <template slot-scope="scope">
            {{ formatCurrency(scope.row.du_no) }}
          </template>
        </el-table-column>
        <el-table-column prop="du_co" label="Dư có" width="120" align="right">
          <template slot-scope="scope">
            {{ formatCurrency(scope.row.du_co) }}
          </template>
        </el-table-column>
        <el-table-column prop="dia_chi" label="Địa chỉ" min-width="150" />
        <el-table-column prop="huyen" label="Huyện" width="100" />
        <el-table-column prop="tinh" label="Tỉnh" width="100" />
        <el-table-column prop="dien_thoai" label="Điện thoại" width="120" />
        <el-table-column prop="ten_giamdoc" label="Tên giám đốc" width="120" />
        <el-table-column prop="ten_ketoan" label="Tên kế toán" width="120" />
        <el-table-column prop="linh_vuc_kd" label="Lĩnh vực KD" min-width="150" />
        <el-table-column prop="khach_hang" label="Khách hàng" width="100" align="center">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.khach_hang"
              @change="(val) => handleCheckboxChange(scope.row, 'khach_hang', val)"
              :disabled="scope.row.trang_thai !== 1"
            />
          </template>
        </el-table-column>
        <el-table-column prop="nha_cungcap" label="Nhà cung cấp" width="120" align="center">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.nha_cungcap"
              @change="(val) => handleCheckboxChange(scope.row, 'nha_cungcap', val)"
              :disabled="scope.row.trang_thai !== 1"
            />
          </template>
        </el-table-column>
        <el-table-column prop="tai_khoan" label="Tài khoản" width="120" />
        <el-table-column prop="ngan_hang" label="Ngân hàng" min-width="150" />
        <el-table-column prop="cap" label="Cấp" width="80" align="center">
          <template slot-scope="scope">
            {{ formatNumber(scope.row.cap) }}
          </template>
        </el-table-column>
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

    <!-- Customer Form Dialog -->
    <CustomerForm
      :visible.sync="formDialog.visible"
      :is-edit="formDialog.isEdit"
      :customer-data="formDialog.customerData"
      @success="handleFormSuccess"
      @close="handleFormClose"
    />

    <!-- Customer Detail Dialog -->
    <CustomerDetail
      :visible.sync="detailDialog.visible"
      :customer-data="detailDialog.customerData"
      @close="handleDetailClose"
    />
  </div>
</template>

<script>
import service from '@/utils/request';
import CustomerForm from './components/CustomerForm.vue';
import CustomerDetail from './components/CustomerDetail.vue';
const baseUrl = process.env.VUE_APP_KLKT_APP_BASE_API;

export default {
  name: 'DmKhachHangList',
  components: {
    CustomerForm,
    CustomerDetail
  },
  data() {
    return {
      searchQuery: '',
      customers: [],
      loading: false,
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      formDialog: {
        visible: false,
        isEdit: false,
        customerData: {}
      },
      detailDialog: {
        visible: false,
        customerData: {}
      }
    };
  },
  methods: {
    async fetchCustomers() {
      this.loading = true;
      try {
        const payload = {
          table_code: 'tbldmkhachhang',
          mst: this.searchQuery || undefined,
          mst_kh_ncc: this.searchQuery || undefined,
          ten_congty: this.searchQuery || undefined,
          page: this.pagination.page,
          pageSize: this.pagination.pageSize,
        };
        const res = await service.post(`${baseUrl}/dm/search`, payload);
        console.log('API result:', res);
        this.customers = (res.data.items || []);
        this.pagination.total = res.data.total || 0;
      } catch (e) {
        console.error('Error fetching data:', e);
        this.customers = [];
        this.pagination.total = 0;
        this.$message.error('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        this.loading = false;
      }
    },
    handleSearch() {
      this.pagination.page = 1;
      this.fetchCustomers();
    },
    handlePageChange(page) {
      this.pagination.page = page;
      this.fetchCustomers();
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
    
    // Form Dialog Methods
    openCreateDialog() {
      this.formDialog = {
        visible: true,
        isEdit: false,
        customerData: {}
      };
    },
    
    openEditDialog(row) {
      this.formDialog = {
        visible: true,
        isEdit: true,
        customerData: { ...row }
      };
    },
    
    handleFormSuccess(data) {
      this.fetchCustomers();
      this.$message.success(this.formDialog.isEdit ? 'Cập nhật thành công' : 'Thêm mới thành công');
    },
    
    handleFormClose() {
      this.formDialog = {
        visible: false,
        isEdit: false,
        customerData: {}
      };
    },
    
    // Detail Dialog Methods
    openDetailDialog(row) {
      this.detailDialog = {
        visible: true,
        customerData: { ...row }
      };
    },
    
    handleDetailClose() {
      this.detailDialog = {
        visible: false,
        customerData: {}
      };
    },
    
    // Disable Method
    async handleDisable(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn vô hiệu hóa khách hàng "${row.ten_congty}" (${row.mst})?`,
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
          table_code: 'tbldmkhachhang',
          id: row.id,
          mst: row.mst,
          trang_thai: 0
        };
        
        await service.post(`${baseUrl}/dm/update-status`, payload);
        this.$message.success('Vô hiệu hóa khách hàng thành công');
        this.fetchCustomers();
      } catch (error) {
        if (error !== 'cancel') {
          console.error('Error disabling customer:', error);
          this.$message.error('Có lỗi xảy ra khi vô hiệu hóa khách hàng');
        }
      } finally {
        this.loading = false;
      }
    },
    
    // Enable Method
    async handleEnable(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn kích hoạt khách hàng "${row.ten_congty}" (${row.mst})?`,
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
          table_code: 'tbldmkhachhang',
          id: row.id,
          mst: row.mst,
          trang_thai: 1
        };
        
        await service.post(`${baseUrl}/dm/update-status`, payload);
        this.$message.success('Kích hoạt khách hàng thành công');
        this.fetchCustomers();
      } catch (error) {
        if (error !== 'cancel') {
          console.error('Error enabling customer:', error);
          this.$message.error('Có lỗi xảy ra khi kích hoạt khách hàng');
        }
      } finally {
        this.loading = false;
      }
    },

    // Method for checkbox change
    async handleCheckboxChange(row, field, value) {
      try {
        // Tạo payload giống với upsert
        const payload = {
          table_code: 'tbldmkhachhang',
          id: row.id,
          mst: row.mst,
          mst_kh_ncc: row.mst_kh_ncc,
          
          khach_hang: field === 'khach_hang' ? value : row.khach_hang,
          nha_cungcap: field === 'nha_cungcap' ? value : row.nha_cungcap,
          update_type: 'KH-NCC'
        };

        // Gọi API update
        await service.post(`${baseUrl}/dm/update`, payload);
        
        // Hiển thị thông báo thành công
        const fieldName = field === 'khach_hang' ? 'khách hàng' : 'nhà cung cấp';
        const action = value ? 'kích hoạt' : 'vô hiệu hóa';
        this.$message.success(`Đã ${action} ${fieldName} thành công`);
        
        // Cập nhật lại dữ liệu
        this.fetchCustomers();
      } catch (error) {
        console.error('Error updating checkbox:', error);
        this.$message.error('Có lỗi xảy ra khi cập nhật trạng thái');
        
        // Khôi phục giá trị cũ nếu có lỗi
        this.$set(row, field, !value);
      }
    }
  },
  created() {
    this.fetchCustomers();
  }
};
</script>

<style scoped>
.khachhang-container {
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
  .khachhang-container {
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