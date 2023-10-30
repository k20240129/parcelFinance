<template>
  <h3 class="text-18px text-primary font-medium">{{ $t('login.change_password') }}</h3>
  <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item path="parcelShopCode">
      <n-input v-model:value="model.parcelShopCode" :placeholder="$t('packageShopMessage.packageCode')" />
    </n-form-item>
    <n-form-item path="pastPassword">
      <n-input
        v-model:value="model.pastPassword"
        type="password"
        show-password-on="click"
        :placeholder="$t('packageShopMessage.oldPassword')"
      />
    </n-form-item>
    <n-form-item path="parcelPassWord">
      <n-input
        v-model:value="model.parcelPassWord"
        type="password"
        show-password-on="click"
        :placeholder="$t('packageShopMessage.newPassword')"
      />
    </n-form-item>
    <n-form-item path="ParcelConfirmPassWord">
      <n-input
        v-model:value="model.ParcelConfirmPassWord"
        type="password"
        show-password-on="click"
        :placeholder="$t('packageShopMessage.confirmPassword')"
      />
    </n-form-item>
    <n-space :vertical="true" size="large">
      <n-button type="primary" size="large" :block="true" :round="true" @click="handleSubmit">{{
        $t('btnLang.confirm')
      }}</n-button>
      <n-button size="large" :block="true" :round="true" @click="toLoginModule('pwd-login')">{{
        $t('packageShopMessage.return')
      }}</n-button>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue';
import type { FormInst, FormRules } from 'naive-ui';
import { UpdateParcelShopPassword } from '@/service';
import { useRouterPush } from '@/composables';
import { useSmsCode } from '@/hooks';
import { formRules, getConfirmPwdRule } from '@/utils';

const { toLoginModule } = useRouterPush();
const { label, isCounting, loading: smsLoading, start } = useSmsCode();

const formRef = ref<HTMLElement & FormInst>();

const model = reactive({
  parcelShopCode: '',
  parcelPassWord: '',
  ParcelConfirmPassWord: '',
  pastPassword: ''
});

const rules: FormRules = {
  parcelShopCode: formRules.phone,
  parcelPassWord: formRules.pwd,
  ParcelConfirmPassWord: getConfirmPwdRule(toRefs(model).parcelPassWord),
  pastPassword: formRules.pwd
};

function handleSmsCode() {
  start();
}

async function handleSubmit() {
  await formRef.value?.validate();
  const { data } = await UpdateParcelShopPassword({
    ...model
  });
  if (data.code === 200) {
    window.$message?.success('修改成功!');
    Object.assign(model, {
      parcelShopCode: '',
      parcelPassWord: '',
      ParcelConfirmPassWord: '',
      pastPassword: ''
    });
    toLoginModule('pwd-login');
  } else {
    window.$message?.error(data.message);
  }
}
</script>

<style scoped></style>
