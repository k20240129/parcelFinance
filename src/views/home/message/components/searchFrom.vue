<template>
  <div>
    <From :type="false" @getSearch="getSearch" :overflowShow="false">
      <template #deflutContent>
        <div style="width: 100%">
          <n-form ref="formRef" label-placement="left" :model="model">
            <n-grid x-gap="12" :cols="4">
              <n-gi>
                <n-form-item label="收款方">
                  <n-input v-model:value="model.billLadingNo" style="width: 90%" type="text" clearable
                    placeholder="请输入名称/编号，用逗号隔开" @change="getSearch" />
                </n-form-item>
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
  endSendTime: null as any,
});
const getSearch = () => {
  //实际发车时间
  range1.value ? model.beginSendTime = moment(range1.value[0]).format("YYYY-MM-DD") : model.beginSendTime = null
  range1.value ? model.endSendTime = moment(range1.value[1]).format("YYYY-MM-DD") : model.endSendTime = null
  setTimeout(() => {
    emit('getSearch', model);
  }, 200);
};
</script>

<style scoped></style>
