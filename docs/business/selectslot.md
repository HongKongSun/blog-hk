---
sidebarDepth: 2
---

# 选 人/部门 控件

### 预览

<ClientOnly>
<select-slot-demo/>
</ClientOnly>

<details style="margin-top: 32px;">
 <summary style=" outline: none;color: #4975fc;font-size: 16px">点击查看代码</summary>

```html
<frd-select-slot
  @getTagList="getParams"
  :selectMsg="selectMsg"
  :selectData="dataList"
  @search="search"
></frd-select-slot>
```

</details>

#### 目前提供了如下几个属性和方法，有需求可联系添加

---

|  Property  |                    Description                    |   Type   | Default |
| :--------: | :-----------------------------------------------: | :------: | :-----: |
|  datalist  | code:部门的编号/人的 erp name:部门的名称/人的名字 |  Array   | 必选项  |
| selectMsg  |        name:label 名称 holderMsg:提示内容         |  object  | 必选项  |
|   search   |             调用后端接口进行模糊搜索              | function |  必选   |
| getTagList |       调用此方法可以获取已选择的标签的数组        | function |  必选   |


#### 备注：没有测验 调用后端接口进行模糊搜索的功能