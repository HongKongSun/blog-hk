---
sidebarDepth: 2
---

# 轮播图

### 预览

<ClientOnly>
<swiper-demo/>
</ClientOnly>

<details style="margin-top: 32px;">
 <summary style=" outline: none;color: #4975fc;font-size: 16px">点击查看代码</summary>

```html
<frd-swiper :dataList="picArr"></frd-swiper>

<script>
  picArr: [
    {
      image: "https://img1.sycdn.imooc.com/5ee2efe000013f2f18720764.jpg",
      link: "",
    },
    {
      image: "https://img1.sycdn.imooc.com/5ee24f3000017d0218720764.jpg",
      link: "",
    },
    {
      image: "https://img1.sycdn.imooc.com/5ed9db4c0001b36418720764.jpg",
      link: "",
    },
    {
      image: "https://img1.sycdn.imooc.com/5ee1d3dd00012d7b18720764.jpg",
      link: "",
    },
    {
      image: "https://img1.sycdn.imooc.com/5ee0af4b0001fbda18720764.jpg",
      link: "",
    },
  ];
</script>
```

</details>

#### 目前提供了如下几个属性，有需求可自行添加

---

| Property | Description | Type | Default |
| :----------: | :----------: | :------: | :-----: |
| dataList | 数据集 | Array | 必选项 |
