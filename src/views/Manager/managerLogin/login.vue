<template>
  <div class="contain">
      <div class="box">
          <div class="logo">
            靖江市科技镇长团管理系统
          </div>
          <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="submitForm()">提交</el-button>
              <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
          </el-form>
      </div> 
  </div>
</template>

<script>
export default {
  data() {
      return{
        ruleForm:{
            username:'',
            pass:'',
        }
      }
    },
    methods: {
      submitForm() {
        this.$http.post('',{
          username:this.ruleForm.username,
          password:this.ruleForm.pass
        }).then(res=>{
          if(res.code===200){
            this.$router.push('../manager/userlist');
          }
        })
      },
      resetForm() {
        this.ruleForm={
            username:'',
            pass:'',
        }
      }
    }
}
</script>

<style scoped>
.contain{
  width: 100%;
  height: 100%;
  background: rgb(22, 128, 214);
}
.box{
  background: white;
  width: 580px;
  height: 440px;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 3px;
  border: 2px rgb(0, 0, 0) solid;
  transform: translate(-50%,-50%);
}
.logo{
  width: 100%;
  height: 140px;
  line-height: 140px;
  text-align: center;
  font-size: 28px;
  color: rgb(15, 17, 104);
}
.contain .el-form{
  margin-top: 40px;
}
.contain .el-form .el-input{
  width: 80%;
  margin-bottom:20px ;
  height: 100%;
  font-size: 18px;
}
</style>
