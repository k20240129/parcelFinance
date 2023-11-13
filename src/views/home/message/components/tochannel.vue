<template>
  <div>
    <n-modal style="width: 70%;" v-model:show="props.tochannelshow" :show-icon="false" :width="600" preset="dialog"
      title="导入价格表" :auto-focus="false" :on-mask-click="cancel" :on-close="cancel">
      <div>
        <n-upload :default-upload="false" :directory-dnd="true" :show-file-list="false" accept=".xls,.xlsx" multiple
          @change="handleChange">
          <n-upload-dragger style="width: 100%;padding: 15px 35%;">
            <svg-icon local-icon="uploading" style="font-size: 70px;margin: 0 auto;" />
            <div style="display: flex;flex-direction: column;" v-if="!tableshow">
              <n-button type="info" size="small" class="mr-2" style="margin: 15px;">上传文档</n-button>
              <a style=""
                href="https://newkybuket.oss-cn-hangzhou.aliyuncs.com/exampledir/%E3%80%90%E6%A8%A1%E7%89%88%E3%80%91%E5%8C%85%E8%A3%B9%E5%BA%97%E6%9C%8D%E5%8A%A1%E8%B4%B9-1699459200.xlsx"
                @click.stop target="_blank">下载Excel模板</a>
            </div>
            <div style="display: flex;flex-direction: column;" v-if="tableshow">
              <n-button type="info" size="small" class="mr-2" style="margin: 15px;">重新上传</n-button>
              <p>共{{ total }}条数据，全部上传成功！ <br> 重新上传将覆盖当前数据</p>
            </div>
          </n-upload-dragger>
        </n-upload>
      </div>
      <KYTable v-if="tableshow" ref="table" style="height: 280px;margin-top: 12px;" :colums="tableColums.cl"
        :table-data="tableColums.data" :serial-number="false" :pagination-show="false" class="current" :selection="false">
      </KYTable>
      <template #action>
        <n-button class="M_r_10" @click="cancel"> 取消 </n-button>
        <n-button type="error" color="#FB4A4C" @click="submitCallback"> 确认 </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineEmits, defineProps, getCurrentInstance } from 'vue';
import { AddPriceListExcel } from '@/service';
import { useMessage } from 'naive-ui'

const emit = defineEmits(['cencelbtn']);
const message = useMessage()
const props = defineProps({
  tochannelshow: {
    type: Boolean,
    default: false
  },
})
const proxy = getCurrentInstance()?.proxy as any;
const tableshow = ref(false)
const total = ref(0)
// 表格参数
const tableColums = reactive({
  cl: [
    {
      minWidth: '180',
      prop: 'payeeCode',
      label: '收款方编码'
    },
    {
      minWidth: '180',
      prop: 'payeeName',
      label: '收款方名称'
    },
    {
      minWidth: '150',
      prop: 'currency',
      label: '币种',
    },
    {
      minWidth: '200',
      prop: 'priceEffectiveTime',
      label: '价格有效期'
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
    },
  ],
  data: [] as any
});

//导入
const handleChange = (file: any) => {
  tableColums.data = []
  total.value = 0
  proxy?.$Utils.uplodPost('api/FinancialStatement/PriceListExcel', file.file.file).then((res: any) => {
    const loading = proxy?.$loading({
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    if (res.code === 200) {
      tableColums.data = res.data.data;
      total.value = res.data.total
      tableshow.value = true
    }
    loading.close();
  });
}
const arr = [{ time: '2023/10/3', age: 10 }, { time: '2023/10/5', age: 10 }]
// 保存
const submitCallback = async () => {
  const loading = proxy?.$loading({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  const updatedArr = tableColums.data.map(item => {
    const dateParts = item.priceEffectiveSentime.split('/');
    const formattedDate = dateParts.join('-');
    const dateParts2 = item.priceEffectiveEndtime.split('/');
    const formattedDate2 = dateParts2.join('-');
    return { ...item, priceEffectiveEndtime: formattedDate2, priceEffectiveSentime: formattedDate };
  });
  const { data } = await AddPriceListExcel(updatedArr);
  if (data.code === 200) {
    message.success(data.message)
  } else {
    message.error(data.message)
  }
  loading.close();
  cancel()
};
//取消
const cancel = () => {
  emit('cencelbtn')
  tableColums.data = []
  tableshow.value = false
  total.value = 0
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: underline;
}

::v-deep.n-upload.n-upload--dragger-inside .n-upload-trigger {
  display: flex;
  justify-content: center;
}

.n-dialog__content {
  display: flex;
  flex-direction: column;
}
</style>
