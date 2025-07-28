import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import { resetStaticRoutes } from '@/utils';

import { createRouterGuard } from './guard';
import { routes } from './routes';
console.log(routes);

/**
 *  @zh_CN 创建vue-router实例
 */
const router = createRouter({
  history:
    (import.meta as any).env.VITE_ROUTER_HISTORY === 'hash'
      ? createWebHashHistory((import.meta as any).env.VITE_BASE)
      : createWebHistory((import.meta as any).env.VITE_BASE),
  // 应该添加到路由的初始路由列表。
  routes,
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 };
  },
  // 是否应该禁止尾部斜杠。
  // strict: true,
});
// const resetRoutes = () => resetStaticRoutes(router, routes); 
// 创建路由守卫
createRouterGuard(router);
export {  router };
