---
sidebarDepth: 2
---

# 多文件上传组件

### 预览

<ClientOnly>
  <upfile-demo></upfile-demo>
</ClientOnly>

<details style="margin-top: 32px; ">

 <summary style=" outline: none; color: #4975fc; font-size: 16px">点击查看代码</summary>

``` html
<template>
    <up-files :pro-width="186"  ref="childupfile" :file-list="fileList" upfileurl="http://test.compliancejsf.jr.jd.com/letters/saveFile" @getfilelist="getfilelist"></up-files>
</template>

<script>
    import UpFiles from "../../../src/components/business/upfiles/src/UpFiles.vue"; //上传附件组件


    data() {
        return {
            attachments  : [],//最终上送服务端的数据
            fileList:[    //初始化时服务端返回的数据集合
                {
                  name: 'haha.jpeg',
                  size:"1222",
                  url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                  username: "阿布",
                  datetime:1574169299630,
                },
                {
                  name: 'food.pdf',
                  size:"1000",
                  url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                  username: "阿布",
                  datetime:1574169299630,
                },
            ],
        };
  },
  components: {
    UpFiles
  },
  methods: {
    //获取上传后的附件表
    getfilelist() {
      const filesarr = this.$refs.childupfile.newfilelist;
      this.fileList = filesarr;
      this.attachments.length = 0;
      filesarr.forEach(e => {
        this.attachments.push({
          attachmentDesc: "",
          attachmentName: e.name,
          url: e.absolutePath
        });
      });
    }
  }
</script>
```

</details>

#### 目前提供了如下几个属性，有需求可自行添加

---

| 属性 | 描述 | 类型 | 默认值 |
| :----------: | :----------: | :------: | :-----: |
| fileList | 已经上传的文件列表 | Array | [] |
| filetwoStyle |   是否选择版式二   | Boolean | false |
| proWidth |     组件占用宽度   | String  Number | 300 |
| upfileurl |    上传文件的接口地址    | String | |
| getfilelist |   当列表改变时父组件获取列表的方法     | String | label|




