<template>
  <el-col :span="12">
    <div class="logo">
      <img src="../../assets/images/logo.png" width="50px" height="50px" />
      <h5>李钏奇私人医院</h5>
    </div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened="true"
      :router="true"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>首页<el-menu-item index="home"></el-menu-item></span>
        </template>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-baseball"></i>
          <span>预约管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/bookregister">预约挂号</el-menu-item>
          <el-menu-item index="/booknat">预约核酸检测</el-menu-item>
          <el-menu-item index="/bookmedical">预约体检</el-menu-item>
          <el-menu-item index="/doctorschedule">医生排班</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-help"></i>
          <span>费用管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">门诊消费记录</el-menu-item>
          <el-menu-item index="3-2">门诊充值记录</el-menu-item>
          <el-menu-item index="/HospitaLization">住院消费记录</el-menu-item>
          <el-menu-item index="3-4">住院充值记录</el-menu-item>
          <el-menu-item index="3-5">退款记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-message-solid"></i>
          <span>医院信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">医生管理</el-menu-item>
          <el-menu-item index="4-2">科室管理</el-menu-item>
          <el-menu-item index="4-3">体检套餐</el-menu-item>
          <el-menu-item index="4-4">健康百科</el-menu-item>
          <el-menu-item index="/HospitalNavigation">医院导航</el-menu-item>
          <el-menu-item index="4-6">医院简介</el-menu-item>
          <el-menu-item index="4-7">预约须知</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/index">管理员管理</el-menu-item>
          <el-menu-item index="5-2">角色管理</el-menu-item>
          <el-menu-item index="5-3">职称管理</el-menu-item>
          <el-menu-item index="5-4">消息公告</el-menu-item>
          <el-menu-item index="5-5">修改密码</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>用户预约</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="6-1">预约</el-menu-item>
          <el-menu-item index="6-2">预约详情</el-menu-item>
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
.el-col-12 > h5 {
  height: 60px;
  background-color: #b3c0d1;
  text-align: center;
  line-height: 60px;
  color: white;
}
.el-col-12 {
  width: 300px;
  height: 100vh;
}
.logo{
  text-align: center;
}
</style>