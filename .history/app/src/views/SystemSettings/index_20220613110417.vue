<template >
    <div id="box">
        <div id="box2" class="clear"> 
              <div id="box3">
                  <div id="Blue"></div>
                  <p id="world">管理员管理</p>
              </div>
              <div id="boxBtn">
                   <el-button type="primary" plain  size="small">删除</el-button>
                   <el-button type="primary" @click="add">新增管理员</el-button>
              </div>
        </div>
  <div id="box4">
    <input type="text" placeholder="请输入账号" id="input" v-model="inputv">
    <el-button type="primary" size="mini" @click="serch">搜索</el-button>
     <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55"
      align="center">
    </el-table-column>
 
    <el-table-column
        prop="name"
      label="用户名"
      width="120">
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column
      prop="account"
      label="账号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号码"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="status"
      label="是否启用"
      show-overflow-tooltip>
      <template slot-scope="scope">
      <el-switch
    v-model="scope.row.status"
    active-color="#409EFF"
    inactive-color="#E4E7ED" :active-value=1
  :inactive-value=0 @change="han(scope.row)">
  </el-switch>
  </template>
    </el-table-column>
     <el-table-column
      prop="time"
      label="添加时间"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small" class="el-icon-edit"></el-button>
        <el-button type="text" size="small" class="el-icon-delete-solid" @click="handle(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
    
     <AddAdmin :showaddadim="showAddadim" v-model="showAddadim" @close="close" @Refresh="Refresh" :AddADim="AddADim"></addAdmin>
     <updateAdmin :showUpdate=" showUpdtae" @closeUpdate="closeUpdate" :updateMy="updateMy" :updateData="updateData" @RefreshUp="RefreshUp"></updateAdmin>
     <Pagination
        :pageNo="pageNo"
        :pageSize="pageSize"
        :total="navInfo.length"
        :continues="continues"
        :showData="navInfo"
        @getPageNo="getPageNo"
        @getFinishDate="getFinishDate"
      />
  </div>
 
</template>
<script>

import AddAdmin from './addAdmin/index.vue';
import updateAdmin from './updateAdmin/index.vue'
import Pagination from '../../components/Pagination/index.vue'
export default {
    name: "admin",
    data() {
        return {
            tableData: [],
            multipleSelection: [],
            value: true,
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            showAddadim: false,
            showUpdtae:false,
            value:'1',
       navInfo: [],
      pageNo: 1, //当前页
      pageSize: 5, //每一页多少条数据
      continues: 5, //分页器 下方连续页码,
      inputv:'',
      updateData:{},//修改传过来的数据
      rowid:0,
      delid:0,
      AddADim:[],//增加接口传过俩的数据
      updateId:{
              id:0,
            status:0
           },
        updateMy:[]
        };
    },
    methods: {
       han(row){
        this.updateId.id=row.id
        this.updateId.status=row.status
        this.UpStatus()
      },
        handle(row){
          this.delid=row.id
          this.DelAdim()
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            }
            else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // console.log( '-------------------------',this.multipleSelection);
        },
        handleClick(row) {
            console.log(row);
            this.showUpdtae=true
            this.rowid=row.id
            this.GoUpdate()
            this.updateData=row
           
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
       add() {
            this.showAddadim = true;
            this.GoAdd()
            
        },
        close(){
          this.showAddadim=false
        },
        closeUpdate(){
          this.showUpdtae=false
        },
        //获取点击的页码
    getPageNo(pageNo) {
      this.pageNo = pageNo;
    },
    serch(){
      this.serchAdim()
    },
    //删除数据接口
    delAdim(){
      
    },
    //获取列表接口
   async getAdim(){
       let result=await this.$API.reqGetAdim()
       console.log('result',result);
       if(result.code===200){
         this.navInfo=result.data
        //  console.log(result.data);
       }else{
         alert('失败')
       }
       
    },
    //查询管理员接口
    async serchAdim(){
      let result=await this.$API.reqserchAdim({name:this.inputv})
      this.navInfo=result.data
    },
    //进入修改页面
    async GoUpdate(){
      let result=await this.$API.reqGOupdataAdim({id:this.rowid})
      this.updateMy=result.data.roles
      console.log('进入修改页面传过来的',result);
    },
    //删除管理员接口
    async DelAdim(){
      let result=await this.$API.reqDelAdim({id:this.delid})
      console.log('删除接口',result);
      // this.getAdim()
    },
    //进入增加管理员接口
     async GoAdd(){
      let result=await this.$API.reGoAddAdim()
      console.log('进入增加页面接口',result);
      this.AddADim=result.data
      this.getAdim()
    },
    //修改管理员状态
    async UpStatus(){
      let res=await this.$API.reupdateAdimStatus(this.updateId)
      console.log('修改管理员状态',res);
      if(res.code===200){
        this.$message({
          message: '已修改',
          type: 'success'
        });
      }else{
         this.$message('修改状态失败');
      }
     
    },
    //获取分液器传过来的直接渲染的数据
    getFinishDate(finishDate) {
      this.tableData = finishDate;
    },
    changeShow() {
      this.dialogFormVisible = true;
    },
    changeUpShow() {
      this.dialogUpFormVisible = true;
    },
    changeUpValue(value) {
      this.dialogUpFormVisible = value;
    },
    changeValue(value) {
      this.dialogFormVisible = value;
    },
    //添加管理员后的刷新
    Refresh(){
      this.showAddadim=false
      // this.getAdim()
    },
       RefreshUp(){
         this.showUpdtae=false
          // this.getAdim()
       }
    },
    components: { AddAdmin,updateAdmin,Pagination},
    mounted(){
      this.getAdim()
    },
    watch: {
       inputv(a,b){
        if(b===''||a===''){
          this.getAdim()
        }
      }
    }
}

</script>
<style scoped lang="less">

#box{
  width: 100%;
  height: 100vh;
}
.clear{
  content: '';
  display: block;
  clear: both;
}
 #box2{
   width: 100%;
   height: 40px;
   /* border: 1px solid red; */
   margin-top: 0px;
   margin-bottom: 12px;
 }
 #box3{
   width: 500px;
   height: 40px;
   /* border: 1px solid red; */
   float: left;
 }
 #Blue{
   width: 30px;
   height: 10px;
   border-radius: 30%;
   background-color: rgb(64,158,255);
   float: left;
   margin-top: 10px;
 }
  #world{
    font-size: 25px;
    margin-left: 40px;
  }
  #boxBtn{
    width: 300px;
    height: 40px;
    float: right;
    /* border: 1px solid red; */
    
  }
  /* .el-button--primary{
    float: right;
  } */
  // #box2{
  //   /deep/ .el-button{
  //     margin-left: 108px;
  //     margin-top: 0px;
  //     padding-top: 13px;

  //   }
  // }
  .el-button--primary.is-plain{
    margin-left: 108px;
    margin-top: 0px;
    padding-top: 13px;
  }
  
  #input{
    width: 200px;
    height: 30px;
    border: 1px solid rgba(0, 110, 255, 0.11);
    outline:none;
    margin-right: 5px;
    margin-left: 20px;
    margin-top: 25px;
    margin-bottom: 20px;
  }
 #serch{
   width: 50px;
   height: 25px;
   background-color: rgb(0,110,255);
   color: white;
   border: 1px solid rgba(0, 0, 0, 0);
   margin-left: 8px ;
   border-radius: 3px;
 }

  #box4{
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
 .pagination[data-v-72233bcd]{
   margin-top: 10px;
 }
</style>