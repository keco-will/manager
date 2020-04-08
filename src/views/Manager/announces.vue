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
            <el-button round class="btn1 left" @click="goAddNotice()">发布公告</el-button>
            <el-input placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="search" class="input" v-on:change="filterTable"></el-input>
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                prop="title"
                label="公告列表">
                    <template slot-scope="scope"> 
                        <el-button type="text" class="btn2" @click="forMore(scope.row)">{{scope.row.title}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="time"
                label="时间"
                width="245">
                </el-table-column>
                <el-table-column
                prop="publisher"
                label="发布者"
                width="140">
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
        search:'',
      }
    },
     methods: {
      handleEdit(index, row) {
        console.log(index, row);
          
      },
      handleDelete(index, row) {
        this.$http.get('boss/deleteannounce',{
            params:{
              id:row.id
            }
          }).then(()=>{
              this.$router.go(0)
          })
      },
      forMore(row){
          this.$router.push({ name: 'updateNotice', params: { announceId: row.id }});
      },
      goAddNotice(){
          this.$router.push('/manager/notice')
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
       getDataList(){
          let per={};
          this.tableData=[];
           this.$http.get('boss/announces').then((res)=>{
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
  line-height: 50px!important;
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
    line-height: 25px;
    font-size: 16px;
}
#main .btn2 :hover{
    border-color: white;
}
.input{
  width: 15%;
  margin-left:20px ;
}
#main .el-table .el-button--text{
    color: rgb(25, 127, 216);
    font-size: 16px;
    background: white;
}
</style>