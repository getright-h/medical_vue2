<template>
  <el-container>
  <Nav/>
    <el-container>
      <Header/>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "App",
  
};
</script>

<style scoped>
el-container{
  height: 100vh;  
}
</style>
