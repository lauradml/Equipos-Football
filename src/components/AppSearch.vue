<template>
  <div class="subheader">

    <div class="subheader-search-box">
      <InputApp
        :inputText="inputValue"
        :imputPlaceholder="serverText"
        @saveInputValue="onInputValueChange"
        @keyup.enter.native="saveSearch"
      ></InputApp>
      <ButtonInput @submit="saveSearch" :icon="'el-icon-search'"></ButtonInput>
       <el-button type="primary" @click="clear">Quitar selección</el-button>
    </div>
  </div>
</template>

<script>
import ButtonInput from "./ButtonInput.vue";
import InputApp from "./InputApp.vue";

export default {
  name: "AppSearch",
  components: {
    InputApp,
    ButtonInput
  },
  data() {
    return {
      sizeSearch: "large",
      inputValue: "",
      serverText: "Search...",
      iconButton: "el-icon-search",
      buttonSize: "mini"
    };
  },

  methods: {
    onInputValueChange(e) {
      this.inputValue = e;
      this.serverText= e;
    },
    saveSearch() {
      this.$emit("sendFilterData", this.inputValue);
    },
    clear(){
      this.serverText= "Search..."
      this.inputValue=""
      this.saveSearch();
    }
  }
};
</script>

<style>
.subheader {
  height: 50%;
  margin: 2% 10%;
  padding: 28px 26px;
  background-color: #ededed;
  color: #7f7f7f;
  text-align: left;
  font-size: 18px;
}
.subheader-title {
  margin-top: 5px;
}
.subheader-search-box {
  display: flex;
  justify-content: center;
}
</style>