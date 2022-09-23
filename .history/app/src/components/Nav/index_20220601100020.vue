<template>
  <el-col :span="12">
    <h5>自定义颜色</h5>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened=true
      :router=true
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>首页</span>
        </template>
        
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>预约管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">预约挂号</el-menu-item>
          <el-menu-item index="2-2">预约核酸检测</el-menu-item>
          <el-menu-item index="2-3">预约体检</el-menu-item>
          <el-menu-item index="2-4">医生排班</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>费用管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">门诊消费记录</el-menu-item>
          <el-menu-item index="3-2">门诊充值记录</el-menu-item>
          <el-menu-item index="3-3">住院消费记录</el-menu-item>
          <el-menu-item index="3-4">住院充值记录</el-menu-item>
          <el-menu-item index="3-5">退款记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>医院信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">医生管理</el-menu-item>
          <el-menu-item index="4-2">科室管理</el-menu-item>
          <el-menu-item index="4-3">体检套餐</el-menu-item>
          <el-menu-item index="4-4">健康百科</el-menu-item>
          <el-menu-item index="4-5">医院导航</el-menu-item>
          <el-menu-item index="4-6">医院简介</el-menu-item>
          <el-menu-item index="4-7">预约须知</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">管理员管理</el-menu-item>
          <el-menu-item index="5-2">角色管理</el-menu-item>
          <el-menu-item index="5-3">职称管理</el-menu-item>
          <el-menu-item index="5-4">消息公告</el-menu-item>
          <el-menu-item index="5-5">修改密码</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
    </el-menu>
  </el-col>
</template>
<script>
export default {
  name: "Nav",
  methods: {
    //编程式跳转，可以写在任意标签上
    toRefundHistory() {
      //这是简写
      this.$router.push("./RefundHistory");
    },
    sys() {
      this.$router.push("/index");
    },
    role() {
      this.$router.push("/role");
    },
    title() {
      this.$router.push("/title");
    },
    updatepw() {
      this.$router.push("/updatepw");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
}
.el-col-12>h5{
  height: 60px;
  background-color: #B3C0D1;
  
}
.el-col-12{
  width: 300px;
  height: 100vh;
}
</style>