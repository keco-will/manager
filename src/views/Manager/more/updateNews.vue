<template>
    <div id="contain">
        <div class="header">
            <el-input class="title" placeholder="新闻标题" v-model="title"></el-input>
            <el-input class="publisher" placeholder="发布者" v-model="publisher"></el-input>
            <el-button type="success" round @click="publish()">确认修改</el-button>
            <input accept="*.pdf,*.txt,*.doc" type="file" name="image" @change="getFile($event)" />
        </div>
        <div class="write">
          <quill-editor
            class="mr-8"
            max-height="800"
            v-model="content"
            ref="myQuillEditor"
            style="height: 750px; width:1300px; margin:20px auto;"
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
            url:''
        }
    },
    methods: {
        onEditorChange({ html }) {
            this.content = html
        },
        getFile: function (event) {
            this.file = event.target.files[0];
        },
        publish(){
            this.$confirm('是否确认发表?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
                }).then(() => {
                    
                    let url;
                    let formdata = new FormData();
                    formdata.append("File",this.file);
                    this.$http.post('boss/upload',formdata).then((res)=>{
                        url=res.data.data
                    })
                    let announce={
                        id:this.$route.params.newsId,
                        title:this.title,
                        publisher:this.publisher,
                        context:this.content,
                        fileURL:url
                    };
                    this.$http.post('/boss/updatenews',{
                        news:announce
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
        },
        getData(){
            this.$http.get('boss/readNews',{
                params:{
                    id:this.$route.params.newsId
                }
            })
            .then((res)=>{
                let data=res.data.data;
                this.title=data.title;
                this.publisher=data.publisher;
                this.content=data.context;
            })
        }
    },
    components: {
        quillEditor
    },
    mounted(){
        this.getData();
    }
}
</script>

<style scoped>
#contain .write .quill-editor{
    background: white;
}
.header{
    width: 55%;
    margin: 0px auto;
}
.header .el-input{
    margin-top:5px ;
}
#contain{
    width: 100%;
    min-height: 100%;
    background: rgb(234,237,241);
}
#contain  .el-button.is-round{
    position: absolute;
    margin: 0px 10px;
}
input{
    position: absolute;
    top: 75px;
    margin: 10px;
}
</style>