<script lang="ts" setup>
import type { LabelProps } from 'radix-vue';

import { cn } from '@/utils';

import { Label } from '../label';
import { useFormField } from './useFormField';

const props = defineProps<LabelProps & { class?: any }>();

const { formItemId } = useFormField();
</script>

<template>
  <Label :class="cn(props.class)" :for="formItemId">
    <slot></slot>
  </Label>
</template>
