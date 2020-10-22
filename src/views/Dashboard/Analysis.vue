<template>
  <div>
    <Swiper :dataList="picArr"></Swiper>
    <select-slot
      @getTagList="getParams"
      :selectMsg="selectMsg"
      :selectData="dataList"
      @search="searchDepart"
    ></select-slot>

    <div>
      <tinymce v-model="content" :height="300" />
      <div class="editor-content" v-html="content" />
    </div>

    <robot :linksval="linksval"></robot>
    <menu-config
      :allapplydata="allapplydata"
      :applylist="applylist"
      @submit="submit"
      :ishandadd="true"
      :ishistoryadd="false"
    ></menu-config>
    <UploadExcel />
  </div>
</template>

<script>
import Robot from "../../components/business/robot/index";
// import MenuConfig from "../../components/business/menuconfig/src/ManagePart";
import MenuConfig from "../../components/business/menuconfig/index";
import Swiper from "../../components/business/Swiper/Swiper";
import SelectSlot from "../../components/business/selectSlot/index";

import Tinymce from "../../components/business/Tinymce/index";
import UploadExcel from "../../components/business/UploadExcel/index";

export default {
  data() {
    return {
      dataList: [
        { Code: "1", Name: "JDD1" },
        { Code: "2", Name: "JDD2" },
        { Code: "3", Name: "JDD3" },
        { Code: "4", Name: "JDD4" }
      ],
      selectMsg: {
        name: "工商名称",
        holderMsg: "请输入工商名称"
      },
      content: ``,
      picArr: [
        {
          image: "https://img1.sycdn.imooc.com/5ee2efe000013f2f18720764.jpg",
          link: ""
        },
        {
          image: "https://img1.sycdn.imooc.com/5ee24f3000017d0218720764.jpg",
          link: ""
        },
        {
          image: "https://img1.sycdn.imooc.com/5ed9db4c0001b36418720764.jpg",
          link: ""
        },
        {
          image: "https://img1.sycdn.imooc.com/5ee1d3dd00012d7b18720764.jpg",
          link: ""
        },
        {
          image: "https://img1.sycdn.imooc.com/5ee0af4b0001fbda18720764.jpg",
          link: ""
        }
      ],
      linksval: [
        { title: "标签", icon: "el-icon-tag", path: "" },
        { title: "菜单选项", icon: "el-icon-bars", path: "" },
        { title: "登录", icon: "el-icon-login", path: "" },
        { title: "声音", icon: "el-icon-sound", path: "" }
      ],
      applylist: [
        {
          linkUrl: "",
          iconUrl:
            "https://img12.360buyimg.com/imagetools/jfs/t1/138869/12/6000/2918/5f3e4b08Ee707725c/9c7cbd305a9fd8da.png",
          name: "block1"
        },
        {
          linkUrl: "",
          iconUrl:
            "https://img12.360buyimg.com/imagetools/jfs/t1/138869/12/6000/2918/5f3e4b08Ee707725c/9c7cbd305a9fd8da.png",
          name: "block2"
        },
        {
          linkUrl: "",
          iconUrl:
            "https://img12.360buyimg.com/imagetools/jfs/t1/138869/12/6000/2918/5f3e4b08Ee707725c/9c7cbd305a9fd8da.png",
          name: "block3"
        }
      ],
      allapplydata: [
        {
          linkUrl: "",
          iconUrl:
            "https://img12.360buyimg.com/imagetools/jfs/t1/138869/12/6000/2918/5f3e4b08Ee707725c/9c7cbd305a9fd8da.png",
          name: "block4"
        },
        {
          linkUrl: "",
          iconUrl:
            "https://img12.360buyimg.com/imagetools/jfs/t1/138869/12/6000/2918/5f3e4b08Ee707725c/9c7cbd305a9fd8da.png",
          name: "block5"
        },
        {
          linkUrl: "",
          iconUrl:
            "https://img12.360buyimg.com/imagetools/jfs/t1/138869/12/6000/2918/5f3e4b08Ee707725c/9c7cbd305a9fd8da.png",
          name: "block6"
        }
      ]
    };
  },
  components: {
    MenuConfig,
    Robot,
    Tinymce,
    UploadExcel,
    Swiper,
    SelectSlot
  },
  created() {},
  mounted() {},
  methods: {
    submit(val) {
      console.log(val);
    },
    getParams(val) {
      console.log(val);
    },
    searchDepart(query) {
      //模糊搜索部门列表
      if (query == "") {
        this.departmentLists = [];
        return;
      }
    }
  }
};
</script>

<style scoped lang="less">
.editor-content {
  margin-top: 20px;
}
</style>
