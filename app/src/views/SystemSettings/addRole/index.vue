<template>
<el-dialog title="添加角色信息" :visible.sync="showaddadim" :before-close="onClose" >
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="角色名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="角色描述" prop="describe">
    <el-input v-model="ruleForm.describe"></el-input>
  </el-form-item>
   <el-form-item label="是否启用" prop="status">
   <el-switch
  v-model="ruleForm.status"
  active-color="#409EFF"
  inactive-color="#E4E7ED"
  :active-value="1"
  :inactive-value="0">
</el-switch>

  </el-form-item>
  <el-form-item label="角色名称" prop="name">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="ruleForm.menus" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in quanxian" :label="city.id" :key="city.id" :value="city.name">{{city.name}}</el-checkbox>
        </el-checkbox-group>
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
         describe: '',
         status: '',
        menus: [],
        
        },
        
        rules: {
          name: [
            { required: true, message: '请输入内容', trigger: 'blur' },
           
          ],
          describe: [
            { required: true, message: '请输入描述', trigger: 'blur' }
          ],
         
        },
        value:false,
        //权限编辑
            checkAll: false,
           
            // cities: cityOptions,
            isIndeterminate: true
            }
            
        },
        props:['showaddadim','quanxian'],
         methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.add()
            this.$emit('addRush')
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
      //权限编辑
         handleCheckAllChange(val) {
           this.ruleForm.menus = val ? this.quanxian: [];
           let foo = []
           this.ruleForm.menus.forEach((element,index) => {
             foo.push(element.id)
           });
          this.ruleForm.menus=foo
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value;
        // console.log(value);
        this.checkAll = checkedCount === this.cities;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities;
      },
      //增加接口
      async add(){
        let res=await this.$API.reAddRole(this.ruleForm)
        console.log(res);
      }
      
    },

   
  }
</script>
<style>
</style>