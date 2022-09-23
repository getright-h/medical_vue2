<template>
  <div id="box">
    <el-row class="pg-title">
      <el-col :span="12">
        <button class="btn"></button>
        <span> 医生排班</span>
      </el-col>
    </el-row>
    <ul id="header" class="clear">
      <!-- 单选框 -->
      <li :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <el-radio-group v-model="radio2" size="medium">
          <el-radio-button label="上一周"></el-radio-button>
          <el-radio-button label="本周"></el-radio-button>
          <el-radio-button label="下一周"></el-radio-button>
        </el-radio-group>
      </li>

      <!-- 下拉框 -->
      <li :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
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

      <!-- 输入框 -->
      <li class="mr-5 li" :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <el-input
          v-model="input"
          placeholder="请输入医生/病人姓名"
          size="medium"
        ></el-input>
      </li>
      <!-- 搜索按钮 -->
      <li class="li" :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <el-button
          type="primary"
          class="height-btn"
          @click="search"
          size="medium"
          >搜索</el-button
        >
      </li>
    </ul>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="医生姓名" width="120">
        <template slot-scope="scope">{{ scope.row.doctorname }}</template>
      </el-table-column>
      <el-table-column prop="department" label="科室" width="120">
        <template slot-scope="scope">{{ scope.row.department }}</template>
      </el-table-column>
      <el-table-column prop="monday" label="星期一" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.monday }}</template>
      </el-table-column>
      <el-table-column prop="tuesday" label="星期二" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.tuesday }}</template>
      </el-table-column>
      <el-table-column prop="wednesday" label="星期三" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.wednesday }}</template>
      </el-table-column>
      <el-table-column prop="thursday" label="星期四" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.thursday }}</template>
      </el-table-column>
      <el-table-column prop="friday" label="星期五" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.friday }}</template>
      </el-table-column>
      <el-table-column prop="saturday" label="星期六" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.saturday }}</template>
      </el-table-column>
      <el-table-column prop="sunday" label="星期天" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.sunday }}</template>
      </el-table-column>
      <el-table-column prop="option" label="操作" show-overflow-tooltip>
        <el-popover
          placement="left"
          width="1000"
          height="100px"
          trigger="click"
        >
          <el-calendar v-model="value1"> </el-calendar>
          <el-button slot="reference" id="icon">
            <i class="el-icon-s-tools"></i
          ></el-button>
        </el-popover>
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
      value1: new Date(),
      tableData: [
        {
          doctorname: "赵马",
          department: "内科-心脏内科",
          monday: "休",
          tuesday: "休",
          wednesday: "休",
          thursday: "休",
          friday: "休",
          saturday: "休",
          sunday: "休",
        },
      ],

      multipleSelection: [], //表
      input: "", //输入框
      radio2: "本周", //单选框
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
    getPageNo(page) {
      alert(page);
    }, //页码跳转
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
  height: 40px;
  margin-bottom: 10px;
  /* border: 1px solid red; */
}
#icon {
  border: none;
  color: #66b1ff;
}
#header > li {
  list-style: none;
  float: left;
  margin-right: 10px;
}
.height-btn {
  height: 37px;
}
.clear::after {
  display: block;
  content: "";
  clear: both;
}
.el-icon-s-tools{
  font-size:20px ;
}
</style>