<template>
  <div class="dm-khohang-layout">
    <div class="page-header">
      <div class="breadcrumb-wrap">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>Danh mục chung</el-breadcrumb-item>
          <el-breadcrumb-item>Kho & Nhóm hàng</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      
    </div>
    <!-- Top pane: Kho list -->
    <div class="top-pane" :style="{ height: topHeightPercent + '%' }">
      <KhoHangList
        ref="khoList"
        :selectedKho="selectedKho"
        @select="onSelectKho"
        @add="onAddKho"
        @edit="onEditKho"
      />
    </div>
    <div class="splitter" @mousedown="startDrag"></div>
    <!-- Bottom pane: Nhom list of selected kho -->
    <div class="bottom-pane" :style="{ height: (100 - topHeightPercent) + '%' }">
      <NhomHangList
        ref="nhomList"
        :selectedKho="selectedKho"
        :selectedNhom="selectedNhom"
        @select="onSelectNhom"
        @add="onAddNhom"
        @edit="onEditNhom"
      />
    </div>
    <!-- Kho form dialog -->
    <KhoHangForm
      :visible.sync="khoFormVisible"
      :isEdit="isEditKho"
      :khoData="editingKho"
      @close="khoFormVisible = false"
      @success="handleKhoFormSuccess"
    />
  </div>
</template>

<script>
import KhoHangList from './KhoHangList.vue'
import NhomHangList from './NhomHangList.vue'
import KhoHangForm from './KhoHangForm.vue'
export default {
  name: 'DmKhoHang',
  components: { KhoHangList, NhomHangList, KhoHangForm },
  data() {
    return {
      selectedKho: null,
      selectedNhom: null,
      khoFormVisible: false,
      isEditKho: false,
      editingKho: null,
      topHeightPercent: 35, // Kho hàng 35%, nhóm hàng 65% vì nhóm hàng nhiều dữ liệu hơn
      dragging: false,
    }
  },
  methods: {
    onSelectKho(kho) { this.selectedKho = kho; this.selectedNhom = null },
    onSelectNhom(nhom) { this.selectedNhom = nhom },
    onAddKho() { this.isEditKho = false; this.editingKho = null; this.khoFormVisible = true },
    onEditKho(kho) { this.isEditKho = true; this.editingKho = kho; this.khoFormVisible = true },
    onAddNhom() {},
    onEditNhom(nhom) {},
    handleKhoFormSuccess() {
      // làm mới cả 2 panes để đồng bộ dữ liệu
      this.$refs && this.$refs.khoList && this.$refs.khoList.fetchKhoHang && this.$refs.khoList.fetchKhoHang()
      this.$refs && this.$refs.nhomList && this.$refs.nhomList.fetchNhomHang && this.$refs.nhomList.fetchNhomHang()
    },
    startDrag() {
      this.dragging = true
      window.addEventListener('mousemove', this.onDrag)
      window.addEventListener('mouseup', this.stopDrag)
    },
    onDrag(e) {
      if (!this.dragging) return
      const rect = this.$el.getBoundingClientRect()
      const y = e.clientY - rect.top
      let percent = (y / rect.height) * 100
      if (percent < 20) percent = 20
      if (percent > 70) percent = 70 // Giới hạn tối đa 70% cho kho hàng
      this.topHeightPercent = Math.round(percent)
    },
    stopDrag() {
      if (!this.dragging) return
      this.dragging = false
      window.removeEventListener('mousemove', this.onDrag)
      window.removeEventListener('mouseup', this.stopDrag)
    }
  }
}
</script>

<style scoped>
.dm-khohang-layout {
  display: flex;
  height: 100%;
  gap: 10px;
  flex-direction: column;
  /* Brand tokens */
  --brand-primary: #1976d2;
  --brand-accent: #ff9800;
  --surface: #ffffff;
  --muted: #5f6b7a;
  --th-bg-start: #e3f0ff;
  --th-bg-end: #f8fbff;
}
.page-header {
  background: var(--surface);
  border-radius: 12px;
  padding: 12px 16px 8px 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  margin-bottom: 6px;
}
.breadcrumb-wrap {
  color: var(--muted);
}
.title-wrap {
  display: flex;
  align-items: baseline;
  gap: 12px;
}
.title-wrap h2 {
  margin: 6px 0 0 0;
  font-weight: 700;
  color: var(--brand-primary);
}
.title-wrap p {
  margin: 8px 0 0 0;
  color: var(--muted);
}
.top-pane,
.bottom-pane {
  display: flex;
  flex-direction: column;
  min-height: 30vh;
  overflow: auto;
  padding-bottom: 12px; /* ensure inner pagination not covered by browser UI */
}
.top-pane { flex: 0 0 auto; }
.bottom-pane { flex: 1 1 auto; }
.splitter {
  height: 6px;
  cursor: row-resize;
  background: linear-gradient(90deg, var(--th-bg-start, #e3f0ff) 0%, var(--th-bg-end, #f8fbff) 100%);
  border-radius: 4px;
  margin: 8px 0;
}
</style>
