<template>
  <div class="categories-container">
    <vue-element-loading
      :active="isActive"
      spinner="line-wave"
      color="#FF6700"
      text="Loading..."
      size="50"
    >
    </vue-element-loading>
    
    <el-card>
      <h3>Tìm kiếm danh mục</h3>
      <el-form @submit.prevent="searchRecords">
        <!-- Dropdown chọn danh mục -->
        <div style="margin-bottom: 20px;">
          <el-row :gutter="20" align="middle">
            <el-col :span="8">
              <el-form-item label="Chọn danh mục cần quản lý" label-width="200px">
                <el-select
                  v-model="selectedTable"
                  placeholder="Chọn một danh mục"
                  clearable
                  style="width: 100%"
                  @change="fetchMetadata"
                >
                  <el-option
                    v-for="option in tables"
                    :key="option.table_name"
                    :label="option.table_desc"
                    :value="option.table_name"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Thông tin tìm kiếm" label-width="150px">
                <el-input
                  v-model="searchText"
                  clearable
                  placeholder="Nhập thông tin tìm kiếm (mã, tên ...)"
                  style="width: 100%"
                  @keyup.enter.native="searchRecords"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="0">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="searchRecords"
                  style="margin-right: 10px;"
                >Tìm kiếm</el-button>
                <el-button
                  type="success"
                  icon="el-icon-plus"
                  @click="openDialog('create')"
                >Thêm mới</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>

      <div v-if="paginatedData.length > 0">
        <h3>Danh sách kết quả</h3>

        <!-- Bảng sử dụng el-table -->
        <el-table
          :data="paginatedData"
          style="width: 100%; margin-top: 20px"
          border
          v-loading="loading"
          empty-text="Không có dữ liệu"
          max-height="600"
          :header-cell-style="{
            backgroundColor: '#ECEFF1',
            color: '#000',
            fontWeight: 'bold',
          }"
        >
          <el-table-column width="60" type="index" label="STT" align="center" />
          <!-- Vòng lặp qua metadata.columns để tạo cột động -->
          <el-table-column
            v-for="(label, field) in metadata.columns"
            :key="field"
            :prop="field"
            :label="label"
            min-width="120"
          >
            <template slot-scope="scope">
              <el-tooltip content="Click to view" placement="top">
                <span v-if="metadata.column_types[field] === 'dropdown'">
                  {{ getDropdownLabel(field, scope.row[field]) }}
                </span>
                <!-- Nếu cột là date, format ngày -->
                <span v-else-if="metadata.column_types[field] === 'date'">
                  {{ formatDate(scope.row[field]) }}
                </span>
                <span v-else>
                  {{ scope.row[field] }}
                </span>
              </el-tooltip>
            </template>
          </el-table-column>

          <!-- Cột hành động -->
          <el-table-column align="center" label="Action" width="280" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="small"
                class="el-icon-info"
                @click="openDetailDialog(scope.row)"
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
                @click="removeRecord(scope.row)"
              >Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- Pagination - moved outside conditional div -->
      <div v-if="totalItems > 0" style="margin-top: 20px; text-align: right;">
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          :total="totalItems"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <!-- Dialog cho Edit/Create -->
    <el-dialog
      :title="
        dialogType === 'create' ? 'Thêm danh mục mới' : 'Chỉnh sửa danh mục'
      "
      :visible.sync="dialogVisible"
      width="700px"
      @close="resetForm"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="130px"
        label-position="left"
        class="categories-dialog-form"
      >
        <div v-for="(column, field) in metadata.columns" :key="field">
          <el-form-item :label="column" :prop="field" class="categories-form-item">
            <!-- Kiểm tra kiểu dữ liệu để chọn component nhập liệu -->
            <!-- Dropdown -->
            <el-select
              v-if="metadata.column_types[field] === 'dropdown'"
              v-model="formData[field]"
              placeholder="Chọn một giá trị"
              class="categories-form-input"
            >
              <el-option
                v-for="option in dropdownOptions[field]"
                :key="option.id"
                :label="option.name"
                :value="option.id"
              />
            </el-select>

            <!-- Text input -->
            <el-input
              v-else-if="metadata.column_types[field] === 'text'"
              v-model="formData[field]"
              class="categories-form-input"
            />

            <!-- Number input -->
            <el-input-number
              v-else-if="metadata.column_types[field] === 'number'"
              v-model="formData[field]"
              class="categories-form-input"
            />

            <!-- Date input -->
            <el-date-picker
              v-else-if="metadata.column_types[field] === 'date'"
              v-model="formData[field]"
              type="date"
              :format="'dd/MM/yyyy'"
              placeholder="Chọn ngày"
              class="categories-form-input"
            />

            <!-- Default input (fallback là text nếu không có kiểu dữ liệu xác định) -->
            <el-input v-else v-model="formData[field]" type="text" class="categories-form-input" />
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="primary" @click="handleSubmit">Lưu</el-button>
      </span>
    </el-dialog>

    <!-- Dialog cho Detail -->
    <el-dialog
      title="Chi tiết danh mục"
      :visible.sync="detailDialogVisible"
      width="600px"
      @close="closeDetailDialog"
    >
      <div class="detail-content">
        <div v-for="(column, field) in metadata.columns" :key="field" class="detail-item">
          <div class="detail-label">{{ column }}:</div>
          <div class="detail-value">
            <span v-if="metadata.column_types[field] === 'dropdown'">
              {{ getDropdownLabel(field, detailData[field]) }}
            </span>
            <span v-else-if="metadata.column_types[field] === 'date'">
              {{ formatDate(detailData[field]) }}
            </span>
            <span v-else>
              {{ detailData[field] || 'N/A' }}
            </span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible = false">Đóng</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import VueElementLoading from 'vue-element-loading'

