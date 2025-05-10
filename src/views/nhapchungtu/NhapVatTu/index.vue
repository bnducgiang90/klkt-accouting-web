<template>
  <div>
    <TableData
      :columns="columns"
      :data="nhapVatTuData"
      @space-key-pressed="handlePressSpaceKey"
      @handle-row="handleRow"
      @change-value="handleChangeValue"
    />
  </div>
</template>

<script>
import TableData from "../../../components/TableData";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    TableData,
  },
  props: ["popupRef"],
  data() {
    return {
      columnTaiKhoanPopupTable: [
        { prop: "sohieutk", label: "Số hiệu tài khoản" },
        { prop: "ten_tk", label: "Tên tài khoản" },
      ],
      columnKhoHangPopupTable: [
        { prop: "ma_kho", label: "Mã kho hàng" },
        { prop: "ten_kho", label: "Tên kho hàng" },
      ],
      columnVatTuPopupTable: [
        { prop: "ma_nhom", label: "Mã nhóm hàng", width: "100px" },
        { prop: "ma_vattu", label: "Mã vật tư", width: "180px" },
        { prop: "ten_vattu", label: "tên vật tư", width: "180px" },
        { prop: "dvt", label: "ĐVT", width: "180px" },
        { prop: "he_so_quy_doi", label: "H.Số quy đổi", width: "180px" },
        { prop: "ma_don_vi_quy_doi", label: "ĐVT quy đổi", width: "180px" },
        { prop: "vi_tri_luu_tru", label: "Vị trí lưu trữ", width: "180px" },
        { prop: "nam", label: "Năm", width: "180px" },
      ],
      columns: [
        { prop: "id", label: "ID", minWidth: "110px", hidden: true },
        {
          prop: "tkNhap",
          label: "TK Nhập",
          minWidth: "110px",
          onSpaceKey: true,
        },
        {
          prop: "maKhoNhap",
          label: "Mã Kho nhập",
          minWidth: "100px",
          align: "center",
          onSpaceKey: true,
        },
        {
          prop: "maVatTu",
          label: "Mã vật tư",
          minWidth: "120px",
          align: "center",
          onSpaceKey: true,
        },
        {
          prop: "tenVatTu",
          label: "Tên Vật tư",
          minWidth: "250px",
          align: "left",
          onSpaceKey: true,
        },
        { prop: "dvt", label: "ĐVT", minWidth: "120px", align: "center" },
        {
          prop: "soLuong",
          label: "Số lượng",
          minWidth: "180px",
          align: "right",
          format: "currency",
          onChangeValue: true,
          regexPattern: "^[0-9]*$",
          maxLength: 20,
          errorMessage: "Chỉ được nhập số!",
        },
        {
          prop: "soLuongTheoChungTu",
          label: "Số lượng theo C.Từ",
          minWidth: "200px",
          align: "right",
        },
        {
          prop: "donGiaBan",
          label: "Đơn giá Bán",
          minWidth: "200px",
          align: "right",
          onChangeValue: true,
        },
        {
          prop: "thanhTien",
          label: "Thành tiền",
          minWidth: "180px",
          align: "right  ",
        },
        {
          prop: "khuyenMai",
          label: "Khuyến mại",
          minWidth: "180px",
          align: "center",
          type: "boolean",
        },
        { prop: "chietKhau", label: "Chiết khấu", minWidth: "180px" },
        { prop: "thanhToan", label: "Thanh toán", minWidth: "180px" },
        { prop: "ghiChu", label: "Ghi chú", minWidth: "180px" },
        {
          prop: "dongHachToan",
          label: "Dòng hoạch toán",
          minWidth: "180px",
          regexPattern: "^[0-9]*$",
          maxLength: 15,
          errorMessage: "Chỉ được nhập số!",
        },
      ],
    };
  },
  computed: {
    ...mapState("nhapchungtu", [
      "popup",
      "lstTaiKhoan",
      "lstKhoHang",
      "lstVatTu",
      "nhapVatTuData",
    ]),
  },
  methods: {
    ...mapActions("nhapchungtu", ["setRowFlag", "updateNhapVatTuCell"]),
    handleRow(type, row) {
      console.log("handle", type, row);
      this.setRowFlag({
        stateName: "nhapVatTuData",
        key: "dongHachToan",
        value: row.dongHachToan,
        flagName: type,
        row: row,
      });
    },
    async handlePressSpaceKey(data) {
      console.log("truyen vao", data);
      alert(`Space pressed in ${data.col.prop}: ${data.row[data.col.prop]}`);
      if (data.col.prop === "tkNhap") {
        if (this.popupRef) {
          const result = await this.popupRef.openPopup({
            title: "DANH MỤC TÀI KHOẢN",
            width: "50%",
            columns: this.columnTaiKhoanPopupTable,
            data: this.lstTaiKhoan,
          });
          if (result) {
            this.selectedRow = result;
            this.updateNhapVatTuCell({
              dongHachToan: data.row.dongHachToan, // Số dòng cần update
              column: data.col.prop, // Cột cần update
              value: result.sohieutk, // Giá trị mới
            });
          }
        }
      } else if (data.col.prop === "maKhoNhap") {
        if (this.popupRef) {
          const result = await this.popupRef.openPopup({
            title: "DANH MỤC KHO HÀNG",
            width: "50%",
            columns: this.columnKhoHangPopupTable,
            data: this.lstKhoHang,
          });
          if (result) {
            this.selectedRow = result;
            this.updateNhapVatTuCell({
              dongHachToan: data.row.dongHachToan, // Số dòng cần update
              column: data.col.prop, // Cột cần update
              value: result.ma_kho, // Giá trị mới
            });
          }
        }
      } else if (data.col.prop === "maVatTu" || data.col.prop === "tenVatTu") {
        if (this.popupRef) {
          const result = await this.popupRef.openPopup({
            title: "DANH MỤC VẬT TƯ HÀNG HÓA",
            width: "90%",
            columns: this.columnVatTuPopupTable,
            data: this.lstVatTu,
          });
          if (result) {
            this.selectedRow = result;
            this.updateNhapVatTuCell({
              dongHachToan: data.row.dongHachToan, // Số dòng cần update
              column: "maVatTu", // Cột cần update
              value: result.ma_vattu, // Giá trị mới
            });
            this.updateNhapVatTuCell({
              dongHachToan: data.row.dongHachToan, // Số dòng cần update
              column: "tenVatTu", // Cột cần update
              value: result.ten_vattu, // Giá trị mới
            });
          }
        }
      }
    },
    async handleChangeValue(data) {
      console.log("truyen vao", data);
      alert(`Space pressed in ${data.col.prop}: ${data.row[data.col.prop]}`);
      if (data.col.prop === "soLuong") {
        this.updateNhapVatTuCell({
          dongHachToan: data.row.dongHachToan, // Số dòng cần update
          column: "soLuongTheoChungTu", // Cột cần update
          value: data.row["soLuong"], // Giá trị mới
        });
      }
      if (data.col.prop === "soLuong" || data.col.prop === "donGiaBan") {
        if (data.row["soLuong"] && data.row["donGiaBan"]) {
          this.updateNhapVatTuCell({
            dongHachToan: data.row.dongHachToan, // Số dòng cần update
            column: "thanhTien", // Cột cần update
            value: data.row["soLuong"] * data.row["donGiaBan"], // Giá trị mới
          });
        }
      }
    },
  },
};
</script>

<style></style>
