<template>
    <div class="container">
        <div id="header">
            <div class="logo">
                靖江市科技镇长团管理后台
            </div>
            <div class="quit">
                <el-button type="info" @click="quit()">退出</el-button>
            </div>
        </div>
        <el-container style="height: 100%;">
  <el-aside  style="background-color: rgb(238, 241, 246); height:100%;">
    <el-menu :default-openeds="actives"
      background-color="rgb(21, 27, 39)"
      text-color="#fff"
      active-text-color="#ffd04b"
       @open="handleOpen">
      <el-submenu index="1">
        <template slot="title" >用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="goUserList()">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title" >审批管理</template>
        <el-menu-item-group>
          <el-menu-item index="2-1" @click="goSincere()">科研成果</el-menu-item>
          <el-menu-item index="2-2" @click="goCompany()">企业需求</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title" >基本信息管理</template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="goNewsManage()">新闻管理</el-menu-item>
          <el-menu-item index="3-2" @click="goNoticePublish()">通知公告</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">权限管理</template>
        <el-menu-item-group>
          <el-menu-item index="4-1" @click="goRoleList()">角色列表</el-menu-item>
          <el-menu-item index="4-2" @click="goPermissionList()">权限列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-main>
      <router-view ></router-view>
  </el-main>
</el-container>
    </div>
</template>
<script>
export default {
    data(){
        return{
          name:'',
          actives:[],
        }
    },
    methods:{
      handleOpen(key) {
       

        this.actives=[key]
        sessionStorage.setItem('actives',this.actives);
      },
        goUserList(){
            this.$router.push('/manager/userlist')
            this.name='userlist'
        },
        quit(){
          sessionStorage.clear()
            this.$router.push('/')
            this.$store.commit('logout')
            window.location.href="http://212.64.87.193/login";   
        },
        active(index){

            this.actives=[index];
        },
        goRoleList(){
            this.$router.push('/manager/rolelist');
        },
        goPermissionList(){
            this.$router.push('/manager/permission');
        },
        goNewsManage(){
            this.$router.push('/manager/newsmanage');
        },
        goNoticePublish(){
            this.$router.push('/manager/announces');
        },
        goSincere(){
            this.$router.push('/manager/sincere');
        },
        goCompany(){
            this.$router.push('/manager/company');
        }
    },
    mounted(){
         if(sessionStorage.getItem('active')){
          this.actives=sessionStorage.getItem('active');
        }
    }
}
</script>

<style scoped>
.left{
    float: left;
}
.right{
    float: left;
}
.quit .el-button{
    margin-right: 20px;
    margin-top:15px ;
    background: rgb(133, 133, 133);
    color: antiquewhite;
    float: right;
}
#header{
    background: #333744;
    height: 70px;
    line-height: 70px;
}
#header .logo{
    font-size: 35px;
    color: white;
    margin: 0 15px;
    float: left;
}
.container .el-aside{
    width: 260px!important;
    height: 100%;
    float: left;
    background: #333744!important;
}

.container .el-main{
  background: rgb(234,237,241);
}
.container .el-breadcrumb{
  line-height: 50px;
  font-size: 18px;
  height: 50px;
}
.container .el-menu-item{
  font-size: 14px;
  background: rgb(91, 102, 124);
  color: white;
}
.container .el-menu-item :active{
  color: blue!important;
}
.el-menu-item, .el-el-submenu{
  background: rgb(21, 27, 39);
  color: white;
}
.container , .el-container,.el-main{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.container .el-submenu__title{
  font-size: 18px!important;
}
</style>