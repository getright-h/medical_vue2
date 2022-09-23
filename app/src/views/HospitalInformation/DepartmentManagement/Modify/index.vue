<template>
  <el-dialog title="编辑科室信息" :visible.sync="IsModify" :before-close="Cancel">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="科室名称" prop="name" placeholder="请输入内容">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="所属院区" prop="campus">
				<el-select v-model="ruleForm.campus" placeholder="请选择院区" style="width: 40%;">
					<el-option
						v-for="item in HospitalArea"
						:key="item.label"
						:label="item.label"
						:value="item.label">
						
					</el-option>
					
				</el-select>
				<span id="posItk">一级科室无需选择</span>
			</el-form-item>
			<el-form-item label="上级科室" prop="name2">
              <el-select v-model="ruleForm.name2" placeholder="请选择科室"  style="width: 40%;">
				  	<el-option
						v-for="item in Department"
						:key="item.label"
						:label="item.label"
						:value="item.label">
					</el-option>
              </el-select>
			</el-form-item>
			<el-form-item label="科室位置" prop="address" placeholder="请输入内容">
				<el-input v-model="ruleForm.address"></el-input>
			</el-form-item>
			<el-form-item label="科室状态">
				<el-switch 
				v-model="ruleForm.status"
				active-value="1"
				inactive-value="0">
    			</el-switch>
			</el-form-item>
			<el-form-item>
				<el-button @click="confirm" type="primary">保存</el-button>
				<el-button @click="Cancel">取消</el-button>
			</el-form-item>
      </el-form>
    </el-dialog>
</template>

<script>
  export default {
    name:'Modify',
    props:['IsModify','clickUpdateRow'],
    data() {
      return {
        ruleForm: {
          name: '',	//科室名字
          campus: '',	//所属院区
          address: '',	//科室地址
          time: '',		//创建时间
          status: '0',	//状态
		  name2: '',
        },
		HospitalArea: [{value: '选项1',label: '东院'}, {value: '选项2',label: '南院'}, {value: '选项3',label: '湘南院区'}],	//所属院区
		Department: [{value: '选项1',label: '内科'}, {value: '选项2',label: '外科'}],	//所属科室
		formLabelWidth: '120px',
        rules: {
			name: [
				{ required: true, message: '请输入内容', trigger: 'blur' },
				{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			],
			campus: [
				{ required: true, message: '请选择所属院区', trigger: 'change' }
			],
			address: [
				{ required: true, message: '请选择科室地址', trigger: 'change' }
			],
		  	name2: [
            	{ required: true, message: '请选择上级科室', trigger: 'change' }
          	],
        },
		value:[],
		boolValue:false,
      };
    },
	watch:{
				// 注入从父组件拿到的哪一行的数据
		clickUpdateRow(v1,v2){
			console.log('v1',v1);	
			this.ruleForm.name = v1.name	//科室名字
			this.ruleForm.campus = v1.campus	//所属院区
			this.ruleForm.address = v1.address	//科室地址
			this.ruleForm.time = v1.time	//创建时间
			this.ruleForm.status = v1.status//状态
		},
	},
    methods: {
		// 饿了么自带
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
			if (valid) {
				alert('submit!');
			} else {
				console.log('error submit!!');
				return false;
			}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		Cancel(){
			// 改变父组件的属性
			// 调用父组件的方法
			this.$emit('close')
		},
		// 发起请求的参数
		async confirm(){
			console.log('this.ruleForm',this.ruleForm);
			let data = {
				name:this.ruleForm.name,//科室名字
				campus:this.ruleForm.campus,//所属院区
				address:this.ruleForm.address,////科室地址
				time:this.ruleForm.time,//当前时间
				status:this.ruleForm.status	//状态
			}
			console.log('data',data);
			let result= await this.$API.departmentManagementModify(data);
			if(result.code === 200){
				this.$message({
					message: '恭喜你，修改成功',
					type: 'success'
				});
				
			}else{
				this.$message.error('错了哦，添加失败');
				console.log(result);
			}
			this.$emit('close')
		}
    },
  }
</script>

<style scoped>
	 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  	.el-input{
		width: 40%;
	}
	.el-textarea{
		width: 70%;
	}
	#posItk{
		width: 30%;
		height: 30%;
		position: absolute;
		top: 65px;
		left: 380px;
		color: rgb(223,215,215);
	}
</style>