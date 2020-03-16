<template>
  <div id="contain">
      <el-container>
    <el-header style="text-align: right; font-size: 20px" >
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >审批管理</el-breadcrumb-item>
        <el-breadcrumb-item >科研成果</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>
        <div id="main">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>

                <el-table-column
                label="时间"
                width="280">
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                label="姓名"
                width="180">
                <template slot-scope="scope">{{ scope.row.name}}</template>
                </el-table-column>
                <el-table-column
                label="待审核成果"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button type="text" class="btn1" @click="forMore(scope.row)">{{scope.row.waiting}}</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <el-button type="success" round @click="passAll()">批量通过</el-button>
                <el-button type="warning" round @click="toggleSelection()">取消选中</el-button>
            </div>
        </div>
     
        </el-main>
      </el-container>
  </div>
</template>

<script>
import qs from 'qs'
export default {
    data() {
      return {
        tableData: [],
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      passAll(){
          let all=this.multipleSelection;
          let that=this;
          let ids=[];
          for(let i =0;i<all.length;i++){
            ids.push(all[i].id);
          }
          console.log(ids)
          this.$http.get('/sciapproval'+'?'+qs.stringify({Ids:ids},{ arrayFormat: 'repeat' })
          ).then(res=>{
            if(res){
              that.multipleSelection=[];
              that.$message({
                  message: '审核通过成功',
                  type: 'success'
              });
              this.$router.go(0);
            }
          }).catch(error=>{
            console.log(error)
          })
         
      },
      forMore(row){
          this.$router.push({ name: 'more', params: { sincereId: row.id }})
      },
      getDataList(){
        let per={};
        let list=[];
          this.$http.get('/scis').then(res=>{
              console.log(res)
              list=res.data.data.scis;   //获取用户列表信息
              let len=list.length;
              for(let i=0 ;i<len;i++){
                per.date=list[i].time;
                per.name=list[i].uploads;
                per.waiting=list[i].entryname;
                per.id=list[i].id;
                this.tableData.push(per);
                per={};
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
    height: 1092px;
    background: rgb(243, 243, 243);
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
    border: 2px rgb(197, 197, 197) double;
    font-size: 20px;
}
#main .el-table .btn1 :hover{
    border-color: white;
}
#main{
    width: 75%;
    margin: 10px auto;
}
#main .el-table .el-button--text{
    color: rgb(25, 127, 216);
    font-size: 18px;
    background: white;
}
</style>