<template>
  <el-dialog
    :title="isEdit ? 'Chỉnh sửa tài khoản chi tiết' : 'Thêm mới tài khoản chi tiết'"
    :visible.sync="dialogVisible"
    width="600px"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="120px"
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
            <el-input v-model="formData.sohieutk" placeholder="Nhập số hiệu tài khoản" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Mã chi tiết" prop="ma_chitiet">
            <el-input v-model="formData.ma_chitiet" placeholder="Nhập mã chi tiết" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Tên chi tiết" prop="ten_chitiet">
            <el-input v-model="formData.ten_chitiet" placeholder="Nhập tên chi tiết" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Dư nợ đầu kỳ" prop="du_no_dau_ky">
            <el-input-number v-model="formData.du_no_dau_ky" :precision="0" :step="1000" :min="0" style="width: 100%" placeholder="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Dư có đầu kỳ" prop="du_co_dau_ky">
            <el-input-number v-model="formData.du_co_dau_ky" :precision="0" :step="1000" :min="0" style="width: 100%" placeholder="0" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Sử dụng" prop="su_dung">
        <el-switch v-model="formData.su_dung" active-text="Có" inactive-text="Không" />
      </el-form-item>
      <el-form-item label="Ghi chú" prop="ghi_chu">
        <el-input
          v-model="formData.ghi_chu"
          type="textarea"
          :rows="3"
          placeholder="Nhập ghi chú (nếu có)"
        />
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
  name: 'TaiKhoanChiTietForm',
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
        ma_chitiet: '',
        ten_chitiet: '',
        du_no_dau_ky: 0,
        du_co_dau_ky: 0,
        su_dung: true,
        ghi_chu: ''
      },
      rules: {
        mst: [
          { required: true, message: 'Vui lòng nhập MST', trigger: 'blur' }
        ],
        sohieutk: [
          { required: true, message: 'Vui lòng nhập số hiệu tài khoản', trigger: 'blur' }
        ],
        ma_chitiet: [
          { required: true, message: 'Vui lòng nhập mã chi tiết', trigger: 'blur' }
        ],
        ten_chitiet: [
          { required: true, message: 'Vui lòng nhập tên chi tiết', trigger: 'blur' }
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
          ma_chitiet: this.accountData.ma_chitiet || '',
          ten_chitiet: this.accountData.ten_chitiet || '',
          du_no_dau_ky: this.accountData.du_no_dau_ky || 0,
          du_co_dau_ky: this.accountData.du_co_dau_ky || 0,
          su_dung: this.accountData.su_dung !== undefined ? this.accountData.su_dung : true,
          ghi_chu: this.accountData.ghi_chu || ''
        };
      } else {
        this.resetForm();
      }
    },
    resetForm() {
      this.formData = {
        mst: '',
        sohieutk: '',
        ma_chitiet: '',
        ten_chitiet: '',
        du_no_dau_ky: 0,
        du_co_dau_ky: 0,
        su_dung: true,
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
          table_code: 'tbldmtaikhoan_chitiet',
          ...this.formData
        };
        if (this.isEdit) {
          payload.id = this.accountData.id;
          await service.put(`${baseUrl}/dm/update`, payload);
        } else {
          await service.post(`${baseUrl}/dm/create`, payload);
        }
        this.$emit('success', this.formData);
        this.handleClose();
      } catch (e) {
        this.$message.error('Có lỗi xảy ra khi lưu dữ liệu');
      } finally {
        this.loading = false;
      }
    },
    handleClose() {
      this.dialogVisible = false;
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