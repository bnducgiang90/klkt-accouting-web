// PopupTable.vue
<template>
  <div v-if="visible" class="popup-overlay">
    <div class="popup-content">
      <table>
        <thead>
          <tr>
            <th v-for="(col, index) in columns" :key="index">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index" @click="selectRow(row)">
            <td v-for="(value, key) in row" :key="key">{{ value }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="closePopup">Đóng</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    data: Array,
    onSelect: Function
  },
  computed: {
    columns() {
      return this.data.length > 0 ? Object.keys(this.data[0]) : []
    }
  },
  methods: {
    selectRow(row) {
      this.onSelect(row)
      this.$emit('update:visible', false)
    },
    closePopup() {
      this.$emit('update:visible', false)
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
}
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}
tr:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>
