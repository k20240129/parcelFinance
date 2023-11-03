<template>
  <div class="h-full">
    <n-card class="h-full shadow-sm rounded-16px">
      <SearchFrom @getSearch="getSearch" />
      <div class="stybox">
        <n-tabs v-model:value="activeTabs" type="line" animated @update:value="getTable">
          <n-tab-pane :name="1" tab="包裹店"> </n-tab-pane>
        </n-tabs>
        <n-dropdown trigger="hover" :options="options" @select="handleSelect">
          <n-button type="info" ghost>批量处理</n-button>
        </n-dropdown>
      </div>
      <KYTable ref="table" style="height: calc(100vh - 300px)" :loading="loading" :colums="tableColums.cl"
        :table-data="tableColums.data" :total="FromSearch.total" :selection="false" :serial-number="false"
        :pagination-show="true" class="current" @page-change="pageChange($event)" @size-change="sizeChange($event)">
        <template #operation="scope">
          <n-button v-underlineDirective="'#096dd9'" type="info" size="small" quaternary @click="cliedit(scope.row, 1)">
            编辑
          </n-button> <n-button v-underlineDirective="'#096dd9'" type="info" size="small" quaternary>
            历史价格
          </n-button>
        </template>
      </KYTable>
    </n-card>
    <AddAndUpdate :showModal="showModal" @cencelpricebtn="cencelbtn" :title="edittitle" />
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
import AddAndUpdate from './components/addAndUpdate.vue';
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
const edittitle = ref('')
const showModal = ref(false)
const activeTabs = ref<any>();
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
let model = reactive({
  payeeName: null,
});

const getTable = async () => {
  const loading = proxy?.$loading({
    lock: true,
    text: '查询中...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  const { data } = await QueryPriceList({ ...model, ...FromSearch, priceHotel: activeTabs.value });
  console.log(data.data);
  tableColums.data = data.data;
  FromSearch.total = data.total;
  loading.close();
};

//批量处理按钮
const handleSelect = (val: number) => {
  if (val === 1) {

  } else if (val === 2) {
    proxy?.$Utils.exportsPost('/api/ExportExcel/ExportPriceList', {}, `服务费列表_包裹店_${moment().format("YYYYMMDDHHmmss")}`);
  } else if (val === 3) {
    edittitle.value = '批量编辑'
    showModal.value = true
  }
}

//关闭弹框
const cencelbtn = () => {
  showModal.value = false
  getTable();
}
//编辑
const cliedit = async (row: any, type: number) => {
  edittitle.value = '编辑'
  showModal.value = true
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
