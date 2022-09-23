<template>
  <div>
    <div class="clear header">
      <div class="header-left">
        <div class="headerDiv"></div>
        <h2>首页</h2>
      </div>
    </div>
    <section class="main">
      <div class="main-header">
        <h4>数据总览</h4>
        <ul class="clear">
          <!-- <i class="el-icon-top-right"></i> -->
          <li>
            <div class="ulDiv1">
              <span class="iconfont icon-shu"></span>
            </div>
            <span class="num">{{bookNumber}}</span>
            <span class="numLang">今日预约人数</span>
            <i class="el-icon-top-right"></i>
          </li>
          <li>
            <div class="ulDiv2">
              <span class="iconfont icon-lianjie"></span>
            </div>
            <span class="num">{{bookNumber}}</span>
            <span class="numLang">今日挂号人数</span>
            <i class="el-icon-top-right"></i>
          </li>
          <li>
            <div class="ulDiv3">
              <span class="iconfont icon-renminbi"></span>
            </div>
            <span class="num">500</span>
            <span class="numLang">今日取消预约人数</span>
            <i class="el-icon-top-right"></i>
          </li>
          <li>
            <div class="ulDiv4">
              <span class="iconfont icon-zhexiantu"></span>
            </div>
            <span class="num">500</span>
            <span class="numLang">{{payTotal}}</span>
            <i class="el-icon-top-right"></i>
          </li>
          <li>
            <div class="ulDiv5">
              <span class="iconfont icon-200yonghu_yonghu"></span>
            </div>
            <span class="num">500</span>
            <span class="numLang">今日门诊充值总额</span>
            <i class="el-icon-top-right"></i>
          </li>
        </ul>
      </div>
      <div id="first-left" ref="left"></div>
      <div id="first-right" ref="right"></div>

      <div id="second-left" ref="second-left">
        <h2>实时预约</h2>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column label="头像" width="80">
            <img
              src="../../assets/images/logo.png"
              alt=""
              style="width: 50px; height: 50px; border-radius: 50px"
            />
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="80">
          </el-table-column>
          <el-table-column prop="phone" label="电话" width="120">
          </el-table-column>
          <el-table-column prop="department" label="预约科室" width="80">
          </el-table-column>
          <el-table-column prop="pay" label="挂号费" width="70">
          </el-table-column>
          <el-table-column prop="time" label="挂号时间" width="160">
          </el-table-column>
        </el-table>
      </div>
      <div id="second-middle" ref="second-middle">
        <h2>热门科室</h2>
      </div>
      <div id="second-right" ref="second-right">
        <h2>热门医生</h2>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      tableData: [
        {
          url: "../../assets/images/logo.png",
          name: "王小虎",
          phone: "13458296988",
          department: "内科",
          pay: "￥20",
          time: "2022-06-08 08:08:00",
        },
        {
          url: "../../assets/images/logo.png",
          name: "王小虎",
          phone: "13458296988",
          department: "内科",
          pay: "￥20",
          time: "2022-06-08 08:08:00",
        },
        {
          url: "../../assets/images/logo.png",
          name: "王小虎",
          phone: "13458296988",
          department: "内科",
          pay: "￥20",
          time: "2022-06-08 08:08:00",
        },
        {
          url: "../../assets/images/logo.png",
          name: "王小虎",
          phone: "13458296988",
          department: "内科",
          pay: "￥20",
          time: "2022-06-08 08:08:00",
        },
      ],
      bookNumber: 0, //预约人数
      payTotal:0,//门诊消费总额
    };
  },
  mounted() {
    this.showCharts();
    this.getBookNumber(); //初始化数据函数
    this.getPayTotal() //门诊消费总额函数
  },
  methods: {
    showCharts() {
      //第一个图形
      let myChart = this.$echarts.init(this.$refs.left);
      // 绘制图表
      myChart.setOption({
        title: {
          text: "近7天预约量",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20, 30],
          },
        ],
      });

      //第二个图形
      let myChart1 = this.$echarts.init(this.$refs.right);
      // 绘制图表
      myChart1.setOption({
        title: {
          text: "近7天门诊充值趋势",
        },
        tooltip: {},
        xAxis: {
          data: ["A", "B", "C", "D", "E", "F", "G"],
        },
        yAxis: {},
        series: [
          {
            data: [10, 22, 28, 23, 19, 80, 1000],
            type: "line",
            label: {
              show: true,
              position: "bottom",
              textStyle: {
                fontSize: 20,
              },
            },
          },
        ],
      });
    },
    //获取预约人数的函数
    async getBookNumber() {
      let result = await this.$API.reqGetBookNumber();
      console.log(result.data);
      if (result.code == 200) {
        this.bookNumber = result.data;
      }
    },
    //门诊消费总额的函数
    async getPayTotal(){
      let result = await this.$API.reqPayTotal()
      console.log(result)
      if (result.code == 200) {
        this.payTotal = result.data || 0;
      }
    }
  },
};
</script>

