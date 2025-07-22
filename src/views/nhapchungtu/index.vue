<template>
  <div id="page-container">
    <NhatKyChung :popup-ref="popupRef" />
    <el-tabs
      id="content-box"
      v-model="activeTab"
      type="border-card"
      @tab-click="handleTabClick"
    >
      <!-- <el-tab-pane label="Nhật ký chung" name="TAB_NHAT_KY_CHUNG">
        <NhatKyChung :popup-ref="popupRef" />
      </el-tab-pane> -->
      <el-tab-pane v-if="isHachToan" label="Hạch toán" name="TAB_HACH_TOAN">
        <HachToan :popup-ref="popupRef" />
      </el-tab-pane>
      <el-tab-pane
        v-if="isNhapVatTu"
        label="Nhập vật tư"
        name="TAB_NHAP_VAT_TU"
      >
        <NhapVatTu :popup-ref="popupRef" />
      </el-tab-pane>
      <el-tab-pane
        v-if="isXuatVatTu"
        label="Xuất vật tư"
        name="TAB_XUAT_VAT_TU"
      >
        <XuatVatTu :popup-ref="popupRef" />
      </el-tab-pane>
      <el-tab-pane
        v-if="isHoaDonMuaVao"
        label="Hóa đơn mua vào"
        name="TAB_HOA_DON_MUA_VAO"
      >
        <HoaDonMuaVao :popup-ref="popupRef" />
      </el-tab-pane>
      <el-tab-pane
        v-if="isHoaDonBanRa"
        label="Hóa đơn bán ra"
        name="TAB_HOA_DON_BAN_RA"
      >
        <HoaDonBanRa :popup-ref="popupRef" />
      </el-tab-pane>
    </el-tabs>
    <el-card id="control-box" class="border-card">
      <div class="button-container">
        <el-button>In chứng từ</el-button>
        <el-button @click="sendData">Ghi</el-button>
      </div>
    </el-card>
    <TablePopup ref="popupRef" />
  </div>
</template>

<script>
import NhatKyChung from "./NhatKyChung";
import HachToan from "./HachToan";
import NhapVatTu from "./NhapVatTu";
import XuatVatTu from "./XuatVatTu";
import HoaDonMuaVao from "./HoaDonMuaVao";
import HoaDonBanRa from "./HoaDonBanRa";
import { mapState, mapActions } from "vuex";
import TablePopup from "@/components/TablePopup";

