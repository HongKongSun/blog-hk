---
sidebarDepth: 2
---

# 超级表格

### 预览

<ClientOnly>
<protable-demo/>
</ClientOnly>

<details style="margin-top: 32px;">
 <summary style=" outline: none;color: #4975fc;font-size: 16px">点击查看代码</summary>

```html
<frd-pro-table :columns="columns" :data="data">
  <template slot="tags" slot-scope="{data}">
    <fin-tag v-for="(item,index) in data.tags" :key="index">{{item}}</fin-tag>
  </template>
</frd-pro-table>

<script>

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "地址",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "标签",
    key: "tags",
    dataIndex: "tags"
  },
  {
    title: "操作",
    key: "action"
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];
export default {
  data() {
    return { columns, data };
  },
  components: {
    ProTable
  }
};
</script></script>
```

</details>

#### 目前提供了如下几个属性，有需求可自行添加

---

::: tip 提示
**表格内部可以嵌套其他的 FIND 基础组件**

例子中以标签为例，详细请看代码
:::

| Property |        Description        | Type  | Default |
| :------: | :-----------------------: | :---: | :-----: |
| columns  |          列名称           | Array | 必选项  |
|   data   |        对应的数据         | Array | 必选项  |
|   其他   | FIND 中表格的属性都可以用 |   -   |    -    |
