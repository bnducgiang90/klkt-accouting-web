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
            <el-input v-model="formData.mst" placeholder="MST" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Số hiệu TK" prop="sohieutk">
            <el-input v-model="formData.sohieutk" placeholder="Nhập số hiệu tài khoản" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Tên tài khoản" prop="ten_tk">
        <el-input v-model="formData.ten_tk" placeholder="Nhập tên tài khoản" clearable />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Tên tài khoản TA" prop="ten_tk_ta">
            <el-input v-model="formData.ten_tk_ta" placeholder="Nhập tên tài khoản TA" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Dư nợ đầu kỳ" prop="du_no_dau_ky">
            <el-input-number v-model="formData.du_no_dau_ky" :min="0" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Dư có đầu kỳ" prop="du_co_dau_ky">
            <el-input-number v-model="formData.du_co_dau_ky" :min="0" style="width: 100%" />
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
        du_no_dau_ky: 0,
        du_co_dau_ky: 0
      },
      rules: {
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
      let mst = '';
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        mst = user?.mst || '';
      } catch (e) {}
      if (this.isEdit && this.accountData) {
        this.formData = {
          mst: this.accountData.mst || mst,
          sohieutk: this.accountData.sohieutk || '',
          ten_tk: this.accountData.ten_tk || '',
          ten_tk_ta: this.accountData.ten_tk_ta || '',
          du_no_dau_ky: this.accountData.du_no_dau_ky || 0,
          du_co_dau_ky: this.accountData.du_co_dau_ky || 0
        };
      } else {
        this.formData = {
          mst: mst,
          sohieutk: '',
          ten_tk: '',
          ten_tk_ta: '',
          du_no_dau_ky: 0,
          du_co_dau_ky: 0
        };
        this.$nextTick(() => {
          this.$refs.form && this.$refs.form.clearValidate();
        });
      }
    },
    
    resetForm() {
      let mst = '';
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        mst = user?.mst || '';
      } catch (e) {}
      this.formData = {
        mst: mst,
        sohieutk: '',
        ten_tk: '',
        ten_tk_ta: '',
        du_no_dau_ky: 0,
        du_co_dau_ky: 0
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
          mst: this.formData.mst,
          sohieutk: this.formData.sohieutk,
          ten_tk: this.formData.ten_tk,
          ten_tk_ta: this.formData.ten_tk_ta,
          du_no_dau_ky: this.formData.du_no_dau_ky,
          du_co_dau_ky: this.formData.du_co_dau_ky
        };
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