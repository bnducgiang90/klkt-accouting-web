<template>
  <div class="container">
    <div class="panel-wrapper">
      <div class="panel-label">Thông tin chứng từ</div>
      <!-- BÊN TRÁI -->
      <div class="left-panel">
        <!-- Dòng 1 -->
        <el-row :gutter="10">
          <el-col :span="12">
            <floating-input v-model="nhatKyChung.chungTu.sttgs" label="STT GS" />
          </el-col>
          <el-col :span="12">
            <floating-input v-model="nhatKyChung.chungTu.kyHieuSoCT" label="Ký hiệu - Số CT" />
          </el-col>
        </el-row>

        <!-- Dòng 2 -->
        <el-row :gutter="10" class="row-margin">
          <el-col :span="8">
            <el-date-picker v-model="nhatKyChung.chungTu.ngay" type="date" placeholder="Chọn ngày" format="dd/MM/yyyy" value-format="dd/MM/yyyy" style="width: 100%;" />
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="nhatKyChung.chungTu.hienSoChungTu">Hiện số chứng từ</el-checkbox>
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="nhatKyChung.thongTinKhachHang.hachToanNgoaiTe">Hạch toán ngoại tệ</el-checkbox>
          </el-col>
        </el-row>

        <!-- Dòng 3 -->
        <el-row class="row-margin">
          <el-col :span="24">
            <floating-input v-model="nhatKyChung.chungTu.noiDung" label="Nội dung" />
          </el-col>
        </el-row>

        <!-- Dòng 4 -->
        <el-row :gutter="10" class="row-margin">
          <el-col :span="8">
            <floating-input v-model="nhatKyChung.chungTu.khachHang" label="Khách hàng" />
          </el-col>
          <el-col :span="2" class="input-button-group">
            <el-button icon="el-icon-more" class="align-button" @click="openPopupKhachHang"/>
          </el-col>
          <el-col :span="8">
            <floating-input v-model="nhatKyChung.thongTinKhachHang.nhaCungCap" label="Nhà cung cấp" />
          </el-col>
          <el-col :span="2" class="input-button-group">
            <el-button icon="el-icon-more" class="align-button" @click="openPopupNhaCungCap" />
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- BÊN PHẢI -->
    <div class="panel-wrapper">
      <div class="panel-label">Thông tin khách hàng</div>
      <div class="right-panel">
        <!-- Dòng 1 -->
        <el-row :gutter="10">
          <el-col :span="6">
            <floating-input v-model="nhatKyChung.thongTinKhachHang.maSoThue" label="Mã số thuế" />
          </el-col>
          <el-col :span="2" class="input-button-group">
            <el-button icon="el-icon-check" class="align-button" @click="checkMst" />
          </el-col>
          <el-col :span="16">
            <floating-input v-model="nhatKyChung.thongTinKhachHang.tenDonVi" label="Tên đơn vị" />
          </el-col>
        </el-row>

        <!-- Dòng 2 -->
        <el-row :gutter="10" class="row-margin">
          <el-col :span="14">
            <floating-input v-model="nhatKyChung.thongTinKhachHang.diaChi" label="Địa chỉ" />
          </el-col>
          <el-col :span="10">
            <floating-input v-model="nhatKyChung.thongTinKhachHang.dienThoai" label="Số điện thoại" />
          </el-col>
        </el-row>

        <!-- Dòng 3 -->
        <el-row :gutter="10" class="row-margin">
          <el-col :span="8">
            <floating-input v-model="nhatKyChung.thongTinKhachHang.soTaiKhoan" label="Số tài khoản" />
          </el-col>
          <el-col :span="2" class="input-button-group">
            <el-button icon="el-icon-more" class="align-button" @click="openPopupTaiKhoanNganHang" />
          </el-col>
          <el-col :span="14">
            <floating-input v-model="nhatKyChung.thongTinKhachHang.nganHang" label="Ngân hàng" />
          </el-col>
        </el-row>

        <!-- Dòng 4 -->
        <el-row :gutter="10" class="row-margin">
          <el-col :span="10">
            <el-select v-model="nhatKyChung.thongTinKhachHang.hinhThucTT" placeholder="Chọn">
              <el-option label="Tiền mặt" value="tienmat" />
              <el-option label="Chuyển khoản" value="ck" />
            </el-select>
          </el-col>
          <el-col :span="10">
            <floating-input v-model="nhatKyChung.thongTinKhachHang.tenNguoiGiaoDich" label="Người giao dịch" />
          </el-col>
          <el-col :span="2" class="input-button-group">
            <el-button icon="el-icon-more" class="align-button" @click="openPopupNguoiGiaoDich" />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import FloatingInput from "@/components/FloatingInput";
