<template>
  <div>
    <n-modal v-model:show="props.showModal" :show-icon="false" :width="600" preset="dialog" :title="props.title"
      :auto-focus="false" :on-mask-click="cancel" :on-close="cancel">
      <KYTable ref="table" style="height: calc(100vh - 300px)" :colums="tableColums.cl" :table-data="tableColums.data"
        :selection="false" :serial-number="false" :pagination-show="true" class="current">
      </KYTable>
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
// 表格参数
const tableColums = reactive({
  cl: [
    {
      minWidth: '180',
      prop: 'payeeName',
      label: '收款方名称'
    },
    {
      minWidth: '180',
      prop: 'payeeCode',
      label: '收款方编号'
    },
    {
      minWidth: '150',
      prop: 'currency',
      label: '币种'
    },
    {
      minWidth: '200',
      prop: 'priceEffectiveTime',
      label: '价格有效期'
    },
    {
      minWidth: '180',
      prop: 'priceTypeOne',
      label: '计费类型1'
    },
    {
      minWidth: '180',
      prop: 'priceOne',
      label: '单价1',
    },
    {
      minWidth: '180',
      prop: 'priceTypeTwo',
      label: '计费类型2',
    },
    {
      minWidth: '170',
      prop: 'priceTwo',
      label: '单价2',
    },
  ],
  data: []
});
// 保存
const submitCallback = () => {
  formRef.value?.validate(async error => {
    if (error) return;
    // const { data } = await AddFinancialStatementDetails({
    // });
    // if (data.code === 200) {
    //   message.success(data.massage)
    //   emit('cencelpricebtn')
    // } else {
    //   message.error(data.massage)
    // }
  });
};
// watch(() => props.activesty,
//   (val) => {
//   },
//   { immediate: true }
// )
//取消
const cancel = () => {
  emit('cencelpricebtn')
};
</script>

<style>
:deep(.n-modal) {
  width: 600px !important;
}
</style>
