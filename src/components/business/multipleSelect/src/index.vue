<template>
    <fin-select
      v-model="innderVal"
      :value-key="valueKey"
      multiple
      filterable
      reserve-keyword
      :placeholder="placeholder"
      :loading="loading"
      remote
      :remote-method="remoteMethod"
    >
      <fin-option v-for="item in options" :key="item[id]" :label="item | labelFilter(label)" :value="item"></fin-option>
    </fin-select>
</template>



<script>
export default {
  name: 'MultSelect',
  props : {
    //   v-model绑定的值
      value : {
          type :  Array,
          default : []
      },
        // 作为 value 唯一标识的键名
      valueKey : {
          type :  String,
          default : 'id'
      },
      placeholder : {
          type : String,
          default : '请输入关键词'
      },
      // 指定唯一值
      id : {
        type : String,
        default : 'id'
      },
      // 指定需要展示的字段
      label : {
        type : String,
        default : 'label'
      },
    //   远程查询的
      remoteAction : {
          type : Function,
      },


  },
  data(){
    return {
      options : [],
      loading : false,
      innderVal : []
    }
  },

  filters:{
    labelFilter(item,label){
      let labelAry =  label.split("-");
      let result = "";
      for(let i =0;i<labelAry.length;i++){
        result += item[labelAry[i]] + "-"
      }
      result = result.substring(0,result.length - 1);
      return result;
    }
  },

  mounted(){
    this.innderVal = this.value;
    this.options = this.value;
  },

  watch:{
    innderVal(newVal,oldVal){
      if(newVal){
        this.$emit("input",newVal);
      }
    }
  },

  methods : {
    async  remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          try{
            this.options = await this.remoteAction(query);
            this.loading = false;
          }catch(err){
            this.loading = false;
            console.error(err);
          }
        } else {
          this.options = [];
        }
    }
  }
};
</script>