<template>
   <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看个人</el-dropdown-item>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
</template>
<script>
export default {
  name: "Header",
  methods: {
    logout(){
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