<template>
    <div id="contain">
        <el-container>
            <el-header style="text-align: right; font-size: 20px" >
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >基本信息管理</el-breadcrumb-item>
                <el-breadcrumb-item >通知公告</el-breadcrumb-item>
            </el-breadcrumb>
            </el-header>
        <el-main>
            <div id="main">
                <el-button round class="btn1" @click="publish()">发布通知</el-button>
                 <el-input
                    type="textarea"
                    :autosize="{ minRows: 9, maxRows: 20}"
                    placeholder="请输入内容"
                    v-model="textarea">
                    </el-input>
        </div>
     
        </el-main>
      </el-container>
    </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: '',
    }
  },
  methods:{
      async publish(){
          //把发布内容传给后端
          if(this.textarea==''){
            this.$message.error('发布内容不能为空！');
            return;
          }
          this.$message({
          message: '发布成功',
          type: 'success'
        });
          this.textarea=''
      }
  }
}
</script>

<style scoped>
#contain{
    width: 100%;
    height: 1092px;
    background: rgb(234,237,241);
}

.container .el-breadcrumb{
  line-height: 50px;
  font-size: 18px;
  height: 50px;
}
#contain .el-main{
    height: 100%;
}
#contain .el-main{
  width: 100%;
}
#main{
    width: 65%;
    margin: 50px auto;
    padding: 30px;
    border: 1px rgb(255, 255, 255) solid;
    background: rgb(213, 214, 214);
    border-radius: 50px;
}
#main .btn1{
    background: rgb(80, 144, 182);
    margin-bottom: 20px;
    color: white;
    font-size: 20px;
}

</style>