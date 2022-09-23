<template >
    <div id="box">
        <div id="box2" class="clear"> 
              <div id="box3">
                  <div id="Blue"></div>
                  <p id="world">职称管理</p>
              </div>
              <div id="boxBtn">
                   <el-button type="primary" plain >删除</el-button>
                   <el-button type="primary" @click="add">新增职称</el-button>
              </div>
        </div>
  <div id="box4">
    <input type="text" placeholder=" 请输入职称名称" id="input" v-model="iptv">
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
      label="职称名称"
      width="120">
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column
      prop="cost"
      label="默认挂号费（元）"
      width="140">
    </el-table-column>
    <el-table-column
      prop="describe"
      label="职称描述"
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
      prop="address"
      label="添加时间"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text"  class="el-icon-edit"></el-button>
        <el-button type="text"  class="el-icon-delete-solid"  @click="handle(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
     <AddTitle :showaddadim="showAddadim" v-model="showAddadim" @close="close" @Rersh="Rersh"></AddTitle>
     <updateTitle :showUpdate=" showUpdtae" @closeUpdate="closeUpdate" :updata=" updata" @upRsh="upRsh"></updateTitle>
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
import Pagination from '../../components/Pagination/index.vue'
import AddTitle from './addTitle/index.vue';
import updateTitle from './updateTitlr/index.vue'

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
            //权限编辑
             value:false,
              iptv:'',
              navInfo: [],
            pageNo: 1, //当前页
            pageSize: 2, //每一页多少条数据
            continues: 5, //分页器 下方连续页码,
            updata:{},//修改数据
            rowid:0,
            delid:0,//删除Id
           updateId:{
              id:0,
            status:0
           }
        };
    },
    methods: {
      han(row){
        this.updateId.id=row.id
        this.updateId.status=row.status
        this.UpStatus()
      },
      handle(row){
        console.log(row);
        this.delid=row.id
         this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.DelTitle()
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
        },
        handleClick(row) {
            console.log(row);
            this.updata=row
            this.rowid=row.id
            this.showUpdtae=true
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
       add() {
            this.showAddadim = true;
        },
        close(){
          this.showAddadim=false
        },
        closeUpdate(){
          this.showUpdtae=false
        }, //获取点击的页码
    getPageNo(pageNo) {
      this.pageNo = pageNo;
    },
    serch(){
      this.serchTitle()
    },
    del(){
     
    },
    //获取列表
    async getTitle(){
      let Role= await this.$API.reGetTitle()
    if(Role.code===200){
      console.log(Role);
      this.navInfo=Role.data
    }else{
      console.log('失败');
    }
    },
    //查询职称
    async serchTitle(){
      let res=await this.$API.reQueryTitle({name:this.iptv})
     this.navInfo=res.data
    },
    //删除职称
    async DelTitle(){
      let res=await this.$API.reDelTitle({id:this.delid})
      console.log('删除职称',res);
      if(res.code===200){
        this.getTitle()
      }else{
        alert('失败')
      }
     
    },
    //改变状态接口
    async UpStatus(){
      let res=await this.$API.reUpstatus(this.updateId)
      console.log('修改职称状态',res);
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
    Rersh(){
      this.showAddadim=false
      this.getTitle()
    },
    upRsh(){
       this.showUpdtae=false
      //  this.getTitle()
    }
       
    },
    components: {AddTitle,updateTitle,Pagination },
    mounted(){
      this.getTitle()
    },
    watch: {
       iptv(a,b){
        if(b===''||a===''){
          this.getTitle()
        }
      },
      
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
   background-color: rgb(0,110,255);
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
  .el-button--primary.is-plain{
    margin-left: 108px;
    margin-top: 0px;
    padding-top: 13px;
  }
  
  #input{
    width: 200px;
    height: 30px;
    border: 1px solid rgba(0, 110, 255, 0.185);
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