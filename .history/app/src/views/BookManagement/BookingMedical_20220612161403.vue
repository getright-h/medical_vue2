<template>
  <div id="box">
    <el-row class="pg-title">
      <el-col :span="11">
        <button class="btn"></button>
        <span> 预约体检</span>
      </el-col>
      <el-col :span="11" class="text-right">
        <el-upload
          style="display: inline-block; margin-right: 10px"
          class="upload-demo"
          action="http://1.14.173.156:8080/admin/registration/uploadExcel"
          :auto-upload="true"
          :show-file-list="false"
        >
        </el-upload>
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
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="frame"
        value-format="yyyy-MM-dd"
        @change="gettime"
      >
      </el-date-picker>
      <el-button type="primary" class="frame" @click="search">搜索</el-button>
      <el-button type="primary" class="frame" @click="reset">重置</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 90%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
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
        p
      >
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column
        prop="comboName"
        label="套餐"
        width="180"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.comboName }}</template>
      </el-table-column>
      <el-table-column
        prop="money"
        label="体检费"
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
        prop="dotime"
        label="体检日期"
        width="180"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.doTime }}</template>
      </el-table-column>
      <el-table-column
        prop="proTime"
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
        width="55"
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
      oneinformation:null,
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

      radio: 0, //单选框
      value1: "", //时间选择
      startTime: "",
      endTime: "",
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
    //获取所有挂号信息
    async getData() {
      try {
        let result = await this.$API.reqphyAllInfo(); //等待响应回来的数据
         console.log('aaaa',result);
        if (result.code == 200) {
          this.navInfo = result.data.map((item)=>{
            if(item.status==1){
              item.status='待检测'
            }else if(item.status==2){
              item.status='已完成'
            }else{
              item.status='已退款'
            }
            return item
          });
          
          return "ok";
        } else {
          return Promise(new Error("服务器报错"));
        }
      } catch (error) {
        alert(error);
      }
    },
    jump(data) {
      console.log("该行数据", data);
      this.oneinformation = {
        card: data.row.medCard,
        doTime: dayjs(data.row.doTime).format("YYYY-MM-DD HH:mm:ss"),
      };
      this.$router.push("/bookmedicalinfo");
    },
    //获取选定时间段
    gettime(time) {
      console.log("time", time);
      this.startTime = dayjs(time[0]).format("YYYY-MM-DD HH:mm:ss");
      this.endTime = dayjs(time[1]).format("YYYY-MM-DD HH:mm:ss");
    },
    //获取单选框选中的值
    getradio(val) {
      this.radio = val;
    },
    //搜索
    async search() {
      let bar = {
        endTime: this.endTime,
        startTime: this.startTime,
        status: this.radio,
      };
      let foo = await this.$API.searchMedicalInfo(bar);
      console.log(foo);
    },
    //重置
    reset() {
      this.getData();
    },
    //用全局时间总线$bus 传请求的信息
    sendMessage(data) {
      this.$bus.$emit("demo2", data);
    },
  },
  beforeDestroy() {
     this.sendMessage(this.oneinformation);
  },
  mounted() {
    this.getData();
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