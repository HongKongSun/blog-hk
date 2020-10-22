<template>
  <div>
    <fin-button
      size="large"
      type="primary"
      icon="el-icon-edit"
      @click="drawer1 = true"
      class="handle"
    ></fin-button>
    <fin-drawer title="我是标题" :visible.sync="drawer1" :with-header="false">
      <span>我来啦!</span>
    </fin-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer1: false
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.handle {
  position: absolute;
  top: 200px;
  right: 0;
  width: 48px;
  height: 48px;
  font-size: 20px;
}
</style>
