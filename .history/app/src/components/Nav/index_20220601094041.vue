<template>
  <div>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>导航一</template
          >
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>费用管理</template
          >
          <router-link :to="{ name: 'OutpatientConsumption' }">
            <el-menu-item index="2-1">门诊消费记录</el-menu-item></router-link
          >
          <router-link :to="{ name: 'OutpatientRecharge' }">
            <el-menu-item index="2-2">门诊充值记录</el-menu-item></router-link
          >
          <router-link :to="{ name: 'HospitaLization' }">
            <el-menu-item index="2-3">住院消费记录</el-menu-item></router-link
          >
          <router-link :to="{ name: 'HospitalizationRecharge' }">
            <el-menu-item index="2-4">住院充值记录</el-menu-item></router-link
          >
          <div @click="toRefundHistory">
            <el-menu-item index="2-5">退款记录</el-menu-item>
          </div>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-setting"></i>导航三</template
          >
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1" @click="sys">选项1</el-menu-item>
            <el-menu-item index="3-2" @click="role">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3" @click="title">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1" @click="updatepw">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
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
  },
};
</script>

<style scoped>
.el-aside {
  height: 100vh;
  background-color: rgb(35, 35, 224) !important;
}
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
}
.foo1 {
  height: 100vh;
  background: rgb(243, 248, 255);
}
</style>