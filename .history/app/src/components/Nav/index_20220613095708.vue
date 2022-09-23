<template>
  <el-col :span="12">
    <div class="logo">
      <img src="../../assets/images/logo.png" width="50px" height="50px" />
      <h5>九尾狐医院</h5>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened="true"
      :router="true"
    >
      <el-menu-item index="/home" v-if="jurisdiction">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <div v-if="jurisdiction">
        <el-submenu
          :index="item.index"
          v-for="(item, index) in navData"
          :key="index"
        >
          <template slot="title">
            <i class="el-icon-baseball"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="little.router"
              v-for="(little, index) in item.children"
              :key="index"
              >{{ little.name }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </div>

      <!-- <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-help"></i>
          <span>费用管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/outpatientConsumption"
            >门诊消费记录</el-menu-item
          >
          <el-menu-item index="/OutpatientRecharge">门诊充值记录</el-menu-item>
          <el-menu-item index="/hospitaLization">住院消费记录</el-menu-item>
          <el-menu-item index="/HospitalizationRecharge"
            >住院充值记录</el-menu-item
          >
          <el-menu-item index="/RefundHistory">退款记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-message-solid"></i>
          <span>医院信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/doctorManagement">医生管理</el-menu-item>
          <el-menu-item index="/departmentManagement">科室管理</el-menu-item>
          <el-menu-item index="/examinationPackage/physicalExamination"
            >体检套餐</el-menu-item
          >
          <el-menu-item index="/healthEncyclopedia">健康百科</el-menu-item>
          <el-menu-item index="/hospitalNavigation">医院导航</el-menu-item>
          <el-menu-item index="/hospitalProfile">医院简介</el-menu-item>
          <el-menu-item index="/appointmentNotice">预约须知</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/index">管理员管理</el-menu-item>
          <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/title">职称管理</el-menu-item>
          <el-menu-item index="/news">消息公告</el-menu-item>
          <el-menu-item index="/updatepw">修改密码</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      -->
      <el-submenu index="6" v-if="jurisdiction == false">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>用户预约</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user">预约</el-menu-item>
          <el-menu-item index="/booking">预约详情</el-menu-item>
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
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
  },
  data() {
    return {
      navData: [
        {
          name: "预约管理",
          index: "2",
          children: [
            {
              name: "预约挂号",
              router: "/bookregister",
            },
            {
              name: "预约核酸检测",
              router: "/booknat",
            },
            {
              name: "预约体检",
              router: "/bookmedical",
            },
            {
              name: "预约医生排班",
              router: "/doctorschedule",
            },
          ],
        },
        {
          name: "费用管理",
          index: "3",

          children: [
            {
              name: "门诊消费记录",
              router: "/outpatientConsumption",
            },
            {
              name: "门诊充值记录",
              router: "/OutpatientRecharge",
            },
            {
              name: "住院消费记录",
              router: "/hospitaLization",
            },
            {
              name: "住院充值记录",
              router: "/HospitalizationRecharge",
            },
            {
              name: "退款记录",
              router: "/RefundHistory",
            },
          ],
        },
        {
          name: "医院信息",
          index: "4",

          children: [
            {
              name: "医生管理",
              router: "/doctorManagement",
            },
            {
              name: "科室管理",
              router: "/departmentManagement",
            },
            {
              name: "体检套餐",
              router: "/examinationPackage/physicalExamination",
            },
            {
              name: "健康百科",
              router: "/healthEncyclopedia",
            },
            {
              name: "医院导航",
              router: "/hospitalNavigation",
            },
            {
              name: "医院简介",
              router: "/hospitalProfile",
            },
            {
              name: "预约须知",
              router: "/appointmentNotice",
            },
          ],
        },
        {
          name: "系统设置",
          index: "5",

          children: [
            {
              name: "管理员管理",
              router: "/index",
            },
            {
              name: "角色管理",
              router: "/role",
            },
            {
              name: "职称管理",
              router: "/title",
            },
            {
              name: "消息公告",
              router: "/news",
            },
            {
              name: "修改密码",
              router: "/updatepw",
            },
          ],
        },
        // {
        //   name: "用户预约",
        //   index: 6,
        //   children: [
        //     {
        //       name: "预约",
        //       router: "/user",
        //     },
        //     {
        //       name: "预约详情",
        //       router: "/booking",
        //     },
        //   ],
        // },
      ], //导航动态渲染
      jurisdiction: false, //权限
    };
  },
  methods: {
    trouble() {
      if (JSON.parse(localStorage.getItem("user")).type == 1) {
        this.jurisdiction = true;
      } else {
        this.jurisdiction = false;
      }
    },
  },
  mounted() {
    this.$bus.$on("isAdmin", () => {
      if (JSON.parse(localStorage.getItem("user")).type == 1) {
        this.jurisdiction = true;
      } else {
        this.jurisdiction = false;
      }
    });
    this.trouble();
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
  width: 160px;
  height: 60px;
  background-color: #b3c0d1;
  text-align: center;
  line-height: 60px;
  color: white;
}
.el-col-12 {
  width: 250px;
  height: 100vh;
  min-width: 250px;
}
.logo {
  position: relative;
  text-align: center;
  background-color: #b3c0d1;
  height: 60px;
}
.logo > img {
  display: inline-block;
  position: absolute;
  left: 30px;
}
.logo > h5 {
  position: absolute;
  top: 20px;
  left: 90px;
}
</style>