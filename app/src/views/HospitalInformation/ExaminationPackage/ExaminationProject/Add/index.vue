<template>
  <el-dialog title="新增项目信息" :visible.sync="IsAdd" :before-close="Cancel">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  	<el-form-item label="项目ID" prop="itemsId">
				<el-input v-model="ruleForm.itemsId" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="项目名称" prop="name">
				<el-input v-model="ruleForm.name" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="所属套餐">
				<el-select
				v-model="ruleForm.combo"
				multiple
				placeholder="请选择"
				style="width: 70%;"
				:popper-append-to-body="false"
				@remove-tag="removeTag">
					<el-option
						v-for="item in Package"
						:key="item.label"
						:label="item.label"
						:value="item.label">
						<el-checkbox v-model="item.check" @change="isChecked(item)">
							{{ item.label }}
						</el-checkbox>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="项目价格">
				<el-input v-model="ruleForm.money" type="number" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="项目介绍" placeholder="请输入内容">
				<el-input type="textarea" v-model="ruleForm.text"></el-input>
			</el-form-item>
			<el-form-item label="注意事项" placeholder="请输入内容">
				<el-input type="textarea" v-model="ruleForm.attention"></el-input>
			</el-form-item>
			<el-form-item label="套餐状态">
				<el-switch 
				v-model="ruleForm.status"
				active-value="1"
				inactive-value="0">
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
			itemsId:'',	//项目id
			name: '',	//项目名称
			combo: [],	//所属套餐
			money: 0,	//项目价格
			text: '',	//项目介绍
			attention:'',	//注意事项
			status: '0',	//套餐状态
			type: [],
			resource: '',
			desc: ''
        },
		Package: [{value: '选项1',label: '体检套餐1',check:false}, {value: '选项2',label: '体检套餐2',check:false}, {value: '选项3',label: '体检套餐3',check:false}],	//所属套餐
		formLabelWidth: '120px',
        rules: {
		itemsId: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 个字符以上', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 个字符以上', trigger: 'blur' }
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
		}
		,
		// 多选框触发
		isChecked(item) {
			if (item.check && this.ruleForm.combo.indexOf(item.label) == -1) {  //indexOf这里类似正则的查找，找到就返回下标，没有就返回-1，就可以Push			this.value.push(item.value)
				this.ruleForm.combo.push(item.label)
			} else if (!item.check) {
				this.ruleForm.combo.forEach((elm, idx) => {
				if (elm == item.label) {
					this.ruleForm.combo.splice(idx, 1)
				}
				})
			}
		},
		// 多选模式下移除tag时触发
		removeTag(label) {
			this.Package.forEach((elm, idx) => {
				if (elm.label == label) {
					console.log('Project elm',elm);
					elm.check = false
				}
			})
		},
		// 发起请求
		async confirm(){
			let data = {
			itemsId:this.ruleForm.itemsId,	//项目id
			name:this.ruleForm.name,	//项目名称
			combo:this.ruleForm.combo[0],	//所属套餐
			money:this.ruleForm.money,	//项目价格
			text:this.ruleForm.text,	//项目介绍
			attention:this.ruleForm.attention,	//注意事项
			status:this.ruleForm.status	//套餐状态
			}
			console.log('obj',data);

			let result= await this.$API.examinationProjectAdd(data);
			if(result.code === 200){
				this.$message({
					message: '恭喜你，修改成功',
					type: 'success'
				});

			}else{
				this.$message.error('错了哦，添加失败');
				console.log(result);
			}
			this.ruleForm.combo.splice(0,this.ruleForm.combo.length)
			console.log('this.ruleForm.combo.length',this.ruleForm.combo.length);
			this.$emit('closeAdd')
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