<template>
  <div>
    <n-modal class="modal" v-model:show="props.tochannelshow" :show-icon="false" :width="600" preset="dialog"
      title="导入价格表" :auto-focus="false" :on-mask-click="cancel" :on-close="cancel">
      <div class="uploadbox">
        <n-upload :default-upload="false" :directory-dnd="true" :show-file-list="false" accept=".xls,.xlsx" multiple
          @change="handleChange">
          <n-upload-dragger style="width: 400px;">
            <svg-icon local-icon="uploading" style="font-size: 70px;margin: 0 auto;" />
            <div style="display: flex;flex-direction: column;" v-if="!tableshow">
              <n-button type="info" size="small" class="mr-2" style="margin: 15px;">上传文档</n-button>
              <a href="https://newkybuket.oss-cn-hangzhou.aliyuncs.com/exampledir/%E3%80%90%E6%A8%A1%E7%89%88%E3%80%91%E5%8C%85%E8%A3%B9%E5%BA%97%E6%9C%8D%E5%8A%A1%E8%B4%B91-1699286400.xlsx"
                @click.stop>下载Excel模板</a>
            </div>
            <div style="display: flex;flex-direction: column;" v-if="tableshow">
              <n-button type="info" size="small" class="mr-2" style="margin: 15px;">重新上传</n-button>
              <p>共{{ total }}条数据，全部上传成功！ <br> 重新上传将覆盖当前数据</p>
            </div>
          </n-upload-dragger>
        </n-upload>
      </div>
      <KYTable v-if="tableshow" ref="table" style="height: 280px" :colums="tableColums.cl" :table-data="tableColums.data"
        :serial-number="false" :pagination-show="false" class="current" :selection="false">
      </KYTable>
      <template #action>
        <n-button class="M_r_10" @click="cancel"> 取消 </n-button>
        <n-button type="success" @click="submitCallback"> 确认 </n-button>
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
      text: '查询中...',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    console.log(res);
    tableColums.data = res.data.priceListViewModels;
    total.value = res.data.priceCount
    tableshow.value = true
    loading.close();
  });
}
// 保存
const submitCallback = async () => {
  const { data } = await AddPriceListExcel(tableColums.data);
  if (data.code === 200) {
    message.success(data.message)
  } else {
    message.error(data.message)
  }
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

<style lang="scss" scope>
a {
  text-decoration: underline;
}

.modal {
  width: 70% !important;
}

.uploadbox {
  margin: 0 auto;
  margin-bottom: 16px;
}

.n-dialog__content {
  display: flex;
  flex-direction: column;
}
</style>
