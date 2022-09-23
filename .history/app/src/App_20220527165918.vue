<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <Nav/>

    <div id="right_box">
      <Header/>
      <el-main>
        <router-view></router-view>
      </el-main>
    </div>
      
      
  </el-container>
</template>


<script>
export default {
  name: "App",
};
</script>

<style>
  *{
    padding: 0px;
    margin: 0px;
  }
  body{
    padding: 0px !important;
    margin: 0px !important;
  }
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

#right_box{
  width: 100vh;
  height: 100vh;
  background-color: skyblue;
}


</style>
