<template>
	<div id="student">
		<div id="student_div1">
			<div>
				<div></div>
				<p>科室管理</p>
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
				<el-select size="small" style="width:12vw;margin-left:0vw;" v-model="options.value" placeholder="请选择科室" >
					<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
				<el-input size="small" style="width:16vw;margin-left:1vw;" placeholder="请输入科室搜索"></el-input>
				<el-button size="small" type="primary">搜索</el-button>
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
					label="科室名字"
					width="120">
				</el-table-column>
				<el-table-column
					prop="campus"
					label="院区"
					header-align="center"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="address"
					label="楼号与楼层"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="time"
					label="时间"
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
		<Mol :IsModify="IsModify" @close="closeUpdate" :clickUpdateRow="clickUpdateRow"/>
        <!-- <Mol :IsModify="IsModify"/> -->
		<!-- 添加 -->
		<Add :IsAdd="IsAdd" @closeAdd="AddClose"/>
	</div>
</template>
<script>
	import Mol from './Modify'	//修改
	import Add from './Add'	//添加
	export default{
		data() {
			return{
				id:[],	//装上面删除需要的这一行的数据
				options: [{value: '选项1',label: '内科'}, {value: '选项2',label: '外科'}],
				// options:[],
				// value: '糖尿病',
				profile:'消化系统的疾病的治疗，擅长肝胆疾病的治疗;消化系统的疾病的治疗，擅长肝胆疾...',
				// tableData:[ //渲染数据存储地址
                //     {name:'内科-肾内科',campus:'东院',address:'1号楼三楼',time:'2019-09-09 10:09',operation:'修改，删除'},
				// ],
				tableData:[], //渲染数据存储地址
				IsModify:false,	//修改子组件 studentUpdate 是否显示的组件	//要传给子组件就要加自定义属性了
				IsAdd:false,
				clickUpdateRow:{},	//接受row的数据并且传给修改子组件
				navInfo: [], //传给子组件用于分页处理的原始数据
				pageNo: 1, //当前页
				pageSize: 3, //每一页多少条数据
				continues: 5, //分页器 下方连续页码
			}
		},
		components:{
			Mol,
			Add,
		},
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
			// 发送请求获取所有医院导航数据
			async getData(){
				let result = await this.$API.departmentManagement()
				console.log(result);
				if(result.code === 200){
					this.navInfo = result.data
				}
				// 科室下拉列表
				// let results1 = await this.$API.doctorManagements1()
				// let s1=results1.data
				// for(let i=0;i<s1.length;i++){
				// 	this.options.push({label:''})
				// 	this.options[i].label = s1[i]
				// }
			},
			toggleSelection(rows) {
				if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
				} else {
				this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.id = val;
				console.log(val);
			},
			// 弹修改框出来
			update(row){
				console.log('row',row);
				this.clickUpdateRow = row
				this.IsModify = true
			},
			// 让弹框关闭的函数	给子组件传参
			closeUpdate(){
				this.IsModify = false
				this.getData()
			},
			// 弹添加弹框出来
			AddDisplay(){
				this.IsAdd = true
			},
			// 让添加弹框关闭
			AddClose(){
				this.IsAdd = false
				this.getData()
			},
			// 表内删除
			open(row) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let data ={
					address:row.address,
					campus:row.campus,
					name:row.name,
					status:row.status,
					time:row.time
				}
				console.log('data',data);
				let woKao = async() =>{
					// console.log('data',data);
					let result = await this.$API.departmentManagementDell(data)
					if(result.code === 200){
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getData()
					}else{
							
						this.$message.error('错了哦，删除失败');
						console.log(result.code);
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
			// 表上面删除,批量删除
			openDel(){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data ={}
					let woKao = async() =>{
						// console.log('data',data);
						let result = await this.$API.departmentManagementDell(data)
						if(result.code === 200){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getData()
						}else{
							
							this.$message.error('错了哦，删除失败');
							console.log(result.code);
						}
					}
					for(let i=0;i<this.id.length;i++){
						data = this.id[i]
						woKao()
						console.log('data没空',data);
						data = {}
						console.log('data空',data);
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
			async searchCli(){
				if(this.Department!=''){
					let data = {
						department:this.Department,
						name:this.search,
					}
					console.log(data);
					let result = await this.$API.doctorManagementSearch(data)
					if(result.code === 200){
						this.$message({
							type: 'success',
							message: '搜索成功!'
						});
						console.log('result.data',result.data);
						this.tableData = result.data
						this.search = ''
					}
					
				}else{
					this.$message('请选择科室');
				}
				
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
		margin-left: 38%;
		font-size: 19px;
		color: rgb(64,158,255);
	}
	.el-icon-delete-solid{
		display: block;
		float: right;
		margin-right: 38%;
		font-size: 19px;
		color: rgb(64,158,255);
	}
	#label{
		width: 66px;
		border: 1px solid rgb(204,204,204);
		border-radius: 50px;
		margin: 0 auto;
	}
	/* 分页 */
	#Paging{
		margin: 2%;
	}
</style>