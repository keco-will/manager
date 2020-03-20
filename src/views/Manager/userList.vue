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
            <search class="search" @callback="forsearch">
            
        </search>
        <el-button round class="btn" @click="newone()">添加</el-button>
        </div>
        <div class="newone" v-show="isshow">
                    <div style="margin: 20px;"></div>
                    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" ref="formLabelAlign">
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
                    prop="phone_number"
                    required>
                        <el-input v-model="formLabelAlign.tel"></el-input>
                    </el-form-item>
                    <el-form-item 
                    label="邮箱"
                    prop="email"
                    required
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
          <el-popover
            ref="popover4"
            placement="right"
            width="400"
            trigger="click">
            <el-form :label-position="labelPosition" label-width="100px" :model="edit">
                    <el-form-item label="用户名">
                        <el-input v-model="edit.name" placeholder="必填"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="edit.tel" placeholder="必填"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="edit.mail" placeholder="必填"></el-input>
                    </el-form-item>
                </el-form>
                <el-button size="mini" round @click="edits(scope.$index, scope.row)">提交</el-button>
            </el-popover>
        <el-button
          size="mini"
          v-popover:popover4
          class="edit_btn">编辑</el-button>
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
          v-popover:popover3>分配权限</el-button>
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
import search from '../../components/Search'
export default {
    data(){
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
         // eslint-disable-next-line no-unused-vars
        var checkemail=(rule,value,callback)=>{
            if (!value) {
            return callback(new Error('邮箱不能为空'))
            }
            setTimeout(() => {
            if (mailReg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的邮箱格式'))
            }
            }, 100)
        }
        // eslint-disable-next-line no-unused-vars
        var check_phone=(rule,value,callback)=>{
            if (!value) {
                return callback(new Error('电话号码不能为空'))
            }
            setTimeout(() => {
            if (!Number.isInteger(+value)) {
                callback(new Error('请输入数字值'))
            } else {
                if (phoneReg.test(value)) {
                callback()
                } else {
                callback(new Error('电话号码格式不正确'))
                }
            }
            }, 100)
        }
        return{
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
        
        value: '',
        // rules:{
        //     email:[
        //         {validator:checkemail,trigger:'blur'}
                
        //     ],
        //     phone_number:[
        //         {validator:check_phone,trigger:'blur'}
        //     ],
        // }
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
    methods:{
        //删除信息
        handleDelete(row) {
            console.log(row)
            this.$http.get('boss/deleteuser',{
                params:{
                    id:row.id
                } 
            }).then(()=>{
                if(row.role==='管理员'){
                    alert('该账号是管理员，删除失败！')
                }else{
                    console.log(123)
                this.$router.go(0);
                }
            })
        },
        forsearch(val){
            console.log(val)
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
           this.$http.get('boss/alluser').then(res=>{
               console.log(res)
               //do_something
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
           console.log(data)
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
               this.$router.go(0)
           })
           
       },
       edits(index, row){
           this.$http.post('boss/updateUser',{
               id:row.id,
               username:this.edit.name,
               mail:this.edit.mail,
               tel:this.edit.tel
           }).then(res=>{
               console.log(res)
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
           }).then(res=>{
               console.log(res);
           })
       },
       submit_permission(index,row){
           this.$http.post('boss/updateUser',{
               id:row.id,
               role:this.value,
           }).then(res=>{
               console.log(res);
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
        search
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
</style>