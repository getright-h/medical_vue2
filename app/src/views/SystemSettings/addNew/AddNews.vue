<template>
  <div id="box">
    <el-row class="pg-title">
      <el-col :span="11">
        <button class="btn"></button>
        <span>新增消息公告</span>
      </el-col>
    </el-row>
    <div class="title">编辑文章信息</div>
    <!-- 验证表单 -->
    <div class="option">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="上传人" prop="author">
          <el-input v-model="ruleForm.author"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="text"
          ><br />
          <VueEditor ref="vueEditor" v-model="ruleForm.text" :config="config"></VueEditor>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-switch v-model="ruleForm.status" active-value=1 inactive-value=0></el-switch>
        </el-form-item>
        <el-form-item label="上传时间" prop="time">
          <el-date-picker
            v-model="ruleForm.time"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='submitForm'>保存</el-button>
          <el-button @click="onClose">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
//全局引入富文本
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      config:{},
      textarea: "",
      // 日期数据
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
   
      // form 表单数据
      ruleForm: {
        author: "",
        status: 0,
        text: "",
        time: "",
        title: "",
        //  id: 0,
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 3到 20个字符", trigger: "blur" },
        ],
        text: [
          { required: true, trigger: "blur" },
        ],
        
      },
    };
  },

  methods: {
    //  添加公告 报500错
  async submitForm() { 
      if (this.$refs.vueEditor.editor.getLength() > 1) {
        // 将用户输入的值赋为text
       this.ruleForm.text = this.$refs.vueEditor.editor.root.innerHTML;
      }else{
      this.ruleForm.text = '';
      }
      // this.$refs['ruleForm'].validate(async(valid) => {
      //   if (valid) {
          this.ruleForm.time=dayjs(this.ruleForm.time).format("YYYY-MM-DD HH:mm:ss")
          this.ruleForm.status= Number(this.ruleForm.status)
          this.ruleForm.author=JSON.parse(localStorage.getItem("user")).name
      //   //发送添加公告请求   等待响应会来的数据
      //     console.log('要添加的公告',this.ruleForm);
     let result= await this.$API.addNotice(this.ruleForm); 
     if(result.code==200){
        this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.$router.push('/news')
     }else{
        this.$message({
            type: "error",
            message: "添加失败!",
          });
     }

    },


    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onClose() {
      this.$emit("close");
    },
  },
};
</script>
<style  scoped lang='less'>
#box {
  width: 100%;
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

.title {
  color: #006eff !important;
  background-color: #f2f2f2;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  box-sizing: border-box;
}
.option {
  width: 100%;
  height: auto;
  // border: 1px solid red;
  /* margin-top: 30px; */
  box-sizing: border-box;
  padding-top: 25px;
  padding-bottom: 10px;
  background-color: #ffffff;
  box-shadow: 10px 10px 5px 1px #6e6f70;
}
/deep/.el-input__inner {
  width: 180px;
  height: 40px;
}
/deep/.el-textarea__inner {
  width: 400px;
  height: 200px;
}

#vue-editor-wrapper {
  width: 70%;
}
</style>