<template>
  <div>
    <h1 id="yuy">预约详情</h1>
    <template >
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="project" label="预约类型"></el-table-column>
        <el-table-column prop="administrative" label="出诊科室">
        </el-table-column>
        <el-table-column prop="card" label="就诊卡号"> </el-table-column>
        <el-table-column prop="name" label="出诊医生"> </el-table-column>
        <el-table-column prop="type" label="挂号类型"> </el-table-column>
        <el-table-column prop="cost" label="费用"> </el-table-column>
        <el-table-column prop="doTime" label="预约日期" width="180px"> </el-table-column>
        <el-table-column prop="status" label="就诊状态"> </el-table-column>
        <!-- <el-table-column prop="operation"  class="el-icon-edit"  label="操作"> </el-table-column> -->
		<template >
        <el-table-column prop="operation" label="操作" >
          <template slot-scope="scope">
            <el-button v-if="scope.row.state == '待就诊'" @click="deselect">取消预约</el-button>
          </template>
        </el-table-column>
		</template>
      </el-table>
	  <!-- <Pagination
        :pageNo="pageNo"
        :pageSize="pageSize"
        :total="tableData.length"
        :continues="continues"
        :showData="tableData"
        @getPageNo="getPageNo"
        @getFinishDate="getFinishDate"
      /> -->
    </template>
  </div>
  
</template>
 
<script>
export default {
  methods: {
    async getData(){
      let result = await this.$API.Booking({phone:Number(JSON.parse(sessionStorage.getItem('user')))})
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
	//自定义事件获取当前是多少页
    getPageNo(pageNo) {
      this.pageNo = pageNo;
    },

    //获取分液器传过来的直接渲染的数据
    getFinishDate(finishDate) {
      this.tableData = finishDate;
    },
	//获取信息
	async reserved (){
		let result = await this.$API.Booking()
		if(result.code == 200){
			this.tableData = result.data
		}
			console.log(result);
		
	},
	//取消预约
	async unselect (){
		let result = await this.$API.deselecting()
		if(result.code == 200){
			console.log('取消预约成功');
			// this.tableData = result.data
		}
			console.log(result);
		
	},
	
  	getPageNo(value) {
      console.log(value);
    },

  },
  mounted() {
	  this.reserved()
    this.getData() //获取初始化数据
  },
  data() {

    return {
		cell:'',
      operate: "",
      tableData1: [
        {
          project: "大保健",
          administrative: "保健科",
          card: "1234567",
          status: "专家号",
          cost: "998",
          state: "待就诊",
          date: "2022-05-02",
          doctor: "王小虎",
        },
        {
          project: "大保健",
          administrative: "保健科",
          card: "1234567",
          status: "专家号",
          cost: "998",
          state: "已就诊",
          date: "2022-05-02",
          doctor: "王小虎",
        },
        {
          project: "大保健",
          administrative: "保健科",
          card: "1234567",
          status: "专家号",
          cost: "998",
          state: "未就诊",
          date: "2022-05-02",
          doctor: "王小虎",
        },
        {
          project: "大保健",
          administrative: "保健科",
          card: "1234567",
          status: "专家号",
          cost: "998",
          state: "已就诊",
          date: "2022-05-02",
          doctor: "王小虎",
        },
        {
          project: "大保健",
          administrative: "保健科",
          card: "1234567",
          status: "专家号",
          cost: "998",
          state: "已就诊",
          date: "2022-05-02",
          doctor: "王小虎",
        },
        {
          project: "大保健",
          administrative: "保健科",
          card: "1234567",
          status: "专家号",
          cost: "998",
          state: "已就诊",
          date: "2022-05-02",
          doctor: "王小虎",
        },
      ],
	  tableData:[],  //装所有返回来数据的

      pageNo: 1, //当前页
      pageSize: 2, //每一页多少条数据
      continues: 5, //分页器 下方连续页码
    };
  },
  computed: {
	  getStatus(){
		  return this.tableData.filter(item => item.state=='待就诊')
	  }
  },
};
</script>


<style lang="less" scope>
#yuy {
  text-align: center;
  color: rgb(119, 161, 253);
  margin: 10px 0px;
}
#paging {
  text-align: center;
  margin: 10px 0px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>