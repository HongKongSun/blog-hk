<template>
  <fin-menu
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    unique-opened="true"
  >
    <fin-sub-menu index="1">
      <template v-slot:title>
        <i class="el-icon-folder-opened"></i>
        <span slot="title">导航一</span>
      </template>
      <fin-menu-item-group fin-menu-item-group>
        <fin-menu-item index="1-1">选项1</fin-menu-item>
        <fin-menu-item index="1-2">选项2</fin-menu-item>
      </fin-menu-item-group>
    </fin-sub-menu>
    <fin-sub-menu index="2">
      <template v-slot:title>
        <i class="el-icon-folder-opened"></i>
        <span slot="title">导航一</span>
      </template>
      <fin-menu-item-group fin-menu-item-group>
        <fin-menu-item index="1-1">选项1</fin-menu-item>
        <fin-menu-item index="1-2">选项2</fin-menu-item>
      </fin-menu-item-group>
    </fin-sub-menu>
    <fin-sub-menu index="3">
      <template v-slot:title>
        <i class="el-icon-folder-opened"></i>
        <span slot="title">导航一</span>
      </template>
      <fin-menu-item-group fin-menu-item-group>
        <fin-menu-item index="1-1">选项1</fin-menu-item>
        <fin-menu-item index="1-2">选项2</fin-menu-item>
      </fin-menu-item-group>
    </fin-sub-menu>
  </fin-menu>
</template>

<script>
export default {
  props: ["isCollapse"],
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
