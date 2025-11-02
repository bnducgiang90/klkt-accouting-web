<template>
  <el-dialog
    :visible.sync="visible"
    :title="isEdit ? 'Sửa kho hàng' : 'Thêm kho hàng'"
    width="520px"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :append-to-body="true"
    @close="$emit('close')"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px" label-position="left">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="MST" prop="mst">
            <el-input v-model="form.mst" maxlength="15" readonly placeholder="Mã số thuế" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Số hiệu TK" prop="sohieutk">
            <el-input v-model="form.sohieutk" maxlength="10" placeholder="VD: 152, 153..." />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="Mã kho" prop="ma_kho">
            <el-input v-model="form.ma_kho" maxlength="10" :disabled="isEdit" placeholder="Nhập mã kho" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Tên kho" prop="ten_kho">
            <el-input v-model="form.ten_kho" maxlength="100" placeholder="Nhập tên kho" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Trạng thái" prop="trang_thai">
        <el-switch v-model="form.trang_thai" active-value="1" inactive-value="0" active-text="Hoạt động" inactive-text="Vô hiệu" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">Hủy</el-button>
      <el-button type="primary" @click="handleSubmit">Lưu</el-button>
    </div>
  </el-dialog>
  </template>
<script>
import service from '@/utils/request'
import { getUser } from '@/utils/auth'
const baseUrl = process.env.VUE_APP_BASE_API || ''
export default {
  name: 'KhoHangForm',
  props: {
    visible: Boolean,
    isEdit: Boolean,
    khoData: Object
  },
  data() {
    return {
      form: {
        mst: '',
        sohieutk: '',
        ma_kho: '',
        ten_kho: '',
        trang_thai: 1
      },
      rules: {
        mst: [{ required: true, message: 'Nhập MST', trigger: 'blur' }],
        sohieutk: [{ required: true, message: 'Nhập số hiệu TK', trigger: 'blur' }],
        ma_kho: [{ required: true, message: 'Nhập mã kho', trigger: 'blur' }],
        ten_kho: [{ required: true, message: 'Nhập tên kho', trigger: 'blur' }]
      }
    }
  },
  watch: {
    khoData: {
      immediate: true,
      handler(val) {
       const user = getUser()
      //  console.log(user.user.user.taxCode)
        if (val) {
          this.form = { ...val, mst: user.user.user.taxCode }
        } else {
          this.form = { mst: user.user.user.taxCode, sohieutk: '', ma_kho: '', ten_kho: '', trang_thai: 1 }
        }
      }
    },
    visible(val) {
      if (!val) this.$refs.formRef && this.$refs.formRef.resetFields()
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate(async valid => {
        if (!valid) return
        try {
          const payload = { ...this.form, table_code: 'tbldmkhohang' }
          await service.post(`${baseUrl}/dm/upsert`, payload)
          this.$emit('success')
          this.$emit('close')
          this.$message.success(this.isEdit ? 'Cập nhật thành công' : 'Thêm mới thành công')
        } catch (e) {
          this.$message.error('Lỗi lưu kho hàng')
        }
      })
    }
  }
}
</script>
<style scoped>
.dialog-footer { text-align: right; }
</style> 