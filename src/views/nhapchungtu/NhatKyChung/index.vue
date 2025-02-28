<template>
  <div>
    <el-form ref="form" :model="nhatKyChung" size="medium" label-width="120px">
      <el-card class="box-card">
        <div id="nhatkychung-chungtu-header" slot="header" class="clearfix">
          <span>Chứng từ</span>
        </div>
        <div id="nhatkychung-chungtu-body">
          <div id="nhatkychung-chungtu-body-left">
            <div id="nhatkychung-chungtu-body-left-line1">
              <el-form-item label="STT_GS">
                <el-input
                  v-model="nhatKyChung.chungTu.sttgs"
                  placeholder="Điền vào STT_GS"
                />
              </el-form-item>
              <el-form-item label="Ký hiệu - Số CT">
                <el-input v-model="nhatKyChung.chungTu.kyHieuSoCT" />
              </el-form-item>
              <el-form-item label="Ngày">
                <el-date-picker
                  v-model="nhatKyChung.chungTu.ngay"
                  type="date"
                  placeholder="Chọn ngày"
                />
              </el-form-item>
              <el-checkbox
                v-model="nhatKyChung.chungTu.hienSoChungTu"
              >Hiện số chứng từ</el-checkbox>
            </div>
            <div id="nhatkychung-chungtu-body-left-line2">
              <el-form-item label="Nội dung" style="flex: 1">
                <el-input
                  v-model="nhatKyChung.chungTu.noiDung"
                  placeholder="Điền vào nội dung"
                />
              </el-form-item>
            </div>
          </div>
          <div id="nhatkychung-chungtu-body-right">
            <el-form-item label="Khách hàng" style="flex-grow: 1">
              <el-input v-model="nhatKyChung.chungTu.khachHang" />
            </el-form-item>
            <el-form-item class="center-btn" label-width="20px">
              <el-button
                type="primary"
                @click="togglePopup('KHACHHANG')"
              >...</el-button>
            </el-form-item>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Thông tin khách hàng</span>
        </div>
        <div id="nhatkychung-thongtinkhachhang-body">
          <div id="nhatkychung-thongtinkhachhang-body-left">
            <div
              id="nhatkychung-thongtinkhachhang-body-left-line1"
              class="container-row"
            >
              <el-form-item label="Mã số thuế">
                <el-input
                  v-model="nhatKyChung.thongTinKhachHang.maSoThue"
                  placeholder="Điền vào mã số thuế"
                />
              </el-form-item>
              <el-form-item label="Tên đơn vị" style="flex-grow: 1">
                <el-input
                  v-model="nhatKyChung.thongTinKhachHang.tenDonVi"
                  placeholder="Điền vào tên đơn vị"
                />
              </el-form-item>
            </div>
            <div
              id="nhatkychung-thongtinkhachhang-body-left-line2"
              class="container-row"
            >
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
                />
              </el-form-item>
            </div>
            <div
              id="nhatkychung-thongtinkhachhang-body-left-line3"
              class="container-row"
            >
              <el-form-item label="Số tài khoản">
                <el-input
                  v-model="nhatKyChung.thongTinKhachHang.soTaiKhoan"
                  placeholder="Điền vào số tài khoản"
                />
              </el-form-item>
              <el-form-item class="center-btn" label-width="20px">
                <el-button
                  type="primary"
                  @click="togglePopup('TAIKHOAN')"
                >...</el-button>
              </el-form-item>
              <el-form-item label="Ngân hàng" style="flex-grow: 1">
                <el-input
                  v-model="nhatKyChung.thongTinKhachHang.nganHang"
                  placeholder="Điền vào ngân hàng"
                />
              </el-form-item>
            </div>
            <div
              id="nhatkychung-thongtinkhachhang-body-left-line3"
              class="container-row"
            >
              <el-form-item label="Hình thức TT">
                <el-select
                  v-model="nhatKyChung.thongTinKhachHang.hinhThucTT"
                  placeholder="Chọn hình thức thanh toán"
                  clearable
                >
                  <el-option
                    v-for="item in lstHinhThucTT"
                    :key="item.maHTTT"
                    :label="item.tenHTTT"
                    :value="item.maHTTT"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="Người giao dịch" style="flex-grow: 1">
                <el-input
                  v-model="nhatKyChung.thongTinKhachHang.nguoiGiaoDich"
                  placeholder="Điền vào người giao dịch"
                />
              </el-form-item>
              <el-form-item class="center-btn" label-width="20px">
                <el-button
                  type="primary"
                  @click="togglePopup('NGUOIGIAODICH')"
                >...</el-button>
              </el-form-item>
            </div>
          </div>
          <div id="nhatkychung-thongtinkhachhang-body-right">
            <div
              id="nhatkychung-thongtinkhachhang-body-right-line1"
              class="container-row"
            >
              <el-form-item label="Nhà cung cấp" style="flex-grow: 1">
                <el-input
                  v-model="nhatKyChung.thongTinKhachHang.nhaCungCap"
                  placeholder="Điền vào nhà cung cấp"
                />
              </el-form-item>
              <el-form-item class="center-btn" label-width="20px">
                <el-button
                  type="primary"
                  @click="togglePopup('NHACUNGCAP')"
                >...</el-button>
              </el-form-item>
            </div>
            <div id="nhatkychung-thongtinkhachhang-body-right-line2">
              <el-checkbox
                v-model="nhatKyChung.thongTinKhachHang.hachToanNgoaiTe"
              >Hạch toán ngoại tệ</el-checkbox>
            </div>
          </div>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'NhatKyChung',
  components: { },
  props: {
    name: String
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('nhapchungtu', ['nhatKyChung', 'lstHinhThucTT'])
  },
  methods: {
    ...mapActions('nhapchungtu', ['togglePopup']),
    handleSelect(row) {
      console.log(row)
    }
  }
}
</script>

