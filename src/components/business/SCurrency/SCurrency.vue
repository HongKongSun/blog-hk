<template>
  <fin-input v-model.lazy="val" placeholder="请输入内容" @change="formater"></fin-input>
</template>

<script>
export default {
  props: {
    value: Number
  },
  data() {
    return {
      val: this.value
    };
  },
  methods: {
    formater(val) {
      if (val.length > 3) {
        const unval = this.unformatMoney(val);
        this.val = this.moneyFormat(unval);
      }
      this.$emit("input", this.unformatMoney(this.val));
    },
    // 金额格式化
    moneyFormat(num) {
      return (num.toFixed(2) + "").replace(
        /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
        "$&,"
      );
    },
    // 金额转数字
    unformatMoney(sVal) {
      const fTmp = parseFloat(sVal.replace(/,/g, ""));
      return isNaN(fTmp) ? 0 : fTmp;
    }
  }
};
</script>

<style>
</style>