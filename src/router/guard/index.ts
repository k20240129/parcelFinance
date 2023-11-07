import type { Router } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { createPermissionGuard } from './permission';

/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 开始 loadingBar
    window.$loadingBar?.start();
    // 页面跳转权限处理
    await createPermissionGuard(to, from, next);
  });
  router.afterEach(to => {
    // 设置document title to.meta.title
    useTitle('包裹店');
    // 结束 loadingBar
    window.$loadingBar?.finish();
  });
}