<template>
  <div id="box">
    <el-row class="pg-title">
      <el-col :span="11">
        <button class="btn"></button>
        <span> 预约核酸检测详情</span>
      </el-col>
      <el-col :span="11" class="text-right">
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
      <el-descriptions title="患者信息" :colon="false" class="title">
        <el-descriptions-item label="患者姓名">{{singleinfo.name}}</el-descriptions-item>
        <el-descriptions-item label="就诊卡号">{{singleinfo.medCard}}</el-descriptions-item>
        <el-descriptions-item label="微信昵称">{{singleinfo.nikNmae}} </el-descriptions-item>    
        <el-descriptions-item label="证件类型">身份证</el-descriptions-item>
        <el-descriptions-item label="证件号码">{{singleinfo.idCard}}</el-descriptions-item>
        <el-descriptions-item label="关系">本人</el-descriptions-item>
        <el-descriptions-item label="手机号码">{{singleinfo.phone}}</el-descriptions-item>
        <el-descriptions-item label="就诊人地址">{{singleinfo.address}}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div id="bottom">
      <el-descriptions title="预约信息" :colon="false" class="title">
        <el-descriptions-item label="就诊医院">{{singleinfo.campName}}</el-descriptions-item>
        <el-descriptions-item label="医院地址">{{singleinfo.campAddress}}</el-descriptions-item>
        <el-descriptions-item label="就诊科室">{{singleinfo.departName}}</el-descriptions-item>
        <el-descriptions-item label="就诊医生"> {{singleinfo.doctorName}}</el-descriptions-item>
        <el-descriptions-item label="医生职称">{{singleinfo.doctorProf}}</el-descriptions-item>
        <el-descriptions-item label="挂号类型">{{singleinfo.regType}}</el-descriptions-item>
        <el-descriptions-item label="门诊时间">{{singleinfo.waitTime}}</el-descriptions-item>
        <el-descriptions-item label="检测费">{{singleinfo.money}}</el-descriptions-item>
        <el-descriptions-item label="预约时间">{{singleinfo.subTime}}</el-descriptions-item>
        <el-descriptions-item label="状态">{{singleinfo.status}}</el-descriptions-item>
        <el-descriptions-item label="检测时间">{{singleinfo.doTime}}</el-descriptions-item>
      </el-descriptions>
      <el-input v-model="input" placeholder="请输入备注内容"></el-input>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" plain @click="del">取消</el-button>
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
      input: "",
      singleinfo:{},
      subId:null
    };
  },
 created(){
      //  this.singleinfo=this.$store.state.natifo
      this.$bus.$on('demo1',async(data)=>{
      let result = await this.$API.reqNatSingleInfo(data)
      console.log('res',result);
      if(result.code == 200){
        this.singleinfo = result.data[0]
         this.subId=this.singleinfo.subId
         console.log('d', this.subId);
      }
    })
  },
  beforeDestroy(){
      this.$bus.$off('demo1')
  },
  methods:{
     //添加备注信息
    async save(){
       let ifo = {
         remark:this.input,
         subId:this.subId
       }
       let result = await this.$API.addNatRemark(ifo);
      console.log('备注',result);
      if(result.code==200){
          this.$message({
            type: "success",
            message: "保存成功!",
          });
            this.$router.push('/booknat')
      }else{
           this.$message({
            type: "warning",
            message: "保存失败!",
          });
      }
     },
     del(){
         this.$router.push('/booknat')
     }
    
  }
};
</script>
<style  scoped lang='less'>
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
/deep/.el-input__inner {
  width: 150px ;
  margin-bottom: 10px;
}
#top {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  box-shadow: 10px 10px 5px 1px #6e6f70;
  box-sizing: border-box;
  padding: 20px 20px;
  /* border: 1px solid red; */
}
#bottom {
  width: 100%;
  height: auto;
  /* border: 1px solid red; */
  margin-top: 50px;
  background-color: #ffffff;
  box-shadow: 10px 10px 5px 1px #6e6f70;
  box-sizing: border-box;
  padding: 20px 20px;
}
.title {
  color: #006eff !important;
}
#box {
  width: 100%;
  height: 100vh;
}
</style>