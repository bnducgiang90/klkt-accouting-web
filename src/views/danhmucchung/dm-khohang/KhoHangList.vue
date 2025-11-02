<template>
  <div class="khohang-list-container">
    <el-card>
      <div class="toolbar">
        <el-input
          v-model="searchQuery"
          placeholder="Tìm kiếm mã kho hoặc tên kho"
          clearable
          class="search-input"
          @keyup.enter.native="handleSearch"
          size="mini"
        />
        <el-button type="primary" icon="el-icon-search" @click="handleSearch" size="mini">Tìm kiếm</el-button>
      </div>
      <div class="table-scroll-x">
        <el-table
          :data="tableDataWithAddRow"
          border
          style="width: 100%"
          v-loading="loading"
          empty-text="Không có dữ liệu"
          max-height="500"
          highlight-current-row
          size="mini"
          @current-change="handleCurrentChange"
          :row-class-name="rowClassName"
        >
          <el-table-column type="index" label="STT" width="70" align="center" :index="indexMethod" />
          <el-table-column prop="ma_kho" label="Mã kho" width="200" align="center">
            <template slot-scope="scope">
              <template v-if="isEditing(scope.row)">
                <el-input v-model="editForm.ma_kho" maxlength="10" :disabled="editMode==='edit'" size="mini" />
              </template>
              <template v-else>
                {{ scope.row.ma_kho }}
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="ten_kho" label="Tên kho" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <template v-if="isEditing(scope.row)">
                <el-input v-model="editForm.ten_kho" maxlength="100" size="mini" />
              </template>
              <template v-else>
                <span class="nowrap-ellipsis">{{ scope.row.ten_kho }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="sohieutk" label="Số hiệu TK" width="200" align="center">
            <template slot-scope="scope">
              <template v-if="isEditing(scope.row)">
                <el-input v-model="editForm.sohieutk" maxlength="10" size="mini" />
              </template>
              <template v-else>
                {{ scope.row.sohieutk }}
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="trang_thai" label="Trạng thái" width="120" align="center">
            <template slot-scope="scope">
              <template v-if="isEditing(scope.row)">
                <el-switch v-model="editForm.trang_thai" active-value="1" inactive-value="0" />
              </template>
              <template v-else-if="scope.row._isAddRow">
                <!-- Empty for add row -->
              </template>
              <template v-else>
                <el-tag :type="scope.row.trang_thai === 1 ? 'success' : 'danger'" size="mini">
                  {{ scope.row.trang_thai === 1 ? 'Hoạt động' : 'Hủy kích hoạt' }}
                </el-tag>
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
                <el-tooltip content="Thêm kho" placement="top">
                  <el-button type="success" icon="el-icon-plus" circle size="mini" @click="startAdd" />
                </el-tooltip>
              </template>
              <template v-else>
                <el-tooltip content="Sửa kho" placement="top">
                  <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="startEdit(scope.row)" />
                </el-tooltip>
                <el-tooltip :content="scope.row.trang_thai === 1 ? 'Hủy kích hoạt kho' : 'Kích hoạt kho'" placement="top">
                  <el-button 
                    :type="scope.row.trang_thai === 1 ? 'danger' : 'warning'" 
                    :icon="scope.row.trang_thai === 1 ? 'el-icon-remove' : 'el-icon-check'" 
                    circle size="mini" 
                    @click="scope.row.trang_thai === 1 ? handleDisableKhoHang(scope.row) : handleEnableKhoHang(scope.row)" 
                  />
                </el-tooltip>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-bar">
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
import service from '@/utils/request'
import { getUser } from '@/utils/auth'
const baseUrl = process.env.VUE_APP_BASE_API || ''
export default {
  name: 'KhoHangList',
  props: {
    selectedKho: Object
  },
  data() {
    return {
      khoList: [],
      loading: false,
      searchQuery: '',
      debounceTimer: null,
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      editingKey: null,
      editForm: {},
      editMode: '', // 'add' | 'edit'
      isAdding: false
    }
  },
  watch: {
    searchQuery() {
      if (this.debounceTimer) clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.handleSearch()
      }, 400)
    }
  },
  computed: {
    tableDataWithAddRow() {
      // Thêm dòng plus ở cuối bảng
      const addRow = { _isAddRow: true }
      if (this.isAdding) {
        return [...this.khoList, this.editForm]
      }
      return [...this.khoList, addRow]
    }
  },
  mounted() {
    this.fetchKhoHang()
  },
  methods: {
    async fetchKhoHang() {
      this.loading = true
      try {
        const payload = {
          table_code: 'tbldmkhohang',
          sohieutk: this.searchQuery || '',
          ma_kho: this.searchQuery || '',
          ten_kho: this.searchQuery || '',
          page: this.pagination.page,
          size: this.pagination.pageSize
        }
        const res = await service.post(`${baseUrl}/dm/search`, payload)
        this.khoList = (res.data && res.data.items) ? res.data.items : []
        this.pagination.total = (res.data && res.data.total) ? res.data.total : 0
      } catch (e) {
        this.khoList = []
        this.pagination.total = 0
        this.$message && this.$message.error('Lỗi tải danh sách kho hàng')
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      this.pagination.page = 1
      this.fetchKhoHang()
    },
    handlePageChange(page) {
      this.pagination.page = page
      this.fetchKhoHang()
    },
    indexMethod(index) {
      return (this.pagination.page - 1) * this.pagination.pageSize + index + 1
    },
    rowClassName({ row }) {
      return this.selectedKho && row.ma_kho === this.selectedKho.ma_kho ? 'selected-row' : ''
    },
    isEditing(row) {
      return this.editingKey === row.ma_kho || (this.isAdding && row === this.editForm)
    },
    startEdit(row) {
      this.editingKey = row.ma_kho
      this.editMode = 'edit'
      this.editForm = { ...row }
    },
    startAdd() {
      const user = getUser()
      this.editingKey = '__add__'
      this.editMode = 'add'
      this.isAdding = true
      // Clear selection below while adding new
      this.$emit('select', null)
      this.editForm = {
        mst: user.user.user.taxCode,
        sohieutk: '',
        ma_kho: '',
        ten_kho: '',
        trang_thai: 1
      }
    },
    async saveEdit(row) {
      // Validate
      if (!this.editForm.ma_kho || !this.editForm.sohieutk || !this.editForm.ten_kho) {
        this.$message.error('Vui lòng nhập đủ thông tin')
        return
      }
      try {
        const payload = { ...this.editForm, table_code: 'tbldmkhohang' }
        await service.post(`${baseUrl}/dm/upsert`, payload)
        this.$message.success(this.editMode === 'add' ? 'Thêm mới thành công' : 'Cập nhật thành công')
        this.cancelEdit()
        this.fetchKhoHang()
      } catch (e) {
        this.$message.error('Lỗi lưu kho hàng')
      }
    },
    cancelEdit() {
      this.editingKey = null
      this.editForm = {}
      this.editMode = ''
      this.isAdding = false
    },
    handleCurrentChange(row) {
      // Khi click vào dòng thêm mới hoặc đang ở chế độ thêm -> clear bảng dưới
      if (!row) return
      if (row._isAddRow || this.isAdding || this.editMode === 'add') {
        this.$emit('select', null)
        return
      }
      this.$emit('select', row)
    },
    async handleDisableKhoHang(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn Hủy kích hoạt kho hàng "${row.ten_kho}" (${row.ma_kho})?`,
          'Xác nhận Hủy kích hoạt',
          {
            confirmButtonText: 'Hủy kích hoạt',
            cancelButtonText: 'Hủy',
            type: 'warning',
            confirmButtonClass: 'el-button--danger'
          }
        )
        const payload = {
          table_code: 'tbldmkhohang',
          mst: row.mst,
          sohieutk: row.sohieutk,
          ma_kho: row.ma_kho,
          trang_thai: 0
        }
        await service.post(`${baseUrl}/dm/update-status`, payload)
        this.$message.success('Hủy kích hoạt kho hàng thành công')
        this.fetchKhoHang()
      } catch (e) {
        if (e !== 'cancel') this.$message.error('Lỗi Hủy kích hoạt kho hàng')
      }
    },
    async handleEnableKhoHang(row) {
      try {
        await this.$confirm(
          `Bạn có chắc chắn muốn kích hoạt kho hàng "${row.ten_kho}" (${row.ma_kho})?`,
          'Xác nhận kích hoạt',
          {
            confirmButtonText: 'Kích hoạt',
            cancelButtonText: 'Hủy',
            type: 'warning',
            confirmButtonClass: 'el-button--success'
          }
        )
        const payload = {
          table_code: 'tbldmkhohang',
          mst: row.mst,
          sohieutk: row.sohieutk,
          ma_kho: row.ma_kho,
          trang_thai: 1
        }
        await service.post(`${baseUrl}/dm/update-status`, payload)
        this.$message.success('Kích hoạt kho hàng thành công')
        this.fetchKhoHang()
      } catch (e) {
        if (e !== 'cancel') this.$message.error('Lỗi kích hoạt kho hàng')
      }
    }
  }
}
</script>
<style scoped>
.khohang-list-container {
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
  width: 350px;
}
.pagination-bar {
  margin-top: 16px;
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
.nowrap-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
.el-pagination {
  margin-top: 12px;
  padding: 6px 0;
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
@media screen and (max-width: 1200px) {
  .khohang-list-container {
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