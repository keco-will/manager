<template>
  <div id="contain">
      <el-container>
    <el-header style="text-align: right; font-size: 20px" >
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >基本信息管理</el-breadcrumb-item>
        <el-breadcrumb-item >新闻列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>
        <div id="main">
            <el-button round class="btn1" @click="goAddNews()">发布新闻</el-button>
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                prop="title"
                label="新闻列表">
                </el-table-column>
                <el-table-column
                prop="time"
                label="时间"
                width="220">
                </el-table-column>
                <el-table-column
                prop="publisher"
                label="发布者"
                width="120">
                </el-table-column>
                <el-table-column label="操作" width="200px;">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        tableData: [],
        totalCount:0
      }
    },
     methods: {
      handleEdit(index, row) {
        console.log(index, row);
          
      },
      handleDelete(index, row) {
        this.$http.get('/deletenews',{
            params:{
              id:row.id
            }
          }).then(()=>{

              this.$router.go(0)
          })
          
        console.log('成功');
      },
      goAddNews(){
          this.$router.push('/manager/addnews')
      },
       getDataList(){
          let per={};
           this.$http.get('/news').then((res)=>{
                let list = res.data.data;
                let len = list.length; 
                for(let i=0;i<len;i++){
                  per.title=list[i].title;
                  per.id=list[i].id;
                  per.publisher=list[i].publisher;
                  per.time=list[i].time;
                  this.tableData.push(per);
                  per={}
                }
                console.log(this.tableData)
           })
       },
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
  width: 100%;
  margin: 10px auto;
}
#main .btn1{
    background: rgb(80, 144, 182);
    margin-bottom: 20px;
    color: white;
    font-size: 20px;
}
#main .el-table{
  font-size: 20px;
}
#main .el-table .cell span{
    line-height: 28px;
}
</style>