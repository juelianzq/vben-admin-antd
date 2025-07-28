import type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
} from '@/typings';

import { generateAccessible } from '@/access';
import { preferences } from '@/preferences/index';

import { message } from 'ant-design-vue';

import { getAllMenusApi } from '@/api';
import { BasicLayout, IFrameView } from '@/layouts';
import { $t } from '@/locales';



const forbiddenComponent = () => import('@/views/_core/fallback/forbidden.vue');
async function generateAccess(options: GenerateMenuAndRoutesOptions) {
  const pageMap: ComponentRecordType = (import.meta as any).glob('../views/**/*.vue');

  const layoutMap: ComponentRecordType = {
    BasicLayout,
    IFrameView,
  };

  return await generateAccessible(preferences.app.accessMode, {
    ...options,
    fetchMenuListAsync: async () => {
      message.loading({
        content: `${$t('common.loadingMenu')}...`,
        duration: 1.5,
      });
      try {
        return await getAllMenusApi();
      } catch (error) {
        console.error('Failed to fetch menu data, using fallback:', error);
        // 临时菜单数据作为后备
        return [
          {
            meta: {
              order: -1,
              title: 'page.dashboard.title',
            },
            name: 'Dashboard',
            path: '/dashboard',
            component: 'BasicLayout',
            redirect: '/analytics',
            children: [
              {
                name: 'Analytics',
                path: '/analytics',
                component: '/dashboard/analytics/index',
                meta: {
                  affixTab: true,
                  title: 'page.dashboard.analytics',
                },
              },
              {
                name: 'Workspace',
                path: '/workspace',
                component: '/dashboard/workspace/index',
                meta: {
                  title: 'page.dashboard.workspace',
                },
              },
            ],
          },
        ] as any;
      }
    },
    // 可以指定没有权限跳转403页面
    forbiddenComponent,
    // 如果 route.meta.menuVisibleWithForbidden = true
    layoutMap,
    pageMap,
  });
}
export { generateAccess };
