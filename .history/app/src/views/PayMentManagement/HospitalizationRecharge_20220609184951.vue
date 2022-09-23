<template>
  <recording-slot>
    <template v-slot:>
      <!--  -->
    </template>
    <template v-slot:mytitle>
      <!-- title -->
      <Title title="住院充值记录" />
    </template>
    <template v-slot:myinput>
      <!-- input -->
      <date-picker></date-picker>
      <InPut />
      <ButtoN />
    </template>
    <template v-slot:mytable>
      <div>
        <!-- table -->
        <el-table
          :header-cell-style="headStyle"
          :cell-style="rowStyle"
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="time" label="操作时间" width="120">
          </el-table-column>
          <el-table-column prop="order_num" label="订单号" width="120">
          </el-table-column>
          <el-table-column prop="name" label="患者姓名" width="120">
          </el-table-column>
          <el-table-column prop="medcard" label="就诊卡号" width="120">
          </el-table-column>
          <el-table-column prop="hospital" label="住院号" width="120">
          </el-table-column>
          <el-table-column prop="from" label="来源" width="120">
          </el-table-column>
          <el-table-column prop="btype" label="业务类型" width="120">
          </el-table-column>
          <el-table-column prop="pmode" label="支付方式" width="120">
          </el-table-column>
          <el-table-column prop="money" label="支付金额" width="120">
          </el-table-column>
          <el-table-column prop="status" label="缴费状态" width="120">
          </el-table-column>
          <el-table-column prop="balance" label="卡内余额" width="120">
          </el-table-column>
          <el-table-column label="操作">
            <!-- test -->
            <template slot-scope="scope">
              <el-button @click="fn(scope.row)" type="text" size="small"
                >操作</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <template v-slot:mypage>
      <!-- page -->
      <Pagination
        :pageNo="pageNo"
        :pageSize="pageSize"
        :total="navInfo.length"
        :continues="continues"
        :showData="navInfo"
        @getPageNo="getPageNo"
        @getFinishDate="getFinishDate"
      />
    </template>
  </recording-slot>
</template>

<script>
export default {
  name: "HospitalizationRecharge",
  components: {},
  data() {
    return {
      tableData: [],
      navInfo: this.$store.state.zzl.tableData, //传给子组件用于分页处理的原始数据
      pageNo: 1, //当前页
      pageSize: 2, //每一页多少条数据
      continues: 5, //分页器 下方连续页码
    };
  },

  mounted() {
    //页面初始渲染时调用(即，自动发送 getTableData 请求时，触发其自定义事件总线 tragger0 )
    this.$bus.$on("tragger0", () => {
      //遍历每一项，改变其中的status值
      this.tableData.forEach((item) => {
        if (item.status == 0) {
          item.status = "未支付";
        } else {
          item.status = "已支付";
        }
      });
    });
    //触发初始化页面组件的tabledata更新
    this.$bus.$on("tragger", () => {
      this.navInfo = this.$store.state.zzl.tableData;
    });
    // 获取渲染的数据，从plugins中获取
    this.getTableData("/rerecord/queryHospitalization");
    //

    //传递给对应搜索按钮组件的信息 包括展示内容 请求地址
    this.$bus.$emit("updateSelect", {
      //
      // namehospital: this.$store.state.zzl.input,
      // time: this.$store.state.zzl.time,
      type: "selectHospitalization",
      url: "/rerecord/selectHospitalization",
    });
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
    headStyle() {
      return "text-align:center";
    },
    rowStyle() {
      return "text-align:center";
    },
    //test 传递meta判断是哪来的路由将要操作operat
    //且携带当前一项的卡号信息
    fn({ medcard, order_num }) {
      //函数参数的解构赋值
      //获取 对应的当前项信息
      let operatData = {
        medcard,
        order_num,
      };

      //跳转
      this.$router.push({
        name: "BMOperat",
        params: {
          info: this.$route.meta,
          //操作接口的地址
          url: "/rerecord/oderDetails1",
          remarkurl: "/rerecord/updateHosremark",
          //当前记录的专属信息 refs 遍历获取当前节点的对应数据
          data: operatData,
        },
      });
    },
  },
};
</script>

<style scoped>
</style>
