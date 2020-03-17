<template>
    <div id="contain">
        <el-container>
            <el-header style="text-align: right; font-size: 20px" >
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >权限管理</el-breadcrumb-item>
                <el-breadcrumb-item >权限列表</el-breadcrumb-item>
            </el-breadcrumb>
            </el-header>
            <el-main>
            <div id="main">
                <el-table
                border
                :data="tableData"
                style="width: 100%">
                <el-table-column
                label="角色"
                width="380">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.role}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="权限等级"
                width="">
                <template slot-scope="scope">
                    <el-tag
                    :key="tag"
                    v-for="tag in scope.row.dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag,scope.row)">
                    {{tag}}
                    </el-tag>
                    <el-input
                    class="input-new-tag"
                    v-if="scope.row.inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(scope.row)"
                    @blur="handleInputConfirm(scope.row)">
                    </el-input>
                    <!-- <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button> -->
                </template>
                </el-table-column>
                
            </el-table>
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
                role:'高校',
                dynamicTags:['一级','二级'] ,   //权限等级的数组
                inputVisible: false,
            },
            {
                role:'企业',
                dynamicTags:['一级','二级'],  
                inputVisible: false,  
            },
            {
                role:'管理员',
                dynamicTags:['一级','二级'] ,   
                inputVisible: false,
            }
        ],
        inputValue: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleClose(tag,row) {
          console.log(tag)
        row.dynamicTags.splice(row.dynamicTags.indexOf(tag), 1);
        //向后台请求删除这个人的权限tag
      },

      showInput(row) {
        row.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
          console.log(_)
        });
      },

      handleInputConfirm(row) {
        let inputValue = this.inputValue;
        if (inputValue) {
          row.dynamicTags.push(inputValue);
          //向后台请求添加这个人的权限inputValue
        }
        row.inputVisible = false;
        this.inputValue = '';
      },
      getDataList(){
           this.$http.get('').then(res=>{
               this.tableData=res.data.data.list;   //获取用户列表信息
               //do_something

               this.totalCount=this.tableData.length;
           })
       },
    },
    mounted(){
        this.getDataList()
    }
  }
</script>
<style scoped>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

#contain{
    width: 100%;
    height: 100%;
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
#main .el-table{
    border: 1px black solid;
}
#main{
    height: 100%;
    background-color: white;
    width: 70%;
    margin: 10px auto;
    border:1px black solid;
} 
</style>