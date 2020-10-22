<template>
  <div class="svg-zone">
 

    <svg-icon icon-class="icon1" class-name="mysvg1"></svg-icon>
    <svg-icon icon-class="icon2" class-name="mysvg"></svg-icon>
    <svg-icon icon-class="icon3" class-name="mysvg"></svg-icon>
    <svg-icon icon-class="icon4" class-name="mysvg"></svg-icon>
    <svg-icon icon-class="icon5" class-name="mysvg"></svg-icon>



<h2>生效的方式</h2>




      <svg class="svgClass" aria-hidden="true" >
        <use xlink:href="#icon-icon4" />
      </svg>


      <svg class="svgClass"  fill="#596">
        <use xlink:href="#icon-icon4" />
      </svg>
  </div>
</template>

<script>
import svgIcon from '@/components/business/svgIcon/src/main'
export default {
  data(){
    return {
      
    }
  },
components : {
  svgIcon
}
}
</script>

<style>
.icon1{
 
  color: yellowgreen;
}

.svg-zone{
 
  font-size: 100px;

}

.mysvg{
  width: 100px;
  height: 100px;
  fill: red;
}

.mysvg1{
  fill: red;
}
.svgClass{
  width: 100px;
  height: 100px;
  color: yellowgreen;
  fill: yellow;
}


</style>