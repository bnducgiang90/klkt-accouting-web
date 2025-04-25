<template>
  <div id="page-container">
    <el-tabs id="content-box" v-model="activeTab" type="border-card" @tab-click="handleTabClick">
      <el-tab-pane label="Nhật ký chung" name="TAB_NHAT_KY_CHUNG">
        <NhatKyChung :popup-ref="popupRef" />
      </el-tab-pane>
      <el-tab-pane v-if="isHachToan" label="Hạch toán" name="TAB_HACH_TOAN">
        <HachToan :popup-ref="popupRef" />
      </el-tab-pane>
      <el-tab-pane v-if="isNhapVatTu" label="Nhập vật tư" name="TAB_NHAP_VAT_TU">
        <NhapVatTu :popup-ref="popupRef" />
      </el-tab-pane>
      <el-tab-pane v-if="isXuatVatTu" label="Xuất vật tư" name="TAB_XUAT_VAT_TU">
        <XuatVatTu :popup-ref="popupRef" />
      </el-tab-pane>
      <el-tab-pane v-if="isHoaDonMuaVao" label="Hóa đơn mua vào" name="TAB_HOA_DON_MUA_VAO">
        <HoaDonMuaVao />
      </el-tab-pane>
      <el-tab-pane v-if="isHoaDonBanRa" label="Hóa đơn bán ra" name="TAB_HOA_DON_BAN_RA">
        <HoaDonBanRa />
      </el-tab-pane>
    </el-tabs>
    <el-card id="control-box" class="border-card">
      <div class="button-container">
        <el-button>In chứng từ</el-button>
        <el-button>Thêm mới</el-button>
        <el-button>Ghi</el-button>
      </div>
    </el-card>
    <TablePopup ref="popupRef" />
  </div>

</template>

<script>
import NhatKyChung from './NhatKyChung'
import HachToan from './HachToan'
import NhapVatTu from './NhapVatTu'
import XuatVatTu from './XuatVatTu'
import HoaDonMuaVao from './HoaDonMuaVao'
import HoaDonBanRa from './HoaDonBanRa'
import { mapState, mapActions } from 'vuex'
import TablePopup from '@/components/TablePopup'

export default {
  components: {
    NhatKyChung,
    HachToan,
    NhapVatTu,
    XuatVatTu,
    HoaDonMuaVao,
    HoaDonBanRa,
    TablePopup
  },
  data() {
    return {
      popupRef: null, // Lưu reference của popup
      activeTab: 'TAB_NHAT_KY_CHUNG', // Tab mặc định khi load trang
      isHachToan: false,
      isNhapVatTu: false,
      isXuatVatTu: false,
      isHoaDonMuaVao: false,
      isHoaDonBanRa: false
    }
  },

  computed: {
    ...mapState('nhapchungtu', ['lstKhachHang', 'lstNhaCungCap', 'lstTaiKhoan']),
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
    ...mapActions('nhapchungtu', ['loaiChungTu', 'loadKhachHang', 'loadNhaCungCap', 'loadNguoiGiaoDich', 'loadTaiKhoan', 'loadHinhThucTT', 'loadVatTu', 'loadKhoHang', 'loadTaiKhoanNganHang', 'loadCanBo141', 'handleRowSelected', 'updateLoaiChungTu', 'updateTabType']),
    onSubmit() {
      console.log('submit!')
    },
    getLoaiChungTu() {
      const path = this.$route.path // Lấy đường dẫn hiện tại
      const parts = path.split('/') // Tách đường dẫn thành mảng

      if (parts.length < 3) return

      const loaiChungTu = parts[2]
      this.updateLoaiChungTu(loaiChungTu) // Cập nhật vào Vuex store

      // Mapping loại chứng từ với cấu hình tương ứng
      const configMap = {
        'phieuthutienmat': { isHachToan: true, isNhapVatTu: false, isXuatVatTu: true, isHoaDonMuaVao: false, isHoaDonBanRa: true },
        'phieuxuatvattucongcu': { isHachToan: true, isNhapVatTu: false, isXuatVatTu: true, isHoaDonMuaVao: false, isHoaDonBanRa: true },
        'banhangthutiensau': { isHachToan: true, isNhapVatTu: false, isXuatVatTu: true, isHoaDonMuaVao: false, isHoaDonBanRa: true },
        'phieuchitienmat': { isHachToan: true, isNhapVatTu: true, isXuatVatTu: false, isHoaDonMuaVao: true, isHoaDonBanRa: false },
        'phieunhapvattucongcu': { isHachToan: true, isNhapVatTu: true, isXuatVatTu: false, isHoaDonMuaVao: true, isHoaDonBanRa: false },
        'chungtunganhang': { isHachToan: true, isNhapVatTu: false, isXuatVatTu: false, isHoaDonMuaVao: true, isHoaDonBanRa: false },
        'chungtughiso': { isHachToan: true, isNhapVatTu: false, isXuatVatTu: false, isHoaDonMuaVao: false, isHoaDonBanRa: false },
        'chungtuluuchuyennoibo': { isHachToan: true, isNhapVatTu: true, isXuatVatTu: true, isHoaDonMuaVao: false, isHoaDonBanRa: false }
      }

      // Gán giá trị từ mapping, nếu không tìm thấy thì giữ nguyên giá trị hiện tại
      Object.assign(this, configMap[loaiChungTu] || {})
    },
    handleTabClick(tab) {
      this.updateTabType(tab.name) // Cập nhật state tabtype với giá trị tab hiện tại
    }
  },
  mounted() {
    this.popupRef = this.$refs.popupRef // Gán reference cho popup
    this.getLoaiChungTu()
    this.loadKhachHang()
    this.loadNhaCungCap()
    this.loadTaiKhoan()
    this.loadHinhThucTT()
    this.loadVatTu()
    this.loadNguoiGiaoDich()
    this.loadKhoHang()
    this.loadTaiKhoanNganHang()
    this.loadCanBo141()
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
