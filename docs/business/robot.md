---
sidebarDepth: 2
---

# 机器人

### 右侧预览

<ClientOnly>
<robot-demo/>
</ClientOnly>

<details style="margin-top: 32px;">
 <summary style=" outline: none;color: #4975fc;font-size: 16px">点击查看代码</summary>

```html
<frd-robot :linksval="linksval"></frd-robot>

<script>
  export default {
    data() {
      return {
        linksval: [
          { title: "标签", icon: "el-icon-tag", path: "" },
          { title: "菜单选项", icon: "el-icon-bars", path: "" },
          { title: "登录", icon: "el-icon-login", path: "" },
          { title: "声音", icon: "el-icon-sound", path: "" },
        ],
      };
    },
  };
</script>
```

</details>

#### 目前提供了如下几个属性和方法，有需求可联系添加

---

::: tip 提示
**icon 为 FIND 基础组件中的 icon 名称**
:::

| Property |       Description       | Type  | Default |
| :------: | :---------------------: | :---: | :-----: |
| linksval | 显示的 title 和跳转链接 | Array | 必选项  |
