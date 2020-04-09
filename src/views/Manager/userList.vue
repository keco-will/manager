<template>
    <div id="contain">
       <el-container>
           
    <el-header style="text-align: right; font-size: 20px" >
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >用户管理</el-breadcrumb-item>
        <el-breadcrumb-item >用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>
        <div class="top">
             <el-input class="search" placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="search"  v-on:change="filterTable"></el-input>
        <el-button round class="btn" @click="filterTable">搜索</el-button>
        <el-button round class="btn" @click="newone()">添加</el-button>
        </div>
        <div class="newone" v-show="isshow">
                    <div style="margin: 20px;"></div>
                    <el-form 
                    :label-position="labelPosition" 
                    label-width="100px" 
                    :model="formLabelAlign" 
                    ref="formLabelAlign"
                    :rules="rules">
                    <el-form-item label="账号" required>
                        <el-input v-model="formLabelAlign.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" required>
                        <el-input type="password" v-model="formLabelAlign.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" >
                        <el-input type="password" v-model="formLabelAlign.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item 
                    label="手机号"
                    prop="tel"
                    >
                        <el-input v-model="formLabelAlign.tel"></el-input>
                    </el-form-item>
                    <el-form-item 
                    label="邮箱"
                    prop="mail"
                    >
                        <el-input v-model="formLabelAlign.mail"></el-input>
                    </el-form-item>
                    <el-form-item label="是否启用" >
                        <el-select v-model="formLabelAlign.whether" placeholder="请选择">
                            <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户角色">
                        <el-select v-model="formLabelAlign.role" placeholder="请选择">
                            <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div style="margin-left: 20px;"><el-button type="text" @click="submit()">提交</el-button></div>
        </div>
      <el-table
        :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" 
        border
        style="width: 100%">
    <el-table-column
      label="id"
      width="70">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="用户名"
      width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.username }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="邮箱地址"
      width="250">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.mail }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="电话"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.tel }}</span>
      </template>
    </el-table-column>
    
    <el-table-column
      label="状态"
      width="90">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
            <el-switch
            @change="situationOnchange(scope.row)"
            v-model="scope.row.whether"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
        </span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">

          <el-dialog title="信息编辑" :visible.sync="edit_show">
                <el-form :label-position="labelPosition" label-width="100px" :model="edit">
                    <el-form-item label="用户名">
                        <el-input v-model="edit.name" placeholder="必填"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="edit.tel" placeholder="选填"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="edit.mail" placeholder="选填"></el-input>
                    </el-form-item>
                    
                </el-form>
            <div slot="footer" class="dialog-footer btn_color">
                <el-button size="mini" round @click="edits()" type="primary">提交</el-button>
                <el-button size="mini" round @click="edit_show = !edit_show " type="info"> 取消</el-button>
            </div>
            </el-dialog>

        <el-button
          size="mini"
          class="edit_btn"
          @click="open(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
          <el-popover
            ref="popover3"
            placement="right"
            width="300"
            trigger="click">
            <el-form :label-position="labelPosition" label-width="100px" >
                    <el-form-item label="权限">
                        <el-select v-model="value" placeholder="请选择" >
                            <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-button size="mini" round @click="submit_permission(scope.$index, scope.row)">提交</el-button>
            </el-popover>
          <el-button
          size="mini"
          class="fenpeiquanxian"
          v-popover:popover3>更换角色</el-button>
          <el-button
          size="mini"
          class="edit_btn"
          @click="reSetpassword(scope.row)">重置密码</el-button>
      </template>
    </el-table-column>

    </el-table>
        <div class="tabListPage">
           <el-pagination @size-change="handleSizeChange" 
                          @current-change="handleCurrentChange" 
                          :current-page="currentPage" 
                          :page-sizes="pageSizes" 
                          :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
                          :total="totalCount">
             </el-pagination>
       </div>
    </el-main>

    
    </el-container>
    </div>
</template>
<script>

