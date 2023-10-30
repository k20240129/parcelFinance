import { useEventListener } from '@vueuse/core';
import { useTabStore, useThemeStore, useAppStore } from '@/store';
/** 全局事件 */
export function useGlobalEvents() {
  const app = useAppStore();
  const theme = useThemeStore();
  const tab = useTabStore();

  /** 页面离开时缓存多页签数据 */
  useEventListener(window, 'beforeunload', () => {
    theme.cacheThemeSettings();
    tab.cacheTabRoutes();
  });
  // 语言初始化
  const obj = {
    zh: 0,
    rs: 1,
    kh: 2
  };

  app.langChange(obj[localStorage.getItem('lang') || 'zh']);
}
