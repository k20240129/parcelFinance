<template>
  <div>
    <n-modal v-model:show="showModal" :closable="false" :close-on-esc="false" :mask-closable="false" :show-icon="false"
      preset="dialog" :title="title">
      <n-form ref="formRef" label-width="140" label-placement="left" :model="formData" :size="size">
        <n-form-item :label="$t('packageShopMessage.packageCode')" path="parcelShopCode"
          :rule="[formItemRule(`${$t('packageShopMessage.packageCode')}`, ['blur', 'change'])]" style="width: 100%">
          <n-input v-model:value="formData.parcelShopCode" disabled autocomplete="new-password" clearable
            style="width: 100%" type="text" :placeholder="$t('packageShopMessage.packageCode')" />
        </n-form-item>
        <n-form-item :label="$t('packageShopMessage.packagePasswords')" path="parcelPassWord"
          :rule="[formItemRule(`${$t('packageShopMessage.packagePasswords')}`, ['blur', 'change'])]" style="width: 100%">
          <n-input v-model:value="formData.parcelPassWord" autocomplete="new-password" clearable style="width: 100%"
            type="password" :placeholder="$t('packageShopMessage.packagePasswords')" />
        </n-form-item>
        <n-form-item :label="$t('packageShopMessage.confirmPassword')" path="parcelConfirmPassWord"
          :rule="[formItemRule(`${$t('packageShopMessage.confirmPassword')}`, ['blur', 'change'])]" style="width: 100%">
          <n-input v-model:value="formData.parcelConfirmPassWord" clearable style="width: 100%" type="password"
            :placeholder="$t('packageShopMessage.confirmPassword')" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-button type="success" @click="submitCallback"> {{ $t('btnLang.confirm') }} </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { UpdateParcelShopPassword } from '@/service';
import { localStg } from '@/utils';
import useMousePosition from '@/hooks/common/validation';
const { t } = useI18n();
const emit = defineEmits(['getSearch']);
const props = defineProps({
  formData: {
    type: Object,
    default: () => { }
  }
});
const Router = useRouter();
// hooks
const { formItemRule } = useMousePosition();
const showModal = ref(false);
const formRef = ref<any>(null);
// 表单参数
const formData = reactive({
  parcelShopCode: '',
  parcelPassWord: '',
  parcelConfirmPassWord: ''
});
const title = ref('');

// 对话框编辑打开
// const openUpdate = () => {
//   title.value = t('login.changeFirstLogin');
//   Object.assign(formData, {
//     parcelShopCode: '',
//     parcelPassWord: '',
//     parcelConfirmPassWord: ''
//   });
//   formData.parcelShopCode = localStg.get('userInfo')?.parcelShopCode as any;
//   showModal.value = true;
// };
// Router.afterEach(() => {
//   if (localStg.get('passWord') === '123456') {
//     openUpdate();
//   }
// });

onMounted(() => { });
// 保存
const submitCallback = () => {
  formRef.value?.validate(async error => {
    if (error) return;
    const { data } = await UpdateParcelShopPassword({
      ...formData
    });
    if (data.code === 200) {
      window.$notification?.success({
        title: t('btnLang.success'),
        content: `${data.message}`,
        duration: 3000
      });
      localStg.set('passWord', formData.parcelPassWord);
      showModal.value = false;
    } else {
      window.$notification?.error({
        title: t('btnLang.error'),
        content: `${data.message}`,
        duration: 3000
      });
    }
  });
};
</script>

<style></style>
