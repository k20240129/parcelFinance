<template>
  <div>
    <From :type="false" @getSearch="getSearch" :overflowShow="false">
      <template #deflutContent>
        <div style="width: 100%">
          <n-form ref="formRef" label-placement="left" :model="model">
            <n-grid x-gap="12" :cols="4">
              <n-gi>
                <n-form-item>
                  <n-input v-model:value="model.payeeName" style="width: 90%" type="text" clearable placeholder="收款方名称"
                    @change="getSearch" />
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
const model = reactive<any>({
  payeeName: null,
});
const getSearch = () => {
  setTimeout(() => {
    emit('getSearch', model);
  }, 200);
};
</script>

<style scoped></style>
