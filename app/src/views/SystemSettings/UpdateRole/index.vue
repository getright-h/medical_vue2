<template>
    <el-dialog title="更改角色信息" :visible.sync="showUpdate" :before-close="onClose" >
  <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="角色名称">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="角色描述" >
    <el-input v-model="ruleForm.describe"></el-input>
  </el-form-item>
   <el-form-item label="是否启用" >
   <el-switch
  v-model="ruleForm.status"
  active-color="#409EFF"
  inactive-color="#E4E7ED"
  :active-value="1"
  :inactive-value="0">
</el-switch>
  </el-form-item>
  <el-form-item label="角色名称" >
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" disabled>全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="data.menus" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in quanxian2" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
        </el-checkbox-group>
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
        
        value:false,
        //权限编辑
          checkAll: false,
          data:{
            name:'',
            menus:[],
            describe:'',
            status:''
          },
            isIndeterminate: true
            }
        },
        props:['showUpdate','updateData','upMenus','quanxian2'],
         methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.update()
            this.$emit('upRrsh')
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
       //权限编辑
         handleCheckAllChange(val) {
        this.ruleForm.menus = val ? this.quanxian2 : [];
        let foo = []
           this.ruleForm.menus.forEach((element,index) => {
             foo.push(element.id)
           });
          this.ruleForm.menus=foo
        this.isIndeterminate = false;

      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value;
        this.checkAll = checkedCount === this.cities;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities;
      },
      async update(){
        let res=await this.$API.reqROle(this.data)
        console.log('修改成功',res);
      }
    },
    updated () {
     this.ruleForm=this.updateData
     this.data.name=this.ruleForm.name
     this.data.status=this.ruleForm.status
     this.data.describe=this.ruleForm.describe
   }
  }
</script>
<style>
</style>