<template>
  <div class="floating-label-select" :class="{ 'is-focused': isFocused || hasValue, 'is-disabled': disabled }">
    <el-select
      v-bind="$attrs"
      v-model="selectValue"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      :filterable="filterable"
      :multiple="multiple"
      style="width: 100%;"
    >
      <slot />
    </el-select>
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "FloatingLabelSelect",
  props: {
    value: [String, Number, Array],
    label: String,
    placeholder: {
      type: String,
      default: " "
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    multiple: Boolean
  },
  data() {
    return {
      isFocused: false
    };
  },
  computed: {
    selectValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    hasValue() {
      if (this.multiple && Array.isArray(this.value)) {
        return this.value.length > 0;
      }
      return !!this.value;
    }
  },
  methods: {
    handleFocus(event) {
      this.isFocused = true;
      this.$emit("focus", event);
    },
    handleBlur(event) {
      this.isFocused = false;
      this.$emit("blur", event);
    },
    handleChange(value) {
      this.$emit("change", value);
    }
  }
};
</script>

<style scoped>
.floating-label-select {
  position: relative;
  margin-top: 0px;
}
.floating-label-select label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s ease;
  color: #909399;
  background: white;
  padding: 0 4px;
  font-size: 14px;
  pointer-events: none;
  z-index: 2;
}
.floating-label-select.is-focused label,
.floating-label-select .el-select.is-focus + label,
.floating-label-select.is-focused .el-input__inner + label,
.floating-label-select.is-focused label,
.floating-label-select .el-select .el-select__tags + label,
.floating-label-select.is-focused .el-select + label,
.floating-label-select .el-select .el-input__inner:not(:placeholder-shown) + label,
.floating-label-select .el-select .el-input__inner[value]:not([value=""]) + label,
.floating-label-select.is-focused label,
.floating-label-select .el-select input[value]:not([value=""]) + label,
.floating-label-select .el-select input:focus + label {
  top: 0;
  font-size: 12px;
  color: #409EFF;
  transform: translateY(-50%) scale(0.9);
}
.floating-label-select.is-disabled label {
  color: #c0c4cc;
}
</style>
