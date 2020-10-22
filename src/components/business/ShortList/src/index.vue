<template>
  <div class="rules-box" style="height: 342px">
    <div class="rules_top">
      <p class="title">{{ title }}</p>
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
               <el-tab-pane label="规章制度" name="first"></el-tab-pane>
               <el-tab-pane label="新规速递" name="second"></el-tab-pane>
           </el-tabs> -->
    </div>
    <div class="listpanel" v-if="activeName == 'first'">
      <ul class="list-news" v-if="localInitLists.length">
        <li
          class="ul_list"
          v-for="(item, index) in localInitLists"
          :class="{
            active: item.active || false,
            hoveractive: item.hoveractive,
          }"
          @mouseenter="newslistenter(item)"
          @mouseleave="newslistover(index)"
          :key="index"
        >
          <div class="list_box">
            <div class="l_cont">
              <h3
                class="overthreedot"
                @click="checkDetail(item.guid)"
                v-text="item.title"
              ></h3>
            </div>
            <span class="r_time" v-text="getitemdate(item.updateTime)"></span>
          </div>
        </li>
      </ul>
      <withOutData v-else :maxHeight="194"></withOutData>
    </div>
    <div class="listpanel" v-else>
      <ul class="list-news">
        <li class="ul_list" v-for="(item, i) in newRulesList">
          <div class="cont">
            ○
            <p class="p_txt">{{ item.text }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="bottom" @click="jumpPath">
      <p>查看全部</p>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import _ from "lodash";

import withOutData from "./com/withOutData/index";
export default {
  name: "ShortList",
  components: { withOutData },
  data() {
    return {
      listtimer: "",
      localInitLists: [],
      onactivein: 0,
      activeName: "first",
      newRulesList: [
        { text: "新规速递" },
        { text: "新规速递" },
        { text: "新规速递" },
        { text: "新规速递" },
        { text: "新规速递" },
      ],
    };
  },
  props: ["institLists"],
  props: {
    institLists: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: "最新公告",
    },
  },
  methods: {
    //自定义动画
    listanimafun() {
      clearInterval(this.listtimer);
      let index = this.onactivein;
      let datas = this.localInitLists;
      if (datas.length == 1) return;
      let len = datas.length - 1;
      //清除默认
      datas.forEach((item) => {
        this.$set(item, "active", false);
      });
      this.$set(datas[index], "active", true);

      this.listtimer = setInterval(() => {
        datas.forEach((item) => {
          this.$set(item, "active", false);
        });
        index < len ? index++ : (index = 0);
        this.$set(datas[index], "active", true);
      }, 3000);
    },
    newslistenter(item) {
      //鼠标滑入时清除自动播放的定时器,当前元素加active
      let datas = this.localInitLists;
      clearInterval(this.listtimer);
      datas.forEach((item) => {
        this.$set(item, "active", false);
        this.$set(item, "hoveractive", false);
      });
      this.$set(item, "hoveractive", true);
    },
    newslistover(index) {
      //鼠标滑出时自动播放
      let datas = this.localInitLists;
      datas.forEach((item) => {
        this.$set(item, "active", false);
        this.$set(item, "hoveractive", false);
      });

      clearInterval(this.listtimer);
      this.onactivein = index < datas.length - 1 ? index + 1 : index;
      this.listanimafun();
    },
    //处理日期
    getitemdate(timedata) {
      return moment(timedata).format("MM-DD");
    },
    jumpPath() {
      // if(this.activeName=='first'){
      //     this.$myUtil.jumpRouter(this.$router,'institution')
      // }
      this.$emit("goList");
    },

    checkDetail(id) {
      // this.$myUtil.jumpRouter(this.$router,'institDetail',{id:id,type:0});
      this.$emit("goDetail", id);
    },
    handleClick() {},
  },
  mounted() {},
  watch: {
    //将列表的数据请求回来，自动执行播放动画
    institLists: {
      handler: function () {
        if (this.institLists.length > 0) {
          this.localInitLists = _.cloneDeep(this.institLists);
          clearInterval(this.listtimer);
          this.listanimafun();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  beforeDestroy() {
    if (this.listtimer) {
      clearInterval(this.listtimer);
    }
  },
};
</script>

<style lang="less" scoped>
blockquote,
body,
button,
dd,
dl,
fieldset,
figure,
form,
h1,
h2,
h3,
h4,
h5,
h6,
html,
input,
legend,
ol,
p,
pre,
td,
textarea,
th,
ul,
xmp :not(#htmluparse) {
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-family: Arial\, Microsoft Yahei, "\5FAE\8F6F\96C5\9ED1";
}
h3 {
  font-size: 14px;
}

.rules-box {
  width: 389px;
  margin-top: 15px;
  background: #fff;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative;
}
.rules_top {
  /*padding: 12px 2px 0px 24px;*/
  box-sizing: border-box;
  display: flex;
  margin: 0 24px;
  /deep/.el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #fff !important;
    z-index: 1;
  }

  /deep/.el-tabs__item {
    font-size: 16px;
  }
  .title {
    height: 54px;
    line-height: 54px;
    font-size: 16px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: rgba(13, 20, 30, 1);
  }
}
.listpanel {
  overflow: hidden;
  .list-news {
    .ul_list {
      cursor: pointer;
      height: 44px;
      overflow: hidden;
      padding: 0 24px 0 40px;
      background: url("https://img14.360buyimg.com/imagetools/jfs/t1/133686/16/8226/141/5f44fce4E9d303cc3/aa438cd30b5d38ec.png")
        24px center no-repeat;
      background-size: 4px auto;
      .list_box {
        display: flex;
        flex-flow: row wrap;
        padding: 12px 0 13px 0;
        justify-content: space-between;
      }
      .l_cont {
        width: 280px;
        display: flex;
        a {
          max-width: 242px;
          height: 19px;
          line-height: 19px;
          font-size: 14px;
          color: rgba(13, 20, 30, 1);
        }
        img {
          display: block;
          width: 32px;
          height: 16px;
          margin-left: 6px;
        }
      }
      .r_time {
        font-size: 12px;
        color: #8f939f;
      }
    }
    .ul_list:hover {
      .overthreedot {
        color: #2c68ff;
      }
    }
    li {
      transition: all 0.8s;
    }
    li.active,
    li.hoveractive {
      height: 44px;
      background-color: rgba(247, 248, 252, 1);
      background-image: url("https://img11.360buyimg.com/imagetools/jfs/t1/135356/39/8189/143/5f44fd88E15ae8709/ff6e37823455ff99.png");
    }
  }
}
.bottom {
  height: 48px;
  width: 100%;
  border-top: 1px solid rgba(234, 238, 241, 1);
  line-height: 48px;
  margin-top: 14px;
  position: absolute;
  left: 0;
  bottom: 0;
  cursor: pointer;
  p {
    font-weight: 700;
    line-height: 48px;
  }
  font-size: 14px;
  font-style: normal;
  color: #bec1ca;
  text-align: center;
}
</style>