const baseUrl = process.env.VUE_APP_KLKT_APP_BASE_API

export default {
  components: {
    VueElementLoading
  },
  data() {
    return {
      dialogVisible: false,
      dialogType: '', // Loại hành động: create/update
      detailDialogVisible: false, // Dialog cho detail
      detailData: {}, // Dữ liệu cho detail dialog
      checkStrictly: false,
      loading: false,

      tables: [], // Danh sách các bảng danh mục
      selectedTable: '', // Bảng danh mục được chọn
      dropdownOptions: {}, // Giá trị dropdown từ metadata
      metadata: {}, // Metadata của bảng
      searchData: {}, // Dữ liệu form tìm kiếm
      searchText: '',
      records: [], // Dữ liệu kết quả tìm kiếm
      currentPage: 1, // Trang hiện tại
      pageSize: 10, // Số lượng item trên mỗi trang
      formData: {},
      formRules: {}, // Các rules validate động
      isActive: false
    }
  },
  computed: {
    // Tính toán tổng số lượng item
    totalItems() {
      return this.records.length
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.records.slice(start, end)
    }
  },
  mounted() {
    // Lấy danh sách bảng khi component được tải
    this.fetchTables()
  },
  methods: {
    // Hàm xử lý khi thay đổi trang
    handlePageChange(page) {
      this.currentPage = page
    },
    // Hàm format ngày với moment.js
    formatDate(dateString) {
      if (!dateString) return '';
      return moment(dateString).format('DD/MM/YYYY')
    },
    // Hàm xây dựng form validation rules dựa vào validationRules trả về từ API
    buildFormValidationRules(validationRules) {
      const rules = {}
      Object.keys(validationRules).forEach((field) => {
        const fieldRules = []

        if (validationRules[field].required) {
          fieldRules.push({
            required: true,
            message: `${this.metadata.columns[field]} là bắt buộc`,
            trigger: 'blur'
          })
        }

        rules[field] = fieldRules
      })
      this.formRules = rules
      console.log('rules', rules)
    },

    // Hàm để lấy giá trị text tương ứng từ dropdownValues
    getDropdownLabel(field, value) {
      const dropdown = this.dropdownOptions[field]
      if (!dropdown) return value // Nếu không có dropdownValues cho field này, trả lại giá trị gốc

      // Tìm label tương ứng với giá trị id (value)
      const found = dropdown.find((item) => item.id === value)
      return found ? found.name : value // Nếu tìm thấy, trả về label, nếu không, trả về giá trị gốc
    },
    fetchTables() {
      this.isActive = true
      // Lấy danh sách các bảng danh mục từ server
      axios
        .get(`${baseUrl}/cate/get-tables`)
        .then(async(response) => {
          this.tables = response.data
          console.log(this.tables)
          this.isActive = false
        })
        .catch((err) => {
          this.isActive = false
          this.$message({
            type: 'error',
            message: 'Có lỗi xảy ra khi tải danh sách bảng!'
          })
          console.error(err)
        })
    },
    fetchMetadata() {
      this.records = []
      // Lấy metadata cho bảng được chọn
      if (this.selectedTable) {
        this.isActive = true
        axios
          .get(`${baseUrl}/cate/metadata/${this.selectedTable}`)
          .then((response) => {
            this.metadata = response.data.metadata
            this.searchData = {}
            this.dropdownOptions = response.data.dropdownValues // Lấy dữ liệu cho dropdowns
            console.log(
              'response.data.columnValidations:',
              response.data.metadata.column_validations
            )

            this.buildFormValidationRules(
              response.data.metadata.column_validations
            ) // Gọi hàm tạo form rules
            this.resetForm()
            this.isActive = false
          })
          .catch((err) => {
            this.isActive = false
            this.$message({
              type: 'error',
              message: 'Có lỗi xảy ra khi tải metadata!'
            })
            console.error(err)
          })
      }
    },
    searchRecords() {
      if (this.selectedTable) {
        this.loading = true
        axios
          .post(`${baseUrl}/cate/search/${this.selectedTable}`, {
            query: this.searchText
          })
          .then(async(response) => {
            this.records = response.data
            this.loading = false
          })
          .catch((err) => {
            this.loading = false
            this.$message({
              type: 'error',
              message: 'Có lỗi xảy ra khi tìm kiếm!'
            })
            console.error(err)
          })
      }
    },
    deleteRecord(id) {
      if (this.selectedTable) {
        this.$confirm('Confirm to remove the product?', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.isActive = true
          axios
            .delete(`${baseUrl}/cate/delete/${this.selectedTable}/${id}`)
            .then(async() => {
              this.searchRecords()
              this.$notify({
                title: 'Success',
                dangerouslyUseHTMLString: true,
                message: `
                    Thành công
                  `,
                type: 'success'
              })
              this.isActive = false
            })
            .catch((err) => {
              this.isActive = false
              this.$message({
                type: 'error',
                message: 'Có lỗi xảy ra khi xóa!'
              })
              console.error(err)
            })
        })
      }
    },
    removeRecord(record) {
      if (this.selectedTable) {
        this.$confirm('Confirm to remove the product?', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          const primaryKeys = this.metadata.column_primarys

          this.isActive = true
          axios
            .delete(`${baseUrl}/cate/remove/${this.selectedTable}`, {
              data: primaryKeys.reduce((acc, key) => {
                acc[key] = record[key]
                return acc
              }, {})
            })
            .then(async() => {
              this.searchRecords()
              this.$notify({
                title: 'Success',
                dangerouslyUseHTMLString: true,
                message: `
                    Thành công
                  `,
                type: 'success'
              })
              this.isActive = false
            })
            .catch((err) => {
              this.isActive = false
              this.$message({
                type: 'error',
                message: 'Có lỗi xảy ra khi xóa!'
              })
              console.error(err)
            })
        })
      }
    },
    openDialog(type, record = {}) {
      this.dialogType = type
      this.dialogVisible = true
      if (type === 'update') {
        console.log(record)
        this.resetForm()
        this.formData = { ...record } // Gán dữ liệu để update
      } else {
        this.resetForm() // Khởi tạo form rỗng
      }
    },

    openDetailDialog(record) {
      this.detailData = { ...record }
      this.detailDialogVisible = true
    },

    closeDetailDialog() {
      this.detailDialogVisible = false
      this.detailData = {}
    },

    resetForm() {
      if (this.$refs.formRef && this.$refs.formRef.resetFields()) {
        this.$refs.formRef.resetFields() // Reset validate và dữ liệu của form
      }

      // Xóa dữ liệu form hoặc khởi tạo lại form
      this.formData = {}
      // Nếu cột có giá trị mặc định là dropdown thì đặt giá trị mặc định là rỗng
      for (const field in this.metadata.columns) {
        if (this.metadata.column_types[field].type === 'dropdown') {
          this.formData[field] = null // Đặt giá trị ban đầu của dropdown là null
        }
      }
    },
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.isActive = true
          if (this.dialogType === 'create') {
            axios
              .post(
                `${baseUrl}/cate/create/${this.selectedTable}`,
                this.formData
              )
              .then(async() => {
                this.searchRecords()
                this.dialogVisible = false
                this.$notify({
                  title: 'Success',
                  dangerouslyUseHTMLString: true,
                  message: `
                    Thành công
                  `,
                  type: 'success'
                })
                this.isActive = false
              })
              .catch((err) => {
                this.isActive = false
                this.$message({
                  type: 'error',
                  message: 'Có lỗi xảy ra khi tạo mới!'
                })
                console.error(err)
              })
          } else if (this.dialogType === 'update') {
            const primaryKeys = this.metadata.column_primarys // Lấy primary keys từ metadata
            const recordData = { ...this.formData }

            this.isActive = true
            axios
              .put(`${baseUrl}/cate/edit/${this.selectedTable}`, {
                ...recordData,
                primaryKeys: primaryKeys.reduce((acc, key) => {
                  acc[key] = recordData[key]
                  return acc
                }, {})
              })
              .then(async() => {
                this.searchRecords()
                this.dialogVisible = false
                this.$notify({
                  title: 'Success',
                  dangerouslyUseHTMLString: true,
                  message: `
                    Thành công
                  `,
                  type: 'success'
                })
                this.isActive = false
              })
              .catch((err) => {
                this.isActive = false
                this.$message({
                  type: 'error',
                  message: 'Có lỗi xảy ra khi cập nhật!'
                })
                console.error(err)
              })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.categories-container {
  padding: 24px;
}

.el-card {
  margin-bottom: 20px;
}

/* Thanh tìm kiếm và nút thêm mới trên cùng */
.categories-search-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.categories-search-left {
  display: flex;
  gap: 10px;
  align-items: center;
  flex: 1;
}

.el-form-item {
  margin-bottom: 0;
}

.el-form-item__label {
  font-weight: 500;
  color: #606266;
}

.el-input,
.el-select,
.el-input-number,
.el-date-picker {
  width: 100%;
}

.el-table {
  font-size: 12px;
}

.el-table .cell {
  padding: 8px 0;
}

.el-button {
  margin-right: 8px;
}

.el-button:last-child {
  margin-right: 0;
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

h3 {
  margin-bottom: 20px;
  color: #303133;
  font-weight: 600;
}

/* Responsive adjustments for better visibility */
@media screen and (max-width: 1200px) {
  .categories-container {
    padding: 16px;
  }
  .el-table {
    font-size: 11px;
  }
  .el-table .cell {
    padding: 6px 0;
  }
}

/* Tối ưu hiển thị form popup */
.el-dialog {
  max-width: 98vw;
  min-width: 320px;
}
.el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 24px;
  padding-right: 24px;
}

.categories-dialog-form {
  margin-top: 10px;
}

.categories-form-item {
  margin-bottom: 18px !important;
}

.categories-form-input {
  width: 100%;
  min-width: 120px;
  max-width: 480px;
}

@media (max-width: 600px) {
  .el-dialog {
    width: 98vw !important;
    min-width: unset;
    max-width: 98vw;
  }
  .el-dialog__body {
    padding-left: 8px;
    padding-right: 8px;
  }
  .categories-form-input {
    max-width: 100%;
    min-width: 80px;
  }
  .categories-dialog-form {
    margin-top: 0;
  }
}

/* Styles cho detail dialog */
.detail-content {
  padding: 10px 0;
}

.detail-item {
  display: flex;
  margin-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 12px;
}

.detail-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.detail-label {
  font-weight: 600;
  color: #606266;
  min-width: 150px;
  flex-shrink: 0;
  margin-right: 16px;
}

.detail-value {
  flex: 1;
  color: #303133;
  word-break: break-word;
}

@media (max-width: 768px) {
  .detail-item {
    flex-direction: column;
  }
  
  .detail-label {
    min-width: auto;
    margin-right: 0;
    margin-bottom: 4px;
  }
}
</style>
