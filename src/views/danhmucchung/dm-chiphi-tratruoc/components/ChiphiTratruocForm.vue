<template>
  <el-dialog
    :title="isEdit ? 'Chỉnh sửa chi phí trả trước' : 'Thêm mới chi phí trả trước'"
    :visible.sync="visible"
    width="800px"
    :before-close="handleClose"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="140px"
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
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Mã kho" prop="ma_kho">
            <el-input
              v-model="formData.ma_kho"
              placeholder="Nhập mã kho"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Mã nhóm" prop="ma_nhom">
            <el-input
              v-model="formData.ma_nhom"
              placeholder="Nhập mã nhóm"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Mã tài sản" prop="ma_taisan">
            <el-input
              v-model="formData.ma_taisan"
              placeholder="Nhập mã tài sản"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Đơn vị tính" prop="dvt">
            <el-input
              v-model="formData.dvt"
              placeholder="Nhập đơn vị tính"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item label="Tên tài sản" prop="ten_taisan">
        <el-input
          v-model="formData.ten_taisan"
          placeholder="Nhập tên tài sản"
          clearable
        />
      </el-form-item>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Ngày lập thẻ" prop="ngaylap_the">
            <el-date-picker
              v-model="formData.ngaylap_the"
              type="date"
              placeholder="Chọn ngày lập thẻ"
              style="width: 100%"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Mã đơn vị quản lý" prop="donvi_quanly">
            <el-input
              v-model="formData.donvi_quanly"
              placeholder="Nhập mã đơn vị quản lý"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item label="Tên đơn vị quản lý" prop="ten_donvi_quanly">
        <el-input
          v-model="formData.ten_donvi_quanly"
          placeholder="Nhập tên đơn vị quản lý"
          clearable
        />
      </el-form-item>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Nguồn vốn" prop="nguonvon">
            <el-input
              v-model="formData.nguonvon"
              placeholder="Nhập nguồn vốn"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Số lượng đầu kỳ" prop="soluong_dauky">
            <el-input-number
              v-model="formData.soluong_dauky"
              :precision="2"
              :step="1"
              :min="0"
              style="width: 100%"
              placeholder="0"
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Đơn giá" prop="dongia">
            <el-input-number
              v-model="formData.dongia"
              :precision="0"
              :step="1000"
              :min="0"
              style="width: 100%"
              placeholder="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Nguyên giá" prop="nguyengia">
            <el-input-number
              v-model="formData.nguyengia"
              :precision="0"
              :step="1000"
              :min="0"
              style="width: 100%"
              placeholder="0"
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Hao mòn lũy kế" prop="haomon_luyke">
            <el-input-number
              v-model="formData.haomon_luyke"
              :precision="0"
              :step="1000"
              :min="0"
              style="width: 100%"
              placeholder="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Giá trị còn lại" prop="giatri_conlai">
            <el-input-number
              v-model="formData.giatri_conlai"
              :precision="0"
              :step="1000"
              :min="0"
              style="width: 100%"
              placeholder="0"
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Số tháng phân bổ" prop="so_thang_phan_bo">
            <el-input-number
              v-model="formData.so_thang_phan_bo"
              :precision="0"
              :step="1"
              :min="0"
              style="width: 100%"
              placeholder="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Kỳ phân bổ" prop="ky_phanbo">
            <el-input
              v-model="formData.ky_phanbo"
              placeholder="Nhập kỳ phân bổ"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Số tháng phân bổ" prop="sothang_phanbo">
            <el-input-number
              v-model="formData.sothang_phanbo"
              :precision="0"
              :step="1"
              :min="0"
              style="width: 100%"
              placeholder="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="TK phân bổ" prop="taikhoan_phanbo">
            <el-input
              v-model="formData.taikhoan_phanbo"
              placeholder="Nhập tài khoản phân bổ"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Mã kho CT" prop="ma_kho_ct">
            <el-input
              v-model="formData.ma_kho_ct"
              placeholder="Nhập mã kho CT"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Mã nhóm CT" prop="ma_nhom_ct">
            <el-input
              v-model="formData.ma_nhom_ct"
              placeholder="Nhập mã nhóm CT"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Chi tiết TK phân bổ" prop="chitiet_taikhoan_phanbo">
            <el-input
              v-model="formData.chitiet_taikhoan_phanbo"
              placeholder="Nhập chi tiết TK phân bổ"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Công đoạn sản xuất" prop="congdoan_sanxuat">
            <el-input
              v-model="formData.congdoan_sanxuat"
              placeholder="Nhập công đoạn sản xuất"
              clearable
            />
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
  name: 'ChiphiTratruocForm',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    chiphiTratruocData: {
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
        ma_kho: '',
        ma_nhom: '',
        ma_taisan: '',
        ten_taisan: '',
        dvt: '',
        ngaylap_the: '',
        donvi_quanly: '',
        ten_donvi_quanly: '',
        nguonvon: '',
        soluong_dauky: 0,
        dongia: 0,
        nguyengia: 0,
        haomon_luyke: 0,
        giatri_conlai: 0,
        so_thang_phan_bo: 0,
        ky_phanbo: '',
        sothang_phanbo: 0,
        taikhoan_phanbo: '',
        ma_kho_ct: '',
        ma_nhom_ct: '',
        chitiet_taikhoan_phanbo: '',
        congdoan_sanxuat: ''
      },
      rules: {
        mst: [
          { required: true, message: 'Vui lòng nhập MST', trigger: 'blur' }
        ],
        sohieutk: [
          { required: true, message: 'Vui lòng nhập số hiệu tài khoản', trigger: 'blur' }
        ],
        ma_taisan: [
          { required: true, message: 'Vui lòng nhập mã tài sản', trigger: 'blur' }
        ],
        ten_taisan: [
          { required: true, message: 'Vui lòng nhập tên tài sản', trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.initForm();
      }
    },
    chiphiTratruocData: {
      handler(newVal) {
        if (newVal && Object.keys(newVal).length > 0) {
          this.formData = { ...newVal };
        }
      },
      deep: true
    }
  },
  methods: {
    initForm() {
      if (this.isEdit && this.chiphiTratruocData) {
        this.formData = {
          mst: this.chiphiTratruocData.mst || '',
          sohieutk: this.chiphiTratruocData.sohieutk || '',
          ma_kho: this.chiphiTratruocData.ma_kho || '',
          ma_nhom: this.chiphiTratruocData.ma_nhom || '',
          ma_taisan: this.chiphiTratruocData.ma_taisan || '',
          ten_taisan: this.chiphiTratruocData.ten_taisan || '',
          dvt: this.chiphiTratruocData.dvt || '',
          ngaylap_the: this.chiphiTratruocData.ngaylap_the || '',
          donvi_quanly: this.chiphiTratruocData.donvi_quanly || '',
          ten_donvi_quanly: this.chiphiTratruocData.ten_donvi_quanly || '',
          nguonvon: this.chiphiTratruocData.nguonvon || '',
          soluong_dauky: this.chiphiTratruocData.soluong_dauky || 0,
          dongia: this.chiphiTratruocData.dongia || 0,
          nguyengia: this.chiphiTratruocData.nguyengia || 0,
          haomon_luyke: this.chiphiTratruocData.haomon_luyke || 0,
          giatri_conlai: this.chiphiTratruocData.giatri_conlai || 0,
          so_thang_phan_bo: this.chiphiTratruocData.so_thang_phan_bo || 0,
          ky_phanbo: this.chiphiTratruocData.ky_phanbo || '',
          sothang_phanbo: this.chiphiTratruocData.sothang_phanbo || 0,
          taikhoan_phanbo: this.chiphiTratruocData.taikhoan_phanbo || '',
          ma_kho_ct: this.chiphiTratruocData.ma_kho_ct || '',
          ma_nhom_ct: this.chiphiTratruocData.ma_nhom_ct || '',
          chitiet_taikhoan_phanbo: this.chiphiTratruocData.chitiet_taikhoan_phanbo || '',
          congdoan_sanxuat: this.chiphiTratruocData.congdoan_sanxuat || ''
        };
      } else {
        this.formData = {
          mst: '',
          sohieutk: '',
          ma_kho: '',
          ma_nhom: '',
          ma_taisan: '',
          ten_taisan: '',
          dvt: '',
          ngaylap_the: '',
          donvi_quanly: '',
          ten_donvi_quanly: '',
          nguonvon: '',
          soluong_dauky: 0,
          dongia: 0,
          nguyengia: 0,
          haomon_luyke: 0,
          giatri_conlai: 0,
          so_thang_phan_bo: 0,
          ky_phanbo: '',
          sothang_phanbo: 0,
          taikhoan_phanbo: '',
          ma_kho_ct: '',
          ma_nhom_ct: '',
          chitiet_taikhoan_phanbo: '',
          congdoan_sanxuat: ''
        };
      }
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
          table_code: 'tbldmchiphi_tratruoc',
          ...this.formData
        };
        
        let response;
        if (this.isEdit) {
          response = await service.post(`${baseUrl}/dm/upsert`, payload);
          this.$message.success('Cập nhật chi phí trả trước thành công');
        } else {
          response = await service.post(`${baseUrl}/dm/upsert`, payload);
          this.$message.success('Thêm mới chi phí trả trước thành công');
        }
        
        this.$emit('success', response.data);
        this.handleClose();
      } catch (error) {
        console.error('Error submitting form:', error);
        this.$message.error('Có lỗi xảy ra khi lưu dữ liệu');
      } finally {
        this.loading = false;
      }
    },
    
    handleClose() {
      this.$refs.form && this.$refs.form.resetFields();
      this.$emit('update:visible', false);
      this.$emit('close');
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