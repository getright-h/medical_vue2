<template>
  <div id="box">
    <el-row class="pg-title">
      <el-col :span="11">
        <button class="btn"></button>
        <span> 预约挂号详情</span>
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
        <el-descriptions-item label="患者姓名">{{singleresifo.name}}</el-descriptions-item>
        <el-descriptions-item label="就诊卡号">{{singleresifo.medCard}}</el-descriptions-item>
        <el-descriptions-item label="微信昵称">{{singleresifo.nikNmae}}</el-descriptions-item>
        <el-descriptions-item label="证件类型">身份证</el-descriptions-item>
        <el-descriptions-item label="证件号码">{{singleresifo.idCard}}</el-descriptions-item>
        <el-descriptions-item label="关系">本人</el-descriptions-item>
        <el-descriptions-item label="手机号码">{{singleresifo.phone}}</el-descriptions-item>
        <el-descriptions-item label="就诊人地址">{{singleresifo.address}}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div id="bottom">
      <el-descriptions title="预约信息" :colon="false" class="title">
        <el-descriptions-item label="就诊医院">{{singleresifo.campName}}</el-descriptions-item>
        <el-descriptions-item label="医院地址">{{singleresifo.campAddress}}</el-descriptions-item>
        <el-descriptions-item label="就诊科室">{{singleresifo.departName}}</el-descriptions-item>
        <el-descriptions-item label="就诊医生">{{singleresifo.doctorName}}</el-descriptions-item>
        <el-descriptions-item label="医生职称">{{singleresifo.doctorProf}}</el-descriptions-item>
        <el-descriptions-item label="挂号类型">{{singleresifo.regType}}</el-descriptions-item>
        <el-descriptions-item label="门诊时间">{{singleresifo.waitTime}}</el-descriptions-item>
        <el-descriptions-item label="挂号费">{{singleresifo.money}}</el-descriptions-item>
        <el-descriptions-item label="预约时间">{{singleresifo.subTime}}</el-descriptions-item>
        <el-descriptions-item label="就诊状态">{{singleresifo.status}}</el-descriptions-item><br />
        <!-- <el-descriptions-item label="挂号备注">{{a}}</el-descriptions-item>     -->
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
      a:'',
      singleresifo:{},
    };
  },
  methods: {
    //保存备注信息
     async save(){
      //  console.log('备注号',this.singleresifo.subId);
      let ifo={
        remark:this.input,
        subId:this.singleresifo.subId,
      }
       let result = await this.$API.addRegisterRemark(ifo);
      console.log('备注',result);
      if(result.code==200){
          this.$message({
            type: "success",
            message: "保存成功!",
          });
            this.$router.push('/bookregister')
      }else{
           this.$message({
            type: "warning",
            message: "保存失败!",
          });
      }
     },
     del(){
         this.$router.push('/bookregister')
     }
    
  },
  created(){
     //获取单条预约详情
    // this.singleresifo=this.$store.state.registerifo 
    // console.log( 'aaa',this.singleresifo);
    this.$bus.$on('demo',async(data)=>{
      let result = await this.$API.reqRegisterSingleInfo(data)
      console.log('aaaaa',result);
      if(result.code == 200){
        this.singleresifo = result.data[0]
        console.log( this.singleresifo);
      }
    })
  },
  beforeDestroy(){
    this.$bus.$off('demo')
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
  width: 150px;
  margin-bottom: 10px;
}
#top {
  width: 100%;
  height: auto;
  /* border: 1px solid red; */
  background-color: #ffffff;
  box-shadow: 10px 10px 5px 1px #6e6f70;
  box-sizing: border-box;
  padding: 20px 20px;
}
#bottom {
  width: 100%;
  height: auto;
  /* border: 1px solid red; */
  background-color: #ffffff;
  margin-top: 50px;
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