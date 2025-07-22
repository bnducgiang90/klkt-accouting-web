<template>
  <div class="dm-khohang-layout">
    <div class="sidebar-pane">
      <KhoHangList
        :selectedKho="selectedKho"
        @select="onSelectKho"
        @add="onAddKho"
        @edit="onEditKho"
      />
    </div>
    <div class="main-pane">
      <NhomHangList
        :selectedKho="selectedKho"
        :selectedNhom="selectedNhom"
        @select="onSelectNhom"
        @add="onAddNhom"
        @edit="onEditNhom"
      />
    </div>
    <!-- Dialogs for add/edit sẽ bổ sung sau -->
  </div>
</template>

<script>
import KhoHangList from './KhoHangList.vue'
import NhomHangList from './NhomHangList.vue'
import KhoHangForm from './KhoHangForm.vue'
export default {
  name: 'DmKhoHang',
  components: { KhoHangList, NhomHangList },
  data() {
    return {
      selectedKho: null,
      selectedNhom: null,
    }
  },
  methods: {
    onSelectKho(kho) { this.selectedKho = kho; this.selectedNhom = null },
    onSelectNhom(nhom) { this.selectedNhom = nhom },
    onAddKho() {},
    onEditKho(kho) {},
    onAddNhom() {},
    onEditNhom(nhom) {},
  }
}
</script>

<style scoped>
.dm-khohang-layout {
  display: flex;
  height: 100%;
  gap: 10px;
}
.sidebar-pane {
  flex: 0 0 48%;
  min-width: 420px;
  max-width: 50%;
  display: flex;
  flex-direction: column;
}
.main-pane {
  flex: 1 1 0;
  min-width: 420px;
  display: flex;
  flex-direction: column;
}
</style>
