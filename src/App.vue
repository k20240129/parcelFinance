<template>
  <el-config-provider :locale="lang">
    <n-config-provider :theme="theme.naiveTheme" :theme-overrides="theme.naiveThemeOverrides" :locale="nactiveLang"
      :date-locale="nactiveLangTime" class="h-full">
      <naive-provider>
        <n-message-provider>
          <router-view :key="$route.fullPath" />
        </n-message-provider>
      </naive-provider>
    </n-config-provider>
  </el-config-provider>
  <loginShow ref="loginShowRef" />
</template>

<script setup lang="ts">
import loginShow from '@/components/loginShow/loginShow.vue';
import { computed } from 'vue';
import { create, dateZhCN, zhCN, ruRU, dateRuRU } from 'naive-ui';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import ru from 'element-plus/dist/locale/ru.mjs';
import kk from 'element-plus/dist/locale/kk.mjs';
import { useAppStore, subscribeStore, useThemeStore } from '@/store';
const app = useAppStore();
import { useGlobalEvents } from '@/composables';
const theme = useThemeStore();
const lang = computed(() => {
  const obj = {
    0: zhCn,
    1: ru
  };
  return obj[app.lang];
});
const nactiveLang = computed(() => {
  const obj = {
    0: zhCN,
    1: ruRU
  };
  return obj[app.lang];
});
const nactiveLangTime = computed(() => {
  const obj = {
    0: dateZhCN,
    1: dateRuRU
  };
  return obj[app.lang];
});
subscribeStore();
useGlobalEvents();
</script>

<style scoped></style>
