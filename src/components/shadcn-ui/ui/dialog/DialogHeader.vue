<script setup lang="ts">
import { cn } from '@/utils';

const props = defineProps<{
  class?: any;
}>();
</script>

<template>
  <div
    :class="cn('flex flex-col gap-y-1.5 text-center sm:text-left', props.class)"
  >
    <slot></slot>
  </div>
</template>
