<template>
  <el-dialog title="修改医生信息" :visible.sync="IsModify" :before-close="Cancel">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="医生姓名" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="上传照片">
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
			<el-form-item label="所属院区" prop="campus">
				<p>{{ruleForm.campus}}</p>
			</el-form-item>
			<el-form-item label="所属科室" prop="department">
              <el-select v-model="ruleForm.department" @change="campusSkH" placeholder="请选择科室">
				  	<el-option
						v-for="item in Department"
						:key="item.label"
						:label="item.label"
						:value="item.label">
					</el-option>
              </el-select>
			</el-form-item>
			<el-form-item label="医生职称" prop="prof">
				<el-select v-model="ruleForm.prof" placeholder="请选择医生职称">
				  	<el-option
						v-for="item in Title"
						:key="item.label"
						:label="item.label"
						:value="item.label">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="医生标签">
				<el-select
				v-model="ruleForm.label"
				multiple
				placeholder="请选择"
				:popper-append-to-body="false"
				@remove-tag="removeTag">
					<el-option
						v-for="item in ModifyLabel"
						:key="item.label"
						:label="item.label"
						:value="item.label">
						<el-checkbox v-model="item.check" @change="isChecked(item)">
							{{ item.label }}
						</el-checkbox>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="挂号费" prop="money">
				<el-input v-model="ruleForm.money" type="number"></el-input>
			</el-form-item>
			<el-form-item label="诊察费" prop="money1">
				<el-input v-model="ruleForm.money1"></el-input>
			</el-form-item>
			<el-form-item label="医生简介">
				<el-input type="textarea" v-model="ruleForm.text"></el-input>
			</el-form-item>
			<el-form-item label="医生状态">
				<el-switch 
				v-model="ruleForm.state"
				active-value="1"
				inactive-value="0">
    			</el-switch>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="confirm">保存</el-button>
				<el-button @click="Cancel" type='button'>取消</el-button>
			</el-form-item>
      </el-form>
    </el-dialog>
</template>

