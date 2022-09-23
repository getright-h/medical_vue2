<template>
  <div id="box">
    <el-row class="pg-title">
      <el-col :span="11">
        <button class="btn"></button>
        <span> 预约核酸检测</span>
      </el-col>
      <el-col :span="11" class="text-right">
        <el-upload
          style="display: inline-block; margin-right: 10px"
          class="upload-demo"
          action="http://1.14.173.156:8080/admin/registration/uploadExcel"
          :auto-upload="true"
          :show-file-list="false"
        >
          <!-- <el-button class="btn1">导入</el-button> -->
        </el-upload>
        <!-- <el-button @click="toLead" class="btn1">导入</el-button> -->
        <!-- <el-button @click="exportFile" class="btn1">导出</el-button> -->
      </el-col>
    </el-row>
    <div id="header">
      <el-radio-group v-model="radio" class="frame" @change="getradio">
        <el-radio :label="0">全部</el-radio>
        <el-radio :label="1">待检测</el-radio>
        <el-radio :label="2">已完成</el-radio>
        <el-radio :label="3">已退款</el-radio>
      </el-radio-group>
      <el-date-picker
        v-model="valuetime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="choicetime"
        value-format="timestamp"
        class="frame"
      >
      </el-date-picker>
      <el-button type="primary" class="frame" @click="search">搜索</el-button>
      <el-button type="primary" class="frame" @click="reset">重置</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 95%"
    >
      <el-table-column type="selection" width="45"> </el-table-column>

      <el-table-column type="index" label="排序"> </el-table-column>

      style="width: 95%"
    >
      <el-table-column type="selection" width="45"> </el-table-column>

      <el-table-column type="index" label="排序"> </el-table-column>

      <el-table-column
        label="患者姓名"
        width="120"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column
        prop="medCard"
        label="就诊卡号"
        width="120"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.medCard }}</template>
      </el-table-column>
      <el-table-column
        prop="idCard"
        label="身份证号"
        width="150"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.idCard }}</template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码"
        width="120"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column
        prop="departName"
        label="挂号科室"
        width="120"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.departName }}</template>
      </el-table-column>
      <el-table-column
        prop="money"
        label="检测费"
        width="120"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
      <el-table-column
        prop="doTime"
        label="就诊日期"
        width="180"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.doTime }}</template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="预约时间"
        width="180"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column
        prop="option"
        label="操作"
        width="120"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small">
            <i class="el-icon-s-order" @click="jump(scope)"></i>
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
import dayjs from "dayjs";
export default {
  data() {
    return {
      tableData: [],
      navInfo: [], //传给子组件用于分页处理的原始数据
      pageNo: 1, //当前页
      pageSize: 2, //每一页多少条数据
      continues: 5, //分页器 下方连续页码
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      multipleSelection: [], //表
      timer: null, //定时器
      //关于搜索
      valuetime: "", //时间选择
      department: "",
      startTime: "",
      endTime: "",
      radio: 0, //单选框
    };
  },

  methods: {
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
    //获取所有核酸预约数据
    async getData() {
      try {
        let result = await this.$API.reqhsAllInfo(); //等待响应回来的数据
        if (result.code == 200) {
          console.log("nat", result);
          this.navInfo = result.data.map((item) => {
            if (item.status == 1) {
              item.status = "待检测";
            } else if (item.status == 2) {
              item.status = "已完成";
            } else {
              item.status = "已退款";
            }
            return item;
          });
        } else {
          return Promise(new Error("服务器报错"));
        }
      } catch (error) {
        alert(error);
      }
    },

    //跳转  使用vuex 调用函数 获取预约详情
    jump(data) {
      console.log("gsgdsg", data);
      let oneinformation = {
        card: data.row.medCard,
        doTime: dayjs(data.row.doTime).format("YYYY-MM-DD HH:mm:ss"),
      };
      this.timer = setTimeout(() => {
        this.sendMessage(oneinformation);
      }, 100);
      this.$router.push("/booknatinfo");
    },
    sendMessage(data) {
      this.$bus.$emit("demo1", data);
    },

    //获取选中的时间
    choicetime(time) {
      console.log("time", time);
      this.startTime = dayjs(time[0]).format("YYYY-MM-DD HH:mm:ss");
      this.endTime = dayjs(time[1]).format("YYYY-MM-DD HH:mm:ss");
    },
    //获取单选框的值
    getradio(val) {
      console.log("radio", val);
      this.radio = val;
    },
    //搜索
    async search() {
      let bar = {
        endTime: this.endTime,
        startTime: this.startTime,
        status: this.radio,
      };
      console.log("bar", bar);
      let result = await this.$API.searchNatInfo(bar);
      if (result.code == 200) {
        this.$message({
          message: "查询成功",
          type: "success",
          duration: 2000,
        });
        this.input = "";
        console.log(result);
        this.navInfo = result.data.map((item) => {
            if (item.status == 1) {
              item.status = "待检测";
            } else if (item.status == 2) {
              item.status = "已完成";
            } else {
              item.status = "已退款";
            }
            return item;
          });;
        this.input = "";
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
  beforeDestroy() {
    this.timer = null;
  },
};
</script>

<style scoped>
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
#header {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  /* border: 1px solid red; */
}
#header > .frame {
  margin-left: 10px;
}
.el-icon-s-order {
  font-size: 20px;
}
#box {
  width: 100%;
  height: 100vh;
}
.el-table {
  margin-bottom: 20px;
}
</style>
