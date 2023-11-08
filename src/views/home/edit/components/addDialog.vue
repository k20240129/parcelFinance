<template>
  <div>
    <n-modal v-model:show="props.showModal" :show-icon="false" preset="dialog" title="新增数据" :auto-focus="false"
      :on-mask-click="cancel" :on-close="cancel">
      <n-form ref="formRef" label-width="130" label-placement="left" :model="formData" v-if="!switchover">
        <n-form-item label="业务单号：" path="businessNumber" :rule="[formItemRule('请填写', ['blur', 'change'])]">
          <n-input v-model:value="formData.businessNumber" type="text" placeholder="请输入业务单号" />
        </n-form-item>
      </n-form>
      <n-form ref="formRef" label-width="130" label-placement="left" :model="formData" v-if="switchover">
        <n-form-item label="计费单号：">
          <n-input disabled v-model:value="formData.billCode" type="text" />
        </n-form-item>
        <n-form-item label="业务单号：">
          <n-input disabled v-model:value="formData.businessNumber" type="text" />
        </n-form-item>
        <n-form-item label="计费类型：">
          <n-select disabled v-model:value="formData.billType" :options="options" />
        </n-form-item>
        <n-form-item label="计费日期：">
          <n-input disabled v-model:value="formData.billTime" type="text" />
        </n-form-item>
        <n-form-item label="计费重量/kg：">
          <n-input disabled v-model:value="formData.billWeight" type="text" />
        </n-form-item>
        <n-form-item label="单价/USD：">
          <n-input disabled v-model:value="formData.billPrice" type="text" />
        </n-form-item>
        <n-form-item label="计费金额/USD：">
          <n-input disabled v-model:value="formData.billAmount" type="text" />
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
import { reactive, ref, defineEmits, defineProps, watch, toRefs } from 'vue';
import { SelectFinancialStatementDetails, AddFinancialStatementDetails } from '@/service';
import useMousePosition from '@/hooks/common/validation';
import { useMessage } from 'naive-ui'
const emit = defineEmits(['cencelbtn']);
const message = useMessage()
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
//点击下一步//GR16863902491
const nextstep = () => {
  formRef.value?.validate(async error => {
    if (error) return;
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
  });
}
// 保存
const submitCallback = async () => {
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
