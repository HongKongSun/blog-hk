---
sidebarDepth: 2
---

# SVG组件

### 预览

<ClientOnly>
  <svg-icon-demo></svg-icon-demo>
</ClientOnly>

<details style="margin-top: 32px; ">

 <summary style=" outline: none; color: #4975fc; font-size: 16px">点击查看代码</summary>

``` html
<template>
  <svg-icon icon-class="icon3" class-name="mysvg"></svg-icon>
</template>

<script>
  import svgIcon from "@/components/svgIcon/src/main.vue"; 

  components: {
    svgIcon
  },
  methods: {
  }
</script>
```

</details>

#### 前期准备
在src/assets/创建文件夹svg，将需要展示的svg图片放在改目录下。


#### 目前提供了如下几个属性，有需求可自行添加

---

| 属性 | 描述 | 类型 | 默认值 |
| :----------: | :----------: | :------: | :-----: |
| iconClass | 图片的名称 | String | "" |
| className |   样式类的名称   | String | "" |


#### 常见问题，如果不显示，请依次检查
1. 该组件依赖于插件svg-sprite-loader，请检查是否已安装
2. 在vue.config.js文件中添加如下配置项
```
    chainWebpack: (config) => {
        config.module.rules.delete("svg");  //删除掉原来的svg规则
        config.module
            .rule('svg')
            .test(/\.svg$/)
            .include
            .add(resolve('./src/assets/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    }
```
3. 如果图片既不显示也不报错，需检查文件名是否与配置一致。首先查看vue.config.js文件中options中的配置symbolId，然后查看组件中computed对应的iconName的值，#后面的值需要保持一致，否则会出现图片无法加载问题。







