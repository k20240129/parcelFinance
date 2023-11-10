<template>
  <div class="box">
    <div class="getback">
      <span v-if="route.query.type == '0'">完善/编辑应付账单</span>
      <span v-else-if="route.query.type == '1'">查看应付账单</span>
      <span v-else-if="route.query.type == '2'">编辑应付账单</span>
      <div class="getbarksty">
        <svg-icon local-icon="printbtn" style="width: 84px;height: 34px;" @click="downloadbill" />
        <n-button @click="getback" color="#F5F7FA" :text-color="'#333'" style="margin-left: 12px;">
          返回
        </n-button>
      </div>
    </div>
    <n-card class="shadow-sm rounded-16px" style="margin-bottom: 12px;">
      <div class="nametit">基本信息
      </div>
      <div class="jichucontit">
        <n-form ref="formRef" label-placement="left" label-width="100" label-align="left">
          <n-grid x-gap="12" :cols="2">
            <n-gi>
              <n-form-item label="付款方：">
                哈米信息科技有限公司
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="收款方：">
                {{ model.payee }}
              </n-form-item>
            </n-gi> <n-gi>
              <n-form-item label="账单编码：">
                {{ model.bilNumber }}
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="账单类型：">
                {{ model.billType }}
              </n-form-item>
            </n-gi> <n-gi>
              <n-form-item label="账单时间：">
                {{ model.billingTime }}
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="币种：">
                {{ model.currency }}
              </n-form-item>
            </n-gi> <n-gi>
              <n-form-item label="账单金额：">
                {{ model.billAmount }}
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="账单状态：">
                <div v-if="model.billStatus === 0" class="redbtn">待对账</div>
                <div v-if="model.billStatus === 1" class="yellowbtn">待确认</div>
                <div v-if="model.billStatus === 2" class="greenbtn">已对账</div>
              </n-form-item>
            </n-gi>
          </n-grid>
        </n-form>
      </div>
    </n-card>
    <n-card class="shadow-sm rounded-16px" style="margin-bottom: 56px;">
      <div class="nametit">账单详情</div>
      <div class="tabs">
        <div :class="activesty === 1 ? 'activestyly' : ''" @click="qiehuan(1)">签收费用</div>
        <div style="margin-left: 12px;" :class="activesty === 2 ? 'activestyly' : ''" @click="qiehuan(2)">拒收费用</div>
      </div>
      <div class="cost"> <span v-if="activesty === 1">签收费用</span><span v-if="activesty === 2">拒收费用</span> ：共{{
        bill.countnum }}条数据，计费总金额：${{ bill.money }}
        <n-button ghost type="error" @click="addparty" v-if="route.query.type !== '1'">
          + 新增一行
        </n-button>
      </div>
      <KYTable ref="table" style="height: 22vh;" :loading="loading" :colums="tableColums.cl"
        :table-data="tableColums.data" :total="FromSearch.total" :selection="false" :serial-number="false"
        :pagination-show="true" class="current" @page-change="pageChange($event)" @size-change="sizeChange($event)">
        <template #billingType="scope">
          <div v-if="scope.row.billingType === 1">包裹店签收费用</div>
          <div v-else-if="scope.row.billingType === 2">包裹店拒收费用</div>
          <div v-else>--</div>
        </template>
        <template #operation="scope">
          <n-button type="error" size="small" quaternary :disabled="route.query.type == '1'"
            @click="cliclear(scope.row.id)">
            删除
          </n-button>
        </template>
      </KYTable>
      <div class="cost postionab">账单总金额，即签收与拒收费用总计：共{{ bill.listcount }}条数据，计费总金额：${{ bill.listMoeny }}</div>
      <div class="cost btntijiao" v-if="route.query.type !== '1'">
        <n-button type="error" color="#FB4A4C" @click="submitbill">
          提交账单
        </n-button>
      </div>
    </n-card>
    <AddDialog :showModal="showModal" @cencelbtn="cencelbtn" :activesty="activesty"
      :financialStatementId="Number(route.query.id)" />
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AddDialog from './components/addDialog.vue'
import { useMessage } from 'naive-ui'
import moment from "moment";
import {
  QueryFinancialStatementDetails,
  QueryFinancialStatement,
  DeleteFinancialStatementDetails,
  AddAndUpdateIFinancialStatement,
  QueryFinancial
} from '@/service';
import KYTable from '@/components/KY-table/KY-table.vue';
const message = useMessage()
const router = useRouter();
const route = useRoute();
const showModal = ref(false);
const activesty = ref(1)
const model = ref({}) as any
const bill = ref({}) as any
const loading = ref(false)
const proxy = getCurrentInstance()?.proxy as any;
const FromSearch = reactive({
  pageSize: 10,
  pageIndex: 1,
  total: null
});
const options = ref([{
  label: '包裹店应付',
  value: 1
}])
// 表格参数
const tableColums = reactive({
  cl: [
    {
      minWidth: '180',
      prop: 'billCdoe',
      label: '计费单号'
    },
    {
      minWidth: '180',
      prop: 'businessNumber',
      label: '业务单号'
    },
    {
      minWidth: '180',
      prop: 'billingType',
      label: '计费类型',
      slot: 'billingType'
    },
    {
      minWidth: '180',
      prop: 'billTime',
      label: '计费日期'
    },
    {
      minWidth: '180',
      prop: 'billWeight',
      label: '计费重量/kg'
    },
    {
      minWidth: '180',
      prop: 'billPrice',
      label: '单价/USD',
    },
    {
      minWidth: '180',
      prop: 'billAmount',
      label: '计费金额/USD',
    },
  ],
  data: []
});

