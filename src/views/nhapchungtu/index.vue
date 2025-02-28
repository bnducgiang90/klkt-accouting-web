<template>
  <div id="page-container">
    <el-tabs id="content-box" v-model="activeTab" type="border-card" @tab-click="handleTabClick">
      <el-tab-pane label="Nhật ký chung" name="TAB_NHAT_KY_CHUNG">
        <NhatKyChung />
      </el-tab-pane>
      <el-tab-pane label="Hạch toán" name="TAB_HACH_TOAN">
        <HachToan />
      </el-tab-pane>
      <el-tab-pane label="Nhập vật tư" name="TAB_VAT_TU">
        <NhapVatTu />
      </el-tab-pane>
      <el-tab-pane label="Hóa đơn mua vào" name="TAB_HOA_DON_MUA_VAO">
        <HoaDonMuaVao />
      </el-tab-pane>
    </el-tabs>
    <el-card id="control-box" class="border-card">
      <div class="button-container">
        <el-button>In chứng từ</el-button>
        <el-button>Thêm mới</el-button>
        <el-button>Ghi</el-button>
      </div>
    </el-card>
    <VuePopupTable
      :title="popupTitle"
      :visible.sync="popupVisible"
      :width="popupWidth"
      :fullscreen="popupFullscreen"
      :table-data="popupData"
      :columns="popupColumns"
      @row-selected="handleRowSelected"
    />
  </div>
</template>

<script>
import NhatKyChung from './NhatKyChung'
import HachToan from './HachToan'
import NhapVatTu from './NhapVatTu'
import HoaDonMuaVao from './HoaDonMuaVao'
import { mapState, mapActions } from 'vuex'
import VuePopupTable from '@/components/VuePopupTable'

export default {
  components: {
    NhatKyChung,
    HachToan,
    NhapVatTu,
    HoaDonMuaVao,
    VuePopupTable
  },

  data() {
    return {
      activeTab: 'TAB_NHAT_KY_CHUNG' // Tab mặc định khi load trang
    }
  },

  computed: {
    ...mapState('nhapchungtu', ['popup', 'lstKhachHang', 'lstNhaCungCap', 'lstTaiKhoan']),
    popupVisible: {
      get() {
        return this.popup.showPopup
      },
      set(value) {
        this.showPopup(value)
      }
    },
    popupData() {
      return this.popup.data
    },
    popupColumns() {
      return this.popup.columns
    },
    popupWidth() {
      return this.popup.width
    },
    popupFullscreen() {
      return this.popup.fullscreen
    },
    popupTitle() {
      return this.popup.title
    }
  },

  methods: {
    ...mapActions('nhapchungtu', ['togglePopup', 'loadKhachHang', 'loadNhaCungCap', 'loadTaiKhoan', 'loadHinhThucTT', 'handleRowSelected', 'updateLoaiChungTu', 'updateTabType']),
    onSubmit() {
      console.log('submit!')
    },
    // handleRowSelected(row) {
    //   console.log('Dòng được chọn:', row)
    // },
    showPopup(show) {
      this.togglePopup(show)
    },
    getLoaiChungTu() {
      const path = this.$route.path // Lấy đường dẫn hiện tại, ví dụ: /nhap/phieuchitienmat/index
      const parts = path.split('/') // Tách đường dẫn thành các phần
      console.log(path)

      if (parts.length >= 3) {
        this.updateLoaiChungTu(parts[2]) // Cập nhật vào Vuex store
      }
    },
    handleTabClick(tab) {
      this.updateTabType(tab.name) // Cập nhật state tabtype với giá trị tab hiện tại
    }
  },
  mounted() {
    this.getLoaiChungTu()
    // this.loadKhachHang()
    this.loadNhaCungCap()
    // this.loadTaiKhoan()
    this.loadHinhThucTT()
  }
}
</script>

<style>

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container-row {
  display: flex;
  gap: 10px; /* Khoảng cách giữa 2 card */
}

#page-container {
  display: flex;
  flex-direction: column;
}

#content-box {
  flex-grow: 1;
  overflow: auto;
}

#control-box {
  width: 100%;
  position: sticky;
  bottom: 0;
  z-index: 100;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px; /* Khoảng cách giữa các nút */
}
</style>
