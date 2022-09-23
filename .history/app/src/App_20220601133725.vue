<template>
  <el-container>
    <Nav />
    <div id="right_box">
      <!-- issue:为什么这里不需要import也可以直接使用 -->
      <!-- 因为在main.js中注册了全局组件 -->
      <Header />
      <el-main>
        <router-view />
      </el-main>
    </div>
  </el-container>
</template>


<script>
// import NavBar from "@/components/Nav";
export default {
  name: "App",
};
</script>

<style>
.router-link-exact-active {
  color: red;
}
* {
  padding: 0px;
  margin: 0px;
}
body {
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

#right_box {
  flex: 1;
  background-color: #f3f8fe;

}
.el-container{
  height: 100vh;
}
.el-main{
  height: 710px;
}
.el-col-12{
  background-color: #545C64;
  width: 240px;
}
</style>
