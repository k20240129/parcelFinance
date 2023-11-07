<template>
  <div class="h-full">
    <n-card class="shadow-sm rounded-16px scerch">
      <SearchFrom @getSearch="getSearch" />
      <tabs :tablist="tablist" @tabsemit="getTable" />
    </n-card>
    <n-card class="shadow-sm rounded-16px">
      <KYTable ref="table" style="height: calc(100vh - 350px)" :colums="tableColums.cl" :table-data="tableColums.data"
        :total="FromSearch.total" :selection="false" :serial-number="false" :pagination-show="true" class="current"
        @page-change="pageChange($event)" @size-change="sizeChange($event)" :operationWidth="200">
        <template #billType="scope">
          <div v-if="scope.row.billType === 1">包裹店应付</div>
          <div v-else>--</div>
        </template>
        <template #billStatus="scope">
          <div v-if="scope.row.billStatus === 0">待对账</div>
          <div v-else-if="scope.row.billStatus === 1">待确认</div>
          <div v-else-if="scope.row.billStatus === 2">已对账</div>
          <div v-else>--</div>
        </template>
        <template #operation="scope">
          <n-button color="#FB4A4C" size="small" quaternary @click="gobill(0, scope.row.id)"
            v-if="scope.row.billStatus === 0">
            去对账
          </n-button>
          <n-button color="#FB4A4C" size="small" quaternary @click="gobill(2, scope.row.id)"
            v-if="scope.row.billStatus === 1">
            编辑
          </n-button>
          <n-button color="#FB4A4C" size="small" quaternary @click="gobill(1, scope.row.id)"
            v-if="scope.row.billStatus === 1 || scope.row.billStatus === 2">
            详情
          </n-button>
          <n-button color="#FB4A4C" size="small" quaternary @click="download(scope.row)"
            v-if="scope.row.billStatus === 1 || scope.row.billStatus === 2">
            下载
          </n-button>
        </template>
      </KYTable>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  QueryFinancialStatement,
} from '@/service';
import tabs from '@/components/tabs/index.vue';
import KYTable from '@/components/KY-table/KY-table.vue';
import SearchFrom from './components/searchFrom.vue';
import moment from "moment";
const router = useRouter();

// ref实例
const activeTabs = ref<number>();
// 获取Component实例
const proxy = getCurrentInstance()?.proxy as any;
// 分页查询参数
const FromSearch = reactive({
  pageSize: 10,
  pageIndex: 1,
  total: null
});
const tablist = ref([
  { name: '全部', id: -1 },
  { name: '待对账', id: 0 },
  { name: '待确认', id: 1 },
  { name: '已对账', id: 2 },
])
// 表格参数
const tableColums = reactive({
  cl: [
    {
      minWidth: '180',
      prop: 'bilNumber',
      label: '账单编号'
    },
    {
      minWidth: '180',
      prop: 'billType',
      label: '账单类型',
      slot: 'billType'
    },
    {
      minWidth: '180',
      prop: 'billingTime',
      label: '账单时间'
    },
    {
      minWidth: '180',
      prop: 'payee',
      label: '收款方'
    },
    {
      minWidth: '180',
      prop: 'currency',
      label: '币种'
    },
    {
      minWidth: '180',
      prop: 'billAmount',
      label: '账单金额',
    },
    {
      minWidth: '180',
      prop: 'billStatus',
      label: '状态',
      slot: 'billStatus'
    },
  ],
  data: [] as any
});
let model = reactive({
  billLadingNo: null,
  payee: null,
  billTime: null,
});

const getTable = async (val?: number) => {
  activeTabs.value = val
  const loading = proxy?.$loading({
    lock: true,
    text: '查询中...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  const { data } = await QueryFinancialStatement({ ...model, ...FromSearch, status: activeTabs.value });
  tableColums.data = proxy?.$Utils.placeholder(data.data);
  FromSearch.total = data.total;
  loading.close();
};

//导出全部
const download = async (val: any) => {
  proxy?.$Utils.exportsPost('/api/ExportExcel/ExportFinancialDetails', { id: val.id }, `应付帐单${val.payee}${val.billingTime}`);
}

//去对账
const gobill = (val: number, id: any) => {
  router.push({
    path: '/home/edit',
    query: {
      type: val, id
    }
  })
}

// 查询
const getSearch = models => {
  model = { ...models };
  getTable();
};
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

getTable();
</script>

<style scoped lang="scss">
.stybox {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.derivesty {
  margin-left: 75vw;
  margin-bottom: 10px;
}

.btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #096dd9;
  display: flex;
  align-items: center;
  border: none;
}

.btnOperation {
  display: flex;
  align-items: center;
}

.scerch {
  margin-bottom: 16px;
}
</style>
