<template>
  <div>
    <el-form
      ref="form"
      :model="nhatKyChung"
      size="medium"
      label-width="120px"
      label-position="left"
    >
      <div id="nkc-container">
        <div id="nkc-container-trai">
          <el-card class="box-card">
            <div id="nkc-container-trai-header" slot="header" class="clearfix container-row" style="display: flex; justify-content: space-between; align-items: end;">
              <span>Chứng từ: </span>
              <el-input 
                v-model="nhatKyChung.chungTu.hdr_id"
                placeholder="HDR_ID"
                disabled
                style="width: 180px; height: 19px; margin-left: auto;"
                size="small"
              />
              <!-- <span>{{this.nhatKyChung.chungTu.hdr_id}}</span> -->
            </div>
            <div id="nkc-container-trai-body">
              <div id="nkc-container-trai-body-line1" class="container-row">
                <el-form-item label="STT_GS">
                  <el-input
                    v-model="nhatKyChung.chungTu.sttgs"
                    placeholder="Điền vào STT_GS"
                    type="number"
                  />
                </el-form-item>
                <el-form-item label="Ký hiệu - Số CT">
                  <el-input v-model="nhatKyChung.chungTu.kyHieuSoCT" />
                </el-form-item>
              </div>
              <div id="nkc-container-trai-body-line2" class="container-row">
                <el-form-item label="Ngày">
                  <el-date-picker
                    v-model="nhatKyChung.chungTu.ngay"
                    type="date"
                    placeholder="Chọn ngày"
                    format="dd/MM/yyyy"
                    value-format="dd/MM/yyyy"
                  />
                </el-form-item>
                <el-checkbox v-model="nhatKyChung.chungTu.hienSoChungTu"
                  >Hiện số chứng từ</el-checkbox
                >
                <el-checkbox
                  v-model="nhatKyChung.thongTinKhachHang.hachToanNgoaiTe"
                  >Hạch toán ngoại tệ</el-checkbox
                >
              </div>
              <div id="nkc-container-trai-body-line3" class="container-row">
                <el-form-item label="Nội dung" style="flex: 1">
                  <el-input
                    v-model="nhatKyChung.chungTu.noiDung"
                    placeholder="Điền vào nội dung"
                  />
                </el-form-item>
              </div>
              <div id="nkc-container-trai-body-line4" class="container-row">
                <el-form-item label="Khách hàng" style="flex-grow: 1">
                  <el-input v-model="nhatKyChung.chungTu.khachHang" disabled/>
                </el-form-item>
                <el-form-item class="center-btn" label-width="20px">
                  <el-button size="mini" type="primary" @click="openPopupKhachHang"
                    >...</el-button
                  >
                </el-form-item>

                <el-form-item label="Nhà cung cấp" style="flex-grow: 1">
                  <el-input
                    v-model="nhatKyChung.thongTinKhachHang.nhaCungCap"
                    placeholder="Điền vào nhà cung cấp"
                    disabled
                  />
                </el-form-item>
                <el-form-item class="center-btn" label-width="20px">
                  <el-button size="mini" type="primary" @click="openPopupNhaCungCap"
                    >...</el-button
                  >
                </el-form-item>
              </div>
            </div>
          </el-card>
        </div>
        <div id="nkc-container-phai">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Thông tin khách hàng</span>
            </div>
            <div id="nkc-container-phai-body">
              <div id="nkc-container-phia-body-line1" class="container-row">
                <el-form-item label="Mã số thuế">
                  <el-input
                    v-model="nhatKyChung.thongTinKhachHang.maSoThue"
                    placeholder="Điền vào mã số thuế"
                    maxlength=20
                    style="min-width: 100px;"
                  />
                </el-form-item>
                <el-form-item label="Tên đơn vị" style="flex-grow: 1">
                  <el-input
                    v-model="nhatKyChung.thongTinKhachHang.tenDonVi"
                    placeholder="Điền vào tên đơn vị"
                  />
                </el-form-item>
              </div>
              <div id="nkc-container-phia-body-line2" class="container-row">
                <el-form-item label="Địa chỉ" style="flex-grow: 1">
                  <el-input
                    v-model="nhatKyChung.thongTinKhachHang.diaChi"
                    placeholder="Điền vào địa chỉ"
                  />
                </el-form-item>
                <el-form-item label="Điện thoại">
                  <el-input
                    v-model="nhatKyChung.thongTinKhachHang.dienThoai"
                    placeholder="Điền vào điện thoại"
                    maxlength=10
                    style="min-width: 80px;"
                  />
                </el-form-item>
              </div>
              <div id="nkc-container-phia-body-line3" class="container-row">
                <el-form-item label="Số tài khoản">
                  <el-input
                    v-model="nhatKyChung.thongTinKhachHang.soTaiKhoan"
                    placeholder="Điền vào số tài khoản"
                    disabled
                  />
                </el-form-item>
                <el-form-item class="center-btn" label-width="20px">
                  <el-button size="mini" type="primary" @click="openPopupTaiKhoanNganHang"
                    >...</el-button
                  >
                </el-form-item>
                <el-form-item label="Ngân hàng" style="flex-grow: 1">
                  <el-input
                    v-model="nhatKyChung.thongTinKhachHang.nganHang"
                    placeholder="Điền vào ngân hàng"
                    disabled
                  />
                </el-form-item>
              </div>
              <div id="nkc-container-phia-body-line4" class="container-row">
                <el-form-item label="Hình thức TT">
                  <el-select
                    v-model="nhatKyChung.thongTinKhachHang.hinhThucTT"
                    placeholder="Chọn hình thức thanh toán"
                    clearable
                  >
                    <el-option
                      v-for="item in lstHinhThucTT"
                      :key="item.ma_httt"
                      :label="item.ten_httt"
                      :value="item.ma_httt"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="Người giao dịch" style="flex-grow: 1">
                  <el-input
                    v-model="nhatKyChung.thongTinKhachHang.tenNguoiGiaoDich"
                    placeholder="Điền vào người giao dịch"
                    disabled
                  />
                </el-form-item>
                <el-form-item class="center-btn" label-width="20px">
                  <el-button size="mini" type="primary" @click="openPopupNguoiGiaoDich"
                    >...</el-button
                  >
                </el-form-item>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "NhatKyChung",
  components: {},
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

<style>
#nkc-container {
  display: flex;
  flex-direction: row; /* Xếp các div theo chiều ngang */
  height: 100%; /* Chiếm toàn bộ chiều cao của parent */
  width: 100%; /* Chiếm toàn bộ chiều rộng của parent */
}

#nkc-container-trai {
  flex: 1; /* Chiếm một phần không gian (có thể điều chỉnh) */
  color: white;
  padding: 10px;
}

#nkc-container-phai {
  flex: 1; /* Chiếm một phần không gian (có thể điều chỉnh) */
  padding: 10px;
}
</style>
