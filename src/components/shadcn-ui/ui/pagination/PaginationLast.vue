<script setup lang="ts">
import type { PaginationLastProps } from 'radix-vue';

import { computed } from 'vue';

import { cn } from '@/utils';

import { ChevronsRight } from 'lucide-vue-next';
import { PaginationLast } from 'radix-vue';

import { Button } from '../button';

const props = withDefaults(
  defineProps<PaginationLastProps & { class?: any }>(),
  {
    asChild: true,
  },
);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <PaginationLast v-bind="delegatedProps">
    <Button :class="cn('size-8 p-0', props.class)" variant="outline">
      <slot>
        <ChevronsRight class="size-4" />
      </slot>
    </Button>
  </PaginationLast>
</template>
