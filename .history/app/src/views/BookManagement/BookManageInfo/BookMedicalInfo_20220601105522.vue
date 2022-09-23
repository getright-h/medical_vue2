<template>
  <div id="box">
    <el-row class="pg-title">
      <el-col :span="12">
        <button class="btn"></button>
        <span> 预约体检详情</span>
      </el-col>
      <el-col :span="12" class="text-right">
        <el-upload
          style="display: inline-block; margin-right: 10px"
          class="upload-demo"
          action="http://1.14.173.156:8080/admin/registration/uploadExcel"
          :auto-upload="true"
          :show-file-list="false"
          
        >
          <!-- <el-button class="btn1">导入</el-button> -->
        </el-upload>
        <!-- <el-button @click="toLead" class="btn1">导入</el-button> -->
        <!-- <el-button @click="exportFile" class="btn1">导出</el-button> -->
      </el-col>
    </el-row>
    <div id="top">
      <el-descriptions title="体检人信息" :colon="false" class="title">
        <el-descriptions-item label="患者姓名"></el-descriptions-item>
        <el-descriptions-item label="就诊卡号"></el-descriptions-item>
        <el-descriptions-item label="患者头像">
          <el-avatar :size="sizeList[1]" :src="circleUrl"></el-avatar>
        </el-descriptions-item>
        <el-descriptions-item label="证件类型"> </el-descriptions-item>
        <el-descriptions-item label="证件号码"></el-descriptions-item>
        <el-descriptions-item label="关系"></el-descriptions-item>
        <el-descriptions-item label="手机号码"></el-descriptions-item>
        <el-descriptions-item label="就诊人地址"></el-descriptions-item>
      </el-descriptions>
    </div>
    <div id="bottom">
      <el-descriptions title="预约信息" :colon="false" class="title">
        <el-descriptions-item label="就诊医院"></el-descriptions-item>
        <el-descriptions-item label="医院地址"></el-descriptions-item>
        <el-descriptions-item label="报道科室"></el-descriptions-item>
        <el-descriptions-item label="体检套餐"></el-descriptions-item>
        <el-descriptions-item label="体检费费"></el-descriptions-item>
        <el-descriptions-item label="预约时间"></el-descriptions-item>
        <el-descriptions-item label="状态"></el-descriptions-item>
        <el-descriptions-item label="报告时间"></el-descriptions-item>
        <el-descriptions-item label="预约备注">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <el-button type="primary">保存</el-button>
          <el-button type="primary" plain>取消</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: ["large", "medium", "small"],
      input:'',
    };
  },
};
</script>
<style  scoped lang="less">
  /deep/#box{
  width: 100%;
  height: 100vh;
}
.btn {
  background-color: #197bfe;
  height: 10px;
  width: 30px;
  border: 0px;
  border-radius: 5px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
.pg-title {
  height: 70px;
  line-height: 70px;
  font-size: 24px;
}
.el-input__inner {
  width: 120px !important;
}
#top {
  width: 100%;
  height: auto;
  /* border: 1px solid red; */
   background-color: #FFFFFF;
   box-shadow:10px 10px 5px 1px #6e6f70;
  box-sizing: border-box;
  padding: 20px 20px;
}
#bottom {
  width: 100%;
  height: auto;
  /* border: 1px solid red; */
  margin-top: 50px;
   background-color: #FFFFFF;
   box-shadow:10px 10px 5px 1px #6e6f70;
  box-sizing: border-box;
  padding: 20px 20px;
}
.title {
  color: #006eff !important;
}
</style>