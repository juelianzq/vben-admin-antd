<script setup lang="ts">
import type { MenuRecordRaw } from '@/typings';

import { computed } from 'vue';

import { MenuBadge, MenuItem, SubMenu as SubMenuComp } from './components';
// 递归导入自己用于处理嵌套菜单
// eslint-disable-next-line import/no-self-import
import SubMenuWrapper from './sub-menu.vue';

interface Props {
  /**
   * 菜单项
   */
  menu: MenuRecordRaw;
}

defineOptions({
  name: 'SubMenuUi',
});

const props = withDefaults(defineProps<Props>(), {});



/**
 * 判断是否有子节点，动态渲染 menu-item/sub-menu-item
 */
const hasChildren = computed(() => {
  const { menu } = props;
  return (
    Reflect.has(menu, 'children') && !!menu.children && menu.children.length > 0
  );
});
</script>

<template>
  <MenuItem
    v-if="!hasChildren"
    :key="menu.path"
    :active-icon="menu.activeIcon"
    :badge="menu.badge"
    :badge-type="menu.badgeType"
    :badge-variants="menu.badgeVariants"
    :icon="menu.icon"
    :path="menu.path || ''"
    :disabled="menu.disabled || false"
  >
    <template #title>
      <span>{{ menu.name }}</span>
    </template>
  </MenuItem>
  <SubMenuComp
    v-else
    :key="`${menu.path}_sub`"
    :active-icon="menu.activeIcon"
    :badge="menu.badge"
    :badge-type="menu.badgeType"
    :badge-variants="menu.badgeVariants"
    :icon="menu.icon"
    :path="menu.path"
    :disabled="menu.disabled || false"
  >
    <template #content>
      <MenuBadge
        :badge="menu.badge"
        :badge-type="menu.badgeType"
        :badge-variants="menu.badgeVariants"
        class="right-6"
      />
    </template>
    <template #title>
      <span>{{ menu.name }}</span>
    </template>
    <template v-for="childItem in menu.children || []" :key="childItem.path">
      <!-- 递归渲染子菜单 -->
      <SubMenuWrapper :menu="childItem" />
    </template>
  </SubMenuComp>
</template>
