import type { ZodRawShape } from 'zod';

import type { ComputedRef } from 'vue';

import type { ExtendedFormApi, FormActions, VbenFormProps } from './types';

import { computed, unref, useSlots } from 'vue';

import { createContext } from '@/components/shadcn-ui';
import { isString, mergeWithArrayOverride, set } from '@/utils';

import { useForm } from 'vee-validate';
import { object, ZodIntersection, ZodNumber, ZodObject, ZodString } from 'zod';
import { getDefaultsForSchema } from 'zod-defaults';

type ExtendFormProps = VbenFormProps & { formApi: ExtendedFormApi };

export const [injectFormProps, provideFormProps] =
  createContext<[ComputedRef<ExtendFormProps> | ExtendFormProps, FormActions]>(
    'VbenFormProps',
  );

export const [injectComponentRefMap, provideComponentRefMap] =
  createContext<Map<string, unknown>>('ComponentRefMap');

export function useFormInitial(
  props: ComputedRef<VbenFormProps> | VbenFormProps,
) {
  const slots = useSlots();
  const initialValues = generateInitialValues();

  const form = useForm({
    ...(Object.keys(initialValues)?.length ? { initialValues } : {}),
  });

  const delegatedSlots = computed(() => {
    const resultSlots: string[] = [];

    for (const key of Object.keys(slots)) {
      if (key !== 'default') {
        resultSlots.push(key);
      }
    }
    return resultSlots;
  });

  function generateInitialValues() {
    const initialValues: Record<string, any> = {};

    const zodObject: ZodRawShape = {};
    (unref(props).schema || []).forEach((item) => {
      if (Reflect.has(item, 'defaultValue')) {
        set(initialValues, item.fieldName, item.defaultValue);
      } else if (item.rules && !isString(item.rules)) {
        // 检查规则是否适合提取默认值
        const customDefaultValue = getCustomDefaultValue(item.rules);
        zodObject[item.fieldName] = item.rules;
        if (customDefaultValue !== undefined) {
          initialValues[item.fieldName] = customDefaultValue;
        }
      }
    });

    try {
      // 使用try-catch包裹，避免zod-defaults库的错误导致整个应用崩溃
      const schema = object(zodObject);
      if (Object.keys(zodObject).length > 0) {
        const schemaInitialValues = getDefaultsForSchema(schema);
        
        const zodDefaults: Record<string, any> = {};
        for (const key in schemaInitialValues) {
          set(zodDefaults, key, schemaInitialValues[key]);
        }
        return mergeWithArrayOverride(initialValues, zodDefaults);
      }
    } catch (error) {
      console.error('Error generating defaults from zod schema:', error);
    }
    
    return initialValues;
  }
  // 自定义默认值提取逻辑
  function getCustomDefaultValue(rule: any): any {
    if (!rule) return undefined;
    
    if (rule instanceof ZodString) {
      return ''; // 默认为空字符串
    } else if (rule instanceof ZodNumber) {
      return null; // 默认为 null（避免显示 0）
    } else if (rule instanceof ZodObject) {
      // 递归提取嵌套对象的默认值
      const defaultValues: Record<string, any> = {};
      for (const [key, valueSchema] of Object.entries(rule.shape)) {
        defaultValues[key] = getCustomDefaultValue(valueSchema);
      }
      return defaultValues;
    } else if (rule instanceof ZodIntersection) {
      // 对于交集类型，从schema 提取默认值
      try {
        const leftDefaultValue = getCustomDefaultValue(rule._def.left);
        const rightDefaultValue = getCustomDefaultValue(rule._def.right);

        // 如果左右两边都能提取默认值，合并它们
        if (
          typeof leftDefaultValue === 'object' &&
          typeof rightDefaultValue === 'object'
        ) {
          return { ...leftDefaultValue, ...rightDefaultValue };
        }

        // 否则优先使用左边的默认值
        return leftDefaultValue ?? rightDefaultValue;
      } catch (error) {
        console.error('Error processing ZodIntersection:', error);
        return undefined;
      }
    } else {
      return undefined; // 其他类型不提供默认值
    }
  }

  return {
    delegatedSlots,
    form,
  };
}
