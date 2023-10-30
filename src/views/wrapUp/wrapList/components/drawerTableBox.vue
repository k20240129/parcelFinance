<template>
  <n-drawer v-model:show="active" width="40%">
    <AddAndUpdate ref="AddAndUpdateRef" @getSearch="AddSearch" />
    <AddAndUpdateCh ref="AddAndUpdateChRef" @getSearch="AddSearchCh" />
    <n-drawer-content title="关联国外货架码">
      <div class="btn">
        <n-button type="primary" icon-placement="right" @click="add"> 新增 </n-button>
      </div>
      <n-collapse>
        <n-collapse-item
          v-for="(item, index) in tableColums.data"
          :key="item.id"
          :title="item.shelfCode"
          :name="index"
          @click="searchChili(item, index)"
        >
          <KYTable
            ref="table"
            style="height: 100%"
            :loading="loading"
            :colums="tableColums.clch"
            :table-data="item.child"
            :total="FromSearch.total"
            :selection="false"
            :serial-number="false"
            :pagination-show="false"
            class="current"
            @click.stop=""
            @rowClick="rowClick"
            @page-change="pageChange($event)"
            @size-change="sizeChange($event)"
          >
            <template #operation="scope">
              <n-button type="info" size="small" quaternary @click="updateCh(scope.row, item, index)"> 修改 </n-button>
              <n-popconfirm @positive-click="deleteCh(scope.row, item, index)" @negative-click="() => {}">
                <template #trigger>
                  <n-button type="error" size="small" quaternary> 删除 </n-button>
                </template>
                是否确认删除
              </n-popconfirm>
            </template>
          </KYTable>
          <!-- <n-dynamic-tags v-model:value="item.child" @create="getChild($event, item, index)" /> -->
          <template #header-extra>
            <div style="display: flex">
              <n-button type="info" size="small" quaternary @click.stop="update(item)"> 修改 </n-button>
              <n-button type="info" size="small" quaternary @click.stop="addCh(item, index)"> 新增货架层 </n-button>
            </div>
          </template>
        </n-collapse-item>
      </n-collapse>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import {
  QueryParcelShopForeignShelfList,
  UpdateParcelShopInternalCategoryShelf,
  DowmParcelShopInternalCategoryShelf,
  AddAndUpdateParcelShopForeignShelfFloor,
  QueryParcelShopForeignShelfFloorList
} from '@/service';
import KYTable from '@/components/KY-table/KY-table.vue';
import AddAndUpdate from './drawerTableBoxComp/addAndUpdate.vue';
import AddAndUpdateCh from './drawerTableBoxComp/addAndUpdatech.vue';

const active = ref(false);
// ref实例
const AddAndUpdateRef = ref<any>(null);
const AddAndUpdateChRef = ref<any>(null);
// ref实例
const categoryShelfCodes = ref<any>(null);
// 包裹店id
const parcelShopId = ref(null);
const parcelShopName = ref(null);

// 表格参数
const tableColums = reactive({
  clch: [
    {
      minWidth: '180',
      prop: 'floorCode',
      label: '货架编码'
    }
  ],
  data: [] as any
});
// 新增
const add = () => {
  AddAndUpdateRef.value.openAdd(parcelShopId);
};

// 分页查询参数
const FromSearch = reactive({
  pageSize: 10,
  pageIndex: 1,
  total: null
});
// 判断参数
const is = reactive({
  inputShow: ''
});

// 查询子集
const searchChili = async (item, index) => {
  const { data } = await QueryParcelShopForeignShelfFloorList({
    parcelShopId: parcelShopId.value,
    parcelShopForeignShelfId: item.id
  });
  tableColums.data[index].child = [];
  tableColums.data[index].child = data;
};
const addCh = async (row, index) => {
  AddAndUpdateChRef.value.openAdd(parcelShopName, parcelShopId, row, index);
};

// 修改
const update = async row => {
  AddAndUpdateRef.value.openUpdate(row, parcelShopId);
};
// 修改
const updateCh = async (row, item, index) => {
  AddAndUpdateChRef.value.openUpdate(row, parcelShopId, item, index);
};
const deleteCh = async (row, item, index) => {
  AddAndUpdateChRef.value.openDelete(row, parcelShopId, item, index);
};
const showDrawer = async (row: any) => {
  const { data } = await QueryParcelShopForeignShelfList({
    parcelShopId: row.id
  });
  parcelShopId.value = row.id;
  parcelShopName.value = row.parcelShopName;
  tableColums.data = data;
  active.value = true;
};

// 新增修改后查询
const AddSearch = () => {
  showDrawer({ id: parcelShopId });
};
// 新增子集后查询
const AddSearchCh = storey => {
  searchChili(storey.item, storey.index);
};
defineExpose({
  showDrawer
});
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
