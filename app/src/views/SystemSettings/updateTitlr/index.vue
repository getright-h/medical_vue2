<template>
    <el-dialog title="更改职称信息" :visible.sync="showUpdate" :before-close="onClose" >
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="职称名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="挂号费" prop="cost">
    <el-input-number v-model="ruleForm.cost" :min="0"></el-input-number>
  </el-form-item>
 
  
  <el-form-item label="职称描述" prop="describe">
    <el-input v-model="ruleForm.describe"></el-input>
  </el-form-item>
   <el-form-item label="是否启用" prop="status">
   <el-switch
  v-model="ruleForm.status"
  active-color="#409EFF"
  inactive-color="#E4E7ED"
  :active-value=1
  :inactive-value=0>
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
          
        },
        rules: {
          name: [
            { required: true, message: '请输入内容', trigger: 'blur' },
            
          ],
         
          describe: [
            {  required: true, message: '请输入描述', trigger: 'blur' }
          ],
        
        },
        value:false
            }
        },
        props:['showUpdate', 'updata'],
         methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateRole()
            this.$emit('upRsh')
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
      //更改请求
      async updateRole(){
        let result=await this.$API.reupdateRole(this.ruleForm)
        console.log('添加职称',result);
        console.log('============================',this.ruleForm);
        if(result.code===200){
          this.$message({
          message: '添加成功',
          type: 'success'
        });
        }else{
           this.$message('添加失败');
        }
      }
    },
    updated () {
      this.ruleForm=this.updata
    }
  }
</script>
<style>
</style>