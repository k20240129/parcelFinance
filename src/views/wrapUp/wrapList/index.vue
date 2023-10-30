<template>
  <div id="h-full" class="h-full">
    <!-- 字典管理 -->
    <n-card class="h-full shadow-sm rounded-16px">
      <AddAndUpdate ref="AddAndUpdateRef" @getSearch="AddSearch" />
      <SearchFrom @getSearch="getSearch" />
      <KYTable
        ref="table"
        style="height: calc(100vh - 300px)"
        :loading="loading"
        :colums="tableColums.cl"
        :table-data="tableColums.data"
        :total="FromSearch.total"
        :selection="false"
        :serial-number="false"
        :pagination-show="true"
        class="current"
        :operation-width="250"
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
          <div class="btnOperation">
            <n-button v-underlineDirective="'#096dd9'" type="info" size="small" quaternary @click="update(scope.row)">
              修改
            </n-button>

            <el-dropdown size="small">
              <span class="el-dropdown-link">
                <span style="margin-right: 5px" @click="showDraTab(scope.row)">关联货架码</span> <icon-ep:arrow-down />
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="goContacts(scope.row)">联系人</el-dropdown-item>
                  <el-dropdown-item @click="binding(scope.row)">绑定国外货架</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
      </KYTable>
    </n-card>
    <DrawerTable ref="DrawerTableRef" />
    <DrawerTableBox ref="DrawerTableBoxRef" />
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { QueryBackstageParcelShopList } from '@/service';
import KYTable from '@/components/KY-table/KY-table.vue';
import SearchFrom from './components/searchFrom.vue';
import AddAndUpdate from './components/addAndUpdate.vue';
import DrawerTable from './components/drawerTable.vue';
import DrawerTableBox from './components/drawerTableBox.vue';
const route = useRoute();
const router = useRouter();
// ref实例
const AddAndUpdateRef = ref<any>(null);
const DrawerTableRef = ref<any>(null);
const DrawerTableBoxRef = ref<any>(null);
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
      prop: 'parcelShopName',
      label: '包裹店名称'
    },
    {
      minWidth: '180',
      prop: 'parcelShopCode',
      label: '包裹店名称Code'
    },

    {
      minWidth: '180',
      prop: 'cityName',
      label: '城市中文名称'
    },
    {
      minWidth: '180',
      prop: 'districtKazakhstanName',
      label: '区哈方名称'
    },
    {
      minWidth: '180',
      prop: 'districtRussiaName',
      label: '区俄方名称'
    },
    {
      minWidth: '180',
      prop: 'parcelShopAddress',
      label: '包裹店地址'
    }
  ],
  data: []
});

let model = reactive({
  parcelShopName: null
});

const getTable = async () => {
  const loading = proxy?.$loading({
    lock: true,
    text: '查询中...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  const { data } = await QueryBackstageParcelShopList({ ...model, ...FromSearch });
  tableColums.data = proxy?.$Utils.placeholder(data.data);
  // eslint-disable-next-line require-atomic-updates
  FromSearch.total = data.total;
  loading.close();
};
const binding = async row => {
  DrawerTableBoxRef.value.showDrawer(row);
};
// 跳转联系人页面
const goContacts = async row => {
  router.push({
    path: '/wrapUp/wrapList/detail',
    query: {
      id: row.id,
      parcelShopName: row.parcelShopName
    }
  });
};
// 打开抽屉弹出
const showDraTab = row => {
  console.log(DrawerTableRef);

  DrawerTableRef.value.showDrawer(row);
};
// 新增
const add = () => {
  AddAndUpdateRef.value.openAdd();
};
// 修改
const update = async row => {
  const { data } = await QueryBackstageParcelShopList({
    id: row.id
  });
  AddAndUpdateRef.value.openUpdate(data.data[0]);
};
// 查询
const getSearch = models => {
  model = { ...models };
  getTable();
};
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

getTable();
</script>

<style scoped lang="scss">
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
