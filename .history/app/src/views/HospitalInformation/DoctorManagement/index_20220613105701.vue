<template>

	<div id="student" >
		<div id="student_div1">
			<div>
				<div></div>
				<p>医生管理</p>
				
			</div>
			<div>
				<el-button type="primary" plain>导入</el-button>
				<el-button type="primary" plain>导出</el-button>
				<el-button type="primary" plain @click="openDel">删除</el-button>
				<el-button type="primary" @click="AddDisplay">新增医生信息</el-button>
			</div>
		</div>
		<div id="student_div2">

			<div class="header">
				<el-select size="small" @change="DeLbe" v-model="Department" placeholder="请选择科室" style="width:12vw;margin-left:0vw;">
					<el-option
					v-for="item in options"
					:key="item.label"
					:label="item.label"
					:value="item.label">
					</el-option>
				</el-select>
				<el-input size="small" v-model="search" style="width:16vw;margin-left:1vw;" placeholder="请输入医生姓名搜索"></el-input>
				<el-button size="small" type="primary" @click="searchCli">搜索</el-button>
				<el-button size="small" type="primary" @click="ResetO">重置</el-button>
			</div>
			<el-table
				ref="multipleTable"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 96.5%;margin-top:1vw;"
				:cell-style="{'text-align':'center'}" 
            	:header-cell-style="{'text-align':'center'}"
				@selection-change="handleSelectionChange">
				<el-table-column
					type="selection"
					width="55">
				</el-table-column>
				<el-table-column
					prop="name"
					label="医生姓名"
					width="120">
				</el-table-column>
				<el-table-column
					label="医生头像"
					width="120">
					<!-- 这里的图片地址会导致报错 -->
					<!-- 这里的图片地址会导致报错 -->
					<!-- 这里的图片地址会导致报错 -->

					<template slot-scope="scope">
						<img class="imgSize" :src="scope.row.url" alt="">
					<!-- <template>	
						<img class="imgSize" src="../../../../public/dog(1).png" alt=""> -->
					</template>
				</el-table-column>
				<el-table-column
					prop="campus"
					label="院区"
					header-align="center"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="prof"
					label="职称"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="department"
					label="科室"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="label"
					label="标签"
					show-overflow-tooltip>
					<template slot-scope="scope">
						<p class="label" v-for="(item,i) in scope.row.label" :key="i">{{item}}</p>
					</template>
				</el-table-column>
				<el-table-column
					prop="text"
					label="医生简介"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					label="操作"
					show-overflow-tooltip>
					<template slot-scope="scope">
						<i @click="update(scope.row)" id="el-icon-edit" class="el-icon-edit"></i>
						<i @click="open(scope.row)" class="el-icon-delete-solid"></i>
					</template>
					
				</el-table-column>
			</el-table>
			<Pagination
				id="Paging"
				:pageNo="pageNo"
				:pageSize="pageSize"
				:total="navInfo.length"
				:continues="continues"
				:showData="navInfo"
				@getPageNo="getPageNo"
				@getFinishDate="getFinishDate"
      		/>
		</div>
		
		<!-- 修改 -->
		<Mol :IsModify="IsModify" @close="closeUpdate" @getData="getData" :clickUpdateRow="clickUpdateRow" :pageNo="pageNo"/>
		<!-- 添加 -->
		<Add :IsAdd="IsAdd" @closeAdd="AddClose" @getData="getData"/>
	</div>
