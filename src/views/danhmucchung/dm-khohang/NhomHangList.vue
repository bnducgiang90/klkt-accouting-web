<template>
  <div class="nhomhang-list-container">
    <el-card>
      <div class="toolbar">
        <el-input
          v-model="searchQuery"
          placeholder="Tìm kiếm mã nhóm hoặc tên nhóm"
          clearable
          class="search-input"
          @keyup.enter.native="handleSearch"
          :disabled="!selectedKho"
          size="mini"
        />
        <el-button type="primary" icon="el-icon-search" @click="handleSearch" :disabled="!selectedKho" size="mini">Tìm kiếm</el-button>
      </div>
      <div v-if="!selectedKho" class="empty">Chọn kho hàng để xem nhóm hàng</div>
      <div v-else class="table-scroll-x">
        <el-table
          :data="tableDataWithAddRow"
          border
          style="width: 100%"
          v-loading="loading"
          empty-text="Không có dữ liệu"
          max-height="500"
          highlight-current-row
          size="mini"
          @current-change="row => $emit('select', row)"
          :row-class-name="rowClassName"
        >
          <el-table-column type="index" label="STT" width="70" align="center" :index="indexMethod" />
          <el-table-column prop="ma_nhom" label="Mã nhóm" width="100" align="center">
            <template slot-scope="scope">
              <template v-if="isEditing(scope.row)">
                <el-input v-model="editForm.ma_nhom" maxlength="20" :disabled="editMode==='edit'" size="mini" />
              </template>
              <template v-else>
                {{ scope.row.ma_nhom }}
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="ten_nhom" label="Tên nhóm" min-width="200">
            <template slot-scope="scope">
              <template v-if="isEditing(scope.row)">
                <el-input v-model="editForm.ten_nhom" maxlength="50" size="mini" />
              </template>
              <template v-else>
                <span class="wrap-text">{{ scope.row.ten_nhom }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="sohieutk" label="Số hiệu TK" width="100" align="center">
            <template slot-scope="scope">
              <template v-if="isEditing(scope.row)">
                <el-input v-model="editForm.sohieutk" maxlength="10" size="mini" />
              </template>
              <template v-else>
                {{ scope.row.sohieutk }}
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="ma_kho" label="Mã kho" width="100" align="center">
            <template slot-scope="scope">
              <template v-if="isEditing(scope.row)">
                <el-input v-model="editForm.ma_kho" maxlength="10" size="mini" :disabled="true" />
              </template>
              <template v-else>
                {{ scope.row.ma_kho }}
              </template>
            </template>
          </el-table-column>
          <el-table-column label="Vật tư" width="120" align="center">
            <template slot-scope="scope">
              <template v-if="!scope.row._isAddRow">
                <el-tooltip content="Xem vật tư của nhóm" placement="top">
                  <el-button 
                    type="info" 
                    size="mini" 
                    @click="openVatTuDrawer(scope.row)"
                    style="font-size: 11px; padding: 4px 8px;"
                  >
                    Vật tư (<span class="vat-tu-count">{{ scope.row.total_vattu || 0 }}</span>)
                  </el-button>
                </el-tooltip>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="Tài sản" width="120" align="center">
            <template slot-scope="scope">
              <template v-if="!scope.row._isAddRow">
                <el-tooltip content="Xem tài sản của nhóm" placement="top">
                  <el-button 
                    type="warning" 
                    size="mini" 
                    @click="openTaiSanDrawer(scope.row)"
                    style="font-size: 11px; padding: 4px 8px;"
                  >
                    Tài sản (<span class="tai-san-count">{{ scope.row.total_taisan || 0 }}</span>)
                  </el-button>
                </el-tooltip>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="Action" width="200" align="center" fixed="right">
            <template slot-scope="scope">
              <template v-if="isEditing(scope.row)">
                <el-button type="success" icon="el-icon-check" circle size="mini" @click="saveEdit(scope.row)" />
                <el-button type="danger" icon="el-icon-close" circle size="mini" @click="cancelEdit" />
              </template>
              <template v-else-if="scope.row._isAddRow">
                <el-tooltip content="Thêm nhóm" placement="top">
                  <el-button type="success" icon="el-icon-plus" circle size="mini" @click="startAdd" />
                </el-tooltip>
              </template>
              <template v-else>
                <el-tooltip content="Sửa nhóm" placement="top">
                  <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="startEdit(scope.row)" />
                </el-tooltip>
                <el-tooltip content="Xóa nhóm" placement="top">
                  <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteRow(scope.row)" />
                </el-tooltip>
                <el-tooltip content="Thêm vật tư" placement="top">
                  <el-button type="success" icon="el-icon-box" circle size="mini" @click="goToAddVatTu(scope.row)" />
                </el-tooltip>
                <el-tooltip content="Thêm tài sản" placement="top">
                  <el-button type="warning" icon="el-icon-office-building" circle size="mini" @click="goToAddTaiSan(scope.row)" />
                </el-tooltip>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="selectedKho" class="pagination-bar">
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

    <!-- Vật tư Drawer -->
    <el-drawer
      :visible.sync="vatTuDrawer.visible"
      size="70%"
      @close="closeVatTuDrawer"
    >
      <div class="custom-drawer-title">
        Danh sách vật tư của nhóm <span>{{ vatTuDrawer.ten_nhom }}</span>
        (<span class="manhom-highlight">{{ vatTuDrawer.ma_nhom }}</span>)
        - Kho: <span class="makho-highlight">{{ vatTuDrawer.ma_kho }}</span>
      </div>
      <div class="drawer-content-padding">
        <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center; justify-content: space-between;">
          <div style="display: flex; gap: 10px; align-items: center;">
            <el-input
              v-model="vatTuDrawer.searchQuery"
              placeholder="Nhập mã vật tư hoặc tên vật tư để tìm kiếm"
              clearable
              style="width: 300px;"
              @keyup.enter.native="fetchVatTu"
            />
            <el-button type="primary" icon="el-icon-search" @click="fetchVatTu">Tìm kiếm</el-button>
          </div>
          <el-button type="success" icon="el-icon-plus" @click="openVatTuForm(false)">Thêm mới</el-button>
        </div>
        
        <el-table
          :data="vatTuDrawer.materials"
          border
          style="width: 100%"
          v-loading="vatTuDrawer.loading"
          empty-text="Không có dữ liệu"
          max-height="400"
        >
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
          <el-table-column prop="trang_thai" label="Trạng thái" width="100" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.trang_thai === 1 ? 'success' : 'danger'">
                {{ scope.row.trang_thai === 1 ? 'Hoạt động' : 'Vô hiệu hóa' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Action" width="200">
            <template slot-scope="scope">
              <div class="action-btn-group">
                <el-button type="primary" size="small" icon="el-icon-edit" @click="openVatTuForm(true, scope.row)">Sửa</el-button>
                <el-button 
                  :type="scope.row.trang_thai === 1 ? 'danger' : 'warning'" 
                  size="small" 
                  :icon="scope.row.trang_thai === 1 ? 'el-icon-delete' : 'el-icon-check'" 
                  @click="scope.row.trang_thai === 1 ? handleDisableVatTu(scope.row) : handleEnableVatTu(scope.row)"
                >
                  {{ scope.row.trang_thai === 1 ? 'Disable' : 'Enable' }}
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        
        <div style="margin-top: 20px; text-align: right;">
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :current-page="vatTuDrawer.pagination.page"
            :page-size="vatTuDrawer.pagination.pageSize"
            :total="vatTuDrawer.pagination.total"
            @current-change="handleVatTuPageChange"
          />
        </div>

        <!-- Vật tư Form Inline -->
        <div v-if="vatTuDrawer.showForm" style="margin-top: 24px; background: #fafbfc; padding: 24px; border-radius: 8px;">
          <el-form
            ref="vatTuForm"
            :model="vatTuDrawer.formData"
            :rules="vatTuDrawer.rules"
            label-width="140px"
            label-position="left"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="MST" prop="mst">
                  <el-input v-model="vatTuDrawer.formData.mst" placeholder="MST" clearable readonly />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Số hiệu TK" prop="sohieutk">
                  <el-input v-model="vatTuDrawer.formData.sohieutk" placeholder="Số hiệu tài khoản" clearable readonly />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Mã kho" prop="ma_kho">
                  <el-input v-model="vatTuDrawer.formData.ma_kho" placeholder="Mã kho" clearable readonly />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Mã nhóm" prop="ma_nhom">
                  <el-input v-model="vatTuDrawer.formData.ma_nhom" placeholder="Mã nhóm" clearable readonly />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Mã vật tư" prop="ma_vattu">
                  <el-input v-model="vatTuDrawer.formData.ma_vattu" placeholder="Nhập mã vật tư" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Tên vật tư" prop="ten_vattu">
                  <el-input v-model="vatTuDrawer.formData.ten_vattu" placeholder="Nhập tên vật tư" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Đơn vị tính" prop="dvt">
                  <el-input v-model="vatTuDrawer.formData.dvt" placeholder="Nhập đơn vị tính" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Năm" prop="nam">
                  <el-input-number v-model="vatTuDrawer.formData.nam" :min="2000" :max="2100" style="width: 100%" placeholder="Năm" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Lượng đầu kỳ" prop="luong_dau_ky">
                  <el-input-number v-model="vatTuDrawer.formData.luong_dau_ky" :min="0" style="width: 100%" placeholder="0" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Giá trị đầu kỳ" prop="gia_tri_dau_ky">
                  <el-input-number v-model="vatTuDrawer.formData.gia_tri_dau_ky" :min="0" style="width: 100%" placeholder="0" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Hệ số quy đổi" prop="he_so_quy_doi">
                  <el-input-number v-model="vatTuDrawer.formData.he_so_quy_doi" :min="0" style="width: 100%" placeholder="0" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Mã đơn vị quy đổi" prop="ma_don_vi_quy_doi">
                  <el-input v-model="vatTuDrawer.formData.ma_don_vi_quy_doi" placeholder="Nhập mã đơn vị quy đổi" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Trạng thái" prop="trang_thai">
                  <el-switch v-model="vatTuDrawer.formData.trang_thai" :active-value="1" :inactive-value="0" active-text="Hoạt động" inactive-text="Ngừng hoạt động" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="Vị trí lưu trữ" prop="vi_tri_luu_tru">
              <el-input v-model="vatTuDrawer.formData.vi_tri_luu_tru" placeholder="Nhập vị trí lưu trữ" clearable />
            </el-form-item>
            <el-form-item label="Ghi chú" prop="ghi_chu">
              <el-input v-model="vatTuDrawer.formData.ghi_chu" type="textarea" :rows="2" placeholder="Nhập ghi chú (nếu có)" />
            </el-form-item>
          </el-form>
          <div style="text-align: left; margin-top: 16px;">
            <el-button @click="closeVatTuForm">Hủy</el-button>
            <el-button type="primary" @click="submitVatTuForm" :loading="vatTuDrawer.formLoading">
              {{ vatTuDrawer.isEdit ? 'Cập nhật' : 'Thêm mới' }}
            </el-button>
          </div>
        </div>
      </div>
    </el-drawer>

    <!-- Tài sản Drawer -->
    <el-drawer
      :visible.sync="taiSanDrawer.visible"
      size="70%"
      @close="closeTaiSanDrawer"
    >
      <div class="custom-drawer-title">
        Danh sách tài sản của nhóm <span>{{ taiSanDrawer.ten_nhom }}</span>
        (<span class="manhom-highlight">{{ taiSanDrawer.ma_nhom }}</span>)
        - Kho: <span class="makho-highlight">{{ taiSanDrawer.ma_kho }}</span>
      </div>
      <div class="drawer-content-padding">
        <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center; justify-content: space-between;">
          <div style="display: flex; gap: 10px; align-items: center;">
            <el-input
              v-model="taiSanDrawer.searchQuery"
              placeholder="Nhập mã tài sản hoặc tên tài sản để tìm kiếm"
              clearable
              style="width: 300px;"
              @keyup.enter.native="fetchTaiSan"
            />
            <el-button type="primary" icon="el-icon-search" @click="fetchTaiSan">Tìm kiếm</el-button>
          </div>
          <el-button type="success" icon="el-icon-plus" @click="openTaiSanForm(false)">Thêm mới</el-button>
        </div>
        
        <el-table
          :data="taiSanDrawer.assets"
          border
          style="width: 100%"
          v-loading="taiSanDrawer.loading"
          empty-text="Không có dữ liệu"
          max-height="400"
        >
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
          <el-table-column prop="nam_sanxuat" label="Năm sản xuất" width="120" align="center">
            <template slot-scope="scope">
              {{ formatNumber(scope.row.nam_sanxuat) }}
            </template>
          </el-table-column>
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
          <el-table-column prop="giatri_conlai" label="Giá trị còn lại" width="130" align="right">
            <template slot-scope="scope">
              {{ formatCurrency(scope.row.giatri_conlai) }}
            </template>
          </el-table-column>
          <el-table-column prop="trang_thai" label="Trạng thái" width="100" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.trang_thai === 1 ? 'success' : 'danger'">
                {{ scope.row.trang_thai === 1 ? 'Hoạt động' : 'Vô hiệu hóa' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Action" width="200">
            <template slot-scope="scope">
              <div class="action-btn-group">
                <el-button type="primary" size="small" icon="el-icon-edit" @click="openTaiSanForm(true, scope.row)">Sửa</el-button>
                <el-button 
                  :type="scope.row.trang_thai === 1 ? 'danger' : 'warning'" 
                  size="small" 
                  :icon="scope.row.trang_thai === 1 ? 'el-icon-delete' : 'el-icon-check'" 
                  @click="scope.row.trang_thai === 1 ? handleDisableTaiSan(scope.row) : handleEnableTaiSan(scope.row)"
                >
                  {{ scope.row.trang_thai === 1 ? 'Disable' : 'Enable' }}
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        
        <div style="margin-top: 20px; text-align: right;">
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :current-page="taiSanDrawer.pagination.page"
            :page-size="taiSanDrawer.pagination.pageSize"
            :total="taiSanDrawer.pagination.total"
            @current-change="handleTaiSanPageChange"
          />
        </div>

        <!-- Tài sản Form Inline -->
        <div v-if="taiSanDrawer.showForm" style="margin-top: 24px; background: #fafbfc; padding: 24px; border-radius: 8px;">
          <el-form
            ref="taiSanForm"
            :model="taiSanDrawer.formData"
            :rules="taiSanDrawer.rules"
            label-width="140px"
            label-position="left"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="MST" prop="mst">
                  <el-input v-model="taiSanDrawer.formData.mst" placeholder="MST" clearable readonly />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Số hiệu TK" prop="sohieutk">
                  <el-input v-model="taiSanDrawer.formData.sohieutk" placeholder="Số hiệu tài khoản" clearable readonly />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Mã kho" prop="ma_kho">
                  <el-input v-model="taiSanDrawer.formData.ma_kho" placeholder="Mã kho" clearable readonly />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Mã nhóm" prop="ma_nhom">
                  <el-input v-model="taiSanDrawer.formData.ma_nhom" placeholder="Mã nhóm" clearable readonly />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Mã tài sản" prop="ma_taisan">
                  <el-input v-model="taiSanDrawer.formData.ma_taisan" placeholder="Nhập mã tài sản" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Tên tài sản" prop="ten_taisan">
                  <el-input v-model="taiSanDrawer.formData.ten_taisan" placeholder="Nhập tên tài sản" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Đơn vị tính" prop="dvt">
                  <el-input v-model="taiSanDrawer.formData.dvt" placeholder="Nhập đơn vị tính" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Số thẻ" prop="so_the">
                  <el-input v-model="taiSanDrawer.formData.so_the" placeholder="Nhập số thẻ" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Ngày lập thẻ" prop="ngaylap_the">
                  <el-date-picker v-model="taiSanDrawer.formData.ngaylap_the" type="date" placeholder="Chọn ngày" style="width: 100%;" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Hãng tài sản" prop="hang_taisan">
                  <el-input v-model="taiSanDrawer.formData.hang_taisan" placeholder="Nhập hãng tài sản" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Công suất thiết kế" prop="congsuat_thietke">
                  <el-input v-model="taiSanDrawer.formData.congsuat_thietke" placeholder="Nhập công suất thiết kế" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Nước sản xuất" prop="nuoc_sanxuat">
                  <el-input v-model="taiSanDrawer.formData.nuoc_sanxuat" placeholder="Nhập nước sản xuất" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Năm sản xuất" prop="nam_sanxuat">
                  <el-input-number v-model="taiSanDrawer.formData.nam_sanxuat" :min="1900" :max="2100" style="width: 100%" placeholder="Năm sản xuất" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Hiện trạng" prop="hientrang">
                  <el-input v-model="taiSanDrawer.formData.hientrang" placeholder="Nhập hiện trạng" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Mã đơn vị quản lý" prop="donvi_quanly">
                  <el-input v-model="taiSanDrawer.formData.donvi_quanly" placeholder="Nhập mã đơn vị quản lý" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Tên đơn vị quản lý" prop="ten_donvi_quanly">
                  <el-input v-model="taiSanDrawer.formData.ten_donvi_quanly" placeholder="Nhập tên đơn vị quản lý" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Nguồn vốn" prop="nguonvon">
                  <el-input v-model="taiSanDrawer.formData.nguonvon" placeholder="Nhập nguồn vốn" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Số biên bản bàn giao" prop="so_bienban_bangiao">
                  <el-input v-model="taiSanDrawer.formData.so_bienban_bangiao" placeholder="Nhập số biên bản bàn giao" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Ngày biên bản bàn giao" prop="ngay_bienban_bangiao">
                  <el-date-picker v-model="taiSanDrawer.formData.ngay_bienban_bangiao" type="date" placeholder="Chọn ngày" style="width: 100%;" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Ngày điều chỉnh" prop="ngay_dieuchinh">
                  <el-date-picker v-model="taiSanDrawer.formData.ngay_dieuchinh" type="date" placeholder="Chọn ngày" style="width: 100%;" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Lý do điều chỉnh" prop="lydo_dieuchinh">
                  <el-input v-model="taiSanDrawer.formData.lydo_dieuchinh" placeholder="Nhập lý do điều chỉnh" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Số năm phân bổ" prop="so_nam_phanbo">
                  <el-input-number v-model="taiSanDrawer.formData.so_nam_phanbo" :min="0" style="width: 100%" placeholder="0" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Kỳ phân bổ" prop="ky_phanbo">
                  <el-input v-model="taiSanDrawer.formData.ky_phanbo" placeholder="Nhập kỳ phân bổ" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Trạng thái" prop="trang_thai">
                  <el-switch v-model="taiSanDrawer.formData.trang_thai" :active-value="1" :inactive-value="0" active-text="Hoạt động" inactive-text="Ngừng hoạt động" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="Số lượng đầu kỳ" prop="soluong_dauky">
              <el-input-number v-model="taiSanDrawer.formData.soluong_dauky" :min="0" style="width: 100%" placeholder="0" />
            </el-form-item>
            <el-form-item label="Nguyên giá" prop="nguyengia">
              <el-input-number v-model="taiSanDrawer.formData.nguyengia" :min="0" style="width: 100%" placeholder="0" />
            </el-form-item>
            <el-form-item label="Hao mòn lũy kế" prop="haomon_luyke">
              <el-input-number v-model="taiSanDrawer.formData.haomon_luyke" :min="0" style="width: 100%" placeholder="0" />
            </el-form-item>
            <el-form-item label="Giá trị còn lại" prop="giatri_conlai">
              <el-input-number v-model="taiSanDrawer.formData.giatri_conlai" :min="0" style="width: 100%" placeholder="0" />
            </el-form-item>
          </el-form>
          <div style="text-align: left; margin-top: 16px;">
            <el-button @click="closeTaiSanForm">Hủy</el-button>
            <el-button type="primary" @click="submitTaiSanForm" :loading="taiSanDrawer.formLoading">
              {{ taiSanDrawer.isEdit ? 'Cập nhật' : 'Thêm mới' }}
            </el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import service from '@/utils/request'
import { getUser } from '@/utils/auth'
const baseUrl = process.env.VUE_APP_BASE_API || ''
export default {
  name: 'NhomHangList',
  props: {
    selectedKho: Object,
    selectedNhom: Object
  },
  data() {
    return {
      nhomList: [],
      loading: false,
      searchQuery: '',
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      editingKey: null,
      editForm: {},
      editMode: '', // 'add' | 'edit'
      isAdding: false,
      vatTuDrawer: {
        visible: false,
        ten_nhom: '',
        ma_nhom: '',
        ma_kho: '',
        mst: '',
        sohieutk: '',
        searchQuery: '',
        materials: [],
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
          ma_kho: '',
          ma_nhom: '',
          ma_vattu: '',
          ten_vattu: '',
          dvt: '',
          luong_dau_ky: 0,
          gia_tri_dau_ky: 0,
          he_so_quy_doi: 0,
          ma_don_vi_quy_doi: '',
          vi_tri_luu_tru: '',
          nam: new Date().getFullYear(),
          ghi_chu: '',
          trang_thai: 1
        },
        rules: {
          ma_vattu: [
            { required: true, message: 'Vui lòng nhập mã vật tư', trigger: 'blur' }
          ],
          ten_vattu: [
            { required: true, message: 'Vui lòng nhập tên vật tư', trigger: 'blur' }
          ],
          dvt: [
            { required: true, message: 'Vui lòng nhập đơn vị tính', trigger: 'blur' }
          ]
        },
        formLoading: false
      },
      taiSanDrawer: {
        visible: false,
        ten_nhom: '',
        ma_nhom: '',
        ma_kho: '',
        mst: '',
        sohieutk: '',
        searchQuery: '',
        assets: [],
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
          ma_kho: '',
          ma_nhom: '',
          ma_taisan: '',
          ten_taisan: '',
          dvt: '',
          so_the: '',
          ngaylap_the: '',
          hang_taisan: '',
          congsuat_thietke: '',
          nuoc_sanxuat: '',
          nam_sanxuat: new Date().getFullYear(),
          hientrang: '',
          donvi_quanly: '',
          ten_donvi_quanly: '',
          nguonvon: '',
          so_bienban_bangiao: '',
          ngay_bienban_bangiao: '',
          ngay_dieuchinh: '',
          lydo_dieuchinh: '',
          soluong_dauky: 0,
          nguyengia: 0,
          haomon_luyke: 0,
          giatri_conlai: 0,
          so_nam_phanbo: 0,
          ky_phanbo: '',
          trang_thai: 1
        },
        rules: {
          ma_taisan: [
            { required: true, message: 'Vui lòng nhập mã tài sản', trigger: 'blur' }
          ],
          ten_taisan: [
            { required: true, message: 'Vui lòng nhập tên tài sản', trigger: 'blur' }
          ],
          dvt: [
            { required: true, message: 'Vui lòng nhập đơn vị tính', trigger: 'blur' }
          ]
        },
        formLoading: false
      }
    }
  },
  computed: {
    tableDataWithAddRow() {
      const addRow = { _isAddRow: true }
      if (this.isAdding) {
        return [...this.nhomList, this.editForm]
      }
      return [...this.nhomList, addRow]
    }
  },
  watch: {
    selectedKho: {
      immediate: true,
      handler(newVal) {
        this.pagination.page = 1
        this.nhomList = []
        this.pagination.total = 0
        this.cancelEdit()
        if (newVal) {
          this.fetchNhomHang()
        }
      }
    }
  },
  mounted() {
    // Cập nhật số lượng vật tư khi component được mount
    // if (this.selectedKho && this.nhomList.length > 0) {
    //   this.nhomList.forEach(nhom => {
    //     this.updateVatTuCount(nhom);
    //   });
    // }
  },
  methods: {
    async fetchNhomHang() {
      if (!this.selectedKho) return
      this.loading = true
      try {
        const payload = {
          table_code: 'tbldmnhomhang',
          sohieutk: this.selectedKho.sohieutk || '',
          ma_kho: this.selectedKho.ma_kho || '',
          mst: this.selectedKho.mst || '',
          ma_nhom: this.searchQuery || '',
          ten_nhom: this.searchQuery || '',
          page: this.pagination.page,
          size: this.pagination.pageSize
        }
        const res = await service.post(`${baseUrl}/dm/search`, payload)
        this.nhomList = (res.data && res.data.items) ? res.data.items : []
        this.pagination.total = (res.data && res.data.total) ? res.data.total : 0
        
        // Cập nhật số lượng vật tư cho mỗi nhóm hàng
        // if (this.nhomList.length > 0) {
        //   this.nhomList.forEach(nhom => {
        //     this.updateVatTuCount(nhom);
        //   });
        // }
      } catch (e) {
        this.nhomList = []
        this.pagination.total = 0
        this.$message && this.$message.error('Lỗi tải danh sách nhóm hàng')
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      this.pagination.page = 1
      this.fetchNhomHang()
    },
    handlePageChange(page) {
      this.pagination.page = page
      this.fetchNhomHang()
    },
    indexMethod(index) {
      return (this.pagination.page - 1) * this.pagination.pageSize + index + 1
    },
    rowClassName({ row }) {
      return this.selectedNhom && row.ma_nhom === this.selectedNhom.ma_nhom ? 'selected-row' : ''
    },
    isEditing(row) {
      return this.editingKey === row.ma_nhom || (this.isAdding && row === this.editForm)
    },
    startEdit(row) {
      this.editingKey = row.ma_nhom
      this.editMode = 'edit'
      this.editForm = { ...row }
    },
    startAdd() {
      const user = getUser()
      this.editingKey = '__add__'
      this.editMode = 'add'
      this.isAdding = true
      this.editForm = {
        mst: user.user.user.taxCode,
        sohieutk: this.selectedKho.sohieutk,
        ma_kho: this.selectedKho.ma_kho,
        ma_nhom: '',
        ten_nhom: '',
        trang_thai: 1
      }
    },
    async saveEdit(row) {
      if (!this.editForm.ma_nhom || !this.editForm.sohieutk || !this.editForm.ten_nhom) {
        this.$message.error('Vui lòng nhập đủ thông tin')
        return
      }
      try {
        const payload = { ...this.editForm, table_code: 'tbldmnhomhang' }
        await service.post(`${baseUrl}/dm/upsert`, payload)
        this.$message.success(this.editMode === 'add' ? 'Thêm mới thành công' : 'Cập nhật thành công')
        this.cancelEdit()
        this.fetchNhomHang()
        
        // // Cập nhật số lượng vật tư cho nhóm hàng mới/sửa
        // if (this.editMode === 'add') {
        //   this.updateVatTuCount(this.editForm);
        // }
      } catch (e) {
        this.$message.error('Lỗi lưu nhóm hàng')
      }
    },
    cancelEdit() {
      this.editingKey = null
      this.editForm = {}
      this.editMode = ''
      this.isAdding = false
    },
    async deleteRow(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn xóa nhóm hàng "${row.ten_nhom}" (${row.ma_nhom})?`,
          'Xác nhận xóa',
          {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            type: 'warning',
            confirmButtonClass: 'el-button--danger'
          }
        )
        const payload = {
          table_code: 'tbldmnhomhang',
          mst: row.mst,
          sohieutk: row.sohieutk,
          ma_kho: row.ma_kho,
          ma_nhom: row.ma_nhom
        }
        await service.post(`${baseUrl}/dm/delete`, payload)
        this.$message.success('Xóa thành công')
        this.fetchNhomHang()
        
        // Cập nhật số lượng vật tư sau khi xóa nhóm hàng
        // this.updateVatTuCount(row);
      } catch (e) {
        if (e !== 'cancel') this.$message.error('Lỗi xóa nhóm hàng')
      }
    },
    goToAddVatTu(row) {
      this.$router.push({
        path: '/dm-vatu-hanghoa',
        query: {
          ma_kho: row.ma_kho,
          ma_nhom: row.ma_nhom,
          sohieutk: row.sohieutk,
          mst: row.mst,
          openAdd: 1
        }
      });
    },
    goToAddTaiSan(row) {
      this.$router.push({
        path: '/dm-taisan-hanghoa',
        query: {
          ma_kho: row.ma_kho,
          ma_nhom: row.ma_nhom,
          sohieutk: row.sohieutk,
          mst: row.mst,
          openAdd: 1
        }
      });
    },

    // Vật tư methods
    openVatTuDrawer(row) {
      this.vatTuDrawer.visible = true;
      this.vatTuDrawer.ten_nhom = row.ten_nhom;
      this.vatTuDrawer.ma_nhom = row.ma_nhom;
      this.vatTuDrawer.ma_kho = row.ma_kho;
      this.vatTuDrawer.mst = row.mst;
      this.vatTuDrawer.sohieutk = row.sohieutk;
      this.vatTuDrawer.searchQuery = '';
      this.vatTuDrawer.pagination.page = 1;
      this.vatTuDrawer.showForm = false;
      this.fetchVatTu();
      // this.updateVatTuCount(row);
    },

    closeVatTuDrawer() {
      this.vatTuDrawer.visible = false;
      this.vatTuDrawer.showForm = false;
    },

    async fetchVatTu() {
      this.vatTuDrawer.loading = true;
      try {
        const payload = {
          table_code: 'tbldmvattu_hanghoa',
          mst: this.vatTuDrawer.mst,
          sohieutk: this.vatTuDrawer.sohieutk,
          ma_kho: this.vatTuDrawer.ma_kho,
          ma_nhom: this.vatTuDrawer.ma_nhom,
          ma_vattu: this.vatTuDrawer.searchQuery || undefined,
          ten_vattu: this.vatTuDrawer.searchQuery || undefined,
          page: this.vatTuDrawer.pagination.page,
          pageSize: this.vatTuDrawer.pagination.pageSize,
        };
        const res = await service.post(`${baseUrl}/dm/search`, payload);
        this.vatTuDrawer.materials = (res.data && res.data.items) ? res.data.items : [];
        this.vatTuDrawer.pagination.total = (res.data && res.data.total) ? res.data.total : 0;
      } catch (e) {
        this.vatTuDrawer.materials = [];
        this.vatTuDrawer.pagination.total = 0;
        this.$message.error('Lỗi tải danh sách vật tư');
      } finally {
        this.vatTuDrawer.loading = false;
      }
    },

    handleVatTuPageChange(page) {
      this.vatTuDrawer.pagination.page = page;
      this.fetchVatTu();
    },

    openVatTuForm(isEdit, row = {}) {
      this.vatTuDrawer.isEdit = isEdit;
      if (isEdit && row) {
        this.vatTuDrawer.formData = {
          mst: row.mst || '',
          sohieutk: row.sohieutk || '',
          ma_kho: row.ma_kho || '',
          ma_nhom: row.ma_nhom || '',
          ma_vattu: row.ma_vattu || '',
          ten_vattu: row.ten_vattu || '',
          dvt: row.dvt || '',
          luong_dau_ky: row.luong_dau_ky || 0,
          gia_tri_dau_ky: row.gia_tri_dau_ky || 0,
          he_so_quy_doi: row.he_so_quy_doi || 0,
          ma_don_vi_quy_doi: row.ma_don_vi_quy_doi || '',
          vi_tri_luu_tru: row.vi_tri_luu_tru || '',
          nam: row.nam || new Date().getFullYear(),
          ghi_chu: row.ghi_chu || '',
          trang_thai: row.trang_thai != null ? row.trang_thai : 1
        };
      } else {
        this.vatTuDrawer.formData = {
          mst: this.vatTuDrawer.mst || '',
          sohieutk: this.vatTuDrawer.sohieutk || '',
          ma_kho: this.vatTuDrawer.ma_kho || '',
          ma_nhom: this.vatTuDrawer.ma_nhom || '',
          ma_vattu: '',
          ten_vattu: '',
          dvt: '',
          luong_dau_ky: 0,
          gia_tri_dau_ky: 0,
          he_so_quy_doi: 0,
          ma_don_vi_quy_doi: '',
          vi_tri_luu_tru: '',
          nam: new Date().getFullYear(),
          ghi_chu: '',
          trang_thai: 1
        };
      }
      this.vatTuDrawer.showForm = true;
    },

    closeVatTuForm() {
      this.vatTuDrawer.showForm = false;
      this.$refs.vatTuForm && this.$refs.vatTuForm.resetFields();
    },

    async submitVatTuForm() {
      this.$refs.vatTuForm.validate(async (valid) => {
        if (!valid) return;
        this.vatTuDrawer.formLoading = true;
        try {
          const payload = {
            table_code: 'tbldmvattu_hanghoa',
            ...this.vatTuDrawer.formData
          };
          await service.post(`${baseUrl}/dm/upsert`, payload);
          this.$message.success(this.vatTuDrawer.isEdit ? 'Cập nhật thành công' : 'Thêm mới thành công');
          this.vatTuDrawer.showForm = false;
          await this.fetchVatTu();
          // this.updateVatTuCount({ 
          //   ma_kho: this.vatTuDrawer.ma_kho, 
          //   ma_nhom: this.vatTuDrawer.ma_nhom,
          //   mst: this.vatTuDrawer.mst,
          //   sohieutk: this.vatTuDrawer.sohieutk
          // });
        } catch (e) {
          this.$message.error('Có lỗi xảy ra khi lưu dữ liệu');
        } finally {
          this.vatTuDrawer.formLoading = false;
        }
      });
    },

    async handleDisableVatTu(row) {
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
        this.vatTuDrawer.loading = true;
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
        await this.fetchVatTu();
        // this.updateVatTuCount({ 
        //   ma_kho: this.vatTuDrawer.ma_kho, 
        //   ma_nhom: this.vatTuDrawer.ma_nhom,
        //   mst: this.vatTuDrawer.mst,
        //   sohieutk: this.vatTuDrawer.sohieutk
        // });
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('Có lỗi xảy ra khi vô hiệu hóa vật tư');
        }
      } finally {
        this.vatTuDrawer.loading = false;
      }
    },

    async handleEnableVatTu(row) {
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
        this.vatTuDrawer.loading = true;
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
        await this.fetchVatTu();
        // this.updateVatTuCount({ 
        //   ma_kho: this.vatTuDrawer.ma_kho, 
        //   ma_nhom: this.vatTuDrawer.ma_nhom,
        //   mst: this.vatTuDrawer.mst,
        //   sohieutk: this.vatTuDrawer.sohieutk
        // });
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('Có lỗi xảy ra khi kích hoạt vật tư');
        }
      } finally {
        this.vatTuDrawer.loading = false;
      }
    },

    // async updateVatTuCount(row) {
    //   try {
    //     const payload = {
    //       table_code: 'tbldmvattu_hanghoa',
    //       mst: row.mst,
    //       sohieutk: row.sohieutk,
    //       ma_kho: row.ma_kho,
    //       ma_nhom: row.ma_nhom
    //     };
    //     // const res = await service.post(`${baseUrl}/dm/count`, payload);
    //     const count = res.data && res.data.count ? res.data.count : 0;
        
    //     // Cập nhật số lượng vật tư trong danh sách nhóm hàng
    //     const nhomIndex = this.nhomList.findIndex(n => 
    //       n.ma_nhom === row.ma_nhom && 
    //       n.ma_kho === row.ma_kho && 
    //       n.mst === row.mst
    //     );
    //     if (nhomIndex !== -1) {
    //       this.$set(this.nhomList[nhomIndex], 'vatTuCount', count);
    //     }
    //   } catch (e) {
    //     console.error('Lỗi cập nhật số lượng vật tư:', e);
    //     // Nếu có lỗi, set số lượng về 0
    //     const nhomIndex = this.nhomList.findIndex(n => 
    //       n.ma_nhom === row.ma_nhom && 
    //       n.ma_kho === row.ma_kho && 
    //       n.mst === row.mst
    //     );
    //     if (nhomIndex !== -1) {
    //       this.$set(this.nhomList[nhomIndex], 'vatTuCount', 0);
    //     }
    //   }
    // },

    // Tài sản methods
    openTaiSanDrawer(row) {
      this.taiSanDrawer.visible = true;
      this.taiSanDrawer.ten_nhom = row.ten_nhom;
      this.taiSanDrawer.ma_nhom = row.ma_nhom;
      this.taiSanDrawer.ma_kho = row.ma_kho;
      this.taiSanDrawer.mst = row.mst;
      this.taiSanDrawer.sohieutk = row.sohieutk;
      this.taiSanDrawer.searchQuery = '';
      this.taiSanDrawer.pagination.page = 1;
      this.taiSanDrawer.showForm = false;
      this.fetchTaiSan();
    },

    closeTaiSanDrawer() {
      this.taiSanDrawer.visible = false;
      this.taiSanDrawer.showForm = false;
    },

    async fetchTaiSan() {
      this.taiSanDrawer.loading = true;
      try {
        const payload = {
          table_code: 'tbldmtaisan',
          mst: this.taiSanDrawer.mst,
          sohieutk: this.taiSanDrawer.sohieutk,
          ma_kho: this.taiSanDrawer.ma_kho,
          ma_nhom: this.taiSanDrawer.ma_nhom,
          ma_taisan: this.taiSanDrawer.searchQuery || undefined,
          ten_taisan: this.taiSanDrawer.searchQuery || undefined,
          page: this.taiSanDrawer.pagination.page,
          pageSize: this.taiSanDrawer.pagination.pageSize,
        };
        const res = await service.post(`${baseUrl}/dm/search`, payload);
        this.taiSanDrawer.assets = (res.data && res.data.items) ? res.data.items : [];
        this.taiSanDrawer.pagination.total = (res.data && res.data.total) ? res.data.total : 0;
      } catch (e) {
        this.taiSanDrawer.assets = [];
        this.taiSanDrawer.pagination.total = 0;
        this.$message.error('Lỗi tải danh sách tài sản');
      } finally {
        this.taiSanDrawer.loading = false;
      }
    },

    handleTaiSanPageChange(page) {
      this.taiSanDrawer.pagination.page = page;
      this.fetchTaiSan();
    },

    openTaiSanForm(isEdit, row = {}) {
      this.taiSanDrawer.isEdit = isEdit;
      if (isEdit && row) {
        this.taiSanDrawer.formData = {
          mst: row.mst || '',
          sohieutk: row.sohieutk || '',
          ma_kho: row.ma_kho || '',
          ma_nhom: row.ma_nhom || '',
          ma_taisan: row.ma_taisan || '',
          ten_taisan: row.ten_taisan || '',
          dvt: row.dvt || '',
          so_the: row.so_the || '',
          ngaylap_the: row.ngaylap_the || '',
          hang_taisan: row.hang_taisan || '',
          congsuat_thietke: row.congsuat_thietke || '',
          nuoc_sanxuat: row.nuoc_sanxuat || '',
          nam_sanxuat: row.nam_sanxuat || new Date().getFullYear(),
          hientrang: row.hientrang || '',
          donvi_quanly: row.donvi_quanly || '',
          ten_donvi_quanly: row.ten_donvi_quanly || '',
          nguonvon: row.nguonvon || '',
          so_bienban_bangiao: row.so_bienban_bangiao || '',
          ngay_bienban_bangiao: row.ngay_bienban_bangiao || '',
          ngay_dieuchinh: row.ngay_dieuchinh || '',
          lydo_dieuchinh: row.lydo_dieuchinh || '',
          soluong_dauky: row.soluong_dauky || 0,
          nguyengia: row.nguyengia || 0,
          haomon_luyke: row.haomon_luyke || 0,
          giatri_conlai: row.giatri_conlai || 0,
          so_nam_phanbo: row.so_nam_phanbo || 0,
          ky_phanbo: row.ky_phanbo || '',
          trang_thai: row.trang_thai != null ? row.trang_thai : 1
        };
      } else {
        this.taiSanDrawer.formData = {
          mst: this.taiSanDrawer.mst || '',
          sohieutk: this.taiSanDrawer.sohieutk || '',
          ma_kho: this.taiSanDrawer.ma_kho || '',
          ma_nhom: this.taiSanDrawer.ma_nhom || '',
          ma_taisan: '',
          ten_taisan: '',
          dvt: '',
          so_the: '',
          ngaylap_the: '',
          hang_taisan: '',
          congsuat_thietke: '',
          nuoc_sanxuat: '',
          nam_sanxuat: new Date().getFullYear(),
          hientrang: '',
          donvi_quanly: '',
          ten_donvi_quanly: '',
          nguonvon: '',
          so_bienban_bangiao: '',
          ngay_bienban_bangiao: '',
          ngay_dieuchinh: '',
          lydo_dieuchinh: '',
          soluong_dauky: 0,
          nguyengia: 0,
          haomon_luyke: 0,
          giatri_conlai: 0,
          so_nam_phanbo: 0,
          ky_phanbo: '',
          trang_thai: 1
        };
      }
      this.taiSanDrawer.showForm = true;
    },

    closeTaiSanForm() {
      this.taiSanDrawer.showForm = false;
      this.$refs.taiSanForm && this.$refs.taiSanForm.resetFields();
    },

    async submitTaiSanForm() {
      this.$refs.taiSanForm.validate(async (valid) => {
        if (!valid) return;
        this.taiSanDrawer.formLoading = true;
        try {
          const payload = {
            table_code: 'tbldmtaisan',
            ...this.taiSanDrawer.formData
          };
          await service.post(`${baseUrl}/dm/upsert`, payload);
          this.$message.success(this.taiSanDrawer.isEdit ? 'Cập nhật thành công' : 'Thêm mới thành công');
          this.taiSanDrawer.showForm = false;
          await this.fetchTaiSan();
        } catch (e) {
          this.$message.error('Có lỗi xảy ra khi lưu dữ liệu');
        } finally {
          this.taiSanDrawer.formLoading = false;
        }
      });
    },

    async handleDisableTaiSan(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn vô hiệu hóa tài sản "${row.ten_taisan}" (${row.ma_taisan})?`,
          'Xác nhận vô hiệu hóa',
          {
            confirmButtonText: 'Vô hiệu hóa',
            cancelButtonText: 'Hủy',
            type: 'warning',
            confirmButtonClass: 'el-button--danger'
          }
        );
        this.taiSanDrawer.loading = true;
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
        this.$message.success('Vô hiệu hóa tài sản thành công');
        await this.fetchTaiSan();
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('Có lỗi xảy ra khi vô hiệu hóa tài sản');
        }
      } finally {
        this.taiSanDrawer.loading = false;
      }
    },

    async handleEnableTaiSan(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn kích hoạt tài sản "${row.ten_taisan}" (${row.ma_taisan})?`,
          'Xác nhận kích hoạt',
          {
            confirmButtonText: 'Kích hoạt',
            cancelButtonText: 'Hủy',
            type: 'warning',
            confirmButtonClass: 'el-button--success'
          }
        );
        this.taiSanDrawer.loading = true;
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
        await this.fetchTaiSan();
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('Có lỗi xảy ra khi kích hoạt tài sản');
        }
      } finally {
        this.taiSanDrawer.loading = false;
      }
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

    formatDate(value) {
      if (!value) return '';
      const date = new Date(value);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString('vi-VN');
    }
  }
}
</script>
<style scoped>
.nhomhang-list-container {
  padding: 8px 0 8px 0;
  height: 100%;
}
.toolbar {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 16px;
}
.search-input {
  width: 220px;
}
.pagination-bar {
  margin-top: 12px;
  text-align: right;
}
.table-scroll-x {
  overflow-x: auto;
}
.el-card {
  border-radius: 12px;
  box-shadow: 0 3px 16px rgba(0,0,0,0.06);
  background: #fff;
  padding: 8px 0 12px 0;
}
.el-table {
  border-radius: 16px;
  font-size: 12px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.el-table .cell {
  padding: 6px 0;
  font-size: 12px;
}
.el-table th {
  background: linear-gradient(90deg, var(--th-bg-start, #e3f0ff) 0%, var(--th-bg-end, #f8fbff) 100%);
  font-weight: 600;
  color: var(--brand-primary, #1a237e);
  font-size: 14px;
  padding: 10px 0;
  border-bottom: 1px solid #e3eaf2;
}
.el-table td {
  padding: 8px 0;
  font-size: 13px;
  color: #222;
}
.el-table__body tr:hover > td {
  background: #e3f2fd !important;
  border-left: 4px solid #1976d2;
}
.selected-row > td {
  background: #fffde7 !important;
  border-left: 4px solid #ff9800;
}
.action-btn {
  border-radius: 50%;
  background: #f5f5f5;
  border: none;
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 4px;
  font-size: 18px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  transition: background 0.2s, box-shadow 0.2s;
}
.action-btn.edit { color: #1976d2; }
.action-btn.add { color: #43a047; }
.action-btn.save { color: #388e3c; }
.action-btn.cancel { color: #e53935; }
.action-btn:hover { background: #e0e0e0; box-shadow: 0 2px 8px rgba(0,0,0,0.10); }
.empty {
  color: #888;
  font-style: italic;
  padding: 24px 0;
  text-align: center;
}
.nowrap-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
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
.wrap-text {
  white-space: pre-line;
  word-break: break-word;
  overflow-wrap: break-word;
}
@media screen and (max-width: 1200px) {
  .nhomhang-list-container {
    padding: 16px;
  }
  .el-table {
    font-size: 11px;
  }
  .el-table .cell {
    padding: 6px 0;
  }
}

/* Vật tư drawer styles */
.custom-drawer-title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 10px;
  padding-left: 16px;
}

.custom-drawer-title .manhom-highlight {
  color: #d32f2f;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1px;
}

.custom-drawer-title .makho-highlight {
  color: #1976d2;
  font-size: 18px;
  font-weight: bold;
}

.drawer-content-padding {
  padding: 24px;
}

.vat-tu-count {
  color: #d32f2f;
  font-weight: bold;
  font-size: 12px;
}

.tai-san-count {
  color: #f57c00;
  font-weight: bold;
  font-size: 12px;
}

.action-btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

/* Drawer header styles */
:deep(.el-drawer__header) {
  display: none !important;
}

:deep(.el-drawer__body) {
  padding-top: 0 !important;
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
</style> 