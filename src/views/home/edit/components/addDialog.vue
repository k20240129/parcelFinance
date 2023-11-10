<template>
  <div>
    <n-modal v-model:show="props.showModal" :show-icon="false" preset="dialog" title="新增数据" :auto-focus="false"
      :on-mask-click="cancel" :on-close="cancel">
      <n-form ref="formRef" label-width="100" label-placement="left" :model="formData" v-if="!switchover"
        require-mark-placement="left">
        <n-form-item label="业务单号：" path="businessNumber" :rule="[formItemRule('请填写', ['blur', 'change'])]">
          <n-input v-model:value="formData.businessNumber" type="text" placeholder="请输入业务单号" />
        </n-form-item>
      </n-form>
      <n-form ref="formRef" label-width="130" label-placement="left" v-if="switchover">
        <n-form-item label="计费单号：">
          {{ formData.billCode }}
        </n-form-item>
        <n-form-item label="业务单号：">
          {{ formData.businessNumber }}
        </n-form-item>
        <n-form-item label="计费类型：">
          {{ formData.billType }}
        </n-form-item>
        <n-form-item label="计费日期：">
          {{ formData.billTime }}
        </n-form-item>
        <n-form-item label="计费重量/kg：">
          {{ formData.billWeight }}
        </n-form-item>
        <n-form-item label="单价/USD：">
          {{ formData.billPrice }}
        </n-form-item>
        <n-form-item label="计费金额/USD：">
          {{ formData.billAmount }}
        </n-form-item>
      </n-form>
      <template #action>
        <div v-if="!switchover">
          <n-button @click="nextstep" type="primary"> 下一步 </n-button>
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
import { reactive, ref, defineEmits, defineProps, watch, toRefs, getCurrentInstance } from 'vue';
import { SelectFinancialStatementDetails, AddFinancialStatementDetails } from '@/service';
import useMousePosition from '@/hooks/common/validation';
import { useMessage } from 'naive-ui'
const emit = defineEmits(['cencelbtn']);
const message = useMessage()
const proxy = getCurrentInstance()?.proxy as any;
const props = defineProps({
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
const options = ref([{
  label: '签收费用',
  value: 1
},
{
  label: '拒收费用',
  value: 2
}])

const { formItemRule } = useMousePosition();
const formRef = ref<any>(null);
const switchover = ref(false)
// 表单参数
const formData = reactive({
  businessNumber: '',
}) as any
//点击下一步
const nextstep = () => {
  formRef.value?.validate(async error => {
    if (error) return;
    const loading = proxy?.$loading({
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    const { data } = await SelectFinancialStatementDetails({
      businessNumber: formData.businessNumber, financialStatementId: Number(props.financialStatementId)
    });
    if (data.code === 200) {
      Object.assign(formData, toRefs(data.data));
      switchover.value = true
      message.success(data.message)
    } else {
      message.error(data.message)
      formData.businessNumber = ''
    }
    loading.close();
  });
}
// 保存
const submitCallback = async () => {
  const loading = proxy?.$loading({
    lock: true,
    text: '请稍后...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  const { data } = await AddFinancialStatementDetails({
    ...formData, financialStatementId: Number(props.financialStatementId)
  });
  if (data.code === 200) {
    message.success(data.message)
    cancel()
  } else {
    message.error(data.message)
    cancel()
  }
  loading.close();
};
watch(() => props.activesty,
  (val) => {
    formData.billType = val
  },
  { immediate: true }
)
//取消
const cancel = () => {
  Object.assign(formData, {
    businessNumber: '',
  });
  switchover.value = false
  emit('cencelbtn')
};
</script>

<style></style>
