<template>
  <el-container style="height: 500px; border: 1px solid #eee">
  <Nav/>
  <Header/>
    <el-container>
      

      
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: "App",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
    };
  },
};
</script>

<style scoped>

  
  
</style>
