// import axios from 'axios'
import request from "@/utils/request";
import { Message } from "element-ui";

const state = {
  loaiChungTu: "",
  tabtype: "TAB_NHAT_KY_CHUNG",

  lstKhachHang: [],
  lstNhaCungCap: [],

  columnTaiKhoanPopupTable: [
    { prop: "soHieuTK", label: "Số hiệu tài khoản" },
    { prop: "tenTK", label: "Tên tài khoản" },
  ],
  lstTaiKhoanNganHang: [],
  lstHinhThucTT: [],
  lstNguoiGiaoDich: [],
  lstTaiKhoan: [],
  lstTaiKhoanChiTiet: [],
  lstTaiKhoanNganHang: [],
  lstVatTu: [],
  lstCanBo141: [],
  lstThueSuatBanRa: [],
  lstThueSuatMuaVao: [],
  lstKhoHang: [],
  nhatKyChung: {
    chungTu: {
      hdr_id: null,
      sttgs: "",
      kyHieuSoCT: "",
      ngay: "",
      hienSoChungTu: true,
      noiDung: "",
      khachHang: "",
    },
    thongTinKhachHang: {
      maSoThue: "123",
      tenDonVi: "",
      diaChi: "d",
      dienThoai: "",
      soTaiKhoan: "",
      nganHang: "",
      hinhThucTT: "",
      maNguoiGiaoDich: "",
      tenNguoiGiaoDich: "",
      nhaCungCap: "",
      hachToanNgoaiTe: false,
    },
  },
  hachToanData: [
    {
      "dongChungTu": 1,
      "tkNo": "6427",
      "chiTietNo": "1",
      "tkCo": "6428",
      "chiTietCo": "3",
      "soTien": "100",
      "thoiHanThanhToan": "22/05/2025",
      "thoiHanChietKhau": "27/05/2025",
      "kyHieuSoHoaDon": "hd222",
      "editType": "inserted"
    }
  ],
  xuatVatTuData: [
    {
      "id": null,
      "tkXuat": "6424",
      "maKhoXuat": "01",
      "maVatTu": "15",
      "tenVatTu": "Mỡ bôi trơn castrol SPHEEROL EPL3",
      "dvt": "Kg",
      "soLuong": "12",
      "soLuongTheoChungTu": "12",
      "donGiaBan": "2",
      "thanhTien": 24,
      "khuyenMai": null,
      "chietKhau": "2",
      "thanhToan": 24,
      "ghiChu": "dfsd",
      "dongHachToan": "1",
      "editType": "inserted"
    }
  ],
  hoaDonBanRaData: [
    {
      "id": 1,
      "tkThueDauRa": "12",
      "hoaDonDt": true,
      "soHoaDon": "123",
      "ngayHoaDon": "06/05/2025",
      "nguoiMuaBan": "CÔNG TY TNHH ĐẦU TƯ THƯƠNG MẠI VÀ DỊCH VỤ ĐẠT THANH",
      "hangHoaChiuThue": "30",
      "maSoThue": "2700947985",
      "tienHang": "234",
      "thueSuat": "1",
      "tienThue": "2",
      "tongTien": 236,
      "ghiChu": "dfsd",
      "editType": "inserted"
    }
  ],
  nhapVatTuData: [
    {
      id: 1,
      tkNhap: "152",
      maKhoNhap: "K01",
      maVatTu: "VT001",
      tenVatTu: "Thép hộp 50x50",
      dvt: "Kg",
      soLuong: 1000,
      soLuongTheoChungTu: 1000,
      donGiaBan: 25000,
      thanhTien: 25000000,
      khuyenMai: false,
      chietKhau: "0.1",
      thanhToan: 25000000,
      ghiChu: "Nhập kho chính",
      dongHachToan: "1",
      editType: "raw",
    }
  ],
  hoaDonMuaVaoData: [
    {
      id: 1,
      tkThueDauVao: "1331",
      hoaDonDt: true,
      soHoaDon: "HD00123",
      ngayHoaDon: "2025-04-01",
      nguoiMuaBan: "Công ty TNHH ABC",
      hangHoaChiuThue: "29",
      maSoThue: "0101234567",
      tienHang: 5000000,
      thueSuat: "10%",
      tienThue: 500000,
      tongTien: 5500000,
      ghiChu: "Thanh toán bằng chuyển khoản",
      editType: "raw",
    }
  ],
};

