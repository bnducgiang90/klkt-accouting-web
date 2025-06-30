<template>
  <div class="taikhoan-chitiet-container">
    <el-card>
      <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center;">
        <el-input
          v-model="searchQuery"
          placeholder="Nhập số hiệu hoặc tên chi tiết để tìm kiếm"
          clearable
          style="width: 400px;"
          @keyup.enter.native="handleSearch"
        />
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>
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
        <el-table-column prop="mst" label="MST" width="120" />
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
        <el-table-column prop="su_dung" label="Sử dụng" width="100" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.su_dung" type="success">Có</el-tag>
            <el-tag v-else type="info">Không</el-tag>
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
              type="danger"
              size="small"
              class="el-icon-delete"
              @click="onDisable(scope.row)"
            >Disable</el-button>
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
  </div>
</template>

<script>
import service from '@/utils/request';
const baseUrl = process.env.VUE_APP_KLKT_APP_BASE_API;

export default {
  name: 'DmTaiKhoanChiTietList',
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
        this.$message.info('Edit: ' + JSON.stringify(row));
    },
    onDetail(row) {
      this.$message.info('Detail: ' + JSON.stringify(row));
    },
    onDisable(row) {
      this.$message.warning('Disable: ' + JSON.stringify(row));
    },
    openDialog(type, record = {}) {
      this.$message.warning('Open dialog: ' + type + '; ' + JSON.stringify(record));
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