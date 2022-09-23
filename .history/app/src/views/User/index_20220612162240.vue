<template>
  <div id="appointment">
    <h1 id="yuy">请预约挂号</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="预约类型" prop="region">
        <el-select
          v-model="ruleForm.region"
          placeholder="请选择预约类型"
          @change="lgetDatal"
        >
          <el-option label="预约挂号" value="1"></el-option>
          <el-option label="预约核酸检测" value="2"></el-option>
          <el-option label="预约体检" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出诊科室" prop="region">
        <el-select
          v-model="ruleForm.department"
          placeholder="请选择出诊科室"
          @change="mdoctormy"
        >
          <el-option
            :label="item.departName"
            :value="item.id"
            v-for="item in ruleForm.administrativeoffice1"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出诊医生" prop="region">
        <el-select v-model="ruleForm.doctormy" placeholder="请选择出诊医生">
          <el-option
            :label="item.doctorName"
            :value="item.doctorName"
            v-for="item in ruleForm.doctormy1"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="挂号类型" prop="typology">
        <el-select
          v-model="ruleForm.typology"
          placeholder="请选择挂号类型"
          disabled
        >
          <el-option
            :label="item.regType"
            :value="item.regType"
            v-for="item in ruleForm.doctormy1"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预约时间" required>
        <el-date-picker
          v-model="ruleForm.nowTime"
          type="datetime"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd "
          placeholder="选择日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        <el-time-select
          v-model="ruleForm.date1"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
          }"
          placeholder="选择时间"
        >
        </el-time-select>
      </el-form-item>
      <el-form-item label="预约费用" prop="account">
        <el-input v-model="ruleForm.account" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即预约</el-button
        >
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
    <div id="balance">
      <template>
        <div>
          <el-button @click="show3 = !show3"
            ><i class="el-icon-bank-card"></i> 查看余额</el-button
          >

          <div style="margin-top: 20px; height: 200px">
            <el-collapse-transition>
              <div v-show="show3">
                <div class="transition-box">您当前余额为{{ balance }}元</div>
                <!-- <div class="transition-box" v-else>您当前余额为{{balance}}</div> -->
                <div class="transition-box" id="topup" @click="open">
                  点击充值
                </div>
              </div>
            </el-collapse-transition>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lander: {}, //装登陆者信息的
      Physicianpractices: [], //装所有预约体检的
      registration: [], //装所有预约挂号类型的
      expense: "", //装所有预约费用的
      balance: 0, //余额
      show3: false, //充值下拉框
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now(); // 选当前时间之后的时间
        },
      },
      ruleForm: {
        name: "",
        region: "",
        typology: "", //挂号类型
        administrativeoffice1: [], //装所有预约科室的
        doctormy1: [], //装所有预约医生的
        type: [],
        department: "", //装所有预约科室的id
        departmentmz: "", //装所有预约科室的名字
        doctormy: "", //装所有预约医生的
        desc: "",
        account: "",
        date1: "", //时间
        nowTime: "", //日期
      },
      rules: {
        region: [{ required: true, message: "请选择完整", trigger: "change" }],

        desc: [{ required: true, message: "请填写备注", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (
          valid &&
          this.ruleForm.nowTime != null &&
          this.ruleForm.date1 != null
        ) {
          //判断都输入后调用请求
          this.appointmentregister();
        } else {
          alert("请填写完整");
          return false;
        }
      });
    },
    //点击预约发送请求
    async appointmentregister() {
      let booking = {
        bookType: Number(this.ruleForm.region), //预约类型
        departName: this.ruleForm.departmentmz, //预约科室
        doctorName: this.ruleForm.doctormy, //医生
        money: Number(this.ruleForm.account), //费用
        phone: this.lander.phone, //电话
        time: this.ruleForm.nowTime + this.ruleForm.date1, //预约时间
        type: this.ruleForm.typology, //专家号
      };
      let loginl = await this.$API.xzNewBooking(booking);
      if (loginl.code === 200) {

        this.$message({
          message: "恭喜你，预约成功",
          type: "success",
        });
      } else {
        this.$message.error("网络有问题，请稍后重试");
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //时间
    handle() {
      new Date().getTime() > new Date(this.nowTime).getTime() &&
        (this.nowTime = new Date());
    },
    //充值请求
    open() {
      this.$prompt("请输入充值金额", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "Number",
      })
        .then(async ({ value }) => {
          if (value > 0) {


            let obj = { id: this.lander.id, money: Number(value) };
            let Prepaid = await this.$API.czvoucher(obj);
            if (Prepaid.code == 200) {
              this.balance = Prepaid.data.money;
              this.yhbalance();
              this.$message({
                type: "success",
                message: "您成功充值: " + value + "元",
              });
            } else {
              alert("网络延迟，请稍后重试");
            }
          } else {
            this.$message({
              type: "info",
              message: "请填写正确的充值金额",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消充值",
          });
        });
    },

    //请求预约信息
    async getData() {
      let result = await this.$API.NewBooking(); //等待响应回来的数据
      if (result.code == 200) {
        this.Physicianpractices = result.data;
        return "ok";
      } else {
        return Promise(new Error("服务器报错"));
      }
    },

    //获取所有挂号科室信息
    async lgetDatal() {
      let result = await this.$API.administrativel({
        id: this.ruleForm.region,
      }); //等待响应回来的数据
      if (result.code == 200) {
        this.ruleForm.administrativeoffice1 = result.data;
        this.ruleForm.department = result.data[0].id;
        this.ruleForm.departmentmz = result.data[0].departName;
       
        let departmentName = this.ruleForm.administrativeoffice1.find(
          (item) => {
            if (item.id == this.ruleForm.department) {
              return item;
            }
          }
        );
        let obj = {
          departName: departmentName.departName,
          id: this.ruleForm.department,
        };
        let result2 = await this.$API.doctor(obj); //等待响应回来的数据
        if (result.code == 200) {
          this.ruleForm.doctormy1 = result2.data;
          this.ruleForm.doctormy = result2.data[0].doctorName;
          this.ruleForm.typology = result2.data[0].regType;
          this.ruleForm.account = result2.data[0].money;
        }
      }
    },
    //获取所有挂号医生信息
    async mdoctormy() {
      let departmentName = this.ruleForm.administrativeoffice1.find((item) => {
        if (item.id == this.ruleForm.department) {
          return item;
        }
      });
      let obj = {
        departName: departmentName.departName,
        id: this.ruleForm.department,
      };
      let result = await this.$API.doctor(obj); //等待响应回来的数据
      if (result.code == 200) {
        this.ruleForm.doctormy1 = result.data;
        this.ruleForm.doctormy = result.data[0].doctorName;
        this.ruleForm.typology = result.data[0].regType;
        this.ruleForm.account = result.data[0].money;
      }
    },

    //请求查询余额信息
    async yhbalance() {
      const user = localStorage.getItem("user");
      this.lander = JSON.parse(user);
      let obj = { id: this.lander.id };
      let result = await this.$API.cxvoucher(obj); //等待响应回来的数据
      if (result.code == 200) {
        this.balance = result.data;
        return "ok";
      } else {
        return Promise(new Error("服务器报错"));
      }
    },
  },

  //挂载获取数据
  mounted() {
    this.getData();
    this.yhbalance();
  },
};
</script>

<style lang="less" scope>
#appointment {
  width: 350px;
  margin: 0 auto;
}
#yuy {
  text-align: center;
  color: rgb(119, 161, 253);
}
.el-input.is-disabled .el-input__inner {
  width: 220px;
}
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
#balance {
  position: absolute;
  top: 20%;
  left: 25%;
}
.transition-box {
  width: 200px;
  height: 80px;
  padding: 28px;
  border-radius: 30px;
}
#topup {
  cursor: pointer;
}
</style>