const mutations = {
  INIT_DATA(state) {
    state.hachToanData = 
      [
        {
          "dongChungTu": 1,
          "tkNo": "6427",
          "chiTietNo": "1",
          "tkCo": "6428",
          "chiTietCo": "3",
          "soTien": "100",
          "thoiHanThanhToan": "22/05/2025",
          "thoiHanChietKhau": "27/05/2025",
          "kyHieuSoHoaDon": "hd222",
          "editType": "inserted"
        }
      ]
    state.xuatVatTuData = [
      {
        "id": null,
        "tkXuat": "6424",
        "maKhoXuat": "01",
        "maVatTu": "15",
        "tenVatTu": "Mỡ bôi trơn castrol SPHEEROL EPL3",
        "dvt": "Kg",
        "soLuong": "12",
        "soLuongTheoChungTu": "12",
        "donGiaBan": "2",
        "thanhTien": 24,
        "khuyenMai": null,
        "chietKhau": "2",
        "thanhToan": 24,
        "ghiChu": "dfsd",
        "dongHachToan": "1",
        "editType": "inserted"
      }
    ]
    state.hoaDonBanRaData = [
      {
        "id": 1,
        "tkThueDauRa": "12",
        "hoaDonDt": true,
        "soHoaDon": "123",
        "ngayHoaDon": "06/05/2025",
        "nguoiMuaBan": "CÔNG TY TNHH ĐẦU TƯ THƯƠNG MẠI VÀ DỊCH VỤ ĐẠT THANH",
        "hangHoaChiuThue": "30",
        "maSoThue": "2700947985",
        "tienHang": "234",
        "thueSuat": "1",
        "tienThue": "2",
        "tongTien": 236,
        "ghiChu": "dfsd",
        "editType": "inserted"
      }
    ]
    state.nhapVatTuData = []
    state.hoaDonMuaVaoData = []
  },
  SET_STATE(state, { key, value }) {
    if (key in state) {
      state[key] = value;
    } else {
      console.warn(`Key "${key}" không tồn tại trong state`);
    }
  },
  UPDATE_MULTIPLE_FIELDS_NHAT_KY_CHUNG(state, updates) {
    updates.forEach(({ path, value }) => {
      const keys = path.split("."); // Chuyển đường dẫn thành mảng
      let obj = state.nhatKyChung;

      // Duyệt qua các key để truy cập đến thuộc tính cuối cùng
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) {
          console.warn(`Đường dẫn '${path}' không tồn tại`);
          return;
        }
        obj = obj[keys[i]];
      }

      // Cập nhật giá trị
      obj[keys[keys.length - 1]] = value;
    });
  },
  UPDATE_HACH_TOAN_CELL(state, { dongChungTu, column, value }) {
    const row = state.hachToanData.find(
      (item) => item.dongChungTu === dongChungTu
    );
    if (row && Object.prototype.hasOwnProperty.call(row, column)) {
      row[column] = value;
    }
  },
  UPDATE_XUAT_VAT_TU_CELL(state, { dongHachToan, column, value }) {
    const row = state.xuatVatTuData.find(
      (item) => item.dongHachToan === dongHachToan
    );
    if (row && Object.prototype.hasOwnProperty.call(row, column)) {
      row[column] = value;
    }
  },
  UPDATE_NHAP_VAT_TU_CELL(state, { dongHachToan, column, value }) {
    const row = state.nhapVatTuData.find(
      (item) => item.dongHachToan === dongHachToan
    );
    if (row && Object.prototype.hasOwnProperty.call(row, column)) {
      row[column] = value;
    }
  },
  UPDATE_HOA_DON_BAN_RA_CELL(state, { id, column, value }) {
    const row = state.hoaDonBanRaData.find((item) => item.id === id);
    if (row && Object.prototype.hasOwnProperty.call(row, column)) {
      row[column] = value;
    }
  },
  UPDATE_HOA_DON_MUA_VAO_CELL(state, { id, column, value }) {
    const row = state.hoaDonMuaVaoData.find((item) => item.id === id);
    if (row && Object.prototype.hasOwnProperty.call(row, column)) {
      row[column] = value;
    }
  },
  UPDATE_ROW_ACTION(state, { stateName, key, value, flagName, row }) {
    console.log(
      "UPDATE_ROW_ACTION: stateName, key, value, flagName: ",
      stateName,
      key,
      value,
      flagName,
      row
    );
    // Kiểm tra stateName có tồn tại hay không
    if (!state[stateName] || !Array.isArray(state[stateName])) {
      console.error(
        `State "${stateName}" không tồn tại hoặc không phải là một mảng.`
      );
      return;
    }

    let item = null;

    if (flagName === "inserting") {
      // Kiểm tra nếu row hợp lệ thì thêm vào danh sách
      if (row && typeof row === "object") {
        state[stateName].push(row);
      } else {
        console.error("Dữ liệu row không hợp lệ để insert.");
      }
    } else {
      // Tìm bản ghi cần cập nhật
      item = state[stateName].find((record) => record[key] === value);
      if (!item) {
        console.error(
          `Không tìm thấy bản ghi có ${key} = ${value} trong state "${stateName}".`
        );
        return;
      }
      // Xử lý theo flagName
      switch (flagName) {
        case "updating":
        case "deleting":
          if (!item.originalData) {
            // Lưu trạng thái ban đầu trước khi chỉnh sửa hoặc xóa
            item.originalData = { ...item };
          }
          item["editType"] = flagName;

          break;

        case "canceling":
          if (row.editType === "inserting") {
            // Nếu là bản ghi đang được thêm mới thì xóa khỏi state
            state[stateName] = state[stateName].filter(
              (record) => record[key] !== value
            );
          } else {
            if (item.originalData) {
              // Phục hồi dữ liệu cũ từ originalData
              Object.keys(item.originalData).forEach((prop) => {
                item[prop] = item.originalData[prop];
              });
              // Xóa thuộc tính originalData
              delete item.originalData;
            }
          }

          break;

        case "saving":
          if (item.editType === "inserting") {
            item.editType = "inserted";
          } else if (item.editType === "updating") {
            item.editType = "updated";
          } else if (item.editType === "deleting") {
            item.editType = "deleted";
          }
          delete item.originalData; // Xóa dữ liệu gốc sau khi lưu

          break;

        default:
          console.error(`flagName "${flagName}" không hợp lệ.`);
      }
    }
  },
  UPDATE_HACH_TOAN_DATA_EDITTYPE(state) {
    state.hachToanData = state.hachToanData.map((item) => ({
      ...item,
      editType: "raw",
    }));
  },
};

