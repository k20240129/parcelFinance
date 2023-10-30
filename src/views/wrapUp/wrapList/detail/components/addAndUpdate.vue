<template>
  <div>
    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" :title="title">
      <n-form ref="formRef" label-width="140" label-placement="left" :model="formData" :size="size">
        <n-form-item
          label="包裹店联系人名称"
          path="parcelShopLinkName"
          :rule="[formItemRule('请填写包裹店联系人名称', ['blur', 'change'])]"
          style="width: 100%"
        >
          <n-input
            v-model:value="formData.parcelShopLinkName"
            clearable
            style="width: 100%"
            type="text"
            placeholder="包裹店联系人名称"
          />
        </n-form-item>
        <n-form-item
          label="包裹店联系人电话"
          path="parcelShopLinkPhone"
          :rule="[formItemRule('请填写包裹店联系人电话', ['blur', 'change'])]"
          style="width: 100%"
        >
          <n-input
            v-model:value="formData.parcelShopLinkPhone"
            style="width: 100%"
            placeholder="包裹店联系人电话"
            clearable
          />
        </n-form-item>
        <n-form-item
          label="包裹店联系人邮箱"
          path="parcelShopLinkEmail"
          :rule="[formItemRule('请填写包裹店联系人邮箱', ['blur', 'change'])]"
          style="width: 100%"
        >
          <n-input
            v-model:value="formData.parcelShopLinkEmail"
            style="width: 100%"
            placeholder="包裹店联系人邮箱"
            clearable
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
import { useRoute, useRouter } from 'vue-router';
import { AddAndUpdateParcelShopLinkEntity } from '@/service';
import useMousePosition from '@/hooks/common/validation';
const emit = defineEmits(['getSearch']);
const route = useRoute();
const router = useRouter();
// hooks
const { formItemRule } = useMousePosition();
const showModal = ref(false);
const formRef = ref<any>(null);
// 表单参数
const formData = reactive({
  parcelShopLinkName: '',
  parcelShopLinkPhone: '',
  parcelShopLinkEmail: '',
  id: undefined
});
const title = ref('新增联系人');
// 对话框打开函数
const openAdd = () => {
  title.value = '新增联系人';
  showModal.value = true;
  Object.assign(formData, {
    parcelShopLinkName: '',
    parcelShopLinkPhone: '',
    parcelShopLinkEmail: '',
    id: undefined
  });
};
// 对话框编辑打开
const openUpdate = data => {
  title.value = '修改联系人';

  Object.assign(
    formData,
    (({ parcelShopLinkName, parcelShopLinkPhone, parcelShopLinkEmail, id }) => ({
      parcelShopLinkName,
      parcelShopLinkPhone,
      parcelShopLinkEmail,
      id
    }))(data)
  );

  showModal.value = true;
};
defineExpose({
  openAdd,
  openUpdate
});
// 保存
const submitCallback = () => {
  formRef.value?.validate(async error => {
    if (error) return;
    const { data } = await AddAndUpdateParcelShopLinkEntity({
      ...formData,
      parcelShopId: route.query.id,
      parcelShopName: route.query.parcelShopName
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
</script>

<style></style>
