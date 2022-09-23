<template>
  <div id="box">
    <el-row class="pg-title">
      <el-col :span="11">
        <button class="btn"></button>
        <span>预约挂号</span>
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
        <!-- <el-button \
        @click="toLead" class="btn1">导入</el-button> -->
        <!-- <el-button @click="exportFile" class="btn1">导出</el-button> -->
      </el-col>
    </el-row>
    <ul id="header" class="clear">
      <li>
        <el-radio-group v-model="radio" class="frame" @change="getradio">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="1">待就诊</el-radio>
          <el-radio :label="2">已就诊</el-radio>
          <el-radio :label="3">已取消</el-radio>
        </el-radio-group>
      </li>
      <li>
        <el-date-picker
          v-model="valuetime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="frame"
          value-format=timestamp
          @change="choicetime"
        >
        </el-date-picker>
      </li>
      <li>
        <el-select v-model="value" placeholder="请选择科室" size="medium" filterable @change="changeselect">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :value="item"
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
          @change="getinput"
        ></el-input>
      </li>
      <li>
        <el-button type="primary" class="frame" @click="search">搜索</el-button>
      </li>
      <li>
        <el-button type="primary" class="frame" @click="reset">重置</el-button>
      </li>
    </ul>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 95%"
    >
      <el-table-column
        type="selection"
        width="55"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="患者姓名"
        width="110"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column
        prop="medCard"
        label="就诊卡号"
        width="110"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.medCard }}</template>
      </el-table-column>
      <el-table-column
        prop="idCard"
        label="身份证号"
        header-align="center"
        align="center"
        width="150"
      >
        <template slot-scope="scope">{{ scope.row.idCard }}</template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码"
        header-align="center"
        align="center"
        width="120"
      >
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column
        prop="departName"
        label="挂号科室"
        header-align="center"
        align="center"
        width="120"
      >
        <template slot-scope="scope">{{ scope.row.departName }}</template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="挂号类型"
        header-align="center"
        align="center"
        width="120"
      >
        <template slot-scope="scope">{{ scope.row.type }}</template>
      </el-table-column>
      <el-table-column
        prop="money"
        label="挂号费"
        header-align="center"
        align="center"
        width="110"
      >
        <template slot-scope="scope">{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="挂号状态"
        header-align="center"
        align="center"
        width="100"
      >
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
      <el-table-column
        prop="doTime"
        label="就诊日期"
        header-align="center"
        align="center"
        width="180"
      >
        <template slot-scope="scope">{{ scope.row.doTime }}</template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="预约时间"
        header-align="center"
        align="center"
        width="180"
      >
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column
        prop="option"
        label="操作"
        header-align="center"
        align="center"
        width="120"
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
      navInfo: [],//传给子组件用于分页处理的原始数据
      pageNo: 1, //当前页
      pageSize: 2, //每一页多少条数据
      continues: 5, //分页器 下方连续页码
      //--------------------
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
      valuetime: "", //时间选择
      value: "",

      options: [
      ],
      timer:null,
      department:'',
      startTime:'',
      endTime:'',
      input: '',
      radio: 0, //单选框
      

    };
  },

  methods: {
    //分页
    //自定义事件获取当前是多少页
    getPageNo(pageNo) {
      this.pageNo = pageNo;
    },
    //获取分液器传过来的直接渲染的数据
    getFinishDate(finishDate) {
      this.tableData = finishDate;
    },
    //---------------------
    //获取所有挂号信息
    async getData() {
      try {
        let result = await this.$API.reqRegisterAllInfo(); //等待响应回来的数据
        if (result.code == 200) {
          //-----------------
          this.navInfo = result.data.map((item)=>{
            if(item.status==1){
              item.status='待就诊'
            }else if(item.status==2){
              item.status='已就诊'
            }else{
              item.status='已取消'
            }
            return item
          });
          
          
          
          // return "ok";
        } else {
          return Promise(new Error("服务器报错"));
        }
      } catch (error) {
        alert(error);
      }
    },
    //获取下拉框选中的值
    changeselect(vld){
         this.department = vld
        },
    //获取选中的时间
    choicetime(time){
        this.startTime= dayjs(time[0]).format("YYYY-MM-DD HH:mm:ss");
        this.endTime=dayjs(time[1]).format("YYYY-MM-DD HH:mm:ss");
    },
    //获取输入框内的值
    getinput(val){
        this.input=val
    },
    //获取单选框的值
    getradio(val){
      this.radio=val
    },
    //搜索
    async search() {
      // this.department=this.changeselect();
      let bar = {
        department:this.department,
        endTime:this.endTime,
        name: this.input,
        startTime:this.startTime,
        status:this.radio,
      };
      let result = await this.$API.searchRegisterInfo(bar);
        if (result.code == 200) {
        this.$message({
          message: "查询成功",
          type: "success",
          duration: 2000,
        });
        this.input = "";
       this.navInfo=result.data.map((item) => {
            if (item.status == 1) {
              item.status = "待检测";
            } else if (item.status == 2) {
              item.status = "已完成";
            } else {
              item.status = "已退款";
            }
            return item;
          });
        this.input=''
      } else {
        this.$message.error("查询失败，请稍后重试");
      }
     
     
    },
    //详情并跳转
    jump(data) {
      this. oneinformation = {
        card: data.row.medCard,
        doTime:dayjs( data.row.doTime).format("YYYY-MM-DD HH:mm:ss")
      };
      // this.one=oneinformation
      // this.timer = setTimeout(() => {
      //   this.sendMessage(oneinformation);//调用函数
      // }, 100);
      this.$router.push("/bookregisterinfo");
    },
    //传递信息函数
    sendMessage(oneinformation) {
        //利用$bus 传单条挂号详情
    //oninformation 是该组件要请求信息
      this.$bus.$emit("demo", oneinformation); //触发$bus
    },
    //获取下拉框的字段,并渲染到下拉框
   async getselect(){
       let result = await this.$API.getselection();
       if(result.code==200){
         this.options=result.data
       }else{
         this.options=[]
       }
    },
    //重置数据
    reset(){
      this.getData()
    }
  },
  mounted() {
    this.getData();
    this.getselect();
   
   
  },

  beforeDestroy(){
    // this.timer = null
      this.sendMessage(this.oneinformation);//调用函数
  }
};
</script>

<style scoped lang='less'>
#box {
  width: 100%;
  height: 100vh;
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
#header {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  // border: 1px solid red;
}
.clear::after {
  display: block;
  clear: both;
  content: "";
}
#header > li {
  list-style: none;
  float: left;
  margin-right: 20px;
  line-height: 40px;
}
/deep/ .el-input__inner {
  width: 190px;
  height: 40px;
}
/deep/ .el-radio-group {
  //
  line-height: 95px;
}
.el-button {
  //
  width: 70px;
  margin-bottom: 18px;
}
.el-select__caret {
  //
  line-height: 40px;
}
.el-table {
  margin-bottom: 20px;
}

.el-icon-s-order {
  font-size: 20px;
}
.el-radio-group {
  line-height: 40px;
}
</style>