const actions = {
  async updateLoaiChungTu({ commit }, loaiChungTu) {
    commit("SET_STATE", { key: "loaiChungTu", value: loaiChungTu });
    commit("INIT_DATA");
  },
  async updateTabType({ commit }, tabtype) {
    commit("SET_STATE", { key: "tabtype", value: tabtype });
  },
  async loadKhachHang({ commit }) {
    try {
      const response = await request.post("/core/get-list-data", {
        table_code: "tbldmkhachhang",
        size: 200,
        page: 1,
      });

      commit("SET_STATE", { key: "lstKhachHang", value: response });
    } catch (error) {
      console.error("Lỗi khi tải danh sách khách hàng:", error);
    }
  },
  async loadNhaCungCap({ commit }) {
    try {
      const response = await request.post("/core/get-list-data", {
        table_code: "tbldmnhacungcap",
        size: 5000,
        page: 1,
      });

      commit("SET_STATE", { key: "lstNhaCungCap", value: response });
    } catch (error) {
      console.error("Lỗi khi tải danh sách nhà cung cấp 2:", error);
    }
  },
  async loadTaiKhoan({ commit }) {
    try {
      const response = await request.post("/core/get-list-data", {
        table_code: "tbldmtaikhoan",
        size: 5000,
        page: 1,
      });

      commit("SET_STATE", { key: "lstTaiKhoan", value: response });
    } catch (error) {
      console.error("Lỗi khi tải danh sách tài khoản:", error);
    }
  },
  async loadTaiKhoanChiTiet({ commit }, sohieutk) {
    try {
      console.log("loadTaiKhoanChiTiet: " + sohieutk);
      const response = await request.post("/core/get-list-data", {
        table_code: "tbldmtaikhoan_chitiet",
        sohieutk: sohieutk,
        size: 5000,
        page: 1,
      });

      commit("SET_STATE", { key: "lstTaiKhoanChiTiet", value: response });
    } catch (error) {
      console.error("Lỗi khi tải danh sách tài khoản chi tiết:", error);
    }
  },
  async loadNguoiGiaoDich({ commit }) {
    try {
      const response = await request.post("/core/get-list-data", {
        table_code: "tbldmnguoi_giaodich",
        size: 5000,
        page: 1,
      });

      commit("SET_STATE", { key: "lstNguoiGiaoDich", value: response });
    } catch (error) {
      console.error("Lỗi khi tải danh sách người giao dịch:", error);
    }
  },
  async loadHinhThucTT({ commit }) {
    try {
      const response = await request.post("/core/get-list-data", {
        table_code: "tbldmhinhthuctt",
        size: 5000,
        page: 1,
      });

      commit("SET_STATE", { key: "lstHinhThucTT", value: response });
    } catch (error) {
      console.error("Lỗi khi tải danh sách hình thức thanh toán:", error);
    }
  },
  async loadVatTu({ commit }) {
    try {
      const response = await request.post("/core/get-list-data", {
        table_code: "tbldmvattu_hanghoa",
        size: 100,
        page: 1,
      });
      commit("SET_STATE", { key: "lstVatTu", value: response });
    } catch (error) {
      console.error("Lỗi khi tải danh sách vật tư:", error);
    }
  },
  async loadKhoHang({ commit }) {
    try {
      const response = await request.post("/core/get-list-data", {
        table_code: "tbldmkhohang",
        size: 5000,
        page: 1,
      });

      commit("SET_STATE", { key: "lstKhoHang", value: response });
    } catch (error) {
      console.error("Lỗi khi tải danh sách kho hàng:", error);
    }
  },
  async loadTaiKhoanNganHang({ commit }) {
    try {
      const response = await request.post("/core/get-list-data", {
        table_code: "tbldm_taikhoan_nganhang_donvi_sudung",
        size: 5000,
        page: 1,
      });

      commit("SET_STATE", { key: "lstTaiKhoanNganHang", value: response });
    } catch (error) {
      console.error("Lỗi khi tải danh sách tài khoản ngân hàng:", error);
    }
  },
  async loadCanBo141({ commit }) {
    try {
      const response = await request.post("/core/get-list-data", {
        table_code: "tbldmcanbo_141",
        size: 5000,
        page: 1,
      });

      commit("SET_STATE", { key: "lstCanBo141", value: response });
    } catch (error) {
      console.error("Lỗi khi tải danh sách cán bộ:", error);
    }
  },
  async loadDmThueSuatBanRa({ commit }) {
    try {
      const response = await request.post("/core/get-list-data", {
        table_code: "tblDmthue_suat_banra",
        size: 5000,
        page: 1,
      });

      commit("SET_STATE", { key: "lstThueSuatBanRa", value: response });
    } catch (error) {
      console.error("Lỗi khi tải danh sách thuế suất bán ra:", error);
    }
  },
  async loadDmThueSuatMuaVao({ commit }) {
    try {
      const response = await request.post("/core/get-list-data", {
        table_code: "tblDmthue_suat_banra",
        size: 5000,
        page: 1,
      });

      commit("SET_STATE", { key: "lstThueSuatMuaVao", value: response });
    } catch (error) {
      console.error("Lỗi khi tải danh sách thuế suất mua vào:", error);
    }
  },
  async sendData({ state, commit }) {
    try {
      let payload = {};

      if (
        state.loaiChungTu === "phieuthutienmat" ||
        state.loaiChungTu === "phieuxuatvattucongcu" ||
        state.loaiChungTu === "banhangthutiensau"
      ) {
        payload = {
          loaiChungTu: state.loaiChungTu,
          nhatKyChung: state.nhatKyChung,
          hachToanData: state.hachToanData,
          xuatVatTuData: state.xuatVatTuData,
          hoaDonBanRaData: state.hoaDonBanRaData,
        };
      } else if (
        state.loaiChungTu === "phieuchitienmat" ||
        state.loaiChungTu === "phieunhapvattucongcu"
      ) {
        payload = {
          loaiChungTu: state.loaiChungTu,
          nhatKyChung: state.nhatKyChung,
          hachToanData: state.hachToanData,
          nhapVatTuData: state.nhapVatTuData,
          hoaDonMuaVaoData: state.hoaDonMuaVaoData,
        };
      } else if (state.loaiChungTu === "chungtunganhang") {
        payload = {
          loaiChungTu: state.loaiChungTu,
          nhatKyChung: state.nhatKyChung,
          hachToanData: state.hachToanData,
          hoaDonMuaVaoData: state.hoaDonMuaVaoData,
        };
      } else if (state.loaiChungTu === "chungtughiso") {
        payload = {
          loaiChungTu: state.loaiChungTu,
          nhatKyChung: state.nhatKyChung,
          hachToanData: state.hachToanData,
          hoaDonMuaVaoData: state.hoaDonMuaVaoData,
        };
      } else if (state.loaiChungTu === "chungtuluuchuyennoibo") {
        payload = {
          loaiChungTu: state.loaiChungTu,
          nhatKyChung: state.nhatKyChung,
          hachToanData: state.hachToanData,
          nhapVatTuData: state.nhapVatTuData,
          xuatVatTuData: state.xuatVatTuData,
        };
      } else {
        // Nếu không phải 'a' hoặc 'b', gửi toàn bộ như mặc định (nếu cần)
        payload = {
          loaiChungTu: state.loaiChungTu,
          nhatKyChung: state.nhatKyChung,
          hachToanData: state.hachToanData,
        };
      }

      console.log("send data: ", payload);
      console.log("send data:", JSON.stringify(payload, null, 2));

      const response = await request.post("/core/upsert-tax-doc", payload);
      console.log("recive response:", JSON.stringify(response, null, 2));

      // Nếu response là mảng và phần tử đầu tiên có status là "success"
      if (response.errorCode === "000") {
        commit("UPDATE_HACH_TOAN_DATA_EDITTYPE");
        commit("UPDATE_MULTIPLE_FIELDS_NHAT_KY_CHUNG", [{ path: "chungTu.hdr_id", value: response.data.hdr_id }])
        // alert("Thành Công");
        // this.$message.success("Thành công!");
        Message.success("Thành công!");
        return { code: 1 };
      } else {
        // Hiển thị popup lỗi
        // alert("Có lỗi xảy ra");
        // this.$message.error("Có lỗi xảy ra!");
        Message.error("Có lỗi xảy ra!");
        return { code: 0 };
      }
    } catch (error) {
      console.error("Send data failed:", error);
      // alert("Có lỗi xảy ra");
      // this.$message.error("Có lỗi xảy ra!");
      Message.error("Có lỗi xảy ra!");
      return { code: 0 };
    }
  },
  async updateHachToanCell({ commit }, payload) {
    commit("UPDATE_HACH_TOAN_CELL", payload);
  },
  async updateXuatVatTuCell({ commit }, payload) {
    commit("UPDATE_XUAT_VAT_TU_CELL", payload);
  },
  async updateNhapVatTuCell({ commit }, payload) {
    commit("UPDATE_NHAP_VAT_TU_CELL", payload);
  },
  async updateHoaDonBanRaCell({ commit }, payload) {
    commit("UPDATE_HOA_DON_BAN_RA_CELL", payload);
  },
  async updateHoaDonMuaVaoCell({ commit }, payload) {
    commit("UPDATE_HOA_DON_MUA_VAO_CELL", payload);
  },
  setRowFlag({ commit }, payload) {
    console.log("setRowFlag", payload);
    commit("UPDATE_ROW_ACTION", payload);
  },
  updateMultipleNhatKyChung({ commit }, updates) {
    commit("UPDATE_MULTIPLE_FIELDS_NHAT_KY_CHUNG", updates);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
