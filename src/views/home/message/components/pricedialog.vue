<template>
  <div>
    <n-modal style="width: 70%;" v-model:show="props.priceShow" :show-icon="false" preset="dialog" title="历史价格"
      :auto-focus="false" :on-mask-click="cancel" :on-close="cancel">
      <KYTable ref="table" style="height: 45vh" :colums="tableColums.cl" :table-data="tableColums.data" :selection="false"
        :serial-number="false" :pagination-show="true" class="current" :total="FromSearch.total"
        @page-change="pageChange($event)" @size-change="sizeChange($event)">
        <template #priceContract="scope">
          <div v-if="scope.row.priceContract">
            <a :href="scope.row.priceContract[0]?.url" target="_blank">{{ scope.row.priceContract[0]?.name }}</a>
          </div>
        </template>
      </KYTable>
      <template #action>
        <n-button class="M_r_10" @click="cancel"> 取消 </n-button>
        <n-button type="success" @click="cancel"> 确认 </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineEmits, defineProps, getCurrentInstance, watch } from 'vue';
import { QueryHistoryPrice } from '@/service';
import useMousePosition from '@/hooks/common/validation';
import { useMessage } from 'naive-ui'
const emit = defineEmits(['cencelprice']);
const message = useMessage()
const props = defineProps({
  priceShow: {
    type: Boolean,
    default: false
  },
  pricerow: {
    type: Object,
    default: () => { }
  },
})
const FromSearch = reactive({
  pageSize: 10,
  pageIndex: 1,
  total: null
});
const proxy = getCurrentInstance()?.proxy as any;
// 表格参数
const tableColums = reactive({
  cl: [
    {
      minWidth: '80',
      prop: 'currency',
      label: '币种',
    },
    {
      minWidth: '180',
      prop: 'priceEffectiveTime',
      label: '价格有效期',
    },
    {
      minWidth: '140',
      prop: 'priceTypeOne',
      label: '计费类型1',
    },
    {
      minWidth: '80',
      prop: 'priceOne',
      label: '单价1',
    },
    {
      minWidth: '140',
      prop: 'priceTypeTwo',
      label: '计费类型2',
    },
    {
      minWidth: '80',
      prop: 'priceTwo',
      label: '单价2',
    },
    {
      minWidth: '280',
      prop: 'priceContract',
      label: '价格合同',
      slot: 'priceContract'
    },
    {
      minWidth: '120',
      prop: 'updateTime',
      label: '更新日期',
    },
  ],
  data: [] as any
});
const getTable = async () => {
  const loading = proxy?.$loading({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  const { data } = await QueryHistoryPrice({ ...FromSearch, priceId: props.pricerow.id })
  data.data.forEach(item => {
    item.priceContract = JSON.parse(item.priceContract)
  })
  tableColums.data = data.data;
  FromSearch.total = data.total;
  loading.close();
}

// 页码调整
const pageChange = pageIndex => {
  FromSearch.pageIndex = pageIndex.pageIndex;
  getTable();
};
// 页码调整
const sizeChange = pageSize => {
  FromSearch.pageSize = pageSize.pageSize;
  getTable();
};

watch(() => props.pricerow,
  (val) => {
    if (Object.keys(val).length !== 0) {
      getTable();
    }
  },
  { immediate: true, deep: true }
)
//取消
const cancel = () => {
  emit('cencelprice')
};
</script>

<style lang="scss" scoped></style>

