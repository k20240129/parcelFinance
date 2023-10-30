<template>
  <div class="h-full">
    <!-- 字典管理 -->
    <n-card class="h-full shadow-sm rounded-16px">
      <n-page-header subtitle="返回" @back="handleBack"> </n-page-header>
      <AddAndUpdate ref="AddAndUpdateRef" @getSearch="AddSearch" />
      <!-- <SearchFrom @getSearch="getSearch" /> -->
      <KYTable
        ref="table"
        style="height: calc(100vh - 300px)"
        :loading="loading"
        :colums="tableColums.cl"
        :table-data="tableColums.data"
        :total="FromSearch.total"
        :selection="false"
        :serial-number="false"
        :pagination-show="false"
        class="current"
        @rowClick="rowClick"
        @page-change="pageChange($event)"
        @size-change="sizeChange($event)"
      >
        <template #top_title>
          <div class="btn">
            <n-button type="primary" icon-placement="right" @click="add"> 新增 </n-button>
          </div>
        </template>
        <template #operation="scope">
          <n-button type="info" size="small" quaternary @click="update(scope.row)"> 修改 </n-button>
          <!-- <n-button type="error" size="small" quaternary class="M_r_10"> 删除 </n-button> -->
        </template>
      </KYTable>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, ref, onActivated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { QueryParcelShopmShopLinkList } from '@/service';
import KYTable from '@/components/KY-table/KY-table.vue';
import SearchFrom from './components/searchFrom.vue';
import AddAndUpdate from './components/addAndUpdate.vue';
const route = useRoute();
const router = useRouter();

// ref实例
const AddAndUpdateRef = ref<any>(null);
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
      prop: 'parcelShopLinkName',
      label: '联系人名称'
    },
    {
      minWidth: '180',
      prop: 'parcelShopLinkPhone',
      label: '联系人手机号'
    },
    {
      minWidth: '180',
      prop: 'parcelShopLinkEmail',
      label: '联系人邮箱'
    }
  ],
  data: []
});
const model = reactive({
  // dictionaryTag: ''
});
// 返回
const handleBack = () => {
  router.push('/wrapUp/wrapList');
};
const getTable = async () => {
  const loading = proxy?.$loading({
    lock: true,
    text: '查询中...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  const { data } = await QueryParcelShopmShopLinkList({
    ...model,
    parcelShopId: route.query.id
  });
  tableColums.data = proxy?.$Utils.placeholder(data);
  // eslint-disable-next-line require-atomic-updates
  FromSearch.total = data.total;
  loading.close();
};
onActivated(() => {
  // update();
  getTable();
});
// 新增
const add = () => {
  AddAndUpdateRef.value.openAdd();
};
// 修改
const update = async row => {
  const { data } = await QueryParcelShopmShopLinkList({
    id: row.id
  });
  AddAndUpdateRef.value.openUpdate(data[0]);
};
// // 查询
// const getSearch = models => {
//   model = { ...models };
//   getTable();
// };
// 新增修改后查询
const AddSearch = () => {
  getTable();
};
// 页码调整
const pageChange = pageIndex => {
  console.log(pageIndex);
  FromSearch.pageIndex = pageIndex.pageIndex;
  getTable();
};
// 页码调整
const sizeChange = pageSize => {
  FromSearch.pageSize = pageSize.pageSize;
  getTable();
};
</script>

<style scoped lang="scss">
.btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
