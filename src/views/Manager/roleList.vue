<template>
    <div id="contain">
        <el-container>
    <el-header style="text-align: right; font-size: 20px" >
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >权限管理</el-breadcrumb-item>
        <el-breadcrumb-item >角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>
        <div id="main">
            <!-- <div class="top">
                <el-button type="primary" style="margin:20px; width:80px; height:40px "
                @click="add_btn()">添加</el-button>
            </div>
            <div class="newone" v-show="isshow">
                    <div style="margin: 20px;"></div>
                    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
                    
                    <el-form-item label="角色名称">
                        <el-input v-model="formLabelAlign.roleNmae"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                        <el-input v-model="formLabelAlign.describe"></el-input>
                    </el-form-item>
                    
                </el-form>
                <div style="margin-left: 20px;"><el-button type="text" @click="submit()">提交</el-button></div>
        </div> -->
            <div class="table">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    border>
                    <el-table-column
                    label="#"
                    width="90">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                        <!-- id应该为顺序编号（自增） -->
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="角色名称"
                    width="500">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px" v-if="scope.row.isdisable">{{ scope.row.roleName }}</span>
                        <div class="input-edit" v-else v-on:keyup.enter="submit_edit(scope.row)">
                            <el-input v-model="scope.row.roleName" ></el-input>
                        </div>
                    </template>
                    </el-table-column>
                    <!-- <el-table-column
                    label="角色描述"
                    width="400">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.describe}}</span>
                    </template>
                    </el-table-column> -->
                    <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        class="edit"
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">
                        <span v-if="scope.row.isdisable">
                            编辑
                        </span>
                        <span v-else>
                            确定
                        </span>
                        </el-button>
                        <!-- <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
     
        </el-main>
      </el-container>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
            {
                id:1,
                roleName:'高校',
                isdisable:true,
            },
            {
                id:2,
                roleName:'企业',
                isdisable:true,
            },
            {
                id:3,
                roleName:'管理员',
                isdisable:true,
            },
        ],
        formLabelAlign: {
               roleName:'',
               describe:'',
               isdisable:true,
        },
        isshow:false,
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        row.isdisable=!row.isdisable
       
      },
    //   handleDelete(index, row) {
    //     console.log(index, row);
    //   },
      getDataList(){
           this.$http.get('').then(res=>{
            //    let obj={}
               this.tableData=res.data.data.list;   //获取用户列表信息
               //do_something
               this.totalCount=this.tableData.length;
           })
       },
       add_btn(){
           this.isshow=!this.isshow;
       },
       //提交增添信息
       submit_edit(row){  
           console.log(123)   
           row.isdisable=!row.isdisable;

       }
    },
    mounted(){
           this.getDataList()
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
#main{
    height: 100%;
    background-color: white;
    width: 70%;
    margin: 10px auto;
} 
#main .top{
    height: 60px;
    line-height: 60px;
}
#main .table{
    width: 95%;
    margin: 20px auto;
    padding: 15px;
}
#main .table .el-input{
    margin: 0;
    border: none;
    background: white;
    color: black;
}
#main .table .el-table{
    border: 1px rgb(224, 224, 224) double;
    font-size: 22px;
}
#main .table .el-table .edit{
    background: rgb(100, 142, 148);
    color: white;
}
#main .table .el-table .cell span{
    font-size: 19px;
    line-height: 24px;
}
#contain .newone {
    line-height: 25px;
    border: 1px rgb(214, 214, 214) solid;
    margin: 10px;
    background: rgb(244, 246, 252);
    width: 50%;
}

#contain .newone .el-input{
    height: 25px;
    width: 70%;
}
#main .table .el-table .input-edit{
    width: 70%;
    float: left;
}

</style>