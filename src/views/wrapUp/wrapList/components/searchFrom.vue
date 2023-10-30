<template>
  <div>
    <From :overflow-show="false" @getSearch="getSearch">
      <template #deflutContent>
        <div>
          <n-form ref="formRef" label-placement="left" :model="model" :rules="rules">
            <n-form-item path="cityName" label="包裹店名称">
              <n-input v-model:value="model.parcelShopName" clearable @clear="getSearch" @keydown.enter="getSearch" />
            </n-form-item>
          </n-form>
        </div>
      </template>
    </From>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { QueryCityConfigList } from '@/service';
import From from '@/components/Form/index.vue';
const emit = defineEmits(['getSearch']);
const model = reactive({
  cityId: null
});
// 所有国家集合
const objAll: any = reactive({
  cityAll: [] // 城市集合
});
const getCityAll = async () => {
  const res = await QueryCityConfigList({
    pageSize: 1000,
    pageIndex: 1
  });
  objAll.cityAll = res.data.data;
};
getCityAll();
const getSearch = () => {
  setTimeout(() => {
    emit('getSearch', model);
  }, 5);
};
</script>

<style scoped></style>
