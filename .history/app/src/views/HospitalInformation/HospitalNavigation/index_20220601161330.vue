<template>
  <div>
    <div class="clear header">
      <div class="header-left">
        <div class="headerDiv"></div>
        <h2>医院导航</h2>
      </div>
      <div class="header-right">
        <el-button type="primary" plain>删除</el-button>
        <el-button type="primary"  @click='changeShow'>新增院区</el-button>
      </div>
    </div>
    <section class="main">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="inputSearch"
      >
      </el-input>
      <el-button type="primary">搜索</el-button>
      <div class="tableDiv">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="地址" width="250">
          </el-table-column>
          <el-table-column
            prop="address"
            label="电话1"
            show-overflow-tooltip
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="电话2"
            show-overflow-tooltip
            width="100"
          >
          </el-table-column>
          <el-table-column prop="address" label="公交" width="320">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作时间"
            show-overflow-tooltip
            width="150"
          >
          </el-table-column>
          <el-table-column label="操作" width="120">
            <i class="el-icon-edit-outline" @click='changeUpShow'></i>
            <i class="el-icon-delete"></i>
          </el-table-column>
        </el-table>
      </div>
      <Pagination
        :pageNo="1"
        :pageSize="10"
        :total="600"
        :continues="5"
        @getPageNo="getPageNo"
      />
    </section>
  <addHospitalNavigation :dialogFormVisible="dialogFormVisible" @changeValue="changeValue"/>
  <updateHospitalNavigation :dialogUpFormVisible="dialogUpFormVisible" @changeUpValue="changeUpValue"/>
  </div>
</template>

<script>
import addHospitalNavigation from './Add'
import updateHospitalNavigation from './Modify'

export default {
  name: "HospitalNavigation",
  data() {
    return {
      inputSearch: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄123123123123123",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      dialogUpFormVisible:false,
      dialogFormVisible:false,
      labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
    };
  },
  components:{
    addHospitalNavigation,
    updateHospitalNavigation
  },
  methods: {
    //自定义事件获取当前是多少页
    getPageNo(pageNo) {
      alert(pageNo);
    },
    changeShow(){
      this.dialogFormVisible = true
    },
    changeUpShow(){
      this.dialogUpFormVisible = true
    },
    changeUpValue(value){
        this.dialogUpFormVisible = value
    },
    changeValue(value){
        this.dialogFormVisible = value
    },

    //发送请求获取所有医院导航数据
    async getData(){
      let result = await this.$API.reqGetHospitalNav()
      console.log(result);
      // if(result.code==200){
      //   return 'ok'
      //   console.log(result);
      // }else {
      //   return Promise(new Error('falie'))
      // }
      // try {
        
      // } catch (error) {
        
      // }
      
      
    }
  },
  mounted() {
    this.getData()
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
}
.el-input__prefix {
  width: 25px;
}
.main {
  width: 1400px;
  height: 710px;
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
.el-form--label-right>div{
  display: inline-block;
}
.el-form-item__label{
  padding: 20px 0 0 0 ;
}

</style>