export default {
    data(){
        const phoneReg = /^1[34578]\d{9}$/
        const mailReg = /^\w+@\w+(\.\w+)+$/
         // eslint-disable-next-line no-unused-vars
        var checkemail=(rule,value,callback)=>{
            if (!value) {
            return callback(new Error('邮箱不能为空'))
            }
            if(mailReg.test(value)){
                return callback()
            }
            callback(new Error('请输入合法邮箱'))
        }
        // eslint-disable-next-line no-unused-vars
        var check_phone=(rule,value,callback)=>{
            if (!value) {
                return callback(new Error('电话号码不能为空'))
            }
            if(phoneReg.test(value)){
                return callback()
            }
            callback(new Error('请输入合法的手机号码'))
        }
        return{
            edit_show:false,
            row:null,
          tableData: [
              
          ],
          //用户在有科研文章需要审核的时候，不能删除操作，该list和tabledata对应
        ifcould:[],    
          // 默认显示第几页
        currentPage:1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount:3,
        // 个数选择器（可修改）
        pageSizes:[1,5,10],
        // 默认每页显示的条数（可修改）
        PageSize:10,
        isshow:false,
        labelPosition: 'middle',
        formLabelAlign: {
            username:'',
            pass:'',
            checkPass:'',
            mail:'',
            role:'',
            tel:'',
            whether:'',   //是否启用
        },
        edit:{
            name:'',
            mail:'',
            tel:'',
        },
        //绑定修改权限的
        options1: [
            // {
            // value: '管理员',      //这个看后台规定的参数是什么吧
            // label: '管理员'
            // }, 
            {
            value: 'company',
            label: '企业'
            }, {
            value: 'university',
            label: '高校'
        }],
        options2:[    //状态
            {
                value:'是',
                label:'是',
            },
            {
                value:'否',
                label:'否',
            }
        ],
        rules:{
            mail:[
                {validator:checkemail,trigger:'blur'},
                {required:true, message:'请输入联系人邮箱',trigger:'blur'},
            ],
            tel:[
                {required:true, message:'请输入联系人电话',trigger:'blur'},
                {validator:check_phone,trigger:'blur'}
            ]
        },
        value: '',
        search:'',
        }
            
    },
    computed:{
        for_whether(index){
            if(this.tableData[index].whether === '是'){
                return true;
            }else{
                return false;
            }
        }
    },
    watch:{
        edit_show(val,old){
            if(val === false && val !== old){
                this.edit={
                    name:'',
                    mail:'',
                    tel:'',
                }
            }
        },
        isshow(val,old){
            if(val === false && val !== old){
                this.formLabelAlign={}
            }
        }
    },
    methods:{
        //删除信息
        handleDelete(row) {
            this.$http.get('boss/deleteuser',{
                params:{
                    id:row.id
                } 
            }).then(()=>{
                if(row.role==='管理员'){
                    alert('该账号是管理员，删除失败！')
                }else{
                    this.$router.go(0);
                }
            })
        },
        //编辑信息
        open(row){
            this.edit_show=!this.edit_show;
            if(this.edit_show===true){
                this.edit={
                    name:row.username,
                    mail:row.mail,
                    tel:row.tel,
                }
            }
            this.row=row;
        },
        handleSizeChange(val) {
           // 改变每页显示的条数 
           this.PageSize=val
           // 注意：在改变每页显示的条数时，要将页码显示到第一页
           this.currentPage=1
       },
         // 显示第几页
       handleCurrentChange(val) {
           // 改变默认的页数
           this.currentPage=val
       },
       getDataList(){
           let per={};
           let list=[];
           this.tableData=[];
           this.$http.get('boss/alluser').then((res)=>{
               this.totalCount=res.data.data.users.length;
               list=res.data.data.users;
               for(let i=0;i<this.totalCount;i++){
                   per.id=list[i].id;
                   per.username=list[i].username;
                   per.password=list[i].password;
                   per.mail=list[i].mail;
                   per.tel=list[i].tel;
                   
                   per.role=list[i].role;
                   if(list[i].whether==='是'){
                       per.whether=true;
                   }else{
                       per.whether=false;
                   }
                   this.tableData.push(per);
                   per={};
               }
           })
       },
       newone(){
           this.isshow=!this.isshow;
       },
       submit(){
           const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
           const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
           if(this.formLabelAlign.pass!=this.formLabelAlign.checkPass){
               alert("两次密码不相同");
               return;
           }
           let data=this.formLabelAlign;
           if(!mailReg.test(data.mail)){
               this.$notify({
                title: '警告',
                message: '请输入符合规范的邮箱',
                type:'warning',
                position: 'top-left'
                });
                return;
           }
            else if(!phoneReg.test(data.tel)){
                this.$notify({
                title: '警告',
                message: '请输入正确的电话号码',
                type:'warning',
                position: 'top-left'
                });
                return;
            }
           let params={
               "username":data.username,   
              "password":data.pass,
               "mail": data.mail,
               "tel":data.tel,
               "whether":data.whether,
               "role":data.role
           };
           this.$http.post('boss/adduser',params).then(res=>{
               if(res){
                   this.isshow=!this.isshow;
               }
           }).then(()=>{
               location.reload();
           })
           
       },
       filterTable() {
          let fTable;
          if(this.search!=''){
              if (this.tableData) {
                fTable = this.tableData.filter(
                    p => p.username.indexOf(this.search) != -1
                )
                this.tableData = fTable
            } else {
              this.getDataList();
            }
          }else{
            this.getDataList();
          }
      },
       edits(){
           const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
           const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
           let data=this.edit;
           if(data.mail){
                if(!mailReg.test(data.mail)){
                this.$notify({
                    title: '警告',
                    message: '请输入符合规范的邮箱',
                    type:'warning',
                    position: 'top-left'
                    });
                    return;
                }
           }else{
               data.mail = this.row.mail;
           }
           if(data.tel){
               if(!phoneReg.test(data.tel)){
                this.$notify({
                title: '警告',
                message: '请输入正确的电话号码',
                type:'warning',
                position: 'top-left'
                });
                return;
            }
           }else{
               data.tel=this.row.tel;
           }
           this.$http.post('boss/updateUser',{
               id:this.row.id,
               username:data.name,
               mail:data.mail,
               tel:data.tel
           }).then(()=>{
            //    location.reload()
                this.$router.go(0)
               alert('修改成功')
           })
           this.edit={
                name:'',
                mail:'',
                tel:'',
            },
            //重新请求刷新后的列表信息
           this.getDataList()
       },
       situationOnchange(row){
           let w = '';
           if (row.whether===true){
               w ='是';
           }else{
               w ='否';
           }
           this.$http.post('boss/updateUser',{
               id:row.id,
               whether:w
           })
       },
       submit_permission(index,row){
           this.$http.post('boss/updateUser',{
               id:row.id,
               role:this.value,
           }).then(()=>{
               this.value='';
               alert('设置成功');
           })

        //    this.value
        //提交选择的权限
       },
       reSetpassword(row){
           this.$http.get('boss/resetPwd',{
               params:{
                   id:row.id
               }
           }).then((res)=>{
               if(res){
                   alert('重置成功');
               }
           })
       }
    },
    components:{
        
    },
    mounted(){
        this.getDataList();
    },
    
}
</script>

