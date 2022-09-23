<template>
  <!-- RecordingSlot :style="tableHeight" -->
  <div class="root" :style="tableHeight">
    <div class="mytitle">
      <slot name="mytitle">title</slot>
    </div>
    <div class="content">
      <!--  -->

      <div class="top">
        <div class="myinput fsb">
          <slot name="myinput">input</slot>
        </div>
      </div>
      <div class="main">
        <div class="mytable">
          <slot name="mytable"> this is not a table </slot>
        </div>
      </div>
      <div class="footer gg">
        <div class="mypage fsb">
          <slot name="mypage"> 1 3 </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecordingSlot",

  data() {
    return {
      //
      passMeta: "",
      foo: "",
    };
  },

  mounted() {
    this.foo = window.addEventListener("resize", this.bar);
  },
  computed: {
    tableHeight() {
      return {
        height: this.foo,
        width: "100%",
      };
    },
  },

  methods: {
    bar() {
      this.foo = window.document.documentElement.clientHeight - 60 + "px";
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 0 40px;
  // width: 1000px;
  // height: calc(100vh - 60px);
  position: relative;

  border-radius: 8px;
  box-shadow: 0px 0px 20px rgb(215 215 215);
  background: rgb(255, 255, 255);
}

//结构伪类设置前置的蓝色小块
.mytitle {
  margin-left: 74px;
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
  // height: calc(100vh - 60px);
}
.mypage {
  margin: 30px;
  justify-content: center;
}
.root {
  background: pink;
}
// main
</style>