<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
    <el-form-item prop="input">
      <el-input
        v-model="ruleForm.input"
        placeholder="请输入内容"
        ref="myinput"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "InPut",

  data() {
    return {
      ruleForm: {
        input: "",
      },
      //表单验证
      rules: {
        input: [
          { required: true, message: "请输入卡号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      //提交的状态阈值
      isSub: true,
    };
  },

  mounted() {
    this.reflash();
    //
    this.$bus.$on("dateEvent", (value) => {
      this.ruleForm.input = value;
    });
    //
    this.$bus.$on("inputValidata", (fn) => {
      this[fn]();
    });
    // this.$bus.$emit("inputValidata", this.submitForm);
  },

  methods: {
    reflash() {
      this.$store.commit("UPDATEINPUT", "");
    },
    //提交表单按钮 携带验证
    submitForm() {
      console.log(1);
      this.$refs["ruleForm"].validate((valid) => {
        console.log(valid);
        if (valid) {
          alert("submit!");
          this.$store.commit("SUBCHECK", true);
        } else {
          console.log("error submit!!");
          //如果不写这个，无效的输入依然会提交
          //这里相当于给提交组件一个状态值，看是否需要提交
          this.$store.commit("SUBCHECK", false);
          return false;
        }
      });
    },
  },
  watch: {
    input: {
      handler(newv, oldv) {
        this.$store.commit("UPDATEINPUT", newv);
      },
    },
  },
};
</script>

<style lang="less" scoped>
</style>