<style scoped>
#contain{
    width: 100%;
    min-height: 100%;
    background: rgb(234,237,241);
}
.search{
    width: 300px;
    border-radius: 100px;
    margin-bottom:10px ;
    margin-left:10px ;
}
.container .el-breadcrumb{
  line-height: 50px;
  font-size: 16px;
  height: 50px;
}
#contain .el-main{
    width: 95%;
    margin: 20px auto;
    background: white;
    border: 1px white solid;
}
#contain .el-table{
    
    line-height: 40px;
    font-size: 18px;
    color: black;
}
#contain .el-main .el-table .cell span{
    line-height: 20px;
    font-size: 16px;
}
#contain .el-pagination{
    text-align: center;
}
#contain .top .search{
    float: left;
}
#contain .top .btn{
    margin-left: 20px;
}
#contain .newone {
    line-height: 20px;
    border: 1px rgb(214, 214, 214) solid;
    margin: 5px;
    background: rgb(243, 243, 243);
    width: 60%;
}
#contain .newone .el-input{
    height: 20px;
    margin: 0;
    width: 60%;
}
#contain .fenpeiquanxian{
    background: rgb(253, 188, 10);
    color: rgb(8, 8, 8);
    width:100px;
    margin: 10px;
}
.btn_color .el-button{
    background: rgb(206, 206, 206);
}
</style>