<template>
  <div style="width: 100%">
    <n-grid x-gap="10" :cols="5">
      <n-gi>
        <n-input v-model:value="model.bilNumber" style="width: 97%" type="text" clearable placeholder="请输入账单编号"
          @change="getSearch()" />
      </n-gi>
      <n-gi>
        <n-input v-model:value="model.payee" style="width: 97%" type="text" clearable placeholder="请输入收款方"
          @change="getSearch()" />
      </n-gi>
      <n-gi>
        <n-date-picker v-model:value="range1" style="width: 97%" update-value-on-close type="date" clearable
          placeholder="请选择账单时间" @change="getSearch()" :actions="['clear', 'now']" />
      </n-gi>
      <n-gi>
        <n-button type="error" color="#FB4A4C" @click="getSearch()"> 查询 </n-button>
        <n-button type="error" color="#FB4A4C" ghost style="margin-left: 12px" @click="getSearch(1)"> 重置 </n-button>
      </n-gi>
    </n-grid>
    <div class="border"></div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { reactive, ref } from 'vue';
import From from '@/components/Form/index.vue';
const emit = defineEmits(['getSearch']);
const range1 = ref(null) as any
const model = reactive<any>({
  bilNumber: null,
  payee: null,
  billTime: null
});
const getSearch = (val?: number) => {
  if (val === 1) {
    Object.assign(model, {
      bilNumber: null,
      payee: null,
      billTime: null
    });
    range1.value = null
    emit('getSearch', model);
  } else {
    range1.value ? model.billTime = moment(range1.value).format("YYYY-MM-DD") : model.billTime = null
    emit('getSearch', model);
  }
};

</script>

<style scoped lang="scss">
.border {
  width: 100%;
  opacity: 1;
  border: 1px dashed #E0E0E6;
  margin: 16px 0 16px;
  opacity: 0.3;
}
</style>
