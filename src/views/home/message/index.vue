<template>
  <div class="h-full">
    <n-card class="h-full shadow-sm rounded-16px">
      <SearchFrom @getSearch="getSearch" />
      <div class="stybox">
        <n-tabs v-model:value="activeTabs" type="line" animated @update:value="getTable">
          <n-tab-pane :name="[]" tab="包裹店"> </n-tab-pane>
        </n-tabs>
        <n-dropdown trigger="hover" :options="options" @select="handleSelect">
          <n-button type="info" ghost>批量处理</n-button>
        </n-dropdown>
      </div>
      <KYTable ref="table" style="height: calc(100vh - 300px)" :loading="loading" :colums="tableColums.cl"
        :table-data="tableColums.data" :total="FromSearch.total" :selection="false" :serial-number="false"
        :pagination-show="true" class="current" @page-change="pageChange($event)" @size-change="sizeChange($event)">
        <template #operation="scope">
          <n-button v-underlineDirective="'#096dd9'" type="info" size="small" quaternary>
            编辑
          </n-button> <n-button v-underlineDirective="'#096dd9'" type="info" size="small" quaternary>
            历史价格
          </n-button>
        </template>
      </KYTable>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import {
//   QueryProductOrder,
// } from '@/service';
import KYTable from '@/components/KY-table/KY-table.vue';
import SearchFrom from './components/searchFrom.vue';
import moment from "moment";
const router = useRouter();

const options = ref([
  {
    label: '导入',
    key: "1"
  },
  {
    label: '全部导出',
    key: "2"
  },
  {
    label: '批量编辑',
    key: "3"
  }
])
// ref实例
const activeTabs = ref<any[]>([]);
const loading = ref(false)
// 获取Component实例
const proxy = getCurrentInstance()?.proxy as any;
// 分页查询参数
const FromSearch = reactive({
  pageSize: 10,
  pageIndex: 1,
  total: null
});
// 表格参数
const tableColums = reactive({
  cl: [
    {
      minWidth: '180',
      prop: '',
      label: '收款方编码'
    },
    {
      minWidth: '180',
      prop: '',
      label: '收款方名称'
    },
    {
      minWidth: '180',
      prop: '',
      label: '币种'
    },
    {
      minWidth: '180',
      prop: '',
      label: '价格有效期'
    },
    {
      minWidth: '180',
      prop: '',
      label: '计费类型1'
    },
    {
      minWidth: '180',
      prop: '',
      label: '单价1',
    },
    {
      minWidth: '180',
      prop: '',
      label: '计费类型2',
    },
    {
      minWidth: '180',
      prop: '',
      label: '单价2',
    },
  ],
  data: []
});
let model = reactive({
  billLadingNo: null,
  supplierName: null,
  beginSendTime: null,
  endSendTime: null,
  reachSendTime: null,
  reachEndSendTime: null
});

const getTable = async () => {
  const loading = proxy?.$loading({
    lock: true,
    text: '查询中...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  // const { data } = await QueryProductOrder({ ...model, ...FromSearch });
  // tableColums.data = proxy?.$Utils.placeholder(data.data);
  // FromSearch.total = data.total;
  loading.close();
};

//导出全部
const cliderive = async (val: number, data?: any) => {
  // if (val === 1) {
  //   proxy?.$Utils.exportsPost('/api/ExportExcel/ExportProductBill', {
  //     ...FromSearch, ...model
  //   }, `提单台账_${moment().format("YYYYMMDDHHmmss")}`);
  // } else if (val === 2) {
  //   let id = data.id
  //   proxy?.$Utils.exportsPost('/api/ExportExcel/ExportOrder', { id }, `提单小包详情${data.billLadingNo}_${moment().format("YYYYMMDDHHmmss")}`);
  // }
}
const handleSelect = () => {

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
  margin-bottom: 10px;

  .n-button {
    height: 30px;
  }
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
</style>
