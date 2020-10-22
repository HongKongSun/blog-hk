---
sidebarDepth: 2
---

# 富文本

### 预览

<ClientOnly>
<tinymce-demo/>
</ClientOnly>

<details style="margin-top: 32px;">
 <summary style=" outline: none;color: #4975fc;font-size: 16px">点击查看代码</summary>

```html
<frd-tinymce :height="300" v-model="content" id="tinymce"></frd-tinymce>
```

</details>

#### 目前提供了如下几个属性，有需求可自行添加

---

| Property | Description | Type | Default |
| :----------: | :----------: | :------: | :-----: |
| id | 组件唯一标识 | String | 自动生成 |
| imgURL | 本地图片上传地址 | String | https://httpbin.org/post |
| value | 富文本内容 | String | |
| toolbar | 工具栏 | Array | |
| menubar | 菜单栏 | String | 'file edit insert view format table' |
| height | 高度 | Number | 360 |
| width | 宽度 | Number | |
