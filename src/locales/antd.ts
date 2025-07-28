import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';

// 支持的语言
const antdLocales = {
  'en-US': enUS,
  'zh-CN': zhCN,
};

// 默认使用中文
export const antdLocale = antdLocales['zh-CN'];

export function getAntdLocale(locale: string) {
  return antdLocales[locale] || antdLocales['zh-CN'];
} 