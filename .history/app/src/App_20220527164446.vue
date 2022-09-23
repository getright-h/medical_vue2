<!-- <template>
  <el-container>
    <Nav/>
    <el-container>
      <Header/>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template> -->

<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <Nav/>

    <el-container>
      <!-- <Header/> -->

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
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
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
