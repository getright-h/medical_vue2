<template>
  <el-dialog title="添加套餐信息" :visible.sync="IsAdd" :before-close="Cancel">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  	<el-form-item label="套餐ID" prop="comboId">
				<el-input v-model="ruleForm.comboId" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="套餐名称" prop="name">
				<el-input v-model="ruleForm.name" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="套餐图片" prop="region">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :auto-upload="false"
                    :show-file-list="false"					
					:on-change="handleChange"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
                    <img v-if="ruleForm.url" :src="ruleForm.url" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
			<el-form-item label="套餐类型" prop="typeName">
				<el-select v-model="ruleForm.typeName" placeholder="请选择套餐类型" style="width: 70%;">
					<el-option
						v-for="item in Type"
						:key="item.label"
						:label="item.label"
						:value="item.label">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="所属院区" prop="campus">
              <el-select v-model="ruleForm.campus" placeholder="请选择所属院区" style="width: 70%;">
				  	<el-option
						v-for="item in HospitalArea"
						:key="item.label"
						:label="item.label"
						:value="item.label">
					</el-option>
              </el-select>
			</el-form-item>
			<el-form-item label="套餐项目">
				<el-select
				v-model="ruleForm.items"
				multiple
				placeholder="请选择"
				style="width: 70%;"
				:popper-append-to-body="false"
				@remove-tag="removeTag">
					<el-option
						v-for="item in Project"
						:key="item.label"
						:label="item.label"
						:value="item.label">
						<el-checkbox v-model="item.check" @change="isChecked(item)">
							{{ item.label }}
						</el-checkbox>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="套餐价格" prop="money">
				<el-input v-model="ruleForm.money" type="number" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="套餐介绍" placeholder="请输入内容">
				<el-input type="textarea" v-model="ruleForm.text"></el-input>
			</el-form-item>
			<el-form-item label="注意事项" placeholder="请输入内容">
				<el-input type="textarea" v-model="ruleForm.attention"></el-input>
			</el-form-item>
			<el-form-item label="套餐状态">
				<el-switch 
				v-model="ruleForm.status"
				active-value="1"
				inactive-value="0">>
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
		  comboId: '',//套餐ID
		  id:0,//id
          name: '',		//套餐名
          url: '',		//套餐图片
          typeName: '',		//套餐类型
          campus: '',	//所属院区
          items: [],	//套餐项目
          money: 1400,		//项目价格
          text: '',		//项目介绍
          attention: '',//注意事项
		  status:'0', //套餐状态
        },
		Type: [{value: '选项1',label: '男性套餐'}, {value: '选项2',label: '女性套餐'}, {value: '选项3',label: '老年人套餐'},{value: '选项4',label: '入职套餐'}],	//所属院区
		HospitalArea: [{value: '选项1',label: '东院'}, {value: '选项2',label: '北院'}, {value: '选项3',label: '湖南院区'}],	//套餐项目
		Project: [{value: '选项1',label: '一般检查 ￥100.00',check:false}, {value: '选项2',label: '一般g检查 ￥101.00',check:false}, {value: '选项3',label: '一般s检查 ￥102.00',check:false}],	//套餐价格
		formLabelWidth: '120px',
        rules: {
          name: [
            { required: true, message: '请输入套餐名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 个字符以上', trigger: 'blur' }
          ],
          typeName: [
            { type: 'string', required: true,  message: '请选择套餐类型', trigger: 'change' }
          ],
          campus: [
            { type: 'string', required: true, message: '请选择所属院区', trigger: 'change' }
          ],
          items: [
            { type: 'string', required: true, message: '请至少选择一个套餐项目', trigger: 'change' }
          ],
          money: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          text: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
		  attention: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          desc: [
          ]
        },
		value:[],
		boolValue:false,
		file:null,	//装选中的文件
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
			if (item.check && this.ruleForm.items.indexOf(item.label) == -1) {
				this.ruleForm.items.push(item.label)
			}else if (!item.check) {
				this.ruleForm.items.forEach((elm, idx) => {
					console.log('elm, idx',elm, idx);
				if (elm == item.label) {
					this.ruleForm.items.splice(idx, 1)
				}
				})
			}
		},
		// 多选模式下移除tag时触发
		removeTag(label) {
			this.Project.forEach((elm, idx) => {
				if (elm.label == label) {
					console.log('Project elm',elm);
					elm.check = false
				}
			})
		},
		// 以下是和图片相关的函数 
            // 文件上传成功的回调函数
            handleAvatarSuccess(res, file) {
                // 上传成功的函数   这里面的方法都要移到下面去 这个函数不执行
                console.log('上传成功过后执行的函数',res);
                // this.imageUrl = URL.createObjectURL(file.raw);  //将文件转成url的方法 对url赋值路径
            },
        // 上传前，把自动上传功能给关了，所以这个函数不能用了 这里面的方法都要移到下面去 这个函数不执行
            beforeAvatarUpload(file) {
                console.log('上传前执行的函数',file);
             
            },
        // 文件状态被改变就执行
            handleChange(file, fileList) {  //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
				console.log('file',file);
                this.file = file.raw
                // 判断以下图片的类型和大小 下面时判断函数
                const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/jpg' || file.raw.type === 'image/png';
                const isLt2M = file.raw.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    // 如果图片不为以上格式，直接return
                    return this.$message.error('上传头像图片只能是jpeg pan JPG 格式!');
                }
                if (!isLt2M) {
                    // 如果不为这么大直接return
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                // return isJPG && isLt2M;
                // 首先把图片显示出来
                this.ruleForm.url = URL.createObjectURL(file.raw);  //将文件转成url的方法 对url赋值路径
				
            },
		// 发起请求
		async confirm(){
			let data = {
				comboId:this.ruleForm.comboId,//套餐ID
				id:this.ruleForm.id,//id
				name:this.ruleForm.name, //套餐名
				url:this.ruleForm.url, //套餐图片
				typeName:this.ruleForm.typeName, //套餐类型
				campus:this.ruleForm.campus, //所属院区
				items:this.ruleForm.items, //套餐项目
				money:this.ruleForm.money, //项目价格
				text:this.ruleForm.text, //项目介绍
				attention:this.ruleForm.attention, //注意事项
				status:this.ruleForm.status, //套餐状态
			}
			console.log('obj',data);
			let result= await this.$API.physicalExaminationAdd(data);
			if(result.code === 200){
				this.$message({
					message: '恭喜你，修改成功',
					type: 'success'
				});
				this.$emit('closeAdd')
			}else{
				this.$message.error('错了哦，添加失败');
				console.log(result);
			}
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
	.el-select{
		width: 60%;
	}
</style>