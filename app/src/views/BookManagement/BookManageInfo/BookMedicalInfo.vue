<template>
  <div id="box">
    <el-row class="pg-title">
      <el-col :span="11">
        <button class="btn"></button>
        <span> 预约体检详情</span>
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
      <el-descriptions title="体检人信息" :colon="false" class="title">
        <el-descriptions-item label="患者姓名">{{singleifo.name}}</el-descriptions-item>
        <el-descriptions-item label="就诊卡号">{{singleifo.medCard}}</el-descriptions-item>
        <el-descriptions-item label="微信昵称">{{singleifo.nikName}}</el-descriptions-item>
        <el-descriptions-item label="证件类型">{{singleifo.cardType}}</el-descriptions-item>
        <el-descriptions-item label="证件号码">{{singleifo.idCard}}</el-descriptions-item>
        <el-descriptions-item label="关系">本人</el-descriptions-item>
        <el-descriptions-item label="手机号码">{{singleifo.phone}}</el-descriptions-item>
        <el-descriptions-item label="就诊人地址">{{singleifo.address}}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div id="bottom">
      <el-descriptions title="预约信息" :colon="false" class="title">
        <el-descriptions-item label="就诊医院">{{singleifo.campName}}</el-descriptions-item>
        <el-descriptions-item label="医院地址">{{singleifo.campAddress}}</el-descriptions-item>
        <el-descriptions-item label="报道科室">{{singleifo.departName}}</el-descriptions-item>
        <el-descriptions-item label="体检套餐">{{singleifo.exmName}}</el-descriptions-item>
        <el-descriptions-item label="体检费费">{{singleifo.money}}</el-descriptions-item>
        <el-descriptions-item label="预约时间">{{singleifo.subTime}}</el-descriptions-item>
        <el-descriptions-item label="报告时间">{{singleifo.reportTime}}</el-descriptions-item> 
        <el-descriptions-item label="状态">{{singleifo.status}}</el-descriptions-item>
        <el-descriptions-item label="候诊时间" >{{singleifo.waitTime}}</el-descriptions-item>
      </el-descriptions><br>
      <el-button type="primary" id="repost" @click="showrepost">查看体检报告</el-button><br>
       <el-input v-model="input" placeholder="请输入预约备注内容"></el-input>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="primary" plain @click='cancel'>取消</el-button>
    </div>
    <!-- 展示体检报告的弹框 -->
    <PhyRepost :isShowRepost="isShowRepost" :allifo='allifo' @closerepost='closedialog'></PhyRepost>
  </div>
</template>
<script>
import PhyRepost from '../PhyRepost'
export default {
   components:{PhyRepost},
  data() {
    return {
      isShowRepost: false,  //控制体检报弹框出现的属性
      allifo:{}, //传入子组件响应参数
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: ["large", "medium", "small"],
      input:'',
      singleifo:{},
    };
  },
   created(){
    this.$bus.$on('demo2',async(data)=>{
       let result = await this.$API.reqmedicalSingleInfo(data)
      if(result.code == 200){
        this.singleifo = result.data[0]
      }
    })
   
  },
  beforeDestroy(){
     this.$bus.$off('demo2')
  },
  methods:{
     //保存备注信息
     async save(){
        let ifo={
        remark:this.input,
        subId:this.singleifo.subId,
      }
       let result = await this.$API.addMedicalRemark(ifo);
       if(result.code==200){
          this.$message({
            type: "success",
            message: "保存成功!",
          });
            this.$router.push('/bookmedical')
      }else{
           this.$message({
            type: "warning",
            message: "保存失败!",
          });
      }
     },
     cancel(){
       this.$router.push('/bookmedical')
     },
    async showrepost(){
      this.isShowRepost=true
      let i= this.singleifo.medCard
      
       let result= await this.$API.reqrepost(i)
       if(result.code==200){
         this.allifo=result.data[0]
       }else{
           this.$message({
            type: "warning",
            message: "获取失败!",
          });
      }
     },
     closedialog(){
      this.isShowRepost=false
     }
  }
};
</script>
<style  scoped lang="less">
#box{
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
/deep/.el-input__inner {
  width: 200px ;
  margin-bottom: 10px;
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
#tip{
  line-height: 50px;
}
#repost{
  margin-bottom:20px;
}

</style>