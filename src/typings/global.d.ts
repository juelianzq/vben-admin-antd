import type { RouteMeta as IRouteMeta } from '@/typings';

import 'vue-router';

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RouteMeta extends IRouteMeta {}
}

export interface VbenAdminProAppConfigRaw {
  VITE_GLOB_API_URL: string;
}

export interface ApplicationConfig {
  apiURL: string;
}

declare global {
  interface Window {
    _VBEN_ADMIN_PRO_APP_CONF_: VbenAdminProAppConfigRaw;
  }
}

// 添加 import.meta 的类型声明
interface ImportMetaEnv {
  VITE_APP_VERSION: string;
  VITE_APP_NAMESPACE: string;
  VITE_APP_STORE_SECURE_KEY: string;
  VITE_BASE: string;
  VITE_ROUTER_HISTORY: string;
  DEV: boolean;
  PROD: boolean;
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly hot: {
    readonly data: any;
    accept(): void;
    accept(cb: (mod: any) => void): void;
    accept(dep: string, cb: (mod: any) => void): void;
    accept(deps: readonly string[], cb: (mods: any[]) => void): void;
    dispose(cb: (data: any) => void): void;
    decline(): void;
    invalidate(): void;
    on(event: string, cb: (...args: any[]) => void): void;
  };
  glob(pattern: string, options?: { eager?: boolean }): Record<string, any>;
}
