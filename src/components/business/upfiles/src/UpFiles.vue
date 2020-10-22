<template>
  <fin-upload
    ref="editupfile"
    class="upload-box "
    :class="{'upfile-two':filetwoStyle}"
    :action="fileurl"
    :before-upload="beforeUpload"
    :on-success="fileUploaded"
    :multiple="false"
    :disabled='uploading'
    >
    <fin-button slot="trigger" class="upbutton upbuttontwo" >
      <span>添加附件</span>
      <i class="el-icon-upload"></i>
    </fin-button>
    <dl class="list-files-box" v-if="newfilelist.length>0 && !filetwoStyle">
      <dd v-for="(item,index) in newfilelist" :key="index">
        <ul>
          <li class="list-logo">
            <img :src="setfileicon(item.name)" />
          </li>
          <li class="list-name overthreedot" 
          :style="{'max-width':proWidth+'px'}"
          :title="item.name"
          >{{item.name}}({{tokbfun(item.size)}})</li>
          <li class="username">{{item.creatorName}}</li>
          <li class="file-times">{{setuptime(item.createdDate)}}</li>
          <li class="downdelfile">
            <p class="el-icon-download"
            @click="downFile(item.absolutePath , item.name)"
            ></p>
            <p class="el-icon-delete" 
            @click="delfilesfun(index)"
            ></p>
          </li>
        </ul>
      </dd>
    </dl>
    <div v-show="uploading && !filetwoStyle" class="loadingbox">
      <img src="https://img11.360buyimg.com/imagetools/jfs/t1/128392/37/11454/19796/5f4dbe42E292ea1eb/4827541c621dac1d.gif" />
    </div>

    <div class="list-filestwo-box">
      <div class="inner"  v-if="newfilelist.length>0 && filetwoStyle">
        <ul v-for="(item,index) in newfilelist" :key="index" >
          <li class="list-logo">
            <img :src="setfileicon(item.name)" />
          </li>
          <li class='list-names'>
            <p class="file-name">
              <span class="overthreedot" :title="item.name">{{item.name}}</span>
              <b>({{tokbfun(item.size)}})</b>
            </p>
            <p class="user-name">{{item.creatorName}}&nbsp;{{setuptime(item.createdDate)}}</p>
          </li>
          <li class="downdelfile">
            <p class="el-icon-download"
            @click="downFile(item.absolutePath , item.name)"
            ></p>
            <p class="el-icon-delete" 
            @click="delfilesfun(index)"
            ></p>
          </li>
        </ul>
      </div>
      <div v-show="uploading && filetwoStyle" class="loadingbox ">
        <img src="https://img11.360buyimg.com/imagetools/jfs/t1/128392/37/11454/19796/5f4dbe42E292ea1eb/4827541c621dac1d.gif" />
      </div>
    </div>
    

  </fin-upload>
</template>

<script>

import moment from "moment"
import { saveAs } from "file-saver";

import upfilefun from "./UpfileFun.js"

//我的工作台上传文件
export default {
  name: "UpFiles",
  data(){
    return{
      fileurl:this.upfileurl,
      uploading:false,
      //上传展示列表
      nulllist:[],
      newfilelist:[],
    }
  },
  props:{
    fileList:{//默认已经上传的文件列表
      type:[Array],
      default:()=>[]
    },
    getfilelist:[Function],//当列表改变时父组件获取列表的方法
    // fatherdelfiles:[Function],//上传后的文件需要调接口删除，我的日报里边要传文件的url以作区分
    filetwoStyle:{//上传附件列表的第二种样式
      type:Boolean,
      default:false
    },
    proWidth:{
      type:[String,Number],
      default:'300'
    },
    upfileurl : [String],//上传的接口地址。例如“/api/file/home/upload/attachment”
  },
  computed:{
    loginmessage:function(){
      return this.$store.state.loginUser.loginMess
    }
  },
  watch:{
    fileList:{
      handler:function(){
        if(this.fileList.length>0){
          this.newfilelist =this.fileList
        }
      },
      deep:true,
      immediate:true
    }
  },
  methods:{

    downFile(url, newFilename) {//下截附件插件
      saveAs(url, newFilename, true);
    },

    setuptime(time){
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    tokbfun(val){
      return upfilefun.tokbfun(val)
    },
    setfileicon(filename){
      return upfilefun.setfileicon(filename)
    },
    
    fileUploaded (res, file, fileList) {
      if(res.code == 200){
        const currentfile = {
          name: file.name,
          size: file.size,
          absolutePath:res.data.absolutePath,//url
          relativePath:res.data.relativePath,//相对地址
          creatorName: this.loginmessage.realName,//用户名
          createdDate:res.data.uploadTime,//上传时间
        }
        this.newfilelist.push(currentfile)
        this.$emit('getfilelist')
        this.uploading = false
      }else{
        this.uploading=false
        this.$notify.error({
          title: '错误',
          message:res.message
        });
      }
      
    },
    beforeUpload(file){
      this.uploading = true
      const List = this.newfilelist
      let allsizes = 0
      List.map((item)=>{
        allsizes+=parseInt(item.size)
      })
      

      if( (file.size+allsizes ) /1024/1024 >50){
        this.$notify({
          title: '警告',
          message: `上传文件总容量不能超过50M,已上传${ this.tokbfun(allsizes) }
           , 剩余可上传${ this.tokbfun(1024*1024*50-allsizes) }`,
          type: 'warning'
        });
        this.uploading = false
        return false;
      }
      
    },
    
    
    //自定义文件删除
    delfilesfun(index){
      this.$confirm('确认删除？')
      .then(_ => {
        this.newfilelist.splice(index,1)
        this.$emit('getfilelist')
        done();
      })
      .catch(
        _ => {}
      );
    },

  },
  created(){
   
  },
  mounted(){
    
  }

  
}
</script>


<style lang="less" scoped>
@import '~./upfile.less';
</style>