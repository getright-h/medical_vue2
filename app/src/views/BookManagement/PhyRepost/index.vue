<template>
  <el-dialog  :visible="isShowRepost" width="70%"
  @close="closerepost">
    <div id="top">
      <div id="t-content">
        <el-descriptions title="体检人信息" class="title1" :colon='false'>
          <el-descriptions-item label="姓名">{{allifo.name}}</el-descriptions-item>
          <el-descriptions-item label="性别">{{allifo.sex}}</el-descriptions-item>
          <el-descriptions-item label="年龄">{{allifo.age}}</el-descriptions-item>
          <el-descriptions-item label="证件号码">{{allifo.idCard}}</el-descriptions-item>
          <el-descriptions-item label="套餐名称"
            >{{allifo.comboName}}</el-descriptions-item
          >
          <el-descriptions-item label="报告时间">{{allifo.reportTime}}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <div id="bottom">
      <p class='title1'>报告详情</p>
      <ul id="b-content" class="clear">
        <li>
          <h3>常规检查</h3>
          <el-table :data="gridData1">
            <el-table-column
              property="proname1"
              label="项目名称"
              width="150"
            ></el-table-column>
            <el-table-column
              property="name1"
              label="检查结果"
              width="200"
            ></el-table-column>
            <el-table-column property="address" label="参考值"></el-table-column>
          </el-table>
        </li>
        <li>
          <h3>血常规三项</h3>
          <el-table :data="gridData2">
            <el-table-column
              property="proname2"
              label="项目名称"
              width="150"
            ></el-table-column>
            <el-table-column
              property="name2"
              label="检验值"
              width="200"
            ></el-table-column>
            <el-table-column property="address" label="参考范围"></el-table-column>
          </el-table>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: ["isShowRepost",'allifo'],
  data() {
    return {

      gridData1: [
        {
          proname1: "身高",
          name1:'160cm',
        
        },
        {
          proname1: "体重",
          name1: "50kg",
        
        },
        {
          proname1: "BMI",
          name1: "19.0",
          address: "18.5-22.9",
        },
        {
          proname1: "血压（收缩压）",
          name1: "100",
          address: "90-140",
        },
        {
          proname1: "血压（舒张压）",
          name1: "80",
          address: "60-90",
        },

      ],
      gridData2: [
        {
          proname2: "血红蛋白",
          name2: "300g/L",
          address: "参考范围：115-150g/L",
        },
        {
          proname2: "红细胞",
          name2: "300g/L",
          address: "参考范围：115-150g/L",
        },
        {
          proname2: "血小板",
          name2: "300g/L",
          address:  "参考范围：115-150g/L",
        },
        {
          proname2: "单核细胞绝对值",
          name2: "300g/L",
          address:  "参考范围：115-150g/L",
        },
        {
          proname2: "淋巴细胞绝对值",
          name2:"300g/L",
          address: "参考范围：115-150g/L",
        },
        {
          proname2: "淋巴细胞百分比",
          name2: "300g/L",
          address:  "参考范围：115-150g/L",
        },
        {
          proname2: "平均红细胞体积",
          name2: "300g/L",
          address: "参考范围：115-150g/L",
        },

      ],
    };
  },
  methods:{
    closerepost(){
       this.$emit('closerepost')
    }
  }
};
</script>
<style scoped lang='less'>
#top,
#bottom {
  width: 100%;
  // height: 50%;
  // border: 1px solid red;
    box-shadow:10px 10px 5px 1px #d3d5d8;
}
#top {
  margin-bottom: 20px;
  height: 150px;
   box-shadow:10px 10px 5px 1px #d3d5d8;
}
#bottom{
  height: 600px;
  padding-bottom: 20px;
}
.clear::after {
  content: "";
  display: block;
  clear: both;
}
ul > li {
  list-style: none;
  width: 45%;
  // border: 1px solid blue;
  float: left;
  margin-left: 50px;
  margin-top: 20px;
}
.title1{
  width: 100%;
  height: 50px;
  color: #006EFF;
  // font-size: 20px;
  background-color: #F2F2F2;
  padding-left: 10px;
  line-height: 50px;
  box-sizing: border-box;
  
}
#bottom>.title1{
  font-weight: 500;
  font-size: 18px;
}
h3{
  text-align: center;
  width: 100%;
  margin: 20px 0;
  height: 30px;
  line-height: 30px;
}
</style>