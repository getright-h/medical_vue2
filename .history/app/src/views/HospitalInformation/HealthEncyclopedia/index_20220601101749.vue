<template>
	<div id="student">
		<div id="student_div1">
			<div>
				<div></div>
				<p>健康百科</p>
			</div>
			<div>
				<el-button type="primary" plain @click="open">删除</el-button>
				<el-button type="primary" @click="AddDisplay">新增文章</el-button>
			</div>
		</div>
		<div id="student_div2">

			<div class="header">
				<el-input size="small" style="margin-left:-0vw;" placeholder="请输入医生姓名搜索"></el-input>
				<el-button size="small" type="primary">搜索</el-button>
			</div>
			<el-table
				ref="multipleTable"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 100%"
				:cell-style="{'text-align':'center'}" 
            	:header-cell-style="{'text-align':'center'}"
				@selection-change="handleSelectionChange">
				<el-table-column
					type="selection"
					width="55">
				</el-table-column>
				<el-table-column
					prop="Title"
					label="文章标题"
					width="120">
				</el-table-column>
				<el-table-column
					prop="img"
					label="缩略图"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="Author"
					label="作者"
					header-align="center"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="Time"
					label="操作时间"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					label="操作"
					show-overflow-tooltip>
					<template slot-scope="scope">
						<i @click="update(scope.row)" id="el-icon-edit" class="el-icon-edit"></i>
						<i @click="open" class="el-icon-delete-solid"></i>
					</template>
					
				</el-table-column>
			</el-table>
		</div>
		<!-- 修改 -->
		<Mol :IsModify="IsModify" @close="closeUpdate"/>
		<!-- 添加 -->
		<Add :IsAdd="IsAdd" @closeAdd="AddClose"/>
	</div>
</template>
<script>
	// import Mol from './Modify'	//修改
	// import Add from './Add'	//添加
	export default{
		data() {
			return{
				options: [{value: '选项1',label: '内科'}, {value: '选项2',label: '外科'}],
				value: '糖尿病',
				profile:'消化系统的疾病的治疗，擅长肝胆疾病的治疗;消化系统的疾病的治疗，擅长肝胆疾...',
				tableData:[
					{Title:'文章标题',img:'图片地址',Author:'王敏',Time:'2020/09/08 10:06',operation:'修改，删除'},
					{Title:'文章标题',img:'图片地址',Author:'王敏',Time:'2020/09/08 10:06',operation:'修改，删除'},
					{Title:'文章标题',img:'图片地址',Author:'王敏',Time:'2020/09/08 10:06',operation:'修改，删除'},
					{Title:'文章标题',img:'图片地址',Author:'王敏',Time:'2020/09/08 10:06',operation:'修改，删除'},
					{Title:'文章标题',img:'图片地址',Author:'王敏',Time:'2020/09/08 10:06',operation:'修改，删除'},
					{Title:'文章标题',img:'图片地址',Author:'王敏',Time:'2020/09/08 10:06',operation:'修改，删除'},
					{Title:'文章标题',img:'图片地址',Author:'王敏',Time:'2020/09/08 10:06',operation:'修改，删除'},

				],
				IsModify:false,	//修改子组件 studentUpdate 是否显示的组件	//要传给子组件就要加自定义属性了
				IsAdd:false,
			}
		},
		components:{
			Mol,
			Add,
		},
		methods: {
		
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
				this.multipleSelection = val;
				console.log(val);
			},
			// 弹修改框出来
			update(row){
				this.IsModify = true
			},
			// 让弹框关闭的函数	给子组件传参
			closeUpdate(){
				this.IsModify = false
			},
			// 弹添加弹框出来
			AddDisplay(){
				this.IsAdd = true
			},
			// 让添加弹框关闭
			AddClose(){
				this.IsAdd = false
			},
			open() {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
			this.$message({
				type: 'success',
				message: '删除成功!'
			});
			}).catch(() => {
			this.$message({
				type: 'info',
				message: '已取消删除'
			});          
			});
		}
		}
	}
</script>

<style scoped>
	#student{
		width: 85.4%;
		position: absolute;
		top: 60px;
		background-color: white;
		border: none;
		/* border: 1px solid red; */
	}
	#student>div:nth-of-type(1){
		height: 16%;
		margin-bottom: 7%;
		margin-top: 2%;
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
		width: 16%;
		height: 10%;
		float: left;
	}
	#student_div1>div:nth-of-type(1)>p{
		font-size: 2vw;
		float: left;
	}
	#student_div1>div:nth-of-type(1)>div{
		height: 8px;
		width: 23px;
		background-color: rgb(64,158,255);
		border: none;
		border-radius: 50px 50px 50px 50px;
		float: left;
		margin:1vw;
		margin-left: 0;
	}
	#student_div1>div:nth-of-type(2){
		float: right;
	}

	.header{
		margin-top: 1.5vw;
		margin-left: 1.5vw;
	}
	#student_div2>div:nth-of-type(2){
		width: 70vw;
		margin-left: 1.5vw;
	}
	.header>div:nth-of-type(2)>input{
		width: 100px;
	}
	.header>button:nth-of-type(1){
		margin-left: 10px;
	}
	.header>button:nth-of-type(2){
		float: left;
		margin-left: 10px;
	}
	.header>button:nth-of-type(3){
		float: left;
		margin-left: 10px;
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
		margin-left: 36%;
		font-size: 1.2vw;
		color: rgb(64,158,255);
	}
	.el-icon-delete-solid{
		display: block;
		float: right;
		margin-right: 36%;
		font-size: 1.2vw;
		color: rgb(64,158,255);
	}
	#label{
		width: 46%;
		border: 1px solid rgb(204,204,204);
		border-radius: 50px;
		margin: 0 auto;
	}
	.el-icon-plus{
		width: 10px;
	}
</style>