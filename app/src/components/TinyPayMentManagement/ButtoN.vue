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
      this.url = value.url;
      this.type = value.type;
    });
    /* this.$bus.$on("inputValidata", (fn) => {
      fn();
    }); */
  },

  methods: {
    subSerch() {
      //触发input验证
      this.$bus.$emit("inputValidata", "submitForm");

      if (this.$store.state.zzl.isSub == true) {
        if (this.type == "selectOutpatient") {
          //门诊充值
          ////门诊消费
          this.getSelectData(
            this.url,
            {
              /* begintime: "2019-08-14 14:02:26",
          endtime: "2019-08-16 14:02:26",
          namecard: "5000909000", */
              endtime: this.$store.state.zzl.endtime,
              namecard: this.$store.state.zzl.input,
              begintime: this.$store.state.zzl.begintime,
            }

            //
          ).catch((err) => {
            console.log(err);
          });
          //点击按钮且发送请求，后清除当前时间框 输入框
          this.$store.commit("UPDATEINPUT", "");
          this.$store.commit("UPDATETIME", []);
          //清除页面残留的时间框 输入框
          this.$bus.$emit("dateEvent", "");
          this.$bus.$emit("inputEvent", "");
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

          //点击按钮且发送请求，后清除当前时间框 输入框
          this.$store.commit("UPDATEINPUT", "");
          this.$store.commit("UPDATETIME", []);
        } else {
          //退款
          //selectRefund
          this.getSelectData(this.url, {
            endtime: this.$store.state.zzl.endtime,
            namecard: this.$store.state.zzl.input,
            begintime: this.$store.state.zzl.begintime,
          }).catch((err) => {
            console.log(err);
          });
          //点击按钮且发送请求，后清除当前时间框 输入框
          this.$store.commit("UPDATEINPUT", "");
          this.$store.commit("UPDATETIME", []);
        }
      } else {
        alert("?");
      }
      //
    },
  },
};
</script>

<style lang="less" scoped>
</style>