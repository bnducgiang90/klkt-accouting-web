<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content" :style="{ width: width }">
      <!-- Tiêu đề -->
      <div class="popup-header">
        {{ title }}
        <button class="popup-close" @click="closePopup">Đóng</button>
      </div>

      <!-- Dữ liệu có thanh cuộn -->
      <div class="popup-body">
        <table class="data-table">
          <thead>
            <tr>
              <th
                v-for="col in columns"
                :key="col.prop"
                :style="getColumnStyle(col)"
              >
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in data" :key="index" @dblclick="selectRow(row)">
              <td v-for="col in columns" :key="col.prop" :style="getColumnStyle(col, true)">
                {{ formatCell(row[col.prop], col) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      resolve: null,
      title: '',
      width: '50%',
      columns: [],
      data: []
    }
  },
  methods: {
    openPopup({ title, width, columns, data }) {
      this.title = title || 'Danh sách'
      this.width = width || '50%'
      this.columns = columns || []
      this.data = data || []
      this.isOpen = true
      this.selectedRow = null // Reset selection khi mở popup
      return new Promise((resolve) => {
        this.resolve = resolve
      })
    },
    selectRow(row) {
      this.selectedRow = row // Lưu dòng được chọn
      this.resolve(row)
      this.isOpen = false
    },
    closePopup() {
      this.resolve(null)
      this.isOpen = false
    },
    getColumnStyle(col, isCell = false) {
      return {
        width: col.width ? (typeof col.width === 'number' ? col.width + 'px' : col.width) : 'auto',
        minWidth: col.minWidth ? (typeof col.minWidth === 'number' ? col.minWidth + 'px' : col.minWidth) : 'auto',
        maxWidth: col.maxWidth ? (typeof col.maxWidth === 'number' ? col.maxWidth + 'px' : col.maxWidth) : 'auto',
        textAlign: col.align || 'left',
        whiteSpace: col.wrapText ? 'normal' : 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    },
    formatCell(value, col) {
      if (col.format === 'currency') return new Intl.NumberFormat().format(value)
      if (col.format === 'boolean') return value ? '✔' : '✖'
      return value
    }
  }
}
</script>

<style>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Đảm bảo cao hơn các thành phần khác */
}
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  position: relative; /* Để nút đóng định vị theo popup */
  width: 50%;
}

/* Tiêu đề popup (cố định, căn giữa) */
.popup-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  text-align: center;
  font-size: 20px; /* Tiêu đề to hơn */
  font-weight: bold;
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

/* Nút đóng (cố định, căn phải) */
.popup-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 3px;
}

/* Khu vực dữ liệu có thanh cuộn */
.popup-body {
  flex: 1;
  overflow-y: auto;
  max-height: 60vh;
}

/* Bảng hiển thị dữ liệu */
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px; /* Chữ bé hơn */
}

/* Kẻ ô bảng rõ ràng */
.data-table th, .data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

/* Tiêu đề cột to hơn */
.data-table th {
  background: #f4f4f4;
  font-size: 16px; /* Tiêu đề cột lớn hơn */
  font-weight: bold;
  text-align: center;
  padding: 10px;
}

/* Cố định tiêu đề bảng khi cuộn */
.data-table thead {
  position: sticky;
  top: 0;
  background: #f4f4f4;
  z-index: 5;
}

/* Khi hover vào dòng */
.data-table tbody tr:hover {
  background-color: #f0f0f0; /* Màu xám nhạt khi hover */
  cursor: pointer;
}

/* Khi dòng được chọn */
.data-table tbody tr.selected {
  background-color: #d1e7fd !important; /* Màu xanh nhạt */
  font-weight: bold;
}

</style>
