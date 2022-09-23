<template>
  <el-container style="height: 500px; border: 1px solid #eee">
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
  .element.style{
    height: 100% !important;
  }
</style>
