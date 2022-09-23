<template>
  <el-container>
    <Nav v-if="show" />
    <div id="right_box">
      <!-- issue:为什么这里不需要import也可以直接使用 -->
      <!-- 因为在main.js中注册了全局组件 -->
      <Header v-if="show" />
      <el-main>
        <router-view />
      </el-main>
    </div>
  </el-container>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    if (sessionStorage.getItem("token")) {
      this.show = true;
    } else {
      this.show = false;
    }
    this.$bus.$on("updateToken", () => {
      if (sessionStorage.getItem("token")) {
        this.show = true;
      } else {
        this.show = false;
      }
    });
  },
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
  /* width: 110%; */
  background-color: #f3f8fe;
  /* height: 710px; */
}
.el-container {
  height: 100vh;
}
.el-main {
  height: 810px;
}
.el-col-12 {
  background-color: #545c64;
  min-width: 249px;
}
</style>
