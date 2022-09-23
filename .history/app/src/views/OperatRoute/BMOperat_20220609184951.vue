<template>
  <div class="root">
    <div class="mytitle">
      <h2>{{ info.title }}</h2>
    </div>
    <!-- 患者信息都是一样的 -->
    <div class="content">
      <el-descriptions class="margin-top" title="订单信息" :column="3">
        <el-descriptions-item label="患者姓名">{{
          patientmsg.name
        }}</el-descriptions-item>
        <el-descriptions-item label="就诊卡号">{{
          patientmsg.medcard_card
        }}</el-descriptions-item>
        <el-descriptions-item label="患者头像" :span="2">
          <!-- 网络图片 -->
          <!-- {{patientmsg.pic_url}} -->
          <!-- <div class="avatar">avatar</div> -->
          <div class="block">
            <el-avatar :size="30" :src="patientmsg.pic_url"></el-avatar>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="证件类型">{{
          patientmsg.type
        }}</el-descriptions-item>
        <el-descriptions-item label="证件号码">{{
          patientmsg.id_card
        }}</el-descriptions-item>
        <el-descriptions-item label="关系">{{
          relationship
        }}</el-descriptions-item>
        <el-descriptions-item label="微信昵称">{{
          patientmsg.nickname
        }}</el-descriptions-item>
        <el-descriptions-item label="手机号码">{{
          patientmsg.phone
        }}</el-descriptions-item>
        <el-descriptions-item label="就诊人地址">{{
          patientmsg.address
        }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- 订单信息 -->
    <!-- 门诊消费页 -->
    <div class="content" v-if="info.options == 'outpatientConsumption'">
      <el-descriptions class="margin-top" title="订单信息" :column="3">
        <el-descriptions-item label="订单总额">{{
          ordermsg.money
        }}</el-descriptions-item>
        <el-descriptions-item label="支付方式">{{
          ordermsg.pmode
        }}</el-descriptions-item>
        <el-descriptions-item label="卡内余额">{{
          ordermsg.balance
        }}</el-descriptions-item>
        <el-descriptions-item label="订单状态">{{
          ordermsg.status
        }}</el-descriptions-item>
        <el-descriptions-item label="订单编号">{{
          ordermsg.order_num
        }}</el-descriptions-item>
        <el-descriptions-item label="取消时间">{{
          ordermsg.time
        }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="订单备注">
          <el-input
            id="inpt"
            v-model="input"
            placeholder="请输入内容"
          ></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="zhang3">
        <el-descriptions-item label="">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="cancle">取消</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 门诊充值 -->
    <div class="content" v-if="info.options == 'outpatientRecharge'">
      <el-descriptions class="margin-top" title="订单信息" :column="3">
        <el-descriptions-item label="充值总额">{{
          ordermsg.money
        }}</el-descriptions-item>
        <el-descriptions-item label="支付方式">{{
          ordermsg.pmode
        }}</el-descriptions-item>
        <el-descriptions-item label="卡内余额">{{
          ordermsg.balance
        }}</el-descriptions-item>
        <el-descriptions-item label="订单状态">{{
          ordermsg.status
        }}</el-descriptions-item>
        <el-descriptions-item label="订单编号">{{
          ordermsg.order_num
        }}</el-descriptions-item>
        <el-descriptions-item label="订单来源">{{
          ordermsg.from
        }}</el-descriptions-item>
        <el-descriptions-item label="业务类型">{{
          ordermsg.btype
        }}</el-descriptions-item>
        <el-descriptions-item label="订单时间">{{
          ordermsg.time
        }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="订单备注">
          <el-input
            id="inpt"
            v-model="input"
            placeholder="请输入内容"
          ></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="zhang3">
        <el-descriptions-item label="">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="cancle">取消</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- 住院消费 -->
    <!-- issue:返回字段不符 -->
    <div class="content" v-if="info.options == 'hospitaLization'">
      <el-descriptions class="margin-top" title="订单信息" :column="3">
        <el-descriptions-item label="订单总额">{{
          ordermsg.money
        }}</el-descriptions-item>
        <el-descriptions-item label="支付方式">{{
          ordermsg.pmode
        }}</el-descriptions-item>
        <el-descriptions-item label="押金余额">{{
          ordermsg.balance
        }}</el-descriptions-item>
        <el-descriptions-item label="订单状态">{{
          ordermsg.status
        }}</el-descriptions-item>
        <el-descriptions-item label="订单编号">{{
          ordermsg.order_num
        }}</el-descriptions-item>
        <el-descriptions-item label="结算时间">{{
          ordermsg.time
        }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="订单备注">
          <el-input
            id="inpt"
            v-model="input"
            placeholder="请输入内容"
          ></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="zhang3">
        <el-descriptions-item label="">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="cancle">取消</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- 住院充值 -->
    <div class="content" v-if="info.options == 'hospitalizationRecharge'">
      <el-descriptions class="margin-top" title="订单信息" :column="3">
        <el-descriptions-item label="充值金额">{{
          ordermsg.money
        }}</el-descriptions-item>
        <el-descriptions-item label="支付方式">{{
          ordermsg.pmode
        }}</el-descriptions-item>
        <el-descriptions-item label="住院余额">{{
          ordermsg.balance
        }}</el-descriptions-item>
        <el-descriptions-item label="订单状态">{{
          ordermsg.status
        }}</el-descriptions-item>
        <el-descriptions-item label="订单编号">{{
          ordermsg.order_num
        }}</el-descriptions-item>
        <el-descriptions-item label="订单时间">{{
          ordermsg.time
        }}</el-descriptions-item>
        <el-descriptions-item label="订单来源">{{
          ordermsg.from
        }}</el-descriptions-item>
        <el-descriptions-item label="业务类型">{{
          ordermsg.btype
        }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="订单备注">
          <el-input
            id="inpt"
            v-model="input"
            placeholder="请输入内容"
          ></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="zhang3">
        <el-descriptions-item label="">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="cancle">取消</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- 退款记录 -->
    <div class="content" v-if="info.options == 'refundHistory'">
      <el-descriptions class="margin-top" title="订单信息" :column="3">
        <el-descriptions-item label="退款金额">{{
          ordermsg.money
        }}</el-descriptions-item>
        <el-descriptions-item label="退回途径">{{
          ordermsg.pmode
        }}</el-descriptions-item>
        <el-descriptions-item label="卡内余额">{{
          ordermsg.balance
        }}</el-descriptions-item>
        <el-descriptions-item label="退款状态">{{
          ordermsg.status
        }}</el-descriptions-item>
        <el-descriptions-item label="退款编号">{{
          ordermsg.order_num
        }}</el-descriptions-item>
        <el-descriptions-item label="退款时间">{{
          ordermsg.time
        }}</el-descriptions-item>
        <el-descriptions-item label="来源">{{
          ordermsg.from
        }}</el-descriptions-item>
        <el-descriptions-item label="业务类型">{{
          ordermsg.type
        }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="订单备注">
          <el-input
            id="inpt"
            v-model="input"
            placeholder="请输入内容"
          ></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="zhang3">
        <el-descriptions-item label="">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="cancle">取消</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
export default {
  //路由传参
  props: ["info", "url", "data", "remarkurl"],
  name: "BMOperat",

  data() {
    return {
      avatar:
        "http://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      input: "",
      tableDetail: {},
      ordermsg: {},
      patientmsg: {},
      //fakedata 传递过来的查询操作页面的请求字段
      wuhu: {
        order_num: "JF2020081900098",
        medcard: "5000909000",
      },
      //关系字段 暂时写死
      relationship: "本人",
    };
  },

  mounted() {
    console.log(this.$route, "~");
    // 获取渲染的数据，从plugins中获取
    this.getTableData2(this.url, this.data);
    // this.getTableData2(this.url, this.wuhu);

    //触发操作页面组件的tableDetail更新
    this.$bus.$on("tragger2", (foo) => {
      console.log(foo);
      this.tableDetail = this.$store.state.zzl.tableDetail;
      this.ordermsg = this.$store.state.zzl.tableDetail.ordermsg;
      this.patientmsg = this.$store.state.zzl.tableDetail.patientmsg;

      //把remark备注渲染到input框
      this.input = this.$store.state.zzl.tableDetail.ordermsg.remark;
    });
  },

  methods: {
    //提交保存的备注
    save() {
      this.updateRemark(this.remarkurl, {
        remark: this.input,
        order_num: this.ordermsg.order_num,
      });
      //回退
      // this.$router.back();
    },
    //取消input内容，跳回上一页
    cancle() {
      //
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
//消除默认的冒号
/deep/ .zhang3 .el-descriptions-item__label::after {
  content: "";
}
/deep/ .el-descriptions-item__label {
  width: 100px !important;
}
/deep/ #inpt {
  width: 200px;
}
/deep/ .el-descriptions__body {
  padding: 20px;
}
/deep/ .el-descriptions-item__cell {
  padding-bottom: 30px !important;
}
.content {
  margin: 10px 40px;
  // padding: 20px;
  width: 1000px;
  // position: relative;
  border-radius: 8px;
  box-shadow: 0px 0px 20px rgb(215 215 215);
}
/deep/ .el-descriptions {
  border-radius: 8px;
}
/deep/ .el-descriptions__header {
  background: rgba(242, 242, 242, 1);
  color: blue;
  height: 30px;
  line-height: 30px;
  padding: 5px;
}
/deep/ .el-descriptions__title {
  font-size: 16px;
  font-weight: 300;
}
//结构伪类设置前置的蓝色小块
.mytitle {
  margin-left: 74px;
}
.mytitle h2 {
  margin: 15px;
}
.mytitle::before {
  content: "";
  display: block;
  width: 24px;
  height: 8px;
  background-color: rgba(0, 110, 255, 1);
  border-radius: 4px;
  position: absolute;
  left: 42px;
  top: 11px;
}
.root {
  position: relative;
}
</style>