<template>
  <div id="box">
    <el-row class="pg-title">
      <el-col :span="12">
        <button class="btn"></button>
        <span>预约挂号</span>
      </el-col>
      <el-col :span="12" class="text-right">
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
    <ul id="header" class="clear">
      <li>
        <el-radio-group v-model="radio" class="frame">
          <el-radio :label="3">全部</el-radio>
          <el-radio :label="6">待就诊</el-radio>
          <el-radio :label="9">已就诊</el-radio>
          <el-radio :label="9">已取消</el-radio>
        </el-radio-group>
      </li>
      <li>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="frame"
        >
        </el-date-picker>
      </li>
      <li>
        <el-select v-model="value" placeholder="请选择科室" size="medium">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </li>

      <!-- input框 -->
      <li>
        <el-input
          v-model="input"
          placeholder="请输入医生/病人姓名"
          size="medium"
        ></el-input>
      </li>
      <li><el-button type="primary" class="frame">搜索</el-button></li>
    </ul>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="患者姓名" width="120">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="patientId" label="就诊卡号" width="120">
        <template slot-scope="scope">{{ scope.row.patientId }}</template>
      </el-table-column>
      <el-table-column prop="idCard" label="身份证号" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.idCard }}</template>
      </el-table-column>
      <el-table-column prop="telnumber" label="手机号码" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.telnumber }}</template>
      </el-table-column>
      <el-table-column prop="package" label="挂号科室" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.package }}</template>
      </el-table-column>
      <el-table-column prop="testfee" label="挂号类型" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.testfee }}</template>
      </el-table-column>
      <el-table-column prop="status" label="挂号费" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
      <el-table-column
        prop="patientdate"
        label="挂号状态"
        show-overflow-tooltip
      >
        <template slot-scope="scope">{{ scope.row.patientdate }}</template>
      </el-table-column>
      <el-table-column
        prop="reservedate"
        label="就诊日期"
        show-overflow-tooltip
      >
        <template slot-scope="scope">{{ scope.row.reservedate }}</template>
      </el-table-column>
      <el-table-column
        prop="reservedate"
        label="预约时间"
        show-overflow-tooltip
      >
        <template slot-scope="scope">{{ scope.row.reservedate }}</template>
      </el-table-column>
      <el-table-column prop="option" label="操作" show-overflow-tooltip>
        <template >
          <el-button
            type="text"
            size="small"
          >
            <i class="el-icon-s-order" @click="jump"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 自定义事件getPageNo     在Pagination 组件 用$emit('事件名'，'参数') 调用-->
    <Pagination
      :pageNo="1"
      :pageSize="10"
      :total="600"
      :continues="5"
      @getPageNo="getPageNo"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "赵马",
          patientId: "500900",
          idCard: "3718901999943",
          telnumber: "135406988",
          package: "男性基础A套餐",
          testfee: 60,
          status: "已完成",
          patientdate: "2019-08-15",
          reservedate: "2019-08-15",
        },
        {
          name: "赵马",
          patientId: "500900",
          idCard: "3718901999943",
          telnumber: "135406988",
          package: "男性基础A套餐",
          testfee: 60,
          status: "已完成",
          patientdate: "2019-08-15",
          reservedate: "2019-08-15",
        },
      ],
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
      input:'',
      multipleSelection: [], //表
      radio: 3, //单选框
      value1: "", //时间选择
      value:'',
      options: [
        //下拉框  选择科室
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
    };
  },

  methods: {
     getPageNo(page) {
      alert(page);
    }, //页码跳转
    jump(){
      this.$router.push('/bookregisterinfo')
    }
  },
};
</script>

<style scoped lang='less'>
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
  height: 40px;
  margin-bottom: 10px;
  // border: 1px solid red;
}
.clear::after{
  display: block;
  clear: both;
  content: '';
}
#header >li{
  list-style: none;
  float: left;
  margin-right: 20px;
}
/deep/ .el-input__inner {
  width: 200px;
  height: 40px;
}
/deep/ .el-radio-group{
  line-height: 50px;
}
.el-icon-s-order{
  font-size: 20px;
}


</style>