<template>
   <el-header style="text-align: right; font-size: 12px">
      <el-button type="success" icon="el-icon-message-solid" :plain='true' circle  @click="alert('此功能暂未开放')"> </el-button>
      <el-button type="success" icon="el-icon-s-custom" :plain='true' circle @click="alert('此功能也暂未开放')"></el-button>
           <el-button  type="success" icon="el-icon-switch-button" :plain='true' @click="logout" circle></el-button>
          <span >{{username}}</span>
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
    username(){
      return JSON.parse(localStorage.getItem('user')).name || '加载中.....'
    }
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