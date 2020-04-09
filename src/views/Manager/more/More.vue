<template>
    <div class="contain">
        <el-header style="text-align: right; font-size: 20px" >
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >审批管理</el-breadcrumb-item>
        <el-breadcrumb-item >{{dowhat}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <div class="nimazhale">
        <div class="head">
            <div class="header">{{logo}}</div>
            <a :href="URL" v-if="URL"></a>
        </div>
        <div class="main">
             <ul class="show_part" v-if="flag===1"> 
                  
                 <li>科研成果介绍：<br>
                    <div v-html="content.results">
                    </div>
                 </li>
                 <li v-if="content.tecNew">技术创新点：<br>
                    <div v-html="content.tecNew">
                    </div>
                 </li>
                 <li v-if="content.future">市场前景及展望：<br>
                    <div v-html="content.future">
                    </div>
                 </li>
                 <li>
                     学科类型：
                     <div>
                         {{needing}}
                     </div>
            
                 </li>
                 <li>
                    技术成熟度：
                    <div>
                        {{sic.maturity}}
                    </div>
                </li>
                <li>
                    负责人：
                    <div>
                        {{sic.charge}}
                    </div>
                </li>
                <li>
                    负责人职称：
                    <div>
                        {{sic.position}}
                    </div>
                </li>
                <li>
                    联系方式
                    <div>
                        个人联系方式：{{sic.information}}<br>
                        联系方式：{{sic.contacts}}<br>
                        联系人电话：{{sic.tel}}<br>
                        联系邮箱：{{sic.mail}}
                    </div>
                        
                </li>
            </ul>
            <ul class="show_part" v-else> 
                 <li>项目介绍：<br>
                    <div v-html="content.intro">
                        
                    </div>
                 </li>
                 <li>预算：<br>
                    <div v-html="content.budget">
                    </div>
                 </li>
                 <li>需求：<br>
                    <div v-html="content.document">
                    </div>
                 </li>
                 <li>
                     需求学科：
                     <div>
                         {{needing}}
                     </div>
                 </li>
                 <li>
                    联系方式
                    <div>
                        联系人：{{cop.contacts}}<br>
                        联系邮箱：{{cop.mail}}
                    </div>
                        
                </li>
            </ul>
        </div>
        <div class="btns">
            <el-button type="success" round size="small" @click="pass()">审核通过</el-button>
            <el-button type="warning" round size="small" @click="notPass()">拒绝通过</el-button>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id:'',
            content:{},
            logo:'',
            charge:'',   //负责人
            selfintro:'', //简介
            contacts:'',  //联系方法
            mail:'',
            flag:0, 
            URL:'',
            sic:{},
            cop:{},
            filename:'',
            dowhat:'',   //面包学地址
            needing:'',
        }
    },
    methods:{
        getId(){
            if( this.$route.params.sincereId){
                this.logo='';
                this.id=-1;   //清空缓存的数据
                this.id=this.$route.params.sincereId;
                this.dowhat='科研成果'
                this.flag=1;  
                
            }else{
                this.logo='';
                this.id=-1;   //清空缓存的数据
                this.id=this.$route.params.companyId;
                this.dowhat='企业需求';
                this.flag=2;
                
            }
        },
        getHTML_sci(id){
            this.$http.get('boss/readSci',{
                params:{
                    id:id
                }
            }).then(res=>{
                let data=res.data.data.Sci;
                this.logo = data.entryname;
                this.content.results=data.results;
                this.content.tecNew=data.tecNew;
                this.content.future=data.future;
                this.sic.maturity=data.maturity;
                this.sic.charge=data.charge;
                this.sic.contacts=data.contacts;
                this.sic.mail=data.mail;
                this.sic.information=data.information;
                this.sic.tel=data.tel;
                this.sic.confic=data.disciplines;
                this.sic.position = data.position;
                this.URL=data.fileurl;
                //this.filename=data.filename;
                for(let i=0;i< this.sic.confic.length;i++ ){
                    this.needing += '  ';
                    this.needing += this.sic.confic[i].confic;
                }
                
            })
        },
        getHTML_company(id){
            this.$http.get('boss/readEnter',{
                params:{
                    id:id
                }
            }).then(res=>{
                let data=res.data.data.enterpriseneeds;
                this.logo = data.title;
                this.content.intro=data.intro;
                this.content.budget=data.budget;
                this.content.document=data.document;
                this.cop.contacts=data.contacts;
                this.cop.needs=data.needs;
                this.cop.mail=data.mail;
                this.URL=data.fileurl;
                //this.filename = data.filename;
                for(let i=0;i< this.cop.needs.length;i++ ){
                    this.needing += '  ';
                    this.needing += this.cop.needs[i].needs;
                }
            })
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {});
       },
        pass(){
            let url;
            if(this.flag===1){
                 url='boss/sciapproval';
            }else{
                 url='boss/enterapproval';
            }
            this.$confirm('设否通过审核?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
                }).then(() => {
                this.$http.get(url,{
                    params:{
                        Ids:this.id
                    }
                }).then(()=>{
                    this.$message({
                    type: 'success',
                    message: '提交成功!'
                    });
                    this.$router.go(-1);
                })

                }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '已取消'
                });          
              });
        },
        notPass(){
            let url;
            if(this.flag===1){
                 url='/scireject';
            }else{
                 url='/entereject';
            }
            this.$prompt('请输入不通过原因', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(({ value })=>{
                    this.$http.post(url,{
                        id:this.id,
                        problem:value
                    }).then(()=>{
                        this.$message({
                        type: 'success',
                        message: '提交成功'
                    });
                    this.$router.go(-1);
                   })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '发送失败'
                });       
                });
        }
    },
    mounted(){
        this.getId();
        if(this.flag===1){
            this.getHTML_sci(this.id);
        }else{
            this.getHTML_company(this.id)
        }
        
    }
}
</script>

<style scoped>
@import url('/public/css/scoll.css');
.contain{
    width: 100%;
    height: 100%;
}
.left{
    float: left;
}
.contain .el-header{
    padding: 0;
}
.contain .el-breadcrumb{
  line-height: 50px;
  font-size: 16px;
  height: 50px;
  background: rgb(234,237,241);
}
.contain .el-breadcrumb__item{
    margin-left: 10px;
}
.head{
    width: 100%;
    height: 55px;
    border-bottom: 1px rgb(209, 209, 209) dashed;
}
.contain .about{
    width: 40%;
    font-size: 15px;
    display: flex;
    font-weight: 300;
    margin: 0 auto;
}
.head ul{
    margin: 10px auto;
}
.about li{
    margin-right: 20px;
    list-style: none;
}
.contain .main{
    width: 90%;
    margin:0px auto;
    font-size: 16px;
    padding: 0;
    background: white;
}
.main .show_part{
    width: 90%;
    margin: 0px auto;
}

.main li{
    font-weight:bold ;
    font-size: 18px;
    list-style: none;
    margin-top: 40px;
    border-bottom:1px rgb(209, 209, 209) dashed;
}
.main li > div{
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
}
.contain .main .el-button{
    float: right;
    margin-right: 60px;
    color: rgb(20, 13, 13);
    font-size: 16px;
}
.header{
    width: 100%;
    text-align: center;
    line-height: 55px;
    font-size: 25px;
    margin: 0px;
}

.btns{
    width: 20%;
    margin: 30px auto;
    height: 50px;
}
.btns .el-button{
    margin-left:15px ;
    
}
.nimazhale{
    width: 95%;
    min-height: 10%;
    margin: 0 auto;
    background: white;
    padding-top: 5px;
}
</style>