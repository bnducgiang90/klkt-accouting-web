<template>
  <div class="app-container">
    <vue-element-loading
      :active="isActive"
      spinner="line-wave"
      color="#FF6700"
      text="Loading..."
      size="50"
    >
      <!-- <span>loading</span> -->
    </vue-element-loading>
    <h3>Tìm kiếm danh mục</h3>
    <el-form @submit.prevent="searchRecords">
      <!-- Dropdown chọn danh mục -->
      <div>
        <!-- <label for="tableSelect">Chọn danh mục:</label> -->
        <el-row>
          <el-col :span="10">
            <el-form-item label="Chọn danh mục cần quản lý">
              <el-select
                v-model="selectedTable"
                placeholder="Chọn một danh mục"
                clearable
                style="width: 300px"
                @change="fetchMetadata"
              >
                <el-option
                  v-for="option in tables"
                  :key="option.tableName"
                  :label="option.tableDesc"
                  :value="option.tableName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Thông tin tìm kiếm">
              <el-input
                v-model="searchText"
                clearable
                placeholder="Nhập thông tin tìm kiếm (mã, tên ...)"
                style="width: 350px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button
              type="primary"
              class="filter-item"
              icon="el-icon-search"
              @click="searchRecords"
            >Tìm kiếm</el-button>
          </el-col>
        </el-row>
      </div>

      <el-button
        type="primary"
        class="el-icon-plus"
        style="display: flex; float: right"
        @click="openDialog('create')"
      >Thêm mới danh mục</el-button>
    </el-form>
    <div v-if="paginatedData.length > 0">
      <h3>Danh sách kết quả</h3>

      <!-- Bảng sử dụng el-table -->
      <el-table
        :data="paginatedData"
        style="width: 100%; margin-top: 30px"
        border
        :header-cell-style="{
          backgroundColor: '#ECEFF1',
          color: '#000',
          fontWeight: 'bold',
        }"
      >
        <el-table-column width="50" type="index" label="#" align="center" />
        <!-- Vòng lặp qua metadata.columns để tạo cột động -->
        <el-table-column
          v-for="(label, field) in metadata.columns"
          :key="field"
          :prop="field"
          :label="label"
        >
          <template slot-scope="scope">
            <el-tooltip content="Click to view" placement="top">
              <span v-if="metadata.columnTypes[field] === 'dropdown'">
                {{ getDropdownLabel(field, scope.row[field]) }}
              </span>
              <!-- Nếu cột là date, format ngày -->
              <span v-else-if="metadata.columnTypes[field] === 'date'">
                {{ formatDate(scope.row[field]) }}
              </span>
              <span v-else>
                {{ scope.row[field] }}
              </span>
            </el-tooltip>
          </template>
        </el-table-column>

        <!-- Cột hành động -->
        <el-table-column align="center" label="Action" width="280">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              class="el-icon-info"
              @click="openDialog('update', scope.row)"
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
            <!-- @click="deleteRecord(scope.row.id)" -->
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalItems"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        @current-change="handlePageChange"
      />
    </div>

    <el-dialog
      :title="
        dialogType === 'create' ? 'Thêm danh mục mới' : 'Chỉnh sửa danh mục'
      "
      :visible.sync="dialogVisible"
      width="70%"
      @close="resetForm"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="250px"
      >
        <div v-for="(column, field) in metadata.columns" :key="field">
          <el-form-item :label="column" :prop="field">
            <!-- Kiểm tra kiểu dữ liệu để chọn component nhập liệu -->
            <!-- Dropdown -->
            <el-select
              v-if="metadata.columnTypes[field] === 'dropdown'"
              v-model="formData[field]"
              placeholder="Chọn một giá trị"
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
              v-else-if="metadata.columnTypes[field] === 'text'"
              v-model="formData[field]"
            />

            <!-- Number input -->
            <el-input-number
              v-else-if="metadata.columnTypes[field] === 'number'"
              v-model="formData[field]"
            />

            <!-- Date input -->
            <el-date-picker
              v-else-if="metadata.columnTypes[field] === 'date'"
              v-model="formData[field]"
              type="date"
              :format="'dd/MM/yyyy'"
              placeholder="Chọn ngày"
            />

            <!-- Default input (fallback là text nếu không có kiểu dữ liệu xác định) -->
            <el-input v-else v-model="formData[field]" type="text" />
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="primary" @click="handleSubmit">Lưu</el-button>
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
      checkStrictly: false,

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
    // console.log("process.env:", process.env);
  },
  methods: {
    // Hàm xử lý khi thay đổi trang
    handlePageChange(page) {
      this.currentPage = page
    },
    // Hàm format ngày với moment.js
    formatDate(dateString) {
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

        // if (validationRules[field].type === 'email') {
        //   fieldRules.push({ type: 'email', message: 'Email không hợp lệ', trigger: 'blur' });
        // }

        // if (validationRules[field].type === 'number') {
        //   fieldRules.push({ type: 'number', message: 'Vui lòng nhập số', trigger: 'blur' });
        // }

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
        .get(`${baseUrl}/categories/get-tables`)
        .then(async(response) => {
          this.tables = response.data
          console.log(this.tables)
          this.isActive = false
        })
        .catch((err) => {
          this.isActive = false
          this.$message({
            type: 'error',
            message: 'Error occur!'
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
          .get(`${baseUrl}/categories/metadata/${this.selectedTable}`)
          .then((response) => {
            this.metadata = response.data.metadata
            this.searchData = {}
            this.dropdownOptions = response.data.dropdownValues // Lấy dữ liệu cho dropdowns
            console.log(
              'response.data.columnValidations:',
              response.data.metadata.columnValidations
            )

            this.buildFormValidationRules(
              response.data.metadata.columnValidations
            ) // Gọi hàm tạo form rules
            this.resetForm()
            this.isActive = false
          })
          .catch((err) => {
            this.isActive = false
            this.$message({
              type: 'error',
              message: 'Error occur!'
            })
            console.error(err)
          })
      }
    },
    searchRecords() {
      if (this.selectedTable) {
        this.isActive = true
        axios
          .post(`${baseUrl}/categories/search/${this.selectedTable}`, {
            query: this.searchText
          })
          .then(async(response) => {
            this.records = response.data
            this.isActive = false
          })
          .catch((err) => {
            this.isActive = false
            this.$message({
              type: 'error',
              message: 'Error occur!'
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
          //const primaryKeys = this.metadata.primary_columns

          this.isActive = true
          axios
            .delete(`${baseUrl}/categories/delete/${this.selectedTable}/${id}`)
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
                message: 'Error occur!'
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
          const primaryKeys = this.metadata.columnPrimarys

          this.isActive = true
          axios
            .delete(`${baseUrl}/categories/remove/${this.selectedTable}`, {
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
                message: 'Error occur!'
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

    resetForm() {
      if (this.$refs.formRef && this.$refs.formRef.resetFields()) {
        this.$refs.formRef.resetFields() // Reset validate và dữ liệu của form
      }

      // Xóa dữ liệu form hoặc khởi tạo lại form
      this.formData = {}
      // Nếu cột có giá trị mặc định là dropdown thì đặt giá trị mặc định là rỗng
      for (const field in this.metadata.columns) {
        if (this.metadata.columnTypes[field].type === 'dropdown') {
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
                `${baseUrl}/categories/create/${this.selectedTable}`,
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
                  message: 'Error occur!'
                })
                console.error(err)
              })
          } else if (this.dialogType === 'update') {
            const primaryKeys = this.metadata.columnPrimarys // Lấy primary keys từ metadata
            const recordData = { ...this.formData }

            this.isActive = true
            axios
              .put(`${baseUrl}/categories/edit/${this.selectedTable}`, {
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
                  message: 'Error occur!'
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

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