</template>
<script>
	import Mol from './Modify'	//修改-
	import Add from './Add'	//添加
	export default{
		data() {
			return{
				id:[],	//装上面删除需要的这一行的数据
				// options: [{value: '选项1',label: '内科'}, {value: '选项2',label: '外科'}],
				options:[],
				value: [],
				profile:'消化系统的疾病的治疗，擅长肝胆疾病的治疗;消化系统的疾病的治疗，擅长肝胆疾...',
				tableData:[],	//装所有从服务端获取的数据
				tableDataCun:[],//装服务器数据让下拉列表调用
				IsModify:false,	//修改子组件 studentUpdate 是否显示的组件	//要传给子组件就要加自定义属性了
				IsAdd:false,
				clickUpdateRow:[], //给修改弹框发送row数据，让修改弹框直接能获取到这边这行的数据
				DepartmentLabel:'',	//科室下拉表
				search:'',	//搜索功能中的put框
				Department:'',	//科室下拉表
				navInfo: [], //传给子组件用于分页处理的原始数据
				pageNo: 1, //当前页
				pageSize: 5, //每一页多少条数据
				continues: 5, //分页器 下方连续页码
			}
		},
		components:{
			Mol,
			Add,
		},
		watch:{
		}
		,
		methods: {
			//自定义事件获取当前是多少页
			getPageNo(pageNo) { //括号里面接受子组件传过来的当前页码数
			this.pageNo = pageNo; //把子组件传过来的值赋给当前页码
			},

			//获取分液器传过来的直接渲染的数据
			getFinishDate(finishDate) { 
			this.tableData = finishDate;  
			},
			// 发送请求获取所有医院导航数据
			async getData(pagePo){	//调用这个函数的时候在这里传参数可以用形参接受
				
				let result = await this.$API.doctorManagement()
				if(result.code === 200){
					this.navInfo = result.data
					this.tableDataCun = result.data
				}
				// 科室下拉列表
				let results1 = await this.$API.doctorManagements1()
				let s1=results1.data
				for(let i=0;i<s1.length;i++){
					this.options.push({label:''})
					this.options[i].label = s1[i]
				}
			},
			// 获取下拉框数据渲染下面的列表
			DeLbe(){
				
				// let tableDataXua=this.tableDataCun
				this.navInfo=[];
				for(let i=0;i<this.tableDataCun.length;i++ ){
					if(this.Department == this.tableDataCun[i].department){
						this.navInfo.push(this.tableDataCun[i])
					}else{

					}
				}
				if(this.navInfo.length == 0){
						// this.getData()
				}
				this.search=''
			},
			// toggleSelection(rows) {
			// 	if (rows) {
			// 	rows.forEach(row => {
			// 		this.$refs.multipleTable.toggleRowSelection(row);
			// 	});
			// 	} else {
			// 	this.$refs.multipleTable.clearSelection();
			// 	}
			// },
			handleSelectionChange(val) {	//获取选中的每一行
				this.id = val;
			},
			// 弹修改框出来
			async update(row){
				let data={
					id:row.id,//医生id
					name: row.name,	//医生姓名
					url: row.url,	//照片
					campus: row.campus,	//所属院区
					prof: row.prof,	//医生职称
					department: row.department,	//所属科室
					label: row.label,	//医生标签
					registration:row.registration,	//挂号费
					examination:row.examination,	// 诊察费
					text: row.text,	//医生简介
					state: row.state,	//医生状态
				}
				let result= await this.$API.doctorManagementQMfy(data);
				if(result.code === 200){
					this.clickUpdateRow = result.data
					this.IsModify = true
				}else{
					this.$message.error('错了哦，添加失败');
				}
					// this.clickUpdateRow = row
				},
			// 让弹框关闭的函数	给子组件传参
			closeUpdate(pagePo){	//子组件传递的参数this.$emit('close',this.pagePo) 这里用形参接受
				this.IsModify = false
				// this.pageNo=pagePo//
			},
			// 弹添加弹框出来
			AddDisplay(){
				this.IsAdd = true
			},
			// 让添加弹框关闭
			AddClose(){
				this.IsAdd = false
				
			},
			// 表里面删除的请求
			open(row) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arrLabel = []
					let woKao = async() =>{
						const {campus,department,label,money,money1,name,prof,text,url,id} = row
						// arrLabel.push(label)
						let data = {
							campus,
							department,
							label:arrLabel,
							money,
							money1,
							name,
							prof,
							text,
							url,
							id
						}
						let result = await this.$API.doctorManagementDel(data)
						if(result.code === 200){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getData()
						}else{
							
							this.$message.error('错了哦，删除失败');
						}
					}
					woKao()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},
			// 上面的删除请求
			openDel(){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data ={}
					let woKao = async() =>{
						let result = await this.$API.doctorManagementDel(data)
						if(result.code === 200){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getData()
						}else{
							
							this.$message.error('错了哦，删除失败');
						}
					}
					for(let i=0;i<this.id.length;i++){
						data = this.id[i]
						woKao()
						data = {}
					}
					woKao()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},
			// 搜索功能
			searchCli(){
				this.navInfo=[]
				if(this.Department!=''){
					for(let i=0;i<this.tableDataCun.length;i++){
						// if(this.search == this.tableDataCun[i].name){
						if((this.tableDataCun[i].name).match(this.search) && this.Department == this.tableDataCun[i].department){
							this.navInfo.push(this.tableDataCun[i])
						}
					}
					
				}else{
					this.$message('请选择科室');
				}
				
			},
			// 重置功能
			ResetO(){
				this.navInfo=this.tableDataCun
				this.Department=''
				this.search=''
			}
		},
		mounted(){
			this.getData()
			
		}
	}
