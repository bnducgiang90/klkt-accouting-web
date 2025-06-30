<template>
  <el-dialog
    :title="isEdit ? 'Chỉnh sửa tài sản' : 'Thêm mới tài sản'"
    :visible.sync="dialogVisible"
    width="1100px"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="180px"
      label-position="left"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="MST" prop="mst">
            <el-input v-model="formData.mst" placeholder="Nhập MST" clearable :disabled="isEdit" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Số hiệu TK" prop="sohieutk">
            <el-input v-model="formData.sohieutk" placeholder="Nhập số hiệu tài khoản" clearable :disabled="isEdit" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Mã kho" prop="ma_kho">
            <el-input v-model="formData.ma_kho" placeholder="Nhập mã kho" maxlength="10" clearable :disabled="isEdit" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Mã nhóm" prop="ma_nhom">
            <el-input v-model="formData.ma_nhom" placeholder="Nhập mã nhóm" maxlength="20" clearable :disabled="isEdit" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Mã tài sản" prop="ma_taisan">
            <el-input v-model="formData.ma_taisan" placeholder="Nhập mã tài sản" clearable :disabled="isEdit" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Tên tài sản" prop="ten_taisan">
            <el-input v-model="formData.ten_taisan" placeholder="Nhập tên tài sản" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Đơn vị tính" prop="dvt">
            <el-input v-model="formData.dvt" placeholder="Nhập đơn vị tính" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Số thẻ" prop="so_the">
            <el-input v-model="formData.so_the" placeholder="Nhập số thẻ" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Ngày lập thẻ" prop="ngaylap_the">
            <el-date-picker v-model="formData.ngaylap_the" type="date" placeholder="Chọn ngày" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Hãng tài sản" prop="hang_taisan">
            <el-input v-model="formData.hang_taisan" placeholder="Nhập hãng tài sản" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Công suất thiết kế" prop="congsuat_thietke">
            <el-input v-model="formData.congsuat_thietke" placeholder="Nhập công suất thiết kế" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Nước sản xuất" prop="nuoc_sanxuat">
            <el-input v-model="formData.nuoc_sanxuat" placeholder="Nhập nước sản xuất" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Năm sản xuất" prop="nam_sanxuat">
            <el-input-number v-model="formData.nam_sanxuat" :min="1900" :max="2100" style="width: 100%" placeholder="Năm sản xuất" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Hiện trạng" prop="hientrang">
            <el-input v-model="formData.hientrang" placeholder="Nhập hiện trạng" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Mã đơn vị quản lý" prop="donvi_quanly">
            <el-input v-model="formData.donvi_quanly" placeholder="Nhập mã đơn vị quản lý" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Tên đơn vị quản lý" prop="ten_donvi_quanly">
            <el-input v-model="formData.ten_donvi_quanly" placeholder="Nhập tên đơn vị quản lý" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Nguồn vốn" prop="nguonvon">
            <el-input v-model="formData.nguonvon" placeholder="Nhập nguồn vốn" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Số biên bản bàn giao" prop="so_bienban_bangiao">
            <el-input v-model="formData.so_bienban_bangiao" placeholder="Nhập số biên bản bàn giao" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Ngày biên bản bàn giao" prop="ngay_bienban_bangiao">
            <el-date-picker v-model="formData.ngay_bienban_bangiao" type="date" placeholder="Chọn ngày" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Ngày điều chỉnh" prop="ngay_dieuchinh">
            <el-date-picker v-model="formData.ngay_dieuchinh" type="date" placeholder="Chọn ngày" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Lý do điều chỉnh" prop="lydo_dieuchinh">
            <el-input v-model="formData.lydo_dieuchinh" placeholder="Nhập lý do điều chỉnh" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Số lượng đầu kỳ" prop="soluong_dauky">
        <el-input-number v-model="formData.soluong_dauky" :min="0" style="width: 100%" placeholder="0" />
      </el-form-item>
      <el-form-item label="Nguyên giá" prop="nguyengia">
        <el-input-number v-model="formData.nguyengia" :min="0" style="width: 100%" placeholder="0" />
      </el-form-item>
      <el-form-item label="Hao mòn lũy kế" prop="haomon_luyke">
        <el-input-number v-model="formData.haomon_luyke" :min="0" style="width: 100%" placeholder="0" />
      </el-form-item>
      <el-form-item label="Giá trị còn lại" prop="giatri_conlai">
        <el-input-number v-model="formData.giatri_conlai" :min="0" style="width: 100%" placeholder="0" />
      </el-form-item>
      <el-form-item label="Số năm phân bổ" prop="so_nam_phanbo">
        <el-input-number v-model="formData.so_nam_phanbo" :min="0" style="width: 100%" placeholder="0" />
      </el-form-item>
      <el-form-item label="Kỳ phân bổ" prop="ky_phanbo">
        <el-input v-model="formData.ky_phanbo" placeholder="Nhập kỳ phân bổ" clearable />
      </el-form-item>
      <el-form-item label="Số tháng phân bổ" prop="sothang_phanbo">
        <el-input-number v-model="formData.sothang_phanbo" :min="0" style="width: 100%" placeholder="0" />
      </el-form-item>
      <el-form-item label="TK phân bổ" prop="taikhoan_phanbo">
        <el-input v-model="formData.taikhoan_phanbo" placeholder="Nhập TK phân bổ" clearable />
      </el-form-item>
      <el-form-item label="Chi tiết TK phân bổ" prop="chitiet_taikhoan_phanbo">
        <el-input v-model="formData.chitiet_taikhoan_phanbo" placeholder="Nhập chi tiết TK phân bổ" clearable />
      </el-form-item>
      <el-form-item label="Công đoạn sản xuất" prop="congdoan_sanxuat">
        <el-input v-model="formData.congdoan_sanxuat" placeholder="Nhập công đoạn sản xuất" clearable />
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
  name: 'AssetForm',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    assetData: {
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
        ma_taisan: '',
        ten_taisan: '',
        dvt: '',
        so_the: '',
        ngaylap_the: '',
        hang_taisan: '',
        congsuat_thietke: '',
        nuoc_sanxuat: '',
        nam_sanxuat: '',
        hientrang: '',
        donvi_quanly: '',
        ten_donvi_quanly: '',
        nguonvon: '',
        so_bienban_bangiao: '',
        ngay_bienban_bangiao: '',
        ngay_dieuchinh: '',
        lydo_dieuchinh: '',
        soluong_dauky: 0,
        nguyengia: 0,
        haomon_luyke: 0,
        giatri_conlai: 0,
        so_nam_phanbo: 0,
        ky_phanbo: '',
        sothang_phanbo: 0,
        taikhoan_phanbo: '',
        ma_kho: '',
        ma_nhom: '',
        chitiet_taikhoan_phanbo: '',
        congdoan_sanxuat: '',
        trang_thai: 1
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
        ],
        ma_kho: [
          { required: true, message: 'Vui lòng nhập mã kho', trigger: 'blur' }
        ],
        ma_nhom: [
          { required: true, message: 'Vui lòng nhập mã nhóm', trigger: 'blur' }
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
      if (this.isEdit && this.assetData) {
        this.formData = {
          ...this.formData,
          ...this.assetData,
          trang_thai: this.assetData.trang_thai != null ? this.assetData.trang_thai : 1,
          ma_kho: this.assetData.ma_kho || '',
          ma_nhom: this.assetData.ma_nhom || ''
        };
      } else {
        this.resetForm();
      }
    },
    resetForm() {
      this.formData = {
        mst: '',
        sohieutk: '',
        ma_taisan: '',
        ten_taisan: '',
        dvt: '',
        so_the: '',
        ngaylap_the: '',
        hang_taisan: '',
        congsuat_thietke: '',
        nuoc_sanxuat: '',
        nam_sanxuat: '',
        hientrang: '',
        donvi_quanly: '',
        ten_donvi_quanly: '',
        nguonvon: '',
        so_bienban_bangiao: '',
        ngay_bienban_bangiao: '',
        ngay_dieuchinh: '',
        lydo_dieuchinh: '',
        soluong_dauky: 0,
        nguyengia: 0,
        haomon_luyke: 0,
        giatri_conlai: 0,
        so_nam_phanbo: 0,
        ky_phanbo: '',
        sothang_phanbo: 0,
        taikhoan_phanbo: '',
        ma_kho: '',
        ma_nhom: '',
        chitiet_taikhoan_phanbo: '',
        congdoan_sanxuat: '',
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
          table_code: 'tbldmtaisan',
          ...this.formData
        };
        // Convert boolean fields to 1/0
        const boolFields = [
          'trang_thai'
        ];
        boolFields.forEach(field => {
          payload[field] = this.formData[field] ? 1 : 0;
        });
        if (this.isEdit) {
          payload.id = this.assetData.id;
          await service.post(`${baseUrl}/dm/upsert`, payload);
        } else {
          await service.post(`${baseUrl}/dm/upsert`, payload);
        }
        this.$emit('success', this.formData);
        this.dialogVisible = false;
      } catch (e) {
        this.$message.error('Có lỗi xảy ra khi lưu dữ liệu');
      } finally {
        this.loading = false;
      }
    },
    handleClose() {
      this.dialogVisible = false;
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