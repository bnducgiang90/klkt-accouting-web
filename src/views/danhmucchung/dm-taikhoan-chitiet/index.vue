<template>
  <div class="taikhoan-chitiet-container">
    <el-card>
      <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center; justify-content: space-between;">
        <div style="display: flex; gap: 10px; align-items: center;">
          <el-input
            v-model="searchQuery"
            placeholder="Nhập số hiệu hoặc tên chi tiết để tìm kiếm"
            clearable
            style="width: 400px;"
            @keyup.enter.native="handleSearch"
          />
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>
        </div>
        <el-button type="success" icon="el-icon-plus" @click="onCreate">Thêm mới</el-button>
      </div>
      <el-table
        :data="accounts"
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
        <el-table-column prop="mst" label="MST" width="120" v-if="false" />
        <el-table-column prop="sohieutk" label="Số hiệu TK" width="120" />
        <el-table-column prop="ma_chitiet" label="Mã chi tiết" width="150" />
        <el-table-column prop="ten_chitiet" label="Tên chi tiết" min-width="200" />
        <el-table-column prop="du_no_dau_ky" label="Dư nợ đầu kỳ" width="150" align="right">
          <template slot-scope="scope">
            {{ formatCurrency(scope.row.du_no_dau_ky) }}
          </template>
        </el-table-column>
        <el-table-column prop="du_co_dau_ky" label="Dư có đầu kỳ" width="150" align="right">
          <template slot-scope="scope">
            {{ formatCurrency(scope.row.du_co_dau_ky) }}
          </template>
        </el-table-column>
        <el-table-column prop="trang_thai" label="Trạng thái" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.trang_thai === 1 ? 'success' : 'danger'">
              {{ scope.row.trang_thai === 1 ? 'Hoạt động' : 'Hủy kích hoạt' }}
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
              @click="onEdit(scope.row)"
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
      <!-- Popup for create/edit -->
      <tai-khoan-chi-tiet-form
        :visible.sync="formVisible"
        :is-edit="isEdit"
        :account-data="currentRecord"
        @success="handleFormSuccess"
      />
      <!-- Popup for detail -->
      <tai-khoan-chi-tiet-detail
        :visible.sync="detailVisible"
        :account-data="currentRecord"
        @close="handleDetailClose"
      />
    </el-card>
  </div>
</template>

<script>
import service from '@/utils/request';
const baseUrl = process.env.VUE_APP_KLKT_APP_BASE_API;
// Import popup components (to be created)
import TaiKhoanChiTietForm from './components/TaiKhoanChiTietForm.vue';
import TaiKhoanChiTietDetail from './components/TaiKhoanChiTietDetail.vue';

export default {
  name: 'DmTaiKhoanChiTietList',
  components: {
    TaiKhoanChiTietForm,
    TaiKhoanChiTietDetail,
  },
  data() {
    return {
      searchQuery: '',
      accounts: [],
      loading: false,
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      // Popup state
      formVisible: false,
      isEdit: false,
      currentRecord: {},
      detailVisible: false,
    };
  },
  methods: {
    async fetchAccounts() {
      this.loading = true;
      try {
        const payload = {
          table_code: 'tbldmtaikhoan_chitiet',
          mst: undefined,
          sohieutk: this.searchQuery || undefined,
          ma_chitiet: undefined,
          ten_chitiet: this.searchQuery || undefined,
          page: this.pagination.page,
          pageSize: this.pagination.pageSize,
        };
        const res = await service.post(`${baseUrl}/dm/search`, payload);
        console.log('API result:', res);
        this.accounts = (res.data.items || []);
        this.pagination.total = res.data.total || 0;
      } catch (e) {
        console.error('Error fetching data:', e);
        this.accounts = [];
        this.pagination.total = 0;
        this.$message.error('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        this.loading = false;
      }
    },
    handleSearch() {
      this.pagination.page = 1;
      this.fetchAccounts();
    },
    handlePageChange(page) {
      this.pagination.page = page;
      this.fetchAccounts();
    },
    indexMethod(index) {
      return (this.pagination.page - 1) * this.pagination.pageSize + index + 1;
    },
    formatCurrency(value) {
      if (value === null || value === undefined) return '';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(value);
    },
    onEdit(row) {
      this.isEdit = true;
      this.currentRecord = { ...row };
      this.formVisible = true;
    },
    onCreate() {
      this.isEdit = false;
      this.currentRecord = {};
      this.formVisible = true;
    },
    onDetail(row) {
      this.currentRecord = { ...row };
      this.detailVisible = true;
    },
    onDisable(row) {
      this.disableRecord = { ...row };
      this.confirmDisableVisible = true;
    },
    handleFormSuccess() {
      this.formVisible = false;
      this.fetchAccounts();
    },
    handleDetailClose() {
      this.detailVisible = false;
    },
    async handleDisable(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn Hủy kích hoạt tài khoản chi tiết "${row.ten_chitiet}" (${row.ma_chitiet})?`,
          'Xác nhận Hủy kích hoạt',
          {
            confirmButtonText: 'Hủy kích hoạt',
            cancelButtonText: 'Hủy',
            type: 'warning',
            confirmButtonClass: 'el-button--danger'
          }
        );
        this.loading = true;
        const payload = {
          table_code: 'tbldmtaikhoan_chitiet',
          mst: row.mst,
          sohieutk: row.sohieutk,
          ma_chitiet: row.ma_chitiet,
          trang_thai: 0
        };
        await service.post(`${baseUrl}/dm/update-status`, payload);
        this.$message.success('Hủy kích hoạt tài khoản chi tiết thành công');
        this.fetchAccounts();
      } catch (error) {
        if (error !== 'cancel') {
          console.error('Error disabling account detail:', error);
          this.$message.error('Có lỗi xảy ra khi Hủy kích hoạt tài khoản chi tiết');
        }
      } finally {
        this.loading = false;
      }
    },
    async handleEnable(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn kích hoạt tài khoản chi tiết "${row.ten_chitiet}" (${row.ma_chitiet})?`,
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
          table_code: 'tbldmtaikhoan_chitiet',
          mst: row.mst,
          sohieutk: row.sohieutk,
          ma_chitiet: row.ma_chitiet,
          trang_thai: 1
        };
        await service.post(`${baseUrl}/dm/update-status`, payload);
        this.$message.success('Kích hoạt tài khoản chi tiết thành công');
        this.fetchAccounts();
      } catch (error) {
        if (error !== 'cancel') {
          console.error('Error enabling account detail:', error);
          this.$message.error('Có lỗi xảy ra khi kích hoạt tài khoản chi tiết');
        }
      } finally {
        this.loading = false;
      }
    },
    openDialog(type, record = {}) {
      if (type === 'update') {
        this.onEdit(record);
      } else if (type === 'create') {
        this.onCreate();
      }
    },
  },
  created() {
    this.fetchAccounts();
  },
};
</script>

<style scoped>
.taikhoan-chitiet-container {
  padding: 24px;
}

.el-table {
  font-size: 12px;
}

.el-table .cell {
  padding: 8px 0;
}
</style> 