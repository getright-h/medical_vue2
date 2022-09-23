<template>
    <el-dialog title="添加职称信息" :visible.sync="showaddadim" :before-close="onClose" >
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="职称名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="挂号费" prop="cost">
    <el-input-number v-model="ruleForm.cost" :min="0" ></el-input-number>
  </el-form-item>
  <el-form-item label="职称描述 " prop="describe">
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
          cost:0,
          describe:'',
          status:0

        },
        rules: {
          name: [
            { required: true, message: '请输入职称', trigger: 'blur' },
            
          ],
          cost: [
            { required: true, message: '请选择角色', trigger: 'blur' }
          ],
          describe: [
            { required: true, message: '输入职称描述', trigger: 'blur' }
          ],
         
        },
        value:false
            }
        },
        props:['showaddadim'],
         methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addTitle()
            this.$emit('Rersh')
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
      //添加接口
      async addTitle(){
        let title=await this.$API.reAddTitle(this.ruleForm)
       
        if(title.code===200){
           console.log('添加',title);
           this.$message({
          message: '添加成功',
          type: 'success'
        });
        }else{
          alert('添加失败')
        }
      }
    }
  }
</script>
<style>
</style>