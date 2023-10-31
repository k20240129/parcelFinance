<template>
  <div>
    <From :type="false" @getSearch="getSearch" :overflowShow="false">
      <template #deflutContent>
        <div style="width: 100%">
          <n-form ref="formRef" label-placement="left" :model="model">
            <n-grid x-gap="12" :cols="4">
              <n-gi>
                <n-form-item label="账单编号">
                  <n-input v-model:value="model.billLadingNo" style="width: 90%" type="text" clearable placeholder="账单编号"
                    @change="getSearch" />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="收款方">
                  <n-input v-model:value="model.supplierName" style="width: 90%" type="text" clearable placeholder="收款方"
                    @change="getSearch" />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="账单时间">
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
  billLadingNo: null,
  supplierName: null,
  beginSendTime: null as any,
});
const getSearch = () => {
  // if (range1.value.length === 2) {
  //   const startDate = new Date(range1.value[0]);
  //   const endDate = new Date(range1.value[1]);
  //   startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
  //   endDate.setDate(endDate.getDate() - endDate.getDay() + 7);
  //   range1.value = [startDate, endDate];
  // }
  range1.value ? model.beginSendTime = moment(range1.value).format("YYYY-MM-DD") : model.beginSendTime = null
  setTimeout(() => {
    emit('getSearch', model);
  }, 200);
};

</script>

<style scoped></style>
