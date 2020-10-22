import Vue from "vue";
import FinD from '@weus/fuc-design'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/styles/reset.css'
import '@weus/fuc-design/lib/theme-default/index.css';
//vue自定义滚动条配制
import vuescroll from 'vuescroll'

Vue.config.productionTip = false;

Vue.use(FinD);
//滚动条全局配置
Vue.use(vuescroll, {
  ops: {
    vuescroll: {},
    scrollPanel: {
      speed: 100,
      scrollingX: false,
    },
    rail: {},
    bar: {
      keepShow: true,
      background: '#E4E5EA',
      size: '4px',
    }
  },
})

// 引入/src/icons/svg/下所有的svg图片
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./assets/svg', false, /\.svg$/);
requireAll(req);


// import Robot from './components/business/robot/index'
// import MenuConfig from './components/business/menuconfig/index'
// import Tinymce from './components/business/Tinymce/index.vue'
// import LoadExcel from './components/business/UploadExcel/index.vue'


// Vue.use(Robot);
// Vue.use(MenuConfig);
// Vue.use(Tinymce);
// Vue.use(LoadExcel);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
