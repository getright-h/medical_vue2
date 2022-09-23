<template >
    <div id="box">
        <div id="box2" class="clear"> 
              <div id="box3">
                  <div id="Blue"></div>
                  <p id="world">角色管理</p>
              </div>
              <div id="boxBtn">
                   <el-button type="primary" plain size="small">删除</el-button>
                   <el-button type="primary" @click="add">新增角色</el-button>
              </div>
        </div>
  <div id="box4">
    <input type="text" placeholder=" 请输入角色名称" id="input" v-model="inputValue">
    <el-button type="primary" size="mini" @click="query">搜索</el-button>
     <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
 
    <el-table-column
       prop="name"
      label="角色名称"
      width="120">
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column
      prop="superior"
      label="角色管理人数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="describe"
      label="角色描述"
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
        <el-button @click="handleClick(scope.row)" type="text" size="small" class="el-icon-edit" ></el-button>
        <el-button type="text" size="small" class="el-icon-delete-solid" @click="handl(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
     <AddArole :showaddadim="showAddadim" v-model="showAddadim" @close="close" :quanxian="quanxian" @addRush="addRush" ></AddArole>
     <updateRole :showUpdate=" showUpdtae" @closeUpdate="closeUpdate" :updateData="updateData" :upMenus="upMenus" :quanxian2="quanxian2" @upRrsh="upRrsh"></updateRole>
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

import AddArole from './addRole/index.vue';
import updateRole from './UpdateRole/index.vue'
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
            //权限编辑
            value:false,
            inputValue:'',
            showrole:{},
            rowid:0,
             navInfo: [],
            pageNo: 1, //当前页
            pageSize: 2, //每一页多少条数据
            continues: 5, //分页器 下方连续页码,
            delid:0,
             updateId:{
              id:0,
            status:0,

           },
           quanxian:[],
           updateData:{},//修改的数据
            upMenus:{},//修改要用的权限
            quanxian2:[]
        };
    },
    methods: {
      han(row){
        this.updateId.id=row.id
        this.updateId.status=row.status
        this.UpStatus()
      },
      handl(row){
        this.delid=row.id
         this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delRole()
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
            this.showUpdtae=true
           this.rowid=row.id
           this.updateData=row
            this.gupdate()
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
       add() {
            this.showAddadim = true;
            this.Addrole()
            
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
   async getRole(){
     let Role= await this.$API.reGetRole()
    if(Role.code===200){
      console.log(Role);
      this.navInfo=Role.data
    }else{
      console.log('失败');
    }
    },
    query(){
      this.serch()
      
    },
    addRush(){
      this.showAddadim = false;
      this.getRole()
    },
    upRrsh(){
      this.showUpdtae=false
      // this.getRole()
    },

    //查询角色接口
    async serch(){
      let Role=await this.$API.reQueryRole({name:this.inputValue})
      console.log('角色查询',Role);
       this.navInfo=Role.data
    },
    //进入增加
    async Addrole(){
      let qiu=await this.$API.reGOAddRole()
      console.log('进去',qiu);
      
      if(qiu.code===200){
      this.quanxian=qiu.data
      this.quanxian2=qiu.data
      console.log('=====================',this.quanxian);
     }
    },
    //进入修改组件
    async gupdate(){
      let result=await this.$API.regupdateRole({id:this.rowid})
      console.log('修改页面要的数据',result);
      this.upMenus=result.data.menus
      this.quanxian2=result.menuVos
     
    },
    //删除接口
    async delRole(){
      let result=await this.$API.reDelRole({id:this.delid})
      console.log('删除接口',result);
      if(result.code===200){
         this.getRole()
      }else{
        this.$message.error('无法删除哟');
      }
     
     
    },
    //修改状态接口
    async UpStatus(){
      let result=await this.$API.reupdateRoleStatus({id:this.delid})
      console.log('修改角色状态接口',result);
      if(result.code===200){
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
       
    },
    components: {AddArole,updateRole,Pagination },
    mounted(){
      this.getRole()
    },
    watch: {
      inputValue(a,b){
        if(b===''||a===''){
          this.getRole()
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