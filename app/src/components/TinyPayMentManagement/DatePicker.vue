<template>
  <div class="block mg">
    <el-date-picker
      ref="mydate"
      v-model="value"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: "DatePicker",

  data() {
    return {
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
      value: "",
    };
  },

  mounted() {
    this.reflash();
    this.$bus.$on("dateEvent", (value) => {
      this.value = value;
    });
  },

  methods: {
    reflash() {
      this.$store.commit("UPDATETIME", []);
    },
  },
  watch: {
    //获取时间框的值
    value: {
      handler(newv, oldv) {
        this.$store.commit("UPDATETIME", "");
        this.$store.commit("UPDATETIME", newv);
      },
    },
  },
};
</script>

<style lang="less" scoped>
</style>