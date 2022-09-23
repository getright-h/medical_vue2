/* eslint-disable vue/multi-word-component-names */
<template>
  <div class="pagination">
    <button @click="$emit('getPageNo', pageNo - 1)" :disabled="pageNo == 1">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>
    <!-- 连续页码 -->
    <span v-for="(page, index) in startNumAndEndNum.end" :key="index"
      ><button
        :class="{ active: pageNo == page }"
        v-if="page >= startNumAndEndNum.start"
        @click="$emit('getPageNo', page)"
      >
        {{ page }}
      </button></span
    >
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      :class="{ active: pageNo == totalPage }"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      @click="$emit('getPageNo', pageNo + 1)"
      :disabled="pageNo == totalPage"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues","showData"],
  computed: {
    //计算一共多少页
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算连续页
    startNumAndEndNum() {
      //连续页的初始页和结束页
      let start = 0;
      let end = 0;

      //不正常情况，总页数没有连续页码多
      if (this.continues > this.total) {
        start = 1;
        end = this.totalPage;
      } else {
        //正常情况

        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        //不正常情况，当前开始页小于1  [0,-1]
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        //不正常情况 end页大于总页数
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.pageNo - this.continues + 1;
        }
      }
      return { start, end };
    },
    mounted () {
      console.log(this.showData);
    }
  },
};
</script>

<style lang="less" scoped>
.pagination {
  .active {
    background-color: skyblue;
  }
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>