<script>
  export default {
    name:'Modify',
    props:['IsModify','clickUpdateRow','pageNo'],
    data() {
      return {
        ruleForm: {
		  id:0,//医生id
          name: '',	//医生姓名
          url: '',	//照片
          campus: '',	//所属院区
          prof: '',	//医生职称
          department: '',	//所属科室
          label: [],	//医生标签
		  money:60,	//挂号费
		  money1:0,	// 诊察费
          text: '',	//医生简介
          state: '0',	//医生状态
        },
		HospitalArea: [{value: '选项1',label: '南院'}, {value: '选项2',label: '北院区'}, {value: '选项3',label: '湘南院区'}],	//所属院区
		// Department: [{value: '选项1',label: '内科'}, {value: '选项2',label: '外科'}],	//所属科室
		// Title: [{value: '选项1',label: '主任医师'}, {value: '选项2',label: '副主任医师'}, {value: '选项3',label: '主治医师'}],	//医生职称
		// ModifyLabel: [{value: '选项1',label: '肝功能',check:false}, {value: '选项2',label: '肾功能',check:false}, {value: '选项3',label: '心脑血管',check:false},{value: '选项4',label: '泌尿学科',check:false},{value: '选项5',label: '心脏病',check:false},],	//医生标签
		Department:[],//科室
		Title:[],//医生职称
		ModifyLabel:[],//标签
		campusSk:[],
		formLabelWidth: '120px',
        rules: {
			name: [
				{ required: true, message: '请输入医生名字', trigger: 'blur' },
				{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			],
			campus: [
				{ required: true, message: '请选择院区', trigger: 'change' }
			],
			prof: [
				{ required: true, message: '请选择医生职称', trigger: 'change' }
			],
			department: [
				{ required: true, message: '请选择所属科室', trigger: 'change' }
			],
			money: [
				{ required: true, message: '请输入价格', trigger: 'blur' },
				{ min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
			],
			money1: [
				{ required: true, message: '请输入价格', trigger: 'blur' },
				{ min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
			],
			desc: [
			]
        },
		value:[],
		boolValue:false,
		file:null,	//装选中的文件
		pagePo:0,//页码
      };
    },
	watch:{
		clickUpdateRow(v1,v2){	//用监听属性可以监听改变前与改版后的值，可以拿到props里的值
			this.ruleForm.id = v1.id //医生id
			this.ruleForm.name = v1.name	//医生姓名
			this.ruleForm.url = v1.url		//照片
			this.ruleForm.campus = v1.campus	//所属院区
			this.ruleForm.prof = v1.prof	//医生职称
			this.ruleForm.department = v1.department //所属科室
			this.ruleForm.label = v1.label	//医生标签
			this.ruleForm.money=v1.money	//挂号费
		  	this.ruleForm.money1=v1.money1	// 诊察费
			this.ruleForm.introduction = v1.introduction	//医生简介
		},
		pageNo(v1,v2){
			this.pagePo = v1
		}
	},
    methods: {
		// 发送请求获取所有医院导航数据
		async getData(){	//调用这个函数的时候在这里传参数可以用形参接受
			// 
			// 科室下拉列表
			let resultDept = await this.$API.doctorManagementModifyDept()
			let Dept=resultDept.data
			this.campusSk=Dept
			for(let i=0;i<Dept.length;i++){
				this.Department.push({label:''})
				this.Department[i].label = Dept[i].department
			}
			if(resultDept.code==200){
			}
			// 医生职称
			let resultDProf = await this.$API.doctorManagementModifyProf()
			let Prof=resultDProf.data
			for(let i=0;i<Prof.length;i++){
				this.Title.push({label:''})
				this.Title[i].label = Prof[i]
			}
			// label标签
			let resultLbe = await this.$API.doctorManagementModifyLabel()
			let woKa=resultLbe.data
			for(let i=0;i<woKa.length;i++){
				this.ModifyLabel.push({label:''})
				this.ModifyLabel[i].label = woKa[i]
			}
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 隐藏弹框
		Cancel(){
			// 改变父组件的属性
			// 调用父组件的方法
			this.$emit('close',this.pagePo)
		},
		async confirm(){
			if(this.file){
				let data2=new FormData()
				data2.append('url',this.file)  //文件信息
				let resultUrl= await this.$API.doctorManagementAddUrl(data2);
				if(resultUrl.code==200){
					let data = {
						id:this.ruleForm.id, //医生id
						name: this.ruleForm.name,	//医生姓名
						url: resultUrl.data,	//照片
						campus: this.ruleForm.campus,	//所属院区
						prof: this.ruleForm.prof,	//医生职称
						department: this.ruleForm.department,	//所属科室
						label: this.ruleForm.label,	//医生标签
						money:this.ruleForm.money,	//挂号费
						money1:this.ruleForm.money1,	// 诊察费
						text: this.ruleForm.text,	//医生简介
						state: this.ruleForm.state,	//医生状态
					}
					// console.log('data',data);
					if(this.ruleForm.name&&this.ruleForm.prof&&this.ruleForm.department&&this.ruleForm.label&&this.ruleForm.money&&this.ruleForm.money1&&this.ruleForm.text&&this.ruleForm.state){
						let result= await this.$API.doctorManagementModify(data);
						if(result.code === 200){
							this.$message({
								message: '恭喜你，修改成功',
								type: 'success'
							});
							this.Cancel()
							this.$emit('getData')
						}else{
							this.$message.error('错了哦，修改失败');
							console.log(result);
							
						}
					}else{
						this.$message.error('请填写完整哦！');
					}
				}else{
					console.log('resultUrl',resultUrl);
				}
			}else{
					this.$message.error('别忘记添加图片哦！');
			}
			

		},
		// 多选框触发
		isChecked(item) {
			if (item.check && this.ruleForm.label.indexOf(item.label) == -1) {	//indexOf这里类似正则的查找，找到就返回下标，没有就返回-1，就可以Push
				this.ruleForm.label.push(item.label)	//把选中的push进去
			}else if (!item.check) {
				this.ruleForm.label.forEach((elm, idx) => {	//forEach遍历输入框内的，有的就删除
					if (elm == item.label) {	//当标签相等的时候删除
						this.ruleForm.label.splice(idx, 1)	//当选项框取消时删除输入框里的数据
					}
			})
		}
		},
		// 多选模式下移除tag时触发
		removeTag(label) {
			this.options.forEach((elm, idx) => {
				if (elm.label == label) {
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
		campusSkH(){//给上面的院区赋值
			for(let i=0;i<this.campusSk.length;i++){
				if(this.ruleForm.department == this.campusSk[i].department){
					this.ruleForm.campus = this.campusSk[i].campus
				}
			}
		}		
    },
	computed:{
		newOptions(){
			let arr = JSON.stringify(this.ModifyLabel);
			return JSON.parse(arr)
		}
	},
	mounted(){
		this.getData()
			
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
		width: 60%;
	}
	.el-textarea{
		width: 60%;
	}
</style>