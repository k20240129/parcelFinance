<template>
  <div>
    <n-modal style="width: 70%;" v-model:show="props.BatchEditshow" :show-icon="false" :width="600" preset="dialog"
      title="批量编辑" :auto-focus="false" :on-mask-click="cancel" :on-close="cancel">
      <p>批量编辑以下{{ props.batckedit.length }}条数据，将统一修改字段</p>
      <div>
        <span v-for="item, index in props.batckedit" :key="item.id"> 收款方{{ index + 1 }}：{{ item.payeeCode }}，{{
          item.payeeName }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
      <n-form ref="formRef" :model="tableColums">
        <KYTable ref="table" style="height: calc(100vh - 300px)" :colums="tableColums.cl" :table-data="tableColums.data"
          :selection="false" :serial-number="false" :pagination-show="false" class="current">
          <template #priceEffectiveTime="scope">
            <n-form-item :path="`data[0].priceEffectiveTime`" :rule="formItemRule('请选择', ['blur', 'change'], 'array')">
              <n-date-picker v-model:value="scope.row.priceEffectiveTime" update-value-on-close type="daterange"
                :actions="['clear']" clearable />
            </n-form-item>
          </template>
          <template #priceOne="scope">
            <n-form-item :path="`data[0].priceOne`" :rule="formItemRule('请输入', ['blur', 'change'], 'number')">
              $<n-input-number :show-button="false" v-model:value="scope.row.priceOne" style="width: 90%" type="text"
                clearable />
            </n-form-item>
          </template>
          <template #priceTwo="scope">
            <n-form-item :path="`data[0].priceTwo`" :rule="formItemRule('请输入', ['blur', 'change'], 'number')">
              $<n-input-number :show-button="false" v-model:value="scope.row.priceTwo" style="width: 90%" type="text"
                clearable />
            </n-form-item>
          </template>
        </KYTable>
      </n-form>
      <template #action>
        <n-button class="M_r_10" @click="cancel"> 取消 </n-button>
        <n-button type="error" color="#FB4A4C" @click="submitCallback"> 确认 </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineEmits, defineProps, watch, getCurrentInstance } from 'vue';
import { UpdatePriceList } from '@/service';
import useMousePosition from '@/hooks/common/validation';
import { useMessage } from 'naive-ui'
import moment from "moment";

const emit = defineEmits(['cencelbtn']);
const { formItemRule } = useMousePosition();
const proxy = getCurrentInstance()?.proxy as any;
const message = useMessage()
const props = defineProps({
  BatchEditshow: {
    type: Boolean,
    default: false
  },
  batckedit: {
    type: Array,
    default: () => []
  },
})
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
  ] as any,
  data: [] as any
});
// 保存
const submitCallback = async () => {
  formRef.value?.validate(async (error: any) => {
    if (error) return;
    // 输出更改后的数组
    var priceEffectiveTime = tableColums.data[0].priceEffectiveTime;
    var priceOne = Number(tableColums.data[0].priceOne);
    var priceTwo = Number(tableColums.data[0].priceTwo);
    let arr = [] as any
    props.batckedit.forEach((item: any) => {
      arr.push({
        currency: 'USD',
        priceTypeOne: '包裹店签收费用',
        priceTypeTwo: '包裹店拒收费用',
        id: item.id,
        priceSentime: moment(priceEffectiveTime[0]).format("YYYY-MM-DD"),
        priceEndtime: moment(priceEffectiveTime[1]).format("YYYY-MM-DD"),
        priceOne: priceOne,
        priceTwo: priceTwo
      })
    });
    const { data } = await UpdatePriceList(arr);
    if (data.code === 200) {
      message.success(data.message)
      emit('cencelbtn')
      arr = []
    } else {
      message.error(data.message)
      arr = []
    }
  });
};
watch(() => props.batckedit,
  (val: any) => {
    if (Array.isArray(val) && val.length > 0) {
      tableColums.data = []
      tableColums.data.push(val[0])
      console.log(val[0].priceEffectiveTime);
      const startDate = new Date(val[0].priceEffectiveTime.split('-')[0]).getTime();
      const endDate = new Date(val[0].priceEffectiveTime.split('-')[1]).getTime();
      tableColums.data[0].priceEffectiveTime = [startDate, endDate];
      tableColums.data[0].priceOne = Number(val[0].priceOne)
      tableColums.data[0].priceTwo = Number(val[0].priceTwo)
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

<style lang="scss" scoped></style>
