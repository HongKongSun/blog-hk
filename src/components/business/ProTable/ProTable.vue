<template>
  <div class="protable">
    <fin-table
      :data="data"
      :height="height"
      :min-height="maxHeight"
      :border="border"
      :stripe="stripe"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      @selection-change="handleSelectionChange"
    >
      <fin-table-column
        v-for="(item,index) in columns"
        :prop="item.dataIndex"
        :label="item.title"
        :key="item.key"
      >
        <slot
          :name="item.dataIndex"
          :data="scope.row"
          :index="index"
          slot-scope="scope"
        >{{scope.row[item.dataIndex]}}</slot>
      </fin-table-column>
    </fin-table>
    <fin-pagination
      :small="small"
      :total="total"
      :background="background"
      :page-size="pageSize"
      :current-page="currentPage"
      :layout="layout"
      :page-sizes="pageSizes"
      :prev-text="prevText"
      :next-text="nextText"
      :disabled="disabled"
      :hide-on-single-page="hideOnSinglePage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <slot name="pagination"></slot>
    </fin-pagination>
  </div>
</template>

<script>
export default {
  name: "pro-table",
  props: {
    columns: Array,
    data: Array,
    height: [String, Number],
    maxHeight: [String, Number],
    stripe: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator: function(value) {
        return ["medium", "small", "mini"].indexOf(value) !== -1;
      }
    },
    fit: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    currentRowKey: [String, Number],
    pagination: {
      type: Object,
      default() {
        return {
          total: 0,
          pageSize: 10,
          current: 1
        };
      }
    },
    small: {
      type: Boolean,
      default: false
    },
    background: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: Number,
    pageCount: Number,
    pagerCount: {
      type: Number,
      default: 7
    },
    currentPage: {
      type: Number,
      default: 1
    },
    layout: {
      type: String,
      default: "prev, pager, next, jumper, ->, total"
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50, 100];
      }
    },
    prevText: String,
    nextText: String,
    disabled: {
      type: Boolean,
      default: false
    },
    hideOnSinglePage: Boolean
  },
  data() {
    return {
      tablePrarms: {
        pageSize: this.pageSize,
        current: this.currentPage
      }
    };
  },
  created() {
    this.$emit("request", this.tablePrarms);
  },
  methods: {
    // 多选操作
    handleSelectionChange(selection) {
      this.$emit("selection", selection);
    },
    // pageSize 改变时会触发
    handleSizeChange(val) {
      this.tablePrarms.pageSize = val;
      this.$emit("request", this.tablePrarms);
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.tablePrarms.current = val;
      this.$emit("request", this.tablePrarms);
    }
  }
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>