---
sidebarDepth: 2
---

# 多选下拉框

### 预览

<ClientOnly>
  <mult-select-demo></mult-select-demo>
</ClientOnly>

<details style="margin-top: 32px; ">

 <summary style=" outline: none; color: #4975fc; font-size: 16px">点击查看代码</summary>

``` html
<template>
        <mult-select
            v-model="formExtend.takeTheLead"
            valueKey="userErp"
            placeholder="请输入关键词"
            :remoteAction="remoteMethod"
            id="userErp"
            label="name-title"
        >
        </mult-select>
</template>

<script>
    data() {
            return {
                formExtend : {
                    takeTheLead : []
                }
            }
        },
        methods: {
            async remoteMethod(query){
                return generalApi.getUser(query)
            },
        },
</script>
```

</details>

#### 目前提供了如下几个属性，有需求可自行添加

---

| 属性 | 描述 | 类型 | 默认值 |
| :----------: | :----------: | :------: | :-----: |
| v-model | 选中的值 | Array | [{}] |
| valueKey |   标识下拉框每一项的唯一字段名   | String | id |
| placeholder |     占位符    | String | |
| id |    标识下拉框每一项的唯一字段名    | String | id|
| label |    下拉框和选中之后需要展示的字段名,如果需要展示多个，可以以"-"做分割，例如“name-title”    | String | label|
| remoteAction |    获取异步数据的函数 ，需要return一个promise   | Function | |


#### 如该组件不满足需求，需使用FinD提供的原生组件注意点：
> 1、 下拉框选中的如果是一个对象，回显可能出现问题：初始化回显时空值，再次模糊搜索之后所有值回显了。

解决方案：回显时将需要回显的list集合先赋值给options，然后再赋值给v-model。
>2、 勾选过程中发现，要么全部勾选，要么全部取消：

解决方案：添加value-Key属性，确保每一项的唯一性。
