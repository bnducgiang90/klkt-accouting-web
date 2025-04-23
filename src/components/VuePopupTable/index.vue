<template>
  <el-dialog
    :visible.sync="visible"
    :width="width"
    :fullscreen="fullscreen"
    :close-on-click-modal="false"
    :append-to-body="true"
    @close="closeDialog"
  >
    <template #title>
      <div class="dialog-title">{{ title }}</div>
    </template>

    <el-input
      v-model="searchQuery"
      placeholder="Tìm kiếm..."
      clearable
      prefix-icon="el-icon-search"
      class="search-box"
    />

    <el-table
      :data="filteredData"
      border
      :height="tableHeight"
      class="custom-table"
      style="width: 100%"
      :header-cell-style="{ backgroundColor: headerColor, color: 'white', textAlign: 'center' }"
      :row-class-name="getRowClass"
      @row-click="handleSingleClick"
      @row-dblclick="handleRowClick"
      @cell-mouse-enter="handleMouseEnter"
      @cell-mouse-leave="handleMouseLeave"
    >
      <el-table-column
        v-for="col in columns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :min-width="col.width || 'auto'"
        :align="col.align || 'left'"
        :show-overflow-tooltip="col.wrapText === false"
      >
        <template slot-scope="scope">
          <div v-if="isBooleanColumn(col)" class="checkbox-cell">
            <el-checkbox v-model="scope.row[col.prop]" disabled />
          </div>
          <div v-else-if="col.format === 'currency'" class="table-cell">
            {{ formatCurrency(scope.row[col.prop]) }}
          </div>
          <div v-else :class="{ 'table-cell': true, 'wrap-text': col.wrapText }">
            {{ scope.row[col.prop] }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Bảng Dữ Liệu' },
    visible: { type: Boolean, default: false },
    width: { type: String, default: '90%' },
    height: { type: String, default: 'auto' },
    fullscreen: { type: Boolean, default: false },
    tableData: { type: Array, required: true },
    columns: { type: Array, required: true },
    headerColor: { type: String, default: '#ff6600' }
  },
  data() {
    return {
      searchQuery: '',
      selectedRowIndex: null
    }
  },
  computed: {
    filteredData() {
      if (!this.searchQuery) return this.tableData
      return this.tableData.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      )
    },
    tableHeight() {
      return this.fullscreen ? '75vh' : '500px'
    }
  },
  methods: {
    handleSingleClick(row, column, event) {
      this.selectedRowIndex = this.filteredData.indexOf(row)
    },
    handleRowClick(row) {
      this.$emit('row-selected', row)
    },
    closeDialog() {
      this.$emit('close-popup', false)
    },
    handleMouseEnter(row) {
      this.hoveredRow = row
    },
    handleMouseLeave() {
      this.hoveredRow = null
    },
    getRowClass({ row, rowIndex }) {
      return rowIndex === this.selectedRowIndex ? 'selected-row' : ''
    },
    isBooleanColumn(col) {
      return this.tableData.some(row => typeof row[col.prop] === 'boolean')
    },
    formatCurrency(value) {
      if (typeof value === 'number') {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
      }
      return value
    }
  }
}
</script>

<style scoped>
.dialog-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  width: 100%;
}
.search-box {
  margin-bottom: 10px;
}
.el-dialog {
  max-height: 90vh;
}
/deep/ .el-table__row.selected-row {
  background-color: #007bff !important;
  color: white !important;
}
/deep/ .el-table__row.selected-row:hover {
  background-color: #007bff !important;
  color: white !important;
}
.checkbox-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.wrap-text {
  white-space: normal !important;
  word-break: break-word;
}
</style>
