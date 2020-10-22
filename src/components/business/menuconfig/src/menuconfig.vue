<template>
  <div>
    <div class="com-app-box">
      <h3 class="com-app-title">常用应用</h3>
      <ul class="app-list clearfloat" v-if="dayapplist.length">
        <li v-for="(item , index) in dayapplist" :key="index" @click="gotolink(item.linkUrl)">
          <img :src="item.iconUrl" />
          <h3>{{item.name}}</h3>
        </li>
        <!-- @click="addappdialog = true" -->
        <li class="add-app-btn" @click="showApplayDialog">
          <img
            src="https://img10.360buyimg.com/imagetools/jfs/t1/138258/40/5991/1046/5f3e4b08E0174deea/c6f7874b54b30c6e.png"
          />
          <h3>自定义</h3>
        </li>
      </ul>
    </div>

    <!-- 弹出框 -->
    <div class="dialogs-panel">
      <fin-dialog
        title="自定义常用应用"
        :visible.sync="addappdialog"
        width="921px"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <dl class="dialog-box">
          <dt class="day-app-box">
            <h3 class="dayapp-title">常用应用（从右侧进行拖拽添加）</h3>

            <div class="dayapp-box">
              <vue-scroll>
                <!-- @change="log" -->
                <draggable
                  class="dayapp-group"
                  v-model="dayapplist"
                  group="applist"
                  @start="isShowDelZone=true"
                  @end="isShowDelZone=false"
                >
                  <div
                    class="day-group-item"
                    v-for="(item, index) in dayapplist"
                    :key="item.name+index"
                  >
                    <img :src="item.iconUrl" />
                    <h4>{{ item.name }}</h4>
                  </div>
                </draggable>
              </vue-scroll>
            </div>
          </dt>
          <dd class="addapp-panel">
            <ul class="addmenu-box">
              <li
                :class="{active:addnemuactive==index}"
                v-for="(menu,index) in addmenu"
                :key="menu.name+index"
                @click="changemenuactive(index)"
              >
                <span v-if="menu.isshow">{{menu.name}}</span>
              </li>
            </ul>

            <div class="changebox">
              <div class="dayapp-box" v-show="showdetail">
                <vue-scroll>
                  <draggable
                    class="dayapp-group"
                    v-model="currentlistnew"
                    group="applist"
                    @start="drag=true"
                    @end="drag=false"
                  >
                    <div
                      v-show="currentlistnew.length>0"
                      class="day-group-item"
                      v-for="(item, index) in currentlistnew"
                      :key="index"
                    >
                      <img :src="item.iconUrl" />
                      <h4>{{ item.name }}</h4>
                    </div>
                    <div v-show="currentlistnew.length<=0" class="nodatas-box">
                      <span class="noimg"></span>
                      <p>暂无相关应用</p>
                    </div>
                  </draggable>
                </vue-scroll>
              </div>
              <!-- 手动添加 -->
              <div v-show="!showdetail">
                <div class="haddapp">
                  <fin-form
                    :model="addFormList"
                    :rules="rules"
                    ref="addFormList"
                    labfin-width="52px"
                  >
                    <fin-form-item label="名称" prop="name">
                      <fin-input v-model="addFormList.name"></fin-input>
                    </fin-form-item>
                    <fin-form-item label="网址" prop="linkUrl">
                      <fin-input v-model="addFormList.linkUrl" placeholder="http://"></fin-input>
                    </fin-form-item>
                    <fin-form-item label="图标" prop="iconUrl">
                      <ul class="comicon-box">
                        <li
                          v-for="(val,index) in comiconlist"
                          :key="index"
                          :class="[{active:activeicon == index},`${val.alias}icon`]"
                          @click="seticonfun(val.tagUrl) , setactiveIcon(index)"
                        >
                          <span></span>
                        </li>
                      </ul>
                    </fin-form-item>
                    <fin-form-item>
                      <fin-button type="primary" @click="submitForm('addFormList')">添加</fin-button>
                      <fin-button @click="resetForm('addFormList')">重置</fin-button>
                    </fin-form-item>
                  </fin-form>
                </div>
              </div>

              <draggable
                class="dfin-panel"
                v-show="isShowDelZone"
                v-model="delitemlist"
                group="applist"
                @start="drag=true"
                @end="drag=false"
                @add="dodelfun"
              >
                <div class="del">
                  <i class="fin-icon-delete delicon"></i>
                </div>
              </draggable>
            </div>
          </dd>
        </dl>

        <span slot="footer" class="dialog-footer">
          <fin-button @click="getResetList()">恢复默认设置</fin-button>
          <fin-button type="primary" @click="saveComList">保 存</fin-button>
        </span>
      </fin-dialog>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

