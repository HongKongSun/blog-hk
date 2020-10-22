<template>
  <div>
    <fin-container>
      <fin-aside :width="isCollapse ? '70px':'200px'">
        <sider-menu :isCollapse="isCollapse"></sider-menu>
      </fin-aside>
      <fin-container direction="vertical">
        <fin-header>
          <i
            :class="isCollapse ? 'el-icon-menu':'el-icon-bars'"
            class="triger"
            @click="isCollapse = !isCollapse"
          ></i>
          <Header />
        </fin-header>
        <fin-main>
          <router-view></router-view>
        </fin-main>
        <fin-footer>
          <Footer />
        </fin-footer>
      </fin-container>
    </fin-container>
    <setting-drawer></setting-drawer>
  </div>
</template>

<script>
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import SiderMenu from "@/layouts/SiderMenu";
import SettingDrawer from "../components/SettingDrawer";
export default {
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer
  },
  data() {
    return {
      isCollapse: true
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.el-main {
  line-height: 560px;
  color: #fff;
  background-color: #fff;
  text-align: center;
}
.triger {
  padding: 0 20px;
  line-height: 64px;
}
</style>
