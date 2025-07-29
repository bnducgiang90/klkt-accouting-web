<template>
  <div class="floating-label-wrapper" :class="{ focused, filled }">
    <label>{{ label }}</label>
    <el-date-picker
      v-bind="$attrs"
      v-on="$listeners"
      v-model="innerValue"
      @focus="focused = true"
      @blur="focused = false"
      class="floating-date-picker"
    />
  </div>
</template>

<script>
export default {
  name: 'FloatingLabelDatePicker',
  props: {
    value: [String, Date],
    label: String,
  },
  data() {
    return {
      focused: false,
      innerValue: this.value,
    };
  },
  computed: {
    filled() {
      return !!this.innerValue;
    },
  },
  watch: {
    innerValue(val) {
      this.$emit('input', val);
    },
    value(val) {
      this.innerValue = val;
    },
  },
};
</script>

<style scoped>
.floating-label-wrapper {
  position: relative;
  margin: 0px 0;
}

.floating-label-wrapper label {
  position: absolute;
  top: 10px;
  left: 32px;
  color: #909399;
  font-size: 14px;
  transition: all 0.2s ease-out;
  pointer-events: none;
  background: white;
  padding: 0 10px 0 10px;
  z-index: 2;
}

.floating-label-wrapper.focused label,
.floating-label-wrapper.filled label {
  top: -8px;
  left: 10px;
  font-size: 12px;
  color: #409EFF;
  z-index: 3;
}

.floating-date-picker {
  width: 100%;
}

/* Fix phần input padding để tránh đè lên icon lịch */
.floating-date-picker ::v-deep .el-input__inner {
  /* padding: 20px 36px 6px 10px !important;  */ /* padding-right tăng để tránh icon */
  /* height: auto; */
  /* line-height: 20px; */
}

/* Đảm bảo icon không bị đè */
.floating-date-picker ::v-deep .el-input__suffix {
  top: 6px;
}

/* Nếu muốn đẹp hơn với border-radius và border rõ */
.floating-date-picker ::v-deep .el-input {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
</style>

