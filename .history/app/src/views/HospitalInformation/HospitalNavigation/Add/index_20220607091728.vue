<!--  -->
<template>
  <el-dialog
    title="添加院区信息"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form">
      <el-form-item label="院区" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <div class="block">
        <span class="demonstration">地址</span>
        <el-cascader size="large" :options="form.options" v-model="form.selectedOptions">
        </el-cascader>
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
      <el-button @click="$emit('changeValue', false)">取 消</el-button>
      <el-button type="primary" @click="confirmAdd"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { regionData } from "element-china-area-data";
export default {
  name: "addHospitalNavigation",
  props: {
    dialogFormVisible: {
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
        options: regionData,
        selectedOptions: [],
        phone1: "",
        phone2: "",
        busLine: "",
      },

      formLabelWidth: "120px",
    };
  },
  methods: {

    //确定添加的回调
    confirmAdd(){
      
    }
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
.el-input__inner{
  margin-top: 20px !important;
}
.demonstration{
  padding-left: -10px;
}
</style>