export default {
  components: {
    NhatKyChung,
    HachToan,
    NhapVatTu,
    XuatVatTu,
    HoaDonMuaVao,
    HoaDonBanRa,
    TablePopup,
  },
  data() {
    return {
      popupRef: null, // Lưu reference của popup
      activeTab: "TAB_HACH_TOAN", // Tab mặc định khi load trang
      isHachToan: false,
      isNhapVatTu: false,
      isXuatVatTu: false,
      isHoaDonMuaVao: false,
      isHoaDonBanRa: false,
    };
  },

  computed: {
    ...mapState("nhapchungtu", [
      "lstKhachHang",
      "lstNhaCungCap",
      "lstTaiKhoan",
    ]),
    popupData() {
      return this.popup.data;
    },
    popupColumns() {
      return this.popup.columns;
    },
    popupWidth() {
      return this.popup.width;
    },
    popupFullscreen() {
      return this.popup.fullscreen;
    },
    popupTitle() {
      return this.popup.title;
    },
  },

  methods: {
    ...mapActions("nhapchungtu", [
      "loaiChungTu",
      "loadKhachHang",
      "loadNhaCungCap",
      "loadNguoiGiaoDich",
      "loadTaiKhoan",
      "loadHinhThucTT",
      "loadVatTu",
      "loadKhoHang",
      "loadTaiKhoanNganHang",
      "loadCanBo141",
      "handleRowSelected",
      "updateLoaiChungTu",
      "updateTabType",
      "sendData",
    ]),
    onSubmit() {
      console.log("submit!");
    },
    getLoaiChungTu() {
      const path = this.$route.path; // Lấy đường dẫn hiện tại
      const parts = path.split("/"); // Tách đường dẫn thành mảng

      if (parts.length < 3) return;

      const loaiChungTu = parts[2];
      this.updateLoaiChungTu(loaiChungTu); // Cập nhật vào Vuex store

      // Mapping loại chứng từ với cấu hình tương ứng
      const configMap = {
        phieuthutienmat: {
          isHachToan: true,
          isNhapVatTu: false,
          isXuatVatTu: true,
          isHoaDonMuaVao: false,
          isHoaDonBanRa: true,
        },
        phieuchitienmat: {
          isHachToan: true,
          isNhapVatTu: true,
          isXuatVatTu: false,
          isHoaDonMuaVao: true,
          isHoaDonBanRa: false,
        },
        phieunhapvattucongcu: {
          isHachToan: true,
          isNhapVatTu: true,
          isXuatVatTu: false,
          isHoaDonMuaVao: true,
          isHoaDonBanRa: false,
        },
        phieuxuatvattucongcu: {
          isHachToan: true,
          isNhapVatTu: false,
          isXuatVatTu: true,
          isHoaDonMuaVao: false,
          isHoaDonBanRa: true,
        },
        banhangthutiensau: {
          isHachToan: true,
          isNhapVatTu: false,
          isXuatVatTu: true,
          isHoaDonMuaVao: false,
          isHoaDonBanRa: true,
        },
        chungtunganhang: {
          isHachToan: true,
          isNhapVatTu: false,
          isXuatVatTu: false,
          isHoaDonMuaVao: true,
          isHoaDonBanRa: false,
        },
        chungtughiso: {
          isHachToan: true,
          isNhapVatTu: false,
          isXuatVatTu: false,
          isHoaDonMuaVao: false,
          isHoaDonBanRa: false,
        },
        chungtuluuchuyennoibo: {
          isHachToan: true,
          isNhapVatTu: true,
          isXuatVatTu: true,
          isHoaDonMuaVao: false,
          isHoaDonBanRa: false,
        },
      };

      // Gán giá trị từ mapping, nếu không tìm thấy thì giữ nguyên giá trị hiện tại
      Object.assign(this, configMap[loaiChungTu] || {});
    },
    handleTabClick(tab) {
      this.updateTabType(tab.name); // Cập nhật state tabtype với giá trị tab hiện tại
    },
  },
  mounted() {
    this.popupRef = this.$refs.popupRef; // Gán reference cho popup
    this.getLoaiChungTu();
    this.loadKhachHang();
    this.loadNhaCungCap();
    this.loadTaiKhoan();
    // this.loadTaiKhoanChiTiet()
    this.loadHinhThucTT();
    this.loadVatTu();
    this.loadNguoiGiaoDich();
    this.loadKhoHang();
    this.loadTaiKhoanNganHang();
    this.loadCanBo141();
  },
};
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
  height: 100%; /* Đảm bảo container chiếm toàn bộ chiều cao của parent */
  min-height: 100%; /* Đề phòng trường hợp parent không có chiều cao cố định */
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

/* ======================MOI THEM============================ */
/* Vùng bao popup bảng */
.popup-table-wrapper {
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Container bảng */
.table-container {
  overflow-x: auto;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Nếu component TableData render <table>, áp dụng CSS bên dưới */
.table-container table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
}

.table-container th {
  background-color: #f1f5f9;
  font-weight: bold;
  padding: 10px 14px;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
  text-align: left;
}

.table-container td {
  padding: 10px 14px;
  border-bottom: 1px solid #f1f5f9;
  color: #475569;
  vertical-align: middle;
}

.table-container tr:hover {
  background-color: #f9fafb;
}

/* Căn phải các cột cần căn phải */
.table-container td.align-right {
  text-align: right;
}

/* Căn giữa các cột cần căn giữa */
.table-container td.align-center {
  text-align: center;
}

/* Tùy chọn: tô đậm dòng tổng hoặc dòng quan trọng */
.table-container tr.summary-row td {
  font-weight: bold;
  background-color: #fef9c3;
}

/* Tùy chọn: dòng bị chọn */
.table-container tr.selected-row {
  background-color: #e0f2fe !important;
}

/* Cải thiện giao diện input nếu có ô nhập trong bảng */
.table-container input {
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
  width: 100%;
  box-sizing: border-box;
}

.table-container input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}
</style>
