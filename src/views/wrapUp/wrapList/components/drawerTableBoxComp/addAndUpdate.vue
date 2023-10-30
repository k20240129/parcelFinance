<template>
  <div>
    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" :title="title">
      <n-form ref="formRef" label-placement="top" :model="formData" :size="size">
        <n-form-item
          label="货架码Code"
          path="shelfCode"
          :rule="[formItemRule('请填写货架码Code', ['blur', 'change'])]"
          style="width: 100%"
        >
          <n-input
            v-model:value="formData.shelfCode"
            style="width: 100%"
            type="text"
            clearable
            placeholder="货架码Code"
          />
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
import { AddAndUpdateParcelShopForeignShelf } from '@/service';
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
// 空间对象
const control = reactive({
  type: false // false 新增  true 修改
});
const title = ref('增加货架码');

// 对话框打开函数
const openAdd = parcelShopId => {
  formData.parcelShopId = parcelShopId;
  title.value = '增加货架码';
  showModal.value = true;
  Object.assign(formData, {
    shelfCode: null,
    id: undefined
  });
  control.type = false;
};

// 对话框编辑打开
const openUpdate = (data, parcelShopId) => {
  formData.parcelShopId = parcelShopId;
  title.value = '编辑货架码';
  Object.assign(
    formData,
    (({ id, shelfCode }) => ({
      id,
      shelfCode
    }))(data)
  );
  control.type = true;
  showModal.value = true;
};
// 保存
const submitCallback = () => {
  formRef.value?.validate(async error => {
    if (error) return;
    const { data } = await AddAndUpdateParcelShopForeignShelf({
      ...formData
    });
    if (data.code === 200) {
      window.$notification?.success({
        title: '成功',
        content: `${data.message}`,
        duration: 3000
      });
      showModal.value = false;
      emit('getSearch');
    } else {
      window.$notification?.error({
        title: '失败',
        content: `${data.message}`,
        duration: 3000
      });
    }
  });
};

defineExpose({
  openAdd,
  openUpdate
});
</script>

<style></style>
