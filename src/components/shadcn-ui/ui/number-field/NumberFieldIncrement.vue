<script setup lang="ts">
import type { NumberFieldIncrementProps } from 'radix-vue';

import { computed } from 'vue';

import { cn } from '@/utils';

import { Plus } from 'lucide-vue-next';
import { NumberFieldIncrement, useForwardProps } from 'radix-vue';

const props = defineProps<NumberFieldIncrementProps & { class?: any }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <NumberFieldIncrement
    data-slot="increment"
    v-bind="forwarded"
    :class="
      cn(
        'absolute right-0 top-1/2 -translate-y-1/2 p-3 disabled:cursor-not-allowed disabled:opacity-20',
        props.class,
      )
    "
  >
    <slot>
      <Plus class="h-4 w-4" />
    </slot>
  </NumberFieldIncrement>
</template>
