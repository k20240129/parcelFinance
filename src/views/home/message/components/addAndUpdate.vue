<template>
  <div>
    <n-modal style="width: 70%;" v-model:show="props.showModal" :show-icon="false" :width="600" preset="dialog" title="编辑"
      :auto-focus="false" :on-mask-click="cancel" :on-close="cancel">
      <n-form ref="formRef" :model="tableColums">
        <KYTable ref="table" style="height: 45vh" :colums="tableColums.cl" :table-data="tableColums.data"
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
          <template #priceContract="scope">
            <UploadFile v-model:saveFileArr="file.files" :maxNum="1"></UploadFile>
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
import UploadFile from '@/components/UploadFile/UploadFile.vue';
import moment from "moment";
import { useMessage } from 'naive-ui'
const { formItemRule } = useMousePosition();

const emit = defineEmits(['cencelpricebtn']);
const proxy = getCurrentInstance()?.proxy as any;
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
  //编辑
  editdata: {
    type: Object,
    default: () => { }
  },
})
const formRef = ref<any>(null);
const file = reactive({
  files: []
})
// 表格参数
const tableColums = reactive({
  cl: [
    {
      minWidth: '170',
      prop: 'payeeName',
      label: '收款方名称'
    },
    {
      minWidth: '170',
      prop: 'payeeCode',
      label: '收款方编号'
    },
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
    {
      minWidth: '380',
      prop: 'priceContract',
      label: '价格合同',
      slot: 'priceContract'
    },
  ] as any,
  data: [] as any
});

// 保存
const submitCallback = async () => {
  formRef.value?.validate(async error => {
    if (error) return;
    if (Array.isArray(file.files) && file.files.length > 0) {
      console.log(tableColums.data[0]);
      const loading = proxy?.$loading({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const { data } = await UpdatePriceList([{
        ...tableColums.data[0],
        priceSentime: moment(tableColums.data[0].priceEffectiveTime[0]).format("YYYY-MM-DD"),
        priceEndtime: moment(tableColums.data[0].priceEffectiveTime[1]).format("YYYY-MM-DD"),
        priceEffectiveTime: "",
        priceOne: Number(tableColums.data[0].priceOne),
        priceTwo: Number(tableColums.data[0].priceTwo),
        priceContract: JSON.stringify(file.files)
      }]);
      if (data.code === 200) {
        message.success(data.message)
        emit('cencelpricebtn')
      } else {
        message.error(data.message)
      }
      loading.close();
    } else {
      message.error("请上传合同！")
    }
  });
};
watch(() => props.editdata,
  (val: any) => {
    if (Object.keys(val).length !== 0) {
      tableColums.data = []
      tableColums.data.push(val)
      const startDate = new Date(val.priceEffectiveTime.split('-')[0]).getTime();
      const endDate = new Date(val.priceEffectiveTime.split('-')[1]).getTime();
      tableColums.data[0].priceEffectiveTime = [startDate, endDate];
      tableColums.data[0].priceOne = Number(val.priceOne)
      tableColums.data[0].priceTwo = Number(val.priceTwo)
      if (val.priceContract) {
        file.files = JSON.parse(val.priceContract)
      }
    }
  },
  { immediate: true }
)
//取消
const cancel = () => {
  emit('cencelpricebtn')
  tableColums.data = []
  file.files = []
};
</script>

<style lang="scss" scoped></style>
