<template>
    <div id="contain">
        <div class="header">
            <el-input class="title" placeholder="题目" v-model="title"></el-input>
            <el-input class="publisher" placeholder="发布者" v-model="publisher"></el-input>
            <el-button type="success" round @click="publish()">发布</el-button>
        </div>
        <div class="write">
          <quill-editor
            class="mr-8"
            max-height="950"
            v-model="content"
            ref="myQuillEditor"
            style="height: 850px; width:1300px; margin:20px auto;"
            @change="onEditorChange($event)"
          >
          </quill-editor>
         
        </div>
        
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
    data(){
        return{
            content:null,
            title:'',
            publisher:'',
        }
    },
    methods: {
        onEditorChange({ html }) {
            console.log('editor change!', html)
            this.content = html
        },
        publish(){
            this.$confirm('是否确认发表?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
                }).then(() => {
                    this.$http.post('/addNews',{
                        title:this.title,
                        publisher:this.publisher,
                        context:this.content
                    }).then(()=>{
                        this.$message({
                            type: 'success',
                            message: '提交成功!'
                            });
                        this.content=null;
                        this.$router.go(-1)
                    })
                }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '发布失败'
                });          
                });
            
        }
    },
    components: {
        quillEditor
    },

}
</script>

<style scoped>
#contain .write .quill-editor{
    background: white;
}
.header{
    width: 70%;
    margin: 20px auto;
}
#contain{
    width: 100%;
    min-height: 1092px;
    background: rgb(221, 221, 221);
}
#contain  .el-button.is-round{
    position: absolute;
    margin: 0px 25px;
}

</style>