import { mapState, mapActions } from "vuex";

export default {
  name: "NhatKyChung",
  components: { FloatingInput },
  props: ["popupRef"],
  data() {
    return {
      // selectedRow: null,
      columnKhachHangPopupTable: [
        { prop: "id", label: "ID", width: "120px" },
        { prop: "cap", label: "Cấp", width: "80px", align: "center" },
        { prop: "mst_kh_ncc", label: "Mã số thuế", width: "100px" },
        { prop: "ten_congty", label: "Tên đơn vị", width: "250px" },
        {
          prop: "du_no",
          label: "Dư nợ",
          width: "150px",
          align: "right",
          format: "currency",
        },
        {
          prop: "du_co",
          label: "Dư có",
          width: "150px",
          align: "right",
          format: "currency",
        },
        { prop: "dia_chi", label: "Địa chỉ", width: "250px", wrapText: true },
        { prop: "huyen", label: "Huyện", width: "150px" },
        { prop: "tinh", label: "Tỉnh", width: "150px" },
        { prop: "dien_thoai", label: "Điện thoại", width: "120px" },
        { prop: "ten_giamdoc", label: "Tên giám đốc", width: "180px" },
        { prop: "ten_ketoan", label: "Tên kế toán", width: "180px" },
        { prop: "linh_vuc_kd", label: "Lĩnh vực DK", width: "150px" },
        { prop: "khach_hang", label: "Khách hàng", width: "180px" },
        { prop: "nha_cungcap", label: "Nhà cung cấp", width: "180px" },
        { prop: "tai_khoan", label: "Tài khoản", width: "120px" },
        { prop: "ngan_hang", label: "Ngân hàng", width: "200px" },
        { prop: "email", label: "Địa chỉ Email", width: "200px" },
      ],
      columnNhaCungCapPopupTable: [
        { prop: "id", label: "ID", minWidth: "120px" },
        { prop: "cap", label: "Cấp", minWidth: "80px", align: "center" },
        { prop: "mst_kh_ncc", label: "Mã số thuế", minWidth: "100px" },
        {
          prop: "ten_congty",
          label: "Tên đơn vị",
          minWidth: "200px",
          maxWidth: "250px",
          wrapText: true,
        },
        {
          prop: "du_no",
          label: "Dư nợ",
          minWidth: "150px",
          align: "right",
          format: "currency",
        },
        {
          prop: "du_co",
          label: "Dư có",
          minWidth: "150px",
          align: "right",
          format: "currency",
        },
        {
          prop: "dia_chi",
          label: "Địa chỉ",
          minWidth: "250px",
          wrapText: true,
        },
        { prop: "huyen", label: "Huyện", minWidth: "150px" },
        { prop: "tinh", label: "Tỉnh", minWidth: "150px" },
        { prop: "dien_thoai", label: "Điện thoại", minWidth: "120px" },
        { prop: "ten_giamdoc", label: "Tên giám đốc", minWidth: "180px" },
        { prop: "ten_ketoan", label: "Tên kế toán", minWidth: "180px" },
        { prop: "linh_vuc_kd", label: "Lĩnh vực DK", minWidth: "150px" },
        { prop: "khach_hang", label: "Khách hàng", minWidth: "180px" },
        { prop: "nha_cungcap", label: "Nhà cung cấp", minWidth: "180px" },
        { prop: "tai_khoan", label: "Tài khoản", minWidth: "120px" },
        { prop: "ngan_hang", label: "Ngân hàng", minWidth: "200px" },
        { prop: "email", label: "Địa chỉ Email", minWidth: "200px" },
      ],
      columnNguoiGiaoDichPopupTable: [
        { prop: "ma_nguoi_gd", label: "Mã người giao dịch", width: "100px" },
        { prop: "ten_nguoi_gd", label: "Tên người giao dịch", width: "180px" },
      ],
      columnTaiKhoanNganHangPopupTable: [
        { prop: "mst", label: "Mã số thuế" },
        { prop: "so_tk_nh", label: "Số tài khoản" },
        { prop: "ten_nh", label: "Tên ngân hàng" },
      ],
    };
  },
  computed: {
    ...mapState("nhapchungtu", [
      "nhatKyChung",
      "lstHinhThucTT",
      "lstKhachHang",
      "lstNhaCungCap",
      "lstNguoiGiaoDich",
      "lstTaiKhoanNganHang",
    ]),
  },
  methods: {
    ...mapActions("nhapchungtu", ["updateMultipleNhatKyChung"]),
    handleSelect(row) {
      console.log(row);
    },
    async checkMst() {
      const mstCanTim = (this.nhatKyChung?.thongTinKhachHang?.maSoThue || '').trim();
      if (!mstCanTim) {
        this.$message.warning('Vui lòng nhập mã số thuế cần kiểm tra.');
        return;
      }

      // Tìm trong lstKhachHang
      const khachHang = this.lstKhachHang.find(item => item.mst_kh_ncc === mstCanTim);

      if (khachHang) {
        this.$message.success('Tìm thấy trong danh sách khách hàng.');
        console.log('Thông tin khách hàng:', khachHang);
        this.updateMultipleNhatKyChung([
          { path: "chungTu.khachHang", value: khachHang.id },
          { path: "thongTinKhachHang.tenDonVi", value: khachHang.ten_congty },
          { path: "thongTinKhachHang.diaChi", value: khachHang.dia_chi },
          { path: "thongTinKhachHang.dienThoai", value: khachHang.dien_thoai },
          { path: "thongTinKhachHang.email", value: khachHang.email },
        ]);
        return;
      }

      // Nếu không tìm thấy, tìm tiếp trong lstNhaCungCap
      const nhaCungCap = this.lstNhaCungCap.find(item => item.mst_kh_ncc === mstCanTim);

      if (nhaCungCap) {
        this.$message.success('Tìm thấy trong danh sách nhà cung cấp.');
        console.log('Thông tin nhà cung cấp:', nhaCungCap);
        this.updateMultipleNhatKyChung([
          { path: "thongTinKhachHang.nhaCungCap", value: nhaCungCap.id },
          { path: "thongTinKhachHang.tenDonVi", value: nhaCungCap.ten_congty },
          { path: "thongTinKhachHang.diaChi", value: nhaCungCap.dia_chi },
          { path: "thongTinKhachHang.dienThoai", value: nhaCungCap.dien_thoai },
          { path: "thongTinKhachHang.email", value: nhaCungCap.email },
        ]);
        return;
      }

      // Không tìm thấy ở cả 2
      this.$message.error('Không tìm thấy mã số thuế trong danh sách khách hàng hoặc nhà cung cấp.');
    },
    async openPopupKhachHang() {
      if (this.popupRef) {
        const result = await this.popupRef.openPopup({
          title: "DANH MỤC KHÁCH HÀNG",
          width: "90%",
          columns: this.columnKhachHangPopupTable,
          data: this.lstKhachHang,
        });
        if (result) {
          // this.selectedRow = result
          console.log(result);
          this.updateMultipleNhatKyChung([
            { path: "chungTu.khachHang", value: result.id },
            { path: "thongTinKhachHang.maSoThue", value: result.mst_kh_ncc },
            { path: "thongTinKhachHang.tenDonVi", value: result.ten_congty },
            { path: "thongTinKhachHang.diaChi", value: result.dia_chi },
            { path: "thongTinKhachHang.dienThoai", value: result.dien_thoai },
            { path: "thongTinKhachHang.email", value: result.email },
          ]);
        }
      }
    },
    async openPopupNhaCungCap() {
      if (this.popupRef) {
        const result = await this.popupRef.openPopup({
          title: "DANH MỤC NHÀ CUNG CẤP",
          width: "90%",
          columns: this.columnNhaCungCapPopupTable,
          data: this.lstNhaCungCap,
        });
        if (result) {
          // this.selectedRow = result
          console.log(result);
          this.updateMultipleNhatKyChung([
            { path: "thongTinKhachHang.nhaCungCap", value: result.id },
            { path: "thongTinKhachHang.maSoThue", value: result.mst_kh_ncc },
            { path: "thongTinKhachHang.tenDonVi", value: result.ten_congty },
            { path: "thongTinKhachHang.diaChi", value: result.dia_chi },
            { path: "thongTinKhachHang.dienThoai", value: result.dien_thoai },
            { path: "thongTinKhachHang.email", value: result.email },
          ]);
        }
      }
    },
    async openPopupNguoiGiaoDich() {
      if (this.popupRef) {
        const result = await this.popupRef.openPopup({
          title: "DANH MỤC NGƯỜI GIAO DỊCH",
          width: "50%",
          columns: this.columnNguoiGiaoDichPopupTable,
          data: this.lstNguoiGiaoDich,
        });
        if (result) {
          // this.selectedRow = result
          console.log(result);
          this.updateMultipleNhatKyChung([
            {
              path: "thongTinKhachHang.maNguoiGiaoDich",
              value: result.ma_nguoi_gd,
            },
            {
              path: "thongTinKhachHang.tenNguoiGiaoDich",
              value: result.ten_nguoi_gd,
            },
          ]);
        }
      }
    },
    async openPopupTaiKhoanNganHang() {
      if (this.popupRef) {
        const result = await this.popupRef.openPopup({
          title: "DANH MỤC TÀI KHOẢN NGÂN HÀNG",
          width: "50%",
          columns: this.columnTaiKhoanNganHangPopupTable,
          data: this.lstTaiKhoanNganHang,
        });
        if (result) {
          // this.selectedRow = result
          console.log(result);
          this.updateMultipleNhatKyChung([
            { path: "thongTinKhachHang.soTaiKhoan", value: result.so_tk_nh },
            { path: "thongTinKhachHang.nganHang", value: result.ten_nh },
          ]);
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.panel-wrapper {
  position: relative;
  flex: 1;
  margin-bottom: 20px;
}

/* Label nổi trên border */
.panel-label {
  position: absolute;
  top: -10px;
  left: 10px;
  background: #fafafa;
  padding: 0 8px;
  font-size: 14px;
  color: #409EFF;
  font-weight: bold;
  z-index: 1;
}

/* Khung chính */
.left-panel,
.right-panel {
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  background-color: #fafafa;
  padding: 20px;
  padding-top: 30px; /* chừa chỗ cho label nổi */
  min-height: 200px;
}

/* Giãn cách giữa các dòng */
.row-margin {
  margin-top: 15px;
}

/* Căn giữa button so với input */
.input-button-group {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Điều chỉnh lại chiều cao button cho khớp input */
.align-button {
  height: 36px;
  padding: 0 10px;
  font-size: 16px;
}

/* Cho el-form-item style "top" label để label combobox giống floating */
::v-deep(.el-form-item__label) {
  font-size: 13px;
  color: #909399;
}
</style>

