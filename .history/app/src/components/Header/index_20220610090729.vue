<template>
   <el-header style="text-align: right; font-size: 12px">
      <el-button type="success" icon="el-icon-message-solid" plain='true' circle></el-button>
      <el-button type="success" icon="el-icon-s-custom" plain='true' circle></el-button>
      <div v-if="isLogin" style="display:inline-block">
          <el-button  type="success" icon="el-icon-switch-button" plain='true' @click="logout" circle></el-button>
          <span >王小虎</span>
      </div>
      <div v-else style="display:inline-block">
          <a href="">登录</a>
      </div>
    </el-header>
</template>
<script>
export default {
  name: "Header",
  methods: {
    logout(){
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("user")
      this.$router.push("/login")
    }
  },
  computed:{
    isLogin(){
      if(localStorage.getItem('user')){
        return true
      }else {
        return false
      }
    },
    // username(){
    //   return localStorage.getItem('user').
    // }
  }
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