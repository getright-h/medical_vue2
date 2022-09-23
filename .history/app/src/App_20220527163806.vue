<template>
  <el-container>
    <Nav/>
    <el-container>
      <Header/>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
/* .el-container{
   height: 100vh;   
   overflow: hidden;
} */
</style>
