<template>
    <el-dialog title="添加管理员信息" :visible.sync="showaddadim" :before-close="onClose" >
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="name" >
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="账号" prop="account">
    <el-input v-model="ruleForm.account"></el-input>
  </el-form-item>
  <el-form-item label="选择角色" prop="roleName">
    <el-select v-model="ruleForm.roleName" placeholder="请选择角色">
      <el-option v-for="item in AddADim"
      :key="item.id"
      :label="item.name"
      :value="item.name"></el-option>
      <!-- <el-option label="护士" value="护士"></el-option>
       <el-option label="超级管理员" value="超级管理员"></el-option> -->
    </el-select>
  </el-form-item>
  <el-form-item label="手机号码" prop="phone">
    <el-input v-model="ruleForm.phone"></el-input>
  </el-form-item>
   <el-form-item label="是否启用" prop="status" >
   <el-switch
  v-model="ruleForm.status"
  active-color="#409EFF"
  inactive-color="#E4E7ED" :active-value="1"
  :inactive-value="0">
  
</el-switch>
  </el-form-item>
  

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')" >立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    
</el-dialog>
</template>
<script>
    export default {
        name:'addAdim',
        data () {
            return {
               ruleForm: {
          name: '',
          account:'',
          roleName:'',
          phone:'',
          status:'0',
        },
        rules: {
          name: [
            { required: true, message: '请输入内容', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          roleName: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
          account: [
            {  required: true, message: '请输入账号', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
          ],
          
        },
        value:false,
        data:{
          

        }
            }
        },
        props:['showaddadim','AddADim'],
         methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.addAdim()
            this.$emit('Refresh')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
       
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      onClose(){
          this.$emit('close')
      },
       async addAdim(){
       let result=await this.$API.reqAddAdim(this.ruleForm)
       if(result.code===200){
         console.log('添加成功');
         console.log(result);
       }else{
         console.log('请求失败');
       }
       
    },
    //把数据传给父组件
     
    },
    mounted(){
      
    }
  }
</script>
<style>
</style>