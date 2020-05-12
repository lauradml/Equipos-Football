<template>
  <div>
    <el-input
      v-model="inputValue"
      :placeholder="imputPlaceholder"
      :size="sizeInput"
      @input="sendInputValue"
    ></el-input>
  </div>
</template>

<script>
export default {
  name: "InputApp",
  data() {
    return {
      inputValue: this.textValue
    };
  },
  props: {
    textValue: String,
    sizeInput: String,
    imputPlaceholder: String
  },
  methods: {
    sendInputValue() {
      this.$emit("saveInputValue", this.inputValue);
    },
    onSubmit() {
      this.$emit("enter");
    }
  }
};
</script>