</script>

<style scoped>
	#student{
		border: 1px solid rgb(243,248,254);
	}
	#student>div:nth-of-type(1){
		height: 16%;
		margin: 0;
		margin-bottom: calc(80vw * 100 / 1920);
		
		border: none;
		/* background-color: rgb(243,248,255); */
	}
	#student>div:nth-of-type(2){
		height: 100%;
		background-color: white;
		border: 1px solid white;
		border-radius: 13px;
		box-shadow:0px 0px 10px #c3c3c3;
	}
	#student_div1>div:nth-of-type(1){
		/* width: 16%; */
		height: 10%;
		float: left;
	}
	#student_div1>div:nth-of-type(1)>p{
		font-size: calc(36vw * 100 / 1920);
		float: left;
	}
	#student_div1>div:nth-of-type(1)>div{
		height: calc(12vw * 100 / 1920);
		width: calc(36vw * 100 / 1920);
		background-color: rgb(64,158,255);
		border: none;
		border-radius: 50px;
		float: left;
		margin:1vw;
		margin-left: 0;
	}
	#student_div1>div:nth-of-type(2)>button{
		margin-top: 0;
		padding: calc(10vw * 100 / 1920) calc(15vw * 100 / 1920) ;
		font-size: calc(19vw * 100 / 1920);
	}
	#student_div1>div:nth-of-type(2){
		float: right;
	}
	#student_div1>div:nth-of-type(2)>button{
		margin-left: 1vw;
	}

	.header{
		margin-top: 1.5vw;
		margin-left: 1.5vw;
	}
	#student_div2>div:nth-of-type(2){
		/* width: 70vw; */
		margin-left: 1.5vw;
	}
	.header>div:nth-of-type(2)>input{
		width: 100px;
	}
	.header>button{
		margin-left: 1vw;
	}
	.el-main[data-v-fae5bece]{
		line-height: 30px;
	}
	.el-input{
		margin-left: 10px;
		width: 16%;
	}
	.el-card__body, .el-main{
		padding: 0;
	}
	#el-icon-edit{
		float: left;
		display: block;
		margin-left: 30%;
		font-size: 19px;
		color: rgb(64,158,255);
	}
	.el-icon-delete-solid{
		display: block;
		float: right;
		margin-right: 30%;
		font-size: 19px;
		color: rgb(64,158,255);
	}
	.label{
		display: inline-block;
		width: 66px;
		border: 1px solid rgb(204,204,204);
		border-radius: 50px;
		margin: 0 auto;
	}
	.imgSize{
		width: calc(30vw * 100 / 1920);
		height: calc(30vw * 100 / 1920);
	}
	/* 分页 */
	#Paging{
		margin: 2%;
	}
</style>