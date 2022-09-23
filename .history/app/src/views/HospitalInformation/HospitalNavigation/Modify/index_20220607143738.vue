<template>
  <el-dialog title="修改院区信息" :visible.sync="dialogUpFormVisible">
    <el-form :model="form">
      <el-form-item label="院区" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" readonly  ></el-input>
      </el-form-item>
      <div class="block">
        <span class="demonstration">地址</span>
        <el-cascader
          size="large"
          :options="form.upOptions"
          v-model="form.upSelectedOptions"
        >
        </el-cascader>
      </div>
      <el-form-item label="电话1" :label-width="formLabelWidth">
        <el-input v-model="form.phone1" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="公交" :label-width="formLabelWidth">
        <el-input v-model="form.busLine" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('changeUpValue', false)">取 消</el-button>
      <el-button type="primary" @click="confirmUpdate">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { regionData } from "element-china-area-data";
export default {
  name: "updateHospitalNavigation",
  props: {
    dialogUpFormVisible: {
      type: Boolean,
      default: false,
    },
    thisData:{
      type: Object,
    }
  },

  data() {
    return {
      dialogTableVisible: false,
      form: {
        upOptions: regionData,
        upSelectedOptions: [],
        name: "",
        phone1: "",
        busLine: "",
        readonly: true
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    async confirmUpdate() {
      const { name, upSelectedOptions, phone1, busLine, upOptions } = this.form;
      const thisProvince = upOptions.find((item) => {
        if (item.value === upSelectedOptions[0]) {
          return item;
        }
      });
      const thisCity = thisProvince.children.find((item) => {
        if (item.value === upSelectedOptions[1]) {
          return item;
        }
      });
      const thisCounty = thisCity.children.find(
        (item) => item.value === upSelectedOptions[2]
      ).label;
      let lastAddress = thisProvince.label + "/" + thisCity.label + "/" + thisCounty;
      let data = {
        address: lastAddress,
        bus: busLine,
        campus: name,
        phone1: phone1,
      };
      let result = await this.$API.reqUpdateHospitalNav(data);
      if (result.code == 200) {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: "<strong>修改成功</strong>",
        });
        this.$emit('changeValue')
      } else {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: "<strong>修改失败</strong>",
        });
      }
    },
  },
  mounted() {
    //获取修改弹框的默认值
    this.$bus.$on("getDefault", (thisData) => {
      const { phone1,address,campus,bus } = thisData;
      console.log(thisData);
      const { upOptions } = this.form;
      console.log(address.split("/")[0]);
      const thisProvinceNum = upOptions.find((item) => {
        if (item.label == address.split("/")[0]) {
          return item;
        }
      });
      console.log(thisProvinceNum);
      const thisUpCity = thisProvinceNum.children.find((item) => {
        if (item.label === address.split("/")[1]) {
          return item;
        }
      });
      const thisCounty = thisUpCity.children.find(
        (item) => item.label === address.split("/")[2]
      ).value;
      let thisUpSelectedOptions = [];
      thisUpSelectedOptions.push(thisProvinceNum.value)
      thisUpSelectedOptions.push(thisUpCity.value)
      thisUpSelectedOptions.push(thisCounty)
      console.log('12312312',thisUpSelectedOptions);
      this.form.name = campus;
      this.form.phone1 = phone1;
      this.form.busLine = bus;
      this.form.upSelectedOptions = thisUpSelectedOptions;
    });
  },
};
</script >
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
</style>