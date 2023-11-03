<template>
  <div>
    <n-modal v-model:show="props.showModal" :show-icon="false" preset="dialog" :title="props.title" :auto-focus="false"
      :on-mask-click="cancel" :on-close="cancel">
      <template #action>
        <n-button class="M_r_10" @click="cancel"> 取消 </n-button>
        <n-button type="success" @click="submitCallback"> 确认 </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineEmits, defineProps, watch } from 'vue';
import { AddFinancialStatementDetails } from '@/service';
import useMousePosition from '@/hooks/common/validation';
import { useMessage } from 'naive-ui'
const emit = defineEmits(['cencelpricebtn']);
const message = useMessage()
const props = defineProps({
  title: {
    type: String,
    default: '编辑'
  },
  showModal: {
    type: Boolean,
    default: false
  },
  activesty: {
    type: Number,
    default: 1
  },
  financialStatementId: {
    type: Number,
    default: 1
  },
})
const formRef = ref<any>(null);
const switchover = ref(false)
// 表单参数
const formData = reactive<any>({
  billCdoe: '',
});
// 保存
const submitCallback = () => {
  formRef.value?.validate(async error => {
    if (error) return;
    const { data } = await AddFinancialStatementDetails({
      ...formData, financialStatementId: props.financialStatementId
    });
    if (data.code === 200) {
      message.success(data.massage)
      emit('cencelpricebtn')
    } else {
      message.error(data.massage)
    }
  });
};
watch(() => props.activesty,
  (val) => {
    formData.billType = val
  },
  { immediate: true }
)
//取消
const cancel = () => {
  emit('cencelpricebtn')
};
</script>

<style></style>
