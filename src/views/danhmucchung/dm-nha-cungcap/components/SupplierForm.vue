<template>
  <el-dialog
    :title="isEdit ? 'Chỉnh sửa nhà cung cấp' : 'Thêm mới nhà cung cấp'"
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
          <el-form-item label="MST KH NCC" prop="mst_kh_ncc">
            <el-input v-model="formData.mst_kh_ncc" placeholder="Nhập MST KH NCC" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Tên công ty" prop="ten_congty">
        <el-input v-model="formData.ten_congty" placeholder="Nhập tên công ty" clearable />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Dư nợ" prop="du_no">
            <el-input-number v-model="formData.du_no" :precision="0" :step="1000" :min="0" style="width: 100%" placeholder="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Dư có" prop="du_co">
            <el-input-number v-model="formData.du_co" :precision="0" :step="1000" :min="0" style="width: 100%" placeholder="0" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Địa chỉ" prop="dia_chi">
        <el-input v-model="formData.dia_chi" placeholder="Nhập địa chỉ" clearable />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="Huyện" prop="huyen">
            <el-input v-model="formData.huyen" placeholder="Nhập huyện" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Tỉnh" prop="tinh">
            <el-input v-model="formData.tinh" placeholder="Nhập tỉnh" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Điện thoại" prop="dien_thoai">
            <el-input v-model="formData.dien_thoai" placeholder="Nhập điện thoại" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Tên giám đốc" prop="ten_giamdoc">
            <el-input v-model="formData.ten_giamdoc" placeholder="Nhập tên giám đốc" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Tên kế toán" prop="ten_ketoan">
            <el-input v-model="formData.ten_ketoan" placeholder="Nhập tên kế toán" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Lĩnh vực KD" prop="linh_vuc_kd">
        <el-input v-model="formData.linh_vuc_kd" placeholder="Nhập lĩnh vực kinh doanh" clearable />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Khách hàng" prop="khach_hang">
            <el-switch v-model="formData.khach_hang" active-text="Có" inactive-text="Không" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Nhà cung cấp" prop="nha_cungcap">
            <el-switch v-model="formData.nha_cungcap" active-text="Có" inactive-text="Không" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Tài khoản" prop="tai_khoan">
            <el-input v-model="formData.tai_khoan" placeholder="Nhập tài khoản" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Ngân hàng" prop="ngan_hang">
            <el-input v-model="formData.ngan_hang" placeholder="Nhập ngân hàng" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Cấp" prop="cap">
            <el-input-number v-model="formData.cap" :min="0" style="width: 100%" placeholder="0" />
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
  name: 'SupplierForm',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    supplierData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loading: false,
      formData: {
        mst: '',
        mst_kh_ncc: '',
        ten_congty: '',
        du_no: 0,
        du_co: 0,
        dia_chi: '',
        huyen: '',
        tinh: '',
        dien_thoai: '',
        ten_giamdoc: '',
        ten_ketoan: '',
        linh_vuc_kd: '',
        khach_hang: false,
        nha_cungcap: true,
        tai_khoan: '',
        ngan_hang: '',
        cap: 0
      },
      rules: {
        mst: [
          { required: true, message: 'Vui lòng nhập MST', trigger: 'blur' }
        ],
        ten_congty: [
          { required: true, message: 'Vui lòng nhập tên công ty', trigger: 'blur' }
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
      if (this.isEdit && this.supplierData) {
        this.formData = {
          mst: this.supplierData.mst || '',
          mst_kh_ncc: this.supplierData.mst_kh_ncc || '',
          ten_congty: this.supplierData.ten_congty || '',
          du_no: this.supplierData.du_no || 0,
          du_co: this.supplierData.du_co || 0,
          dia_chi: this.supplierData.dia_chi || '',
          huyen: this.supplierData.huyen || '',
          tinh: this.supplierData.tinh || '',
          dien_thoai: this.supplierData.dien_thoai || '',
          ten_giamdoc: this.supplierData.ten_giamdoc || '',
          ten_ketoan: this.supplierData.ten_ketoan || '',
          linh_vuc_kd: this.supplierData.linh_vuc_kd || '',
          khach_hang: !!this.supplierData.khach_hang,
          nha_cungcap: !!this.supplierData.nha_cungcap,
          tai_khoan: this.supplierData.tai_khoan || '',
          ngan_hang: this.supplierData.ngan_hang || '',
          cap: this.supplierData.cap || 0
        };
      } else {
        this.resetForm();
      }
    },
    resetForm() {
      this.formData = {
        mst: '',
        mst_kh_ncc: '',
        ten_congty: '',
        du_no: 0,
        du_co: 0,
        dia_chi: '',
        huyen: '',
        tinh: '',
        dien_thoai: '',
        ten_giamdoc: '',
        ten_ketoan: '',
        linh_vuc_kd: '',
        khach_hang: false,
        nha_cungcap: true,
        tai_khoan: '',
        ngan_hang: '',
        cap: 0
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
          table_code: 'tbldmnhacungcap',
          ...this.formData
        };
        if (this.isEdit) {
          payload.id = this.supplierData.id;
          await service.put(`${baseUrl}/dm/update`, payload);
        } else {
          await service.post(`${baseUrl}/dm/create`, payload);
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