//api
//import $http from "@/https/myworks.js"
//常用应用
export default {
  name: "MenuConfig",
  props: ["applylist", "allapplydata", "ishandadd", "ishistoryadd"],
  data() {
    return {
      // handadd: false,
      // historyadd: false,

      addappdialog: false,

      addnemuactive: 0,
      showdetail: true,
      addmenu: [
        { name: "全部应用", isshow: true },
        { name: "手动添加", isshow: this.ishandadd },
        { name: "历史添加", isshow: this.ishistoryadd }
      ],

      //拖拽
      currentlist: [], //每次重置来自allcomlist,用来与dayapplist对比计算出currentlistnew
      currentlistnew: [], //弹框左边的
      dayapplist: [], //弹框左边的
      allcomlist: [], //右边的所有接口返回的列表
      delitemlist: [], //暂存无用
      isShowDelZone: false, //显隐删除框
      //api数据

      //工作台常用应用列表
      // applylist: [],
      //手动添加
      comiconlist: [],
      activeicon: -1,
      addFormList: {
        name: "",
        linkUrl: "http://",
        iconUrl: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入图标名称", trigger: "blur" },
          { min: 1, max: 7, message: "长度在 1 到 7 个字符", trigger: "blur" }
        ],
        linkUrl: [
          { required: true, message: "请输入url地址", trigger: "blur" },
          {
            type: "url",
            message: "请输入正确的url",
            trigger: ["blur", "change"]
          }
        ],
        iconUrl: [
          { required: false, message: "必须选中一个图标", trigger: "blur" }
        ]
      }
    };
  },
  // computed:{
  //   historyshow:function(){
  //     return this.historylist.length>0
  //   }
  // },
  components: {
    draggable
  },
  watch: {
    applylist: {
      deep: true,
      handler(val) {
        this.dayapplist = val;
      }
    },
    allapplydata: {
      deep: true,
      handler(val) {
        this.allcomlist = val;
      }
    },
    currentlist: function(newlist) {
      console.log(newlist);
      let comlist = [];
      newlist.map((fitem, index) => {
        let haveitem = false;
        this.dayapplist.map((citem, itemindex) => {
          fitem.name == citem.name ? (haveitem = true) : "";
        });
        haveitem ? "" : comlist.push(fitem);
      });
      console.log(this.currentlistnew);
      this.currentlistnew = comlist;
    },
    delitemlist: function(newlist) {
      newlist.map((fitem, index) => {
        let haveitem = false;
        this.currentlistnew.map((citem, itemindex) => {
          fitem.name == citem.name ? (haveitem = true) : "";
        });
        haveitem ? "" : this.currentlistnew.push(fitem);
      });
      console.log(this.currentlistnew);
    },
    dayapplist: function() {
      let listlen = this.dayapplist.length;
      if (listlen > 8) {
        this.$notify({
          title: "警告",
          message: "应用数量不能大于8",
          type: "warning",
          duration: 2000
        });
      }
    }
  },
  methods: {
    gotolink(url) {
      window.open(url);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.dialoginitfun();
          done();
        })
        .catch(_ => {});
    },

    changemenuactive(index) {
      //切换菜单
      this.addnemuactive = index;
      index == 1 ? (this.showdetail = false) : (this.showdetail = true);
      this.dodelfun();
    },

    //手动添加application
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = this.addFormList;
          this.$emit("submit", this.addFormList);
          $http.setCustomApp(params).then(data => {
            this.$message({
              message: "应用已经添加到历史添加组",
              type: "success"
            });
            this.resetForm("addFormList"); //重置
            // this.getApplyList()//重新调列表
            // this.getAllcomList(); //全部-历史数据
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      //重置表单
      this.$refs[formName].resetFields();
      this.activeicon = -1;
    },
    seticonfun(valurl) {
      this.$set(this.addFormList, "iconUrl", valurl);
    },
    setactiveIcon(val) {
      this.activeicon = val;
    },

    //显示删除的回调add方法
    dodelfun() {
      console.log(this.delitemlist);
      console.log(this.currentlistnew);
      const activeli = parseInt(this.addnemuactive);
      console.log("删除");
      if (activeli == 0) {
        //常用应用列表
        //this.currentlistnew=[]
        this.allcomlist[0] ? (this.currentlist = this.allcomlist[0]) : "";
      } else if (activeli == 2) {
        //历史应用列表
        this.currentlistnew = [];
        this.allcomlist[1]
          ? (this.currentlist = JSON.parse(JSON.stringify(this.allcomlist[1])))
          : "";
      } else {
        return;
      }
    },

    dialoginitfun() {
      this.addnemuactive = 0;
      this.showdetail = true;
      this.resetForm("addFormList"); //重置添加表单
      //重新调接口
      // this.getApplyList(); //工作台列表及弹框列表
    },
    log: function(evt) {
      // window.console.log(evt);
    },
    showApplayDialog() {
      //打开弹框
      this.addappdialog = true;
      // this.getApplyList();
      // this.getAllcomList(); //全部-历史数据
    },

    //api
    // getApplyList() {
    //   //查询我的工作台-常用应用列表同时设置左历的列表
    //   let data = [
    //     {
    //       linkUrl: "",
    //       iconUrl: require("../assets/image/menuConfig/law_01.png"),
    //       name: "block1"
    //     },
    //     {
    //       linkUrl: "",
    //       iconUrl: require("../assets/image/menuConfig/law_01.png"),
    //       name: "block2"
    //     },
    //     {
    //       linkUrl: "",
    //       iconUrl: require("../assets/image/menuConfig/law_01.png"),
    //       name: "block3"
    //     },
    //     {
    //       linkUrl: "",
    //       iconUrl: require("../assets/image/menuConfig/law_01.png"),
    //       name: "block4"
    //     }
    //   ];
    //   this.applylist = data;
    //   this.dayapplist = data;
    //   return;
    //   $http.getApplyList().then(data => {
    //     this.applylist = [];
    //     this.applylist = data;
    //     this.dayapplist = [];
    //     this.dayapplist = data;
    //   });
    // },
    getResetList() {
      //恢复默认设置
      this.$confirm("确认恢复默认设置？")
        .then(_ => {
          $http.getResetList().then(() => {
            //重置接口
            this.dialoginitfun();
            this.addappdialog = false; //关
          });
        })
        .catch(_ => {});
      this.$emit("resetList", false);
    },
    // getAllcomList() {
    //   //获取弹框的列表，全部-历史添加
    //   let data = [
    //     {
    //       linkUrl: "",
    //       iconUrl: require("../assets/image/menuConfig/law_01.png"),
    //       name: "block1"
    //     },
    //     {
    //       linkUrl: "",
    //       iconUrl: require("../assets/image/menuConfig/law_01.png"),
    //       name: "block2"
    //     },
    //     {
    //       linkUrl: "",
    //       iconUrl: require("../assets/image/menuConfig/law_01.png"),
    //       name: "block3"
    //     },
    //     {
    //       linkUrl: "",
    //       iconUrl: require("../assets/image/menuConfig/law_01.png"),
    //       name: "block4"
    //     }
    //   ];

    //   this.dodelfun();
    //   return;
    //   $http.getAllcomList().then(data => {
    //     //二维数组
    //     this.allcomlist = [];
    //     this.allcomlist = data;
    //     this.dodelfun();
    //   });
    // },
    saveComList() {
      //保存常用应用列表
      if (this.dayapplist.length > 8) {
        this.$notify({
          title: "警告",
          message: "应用数量不能大于8",
          type: "warning",
          duration: 2000
        });
      } else {
        this.$confirm("确认保存？")
          .then(_ => {
            let listarr = [];
            this.dayapplist.map((value, index) => {
              listarr.push(value.id);
            });
            const listval = listarr.toString();
            // const params ={
            //   "appIds": listval
            // }

            this.addappdialog = false;
            $http.saveComList(listval).then(() => {
              this.dialoginitfun();
              this.addappdialog = false;
              this.$message({
                message: "保存成功",
                type: "success"
              });
            });
          })
          .catch(_ => {});
      }
      this.$emit("saveList", this.dayapplist);
    },

    getAppIcon() {
      //手动添加常用应用列表图标接口
      $http.getAppIcon().then(data => {
        this.comiconlist = data;
        //this.$set( this.addFormList,"iconUrl" , data[0].tagUrl)//设置默认
      });
    }
  },
  mounted() {
    this.dayapplist = this.applylist;
    this.currentlist = this.allapplydata;
  }
};
</script>

