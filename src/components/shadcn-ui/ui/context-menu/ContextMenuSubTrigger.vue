<script setup lang="ts">
import type { ContextMenuSubTriggerProps } from 'radix-vue';

import { computed } from 'vue';

import { cn } from '@/utils';

import { ChevronRight } from 'lucide-vue-next';
import { ContextMenuSubTrigger, useForwardProps } from 'radix-vue';

const props = defineProps<
  ContextMenuSubTriggerProps & {
    class?: any;
    inset?: boolean;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <ContextMenuSubTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        inset && 'pl-8',
        props.class,
      )
    "
  >
    <slot></slot>
    <ChevronRight class="ml-auto h-4 w-4" />
  </ContextMenuSubTrigger>
</template>
