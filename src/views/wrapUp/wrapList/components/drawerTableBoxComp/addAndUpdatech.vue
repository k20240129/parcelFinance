<template>
  <div>
    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" :title="title">
      <n-form ref="formRef" label-placement="top" :model="formData" :size="size">
        <n-form-item
          label="层编码"
          path="floorCode"
          :rule="[formItemRule('请填写层编码', ['blur', 'change'])]"
          style="width: 100%"
        >
          <n-input v-model:value="formData.floorCode" style="width: 100%" type="text" clearable placeholder="层编码" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-button class="M_r_10" @click="showModal = false"> 取消 </n-button>
        <n-button type="success" @click="submitCallback"> 确认 </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { AddAndUpdateParcelShopForeignShelfFloor } from '@/service';
import useMousePosition from '@/hooks/common/validation';
const emit = defineEmits(['getSearch']);
// hooks
const { formItemRule } = useMousePosition();
const showModal = ref(false);
const formRef = ref<any>(null);
// 表单参数
const formData = reactive<any>({
  id: undefined,
  parcelShopId: null,
  delFlag: undefined
});
// 定位货架层
const storey = reactive({
  item: null,
  index: null
});
// 空间对象
const control = reactive({
  type: false // false 新增  true 修改
});
const title = ref('增加货架层');

// 对话框打开函数
const openAdd = (parcelShopName, parcelShopId, item, index) => {
  storey.item = item;
  storey.index = index;
  formData.parcelShopId = parcelShopId;
  title.value = '增加货架层';
  showModal.value = true;
  Object.assign(formData, {
    shelfCode: '',
    parcelShopName,
    shelfCode: item.shelfCode,
    floorCode: '',
    parcelShopForeignShelfId: item.id,
    id: undefined
  });
  control.type = false;
};

// 对话框编辑打开
const openUpdate = (data, parcelShopId, item, index) => {
  console.log(data);
  storey.item = item;
  storey.index = index;
  formData.parcelShopId = parcelShopId;
  title.value = '编辑货架层';
  Object.assign(
    formData,
    (({ id, shelfCode, parcelShopName, floorCode, parcelShopForeignShelfId }) => ({
      id,
      shelfCode,
      parcelShopName,
      floorCode,
      parcelShopForeignShelfId
    }))(data)
  );
  control.type = true;
  showModal.value = true;
};

// 保存
const submitCallback = () => {
  formRef.value?.validate(async error => {
    if (error) return;
    const { data } = await AddAndUpdateParcelShopForeignShelfFloor({
      ...formData
    });
    if (data.code === 200) {
      window.$notification?.success({
        title: '成功',
        content: `${data.message}`,
        duration: 3000
      });
      showModal.value = false;
      emit('getSearch', storey);
    } else {
      window.$notification?.error({
        title: '失败',
        content: `${data.message}`,
        duration: 3000
      });
    }
  });
};
const openDelete = async (datas, parcelShopId, item, index) => {
  storey.item = item;
  storey.index = index;
  formData.parcelShopId = parcelShopId;
  Object.assign(
    formData,
    (({ id, shelfCode, parcelShopName, floorCode, parcelShopForeignShelfId }) => ({
      id,
      shelfCode,
      parcelShopName,
      floorCode,
      parcelShopForeignShelfId
    }))(datas)
  );
  control.type = true;
  formData.delFlag = 1;
  const { data } = await AddAndUpdateParcelShopForeignShelfFloor({
    ...formData
  });
  if (data.code === 200) {
    window.$notification?.success({
      title: '成功',
      content: `${data.message}`,
      duration: 3000
    });
    showModal.value = false;
    emit('getSearch', storey);
  } else {
    window.$notification?.error({
      title: '失败',
      content: `${data.message}`,
      duration: 3000
    });
  }
};
defineExpose({
  openAdd,
  openUpdate,
  openDelete
});
</script>

<style></style>
