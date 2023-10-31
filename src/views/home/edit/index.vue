<template>
  <div class="h-full">
    <n-card class="h-full shadow-sm rounded-16px">
      <div class="tit">
        <span v-if="route.query.type == '0'">完善/编辑应付账单</span>
        <span v-else-if="route.query.type == '1'">完善/编辑应付账单</span>
        <span v-else-if="route.query.type == '2'">完善/编辑应付账单</span>
        <n-button strong secondary type="info" @click="downloadbill">
          下载账单
        </n-button>
      </div>
      <div class="nametit">基础信息</div>
      <div class="jichucontit">
        <n-form ref="formRef" label-placement="left" label-width="100">
          <n-grid x-gap="12" :cols="2">
            <n-gi>
              <n-form-item label="付款方：">
                <n-input v-model:value="model.a" style="width: 80%" type="text" disabled />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="收款方：">
                <n-input v-model:value="model.a" style="width: 80%" type="text" disabled />
              </n-form-item>
            </n-gi> <n-gi>
              <n-form-item label="账单编码：">
                <n-input v-model:value="model.a" style="width: 80%" type="text" disabled />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="账单类型：">
                <n-input v-model:value="model.a" style="width: 80%" type="text" disabled />
              </n-form-item>
            </n-gi> <n-gi>
              <n-form-item label="账单时间：">
                <n-input v-model:value="model.a" style="width: 80%" type="text" disabled />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="币种：">
                <n-input v-model:value="model.a" style="width: 80%" type="text" disabled />
              </n-form-item>
            </n-gi> <n-gi>
              <n-form-item label="账单金额：">
                <n-input v-model:value="model.a" style="width: 80%" type="text" disabled />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="账单状态：">
                <n-input v-model:value="model.a" style="width: 80%" type="text" disabled />
              </n-form-item>
            </n-gi>
          </n-grid>
        </n-form>
      </div>
      <div class="nametit">账单详情</div>
      <div class="tabs">
        <div :class="activesty === 0 ? 'activestyly' : ''" @click="qiehuan(0)">签收费用</div>
        <div :class="activesty === 1 ? 'activestyly' : ''" @click="qiehuan(1)">拒收费用</div>
      </div>
      <div class="cost">签收费用：共{{}}条数据，计费总金额：${{ }}
        <n-button size="small" type="info" ghost @click="addparty" v-if="route.query.type !== '1'">
          新增一行
        </n-button>
      </div>
      <KYTable ref="table" :loading="loading" :colums="tableColums.cl" :table-data="tableColums.data"
        :total="FromSearch.total" :selection="false" :serial-number="false" :pagination-show="true" class="current"
        @page-change="pageChange($event)" @size-change="sizeChange($event)">
        <template #operation="scope">
          <n-button type="error" size="small" quaternary :disabled="route.query.type == '1'">
            删除
          </n-button>
        </template>
      </KYTable>
      <div class="cost">账单总金额，即签收与拒收费用总计：共{{}}条数据，计费总金额：${{ }}</div>
      <div class="cost"> <n-button type="info" @click="submitbill">
          提交账单
        </n-button></div>
    </n-card>
    <AddDialog :showModal="showModal" @cencelbtn="cencelbtn" />
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AddDialog from './components/addDialog.vue'
// import {
//   QueryProductOrder,
// } from '@/service';
import KYTable from '@/components/KY-table/KY-table.vue';
const router = useRouter();
const route = useRoute();
const showModal = ref(false);
const activesty = ref(0)
const model = ref({})
const loading = ref(false)
const activeTabs = ref<any[]>([]);
const proxy = getCurrentInstance()?.proxy as any;
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
      label: '计费单号'
    },
    {
      minWidth: '180',
      prop: '',
      label: '业务单号'
    },
    {
      minWidth: '180',
      prop: '',
      label: '计费类型'
    },
    {
      minWidth: '180',
      prop: '',
      label: '计费日期'
    },
    {
      minWidth: '180',
      prop: '',
      label: '计费重量/kg'
    },
    {
      minWidth: '180',
      prop: '',
      label: '单价/USD',
    },
    {
      minWidth: '180',
      prop: '',
      label: '计费金额/USD',
    },
  ],
  data: [{}]
});

const getTable = async () => {
  const loading = proxy?.$loading({
    lock: true,
    text: '查询中...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  //签收费用列表
  if (activesty.value === 0) {
    // const { data } = await QueryProductOrder({ ...model, ...FromSearch });
    // tableColums.data = proxy?.$Utils.placeholder(data.data);
    // FromSearch.total = data.total;
  } else {
    // const { data } = await QueryProductOrder({ ...model, ...FromSearch });
    // tableColums.data = proxy?.$Utils.placeholder(data.data);
    // FromSearch.total = data.total;
  }
  loading.close();
}

//下载账单
const downloadbill = async () => {

}
//提交账单
const submitbill = async () => { }

//新增一行
const addparty = () => {
  showModal.value = true
}
const cencelbtn = () => {
  showModal.value = false
}
//tab切换
const qiehuan = async (val: number) => {
  activesty.value = val
  getTable();
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
getTable();
</script>

<style scoped>
.tit {
  width: 100%;
  height: 47px;
  font-size: 25px;
  font-weight: 500;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  position: reactive;

  >.n-button {
    position: absolute;
    right: 50px;
  }
}

.cost {
  margin-bottom: 10px;
  position: reactive;
  height: 30px;

  >.n-button {
    position: absolute;
    right: 50px;
  }
}

.nametit {
  font-size: 20px;
  font-weight: 600;
  color: black;
  margin-bottom: 15px;
}

.jichucontit {
  width: 65%;
}

.tabs {
  width: 100%;
  height: 35px;
  margin-bottom: 10px;
  display: flex;

  .activestyly {
    background: #606AFF;
    color: #fff;
  }

  >div {
    height: 100%;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    width: 86px;
    border: 1px solid #c0c0c0;
  }

  :last-child {
    border-left: 0;
  }
}
</style>
