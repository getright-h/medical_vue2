<template>
  <div class="block mg">
    <el-cascader
      v-model="value"
      :options="options"
      @change="handleChange"
    ></el-cascader>
  </div>
</template>

<script>
export default {
  name: "CasCader",

  data() {
    return {
      value: [],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
            },
            {
              value: "daohang",
              label: "导航",
            },
            {
              value: "daohang",
              label: "导航",
            },
            {
              value: "daohang",
              label: "导航",
            },
          ],
        },
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
            },
            {
              value: "daohang",
              label: "导航",
            },
            {
              value: "daohang",
              label: "导航",
            },
            {
              value: "daohang",
              label: "导航",
            },
          ],
        },
      ],
    };
  },

  mounted() {},

  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="less" scoped>
</style>