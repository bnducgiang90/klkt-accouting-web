<template>
  <div
    class="floating-label-input"
    :class="{
      'is-focused': isFocused || value,
      'is-disabled': disabled,
    }"
  >
    <el-input
      v-bind="$attrs"
      v-model="inputValue"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      @change="onChange"
      :type="inputType"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled"
      :readonly="readonly"
      :prefix-icon="prefixIcon"
      :suffix-icon="showPasswordToggle ? passwordToggleIcon : suffixIcon"
      @suffix-icon-click="handleSuffixClick"
    />
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'FloatingInput',
  props: {
    value: [String, Number],
    label: String,
    placeholder: {
      type: String,
      default: ' ' // để tránh placeholder đè lên label
    },
    type: {
      type: String,
      default: 'text'
    },
    clearable: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    prefixIcon: String,
    suffixIcon: String,
    showPassword: Boolean // tương tự el-input
  },
  data() {
    return {
      isFocused: false,
      passwordVisible: false
    };
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    inputType() {
      if (this.showPassword) {
        return this.passwordVisible ? 'text' : 'password';
      }
      return this.type;
    },
    showPasswordToggle() {
      return this.showPassword && this.type === 'password';
    },
    passwordToggleIcon() {
      return this.passwordVisible ? 'el-icon-view' : 'el-icon-view-off';
    }
  },
  methods: {
    onFocus(evt) {
      this.isFocused = true;
      this.$emit('focus', evt);
    },
    onBlur(evt) {
      this.isFocused = false;
      this.$emit('blur', evt);
    },
    onInput(value) {
      this.$emit('input', value);
    },
    onChange(value) {
      this.$emit('change', value);
    },
    handleSuffixClick() {
      if (this.showPasswordToggle) {
        this.passwordVisible = !this.passwordVisible;
      }
      this.$emit('suffix-icon-click');
    }
  }
};
</script>

<style scoped>
.floating-label-input {
  position: relative;
  margin-top: 0px;
}
.floating-label-input label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s ease;
  color: #909399;
  pointer-events: none;
  background: white;
  padding: 0 4px;
  font-size: 14px;
  z-index: 2;
}
.floating-label-input.is-focused label,
.floating-label-input input:focus + label,
.floating-label-input input:not(:placeholder-shown) + label,
.floating-label-input.is-focused input + label {
  top: 0;
  font-size: 12px;
  color: #409EFF;
  transform: translateY(-50%) scale(0.9);
}
.floating-label-input.is-disabled label {
  color: #c0c4cc;
}
</style>
