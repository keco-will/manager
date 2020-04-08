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
            <el-button round class="btn1 left" @click="goAddNews()">发布新闻</el-button>
            <el-input placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="search" class="input" v-on:change="filterTable"></el-input>
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                label="新闻列表">
                  <template slot-scope="scope">  
                        <el-button type="text" class="btn2" @click="forMore(scope.row)">{{scope.row.title}}</el-button>
                    </template>
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
        totalCount:0,
        search:''
      }
    },
     methods: {
      handleEdit(index, row) {
        console.log(index, row);
          
      },
      handleDelete(index, row) {
        this.$http.get('boss/deletenews',{
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
          this.tableData=[];
           this.$http.get('boss/news').then((res)=>{
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
           })
       },
        filterTable() {
          let fTable;
          if(this.search!=''){
              if (this.tableData) {
              fTable = this.tableData.filter(
                p => p.title.indexOf(this.search) != -1
              )
              this.tableData = fTable
            } else {
              this.getDataList();
            }
          }else{
            this.tableData=[];
            this.getDataList();
          }
      },
      forMore(row){
          this.$router.push({ name: 'updateNews', params: { newsId: row.id }});
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
    height: 100%;
    background: rgb(234,237,241);
}
.left{
  float: left;
}
.container .el-breadcrumb{
  line-height: 50px;
  font-size: 18px;
  height: 50px;
}
#contain .el-main{
    height: 100%;
    line-height: 100%;
}
#main{
  width: 100%;
  margin: 10px auto;
}
.input{
  width: 15%;
  margin-left:20px ;
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
    line-height: 26px;
    font-size: 16px;
}
#main .btn2 :hover{
    border-color: white;
}
</style>