<style lang="less" scoped>
@keyframes pulseani {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(0.95, 0.95, 0.95);
    transform: scale3d(0.95, 0.95, 0.95);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.com-app-box {
  // height: 429px;
  padding: 0 12px;
  background: #ffffff;
  box-shadow: 0 2px 20px 0 rgba(13, 20, 30, 0.05);
  border-radius: 6px;
  .com-app-title {
    height: 56px;
    line-height: 56px;
    margin: 0 12px 24px 12px;
    font-size: 16px;
    font-weight: bold;
    color: #0d141e;
    letter-spacing: 0.47px;
    border-bottom: 1px solid #e9e9e9;
  }
  .app-list {
    height: 348px;
    li {
      list-style: none;
      cursor: pointer;
      float: left;
      height: 88px;
      width: 92px;
      margin-bottom: 26px;

      img {
        display: block;
        width: 62px;
        height: 62px;
        margin: 0 auto;
      }
      h3 {
        margin-top: 10px;
        line-height: 16px;
        font-size: 12px;
        text-align: center;
        color: rgba(13, 20, 30, 1);
      }
      &:hover {
        animation: pulseani 0.4s;
        h3 {
          color: #2c68ff;
        }
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
    }

    li.add-app-btn {
    }
  }
}

.dialogs-panel {
  /deep/.fin-dialog__body {
    padding: 0 0 13px 0;
  }
  .dialog-box {
    display: flex;
    flex-flow: row wrap;
    border-top: 1px solid rgba(13, 20, 30, 0.1);
    border-bottom: 1px solid rgba(13, 20, 30, 0.1);

    .dayapp-box {
      height: 344px;
    }
    .nodatas-box {
      padding: 89px 17px 0 0;
      .noimg {
        display: block;
        width: 100px;
        height: 90px;
        margin: 0 auto;
        background: url("https://img12.360buyimg.com/imagetools/jfs/t1/129803/37/7513/349/5f3e4b08Eef748910/324416f0483447b8.png")
          left top no-repeat;
        background-size: 100% 100%;
      }
      p {
        height: 20px;
        line-height: 20px;
        margin-top: 20px;
        font-size: 16px;
        text-align: center;
        color: rgba(13, 20, 30, 0.1);
      }
    }
    .dayapp-group {
      padding-left: 9px;
      min-height: 344px;
      &::after {
        display: block;
        height: 0;
        content: "";
        clear: both;
        visibility: hidden;
      }
      .day-group-item {
        float: left;
        width: 92px;
        height: 112px;
        margin-bottom: 2px;
        background: #fff;

        img {
          display: block;
          width: 62px;
          height: 62px;
          margin: 12px auto 0 auto;
        }
        h4 {
          height: 16px;
          line-height: 16px;
          padding-top: 6px;
          font-size: 12px;
          text-align: center;
          color: rgba(13, 20, 30, 1);
        }
        &:hover {
          animation: pulseani 0.4s;
          h4 {
            color: #2c68ff;
          }
        }
      }
    }
    .day-app-box {
      width: 294px;
      border-right: 1px solid rgba(13, 20, 30, 0.1);
      .dayapp-title {
        height: 19px;
        line-height: 19px;
        padding: 24px 0 12px 24px;
        font-size: 14px;
        color: rgba(13, 20, 30, 1);
      }
    }
    .addapp-panel {
      position: relative;
      width: 530px;
      .addmenu-box {
        display: flex;
        padding: 24px 32px 0 32px;
        li {
          position: relative;
          cursor: pointer;
          height: 19px;
          line-height: 19px;
          padding-bottom: 6px;
          margin-right: 34px;
          font-size: 14px;
          list-style: none;
          color: rgba(13, 20, 30, 1);
          &:last-child {
            margin-right: 0;
          }

          &.active {
            font-weight: bold;
            color: rgba(44, 104, 255, 1);
            &:after {
              position: absolute;
              bottom: 0;
              left: 50%;
              margin-left: -8px;
              content: "";
              width: 16px;
              height: 2px;
              background: rgba(48, 106, 255, 1);
              border-radius: 1px;
            }
          }
        }
      }
      .dayapp-group {
        padding-left: 0;
        padding: 6px 0 0 17px;
        min-height: 338px;
      }
      .haddapp {
        width: 364px;
        padding: 18px 0 0 32px;

        .comicon-box {
          display: flex;
          flex-flow: row wrap;
          li {
            cursor: pointer;
            position: relative;
            width: 32px;
            height: 32px;
            margin-right: 8px;
            border-radius: 2px;
            span {
              display: block;
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              background-position: left top;
              background-repeat: no-repeat;
              background-size: 100%;
              background-color: none;
            }
            &:last-child {
              margin-right: 0;
            }
            &.active {
              span {
                background-image: url("https://img11.360buyimg.com/imagetools/jfs/t1/113620/34/15340/432/5f3e4b08Eb80b6ea5/a5e0503e6e080c69.png");
              }
            }
            &.redicon {
              background: linear-gradient(
                180deg,
                rgba(238, 54, 36, 1) 0%,
                rgba(252, 131, 110, 1) 100%
              );
            }
            &.yellowicon {
              background: linear-gradient(
                180deg,
                rgba(244, 161, 0, 1) 0%,
                rgba(252, 227, 97, 1) 100%
              );
            }
            &.greenicon {
              background: linear-gradient(
                180deg,
                rgba(102, 199, 0, 1) 0%,
                rgba(193, 244, 100, 1) 100%
              );
            }
            &.lightblueicon {
              background: linear-gradient(
                180deg,
                rgba(0, 156, 219, 1) 0%,
                rgba(121, 219, 243, 1) 100%
              );
            }
            &.deepblueicon {
              background: linear-gradient(
                180deg,
                rgba(48, 106, 255, 1) 0%,
                rgba(106, 163, 255, 1) 100%
              );
            }
            &.purpleicon {
              background: linear-gradient(
                180deg,
                rgba(114, 79, 240, 1) 0%,
                rgba(171, 133, 255, 1) 100%
              );
            }
          }
        }
      }
      .dfin-panel {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        display: flex;
        .day-group-item {
          display: none;
        }
        .del {
          flex: 1;
          background: rgba(255, 255, 255, 0.8);
          border: 2px dashed rgba(13, 20, 30, 0.1);
          display: flex;
          justify-content: center;
          align-items: center;
          .delicon {
            font-size: 55px;
            color: rgba(153, 156, 163, 1);
          }
        }
      }

      /deep/.fin-tabs__header {
        padding-left: 15px;
      }
      /deep/.fin-tabs__nav-wrap::after {
        background: none 0;
      }
      /deep/.fin-tabs__active-bar {
        width: 16px;
      }
    }
  }
  /deep/.fin-dialog__footer {
    padding-bottom: 24px;
  }
}
</style>
