<template>
  <div>
    <div class="clear header">
      <div class="header-left">
        <div class="headerDiv"></div>
        <h2>医院导航</h2>
      </div>
      <div class="header-right">
        <el-button type="primary" @click="changeShow">新增院区</el-button>
      </div>
    </div>
    <section class="main">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="inputSearch"
      >
      </el-input>
      <el-button type="primary" @click="search">搜索</el-button>
      <div class="tableDiv">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="campus" label="院区" width="150">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="250">
          </el-table-column>
          <el-table-column
            prop="phone1"
            label="电话1"
            show-overflow-tooltip
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="phone2"
            label="电话2"
            show-overflow-tooltip
            width="100"
          >
          </el-table-column>
          <el-table-column prop="bus" label="公交" width="220">
          </el-table-column>
          <el-table-column
            prop="time"
            label="操作时间"
            show-overflow-tooltip
            width="250"
          >
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <i
                class="el-icon-edit-outline"
                @click="changeUpShow(scope.row)"
              ></i>
              <i class="el-icon-delete" @click="open(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
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
    </section>
    <addHospitalNavigation
      :dialogFormVisible="dialogFormVisible"
      @changeValue="changeValue"
    />
    <updateHospitalNavigation
      :dialogUpFormVisible="dialogUpFormVisible"
      @changeUpValue="changeUpValue"
    />
  </div>
</template>

<script>
import addHospitalNavigation from "./Add";
import updateHospitalNavigation from "./Modify";

export default {
  name: "HospitalNavigation",
  data() {
    return {
      inputSearch: "",
      tableData: [],
      dialogUpFormVisible: false,
      dialogFormVisible: false,
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
      thisData: {}, //传给修改子组件的该行信息
      navInfo: [], //传给子组件用于分页处理的原始数据
      pageNo: 1, //当前页
      pageSize: 2, //每一页多少条数据
      continues: 5, //分页器 下方连续页码
    };
  },
  components: {
    addHospitalNavigation,
    updateHospitalNavigation,
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
    changeShow() {
      this.dialogFormVisible = true;
    },
    async changeUpShow(row) {
      this.dialogUpFormVisible = true;
      let data = {
        campus: row.campus,
      };
      let result = await this.$API.reqBeforeUpdateHospitalNav(data);
      if (result.code == 200) {
        this.thisData = result.data[0];
        this.$bus.$emit("getDefault", this.thisData);
      }
    },
    changeUpValue(value) {
      this.dialogUpFormVisible = value;
      this.getData();
    },
    changeValue(value) {
      this.getData();
      this.dialogFormVisible = value;
    },

    //发送请求获取所有医院导航数据
    async getData() {
      let result = await this.$API.reqGetHospitalNav();
      if (result.code == 200) {
        this.navInfo = result.data;
      }
    },
    //搜索
    async search() {
      if (this.inputSearch) {
        let result = await this.$API.reqSelectHospitalNav({
          campus: this.inputSearch,
        });
        console.log(result);
        if (result.code == 200) {
          this.navInfo = result.data;
        }
      } else {
        alert("你输入为空!请重新输入");
      }
    },
    //删除回调
    open(row) {
      
      this.$confirm("此操作将永久删除该院区, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
        campus: row.campus,
      };
          let result = this.$API.reqDeleteHospitalNav(data);
          if (result.code == 200) {
            this.$message({
              type: "info",
              message: "<strong>删除成功</strong>",
            });
            this.getData();
          } else {
            this.$message({
              type: "info",
              message: "<strong>删除失败</strong>",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      let result = await this.$API.reqDeleteHospitalNav(data);
      if (result.code == 200) {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: "<strong>删除成功</strong>",
        });
        this.getData();
      } else {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: "<strong>删除失败</strong>",
        });
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped lang="less">
.el-popover {
  text-align: center;
}
.clear {
  clear: both;
  content: "";
  display: block;
}
.el-table th.el-table__cell > .cell {
  padding: 0 14px;
}
.header {
  height: 40px;
}
.el-table__body i {
  font-size: 20px;
  color: #409eff;
  cursor: pointer;
  margin-left: 5px;
}
.headerDiv {
  width: 30px;
  height: 12px;
  border-radius: 10px;
  background-color: #006eff;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 3px;
}
.el-input__prefix {
  height: 40px;
  margin-top: 20px;
  margin-left: 20px;
  display: inline-block;
  width: 300px;
}
.header-left {
  line-height: 40px;
  float: left;
}
.header-right {
  float: right;
}
.header-left > h2 {
  display: inline-block;
}
.el-input__inner {
  margin-top: 20px;
  margin-left: 20px;
}
.el-input {
  width: 300px;
  margin-right: 30px;
  margin-top: 20px;
  margin-left: 20px;
}
.el-input__prefix {
  width: 25px;
}
.main {
  width: 1400px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: white;
  padding-bottom: 100px;
}
.el-button--primary {
  display: inline-block;
}
.tableDiv {
  width: 1260px;
  margin: 0 auto;
  margin-top: 20px;
  height: 450px;
}
.el-form--label-right > div {
  display: inline-block;
}
.el-form-item__label {
  padding: 20px 0 0 0;
}
</style>