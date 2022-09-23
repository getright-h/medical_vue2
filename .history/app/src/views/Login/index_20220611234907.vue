<template class='main1'>
  <el-row class="main" :style="{ height: height }">
    <img src="../../assets/bgz.png" alt="" class="img1" />
    <img src="../../assets/bgy.png" alt="" class="img2" />
    <el-col>
      <div class="login">
        <h1>登录</h1>
        <h3>四组医疗服务后台管理系统</h3>
        <span>账号：</span
        ><el-input
          v-model="name"
          placeholder="请输入账号"
          style="margin-top: 50px; margin-bottom: 20px; width: 80%"
        ></el-input>
        <br />
        <span> 密码：</span
        ><el-input
          v-model="password"
          type="password"
          placeholder="请输入密码"
          style="width: 80%; margin-bottom: 20px"
          show-password
          required
        ></el-input>
        <br />
        <span style="margin-left: 60%; color: #fff; font-size: 14px"
          >忘记密码请联系管理员</span
        >
        <el-button
          type="warning"
          style="width: 80%; margin-top: 30px; margin-left: 40px"
          @click="logins"
          >登录</el-button
        >
        <!-- <el-button
          type="warning"
          style="width: 80%; margin-top: 10px; margin-left: 40px"
          @click="register"
          >注册</el-button
        > -->
        <div class="chat">
          <i class="el-icon-chat-round"></i>
          <img src="../../assets/chat.jpg" alt="" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
      height: "",
      Logregister: [], //这个是登陆者的信息
    };
  },
  mounted() {
    this.$bus.$emit("updateToken");
  },
  methods: {
    //点击登录时发送请求
    async login() {
      let users = { account: this.name, pwd: this.password };
      let loginl = await this.$API.registerl(users);
      console.log(loginl.data);
      if (loginl.code === 200) {
        this.Logregister = loginl.data;
        this.$message({
          message: "登录成功",
          type: "success",
        });
        localStorage.setItem("user", JSON.stringify(loginl.user));
        setTimeout(() => {
          this.$bus.$emit('isAdmin')
        }, 100);
        this.$router.push("/home");
      } else {
        this.$message.error("账号或密码错误");
      }
    },
    register() {
      this.$router.push("/register");
    },
    logins() {
      this.login();
    },
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f9f9f9;height:100%");
    this.height = window.innerHeight + "px";
    window.onresize = () => {
      this.height = window.innerHeight + "px";
    };
  },
};
</script>


<style lang="less" scoped>
.main {
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
  min-width: 1400px;
  min-height: 800px;
}
.img1 {
  height: 600px;
  width: 200px;
  position: absolute;
  top: 20%;
  left: 20%;
}
.img2 {
  height: 600px;
  width: 350px;
  position: absolute;
  top: 20%;
  right: 10%;
}
.login {
  box-shadow: 0 0 10px 5px #006eff56;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: 28%;
  background-color: #006eff;
  color: #fff;
  height: 50%;
  padding-top: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  h1 {
    font-size: 40px;
    font-weight: 650;
  }
  span {
    color: black;
  }
}
.chat {
  height: 60px;
  width: 60px;
  border: 1px solid #333;
  border-radius: 50%;
  line-height: 60px;
  text-align: center;
  background-color: #333;
  position: fixed;
  right: 50px;
  bottom: 50px;
  font-size: 25px;
  img {
    height: 160px;
    width: 160px;
    position: absolute;
    right: 60px;
    bottom: 20px;
    display: none;
  }
}
.chat:hover img {
  display: block;
}
</style>
