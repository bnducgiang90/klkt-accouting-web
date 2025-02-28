<template>
  <div class="table-container">
    <el-table
      ref="table"
      :data="editableData"
      border
      class="custom-table"
      style="width: 100%"
      height="500"
      :header-cell-style="{ textAlign: 'center' }"
    >
      <el-table-column
        v-for="col in columns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :min-width="col.minWidth ? col.minWidth + 'px' : undefined"
        :align="col.align"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.editing">
            <el-input
              v-if="col.format === 'date'"
              v-model="scope.row[col.prop]"
              :disabled="col.disableEditing"
              @blur="validateAndFormatDate(scope.row, col.prop)"
            />
            <el-input
              v-else-if="col.format === 'currency'"
              v-model="scope.row[col.prop]"
              :disabled="col.disableEditing"
              @input="formatCurrency(scope.row, col.prop)"
              @keydown.native.space.prevent="col.onSpaceKey ? handleSpaceKey(scope.row, col) : null"
            />
            <el-input
              v-else
              v-model="scope.row[col.prop]"
              :disabled="col.disableEditing"
              @keydown.native.space.prevent="col.onSpaceKey ? handleSpaceKey(scope.row, col) : null"
            />
          </div>
          <div v-else :class="{ 'wrap-text': col.wrapText }">
            {{ col.format === 'currency' ? formatDisplayCurrency(scope.row[col.prop]) : col.format === 'date' ? formatDateDisplay(scope.row[col.prop]) : scope.row[col.prop] }}
          </div>
        </template>

      </el-table-column>

      <el-table-column label="Action" min-width="200" fixed="right" align="center">
        <template slot-scope="scope">
          <template v-if="!scope.row.editing">
            <el-button v-if="!scope.row.editing" type="primary" @click="editRow(scope.row)">Sửa</el-button>
            <el-button v-if="!scope.row.editing" type="danger" @click="deleteRow(scope.row)">Xóa</el-button>
          </template>
          <template v-else>
            <el-button type="success" @click="saveRow(scope.row)">Lưu</el-button>
            <el-button type="danger" @click="cancel(scope.row)">Hủy</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" class="add-button" @click="addRow">Chèn</el-button>
  </div>
</template>

<script>
export default {
  props: {
    columns: { type: Array, required: true },
    data: { type: Array, required: true }
  },
  data() {
    return {
    }
  },
  computed: {
    editableData() {
      return this.data.map(row => ({
        ...row,
        editing: false,
        updating: false,
        deleting: false,
        originalData: { ...row }
      }))
    }
  },
  methods: {
    editRow(row) {
      this.$set(row, 'editing', true)
      this.$set(row, 'inserting', false)
      this.$set(row, 'updating', true)
      this.$set(row, 'deleting', false)
    },
    deleteRow(row) {
      this.$set(row, 'editing', true)
      this.$set(row, 'inserting', false)
      this.$set(row, 'updating', false)
      this.$set(row, 'deleting', true)
      console.log('click delete', row)
    },
    saveRow(row) {
      this.$emit('update-data', row) // Emit sự kiện để cập nhật dữ liệu
      this.$set(row, 'editing', false)
      this.$set(row, 'inserting', false)
      this.$set(row, 'updating', false)
      this.$set(row, 'deleting', false)
    },
    rejectRow(row) {
      Object.assign(row, row.originalData)
      row.editing = false
    },
    addRow() {
      // Xác định cột nào có `identity: true`
      const identityColumn = this.columns.find(col => col.identity)

      // Tìm giá trị lớn nhất của cột identity
      const newRow = { editing: true, inserting: true, updating: false, deleting: false, originalData: {}}
      if (identityColumn) {
        const identityProp = identityColumn.prop
        const maxId = Math.max(0, ...this.editableData.map(row => row[identityProp] || 0))
        newRow[identityProp] = maxId + 1
      }

      this.editableData.push(newRow)
    },
    cancel(row) {
      this.$set(row, 'editing', false)
      this.$set(row, 'inserting', false)
      this.$set(row, 'deleting', false)
      this.$set(row, 'updating', false)
    },
    formatCurrency(row, prop) {
      row[prop] = row[prop].replace(/\D/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    formatDisplayCurrency(value) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value || 0)
    },
    handleSpaceKey(row, col) {
      this.$emit('space-key-pressed', { row, col }) // Emit sự kiện
    },
    validateAndFormatDate(row, prop) {
      const value = row[prop]
      if (/^\d{6,8}$/.test(value)) {
        const day = value.slice(0, 2)
        const month = value.slice(2, 4)
        const year = value.length === 6 ? '20' + value.slice(4, 6) : value.slice(4, 8)
        const dateStr = `${year}-${month}-${day}`
        const date = new Date(dateStr)
        if (!isNaN(date.getTime())) {
          row[prop] = `${day}/${month}/${year}`
        } else {
          alert('Ngày nhập không hợp lệ')
          row[prop] = ''
        }
      }
    },
    formatDateDisplay(value) {
      if (!value) return ''
      const parts = value.split('/')
      return parts.length === 3 ? `${parts[0]}/${parts[1]}/${parts[2]}` : value
    }
  }
}
</script>

<style scoped>
.custom-table {
  overflow: auto;
  font-size: 12px;
}
.wrap-text {
  white-space: pre-wrap;
}
.add-button {
  margin-top: 10px;
}
.el-table--medium th, .el-table--medium td {
    padding: 1px 0;
}
</style>
