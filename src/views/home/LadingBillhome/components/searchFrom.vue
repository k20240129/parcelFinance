<template>
  <div>
    <From :type="false" @getSearch="getSearch" :overflowShow="false">
      <template #deflutContent>
        <div style="width: 100%">
          <n-form ref="formRef" label-placement="left" :model="model">
            <n-grid x-gap="12" :cols="4">
              <n-gi>
                <n-form-item>
                  <n-input v-model:value="model.bilNumber" style="width: 90%" type="text" clearable placeholder="请输入账单编号"
                    @change="getSearch" />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item>
                  <n-input v-model:value="model.payee" style="width: 90%" type="text" clearable placeholder="请输入收款方"
                    @change="getSearch" />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item>
                  <n-date-picker v-model:value="range1" update-value-on-close type="date" clearable @change="getSearch"
                    :actions="['clear', 'now']" /></n-form-item>
              </n-gi>
            </n-grid>
          </n-form>
        </div>
      </template>
    </From>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { reactive, ref } from 'vue';
import From from '@/components/Form/index.vue';
const emit = defineEmits(['getSearch']);
const range1 = ref(null) as any
const model = reactive<any>({
  billLadingNo: '',
  payee: '',
  billTime: null as any,
});
const getSearch = () => {
  range1.value ? model.billTime = moment(range1.value).format("YYYY-MM-DD") : model.billTime = null
  setTimeout(() => {
    emit('getSearch', model);
  }, 200);
};

</script>

<style scoped></style>
