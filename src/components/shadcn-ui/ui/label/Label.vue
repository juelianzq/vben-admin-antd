<script setup lang="ts">
import type { LabelProps } from 'radix-vue';

import { computed } from 'vue';

import { cn } from '@/utils';

import { Label } from 'radix-vue';

const props = defineProps<LabelProps & { class?: any }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <Label
    v-bind="delegatedProps"
    :class="
      cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        props.class,
      )
    "
  >
    <slot></slot>
  </Label>
</template>
