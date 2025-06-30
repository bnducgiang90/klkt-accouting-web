<template>
  <div class="taikhoan-container">
    <el-card>
      <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center; justify-content: space-between;">
        <div style="display: flex; gap: 10px; align-items: center;">
          <el-input
            v-model="searchQuery"
            placeholder="Nhập số hiệu hoặc tên tài khoản để tìm kiếm"
            clearable
            style="width: 400px;"
            @keyup.enter.native="handleSearch"
          />
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>
        </div>
        <el-button type="success" icon="el-icon-plus" @click="openCreateDialog">Thêm mới</el-button>
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
        <el-table-column prop="ten_tk" label="Tên tài khoản" min-width="200" />
        <el-table-column prop="ten_tk_ta" label="Tên tài khoản TA" min-width="200" />
        <el-table-column prop="du_no" label="Dư nợ" width="100" align="right">
          <template slot-scope="scope">
            {{ scope.row.du_no }}
          </template>
        </el-table-column>
        <el-table-column prop="du_co" label="Dư có" width="100" align="right">
          <template slot-scope="scope">
            {{ scope.row.du_co }}
          </template>
        </el-table-column>
        <el-table-column prop="chitiet_doituong" label="Chi tiết đối tượng" width="120" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.chitiet_doituong === 1 ? 'success' : 'info'">
              {{ scope.row.chitiet_doituong === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="tk_vattu_hanghoa" label="TK vật tư hàng hóa" width="140" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tk_vattu_hanghoa === 1 ? 'success' : 'info'">
              {{ scope.row.tk_vattu_hanghoa === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="cap_chitet" label="Cấp chi tiết" width="110" align="center" />
        <el-table-column prop="phieu_thu" label="Phiếu thu" width="90" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.phieu_thu === 1 ? 'success' : 'info'">
              {{ scope.row.phieu_thu === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phieu_chi" label="Phiếu chi" width="90" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.phieu_chi === 1 ? 'success' : 'info'">
              {{ scope.row.phieu_chi === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phieu_nhap" label="Phiếu nhập" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.phieu_nhap === 1 ? 'success' : 'info'">
              {{ scope.row.phieu_nhap === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phieu_xuat" label="Phiếu xuất" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.phieu_xuat === 1 ? 'success' : 'info'">
              {{ scope.row.phieu_xuat === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ban_hang" label="Bán hàng" width="90" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.ban_hang === 1 ? 'success' : 'info'">
              {{ scope.row.ban_hang === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ngan_hang" label="Ngân hàng" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.ngan_hang === 1 ? 'success' : 'info'">
              {{ scope.row.ngan_hang === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="tien_luong" label="Tiền lương" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tien_luong === 1 ? 'success' : 'info'">
              {{ scope.row.tien_luong === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="khau_hao" label="Khấu hao" width="90" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.khau_hao === 1 ? 'success' : 'info'">
              {{ scope.row.khau_hao === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="gia_thanh" label="Giá thành" width="90" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.gia_thanh === 1 ? 'success' : 'info'">
              {{ scope.row.gia_thanh === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="luu_chuyen_nb" label="Lưu chuyển NB" width="120" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.luu_chuyen_nb === 1 ? 'success' : 'info'">
              {{ scope.row.luu_chuyen_nb === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="tinh_gia_von" label="Tính giá vốn" width="120" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tinh_gia_von === 1 ? 'success' : 'info'">
              {{ scope.row.tinh_gia_von === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="chung_tu_khac" label="Chứng từ khác" width="120" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.chung_tu_khac === 1 ? 'success' : 'info'">
              {{ scope.row.chung_tu_khac === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ngoai_bang" label="Ngoài bảng" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.ngoai_bang === 1 ? 'success' : 'info'">
              {{ scope.row.ngoai_bang === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="su_dung" label="Sử dụng" width="90" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.su_dung === 1 ? 'success' : 'info'">
              {{ scope.row.su_dung === 1 ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="tu_ngay" label="Từ ngày" width="130" align="center">
          <template slot-scope="scope">
            {{ scope.row.tu_ngay ? (new Date(scope.row.tu_ngay)).toLocaleDateString('vi-VN') : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="den_ngay" label="Đến ngày" width="130" align="center">
          <template slot-scope="scope">
            {{ scope.row.den_ngay ? (new Date(scope.row.den_ngay)).toLocaleDateString('vi-VN') : '' }}
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

    <!-- Account Form Dialog -->
    <AccountForm
      :visible.sync="formDialog.visible"
      :is-edit="formDialog.isEdit"
      :account-data="formDialog.accountData"
      @success="handleFormSuccess"
      @close="handleFormClose"
    />

    <!-- Account Detail Dialog -->
    <AccountDetail
      :visible.sync="detailDialog.visible"
      :account-data="detailDialog.accountData"
      @close="handleDetailClose"
    />
  </div>
</template>

<script>
import service from '@/utils/request';
import AccountForm from './components/AccountForm.vue';
import AccountDetail from './components/AccountDetail.vue';
const baseUrl = process.env.VUE_APP_KLKT_APP_BASE_API;

export default {
  name: 'DmTaiKhoanList',
  components: {
    AccountForm,
    AccountDetail
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
      formDialog: {
        visible: false,
        isEdit: false,
        accountData: {}
      },
      detailDialog: {
        visible: false,
        accountData: {}
      }
    };
  },
  methods: {
    async fetchAccounts() {
      this.loading = true;
      try {
        const payload = {
          table_code: 'tbldmtaikhoan',
          sohieutk: this.searchQuery || undefined,
          ten_tk: this.searchQuery || undefined,
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
    
    // Form Dialog Methods
    openCreateDialog() {
      this.formDialog = {
        visible: true,
        isEdit: false,
        accountData: {}
      };
    },
    
    openEditDialog(row) {
      this.formDialog = {
        visible: true,
        isEdit: true,
        accountData: { ...row }
      };
    },
    
    handleFormSuccess(data) {
      this.fetchAccounts();
      this.$message.success(this.formDialog.isEdit ? 'Cập nhật thành công' : 'Thêm mới thành công');
    },
    
    handleFormClose() {
      this.formDialog = {
        visible: false,
        isEdit: false,
        accountData: {}
      };
    },
    
    // Detail Dialog Methods
    openDetailDialog(row) {
      this.detailDialog = {
        visible: true,
        accountData: { ...row }
      };
    },
    
    handleDetailClose() {
      this.detailDialog = {
        visible: false,
        accountData: {}
      };
    },
    
    // Disable Method
    async handleDisable(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn vô hiệu hóa tài khoản "${row.ten_tk}" (${row.sohieutk})?`,
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
          table_code: 'tbldmtaikhoan',
          mst: row.mst,
          sohieutk: row.sohieutk,
          trang_thai: 0
        };
        
        await service.post(`${baseUrl}/dm/update-status`, payload);
        this.$message.success('Vô hiệu hóa tài khoản thành công');
        this.fetchAccounts();
      } catch (error) {
        if (error !== 'cancel') {
          console.error('Error disabling account:', error);
          this.$message.error('Có lỗi xảy ra khi vô hiệu hóa tài khoản');
        }
      } finally {
        this.loading = false;
      }
    },
    
    // Enable Method
    async handleEnable(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn kích hoạt tài khoản "${row.ten_tk}" (${row.sohieutk})?`,
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
          table_code: 'tbldmtaikhoan',
          mst: row.mst,
          sohieutk: row.sohieutk,
          trang_thai: 1
        };
        
        await service.post(`${baseUrl}/dm/update-status`, payload);
        this.$message.success('Kích hoạt tài khoản thành công');
        this.fetchAccounts();
      } catch (error) {
        if (error !== 'cancel') {
          console.error('Error enabling account:', error);
          this.$message.error('Có lỗi xảy ra khi kích hoạt tài khoản');
        }
      } finally {
        this.loading = false;
      }
    }
  },
  
  created() {
    this.fetchAccounts();
  }
};
</script>

<style scoped>
.taikhoan-container {
  padding: 24px;
}

.el-table {
  font-size: 12px;
}

.el-table .cell {
  padding: 8px 0;
}
</style> 