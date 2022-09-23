<template>
  <div class="foo">
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: ["title"],

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.foo {
  margin: 20px;
}
</style>