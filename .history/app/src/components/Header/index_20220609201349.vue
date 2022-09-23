<template>
   <el-header style="text-align: right; font-size: 12px">
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <span>王小虎</span>
    </el-header>
</template>
<script>
export default {
  name: "Header",
  methods: {
    logout(){
      console.log(12312312);
      sessionStorage.removeItem("token")
      this.$router.push("/login")
    }
  },
};
</script>

<style scoped>
   .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    width: 100%;
  }
</style>