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
        />
        <el-button type="primary" icon="el-icon-search" @click="handleSearch" :disabled="!selectedKho">Tìm kiếm</el-button>
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
          <el-table-column label="Action" width="130" align="center" fixed="right">
            <template slot-scope="scope">
              <template v-if="isEditing(scope.row)">
                <el-button type="success" icon="el-icon-check" circle size="mini" @click="saveEdit(scope.row)" />
                <el-button type="danger" icon="el-icon-close" circle size="mini" @click="cancelEdit" />
              </template>
              <template v-else-if="scope.row._isAddRow">
                <el-button type="success" icon="el-icon-plus" circle size="mini" @click="startAdd" />
              </template>
              <template v-else>
                <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="startEdit(scope.row)" />
                <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteRow(scope.row)" />
                <el-button type="success" icon="el-icon-box" circle size="mini" @click="goToAddVatTu(scope.row)" title="Thêm vật tư" />
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
      isAdding: false
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
    }
  }
}
</script>
<style scoped>
.nhomhang-list-container {
  padding: 8px 0 8px 0;
}
.toolbar {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 16px;
}
.search-input {
  width: 260px;
}
.pagination-bar {
  margin-top: 16px;
  text-align: right;
}
.table-scroll-x {
  overflow-x: auto;
}
.el-card {
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.09);
  background: #fff;
  padding: 12px 0 24px 0;
}
.el-table {
  border-radius: 16px;
  font-size: 12px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.el-table .cell {
  padding: 8px 0;
  font-size: 12px;
}
.el-table th {
  background: linear-gradient(90deg, #e3f0ff 0%, #f8fbff 100%);
  font-weight: bold;
  color: #1a237e;
  font-size: 17px;
  padding: 14px 0;
  border-bottom: 2px solid #e3eaf2;
}
.el-table td {
  padding: 12px 0;
  font-size: 16px;
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
</style> 