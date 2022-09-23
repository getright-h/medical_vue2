<template>
  <div id="register">
    <h1 id="yuy">注册账号</h1>

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idNumber">
        <el-input v-model.number="ruleForm.idNumber"></el-input>
      </el-form-item>
      <el-form-item prop="radio">
        <el-radio
          class="radio"
          prop="radio"
          @click.native.prevent="nbm(ruleForm.radio)"
          v-model="ruleForm.radio"
          label="1"
          >我已阅读并同意相关服务条款和隐私政策</el-radio
        >
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    let checkPhone = (rule, value, callback) => {                     //注意: 自定义验证函数是放在data里的
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        let reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      }
    };
	let cardIdNo = (rule, value, callback) => {            	//自定义验证身份证
      if (!value) {
        return callback(new Error('身份证号不能为空'));
      } else {
        let reg = /((^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$))/;
        if (!reg.test(value)) {
          callback(new Error('请输入正确的身份证号'));
        } else {
          callback();
        }
      }
    };
    let youname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入姓名"));
      } else {
        callback();
      }
    };
    let accountNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var radioNumber = (rule, value, callback) => {
      if (this.ruleForm.radio != "1") {
        callback(new Error("请先同意服务条款和隐私政策"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
		name:'',  		//姓名
		account: "",
		pass: "",
		checkPass: "",    //二次确认密码
		phone: "",		//电话
		idNumber:"",   //身份证号
		radio: [],
      },
      rules: {
		name: [{ required: true,validator: youname, trigger: "blur" }],
        account: [{required: true, validator: accountNumber, trigger: "blur" }],
        radio: [{ required: true,validator: radioNumber, trigger: "change" }],
        pass: [{ required: true,validator: validatePass, trigger: "blur" }],
        checkPass: [{required: true, validator: validatePass2, trigger: "blur" }],
        phone: [{ required: true, trigger: 'blur', validator: checkPhone }], 
        idNumber: [{required: true, trigger: 'blur', validator: cardIdNo}], 
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.registerzh();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //点击注册时发送请求
    async registerzh() {
		let lregister = {
			name:this.name,
			account:this.account,
			pwd:this.pass,
			phone:this.phone,
			
		}
      let registerlc = await this.$API.registered(lregister);
      if (registerlc.code == 200) {
        console.log(registerlc);
        this.$message({
          message: "注册成功",
          type: "success",
        });
      } else {
        this.$message.error("网络延迟，请稍后重试");
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    nbm(val) {
      if (val === "1") {
        this.ruleForm.radio = "0";
      } else {
        this.ruleForm.radio = "1";
      }
    },
  },
  computed: {},
};
</script>
<style lang="less" scope>
#register {
  width: 400px;
  margin: 0 auto;
}
#yuy {
  text-align: center;
  color: rgb(119, 161, 253);
  margin: 10px 0px;
}
// radio选中改为勾勾
.el-radio__input.is-checked .el-radio__inner::after {
  content: "";
  width: 10px;
  height: 5px;
  border: 2px solid white;
  border-top: transparent;
  border-right: transparent;
  text-align: center;
  display: inline-block;
  position: absolute;
  top: 2px;
  left: 2px;
  vertical-align: middle;
  transform: rotate(-45deg);
  border-radius: 0px;
  background: none;
}
</style>