<template>
  <el-dialog
    :title="isEdit ? 'Chỉnh sửa chi phí trả trước' : 'Thêm mới chi phí trả trước'"
    :visible.sync="visible"
    width="1000px"
    :before-close="handleClose"
  >
    <div v-if="formLoading" style="display:flex;align-items:center;justify-content:center;min-height:200px;">
      <i class="el-icon-loading" style="font-size:32px;margin-right:8px"></i> Đang tải dữ liệu...
    </div>
    <el-form
      v-else
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
            <el-select
              v-model="formData.ma_kho"
              placeholder="Chọn mã kho"
              clearable
              filterable
              style="width: 100%"
              @change="handleMaKhoChange"
            >
              <el-option
                v-for="item in khoOptions"
                :key="item.ma_kho"
                :label="`${item.ma_kho} - ${item.ten_kho}`"
                :value="item.ma_kho"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Mã nhóm" prop="ma_nhom">
            <el-select
              v-model="formData.ma_nhom"
              placeholder="Chọn mã nhóm"
              clearable
              filterable
              style="width: 100%"
              @change="handleMaNhomChange"
            >
              <el-option
                v-for="item in nhomOptions"
                :key="item.ma_nhom"
                :label="`${item.ma_nhom} - ${item.ten_nhom}`"
                :value="item.ma_nhom"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Mã tài sản" prop="ma_taisan">
            <el-select
              v-model="formData.ma_taisan"
              placeholder="Chọn mã tài sản"
              clearable
              filterable
              style="width: 100%"
              @change="handleMaTaisanChange"
            >
              <el-option
                v-for="item in taisanOptions"
                :key="item.ma_taisan"
                :label="`${item.ma_taisan} - ${item.ten_taisan}`"
                :value="item.ma_taisan"
              />
            </el-select>
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
      formLoading: false,
      khoOptions: [],
      nhomOptions: [],
      taisanOptions: [],
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
        ma_kho: [
          { required: true, message: 'Vui lòng chọn mã kho', trigger: 'change' }
        ],
        ma_nhom: [
          { required: true, message: 'Vui lòng chọn mã nhóm', trigger: 'change' }
        ],
        ma_taisan: [
          { required: true, message: 'Vui lòng chọn mã tài sản', trigger: 'change' }
        ],
        ten_taisan: [
          { required: true, message: 'Vui lòng nhập tên tài sản', trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
    async visible(newVal) {
      if (newVal) {
        this.formLoading = true;
        await this.initForm();
        this.formLoading = false;
        this.loadKhoOptions();
      }
    },
    chiphiTratruocData: {
      handler(newVal) {
        if (newVal && Object.keys(newVal).length > 0) {
          this.formData = { ...newVal };
        }
      },
      deep: true
    },
    'formData.mst'(val) {
      if (!this.isEdit) {
        this.formData.ma_kho = '';
        this.formData.ma_nhom = '';
        this.formData.ma_taisan = '';
        this.nhomOptions = [];
        this.taisanOptions = [];
      }
    },
    'formData.sohieutk'(val) {
      if (!this.isEdit) {
        this.formData.ma_kho = '';
        this.formData.ma_nhom = '';
        this.formData.ma_taisan = '';
        this.nhomOptions = [];
        this.taisanOptions = [];
      }
    },
    'formData.ma_kho'(val) {
      if (val && this.formData.mst && this.formData.sohieutk) {
        this.loadNhomOptions(this.formData.mst, this.formData.sohieutk, val);
      }
      if (!this.isEdit) {
        this.formData.ma_nhom = '';
        this.formData.ma_taisan = '';
        this.taisanOptions = [];
      }
    },
    'formData.ma_nhom'(val) {
      if (val && this.formData.mst && this.formData.sohieutk && this.formData.ma_kho) {
        this.loadTaisanOptions(this.formData.mst, this.formData.sohieutk, this.formData.ma_kho, val);
      }
      if (!this.isEdit) {
        this.formData.ma_taisan = '';
      }
    },
  },
  methods: {
    async loadKhoOptions() {
      try {
        const response = await service.post(`${baseUrl}/dm/get-list`, {
          table_code: 'tbldmkhohang',
          size: 1000,
          page: 1
        });
        this.khoOptions = (response.data && response.data.items) ? response.data.items : [];
      } catch (error) {
        console.error('Error loading kho options:', error);
        this.$message.error('Không thể tải danh sách kho');
      }
    },

    async loadNhomOptions(mst, sohieutk, ma_kho) {
      if (!mst || !sohieutk || !ma_kho) {
        this.nhomOptions = [];
        return;
      }
      try {
        const response = await service.post(`${baseUrl}/dm/get-list`, {
          table_code: 'tbldmnhomhang',
          size: 1000,
          page: 1,
          filters: { mst, sohieutk, ma_kho }
        });
        this.nhomOptions = (response.data && response.data.items) ? response.data.items : [];
      } catch (error) {
        console.error('Error loading nhom options:', error);
        this.$message.error('Không thể tải danh sách nhóm');
      }
    },

    async loadTaisanOptions(mst, sohieutk, ma_kho, ma_nhom) {
      if (!mst || !sohieutk || !ma_kho || !ma_nhom) {
        this.taisanOptions = [];
        return;
      }
      try {
        const response = await service.post(`${baseUrl}/dm/get-list`, {
          table_code: 'tbldmtaisan',
          size: 1000,
          page: 1,
          filters: { mst, sohieutk, ma_kho, ma_nhom }
        });
        this.taisanOptions = (response.data && response.data.items) ? response.data.items : [];
      } catch (error) {
        console.error('Error loading taisan options:', error);
        this.$message.error('Không thể tải danh sách tài sản');
      }
    },

    handleMaKhoChange() {
      // Reset dependent fields
      this.formData.ma_nhom = '';
      this.formData.ma_taisan = '';
      this.formData.ten_taisan = '';
      this.formData.dvt = '';
      
      // Load nhom options
      this.loadNhomOptions(this.formData.mst, this.formData.sohieutk, this.formData.ma_kho);
    },

    handleMaNhomChange() {
      // Reset dependent fields
      this.formData.ma_taisan = '';
      this.formData.ten_taisan = '';
      this.formData.dvt = '';
      
      // Load taisan options
      this.loadTaisanOptions(this.formData.mst, this.formData.sohieutk, this.formData.ma_kho, this.formData.ma_nhom);
    },

    handleMaTaisanChange() {
      // Auto-fill tên tài sản and đơn vị tính from selected tài sản
      const selectedTaisan = this.taisanOptions.find(item => item.ma_taisan === this.formData.ma_taisan);
      if (selectedTaisan) {
        this.formData.ten_taisan = selectedTaisan.ten_taisan || '';
        this.formData.dvt = selectedTaisan.dvt || '';
      }
    },

    async initForm() {
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
        
        // Load dependent dropdowns for edit mode sequentially
        if (this.formData.ma_kho) {
          await this.loadNhomOptions(this.formData.mst, this.formData.sohieutk, this.formData.ma_kho);
        }
        if (this.formData.ma_kho && this.formData.ma_nhom) {
          await this.loadTaisanOptions(this.formData.mst, this.formData.sohieutk, this.formData.ma_kho, this.formData.ma_nhom);
        }
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