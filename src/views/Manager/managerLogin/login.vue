<template>
  <div class="contain">
      <div class="box">
          <div class="logo">
            靖江市科技镇长团管理系统
          </div>
          <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
import qs from 'qs';
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
        let that = this;
        this.$refs.ruleForm.validate(valid=>{
          if(!valid) return;
          this.$http.post('user/login',qs.stringify({username:that.ruleForm.username,password:that.ruleForm.pass}),{headers: {'content-type':'application/x-www-form-urlencoded'}})
        .then((res)=>{
          console.log(res);
          if(res.data.msg==='用户名不存在'){
            alert('用户名不存在,请重新输入');
            return;
          }
          if(res.data.msg==='密码错误'){
            alert('密码错误,请重新输入');
            return;
          }
          this.$store.commit('handleUserName', res.data.data.userInfo.username)
          this.$store.commit('handleAccount', res.data.data.userInfo.account)
          sessionStorage.setItem('userToken', res.data.data.token)
          sessionStorage.setItem('role', res.data.data.userInfo.role)
          // sessionStorage.setItem("userToken",res.data.data.token);
          // sessionStorage.setItem("islogin",true);
          this.$router.push('../manager/userlist');
        })
        })
      },
      resetForm() {
        this.ruleForm={
            username:'',
            pass:'',
        }
      }
    },
    beforeRouteLeave(to,from,next){
      console.log(to)
      if(to.name==='userlist'){
        if(sessionStorage.getItem("userToken")&&sessionStorage.getItem("islogin")){
          next()
        }else{
          next(false)
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
