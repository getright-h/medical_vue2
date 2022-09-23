<template>
  <el-dialog title="新增套餐类型" :visible.sync="IsAdd" :before-close="Cancel">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="类型名称" prop="type">
				<el-input v-model="ruleForm.type" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="所含套餐数">
				<el-input v-model="ruleForm.num" type="number" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="包含套餐">
				<p>{{ruleForm.combo}}</p>
			</el-form-item>
			<el-form-item label="描述" placeholder="请输入内容">
				<el-input type="textarea" v-model="ruleForm.text"></el-input>
			</el-form-item>
			<el-form-item label="状态">
				<el-switch v-model="ruleForm.status">
    			</el-switch>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="confirm">保存</el-button>
				<el-button @click="Cancel">取消</el-button>
			</el-form-item>
      </el-form>
    </el-dialog>
</template>

<script>
  export default {
    name:'Modify',
    props:['IsAdd'],
    data() {
      return {
        ruleForm: {
          type: '',	//类型名称
          num: 0,	//所含套餐数量
          combo: '',	//包含套餐
          text: '',	//描述
          status: '0',	//状态
          type: [],
          resource: '',
          desc: ''
        },
		formLabelWidth: '120px',
        rules: {
          type: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3,max:10, message: '长度在 3到10 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
          ]
        },
		value:[],
		boolValue:false,
      };
    },
    methods: {
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
			this.$emit('closeAdd')
		},
		// 发起请求
		confirm(){
			let obj={
				type:this.ruleForm.type,	//类型名称
				num:this.ruleForm.num,	//所含套餐数量
				combo:this.ruleForm.combo,	//包含套餐
				text:this.ruleForm.text,	//描述
				status:this.ruleForm.status,	//状态
			}
			console.log('obj',obj);
		}
    },
	computed:{
		newOptions(){
			let arr = JSON.stringify(this.Project);
			return JSON.parse(arr)
		}
	}
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
		width: 70%;
	}
	.el-textarea{
		width: 70%;
	}
</style>