<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content" :style="{ width: width }">
      <!-- Tiêu đề -->
      <div class="popup-header">
        {{ title }}
        <button class="popup-close" @click="closePopup">Đóng</button>
      </div>

      <!-- Thanh tìm kiếm -->
      <div style="margin-bottom: 8px; text-align: right;">
        <input
          v-model="searchText"
          type="text"
          placeholder="Tìm kiếm..."
          style="padding: 6px 10px; border: 1px solid #ccc; border-radius: 4px; width: 250px;"
        />
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
            <tr
              v-for="(row, index) in filteredData"
              :key="index"
              @dblclick="selectRow(row)"
            >
              <td
                v-for="col in columns"
                :key="col.prop"
                :style="getColumnStyle(col, true)"
              >
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
      searchText: "",
      isOpen: false,
      resolve: null,
      title: "",
      width: "50%",
      columns: [],
      data: [],
    };
  },
  computed: {
    filteredData() {
      if (!this.searchText) return this.data;

      const keyword = this.searchText.toLowerCase();
      return this.data.filter((row) =>
        this.columns.some((col) => {
          const value = row[col.prop];
          return value && value.toString().toLowerCase().includes(keyword);
        })
      );
    },
  },
  methods: {
    openPopup({ title, width, columns, data }) {
      this.title = title || "Danh sách";
      this.width = width || "50%";
      this.columns = columns || [];
      this.data = data || [];
      this.isOpen = true;
      this.selectedRow = null; // Reset selection khi mở popup
      return new Promise((resolve) => {
        this.resolve = resolve;
      });
    },
    selectRow(row) {
      this.selectedRow = row; // Lưu dòng được chọn
      this.resolve(row);
      this.isOpen = false;
    },
    closePopup() {
      this.resolve(null);
      this.isOpen = false;
    },
    getColumnStyle(col, isCell = false) {
      return {
        width: col.width
          ? typeof col.width === "number"
            ? col.width + "px"
            : col.width
          : "auto",
        minWidth: col.minWidth
          ? typeof col.minWidth === "number"
            ? col.minWidth + "px"
            : col.minWidth
          : "auto",
        maxWidth: col.maxWidth
          ? typeof col.maxWidth === "number"
            ? col.maxWidth + "px"
            : col.maxWidth
          : "auto",
        textAlign: col.align || "left",
        whiteSpace: col.wrapText ? "normal" : "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      };
    },
    formatCell(value, col) {
      if (col.format === "currency")
        return new Intl.NumberFormat().format(value);
      if (col.format === "boolean") return value ? "✔" : "✖";
      return value;
    },
  },
};
</script>

<style>
/* Overlay tối mờ nhẹ */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 30, 30, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Popup content đẹp hơn */
.popup-content {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.2);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 50%;
  transition: all 0.3s ease;
}

/* Header với gradient hoặc màu nổi bật */
.popup-header {
  position: sticky;
  top: 0;
  background: linear-gradient(90deg, #4b6cb7, #182848);
  color: white;
  z-index: 10;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 14px;
  border-radius: 8px 8px 0 0;
}

/* Nút đóng nhẹ nhàng hơn */
.popup-close {
  position: absolute;
  top: 12px;
  right: 14px;
  background: #444;
  color: #fff;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.popup-close:hover {
  background: #222;
}

/* Body table */
.popup-body {
  flex: 1;
  overflow-y: auto;
  max-height: 60vh;
  margin-top: 8px;
}

/* Bảng hiện đại hơn */
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

/* Header bảng */
.data-table th {
  background: #f8f9fa;
  color: #333;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  padding: 12px;
  border-bottom: 2px solid #ddd;
}

/* Ô bảng */
.data-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
  color: #555;
}

/* Hover và selection */
.data-table tbody tr:hover {
  background-color: #f1f5f9;
}

.data-table tbody tr.selected {
  background-color: #e0f2fe !important;
  font-weight: 600;
}

/* Cố định header khi cuộn */
.data-table thead {
  position: sticky;
  top: 0;
  background: #f8f9fa;
  z-index: 5;
}

</style>
