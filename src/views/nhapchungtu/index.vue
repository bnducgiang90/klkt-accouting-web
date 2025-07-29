<template>
  <div id="page-container">
    <div class="grp-nhat-ky-chung">
      <NhatKyChung :popup-ref="popupRef" />
    </div>
    
    <div class="grp-table">
      <HachToan v-if="activeTab === 'TAB_HACH_TOAN'" :popup-ref="popupRef" />
      <NhapVatTu v-if="activeTab === 'TAB_NHAP_VAT_TU'" :popup-ref="popupRef" />
      <XuatVatTu v-if="activeTab === 'TAB_XUAT_VAT_TU'" :popup-ref="popupRef" />
      <HoaDonMuaVao v-if="activeTab === 'TAB_HOA_DON_MUA_VAO'"  :popup-ref="popupRef" />
      <HoaDonBanRa v-if="activeTab === 'TAB_HOA_DON_BAN_RA'"  :popup-ref="popupRef" />
    </div>

    <div class="grp-control">
      <div class="grp-control-tab">
        <span v-if="isHachToan" @click="activeTab = 'TAB_HACH_TOAN'"  :class="{ 'active-tab': activeTab === 'TAB_HACH_TOAN' }">Hạch toán</span>
        <span v-if="isNhapVatTu" @click="activeTab = 'TAB_NHAP_VAT_TU'" :class="{ 'active-tab': activeTab === 'TAB_NHAP_VAT_TU' }">Nhập vật tư</span>
        <span v-if="isXuatVatTu" @click="activeTab = 'TAB_XUAT_VAT_TU'" :class="{ 'active-tab': activeTab === 'TAB_XUAT_VAT_TU' }">Xuất vật tư</span>
        <span v-if="isHoaDonMuaVao" @click="activeTab = 'TAB_HOA_DON_MUA_VAO'" :class="{ 'active-tab': activeTab === 'TAB_HOA_DON_MUA_VAO' }">Hóa đơn mua vào</span>
        <span v-if="isHoaDonBanRa" @click="activeTab = 'TAB_HOA_DON_BAN_RA'" :class="{ 'active-tab': activeTab === 'TAB_HOA_DON_BAN_RA' }">Hóa đơn bán ra</span>
      </div>
      <div class="grp-control-button">
        <span style="color: green; font-weight: bold;">hdr_id: {{ nhatKyChung.chungTu.hdr_id }}</span>
        <el-divider direction="vertical"></el-divider>
        <el-button type="info">In chứng từ</el-button>
        <el-button type="success"  @click="sendData">Ghi</el-button>
      </div>
    </div>
    
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
      "nhatKyChung",
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

#page-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Hoặc 100% nếu cha đã có chiều cao */
}

/* Phần đầu */
.grp-nhat-ky-chung {
  flex: 0 0 auto; /* Không co giãn, không chiếm thêm không gian */
}

/* Phần giữa */
.grp-table {
  flex: 1 1 auto; /* Co giãn để chiếm khoảng giữa */
  overflow: auto; /* Nếu nội dung dài thì scroll */
}

/* Phần dưới */
.grp-control {
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  /* padding: 10px; */
  border-top: 1px solid #ccc;
  background-color: #f8f8f8;
  height: 87px;
}

/* Tab bên trái */
.grp-control-tab {
  display: flex;
  gap: 0px; /* khoảng cách giữa các tab */
}

.grp-control-tab span {
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: 0 0 4px 4px; /* Bo góc dưới thay vì trên */
  background-color: transparent;
  cursor: pointer;
  color: #606266;
  font-weight: 500;
  transition: all 0.2s ease;
}

.grp-control-tab span:hover {
  background-color: #f5f7fa;
}

/* Tab đang được chọn */
.grp-control-tab .active-tab {
  background-color: #ffffff;
  border-color: white #dcdfe6 #dcdfe6;
  border-top: 2px solid white; /* xóa đường viền giữa tab và nội dung */
  color: #409EFF;
  font-weight: 600;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1); /* đổ bóng hướng lên trên */
}

/* Button bên phải */
.grp-control-button {
  text-align: right;
  margin-right: 50px;
}


/* ===== CHỈNH KHOẢNG CÁCH GIỮA CÁC DÒNG - DÒNG TRÊN VS DÒNG DƯỚI */
.el-form-item {
    margin-bottom: 8px;
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
  padding: 2px 4px;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
  text-align: left;
}

.table-container td {
  padding: 5px 7px;
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
  padding: 2px 4px;
  font-size: 12px;
  width: 100%;
  box-sizing: border-box;
}

.table-container input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

</style>
