<!--  -->
<template>
  <el-dialog
    title="修改院区信息"
    :visible.sync="dialogUpFormVisible"
    :before-close="onClose"
  >
    <el-form :model="form">
      <el-form-item label="院区" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <div class="block">
        <span class="demonstration">地址</span>
        <el-cascader v-model="form.value" :options="form.options"></el-cascader>
      </div>

      <el-form-item label="电话1" :label-width="formLabelWidth">
        <el-input v-model="form.phone1" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话2" :label-width="formLabelWidth">
        <el-input v-model="form.phone2" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="公交" :label-width="formLabelWidth">
        <el-input v-model="form.busLine" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('changeUpValue', false)">取 消</el-button>
      <el-button type="primary" @click="$emit('changeUpValue', false)"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "updateHospitalNavigation",
  props: {
    dialogUpFormVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      dialogTableVisible: false,
      form: {
        name: "",
        value: [],
        options: [
          {
            value: "beijing",
            label: "北京",
            children: [
              {
                value: "daxingqu",
                label: "大兴区",
              },
              {
                value: "yanqingqu",
                label: "延庆区",
              },
              {
                value: "huairouqu",
                label: "怀柔区",
              },
              {
                value: "miyunqu",
                label: "密云区",
              },
              {
                value: "pingguqu",
                label: "平谷区",
              },
              {
                value: "changpingqu",
                label: "昌平区",
              },
              {
                value: "fangshanqu",
                label: "房山区",
              },
              {
                value: "tongzhouqu",
                label: "通州区",
              },
              {
                value: "shunyiqu",
                label: "顺义区",
              },
              {
                value: "haidinqu",
                label: "海淀区",
              },
              {
                value: "fengtaiqu",
                label: "丰台区",
              },
              {
                value: "daohang",
                label: "导航",
                children: [
                  {
                    value: "cexiangdaohang",
                    label: "侧向导航",
                  },
                  {
                    value: "dingbudaohang",
                    label: "顶部导航",
                  },
                ],
              },
            ],
          },
          {
            value: "sichuansheng",
            label: "四川省",
            children: [
              {
                value: "chengdushi",
                label: "成都市",
                children: [
                  {
                    value: "jinjiangqu",
                    label: "锦江区",
                  },
                  {
                    value: "wenjiangqu",
                    label: "温江区",
                  },
                  {
                    value: "qingyangqu",
                    label: "青羊区",
                  },
                  {
                    value: "chenghuaqu",
                    label: "成华区",
                  },
                  {
                    value: "longquanyiqu",
                    label: "龙泉驿区",
                  },
                ],
              },
            ],
          },
        ],
        phone1: "",
        phone2: "",
        busLine: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    onClose() {
      this.$emit("changeUpValue", false);
    },
  },
};
</script>
<style lang='less' scoped>
.el-dialog__title {
  text-align: center;
}
.el-form > div {
  margin-left: 200px;
}
.block{
    margin-left: 292px !important;
}
.el-input__icon{
    height: 40px;
    margin-top: 20px;
}
</style>