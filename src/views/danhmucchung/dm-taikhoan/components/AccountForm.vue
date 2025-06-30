<template>
  <el-dialog
    :title="isEdit ? 'Chỉnh sửa tài khoản' : 'Thêm mới tài khoản'"
    :visible.sync="dialogVisible"
    width="1100px"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="220px"
      label-position="left"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="MST" prop="mst">
            <el-input
              v-model="formData.mst"
              placeholder="Nhập MST"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Số hiệu TK" prop="sohieutk">
            <el-input
              v-model="formData.sohieutk"
              placeholder="Nhập số hiệu tài khoản"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item label="Tên tài khoản" prop="ten_tk">
        <el-input
          v-model="formData.ten_tk"
          placeholder="Nhập tên tài khoản"
          clearable
        />
      </el-form-item>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Tên tài khoản TA" prop="ten_tk_ta">
            <el-input v-model="formData.ten_tk_ta" placeholder="Nhập tên tài khoản TA" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Dư nợ" prop="du_no">
            <el-input-number v-model="formData.du_no" :min="0" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Dư có" prop="du_co">
            <el-input-number v-model="formData.du_co" :min="0" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Chi tiết đối tượng" prop="chitiet_doituong" label-position="top">
            <el-checkbox v-model="formData.chitiet_doituong">Có</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="TK vật tư hàng hóa" prop="tk_vattu_hanghoa">
            <el-checkbox v-model="formData.tk_vattu_hanghoa">Có</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Cấp chi tiết" prop="cap_chitet">
            <el-input-number v-model="formData.cap_chitet" :min="0" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Phiếu thu" prop="phieu_thu">
            <el-checkbox v-model="formData.phieu_thu">Có</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Phiếu chi" prop="phieu_chi">
            <el-checkbox v-model="formData.phieu_chi">Có</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Phiếu nhập" prop="phieu_nhap">
            <el-checkbox v-model="formData.phieu_nhap">Có</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Phiếu xuất" prop="phieu_xuat">
            <el-checkbox v-model="formData.phieu_xuat">Có</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Bán hàng" prop="ban_hang">
            <el-checkbox v-model="formData.ban_hang">Có</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Ngân hàng" prop="ngan_hang">
            <el-checkbox v-model="formData.ngan_hang">Có</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Tiền lương" prop="tien_luong">
            <el-checkbox v-model="formData.tien_luong">Có</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Khấu hao" prop="khau_hao">
            <el-checkbox v-model="formData.khau_hao">Có</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Giá thành" prop="gia_thanh">
            <el-checkbox v-model="formData.gia_thanh">Có</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Lưu chuyển NB" prop="luu_chuyen_nb">
            <el-checkbox v-model="formData.luu_chuyen_nb">Có</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Tính giá vốn" prop="tinh_gia_von">
            <el-checkbox v-model="formData.tinh_gia_von">Có</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Chứng từ khác" prop="chung_tu_khac">
            <el-checkbox v-model="formData.chung_tu_khac">Có</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Ngoài bảng" prop="ngoai_bang">
            <el-checkbox v-model="formData.ngoai_bang">Có</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Sử dụng" prop="su_dung">
            <el-checkbox v-model="formData.su_dung">Có</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Từ ngày" prop="tu_ngay">
            <el-date-picker v-model="formData.tu_ngay" type="date" placeholder="Chọn ngày bắt đầu" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Đến ngày" prop="den_ngay">
            <el-date-picker v-model="formData.den_ngay" type="date" placeholder="Chọn ngày kết thúc" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Trạng thái" prop="trang_thai">
            <el-switch v-model="formData.trang_thai" active-value="1" inactive-value="0" active-text="Hoạt động" inactive-text="Vô hiệu" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Hủy</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        {{ isEdit ? 'Cập nhật' : 'Thêm mới' }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import service from '@/utils/request';
const baseUrl = process.env.VUE_APP_KLKT_APP_BASE_API;

export default {
  name: 'AccountForm',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    accountData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loading: false,
      formData: {
        mst: '',
        sohieutk: '',
        ten_tk: '',
        ten_tk_ta: '',
        du_no: 0,
        du_co: 0,
        chitiet_doituong: false,
        tk_vattu_hanghoa: false,
        cap_chitet: 0,
        phieu_thu: false,
        phieu_chi: false,
        phieu_nhap: false,
        phieu_xuat: false,
        ban_hang: false,
        ngan_hang: false,
        tien_luong: false,
        khau_hao: false,
        gia_thanh: false,
        luu_chuyen_nb: false,
        tinh_gia_von: false,
        chung_tu_khac: false,
        ngoai_bang: false,
        su_dung: false,
        tu_ngay: '',
        den_ngay: '',
        trang_thai: 1
      },
      rules: {
        mst: [
          { required: true, message: 'Vui lòng nhập MST', trigger: 'blur' }
        ],
        sohieutk: [
          { required: true, message: 'Vui lòng nhập số hiệu tài khoản', trigger: 'blur' }
        ],
        ten_tk: [
          { required: true, message: 'Vui lòng nhập tên tài khoản', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.initForm();
      }
    }
  },
  methods: {
    initForm() {
      if (this.isEdit && this.accountData) {
        this.formData = {
          mst: this.accountData.mst || '',
          sohieutk: this.accountData.sohieutk || '',
          ten_tk: this.accountData.ten_tk || '',
          ten_tk_ta: this.accountData.ten_tk_ta || '',
          du_no: this.accountData.du_no || 0,
          du_co: this.accountData.du_co || 0,
          chitiet_doituong: this.accountData.chitiet_doituong === 1,
          tk_vattu_hanghoa: this.accountData.tk_vattu_hanghoa === 1,
          cap_chitet: this.accountData.cap_chitet || 0,
          phieu_thu: this.accountData.phieu_thu === 1,
          phieu_chi: this.accountData.phieu_chi === 1,
          phieu_nhap: this.accountData.phieu_nhap === 1,
          phieu_xuat: this.accountData.phieu_xuat === 1,
          ban_hang: this.accountData.ban_hang === 1,
          ngan_hang: this.accountData.ngan_hang === 1,
          tien_luong: this.accountData.tien_luong === 1,
          khau_hao: this.accountData.khau_hao === 1,
          gia_thanh: this.accountData.gia_thanh === 1,
          luu_chuyen_nb: this.accountData.luu_chuyen_nb === 1,
          tinh_gia_von: this.accountData.tinh_gia_von === 1,
          chung_tu_khac: this.accountData.chung_tu_khac === 1,
          ngoai_bang: this.accountData.ngoai_bang === 1,
          su_dung: this.accountData.su_dung === 1,
          tu_ngay: this.accountData.tu_ngay || '',
          den_ngay: this.accountData.den_ngay || '',
          trang_thai: this.accountData.trang_thai || 1
        };
      } else {
        this.resetForm();
      }
    },
    
    resetForm() {
      this.formData = {
        mst: '',
        sohieutk: '',
        ten_tk: '',
        ten_tk_ta: '',
        du_no: 0,
        du_co: 0,
        chitiet_doituong: false,
        tk_vattu_hanghoa: false,
        cap_chitet: 0,
        phieu_thu: false,
        phieu_chi: false,
        phieu_nhap: false,
        phieu_xuat: false,
        ban_hang: false,
        ngan_hang: false,
        tien_luong: false,
        khau_hao: false,
        gia_thanh: false,
        luu_chuyen_nb: false,
        tinh_gia_von: false,
        chung_tu_khac: false,
        ngoai_bang: false,
        su_dung: false,
        tu_ngay: '',
        den_ngay: '',
        trang_thai: false
      };
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      });
    },
    
    async handleSubmit() {
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) return;
        this.loading = true;
        const payload = {
          table_code: 'tbldmtaikhoan',
          ...this.formData
        };
        // Convert boolean fields to 1/0
        const boolFields = [
          'chitiet_doituong', 'tk_vattu_hanghoa', 'phieu_thu', 'phieu_chi', 'phieu_nhap', 'phieu_xuat',
          'ban_hang', 'ngan_hang', 'tien_luong', 'khau_hao', 'gia_thanh', 'luu_chuyen_nb',
          'tinh_gia_von', 'chung_tu_khac', 'ngoai_bang', 'su_dung', 'trang_thai'
        ];
        boolFields.forEach(field => {
          payload[field] = this.formData[field] ? 1 : 0;
        });
        if (this.isEdit) {
          payload.id = this.accountData.id;
          await service.post(`${baseUrl}/dm/upsert`, payload);
        } else {
          await service.post(`${baseUrl}/dm/upsert`, payload);
        }
        this.$emit('success', this.formData);
        this.handleClose();
      } catch (error) {
        console.error('Error submitting form:', error);
        this.$message.error('Có lỗi xảy ra khi lưu dữ liệu');
      } finally {
        this.loading = false;
      }
    },
    
    handleClose() {
      this.$emit('close');
      this.resetForm();
    }
  }
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}

.el-form-item {
  margin-bottom: 18px;
}
</style> 