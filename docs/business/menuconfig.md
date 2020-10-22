---
sidebarDepth: 2
---

# 快捷菜单

### 预览

###

<ClientOnly>
<menu-config-demo/>
</ClientOnly>

<details style="margin-top: 32px;">
 <summary style=" outline: none;color: #4975fc;font-size: 16px">点击查看代码</summary>

```html
<frd-menu-config
  :allapplydata="allapplydata"
  :applylist="applylist"
  @submit="submit"
></frd-menu-config>

<script>
  export default {
    data() {
      return {
        applylist: [
          {
            linkUrl: "",
            iconUrl:
              "https://img12.360buyimg.com/imagetools/jfs/t1/138869/12/6000/2918/5f3e4b08Ee707725c/9c7cbd305a9fd8da.png",
            name: "block1",
          },
          {
            linkUrl: "",
            iconUrl:
              "https://img12.360buyimg.com/imagetools/jfs/t1/138869/12/6000/2918/5f3e4b08Ee707725c/9c7cbd305a9fd8da.png",
            name: "block2",
          },
          {
            linkUrl: "",
            iconUrl:
              "https://img12.360buyimg.com/imagetools/jfs/t1/138869/12/6000/2918/5f3e4b08Ee707725c/9c7cbd305a9fd8da.png",
            name: "block3",
          },
        ],
        allapplydata: [
          {
            linkUrl: "",
            iconUrl:
              "https://img12.360buyimg.com/imagetools/jfs/t1/138869/12/6000/2918/5f3e4b08Ee707725c/9c7cbd305a9fd8da.png",
            name: "block4",
          },
          {
            linkUrl: "",
            iconUrl:
              "https://img12.360buyimg.com/imagetools/jfs/t1/138869/12/6000/2918/5f3e4b08Ee707725c/9c7cbd305a9fd8da.png",
            name: "block5",
          },
          {
            linkUrl: "",
            iconUrl:
              "https://img12.360buyimg.com/imagetools/jfs/t1/138869/12/6000/2918/5f3e4b08Ee707725c/9c7cbd305a9fd8da.png",
            name: "block6",
          },
        ],
      };
    },
  };
</script>
```

</details>

#### 目前提供了如下几个属性和方法，有需求可联系添加

---

|   Property   | Description  |   Type   |  Default  |
| :----------: | :----------: | :------: | :-------: |
| allapplydata |   全部应用   |  Array   |  必选项   |
|  applylist   |   常用应用   |  Array   |  必选项   |
|    submit    | 提交添加内容 | function |           |
|   saveList   |     保存     | function | applylist |
|  resetList   |     重置     | function |           |
|  ishandadd   |   手动添加   |   bool   |   false   |
| ishistoryadd |   历史添加   |   bool   |   false   |


#### 备注：保存和重置 没有完善