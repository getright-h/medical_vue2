<template>
	<div id="student">
		<div id="student_div1">
			<div>
				<div></div>
				<p>套餐类型管理</p>
			</div>
			<div>
				<!-- <el-button type="primary" @click="AddDisplay">新增套餐类型</el-button> -->
			</div>
		</div>
		<div id="student_div2">
            <div>
                <ul>
                    <li @click="JumpPackage">体检套餐</li>
                    <li @click="JumpProject">体检项目</li>
                    <li>套餐类型</li>
                </ul>
            </div>
			<div class="header">
			</div>
			<el-table
				ref="multipleTable"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 96%;margin-top:1vw;margin-left:1.5vw;"
				:cell-style="{'text-align':'center'}" 
            	:header-cell-style="{'text-align':'center'}"
				@selection-change="handleSelectionChange">
				<el-table-column
					width="30px">
				</el-table-column>
				<el-table-column
					prop="typeName"
					label="套餐名称"
					width="120">
				</el-table-column>
				<el-table-column
					prop="num"
					label="套餐数量"
					header-align="center"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="combo"
					label="包含套餐"
					show-overflow-tooltip>
				</el-table-column>
                <el-table-column
					prop="status"
					label="状态"
					show-overflow-tooltip>
					<template slot-scope="scope">
						<el-switch 
						v-model="scope.row.status"
						active-value="1"
						inactive-value="0"
						@change="changeAutograph(scope.row.status)">
						</el-switch>
					</template>
                   
				</el-table-column>
				<!-- <el-table-column
					label="操作"
					show-overflow-tooltip>
					<template slot-scope="scope">
						<i @click="update(scope.row)" id="el-icon-edit" class="el-icon-edit"></i>
						<i @click="open" class="el-icon-delete-solid"></i>
					</template>
					
				</el-table-column> -->
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
				// value: '糖尿病',
				profile:'消化系统的疾病的治疗，擅长肝胆疾病的治疗;消化系统的疾病的治疗，擅长肝胆疾...',
				tableData:[ //渲染数据存储地址
                    {type:'老年人套餐',num:4,combo:'老年人基础套餐A，老年人基础套餐B,三高人群定期检查',status:'0',operation:''},
				],
				tableData:[],//渲染数据存储地址
				IsModify:false,	//修改子组件 studentUpdate 是否显示的组件	//要传给子组件就要加自定义属性了
				IsAdd:false,
				clickUpdateRow:{},	//给修改子组件传装的值，通过row接受的
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
			async getData(){
				let result = await this.$API.examinationType()
				console.log(result);
				if(result.code === 200){
					this.navInfo = result.data
				}
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
				this.multipleSelection = val;
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
			},
			// 弹添加弹框出来
			AddDisplay(){
				this.IsAdd = true
			},
			// 让添加弹框关闭
			AddClose(){
				this.IsAdd = false
			},
			// 页面内的跳转
			JumpPackage(){	//跳转到体检套餐
				this.$router.push('/ExaminationPackage/PhysicalExamination')
			},
			JumpProject(){	//跳转到体检项目
				this.$router.push('/ExaminationPackage/ExaminationProject')
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
		margin-left: 37%;
		font-size: 19px;
		color: rgb(64,158,255);
	}
	.el-icon-delete-solid{
		display: block;
		float: right;
		margin-right: 37%;
		font-size: 19px;
		color: rgb(64,158,255);
	}
	#label{
		width: 66px;
		border: 1px solid rgb(204,204,204);
		border-radius: 50px;
		margin: 0 auto;
	}
	#student_div2>div:nth-of-type(1){
        width: 96%;
        height: calc(80vw * 100 / 1920);
        border-bottom: 1px solid rgb(242,242,242);
        margin:0 auto;
    }

    #student_div2>div:nth-of-type(1)>ul{
        float: left;
    }
    #student_div2>div:nth-of-type(1)>ul>li{
        width: 7vw;
        /* background-color: aqua; */
        text-align: center;
        list-style: none;
        float: left;
        font-size: calc(22vw * 100 / 1920);
        margin-right: 0.5vw;
        line-height: calc(80vw * 100 / 1920);;
    }
    #student_div2>div:nth-of-type(1)>ul>li:hover{
        color: rgb(0,110,255);
        cursor:pointer;
    }
    #student_div2>div:nth-of-type(1)>ul>li:nth-of-type(3){
        border-bottom: 3px solid rgb(0,110,255);
    }
		/* 分页 */
	#Paging{
		margin: 2%;
	}
</style>