<style scoped>
.clear {
  clear: both;
  content: "";
  display: block;
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
.header-left > h2 {
  display: inline-block;
}
.main {
  width: 1400px;
  height: 710px;
  margin-top: 20px;
  border-radius: 10px;
  padding-bottom: 100px;
}
h4 {
  padding-top: 10px;
  padding-left: 10px;
}
.main > .main-header > ul > li {
  list-style: none;
  display: inline-block;
  width: 250px;
  height: 100px;
  margin-right: 10px;
  border-radius: 10px;
  margin-left: 10px;
  margin-top: 20px;
  background-color: white !important;
  position: relative;
  background-color: white;
  box-shadow: 4px 4px 2px gray;
}
.ulDiv1,
.ulDiv2,
.ulDiv3,
.ulDiv4,
.ulDiv5 {
  width: 75px;
  height: 75px;
  border-radius: 6px;
  margin-top: 12px;
  margin-left: 12px;
  text-align: center;
  line-height: 75px;
  display: inline-block;
}
.ulDiv1 {
  background-color: #3a8af9;
}
.ulDiv2 {
  background-color: #f0747c;
}
.ulDiv3 {
  background-color: #54dd7a;
}
.ulDiv4 {
  background-color: #fda556;
}
.ulDiv5 {
  background-color: #9a2dff;
}
.iconfont {
  font-size: 40px;
}
.num {
  float: right;
  margin-right: 65px;
  display: inline-block;
  margin-top: 10px;
  font-size: 30px;
}
.numLang {
  float: right;
  display: inline-block;
  margin-right: 10px;
  position: absolute;
  top: 60px;
  left: 120px;
  font-size: 13px;
}
.el-icon-top-right {
  position: absolute;
  top: 15px;
  left: 220px;
  font-size: 22px;
  color: blue;
}
#first-left {
  display: inline-block;
  width: 630px;
  height: 440px;
  margin-top: 20px;
  margin-left: 30px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 10px 10px 5px gray;
  float: left;
}
#first-right {
  display: inline-block;
  width: 630px;
  height: 440px;
  margin-top: 20px;
  margin-left: 30px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 10px 10px 5px gray;
}
#second-left {
  display: inline-block;
  width: 630px;
  height: 440px;
  margin-top: 20px;
  margin-left: 30px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 10px 10px 5px gray;
  float: left;
}
#second-middle {
  display: inline-block;
  width: 290px;
  height: 440px;
  margin-top: 20px;
  margin-left: 30px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 8px 8px 4px gray;
}
#second-right {
  display: inline-block;
  width: 290px;
  height: 440px;
  margin-top: 20px;
  margin-left: 30px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 8px 8px 4px gray;
}
#second-left > h2,
#second-right > h2,
#second-middle > h2 {
  margin: 10px 0 0 20px;
}
</style>