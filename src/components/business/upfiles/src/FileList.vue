<template>
  <div v-if="fileList && fileList.length>0" >
    <dl class="list-files-box"  v-if="!filetwoStyle">
      <dd v-for="(item,index) in fileList" :key="index">
        <ul>
          <li class="list-logo">
            <img :src="setfileicon(item.name)" />
          </li>
          <li class="list-name">{{item.name}}({{tokbfun(item.size)}})</li>
          <li class="username">{{item.creatorName}}</li>
          <li class="file-times">{{setuptime(item.createdDate)}}</li>
          <li class="downdelfile">
            <p class="el-icon-download"
            @click="downFile(item.absolutePath , item.name)"
            ></p>
          </li>
        </ul>
      </dd>
    </dl>

    <!-- 第二种列表样式 -->
    <div class="list-filestwo-box" v-if="filetwoStyle"  >
      <ul v-for="(item,index) in fileList" :key="index">
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
        </li>
      </ul>
    </div>
  </div>
</template>

    
<script>
//我的工作台上传文件后的列表
import moment from "moment"
import { saveAs } from "file-saver";
import upfilefun from "./UpfileFun.js"


export default {
  name:"UpList",
  data(){
    return{}
  },
  props:{
    fileList:{
      type:[Object,Array]
    },
    filetwoStyle:{//上传附件列表的第二种样式
      type:Boolean,
      default:false
    },
  },
  methods:{
    setuptime(time){
      return moment(time).format('YYYY-MM-DD hh:mm:ss')
    },
    tokbfun(val){
      return upfilefun.tokbfun(val)
    },
    setfileicon(filename){
      return upfilefun.setfileicon(filename)
    },
    downFile(url, newFilename) {
      saveAs(url, newFilename, true);
    },
  }
}
</script>

<style lang="less" scoped>
@import '~./upfile.less';

</style>
