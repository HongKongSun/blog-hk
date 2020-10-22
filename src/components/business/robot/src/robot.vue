<template>
  <div :class="['robot-panel' , {'robot-panelfix':showfixstyle,'scroll-robot':fixscrolltop}]">
    <div class="hello-robot-in" v-show="hidehellovar">
      <!-- <span class="iconfont del-hello-btn">&#xe724;</span> -->
      <p class="robot-fonts">
        点我可以
        <br />快速创建任务喔～
      </p>
    </div>
    <img
      class="robot-img"
      src="https://img13.360buyimg.com/imagetools/jfs/t1/114565/23/14276/13531/5f2d1189E859998d5/8047f53f3746b129.png"
      @click="showlistlink=!showlistlink"
    />
    <div class="hello-linkbox" :class="{showlistbox:showlistlink}">
      <h6 class="link-title">快速创建</h6>
      <ul class="links-box">
        <li v-for="(item,index) of linksval" :key="index">
          <div class="inlibox" @click="gotopage(item.path , index)">
            <i class="iconfont" :class="item.icon"></i>
            <span class="text">{{item.title}}</span>
          </div>
        </li>
      </ul>
      <h3 class="tipshowup">
        <p @click="showlistlink=false">
          <span>收起</span>
          <!-- <i class="iconfont"></i> -->
        </p>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "RobotCreate",
  props: ["linksval"],
  data() {
    return {
      fixscrolltop: false, //跟据滚动条位置固定住小机器人
      showfixstyle: false, //跟据屏幕大小，定位进行变化
      hidehellovar: true, //打招呼框的展开收起
      showlistlink: true, //展开收起
      windowheight: 0
    };
  },
  components: {},
  methods: {
    createTask() {
      //任务弹框，这个方法大机器人子组件调用
      this.fromPage = {
        isFrom: "index"
      };
      this.$refs.createTasks.showCreateTask();
    },
    gotopage(pathname, linkindex) {
      const toindex = parseInt(linkindex);
      if (toindex == 0) {
        //判断是不是特殊用户
        this.createTask();
        // !this.usertype ? this.createTask() :(
        // 	this.$message({
        // 		showClose: true,
        // 		message: '敬请期待'
        // 	})
        // )
        // } else if (toindex == 2) {
        //   //日程
        //   this.$refs.addschedule.showAddSource();
        // }
      } else {
        this.$router.push({ path: pathname });
      }
    },
    handleScroll() {
      let top = Math.floor(
        document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageXOffset
      );
      top = parseInt(top);
      this.windowheight = window.innerHeight;
      if (top > 300) {
        this.fixscrolltop = true;
      } else {
        this.fixscrolltop = false;
      }
    },
    resizefun: function() {
      let windowwidth =
        document.body.clientWidth || document.documentElement.clientWidth;

      if (windowwidth > 1450) {
        const robotbox = document.getElementsByClassName("robot-panel")[0];
        robotbox.style.left = parseInt(windowwidth / 2 + 600 + 16) + "px";

        this.showfixstyle = false;
      } else {
        this.showfixstyle = true;
      }

      //提求语三秒消失
      const _this = this;
      setTimeout(function() {
        _this.hidehellovar = false;
      }, 3000);
    },
    handleOnresize() {
      this.resizefun();
      window.onresize = function() {
        this.resizefun();
      }.bind(this);
    }
  },

  created() {},
  mounted() {
    this.windowheight = window.innerHeight;
    const robotbox = document.getElementsByClassName("robot-panel")[0];
    robotbox.style.bottom = parseInt(this.windowheight * 0.1) + "px";

    window.addEventListener("scroll", this.handleScroll, true);
    this.handleOnresize();
  }
};
</script>
<style lang="less" scoped>
.robot-panel {
  transition: all 0.4s;
  z-index: 108;
  position: fixed;
  bottom: 30%;
  width: 108px;
  .hello-robot-in {
    position: relative;
    width: 108px;
    height: 51px;
    background: url("https://img14.360buyimg.com/imagetools/jfs/t1/148751/14/4792/3273/5f2d1189E2627d1c3/e869f6abed0c5454.png")
      left top no-repeat;
    background-size: 100%;
    // .del-hello-btn{
    // 	display: block;
    // 	position: absolute;
    // 	top: 6px;
    // 	right: 6px;
    // 	font-size: 12px;
    // 	color: #fff;
    // 	cursor: pointer;
    // }
    p.robot-fonts {
      padding: 6px 6px 11px 6px;
      line-height: 17px;
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
    }
  }
  .robot-img {
    display: block;
    width: 101px;
    margin-left: 7px;
    cursor: pointer;
  }
  .tipshowup {
    margin: 0;
    height: 17px;
    line-height: 17px;
    padding-top: 5px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    p {
      width: 50%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      span {
        margin-right: 2px;
      }
      i,
      span {
        display: block;
      }
    }
  }

  .hello-linkbox {
    width: 100px;
    height: 180px;
    padding-top: 45px;
    margin: -63px 0 0 8px;
    background: url("https://img10.360buyimg.com/imagetools/jfs/t1/117709/14/14320/15021/5f2d1189E6c5f05a3/9c93104cdd5f1fbd.png")
      left top no-repeat;
    background-size: 100%;
    height: 0;
    padding-top: 0;
    margin-top: 0;
    overflow: hidden;
    transition: height 0.1s;
    &.showlistbox {
      transition: height 0.3s;
      height: 180px;
      padding-top: 45px;
      margin-top: -63px;
    }
    .link-title {
      margin: 0;
      margin-bottom: 10px;
      line-height: 17px;
      padding-left: 12px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
    }
    .links-box {
      padding: 0;
      margin: 0;
      padding-top: 2px;
      li {
        list-style: none;
        padding: 0;
        cursor: pointer;
        padding: 0 10px 0 10px;
        &:hover {
          background: rgba(13, 20, 30, 0.2);
        }
        .inlibox {
          display: flex;
          height: 31px;
          line-height: 31px;
          font-size: 14px;
          color: rgba(255, 255, 255, 1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          i {
            display: block;
            margin: 0 4px 0 2px;
            font-size: 16px;
          }
          span {
            display: block;
          }
        }
      }
    }
  }
}
.robot-panelfix {
  transition: all 0.4s;
  left: auto !important;
  right: 0 !important;
}
.scroll-robot {
  transition: all 0.4s;
  bottom: 205px !important;
}
.iconfont {
  padding-top: 7px;
}
.text {
  flex: 1;
}
</style>
