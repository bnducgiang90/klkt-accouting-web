<template>
  <div class="table-container">
    <el-table
      ref="table"
      :data="filteredData"
      border
      class="custom-table"
      
      :header-cell-style="{ textAlign: 'center' }"
      :row-class-name="tableRowClass"
    >
      <el-table-column
        v-for="col in visibleColumns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :min-width="col.minWidth ? col.minWidth + 'px' : undefined"
        :align="col.align"
      >
        <template slot-scope="scope">
          <div
            v-if="
              scope.row.editType === 'inserting' ||
              scope.row.editType === 'updating' ||
              scope.row.editType === 'saving'
            "
          >
            <!-- Hiển thị checkbox cho kiểu combobox -->
            <el-select
              v-if="col.type === 'combobox'"
              v-model="scope.row[col.prop]"
              placeholder="Chọn"
              filterable
              clearable
            >
              <el-option
                v-for="item in col.combodata"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>

            <!-- Hiển thị checkbox cho kiểu boolean -->
            <el-checkbox
              v-else-if="col.type === 'boolean'"
              v-model="scope.row[col.prop]"
            />

            <!-- <el-input
              v-else-if="col.format === 'date'"
              v-model="scope.row[col.prop]"
              :disabled="col.disableEditing"
              @blur="validateAndFormatDate(scope.row, col.prop)"
            /> -->
            <el-date-picker
              v-else-if="col.format === 'date'"
              v-model="scope.row[col.prop]"
              type="date"
              placeholder="Chọn ngày"
              format="dd/MM/yyyy"
              value-format="dd/MM/yyyy"
              :disabled="col.disableEditing"
              style="width: 100% !important; max-width: 100% !important;"
            />

            <el-input
              v-else-if="col.format === 'currency'"
              v-model="scope.row[col.prop]"
              :disabled="col.disableEditing"
              @keydown.native.space.prevent="
                col.onSpaceKey ? handleSpaceKey(scope.row, col) : null
              "
              @change="
                handleValidation(scope.row, col, $event) && col.onChangeValue
                  ? handleChangeValue(scope.row, col)
                  : null
              "
            />
            <el-input
              v-else
              v-model="scope.row[col.prop]"
              :disabled="col.disableEditing"
              :class="{
                'error-input': scope.row.errors && scope.row.errors[col.prop],
              }"
              @keydown.native.space.prevent="
                col.onSpaceKey ? handleSpaceKey(scope.row, col) : null
              "
              @change="
                handleValidation(scope.row, col, $event) && col.onChangeValue
                  ? handleChangeValue(scope.row, col)
                  : null
              "
            />
          </div>
          <div v-else :class="{ 'wrap-text': col.wrapText }">
            <!-- Hiển thị tên nếu là combobox -->
            <span v-if="col.type === 'combobox'">
              {{ getComboLabel(col.combodata, scope.row[col.prop]) }}
            </span>
            <!-- Hiển thị dạng checkbox nếu là kiểu boolean -->
            <el-checkbox
              v-else-if="col.type === 'boolean'"
              v-model="scope.row[col.prop]"
              disabled
            />
            <template v-else>
              {{
                col.format === "currency"
                  ? formatDisplayCurrency(scope.row[col.prop])
                  : col.format === "date"
                  ? formatDateDisplay(scope.row[col.prop])
                  : scope.row[col.prop]
              }}
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="Action"
        min-width="200"
        fixed="right"
        align="center"
      >
        <template slot-scope="scope">
          <template
            v-if="
              !(
                scope.row.editType === 'inserting' ||
                scope.row.editType === 'updating' ||
                scope.row.editType === 'deleting' ||
                scope.row.editType === 'saving'
              )
            "
          >
            <el-button size="mini" type="primary" @click="editRow(scope.row)"
              >Sửa</el-button
            >
            <el-button size="mini" type="danger" @click="deleteRow(scope.row)"
              >Xóa</el-button
            >
          </template>
          <template v-else>
            <el-button size="mini" type="success" @click="saveRow(scope.row)"
              >Lưu</el-button
            >
            <el-button size="mini" type="danger" @click="cancel(scope.row)">Hủy</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="button-container">
      <el-button size="mini" type="primary" class="add-button" @click="addRow"
        >Thêm dòng</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: { type: Array, required: true },
    data: { type: Array, required: true },
  },
  computed: {
    filteredData() {
      return this.data.filter((item) => item.editType !== "deleted");
    },
    visibleColumns() {
      return this.columns.filter((col) => !col.hidden);
    },
  },
  methods: {
    getComboLabel(comboData, value) {
      const found = comboData?.find((item) => item.code === value);
      return found ? found.name : "";
    },
    editRow(row) {
      this.$emit("handle-row", "updating", row);
    },
    deleteRow(row) {
      this.$emit("handle-row", "deleting", row);
    },
    saveRow(row) {
      this.$emit("handle-row", "saving", row);
    },
    cancel(row) {
      this.$emit("handle-row", "canceling", row);
    },
    addRow() {
      const identityColumn = this.columns.find((col) => col.identity);
      let newRow = this.createEmptyRow(this.columns); // Tạo row trống với các giá trị null

      newRow = { ...newRow, editType: "inserting", originalData: {} };

      if (identityColumn) {
        const identityProp = identityColumn.prop;
        const maxId = Math.max(
          0,
          ...this.data.map((row) => row[identityProp] || 0)
        ); // Tìm giá trị ID lớn nhất
        newRow[identityProp] = maxId + 1; // Gán ID mới
      }

      this.$emit("handle-row", "inserting", newRow);
    },
    // formatCurrency(row, prop) {
    //   row[prop] = row[prop]
    //     .replace(/\D/g, "")
    //     .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    // },
    formatDisplayCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value || 0);
    },
    handleSpaceKey(row, col) {
      this.$emit("space-key-pressed", { row, col });
    },
    handleChangeValue(row, col) {
      this.$emit("change-value", { row, col });
    },
    validateAndFormatDate(row, prop) {
      const value = row[prop];
      if (/^\d{6,8}$/.test(value)) {
        const day = value.slice(0, 2);
        const month = value.slice(2, 4);
        const year =
          value.length === 6 ? "20" + value.slice(4, 6) : value.slice(4, 8);
        const dateStr = `${year}-${month}-${day}`;
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          row[prop] = `${day}/${month}/${year}`;
        } else {
          alert("Ngày nhập không hợp lệ");
          row[prop] = "";
        }
      }
    },
    formatDateDisplay(value) {
      if (!value) return "";
      const parts = value.split("/");
      return parts.length === 3 ? `${parts[0]}/${parts[1]}/${parts[2]}` : value;
    },
    tableRowClass({ row }) {
      return row.editType === "deleting" ? "row-deleting" : "";
    },
    createEmptyRow(columns) {
      return columns.reduce((row, col) => {
        row[col.prop] = null;
        return row;
      }, {});
    },
    handleValidation(row, col, event) {
      const error = this.validateInput(row[col.prop], col);
      if (error) {
        this.$message.error(error);
        // row[col.prop] = '' // Xóa giá trị nếu sai

        // Đánh dấu lỗi cho ô input
        if (!row.errors) {
          this.$set(row, "errors", {}); // Khởi tạo errors nếu chưa có
        }
        this.$set(row.errors, col.prop, true); // Đánh dấu lỗi cho cột này

        // Focus lại vào ô input bị lỗi
        this.$nextTick(() => {
          event.target.focus(); // Đặt lại focus vào ô input
          event.target.select(); // Chọn toàn bộ nội dung nhập sai
        });

        return false; // <== Nếu có lỗi
      } else {
        if (row.errors) {
          this.$set(row.errors, col.prop, false); // Xóa lỗi nếu nhập đúng
        }
        return true; // <== Nếu không lỗi
      }
    },
    validateInput(value, column) {
      if (!value) return ""; // Không kiểm tra nếu giá trị rỗng

      let error = "";

      // Kiểm tra bằng regex nếu có
      if (column.regexPattern && !new RegExp(column.regexPattern).test(value)) {
        error = column.errorMessage || "Giá trị nhập vào không hợp lệ!";
      }

      // Kiểm tra độ dài tối đa
      if (column.maxLength && value.length > column.maxLength) {
        error = `Không được nhập quá ${column.maxLength} ký tự!`;
      }

      return error;
    },
  },
};
</script>

<style scoped>
.custom-table {
  overflow: auto;
  font-size: 12px;
}
.wrap-text {
  white-space: pre-wrap;
}
.button-container {
  display: flex;
  justify-content: flex-end; /* Căn nút sang bên phải */
}
.add-button {
  margin-top: 10px;
}
.el-table--medium th,
.el-table--medium td {
  padding: 1px 0;
}
/deep/ .row-deleting {
  background-color: #ffcccc !important; /* Màu đỏ nhạt */
}

/deep/ .el-table__row.row-deleting td {
  background-color: #ffcccc !important; /* Đảm bảo tất cả ô trong hàng được tô màu */
}

.error-input {
  border: 1px solid red !important;
  background-color: #ffe6e6 !important; /* Màu nền nhạt để dễ nhận diện */
}

.el-table__footer-wrapper {
  width: 100% !important;
}
</style>
