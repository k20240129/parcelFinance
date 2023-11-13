<template>
  <div style="width: 100%">
    <n-grid x-gap="10" :cols="5">
      <n-gi>
        <n-input v-model:value="model.payeeName" style="width: 97%" type="text" clearable placeholder="收款方名称/收款方编码"
          @change="getSearch()" />
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
const model = reactive<any>({
  payeeName: null,
});
const getSearch = (val?: number) => {
  if (val === 1) {
    Object.assign(model, {
      payeeName: null,
    });
  }
  setTimeout(() => {
    emit('getSearch', model);
  }, 200);
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
