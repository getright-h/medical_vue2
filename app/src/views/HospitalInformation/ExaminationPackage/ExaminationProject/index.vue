<template>
	<div id="student">
		<div id="student_div1">
			<div>
				<div></div>
				<p>体检项目管理</p>
			</div>
			<div>
				<el-button type="primary" plain @click="openDel">删除</el-button>
				<el-button type="primary" @click="AddDisplay">新增套餐信息</el-button>
			</div>
		</div>
		<div id="student_div2">
            <div>
                <ul>
                    <li @click="JumpPackage">体检套餐</li>
                    <li>体检项目</li>
                    <li @click="JumpType">套餐类型</li>
                </ul>
            </div>
			<div class="header">
				<el-input size="small" v-model="name" style="width:16vw;margin-left:0vw;" placeholder="请输入套餐名称"></el-input>
				<el-button size="small" type="primary" @click="searchCli">搜索</el-button>
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
					type="selection"
					width="55">
				</el-table-column>
				<el-table-column
					prop="itemsId"
					label="项目ID"
					width="120">
				</el-table-column>
				<el-table-column
					prop="name"
					label="项目名称"
					header-align="center"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="money"
					label="项目价格（元）"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="combo"
					label="所属套餐"
					show-overflow-tooltip>
				</el-table-column>
                <el-table-column
					prop="text"
					label="项目介绍"
					show-overflow-tooltip>
				</el-table-column>
                <el-table-column
					prop="attention"
					label="注意事项"
					show-overflow-tooltip>
				</el-table-column>
                <el-table-column
					prop="status"
					label="项目状态"		
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
				// value: '糖尿病',
				profile:'消化系统的疾病的治疗，擅长肝胆疾病的治疗;消化系统的疾病的治疗，擅长肝胆疾...',
				// tableData:[ //渲染数据存储地址
                //     {itemsId:'MNOP001',name:'内科检查',money:100.00,combo:'老年人套餐A',text:'1.血压。2咽喉部检查:咽部有无充血，扁桃体有无肿大。3.双肺检查:呼吸音是否正常，有无干湿性啰...',attention:'准备空腹',status:'0',operation:''},
				// ],
				tableData:[],//渲染数据存储地址
				IsModify:false,	//修改子组件 studentUpdate 是否显示的组件	//要传给子组件就要加自定义属性了
				IsAdd:false,
				boolValue:true,
				clickUpdateRow:{},	//给修改子组件传装的值，通过row接受的
				name:'',
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
			// 发送请求获取所有体检项目数据
			async getData(){
				let result = await this.$API.examinationProject()
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
			// 页面内的跳转
			JumpPackage(){	//跳转到体验套餐
				this.$router.push('/ExaminationPackage/PhysicalExamination')
			},
			JumpType(){	//跳转到套餐类型
				this.$router.push('/ExaminationPackage/ExaminationType')
			},
			open(row) {
				
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data = {
						attention:row.attention, //注意事项
						combo:row.combo,	//所属套餐
						itemsId:row.itemsId,//项目ID
						money:row.money,//	项目价格
						name:row.name,//项目名
						status:row.status,//项目状态
						text:row.text,//项目介绍
					}
					let woKao = async() =>{
						let result = await this.$API.examinationProjectDell(data)
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
			// 上面的删除请求
			openDel(){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data ={}
					let woKao = async() =>{
						console.log('data',data);
						let result = await this.$API.examinationProjectDell(data)
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
						data = {
							attention:this.id[i].attention, //注意事项
							combo:this.id[i].combo,	//所属套餐
							itemsId:this.id[i].itemsId,//项目ID
							money:this.id[i].money,//	项目价格
							name:this.id[i].name,//项目名
							status:this.id[i].status,//项目状态
							text:this.id[i].text,//项目介绍
						}
						// data = this.id[i]
						woKao()
						console.log('data没空',data);
						data = {}
						console.log('data空',data);
					}
					// woKao()
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
						name:this.name,
						itemsId:this.itemsId
					}
					console.log(data);
					let result = await this.$API.examinationProjectSearch(data)
					if(result.code === 200){
						this.$message({
							type: 'success',
							message: '搜索成功!'
						});
						console.log('result.data',result.data);
						this.tableData = result.data
						this.name = ''
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
		margin-left: 26%;
		font-size: 19px;
		color: rgb(64,158,255);
	}
	.el-icon-delete-solid{
		display: block;
		float: right;
		margin-right: 26%;
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
    #student_div2>div:nth-of-type(1)>ul>li:nth-of-type(2){
        border-bottom: 3px solid rgb(0,110,255);
    }
	/* 分页 */
	#Paging{
		margin: 2%;
	}
</style>