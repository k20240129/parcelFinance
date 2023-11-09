<template>
  <div>
    <n-modal class="modal" v-model:show="props.BatchEditshow" :show-icon="false" :width="600" preset="dialog" title="批量编辑"
      :auto-focus="false" :on-mask-click="cancel" :on-close="cancel">
      <p>批量编辑以下{{ props.editdata.length }}条数据，将统一修改字段</p>
      <div>
        <span v-for="item, index in props.editdata" :key="item.id"> 收款方{{ index + 1 }}：{{ item.payeeCode }}，{{
          item.payeeName }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
      <KYTable ref="table" style="height: calc(100vh - 300px)" :colums="tableColums.cl" :table-data="tableColums.data"
        :selection="false" :serial-number="false" :pagination-show="false" class="current">
        <template #priceEffectiveTime="scope">
          <n-date-picker v-model:value="priceEffectiveTime" update-value-on-close type="daterange" :actions="['clear']"
            clearable />
        </template>
        <template #priceOne="scope">
          <n-input v-model:value="scope.row.priceOne" style="width: 90%" type="text" clearable />
        </template>
        <template #priceTwo="scope">
          <n-input v-model:value="scope.row.priceTwo" style="width: 90%" type="text" clearable />
        </template>
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
import { UpdatePriceList } from '@/service';
import moment from "moment";
import { useMessage } from 'naive-ui'

const emit = defineEmits(['cencelbtn']);
const message = useMessage()
const props = defineProps({
  BatchEditshow: {
    type: Boolean,
    default: false
  },
  editdata: {
    type: Array,
    default: () => []
  },
})
const priceEffectiveTime = ref(null) as any
const formRef = ref<any>(null);
// 表格参数
const tableColums = reactive({
  cl: [
    {
      minWidth: '90',
      prop: 'currency',
      label: '币种',
    },
    {
      minWidth: '320',
      prop: 'priceEffectiveTime',
      label: '价格有效期',
      slot: 'priceEffectiveTime'
    },
    {
      minWidth: '160',
      prop: 'priceTypeOne',
      label: '计费类型1',
    },
    {
      minWidth: '120',
      prop: 'priceOne',
      label: '单价1',
      slot: 'priceOne'
    },
    {
      minWidth: '160',
      prop: 'priceTypeTwo',
      label: '计费类型2',
    },
    {
      minWidth: '120',
      prop: 'priceTwo',
      label: '单价2',
      slot: 'priceTwo'
    },
  ],
  data: [] as any
});
// 保存
const submitCallback = async () => {
  props.editdata.forEach((item: any) => {
    item.priceSentime = priceEffectiveTime.value[0].toString()
    item.priceEndtime = priceEffectiveTime.value[1].toString()
    item.priceOne = Number(tableColums.data[0].priceOne)
    item.priceTwo = Number(tableColums.data[0].priceTwo)
  });
  const { data } = await UpdatePriceList(props.editdata);
  console.log(data);
  if (data.code === 200) {
    message.success(data.message)
    emit('cencelbtn')
  } else {
    message.error(data.message)
  }
};
watch(() => props.editdata,
  (val) => {
    if (Array.isArray(val) && val.length > 0) {
      tableColums.data = []
      tableColums.data.push(val[0])
      const dates = val[0].priceEffectiveTime.split('-');
      const startDate = new Date(dates[0]).getTime();
      const endDate = new Date(dates[1]).getTime();
      priceEffectiveTime.value = [startDate, endDate];
    }
  },
  { immediate: true }
)
//取消
const cancel = () => {
  tableColums.data = []
  emit('cencelbtn')
};
</script>

<style>
.modal {
  width: 70% !important;
}
</style>
