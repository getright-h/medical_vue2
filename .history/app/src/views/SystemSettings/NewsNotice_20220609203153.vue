<template>
  <div id="box">
    <el-row class="pg-title clear">
      <el-col :span="20">
        <button class="btn"></button>
        <span>消息公告</span>
      </el-col>
    </el-row>

    <div id="header" class="clear">
      <div id="left-btn">
        <el-input
          id="myinp"
          v-model="input"
          placeholder="请输入标题"
          size="medium"
        ></el-input>
        <el-button type="primary" class="frame" @click="search">搜索</el-button>
        <el-button type="primary" class="frame" @click="reset">重置</el-button>
      </div>
      <div id="right-btn">
        <!-- <el-button @click="muchdel" class="btn1">删除</el-button> -->
        <el-button type="primary" @click="add">新增消息</el-button>
      </div>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 80%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="title" width="55"></el-table-column>
      <el-table-column
        label="通知标题"
        width="200"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column
        prop="text"
        label="内容"
        width="250"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.text }}</template>
      </el-table-column>
      <el-table-column
        prop="author"
        label="上传者"
        width="200"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.author }}</template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="上传时间"
        width="200"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column
        prop="option"
        label="操作"
        width="200"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small">
            <i class="el-icon-edit" @click="update(scope)"></i>
            <i class="el-icon-delete-solid" @click="singledel(scope)"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 自定义事件getPageNo     在Pagination 组件 用$emit('事件名'，'参数') 调用-->
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
export default {
  data() {
    return {
      tableData: [],
       navInfo: [],//传给子组件用于分页处理的原始数据
      pageNo: 1, //当前页
      pageSize: 2, //每一页多少条数据
      continues: 5, //分页器 下方连续页码
      noticeid: {
        id: null,
      },
      content: {
        author: "",
        id: 0,
        status: 0,
        text: "",
        time: "",
        title: "",
      },
      multipleSelection: [], //表
      input: "",
      showAddadim: false,
      showUpdtae: false,
    };
  },

  methods: {
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
    },

    //删某条公告
    singledel(data) {
      (this.noticeid.id = data.row.id),
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          let result = await this.$API.delNotice(this.noticeid);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getData();
          } else {
            this.$message.error("删除失败")
          }
        }).catch(()=>{})
    },
    //分页
    //自定义事件获取当前是多少页
    getPageNo(pageNo) {
      console.log("pageNopageNopageNo", pageNo);
      this.pageNo = pageNo;
    },
    //获取分液器传过来的直接渲染的数据
    getFinishDate(finishDate) {
      console.log("asdadasds", finishDate);
      this.tableData = finishDate;
    },

    //进入修改接口 传id
    async update(data) {
      this.noticeid.id = data.row.id;
      let result = await this.$API.goupdateNotice(this.noticeid);
      let oneinformation = result.data;
      if (result.code == 200) {
        this.sendMessage(oneinformation);
      } else {
        alert("消息未获取");
      }
    },
    //$bus 传值
    sendMessage(a) {
      setTimeout(() => {
        this.$bus.$emit("demo6", a); //触发$bus
      }, 100);
      this.$router.push("/updatenews");
    },
    //添加消息公告
    add() {
      this.$router.push("/addnews");
    },
    //得到所有消息公告
    async getData() {
      try {
        let result = await this.$API.reqAllNotice(); //等待响应回来的数据
        if (result.code == 200) {
          console.log("jieguo", result.data);
          this.navInfo = result.data;
          console.log("tableData", this.tableData);
          return "ok";
        } else {
          return Promise(new Error("服务器报错"));
        }
      } catch (error) {
        alert(error);
      }
    },
    //搜索
    //返回数据为空
    async search() {
      this.content.title = this.input;
      let result = await this.$API.searchNotice(this.content);
      if (result.code == 200) {
        this.$message({
          message: "查询成功",
          type: "success",
          duration: 2000,
        });
        this.input = "";
        console.log(result);
        this.tableData = result.data;
      } else {
        this.$message.error("查询失败，请稍后重试");
      }
    },

    //重置
    reset() {
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
#box {
  width: 100%;
  height: 100vh;
}
.btn1 {
  color: #197bfe;
  width: 80px;
}
.btn {
  background-color: #197bfe;
  height: 10px;
  width: 30px;
  border: 0px;
  border-radius: 5px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
.pg-title {
  height: 70px;
  line-height: 70px;
  font-size: 24px;
}
.clear::after {
  content: "";
  display: block;
  clear: both;
}

#header {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  /* border: 1px solid red; */
}
#left-btn {
  float: left;
}
#right-btn {
  float: right;
}
.el-input {
  width: 200px;
  height: 45px;
  margin-right: 30px;
}
.el-icon-edit {
  margin-right: 10px;
  font-size: 20px;
}
.el-icon-delete-solid {
  font-size: 20px;
}
</style>