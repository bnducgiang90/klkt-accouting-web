<template>
  <el-dialog
    :title="isEdit ? 'Chỉnh sửa vật tư' : 'Thêm mới vật tư'"
    :visible.sync="visible"
    width="1000px"
    :before-close="handleClose"
    :close-on-click-modal="false"
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
            <el-input v-model="formData.mst" placeholder="Nhập MST" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Số hiệu TK" prop="sohieutk">
            <el-input v-model="formData.sohieutk" placeholder="Nhập số hiệu TK" clearable />
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
                v-for="(item, idx) in khoOptions"
                :key="`makho-${item.ma_kho}-${idx}`"
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
                v-for="(item, idx) in nhomOptions"
                :key="`manhom-${item.ma_nhom}-${idx}`"
                :label="`${item.ma_nhom} - ${item.ten_nhom}`"
                :value="item.ma_nhom"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Mã vật tư" prop="ma_vattu">
            <el-input v-model="formData.ma_vattu" placeholder="Nhập mã vật tư" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Tên vật tư" prop="ten_vattu">
            <el-input v-model="formData.ten_vattu" placeholder="Nhập tên vật tư" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Đơn vị tính" prop="dvt">
            <el-input v-model="formData.dvt" placeholder="Nhập đơn vị tính" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Năm" prop="nam">
            <el-input-number v-model="formData.nam" :min="2000" :max="2100" style="width: 100%" placeholder="Năm" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Lượng đầu kỳ" prop="luong_dau_ky">
            <el-input-number v-model="formData.luong_dau_ky" :min="0" style="width: 100%" placeholder="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Giá trị đầu kỳ" prop="gia_tri_dau_ky">
            <el-input-number v-model="formData.gia_tri_dau_ky" :min="0" style="width: 100%" placeholder="0" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Hệ số quy đổi" prop="he_so_quy_doi">
            <el-input-number v-model="formData.he_so_quy_doi" :min="0" style="width: 100%" placeholder="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Mã đơn vị quy đổi" prop="ma_don_vi_quy_doi">
            <el-input v-model="formData.ma_don_vi_quy_doi" placeholder="Nhập mã đơn vị quy đổi" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Trạng thái" prop="trang_thai">
            <el-switch v-model="formData.trang_thai" :active-value="1" :inactive-value="0" active-text="Hoạt động" inactive-text="Ngừng hoạt động" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Vị trí lưu trữ" prop="vi_tri_luu_tru">
        <el-input v-model="formData.vi_tri_luu_tru" placeholder="Nhập vị trí lưu trữ" clearable />
      </el-form-item>
      <el-form-item label="Ghi chú" prop="ghi_chu">
        <el-input v-model="formData.ghi_chu" type="textarea" :rows="2" placeholder="Nhập ghi chú (nếu có)" />
      </el-form-item>
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
  name: 'MaterialForm',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    materialData: {
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
      formData: {
        mst: '',
        sohieutk: '',
        ma_kho: '',
        ma_nhom: '',
        ma_vattu: '',
        ten_vattu: '',
        dvt: '',
        luong_dau_ky: 0,
        gia_tri_dau_ky: 0,
        he_so_quy_doi: 0,
        ma_don_vi_quy_doi: '',
        vi_tri_luu_tru: '',
        nam: new Date().getFullYear(),
        ghi_chu: '',
        trang_thai: 1
      },
      rules: {
        mst: [
          { required: true, message: 'Vui lòng nhập MST', trigger: 'blur' }
        ],
        sohieutk: [
          { required: true, message: 'Vui lòng nhập số hiệu TK', trigger: 'blur' }
        ],
        ma_kho: [
          { required: true, message: 'Vui lòng chọn mã kho', trigger: 'change' }
        ],
        ma_nhom: [
          { required: true, message: 'Vui lòng chọn mã nhóm', trigger: 'change' }
        ],
        ma_vattu: [
          { required: true, message: 'Vui lòng nhập mã vật tư', trigger: 'blur' }
        ],
        ten_vattu: [
          { required: true, message: 'Vui lòng nhập tên vật tư', trigger: 'blur' }
        ],
        trang_thai: [
          { required: true, message: 'Vui lòng chọn trạng thái', trigger: 'change' }
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
      }
    },
    'formData.mst'(val) {
      if (!this.isEdit) {
        this.formData.ma_kho = '';
        this.formData.ma_nhom = '';
        this.nhomOptions = [];
      }
    },
    'formData.sohieutk'(val) {
      if (!this.isEdit) {
        this.formData.ma_kho = '';
        this.formData.ma_nhom = '';
        this.nhomOptions = [];
      }
    },
    'formData.ma_kho'(val) {
      if (val && this.formData.mst && this.formData.sohieutk) {
        this.loadNhomOptions(this.formData.mst, this.formData.sohieutk, val);
      }
      if (!this.isEdit) {
        this.formData.ma_nhom = '';
      }
    }
  },
  methods: {
    async loadKhoOptions(mst, sohieutk) {
      try {
        const params = {
          table_code: 'tbldmkhohang',
          size: 1000,
          page: 1
        };
        if (mst) params.filters = { mst };
        if (sohieutk) params.filters = { ...params.filters, sohieutk };
        const response = await service.post(`${baseUrl}/dm/get-list`, params);
        this.khoOptions = (response.data && response.data.items) ? response.data.items : [];
      } catch (error) {
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
        this.$message.error('Không thể tải danh sách nhóm');
      }
    },
    handleMaKhoChange() {
      this.formData.ma_nhom = '';
      this.loadNhomOptions(this.formData.mst, this.formData.sohieutk, this.formData.ma_kho);
    },
    handleMaNhomChange() {
      // Additional logic can be added here if needed when ma_nhom changes
    },
    async initForm() {
      if (this.isEdit && this.materialData) {
        this.formData = {
          mst: this.materialData.mst || '',
          sohieutk: this.materialData.sohieutk || '',
          ma_kho: this.materialData.ma_kho || '',
          ma_nhom: this.materialData.ma_nhom || '',
          ma_vattu: this.materialData.ma_vattu || '',
          ten_vattu: this.materialData.ten_vattu || '',
          dvt: this.materialData.dvt || '',
          luong_dau_ky: this.materialData.luong_dau_ky || 0,
          gia_tri_dau_ky: this.materialData.gia_tri_dau_ky || 0,
          he_so_quy_doi: this.materialData.he_so_quy_doi || 0,
          ma_don_vi_quy_doi: this.materialData.ma_don_vi_quy_doi || '',
          vi_tri_luu_tru: this.materialData.vi_tri_luu_tru || '',
          nam: this.materialData.nam || new Date().getFullYear(),
          ghi_chu: this.materialData.ghi_chu || '',
          trang_thai: this.materialData.trang_thai != null ? this.materialData.trang_thai : 1
        };
        // Load dependent dropdowns for edit mode sequentially
        if (this.formData.ma_kho) {
          await this.loadNhomOptions(this.formData.mst, this.formData.sohieutk, this.formData.ma_kho);
        }
      } else {
        this.resetForm();
        await this.loadKhoOptions();
      }
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      });
    },
    resetForm() {
      this.formData = {
        mst: '',
        sohieutk: '',
        ma_kho: '',
        ma_nhom: '',
        ma_vattu: '',
        ten_vattu: '',
        dvt: '',
        luong_dau_ky: 0,
        gia_tri_dau_ky: 0,
        he_so_quy_doi: 0,
        ma_don_vi_quy_doi: '',
        vi_tri_luu_tru: '',
        nam: new Date().getFullYear(),
        ghi_chu: '',
        trang_thai: 1
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
          table_code: 'tbldmvattu_hanghoa',
          ...this.formData
        };
        const boolFields = [
          'trang_thai'
        ];
        boolFields.forEach(field => {
          payload[field] = this.formData[field] ? 1 : 0;
        });
        if (this.isEdit) {
          payload.id = this.materialData.id;
          await service.post(`${baseUrl}/dm/upsert`, payload);
        } else {
          await service.post(`${baseUrl}/dm/upsert`, payload);
        }
        this.$emit('success', this.formData);
      } catch (e) {
        this.$message.error('Có lỗi xảy ra khi lưu dữ liệu!');
      } finally {
        this.loading = false;
      }
    },
    handleClose() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style> 