<template>
    <div id="contain">
        <div class="header">{{logo}}</div>
        <ul class="about" v-if="flag===1">
            <li >
                负责人：{{sic.charge}}
            </li>
            <li >
                个人联系方式：{{sic.information}}
            </li>
            <li>
                联系方式：{{sic.contacts}}
            </li>
            <li>
                联系人电话：{{sic.tel}}
            </li>
            <li>
                联系邮箱：{{sic.mail}}
            </li>
             <li>
                学科类型：{{sic.confic}}
            </li>
           <el-link target="_blank" :href="URL" :underline="false" style="margin-left:0%">
            <el-button size="mini" type="success" >文件下载</el-button>
        </el-link>
        </ul>
        <ul class="about" v-else>
            <li >
                联系人：{{cop.contacts}}
            </li>
           <li>
                联系邮箱：{{cop.mail}}
            </li>
             <li>
                需求学科：{{cop.needs}}
            </li>
           <el-link target="_blank" :href="URL" :underline="false" style="margin-left:0%">
            <el-button size="mini" type="success" >文件下载</el-button>
        </el-link>
        </ul>
        <div class="main">
            
             <ul class="show_part" v-if="flag===1"> 
                 <li>科研成果介绍：<br>
                    <div v-html="content.results">
                    </div>
                 </li>
                 <li>科技创新：<br>
                    <div v-html="content.tecNew">
                    </div>
                 </li>
                 <li>未来展望：<br>
                    <div v-html="content.future">
                        
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
                 <!-- <li v-html="content.intro">项目介绍：<br>{{content.intro}}</li>
                 <li v-html="content.budget">预算：<br>{{content.budget}}</li>
                 <li v-html="content.document">需求文档：<br>{{content.document}}</li> -->
            </ul>

        </div>
        
        <el-button type="success" round @click="pass()">通过审核</el-button>
        <el-button type="warning" round @click="notPass()">未通过</el-button>

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
        }
    },
    methods:{
        getId(){
            if( this.$route.params.sincereId){
                this.logo='';
                this.id=-1;   //清空缓存的数据
                this.id=this.$route.params.sincereId;
                this.logo='科学成果审核';
                console.log(this.id);
                this.flag=1;  

            }else{
                this.logo='';
                this.id=-1;   //清空缓存的数据
                this.id=this.$route.params.companyId;
                this.logo='企业需求审核';
                console.log(this.id)
                this.flag=2;
            }
        },
        getHTML_sci(id){
            this.$http.get('/readSci',{
                params:{
                    id:id
                }
            }).then(res=>{
                let data=res.data.data.Sci;

                this.content.results=data.results;
                this.content.tecNew=data.tecNew;
                this.content.future=data.future;

                this.sic.charge=data.charge;
                this.sic.contacts=data.contacts;
                this.sic.mail=data.mail;
                this.sic.information=data.information;
                this.sic.tel=data.tel;
                this.sic.confic=data.confic;
                this.URL=data.fileurl;
            })
        },
        getHTML_company(id){
            this.$http.get('/readEnter',{
                params:{
                    id:id
                }
            }).then(res=>{
                let data=res.data.data.enterpriseneeds;

                this.content.intro=data.intro;
                this.content.budget=data.budget;
                this.content.document=data.document;

                this.cop.contacts=data.contacts;
                this.cop.needs=data.needs;
                this.cop.mail=data.mail;
                this.URL=data.fileurl;
            })
        },
        pass(){
            let url;
            if(this.flag===1){
                 url='/sciapproval';
            }else{
                 url='/enterapproval';
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
                    console.log(value)
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
#contain{
    width: 100%;
    min-height: 100%;
    background: rgb(234,237,241);
}
#contain .about{
    width: 100%;
    font-size: 18px;
    background: rgb(234,237,241);
}
#contain .about li{}
#contain .main{
    width: 80%;
    margin: 10px auto;
    min-height: 750px;
    padding-top: 10px;
    padding-bottom:20px ;
    border-radius:20px ;
    
    font-size: 18px;
}
.main .show_part{
    width: 90%;
    min-height: 450px;
    margin: 0px auto;
}

.main li{
    min-height: 250px;
}
.main li > div{
    min-height: 250px;
    background: rgb(255, 253, 244);
}
#contain .el-button{
    float: right;
    margin-right: 45px;
    margin-top: 0px;
    color: rgb(20, 13, 13);
    font-size: 20px;
}
.header{
    width: 200px;
    text-align: center;
    line-height: 25px;
    font-size: 25px;
    margin: 5px;
    border-bottom:1px black solid ;
}
</style>