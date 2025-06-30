<template>
  <el-dialog
    :title="isEdit ? 'Chỉnh sửa vật tư' : 'Thêm mới vật tư'"
    :visible.sync="dialogVisible"
    width="700px"
    :before-close="handleClose"
    :close-on-click-modal="false"
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
            <el-input v-model="formData.ma_kho" placeholder="Nhập mã kho" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Mã nhóm" prop="ma_nhom">
            <el-input v-model="formData.ma_nhom" placeholder="Nhập mã nhóm" clearable />
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
        ghi_chu: ''
      },
      rules: {
        mst: [
          { required: true, message: 'Vui lòng nhập MST', trigger: 'blur' }
        ],
        sohieutk: [
          { required: true, message: 'Vui lòng nhập số hiệu TK', trigger: 'blur' }
        ],
        ma_vattu: [
          { required: true, message: 'Vui lòng nhập mã vật tư', trigger: 'blur' }
        ],
        ten_vattu: [
          { required: true, message: 'Vui lòng nhập tên vật tư', trigger: 'blur' }
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
          ghi_chu: this.materialData.ghi_chu || ''
        };
      } else {
        this.resetForm();
      }
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
        ghi_chu: ''
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
        if (this.isEdit) {
          payload.id = this.materialData.id;
          await service.put(`${baseUrl}/dm/update`, payload);
        } else {
          await service.post(`${baseUrl}/dm/create`, payload);
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