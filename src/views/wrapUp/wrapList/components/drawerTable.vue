<template>
  <n-drawer v-model:show="active" width="60%">
    <n-drawer-content title="关联货架码">
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
        @page-change="pageChange($event)"
        @size-change="sizeChange($event)"
      >
        <template #categoryShelfCode="scope">
          <div>
            <n-input
              v-if="inputShow('categoryShelfCode', scope.index)"
              ref="categoryShelfCodes"
              v-model:value="scope.row.categoryShelfCode"
              style="width: 100%"
              type="text"
              clearable
              placeholder="品类货架码"
              @blur="inputNoShow(scope.index)"
            />
            <div
              v-else
              style="width: 100%; height: 43px; cursor: pointer; line-height: 43px"
              @click="inputShowClick('categoryShelfCode', scope.index)"
            >
              {{ scope.row.categoryShelfCode }}
            </div>
          </div>
        </template>
        <!-- <template #operation="scope">
          <n-button type="info" size="small" quaternary @click="doload(scope.row)"> 下载pdf </n-button>
        </template> -->
      </KYTable>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import {
  QueryParcelShopInternalCategoryShelf,
  UpdateParcelShopInternalCategoryShelf,
  DowmParcelShopInternalCategoryShelf
} from '@/service';
import KYTable from '@/components/KY-table/KY-table.vue';
const active = ref(false);
// ref实例
const categoryShelfCodes = ref<any>(null);
// 表格参数
const tableColums = reactive({
  cl: [
    {
      minWidth: '180',
      prop: 'categoryName',
      label: '品类名称'
    },
    {
      minWidth: '180',
      prop: 'categoryShelfCode',
      label: '品类货架码',
      slot: 'categoryShelfCode'
    }
  ],
  data: [] as any
});
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
// 判断是否显示输入框
const inputShow = (key, index) => {
  return key + index === is.inputShow;
};
// 隐藏输入框
const inputNoShow = async index => {
  const { data } = await UpdateParcelShopInternalCategoryShelf({
    id: tableColums.data[index].id,
    categoryShelfCode: tableColums.data[index].categoryShelfCode
  });
  if (data.code === 200) {
    window.$notification?.success({
      title: '成功',
      content: `${data.message}`,
      duration: 3000
    });
    is.inputShow = '';
  } else {
    window.$notification?.error({
      title: '失败',
      content: `${data.message}`,
      duration: 3000
    });
    nextTick(() => {
      categoryShelfCodes.value.focus();
    });
  }
};
// 下载包裹店货架码
const doload = async row => {
  const { data } = await DowmParcelShopInternalCategoryShelf({
    id: row.id
  });
  const url = data.data;
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', proxyUrl + url, true);
  xhr.responseType = 'blob';
  xhr.onload = () => {
    if (xhr.status === 200) {
      const blob = xhr.response;
      const elink = document.createElement('a');
      elink.download = '货架码.pdf';
      elink.rel = 'noopener noreferrer';
      elink.style.display = 'none';
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href);
      document.body.removeChild(elink);
    }
  };
  xhr.send(null);
};
// 显示输入框
const inputShowClick = async (key, index) => {
  is.inputShow = key + index;

  nextTick(() => {
    categoryShelfCodes.value.focus();
  });
};

const showDrawer = async (row: any) => {
  const { data } = await QueryParcelShopInternalCategoryShelf({
    parcelShopId: row.id
  });
  tableColums.data = data;
  active.value = true;
};
defineExpose({
  showDrawer
});
</script>

<style></style>
