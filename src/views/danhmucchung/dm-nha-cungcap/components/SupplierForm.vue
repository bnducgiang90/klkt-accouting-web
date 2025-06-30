<template>
  <el-dialog
    :title="isEdit ? 'Chỉnh sửa nhà cung cấp' : 'Thêm mới nhà cung cấp'"
    :visible.sync="dialogVisible"
    width="800px"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form
      ref="supplierForm"
      :model="form"
      :rules="rules"
      label-width="140px"
      label-position="left"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="MST" prop="mst">
            <el-input v-model="form.mst" placeholder="Nhập MST" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="MST KH NCC" prop="mst_kh_ncc">
            <el-input v-model="form.mst_kh_ncc" placeholder="Nhập MST KH NCC" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Tên công ty" prop="ten_congty">
            <el-input v-model="form.ten_congty" placeholder="Nhập tên công ty" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Dư nợ" prop="du_no">
            <el-input-number
              v-model="form.du_no"
              :precision="0"
              :step="1000"
              style="width: 100%"
              placeholder="Nhập dư nợ"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Dư có" prop="du_co">
            <el-input-number
              v-model="form.du_co"
              :precision="0"
              :step="1000"
              style="width: 100%"
              placeholder="Nhập dư có"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Địa chỉ" prop="dia_chi">
            <el-input v-model="form.dia_chi" placeholder="Nhập địa chỉ" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Huyện" prop="huyen">
            <el-input v-model="form.huyen" placeholder="Nhập huyện" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Tỉnh" prop="tinh">
            <el-input v-model="form.tinh" placeholder="Nhập tỉnh" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Điện thoại" prop="dien_thoai">
            <el-input v-model="form.dien_thoai" placeholder="Nhập số điện thoại" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Tên giám đốc" prop="ten_giamdoc">
            <el-input v-model="form.ten_giamdoc" placeholder="Nhập tên giám đốc" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Tên kế toán" prop="ten_ketoan">
            <el-input v-model="form.ten_ketoan" placeholder="Nhập tên kế toán" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Lĩnh vực KD" prop="linh_vuc_kd">
            <el-input v-model="form.linh_vuc_kd" placeholder="Nhập lĩnh vực kinh doanh" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Khách hàng" prop="khach_hang">
            <el-switch
              v-model="form.khach_hang"
              active-text="Có"
              inactive-text="Không"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Nhà cung cấp" prop="nha_cungcap">
            <el-switch
              v-model="form.nha_cungcap"
              active-text="Có"
              inactive-text="Không"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Tài khoản" prop="tai_khoan">
            <el-input v-model="form.tai_khoan" placeholder="Nhập tài khoản" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Ngân hàng" prop="ngan_hang">
            <el-input v-model="form.ngan_hang" placeholder="Nhập tên ngân hàng" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Cấp" prop="cap">
            <el-input-number
              v-model="form.cap"
              :min="1"
              :max="10"
              style="width: 100%"
              placeholder="Nhập cấp"
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
      form: {
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
        cap: 1
      },
      rules: {
        mst: [
          { required: true, message: 'Vui lòng nhập MST', trigger: 'blur' }
        ],
        ten_congty: [
          { required: true, message: 'Vui lòng nhập tên công ty', trigger: 'blur' }
        ],
        dia_chi: [
          { required: true, message: 'Vui lòng nhập địa chỉ', trigger: 'blur' }
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
        this.form = {
          ...this.supplierData,
          khach_hang: Boolean(this.supplierData.khach_hang),
          nha_cungcap: Boolean(this.supplierData.nha_cungcap),
          du_no: this.supplierData.du_no || 0,
          du_co: this.supplierData.du_co || 0,
          cap: this.supplierData.cap || 1
        };
      } else {
        this.resetForm();
      }
    },
    resetForm() {
      this.form = {
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
        cap: 1
      };
      this.$nextTick(() => {
        this.$refs.supplierForm && this.$refs.supplierForm.clearValidate();
      });
    },
    async handleSubmit() {
      try {
        const valid = await this.$refs.supplierForm.validate();
        if (!valid) return;

        this.loading = true;
        const payload = {
          table_code: 'tbldmnhacungcap',
          ...this.form
        };

        if (this.isEdit) {
          payload.id = this.supplierData.id;
          await service.post(`${baseUrl}/dm/upsert`, payload);
        } else {
          await service.post(`${baseUrl}/dm/upsert`, payload);
        }

        this.$emit('success', this.form);
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