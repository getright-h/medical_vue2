<template>
<div id="box">
        <div id="box2" class="clear"> 
              <div id="box3">
                  <div id="Blue"></div>
                  <p id="world">修改密码</p>
              </div>
        </div>
  <div id="box4">
      <div id="update"><p>修改密码</p></div>
      <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="新密码" prop="pass">
       <el-col :span="8">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-col>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
      <el-col :span="8">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</div>
    </div>
   
  </div>
</template>
<script>
     export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        },
         value:false,
         
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updatePw()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async updatePw(){
         let str=JSON.parse(localStorage.getItem('user'))
        let data1={
          id:str.id,
          pwd:this.ruleForm.checkPass
         }
        let res=await this.$API.reUpPw(data1)
          if(res.code===200){
             this.$message({
          message: '修改成功',
          type: 'success'
        });
          }else{
            this.$message.error('修改失败');
          }
      }
    },
   watch: {
      
   },
   mounted () {
   
        
   }
  }
</script>
<style scoped lang="less">
    #box{
      width: 100%;
      height: 100vh;
    }
.clear{
  content: '';
  display: block;
  clear: both;
}
 #box2{
   width: 100%;
   height: 40px;
   /* border: 1px solid red; */
   margin-top: 0px;
   margin-bottom: 12px;
 }
 #box3{
   width: 500px;
   height: 40px;
   /* border: 1px solid red; */
   float: left;
 }
 #Blue{
   width: 30px;
   height: 10px;
   border-radius: 30%;
   background-color: rgb(64,158,255);;
   float: left;
   margin-top: 10px;
 }
  #world{
    font-size: 25px;
    margin-left: 40px;
  }
  
  /* .el-button--primary{
    float: right;
  } */
 
  #box4{
      width: 100%;
      height: 100%;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    
  }
    #update{
        width: 100%;
        height: 40px;
        background-color: rgb(242,242,242);
        color: rgb(25,124,254);
        font-size: 12px;
    }
     #update>p{
         line-height: 40px;
     }
</style>