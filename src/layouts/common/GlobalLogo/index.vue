<template>
  <router-link :to="routeHomePath" class="flex-center w-full nowrap-hidden">
    <!-- <system-logo class="text-32px text-primary" /> -->
    <svg-icon local-icon="logo" style="font-size: 35px; color: #f00; margin-right: 5px" />
    <h2 v-show="showTitle" class="texttitle">
      {{ $t(title) }}
    </h2>
  </router-link>
</template>

<script setup lang="ts">
import { routePath } from '@/router';
import { useAppInfo } from '@/composables';

defineOptions({ name: 'GlobalLogo' });

interface Props {
  /** 显示名字 */
  showTitle: boolean;
}

defineProps<Props>();

const routeHomePath = routePath('root');

const { title } = useAppInfo();
</script>

<style scoped>
.texttitle {
  height: 16px;
  font-family: PingFang SC;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  margin-left: 8px;
}
</style>
