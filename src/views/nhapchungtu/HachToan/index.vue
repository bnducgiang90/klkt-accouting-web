<template>
  <div>
    <TableData
      :columns="hachToan.columns"
      :data="hachToan.data"
      @update-data="updateTableData"
      @space-key-pressed="handlePressSpaceKey"
    />
  </div>
</template>

<script>
import TableData from '../TableData'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    TableData
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('nhapchungtu', ['popup', 'hachToan'])
  },
  methods: {
    ...mapActions('nhapchungtu', ['togglePopup', 'upsertHachToan', 'deleteHachToan']),
    handlePressSpaceKey(data) {
      console.log('truyen vao', data)
      alert(`Space pressed in ${data.col.label}: ${data.row[data.col.prop]}`)
    },
    updateTableData(newData) {
      console.log('updateTableData', newData)
      if (newData.inserting) {
        // Xóa các thuộc tính không cần thiết trước khi cập nhật
        const cleanedRow = Object.fromEntries(
          Object.entries(newData).filter(([key]) => !['editing', 'inserting', 'updating', 'deleting', 'originalData'].includes(key))
        )
        console.log('Clean row: ', cleanedRow)
        this.upsertHachToan(cleanedRow)
      }
      if (newData.updating) {
        // Xóa các thuộc tính không cần thiết trước khi cập nhật
        const cleanedRow = Object.fromEntries(
          Object.entries(newData).filter(([key]) => !['editing', 'inserting', 'updating', 'deleting', 'originalData'].includes(key))
        )
        console.log('Clean row: ', cleanedRow)
        this.upsertHachToan(cleanedRow)
      }
      if (newData.deleting) {
        console.log('Thuc hien delete')

        this.deleteHachToan(newData.dongChungTu)
      }
    },
    deleteTableData(id) {
      this.deleteHachToan(id)
    }
  }
}
</script>

<style>
</style>
