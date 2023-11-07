<template>
  <div class="h-full">
    <n-card class="shadow-sm rounded-16px scerch">
      <SearchFrom @getSearch="getSearch" />
      <tabs :tablist="tablist" @tabsemit="getTable" />
    </n-card>
    <n-card class="shadow-sm rounded-16px">
      <div style="margin-bottom: 16px;">
        <n-dropdown trigger="hover" :options="options" @select="handleSelect">
          <n-button type="error" color="#FB4A4C">批量处理</n-button>
        </n-dropdown>
      </div>
      <KYTable ref="table" style="height: calc(100vh - 400px)" :loading="loading" :colums="tableColums.cl"
        :table-data="tableColums.data" :total="FromSearch.total" :serial-number="false" :selection="true"
        :pagination-show="true" class="current" @page-change="pageChange($event)" @size-change="sizeChange($event)"
        @handleSelectionChange="handleSelectionChange">
        <template #operation="scope">
          <n-button color="#FB4A4C" type="info" quaternary @click="cliedit(scope.row, 1)">
            编辑
          </n-button>
          <n-button color="#FB4A4C" type="info" quaternary @click="cliedit(scope.row, 2)">
            历史价格
          </n-button>
        </template>
      </KYTable>
    </n-card>
    <AddAndUpdate :showModal="showModal" @cencelpricebtn="cencelbtn(1)" :editdata="editdata" />
    <PriceDialog :priceShow="priceShow" @cencelprice="cencelbtn(2)" :pricerow="pricerow" />
    <BatchEdit :BatchEditshow="BatchEditshow" @cencelbtn="cencelbtn(3)" :editdata="batckedit" />
    <ToChannel :tochannelshow="tochannelshow" @cencelbtn="cencelbtn(4)" />
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  QueryPriceList,
} from '@/service';
import KYTable from '@/components/KY-table/KY-table.vue';
import SearchFrom from './components/searchFrom.vue';
import tabs from '@/components/tabs/index.vue';
import AddAndUpdate from './components/addAndUpdate.vue';
import PriceDialog from './components/pricedialog.vue'
import BatchEdit from './components/batckedit.vue'
import ToChannel from "./components/tochannel.vue";
import { useMessage } from 'naive-ui'
import moment from "moment";
const router = useRouter();
const options = ref([
  {
    label: '导入',
    key: 1
  },
  {
    label: '全部导出',
    key: 2
  },
  {
    label: '批量编辑',
    key: 3
  }
])
// ref实例
const table = ref<any>(null)
const tablist = ref([
  { name: '包裹店', id: 1 },
])
const message = useMessage()
const showModal = ref(false)
const priceShow = ref(false)
const BatchEditshow = ref(false)
const tochannelshow = ref(false)
const activeTabs = ref<any>();
const loading = ref(false)
const pricerow = ref({}) as any
const editdata = ref({})
const batckedit = ref([]) as any
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
  data: []
});
let model = reactive({
  payeeName: null,
});

const getTable = async (val?: number) => {
  activeTabs.value = val
  const loading = proxy?.$loading({
    lock: true,
    text: '查询中...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  const { data } = await QueryPriceList({ ...model, ...FromSearch, priceHotel: activeTabs.value });
  tableColums.data = data.data;
  FromSearch.total = data.total;
  loading.close();
};

//批量处理按钮
const handleSelect = (val: number) => {
  if (val === 1) {
    tochannelshow.value = true
  } else if (val === 2) {
    proxy?.$Utils.exportsPost('/api/ExportExcel/ExportPriceList', {}, `服务费列表_包裹店_${moment().format("YYYYMMDDHHmmss")}`);
  } else if (val === 3) {
    if (Array.isArray(batckedit.value) && batckedit.value.length === 0) {
      message.warning('请勾选数据!')
    } else {
      BatchEditshow.value = true
    }
  }
}

//编辑关闭弹框
const cencelbtn = (val: number) => {
  switch (val) {
    case 1:
      showModal.value = false
      getTable();
      break;
    case 2:
      priceShow.value = false
      break;
    case 3:
      BatchEditshow.value = false
      table.value!.clearSelection()
      batckedit.value = []
      getTable();
      break;
    case 4:
      tochannelshow.value = false
      getTable();
      break;
  }
}
//多选
const handleSelectionChange = (row: any) => {
  batckedit.value = row
}

//编辑
const cliedit = async (row: any, type: number) => {
  if (type === 1) {
    showModal.value = true
    editdata.value = row
  } else {
    priceShow.value = true
    pricerow.value = row
  }
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

.scerch {
  margin-bottom: 16px;
}
</style>