<style>
#nhatkychung-chungtu-body {
  display: flex; /* Kích hoạt flexbox */
  width: 100%; /* Chiều rộng full */
  gap: 10px; /* Khoảng cách giữa 2 phần */
}

#nhatkychung-chungtu-body-left {
  flex: 7; /* Chiếm 70% */
  padding-top: 25px;
  /*border: 1px solid #ccc;  Viền màu xám */
  border-radius: 5px; /* Bo góc nhẹ */
}

#nhatkychung-chungtu-body-right {
  display: flex;
  flex: 3; /* Chiếm 30% */
  padding: 10px;
  border: 1px solid #ccc;  /* Viền màu xám */
  border-radius: 5px; /* Bo góc nhẹ */
  align-items: center; /* Căn giữa theo chiều dọc */
  justify-content: center; /* Căn giữa theo chiều ngang (nếu cần) */
}

#nhatkychung-chungtu-body-left-line1 {
  display: flex;
  gap: 20px; /* Khoảng cách giữa 2 phần */
}
#nhatkychung-chungtu-body-left-line2 {
  display: flex;
}

#nhatkychung-thongtinkhachhang-body {
  display: flex; /* Kích hoạt flexbox */
  width: 100%; /* Chiều rộng full */
  gap: 10px; /* Khoảng cách giữa 2 phần */
}

#nhatkychung-thongtinkhachhang-body-left {
  flex: 7; /* Chiếm 70% */
  padding: 10px;
  /* border: 1px solid #ccc;  Viền màu xám */
  border-radius: 5px; /* Bo góc nhẹ */
}

#nhatkychung-thongtinkhachhang-body-right {
  flex: 3; /* Chiếm 30% */
  padding: 10px;
  border: 1px solid #ccc;  /* Viền màu xám */
  border-radius: 5px; /* Bo góc nhẹ */
  align-items: center;
}

</style>
