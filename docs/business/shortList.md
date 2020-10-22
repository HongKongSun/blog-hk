---
sidebarDepth: 2
---

# 公告预览

### 预览

<ClientOnly>
  <short-list></short-list>
</ClientOnly>

<details style="margin-top: 32px; ">

 <summary style=" outline: none; color: #4975fc; font-size: 16px">点击查看代码</summary>

``` html
<template>
    <short-list :institLists="list" title="最新公告" @goList="goList" @goDetail="goDetail"></short-list>
</template>

<script>
    data() {
            return {
                list: [{
                    title: '测试案例新闻第一个',
                    guid: '001',
                    updateTime: '20200212'
                }, {
                    title: '测试案例新闻第二个',
                    guid: '002',
                    updateTime: '20200213'
                }, {
                    title: '测试案例新闻第三个',
                    guid: '003',
                    updateTime: '20200214'
                }, {
                    title: '测试案例新闻第二个',
                    guid: '004',
                    updateTime: '20200214'
                }, {
                    title: '测试案例新闻第三个',
                    guid: '005',
                    updateTime: '20200215'
                }]
            }
        },
        methods: {
            goList() {
                console.log("跳转到查看全部页面");
            },
            goDetail(id) {
                console.log("跳转查看详情页面", id);
            },
        },
</script>
```

</details>

#### 目前提供了如下几个属性，有需求可自行添加

---

| 属性 | 描述 | 类型 | 默认值 |
| :----------: | :----------: | :------: | :-----: |
| institLists | 显示的数据 | Array | [{title ： "标题", guid : "唯一id", updateTime : "更新时间"}] |
| title |   模块标题   | String | 最新公告 |
| goList |     点击查看全部的方法    | Function | |
| goDetail |    点击列表跳转详情的方法    | Function | |
