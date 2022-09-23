<template>
  <div class="mg">
    <el-button type="primary" @click="subSerch">搜索</el-button>
  </div>
</template>

<script>
export default {
  name: "ButtoN",

  data() {
    return {
      serchData: "",
      url: "",
      type: "",
    };
  },

  /* mounted() {
    console.log("@1");
    //接收不同页面传递过来的搜索信息参数
    this.$bus.$on("updateSelect", (value) => {
      console.log("@2");

      console.log(value);
      this.serchData = value;
    });
  }, */
  mounted() {
    this.$bus.$on("updateSelect", (value) => {
      // debugger;
      console.log(value);
      this.url = value.url;
      this.type = value.type;
      console.log(this.type);
    });
  },

  methods: {
    subSerch() {
      //
      if (this.type == "selectOutpatient") {
        //门诊充值
        ////门诊消费
        this.getSelectData(this.url, {
          /* begintime: "2019-08-14 14:02:26",
          endtime: "2019-08-16 14:02:26",
          namecard: "5000909000", */
          endtime: this.$store.state.zzl.endtime,
          namecard: this.$store.state.zzl.input,
          begintime: this.$store.state.zzl.begintime,
        }).catch((err) => {
          console.log(err);
        });
      } else if (this.type == "selectHospitalization") {
        //住院充值
        //住院消费
        this.getSelectData(this.url, {
          endtime: this.$store.state.zzl.endtime,
          namehospitalcard: this.$store.state.zzl.input,
          begintime: this.$store.state.zzl.begintime,
        }).catch((err) => {
          console.log(err);
        });
      } /* else if (this.type == "selectHospitalization") {
        //住院消费
        this.getSelectData(this.url, {
          endtime: this.$store.state.zzl.endtime,
          namehospital: this.$store.state.zzl.input,
          begintime: this.$store.state.zzl.begintime,
        }).catch((err) => {
          console.log(err);
        });
      } else if (this.type == "selectOutpatient") {
        //门诊消费
        this.getSelectData(this.url, {
          endtime: this.$store.state.zzl.endtime,
          namecard: this.$store.state.zzl.input,
          begintime: this.$store.state.zzl.begintime,
        }).catch((err) => {
          console.log(err);
        });
      }  */ else {
        //退款
        //selectRefund
        this.getSelectData(this.url, {
          endtime: this.$store.state.zzl.endtime,
          namecard: this.$store.state.zzl.input,
          begintime: this.$store.state.zzl.begintime,
        }).catch((err) => {
          console.log(err);
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>