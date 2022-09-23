<!--  -->
<template>
  <el-dialog title="添加院区信息" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="院区" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <div class="block">
        <span class="demonstration">地址</span>
        <el-cascader
          size="large"
          :options="form.options"
          v-model="form.selectedOptions"
        >
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
      <el-button type="primary" @click="confirmAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
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
    async confirmAdd() {
      const { name, selectedOptions, phone1, phone2, busLine, options } = this.form;
      //原始遍历获取地址模块的值
      // const thisProvince = options.find((item) => {
      //   if (item.value === selectedOptions[0]) {
      //     return item;
      //   }
      // });
      // const thisCity = thisProvince.children.find((item) => {
      //   if (item.value === selectedOptions[1]) {
      //     return item;
      //   }
      // });
      // const thisCounty =thisCity.children.find(item => item.value === selectedOptions[2]).label
      // let lastAddress = thisProvince.label + "/" + thisCity.label + "/" + thisCounty;

      //利用自带的CodeToText 方法的直接获取name
      let startAddress = "";
      selectedOptions.map((item) => (startAddress += CodeToText[item] + "/"));
      let index = startAddress.lastIndexOf("/")
      let lastAddress = startAddress.substring(0,index+1)
      console.log(index);
      console.log(lastAddress);
      let data = {
        address: lastAddress,
        bus: busLine,
        campus: name,
        phone1: phone1,
        phone2: phone2,
      };
      console.log(data);
      if (
        name != "" &&
        selectedOptions != "" &&
        phone1 != "" &&
        phone2 != null &&
        busLine != ""
      ) {
        let result = await this.$API.reqAddHospitalNav(data);
        if (result.code == 200) {
          this.$message({
            dangerouslyUseHTMLString: true,
            message: "<strong>添加成功</strong>",
          });
          this.$emit("changeValue", false);
        } else {
          this.$message({
            dangerouslyUseHTMLString: true,
            message: "<strong>添加失败</strong>",
          });
          this.$emit("changeValue", false);
        }
      } else {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: "<strong>信息输入不全，请检查</strong>",
        });
      }
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
.block {
  margin-left: 292px !important;
}
.el-input__icon {
  height: 40px;
  margin-top: 20px;
}
/deep/.el-dialog__body {
  padding-right: 250px;
}
</style>