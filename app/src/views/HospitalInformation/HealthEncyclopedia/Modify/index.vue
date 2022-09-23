<template>
  <el-dialog title="修改文章" :visible.sync="IsModify" :before-close="Cancel">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <!-- <el-form-item label="上传缩略图">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleChange"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.url" :src="ruleForm.url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item> -->

      <el-form-item label="作者" prop="author" placeholder="请输入内容">
        <el-input v-model="ruleForm.author"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" placeholder="请输入内容">
        <!-- 富文本编辑器 -->
        <VueEditor id="VueEdit" ref="vueEditor" :config="config"></VueEditor>
      </el-form-item>
      <el-form-item label="文章状态">
        <el-switch
          v-model="ruleForm.status"
          active-value="1"
          inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <!-- <el-form-item label="上传时间" required>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.time"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="confirm">保存</el-button>
        <el-button @click="Cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// 导入富文本编辑组件
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";

export default {
  name: "Modify",
  props: ["IsModify", "clickUpdateRow"],
  data() {
    return {
      nameid: 0,
      lander: {}, //装登陆者信息的
      ruleForm: {
        id: "", //id
        title: "", //文章标题
        url: "", //上传缩略图
        author: "", //作者
        text: "", //文章内容
        status: "0", //状态
        time: "", //上传时间
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度最少 3 个字符", trigger: "blur" },
        ],
        author: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, message: "长度最少 3 个字符", trigger: "blur" },
        ],
        text: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, message: "长度最少 3 个字符", trigger: "blur" },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [],
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:3000/upload",
          name: "file",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.url);
          },
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:3000/upload",
          name: "file",
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.url);
          },
        },
      },
      value: [],
      boolValue: false,
      file: null, //装选中的file文件
    };
  },
  // 接受父元素里面的row值
  watch: {
    clickUpdateRow(v1, v2) {
      // this.$refs.vueEditor.editor.clipboard.innerText="DLSKFJ LSAKDFJLKS"
      this.ruleForm.id = v1.id; //文章标题
      this.ruleForm.title = v1.title; //文章标题
      this.ruleForm.url = v1.url; //上传缩略图
      this.ruleForm.author = v1.author; //作者
      this.ruleForm.text = v1.text; //文章内容
      this.ruleForm.status = v1.status; //状态
      this.ruleForm.time = v1.time; //上传时间
      console.log("v1", v1); // <div>html</div>是你要回显的数据,插回富文本框里
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    Cancel() {
      // 改变父组件的属性
      // 调用父组件的方法
      this.$emit("close");
    },
    // 以下是和图片相关的函数
    // 文件上传成功的回调函数
    handleAvatarSuccess(res, file) {
      // 上传成功的函数   这里面的方法都要移到下面去 这个函数不执行
      console.log("上传成功过后执行的函数", res);
      // this.imageUrl = URL.createObjectURL(file.raw);  //将文件转成url的方法 对url赋值路径
    },
    // 上传前，把自动上传功能给关了，所以这个函数不能用了 这里面的方法都要移到下面去 这个函数不执行
    beforeAvatarUpload(file) {
      console.log("上传前执行的函数", file);
    },
    // 文件状态被改变就执行
    handleChange(file, fileList) {
      //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
      // console.log('file',file);
      // console.log('fileList',fileList);
      // this.fileList = fileList.slice(-3);
      this.file = file.raw;
      // 判断以下图片的类型和大小 下面时判断函数
      const isJPG =
        file.raw.type === "image/jpeg" ||
        file.raw.type === "image/jpg" ||
        file.raw.type === "image/png";
      const isLt2M = file.raw.size / 1024 / 1024 < 2;
      if (!isJPG) {
        // 如果图片不为以上格式，直接return
        return this.$message.error("上传头像图片只能是jpeg pan JPG 格式!");
      }
      if (!isLt2M) {
        // 如果不为这么大直接return
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // return isJPG && isLt2M;
      // 首先把图片显示出来
      this.ruleForm.url = URL.createObjectURL(file.raw); //将文件转成url的方法 对url赋值路径
    },
    confirm() {
      var quill = this.$refs.vueEditor.editor;
      quill.root.innerHTML;
      this.ruleForm.text = quill.root.innerText; //富文本专用的
      this.modification();
    },
    //修改数据发送
    async modification() {
      //修改前请求id
      let obj = {
        id: this.nameid,
        title: this.ruleForm.title, //文章标题
        url: this.ruleForm.url, //上传缩略图
        author: this.ruleForm.author, //作者
        text: this.ruleForm.text, //文章内容
        status: this.ruleForm.status, //状态
        time: this.ruleForm.time, //上传时间
      };
      console.log("obj", obj);

      let loginl = await this.$API.encyclopedia(obj);
      // console.log(loginl);
      if (loginl.code === 200) {
			this.ruleForm.id = loginl.data.id
			console.log(this.ruleForm.id);
				this.obsecrate()
			
      } else {
        this.$message.error("网络问题，请稍后重试");
      }
    },
	//确定修改
	async obsecrate(){
		let obj2 = {
				id: this.ruleForm.id,
				title: this.ruleForm.title, //文章标题
				url: this.ruleForm.url, //上传缩略图
				author: this.ruleForm.author, //作者
				text: this.ruleForm.text, //文章内容
				status: this.ruleForm.status, //状态
				time: this.ruleForm.time, //上传时间
			};
				console.log("obj2", obj2);
				let loginl2 = await this.$API.amendencyclopedia(obj2);
				if (loginl2.code === 200) {
				this.Cancel();
				console.log(loginl2);
				this.$message({
					type: "success",
					message: "修改成功!",
				});
			}
	}
  },
  computed: {
    newOptions() {
      let arr = JSON.stringify(this.Project);
      return JSON.parse(arr);
    },
  },
  components: {
    VueEditor,
  },

  mounted() {},
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-input {
  width: 70%;
}
.el-textarea {
  width: 70%;
}
.avatar-uploader-icon {
  width: 6vw;
  height: 6vw;
}
.avatar-uploader-icon {
  line-height: 6vw;
}
.ql-editor {
  height: 36vh;
}
#VueEdit {
  width: 70%;
}
/* 图片大小 */
.avatar {
  width: 60px;
  height: 60px;
  display: block;
}
</style>