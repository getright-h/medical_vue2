<template>
    <el-dialog title="更改管理员信息" :visible.sync="showUpdate" :before-close="onClose" >
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="账号" prop="account">
    <el-input v-model="ruleForm.account"></el-input>
  </el-form-item>
  <el-form-item label="选择角色" prop="roleName">
    <el-select v-model="ruleForm.roleName" placeholder="请选择角色">
      <el-option v-for="item in updateMy"
      :key="item.id"
      :label="item.name"
      :value="item.name"></el-option>
      
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
    <el-button type="primary" @click="submitForm('ruleForm')" >确认更改</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    
</el-dialog>
</template>
<script>
    export default {
        name:'updateAdim',
        data () {
            return {
               ruleForm: {

               }
          
          
        ,
        rules: {
          name: [
            { required: true, message: '请输入内容', trigger: 'blur' },
           
          ],
           account: [
            { required: true, message: '请选择角色', trigger: 'blur' }
          ],
          roleName: [
            { required: true, message: '请选择日期', trigger: 'blur' }
          ],
          phone: [
            {  required: true, message: '请选择时间', trigger: 'blur' }
          ],
        
        },
        value:false
            }
        },
        props:['showUpdate','updateData','updateMy'],
         methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.update()
            this.$emit('RefreshUp')
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
          this.$emit('closeUpdate')
      },
      async update(){
        let res=await this.$API.reupdata(this.ruleForm)
        console.log('确认修改',res);
        if(res.code===200){
          this.$message({
          showClose: true,
          message: '修改成功'
        });
        }else{
          this.$message({
          showClose: true,
          message: '修改失败',
          type: 'warning'
        });
        }
      }
    },
  updated () {
     this.ruleForm=this.updateData
   }
  }
</script>
<style>
</style>