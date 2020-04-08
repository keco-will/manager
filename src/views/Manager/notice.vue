<template>
    <div id="contain">
        <div class="header">
            <el-input class="title" placeholder="题目" v-model="title"></el-input>
            <el-input class="publisher" placeholder="发布者" v-model="publisher"></el-input>
            <el-button type="success" round @click="publish()">发布</el-button>
            <input accept="*.pdf,*.txt,*.doc" type="file" name="image" @change="getFile($event)" />
        </div>
        <div class="write">
          <quill-editor
            class="mr-8"
            max-height="950"
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
            file:null,
            url:'',
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
            let notice={};
            this.$confirm('是否确认发表?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
                }).then(() => {
                   
                    let formdata = new FormData();
                    formdata.append("File",this.file);
                    this.$http.post('boss/upload',formdata).then((res)=>{
                        this.url = res.data.data;
                    })
                    
                    notice={
                        title:this.title,
                        publisher:this.publisher,
                        content:this.content,
                        fileurl:this.url
                    };
                    this.$http.post('boss/addannounce',{
                        Announce:notice
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