<template>
  <div>
    <n-modal v-model:show="props.showModal" :show-icon="false" preset="dialog" title="新增数据" positive-text="确认"
      negative-text="取消" :auto-focus="false" :on-mask-click="cancel" :on-close="cancel">
      <n-form ref="formRef" label-width="130" label-placement="left" :model="formData" v-if="!switchover">
        <n-form-item label="计费单号：" path="name" :rule="[formItemRule('请填写', ['blur', 'change'])]">
          <n-input v-model:value="name" type="text" placeholder="请输入计费单号" />
        </n-form-item>
      </n-form>
      <n-form ref="formRef" label-width="130" label-placement="left" :model="formData" v-if="switchover">
        <n-form-item label="计费单号：">
          <n-input v-model:value="formData.countryName" type="text" />
        </n-form-item>
        <n-form-item label="业务单号：">
          <n-input disabled v-model:value="formData.countryName" type="text" />
        </n-form-item>
        <n-form-item label="计费类型：">
          <n-input disabled v-model:value="formData.countryName" type="text" />
        </n-form-item>
        <n-form-item label="计费日期：">
          <n-input disabled v-model:value="formData.countryName" type="text" />
        </n-form-item>
        <n-form-item label="计费重量/kg：">
          <n-input disabled v-model:value="formData.countryName" type="text" />
        </n-form-item>
        <n-form-item label="单价/USD：">
          <n-input disabled v-model:value="formData.countryName" type="text" />
        </n-form-item>
        <n-form-item label="计费金额/USD：">
          <n-input disabled v-model:value="formData.countryName" type="text" />
        </n-form-item>
      </n-form>
      <template #action>
        <div v-if="!switchover">
          <n-button @click="nextstep"> 下一步 </n-button>
          <n-button class="M_r_10" @click="cancel"> 取消 </n-button>
        </div>
        <div v-if="switchover">
          <n-button type="success" @click="submitCallback"> 确认 </n-button>
          <n-button class="M_r_10" @click="switchover = false"> 上一步 </n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineEmits, defineProps } from 'vue';
// import { AddAndUpdateCountryConfig } from '@/service';
import useMousePosition from '@/hooks/common/validation';
const emit = defineEmits(['cencelbtn']);
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  }
})
const name = ref('')
const { formItemRule } = useMousePosition();
const formRef = ref<any>(null);
const switchover = ref(false)
// 表单参数
const formData = reactive({
  countryName: '',
  countryCode: '',
  id: undefined
});
const cancel = () => {
  emit('cencelbtn')
  Object.assign(formData, {
    countryName: '',
    countryCode: '',
    id: undefined
  });
};
//点击下一步
const nextstep = () => {
  formRef.value?.validate(async error => {
    if (error) return;
    // const { data } = await AddAndUpdateCountryConfig({
    //   name.value
    // });
    // if (data.code === 200) {
    //   window.$notification?.success({
    //     title: '成功',
    //     content: `${data.message}`,
    //     duration: 3000
    //   });
    switchover.value = true
    // } else {
    //   window.$notification?.error({
    //     title: '失败',
    //     content: `${data.message}`,
    //     duration: 3000
    //   });
    // }
  });
}
// 保存
const submitCallback = () => {
  formRef.value?.validate(async error => {
    if (error) return;
    // const { data } = await AddAndUpdateCountryConfig({
    //   ...formData
    // });
    // if (data.code === 200) {
    //   window.$notification?.success({
    //     title: '成功',
    //     content: `${data.message}`,
    //     duration: 3000
    //   });
    //   showModal.value = false;
    //   emit('getSearch');
    // } else {
    //   window.$notification?.error({
    //     title: '失败',
    //     content: `${data.message}`,
    //     duration: 3000
    //   });
    // }
  });
};
</script>

<style></style>
