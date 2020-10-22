<template>
  <div class="width_out" :style="{height:maxHeight+'px'}">
    <div class="null_block">
      <img :src="outImg" class="img" alt="暂无数据">
      <p class="none_msg text_c">暂无数据</p>
    </div>
  </div>
</template>
<script>
export default {
  name:"OutLogin",
  props:['maxHeight'],
  data(){
    return{
      outImg:'https://img11.360buyimg.com/imagetools/jfs/t1/139191/27/6711/2773/5f44ff1cE743e37fd/3d2ff87a099e86d3.png',
    }
  },
  methods:{
  }
}
</script>
<style lang="less" scoped>
.width_out{
  width:100%;
  background:#fff;
  position: relative;
  .null_block{
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin:auto;
    width: 88px;
    height:88px;
    .img{

      width: 88px;
      height:88px;
    }
    .none_msg{
      height: 20px;
      line-height: 20px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(153,153,153,1);
    }
  }
  .text_c{
    text-align: center;
  }
}
</style>
