<template>
  <div>
    <From :overflow-show="false" @getSearch="getSearch">
      <template #deflutContent>
        <div>
          <n-form ref="formRef" label-placement="left" :model="model" :rules="rules">
            <n-form-item path="dictionaryTag" label="字典标签">
              <n-input v-model:value="model.dictionaryTag" clearable @clear="getSearch" @keydown.enter="getSearch" />
            </n-form-item>
          </n-form>
        </div>
      </template>
    </From>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import From from '@/components/Form/index.vue';
const emit = defineEmits(['getSearch']);

const model = reactive({
  dictionaryTag: ''
});
const getSearch = () => {
  setTimeout(() => {
    emit('getSearch', model);
  }, 5);
};
</script>

<style scoped></style>
