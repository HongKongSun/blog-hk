<template>
  <div class="web">
    <fin-form>
      <fin-form-item :label="selectMsg.name">
        <fin-select
          @change="Add"
          v-model="formExtend"
          filterable
          remote
          reserve-keyword
          :placeholder="selectMsg.holderMsg"
          :remote-method="searchCompany"
        >
          <fin-option
            v-for="item in dataList"
            :key="item.Code"
            :label="item.Name"
            :value="item.Code"
          ></fin-option>
        </fin-select>
      </fin-form-item>
      <fin-form-item v-if="selectData.length">
        <fin-tag
          v-for="item in selectList"
          :key="item.Code"
          closable
          :disable-transitions="false"
          @close="handleClose(item,selectData)"
        >{{item.Name}}</fin-tag>
      </fin-form-item>
    </fin-form>
  </div>
</template>

<script>
export default {
  // 对 datalist的数据要求  code是部门的编号 或者是人的erp  name 是部门的名称 是人的名字
  //selectMsg 数据要求  第一个name 是 前边的label  第二个是 holderMsg 是提示内容
  name: "selectSlot",
  props: ["selectMsg", "dataList"],
  data() {
    return {
      formExtend: "",
      selectData: []
    };
  },
  methods: {
    Add() {
      let obj = {};
      obj = this.dataList.find(item => {
        item.id = null;
        item.ynFlag = "1";
        return item.Code === this.formExtend;
      });
      if (this.checkInArr(obj.Code, "Code", this.selectData)) {
        this.selectData.push(obj);
        this.formExtend = null;
      } else {
        this.formExtend = null;
        this.$message({
          message: "不允许重复添加",
          type: "warning"
        });
      }
      this.$emit("getTagList", this.selectData);

      // this.$emit("change", obj, this.selectData);
    },
    //搜索
    searchCompany(query) {
      this.$emit("search", query);
    },
    //删除
    handleClose(tag, list) {
      //如果是新增则直接删除
      list.splice(list.indexOf(tag), 1);
      this.$emit("getTagList", this.selectData);
    },
    //去重
    checkInArr(code, key, list) {
      console.log(code, key, list);
      if (!list.length) return true;
      for (var i = 0; i < list.length; i++) {
        if (list[i][key] == code) {
          return false;
        }
      }
      return true;
    }
  },
  mounted() {},
  computed: {}
};
</script>

<style scoped lang='less'>
.web {
  text-align: left;
  .el-tag {
    margin-right: 5px;
  }
}
</style>