//基础信息
const getinformation = async () => {
  const { data } = await QueryFinancial(Number(route.query.id));
  model.value = data
}
const getTable = async () => {
  const loading = proxy?.$loading({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  const { data } = await QueryFinancialStatementDetails({
    ...FromSearch, billingType: activesty.value, financialStatementId: Number(route.query.id)
  })
  bill.value = data
  tableColums.data = data.response.data
  FromSearch.total = data.response.total;
  loading.close();
}

//返回
const getback = () => {
  router.push({
    path: '/home/LadingBillhome',
  })
}
//下载账单
const downloadbill = async () => {
  proxy?.$Utils.exportsPost('/api/ExportExcel/ExportFinancialDetails', { id: route.query.id }, `应付帐单${model.value.payee}${model.value.billingTime}`);
}
//提交账单
const submitbill = async () => {
  //状态只能为待确认
  const { data } = await AddAndUpdateIFinancialStatement({ id: route.query.id, billStatus: 1 })
  console.log(data);
  if (data.code === 200) {
    message.success(data.message)
    getback()
  } else {
    message.error(data.message)
  }
}

//删除
const cliclear = async (id: number) => {
  window.$dialog?.info({
    title: '删除',
    content: '您确定要删除改数据吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const res = await DeleteFinancialStatementDetails(id, Number(route.query.id))
      if (res.data.code === 200) {
        message.success(res.data.message)
      }
      getTable();
    }
  });

}
//新增一行
const addparty = () => {
  showModal.value = true
}

//关闭弹框
const cencelbtn = () => {
  showModal.value = false
  getinformation()
  getTable();
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
getinformation()
getTable();
</script>

<style scoped lang="scss">
.getbarksty {
  display: flex;
  align-items: center;
}

.box {
  padding-top: 78px;
  position: relative;
  width: 100%;

  .getback {
    position: fixed;
    right: 0;
    top: 89px;
    width: 100%;
    padding: 0 40px 0 250px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.12);
    height: 76px;
    z-index: 11;

    span {
      font-family: PingFangSC-Semibold;
      font-size: 20px;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}

.cost {
  margin-bottom: 10px;
  position: relative;
  height: 30px;
  display: flex;
  align-items: center;

  >.n-button {
    position: absolute;
    right: 4px;
  }
}

.nametit {
  border-bottom: 1px dashed #E0E0E6;
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 16px;
  padding-bottom: 16px;
}

.jichucontit {
  width: 65%;
  margin-bottom: -4px;
}

.tabs {
  width: 100%;
  height: 35px;
  margin-bottom: 16px;
  display: flex;

  .activestyly {
    background: #FB4A4C;
    color: #fff;
    border: 1px solid #fff;
  }

  >div {
    height: 100%;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    width: 86px;
    border-radius: 16px;
    background: #F5F7FA;
  }
}

.postionab {
  position: relative;
  top: -24px;
}

.btntijiao {
  position: fixed;
  right: 0;
  bottom: 0px;
  width: 100%;
  padding-left: 250px;
  display: flex;
  align-items: center;
  background: #fff;
  height: 56px;
  z-index: 11;
  margin: 0;
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.05);

  .n-button {
    margin-right: calc((100% - 220px) / 2);
  }
}

.n-form-item {
  height: 42px;
}
</style>
