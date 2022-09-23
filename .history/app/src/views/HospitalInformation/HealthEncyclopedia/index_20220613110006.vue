<template>
<div>
<div id="student">
    <div id="student_div1">
      <div>
        <div></div>
        <p>健康百科</p>
      </div>
      <div>
        <!-- <el-button type="primary" plain @click="open">删除</el-button> -->
        <el-button type="primary" @click="AddDisplay">新增文章</el-button>
      </div>
    </div>
    <div id="student_div2">
      <div class="header">
        <el-input
          size="small"
          style="width: 16vw; margin-left: 0vw"
          v-model="article"
          placeholder="请输入文章标题搜索"
        ></el-input>
        <el-button size="small" type="primary" @click="search">搜索</el-button>
        <el-button size="small" type="primary" @click="reset">重置</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 96.5%; margin-top: 1vw"
        :cell-style="{ 'text-align': 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="title" label="文章标题" width="120">
        </el-table-column>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="text" label="文章内容" width="120">
        </el-table-column>
        <!-- <el-table-column  label="缩略图" show-overflow-tooltip>
          <template slot-scope="scope">
          <img :src="scope.row.url" alt="" srcset="" style="width:50px;height:50px">
          </template>
        </el-table-column> -->
        <el-table-column
          prop="author"
          label="作者"
          header-align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="time" label="操作时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <i
              @click="update(scope.row)"         
              id="el-icon-edit"
              class="el-icon-edit"
            ></i>
            <i @click="open(scope.row)" class="el-icon-delete-solid"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 修改 -->
    <Mol
      :IsModify="IsModify"
      @close="closeUpdate"
      :clickUpdateRow="clickUpdateRow"
    />
    <!-- 添加 -->
    <Add :IsAdd="IsAdd" @closeAdd="AddClose" />
    
  </div>
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
import Mol from "./Modify"; //修改
import Add from "./Add"; //添加
export default {
  data() {
    return {
      article:"",      //搜索框里的值
      options: [
        { value: "选项1", label: "内科" },
        { value: "选项2", label: "外科" },
      ],
      value: "糖尿病",
      profile:
        "消化系统的疾病的治疗，擅长肝胆疾病的治疗;消化系统的疾病的治疗，擅长肝胆疾...",
      tableData: [
        // {title:'文章标题',url:'图片地址',author:'王敏',time:'2020/09/08 10:06',operation:'修改，删除'},
      ], //装数据的
      IsModify: false, //修改子组件 studentUpdate 是否显示的组件	//要传给子组件就要加自定义属性了
      IsAdd: false,
      clickUpdateRow: {}, //给修改子组件传装的值，通过row接受的
      clickdelete: {}, //给删除子组件传装的值，通过row接受的
	    navInfo: [], //传给子组件用于分页处理的原始数据
      pageNo: 1, //当前页
      pageSize: 5, //每一页多少条数据
      continues: 5, //分页器 下方连续页码
    };
  },
  components: {
    Mol,
    Add,
  },
  methods: {
    //自定义事件获取当前是多少页
    getPageNo(pageNo) {
      this.pageNo = pageNo;
    },

    //获取分液器传过来的直接渲染的数据
    getFinishDate(finishDate) {
      this.tableData = finishDate;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(val);
    },
    // 弹修改框出来
    update(row) {
      // console.log("row", row);
      this.clickUpdateRow = row;
      this.IsModify = true;
    },
    // 让弹框关闭的函数	给子组件传参
    closeUpdate() {
      this.IsModify = false;
      this.jkencyclopedia();
    },
    // 弹添加弹框出来
    AddDisplay() {
      this.IsAdd = true;
    },
    // 让添加弹框关闭
    AddClose() {
      this.IsAdd = false;
      this.jkencyclopedia();
    },
    open(row) {
      // console.log('row',row);
      this.clickdelete = row;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // console.log(scope.row);
          this.bkdelete();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
	//点击重置
    reset(){
      this.article = ""
      this.jkencyclopedia();
    },
    //点击搜索时发起请求
    search(){
      // console.log(this.article);
      
      this.bkSearch()
    },
    //点击搜索数据发送
    async bkSearch() {
      let obj = {title:this.article}
      console.log(obj);
      let loginl = await this.$API.cxencyclopedia(obj);
      console.log(loginl);
      this.article = ""
      if (loginl.code === 200) {
        this.navInfo = loginl.data;
        
        if(this.navInfo.length == 0){
          this.$message.error("暂无该文章");
        }else{
            this.$message({
            type: "success",
            message: "查询成功!",
          });
        }
      } else {
        this.$message.error("网络延迟");
      }
    },
    //请求数据发送
    async jkencyclopedia() {
      let loginl = await this.$API.yybkencyclopedia();
      // console.log(loginl);
      if (loginl.code === 200) {
        this.navInfo = loginl.data;
      } else {
        this.$message.error("网络问题，请稍后重试");
      }
    },
    //删除数据发送
    async bkdelete() {
      let obj = {
        title: this.clickdelete.title, //文章标题
        url: this.clickdelete.url, //上传缩略图
        author: this.clickdelete.author, //作者
        text: this.clickdelete.text, //文章内容
        status: this.clickdelete.status, //状态
        time: this.clickdelete.time, //上传时间
      };
      // console.log("obj", obj);
      let loginl = await this.$API.deleteencyclopedia(obj);
      // console.log(loginl);
      if (loginl.code === 200) {
        this.jkencyclopedia();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      } else {
        this.$message.error("网络问题，请稍后重试");
      }
    },
    
  },
  mounted() {
    this.jkencyclopedia();
  },
};
</script>

<style scoped>
#student {
  border: 1px solid rgb(243, 248, 254);
}
#student > div:nth-of-type(1) {
  height: 16%;
  margin: 0;
  margin-bottom: calc(80vw * 100 / 1920);

  border: none;
  /* background-color: rgb(243,248,255); */
}
#student > div:nth-of-type(2) {
  background-color: white;
  border: 1px solid white;
  border-radius: 13px;
  box-shadow: 0px 0px 10px #c3c3c3;
}
#student_div1 > div:nth-of-type(1) {
  /* width: 16%; */
  height: 10%;
  float: left;
}
#student_div1 > div:nth-of-type(1) > p {
  font-size: calc(36vw * 100 / 1920);
  float: left;
}
#student_div1 > div:nth-of-type(1) > div {
  height: calc(12vw * 100 / 1920);
  width: calc(36vw * 100 / 1920);
  background-color: rgb(64, 158, 255);
  border: none;
  border-radius: 50px;
  float: left;
  margin: 1vw;
  margin-left: 0;
}
#student_div1 > div:nth-of-type(2) > button {
  margin-top: 0;
  padding: calc(10vw * 100 / 1920) calc(15vw * 100 / 1920);
  font-size: calc(19vw * 100 / 1920);
}
#student_div1 > div:nth-of-type(2) {
  float: right;
}
#student_div1 > div:nth-of-type(2) > button {
  margin-left: 1vw;
}

.header {
  margin-top: 1.5vw;
  margin-left: 1.5vw;
}
#student_div2 > div:nth-of-type(2) {
  /* width: 70vw; */
  margin-left: 1.5vw;
}
.header > div:nth-of-type(2) > input {
  width: 100px;
}
.header > button {
  margin-left: 1vw;
}
.el-main[data-v-fae5bece] {
  line-height: 30px;
}
.el-input {
  margin-left: 10px;
  width: 16%;
}
.el-card__body,
.el-main {
  padding: 0;
}
#el-icon-edit {
  float: left;
  display: block;
  margin-left: 36%;
  font-size: 19px;
  color: rgb(64, 158, 255);
}
.el-icon-delete-solid {
  display: block;
  float: right;
  margin-right: 36%;
  font-size: 19px;
  color: rgb(64, 158, 255);
}
#label {
  width: 66px;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 50px;
  margin: 0 auto;
}
.pagination{
  margin-top: 10px;
}
</style>