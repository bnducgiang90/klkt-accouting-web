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
        <el-table-column prop="mst" label="MST" width="120" v-if="false"/>
        <el-table-column prop="sohieutk" label="Số hiệu TK" width="120" />
        <el-table-column prop="ten_tk" label="Tên tài khoản" min-width="100" />
        <!-- <el-table-column prop="ten_tk_ta" label="Tên tài khoản TA" min-width="120" /> -->
        <el-table-column prop="du_no_dau_ky" label="Dư nợ đầu kỳ" width="140" align="right">
          <template slot-scope="scope">
            {{ formatCurrency(scope.row.du_no_dau_ky) }}
          </template>
        </el-table-column>
        <el-table-column prop="du_co_dau_ky" label="Dư có đầu kỳ" width="140" align="right">
          <template slot-scope="scope">
            {{ formatCurrency(scope.row.du_co_dau_ky) }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="chitiet_doituong" label="Chi tiết đối tượng" width="120" align="center">
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
        </el-table-column> -->
        <el-table-column prop="trang_thai" label="Trạng thái" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.trang_thai === 1 ? 'success' : 'danger'">
              {{ scope.row.trang_thai === 1 ? 'Hoạt động' : 'Hủy kích hoạt' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Tài khoản chi tiết" width="160">
          <template slot-scope="scope">
            <el-tag
              type="primary"
              style="cursor:pointer; font-size: 12px; font-weight: bold;"
              @click="openSubAccountDrawer(scope.row)"
            >
              Tài khoản chi tiết (<span class="highlight-ct">{{ scope.row.total_tk_ct }}</span>)
            </el-tag>
          </template>
        </el-table-column>
        <!-- Cột hành động -->
        <el-table-column align="center" label="Action" width="350">
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

    <!-- Sub-Account Drawer -->
    <el-drawer
      :visible.sync="subAccountDrawer.visible"
      size="55%"
      @close="closeSubAccountDrawer"
    >
      <div class="custom-drawer-title">
        Danh sách tài khoản chi tiết của <span>{{ subAccountDrawer.ten_tk }}</span>
        (<span class="sohieutk-highlight">{{ subAccountDrawer.sohieutk }}</span>)
        <!-- <el-button
          icon="el-icon-close"
          @click="closeSubAccountDrawer"
          circle
          size="mini"
          style="float: right; margin-top: 2px;"
        /> -->
      </div>
      <div class="drawer-content-padding">
        <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center; justify-content: space-between;">
          <div style="display: flex; gap: 10px; align-items: center;">
            <el-input
              v-model="subAccountDrawer.searchQuery"
              placeholder="Nhập số hiệu hoặc tên chi tiết để tìm kiếm"
              clearable
              style="width: 300px;"
              @keyup.enter.native="fetchSubAccounts"
            />
            <el-button type="primary" icon="el-icon-search" @click="fetchSubAccounts">Search</el-button>
          </div>
          <el-button type="success" icon="el-icon-plus" @click="openSubAccountForm(false)">Thêm mới</el-button>
        </div>
        <!-- Tổng dư nợ/có đầu kỳ -->
        <el-table
          :data="subAccountDrawer.accounts"
          border
          style="width: 100%"
          v-loading="subAccountDrawer.loading"
          empty-text="Không có dữ liệu"
          max-height="400"
        >
          <!-- <el-table-column label="STT" type="index" width="60" :index="subAccountIndexMethod" align="center" /> -->
          <el-table-column prop="ma_chitiet" label="Mã chi tiết" width="120" />
          <el-table-column prop="ten_chitiet" label="Tên chi tiết" min-width="180" />
          <el-table-column prop="du_no_dau_ky" label="Dư nợ đầu kỳ" width="130" align="right">
            <template slot-scope="scope">
              {{ formatCurrency(scope.row.du_no_dau_ky) }}
            </template>
          </el-table-column>
          <el-table-column prop="du_co_dau_ky" label="Dư có đầu kỳ" width="130" align="right">
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
          <el-table-column align="center" label="Action" width="200">
            <template slot-scope="scope">
              <div class="action-btn-group">
                <el-button type="primary" size="small" icon="el-icon-edit" @click="openSubAccountForm(true, scope.row)">Sửa</el-button>
                <el-button :type="scope.row.trang_thai === 1 ? 'danger' : 'warning'" size="small" :icon="scope.row.trang_thai === 1 ? 'el-icon-delete' : 'el-icon-check'" @click="scope.row.trang_thai === 1 ? handleDisableSubAccount(scope.row) : handleEnableSubAccount(scope.row)">{{ scope.row.trang_thai === 1 ? 'Disable' : 'Enable' }}</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="balance-pagination-row">
          <div class="total-balance-info">
            <div class="balance-block">
              <span class="balance-label">Tổng dư nợ đầu kỳ:</span>
              <el-input
                v-model="formattedDuNo"
                @input="onInputDuNo"
                class="balance-input debit"
              />
            </div>
            <div class="balance-block">
              <span class="balance-label">Tổng dư có đầu kỳ:</span>
              <el-input
                v-model="formattedDuCo"
                @input="onInputDuCo"
                class="balance-input credit"
              />
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :current-page="subAccountDrawer.pagination.page"
            :page-size="subAccountDrawer.pagination.pageSize"
            :total="subAccountDrawer.pagination.total"
            @current-change="handleSubAccountPageChange"
          />
        </div>
        <!-- Sub-Account Form Inline -->
        <div v-if="subAccountDrawer.showForm" style="margin-top: 24px; background: #fafbfc; padding: 24px; border-radius: 8px;">
          <el-form
            ref="subAccountForm"
            :model="subAccountDrawer.formData"
            :rules="subAccountDrawer.rules"
            label-width="120px"
            label-position="left"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="MST" prop="mst">
                  <el-input v-model="subAccountDrawer.formData.mst" placeholder="MST" clearable readonly />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Số hiệu TK" prop="sohieutk">
                  <el-input v-model="subAccountDrawer.formData.sohieutk" placeholder="Số hiệu tài khoản" clearable readonly />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Mã chi tiết" prop="ma_chitiet">
                  <el-input v-model="subAccountDrawer.formData.ma_chitiet" placeholder="Nhập mã chi tiết" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Tên chi tiết" prop="ten_chitiet">
                  <el-input v-model="subAccountDrawer.formData.ten_chitiet" placeholder="Nhập tên chi tiết" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Dư nợ đầu kỳ" prop="du_no_dau_ky">
                  <el-input-number v-model="subAccountDrawer.formData.du_no_dau_ky" :precision="0" :step="1000" :min="0" style="width: 100%" placeholder="0" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Dư có đầu kỳ" prop="du_co_dau_ky">
                  <el-input-number v-model="subAccountDrawer.formData.du_co_dau_ky" :precision="0" :step="1000" :min="0" style="width: 100%" placeholder="0" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Trạng thái" prop="trang_thai">
                  <el-switch v-model="subAccountDrawer.formData.trang_thai" :active-value="1" :inactive-value="0" active-text="Hoạt động" inactive-text="Hủy kích hoạt" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="Ghi chú" prop="ghi_chu">
              <el-input v-model="subAccountDrawer.formData.ghi_chu" type="textarea" :rows="3" placeholder="Nhập ghi chú (nếu có)" />
            </el-form-item>
          </el-form>
          <div style="text-align: left; margin-top: 16px;">
            <el-button @click="closeSubAccountForm">Hủy</el-button>
            <el-button type="primary" @click="submitSubAccountForm" :loading="subAccountDrawer.formLoading">
              {{ subAccountDrawer.isEdit ? 'Cập nhật' : 'Thêm mới' }}
            </el-button>
          </div>
        </div>
      </div>
    </el-drawer>
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
    AccountDetail,
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
      },
      subAccountDrawer: {
        visible: false,
        title: '',
        sohieutk: '',
        mst: '', // Thêm thuộc tính này
        searchQuery: '',
        accounts: [],
        loading: false,
        pagination: {
          page: 1,
          pageSize: 10,
          total: 0,
        },
        isEdit: false,
        currentRecord: {},
        showForm: false,
        formData: {
          mst: '',
          sohieutk: '',
          ma_chitiet: '',
          ten_chitiet: '',
          du_no_dau_ky: 0,
          du_co_dau_ky: 0,
          trang_thai: 1,
          ghi_chu: ''
        },
        rules: {
          mst: [
            { required: true, message: 'Vui lòng nhập MST', trigger: 'blur' }
          ],
          sohieutk: [
            { required: true, message: 'Vui lòng nhập số hiệu tài khoản', trigger: 'blur' }
          ],
          ma_chitiet: [
            { required: true, message: 'Vui lòng nhập mã chi tiết', trigger: 'blur' }
          ],
          ten_chitiet: [
            { required: true, message: 'Vui lòng nhập tên chi tiết', trigger: 'blur' }
          ]
        },
        formLoading: false,
        totalDuNoDauKy: 0, // Thêm thuộc tính này
        totalDuCoDauKy: 0  // Thêm thuộc tính này
      },
      formattedDuNo: '',
      formattedDuCo: ''
    };
  },
  watch: {
    'subAccountDrawer.totalDuNoDauKy': {
      immediate: true,
      handler(val) {
        this.formattedDuNo = this.formatVND(val);
      }
    },
    'subAccountDrawer.totalDuCoDauKy': {
      immediate: true,
      handler(val) {
        this.formattedDuCo = this.formatVND(val);
      }
    }
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
          `Bạn có chắc chắn muốn Hủy kích hoạt tài khoản "${row.ten_tk}" (${row.sohieutk})?`,
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
          table_code: 'tbldmtaikhoan',
          mst: row.mst,
          sohieutk: row.sohieutk,
          trang_thai: 0
        };
        
        await service.post(`${baseUrl}/dm/update-status`, payload);
        this.$message.success('Hủy kích hoạt tài khoản thành công');
        this.fetchAccounts();
      } catch (error) {
        if (error !== 'cancel') {
          console.error('Error disabling account:', error);
          this.$message.error('Có lỗi xảy ra khi Hủy kích hoạt tài khoản');
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
    },

    // Sub-Account Methods
    openSubAccountDrawer(row) {
      this.subAccountDrawer.visible = true;
      this.subAccountDrawer.ten_tk = row.ten_tk; // Lưu tên tài khoản cha
      this.subAccountDrawer.sohieutk = row.sohieutk;
      this.subAccountDrawer.mst = row.mst; // Lưu mst tài khoản cha
      this.subAccountDrawer.searchQuery = '';
      this.subAccountDrawer.pagination.page = 1;
      this.fetchSubAccounts();
      this.fetchSubAccountBalance(); // Gọi lấy tổng khi mở drawer
    },
    closeSubAccountDrawer() {
      this.subAccountDrawer.visible = false;
    },
    async fetchSubAccounts() {
      this.subAccountDrawer.loading = true;
      try {
        const payload = {
          table_code: 'tbldmtaikhoan_chitiet',
          sohieutk: this.subAccountDrawer.sohieutk,
          ten_chitiet: this.subAccountDrawer.searchQuery || undefined,
          page: this.subAccountDrawer.pagination.page,
          pageSize: this.subAccountDrawer.pagination.pageSize,
        };
        const res = await service.post(`${baseUrl}/dm/search`, payload);
        this.subAccountDrawer.accounts = (res.data.items || []);
        this.subAccountDrawer.pagination.total = res.data.total || 0;
      } catch (e) {
        this.subAccountDrawer.accounts = [];
        this.subAccountDrawer.pagination.total = 0;
        this.$message.error('Có lỗi xảy ra khi tải tài khoản chi tiết');
      } finally {
        this.subAccountDrawer.loading = false;
      }
    },
    handleSubAccountPageChange(page) {
      this.subAccountDrawer.pagination.page = page;
      this.fetchSubAccounts();
    },
    subAccountIndexMethod(index) {
      return (this.subAccountDrawer.pagination.page - 1) * this.subAccountDrawer.pagination.pageSize + index + 1;
    },
    openSubAccountForm(isEdit, row = {}) {
      this.subAccountDrawer.isEdit = isEdit;
      if (isEdit && row) {
        this.subAccountDrawer.formData = {
          mst: row.mst || '',
          sohieutk: row.sohieutk || '',
          ma_chitiet: row.ma_chitiet || '',
          ten_chitiet: row.ten_chitiet || '',
          du_no_dau_ky: row.du_no_dau_ky || 0,
          du_co_dau_ky: row.du_co_dau_ky || 0,
          trang_thai: row.trang_thai != null ? row.trang_thai : 1,
          ghi_chu: row.ghi_chu || ''
        };
      } else {
        this.subAccountDrawer.formData = {
          mst: this.subAccountDrawer.mst || '',
          sohieutk: this.subAccountDrawer.sohieutk || '',
          ma_chitiet: '',
          ten_chitiet: '',
          du_no_dau_ky: 0,
          du_co_dau_ky: 0,
          trang_thai: 1,
          ghi_chu: ''
        };
      }
      this.subAccountDrawer.showForm = true;
    },
    closeSubAccountForm() {
      this.subAccountDrawer.showForm = false;
      // Optionally reset form
      this.$refs.subAccountForm && this.$refs.subAccountForm.resetFields();
    },
    async submitSubAccountForm() {
      this.$refs.subAccountForm.validate(async (valid) => {
        if (!valid) return;
        this.subAccountDrawer.formLoading = true;
        try {
          const payload = {
            table_code: 'tbldmtaikhoan_chitiet',
            ...this.subAccountDrawer.formData
          };
          // Convert boolean fields to 1/0 if needed
          payload.trang_thai = this.subAccountDrawer.formData.trang_thai ? 1 : 0;
          await service.post(`${baseUrl}/dm/upsert`, payload);
          this.$message.success(this.subAccountDrawer.isEdit ? 'Cập nhật thành công' : 'Thêm mới thành công');
          this.subAccountDrawer.showForm = false;
          // Sau khi thêm/sửa thành công, fetch lại sub-accounts, tổng và accounts để cập nhật tổng dư nợ/có
          await this.fetchSubAccounts();
          await this.fetchSubAccountBalance();
          await this.updateMainAccountBalance();
          await this.fetchAccounts();
        } catch (e) {
          this.$message.error('Có lỗi xảy ra khi lưu dữ liệu');
        } finally {
          this.subAccountDrawer.formLoading = false;
        }
      });
    },
    // Thêm method updateMainAccountBalance để cập nhật dư nợ/có đầu kỳ của tài khoản chính
    async updateMainAccountBalance() {
      // Lấy tổng dư nợ/có đầu kỳ từ subAccountDrawer.totalDuNoDauKy và totalDuCoDauKy
      const totalDuNo = this.subAccountDrawer.totalDuNoDauKy;
      const totalDuCo = this.subAccountDrawer.totalDuCoDauKy;
      // Gọi API cập nhật tài khoản chính
      try {
        const payload = {
          table_code: 'tbldmtaikhoan',
          mst: this.subAccountDrawer.formData.mst || (this.subAccountDrawer.accounts[0] && this.subAccountDrawer.accounts[0].mst) || '',
          sohieutk: this.subAccountDrawer.sohieutk,
          du_no_dau_ky: totalDuNo,
          du_co_dau_ky: totalDuCo
        };
        await service.post(`${baseUrl}/dm/taikhoan/update-balance`, payload);
      } catch (e) {
        // Không báo lỗi lên UI, chỉ log
        console.error('Lỗi cập nhật dư nợ/có tài khoản chính:', e);
      }
    },
    handleSubAccountFormSuccess() {
      this.subAccountDrawer.showForm = false;
      this.fetchSubAccounts();
      this.fetchAccounts();
    },
    async fetchSubAccountBalance() {
      try {
        const payload = {
          sohieutk: this.subAccountDrawer.sohieutk,
          table_code: 'tbldmtaikhoan_chitiet'
        };
        const res = await service.post(`${baseUrl}/dm/taikhoan-chitiet/get-balance`, payload);
        console.log('API /dm/taikhoan-chitiet/get-balance result:', res);
        if (res.data) {
          this.subAccountDrawer.totalDuNoDauKy = res.data.du_no_dau_ky || 0;
          this.subAccountDrawer.totalDuCoDauKy = res.data.du_co_dau_ky || 0;
        } else {
          this.subAccountDrawer.totalDuNoDauKy = 0;
          this.subAccountDrawer.totalDuCoDauKy = 0;
        }
      } catch (e) {
        this.subAccountDrawer.totalDuNoDauKy = 0;
        this.subAccountDrawer.totalDuCoDauKy = 0;
      }
    },
    async handleDisableSubAccount(row) {
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
        this.subAccountDrawer.loading = true;
        const payload = {
          table_code: 'tbldmtaikhoan_chitiet',
          mst: row.mst,
          sohieutk: row.sohieutk,
          ma_chitiet: row.ma_chitiet,
          trang_thai: 0
        };
        await service.post(`${baseUrl}/dm/update-status`, payload);
        this.$message.success('Hủy kích hoạt tài khoản chi tiết thành công');
        this.fetchSubAccounts();
        await this.fetchSubAccountBalance(); // Lấy tổng mới nhất
        await this.updateMainAccountBalance(); // Cập nhật số dư tài khoản cha
        this.fetchAccounts();
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('Có lỗi xảy ra khi Hủy kích hoạt tài khoản chi tiết');
        }
      } finally {
        this.subAccountDrawer.loading = false;
      }
    },
    async handleEnableSubAccount(row) {
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
        this.subAccountDrawer.loading = true;
        const payload = {
          table_code: 'tbldmtaikhoan_chitiet',
          mst: row.mst,
          sohieutk: row.sohieutk,
          ma_chitiet: row.ma_chitiet,
          trang_thai: 1
        };
        await service.post(`${baseUrl}/dm/update-status`, payload);
        this.$message.success('Kích hoạt tài khoản chi tiết thành công');
        this.fetchSubAccounts();
        await this.fetchSubAccountBalance(); // Lấy tổng mới nhất
        await this.updateMainAccountBalance(); // Cập nhật số dư tài khoản cha
        this.fetchAccounts();
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('Có lỗi xảy ra khi kích hoạt tài khoản chi tiết');
        }
      } finally {
        this.subAccountDrawer.loading = false;
      }
    },
    formatVND(value) {
      if (!value) return '';
      return Number(value).toLocaleString('vi-VN') + ' ₫';
    },
    parseVND(value) {
      return Number((value || '').replace(/[^\d]/g, '')) || 0;
    },
    onInputDuNo(val) {
      this.subAccountDrawer.totalDuNoDauKy = this.parseVND(val);
      this.formattedDuNo = this.formatVND(this.subAccountDrawer.totalDuNoDauKy);
    },
    onInputDuCo(val) {
      this.subAccountDrawer.totalDuCoDauKy = this.parseVND(val);
      this.formattedDuCo = this.formatVND(this.subAccountDrawer.totalDuCoDauKy);
    },
  },
  computed: {
    totalDuNoDauKy() {
      return this.subAccountDrawer.totalDuNoDauKy;
    },
    totalDuCoDauKy() {
      return this.subAccountDrawer.totalDuCoDauKy;
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
  font-size: 13px;
  border-radius: 6px;
  overflow: hidden;
}

.el-table th, .el-table td {
  padding: 8px 12px !important;
  vertical-align: middle;
  white-space: nowrap;
}

.el-table th {
  background: #f5f7fa;
  font-weight: 600;
  color: #333;
}

.el-table .cell {
  padding: 0 !important;
  line-height: 1.6;
}

.el-table__body tr:hover > td {
  background: #f0f9ff !important;
}

.el-table .el-tag {
  margin: 0 auto;
}

.el-table .el-button {
  min-width: 70px;
}

.el-table .action-btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.total-balance-info {
  display: flex;
  gap: 32px;
  align-items: center;
  background: #fff8f8;
  border-radius: 8px;
  padding: 8px 16px;
  margin: 0;
}

.drawer-content-padding {
  padding: 24px;
}

.custom-drawer-title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 10px;
  padding-left: 16px;
}
.custom-drawer-title .sohieutk-highlight {
  color: #d32f2f;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1px;
}
.highlight-ct {
  color: #d32f2f !important;
  font-weight: bold;
  font-size: 12px;
  background: transparent !important;
}
/* Tùy chỉnh màu nền và màu chữ cho el-tag info plain nổi bật hơn */
:deep(.el-tag--info.is-plain) {
  background-color: #fff3e0 !important; /* cam nhạt nổi bật */
  color: #e65100 !important; /* cam đậm cho text */
  border-color: #ffb74d !important;
  font-weight: bold;
  font-size: 15px;
}
:deep(.el-drawer__body) {
  padding-top: 0 !important;
}
:deep(.el-drawer__header) {
  display: none !important;
}
:deep(.el-drawer) {
  padding-top: 0 !important;
}
:deep(.el-drawer__wrapper) {
  padding-top: 0 !important;
}
:deep(.el-drawer__container) {
  padding-top: 0 !important;
}
.balance-label {
  font-weight: 600;
  font-size: 12px;
  color: #222;
}
.balance-pagination-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 0 0;
  padding: 0 8px;
}
.balance-input {
  font-size: 13px;
  font-weight: bold;
  width: 160px;
  border-radius: 6px;
  text-align: right;
  background: #fff0f0;
}
.balance-input.credit .el-input__inner {
  color: #219653 !important;
  background: #e6f9f0 !important;
  font-weight: bold;
  font-size: 13px !important;
}
.balance-input.debit .el-input__inner {
  color: #d32f2f !important;
  background: #fff0f0 !important;
  font-weight: bold;
}
</style>
<style>
.total-balance-info .el-input__inner {
  color: #d32f2f !important;
  font-weight: bold;
  font-size: 13px;
  background: #fff0f0;
}
</style>
<style>
.el-drawer__header {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
  height: 0 !important;
  min-height: 0 !important;
}
</style>
<style>
.balance-input.credit .el-input__inner,
.el-input.balance-input.credit .el-input__inner,
.el-input__inner.balance-input.credit,
.el-input__inner.balance-input.credit:focus {
  color: #219653 !important;
  background: #e6f9f0 !important;
  font-weight: bold !important;
  font-size: 13px !important;
  border-color: #b2dfdb !important;
}
</style>