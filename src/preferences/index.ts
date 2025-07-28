import type { Preferences } from './types';
import type { DeepPartial } from '@/typings';

import { preferencesManager } from './preferences';

// 偏好设置（带有层级关系）
const preferences: Preferences =
  preferencesManager.getPreferences.apply(preferencesManager);

// 更新偏好设置
const updatePreferences =
  preferencesManager.updatePreferences.bind(preferencesManager);

// 重置偏好设置
const resetPreferences =
  preferencesManager.resetPreferences.bind(preferencesManager);

const clearPreferencesCache =
  preferencesManager.clearCache.bind(preferencesManager);

// 初始化偏好设置
const initPreferences =
  preferencesManager.initPreferences.bind(preferencesManager);

/**
 * 如果你想所有的app都使用相同的默认偏好设置，你可以在这里定义
 * 而不是去修改 preferences 中的默认偏好设置
 * @param preferences
 * @returns
 */
function defineOverridesPreferences(preferences: DeepPartial<Preferences>) {
  return preferences;
}

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    // @ts-ignore - import.meta.env在Vite中可用
    name: import.meta.env.VITE_APP_TITLE,
  },
});

export {
  clearPreferencesCache,
  initPreferences,
  preferences,
  preferencesManager,
  resetPreferences,
  updatePreferences,
  defineOverridesPreferences
};

export * from './constants';
export type * from './types';
export * from './use-preferences';
