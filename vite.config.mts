import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';
import viteVue from '@vitejs/plugin-vue';
import viteVueJsx from '@vitejs/plugin-vue-jsx';
import viteVueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import { createHtmlPlugin as viteHtmlPlugin } from 'vite-plugin-html';
import viteVueDevTools from 'vite-plugin-vue-devtools';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import fs from 'node:fs/promises';
import dotenv from 'dotenv';

// 环境变量处理辅助函数
const getBoolean = (value: string | undefined) => value === 'true';
const getString = (value: string | undefined, fallback: string) => value ?? fallback;
const getNumber = (value: string | undefined, fallback: number) => Number(value) || fallback;

/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script as string;
  const reg = /--mode ([\d_a-z]+)/;
  const result = reg.exec(script);
  let mode = 'production';
  if (result) {
    mode = result[1] as string;
  }
  return ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`];
}

/**
 * 加载环境变量
 */
async function loadEnv<T = Record<string, string>>(
  match = 'VITE_GLOB_',
  confFiles = getConfFiles(),
): Promise<T> {
  let envConfig = {};

  for (const confFile of confFiles) {
    try {
      const confFilePath = join(process.cwd(), confFile);
      if (existsSync(confFilePath)) {
        const envPath = await fs.readFile(confFilePath, { encoding: 'utf8' });
        const env = dotenv.parse(envPath);
        envConfig = { ...envConfig, ...env };
      }
    } catch (error) {
      console.error(`Error while parsing ${confFile}`, error);
    }
  }
  
  const reg = new RegExp(`^(${match})`);
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  
  return envConfig as T;
}

/**
 * 加载并转换环境变量
 */
async function loadAndConvertEnv(match = 'VITE_', confFiles = getConfFiles()) {
  const envConfig = await loadEnv(match, confFiles);

  const {
    VITE_APP_TITLE,
    VITE_BASE,
    VITE_PORT,
    VITE_DEVTOOLS,
  } = envConfig;

  return {
    appTitle: getString(VITE_APP_TITLE, 'Vben Admin'),
    base: getString(VITE_BASE, '/'),
    port: getNumber(VITE_PORT, 5173),
    devtools: getBoolean(VITE_DEVTOOLS),
  };
}

export default defineConfig(async (): Promise<UserConfig> => {
  // 加载环境变量
  const { base, port, devtools } = await loadAndConvertEnv();
  
  return {
    base,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@-core/icons': resolve(__dirname, 'src/components/icons'),
        '@/shared/utils': resolve(__dirname, 'src/utils'),
      },
    },
    plugins: [
      // Vue 插件
      viteVue({
        script: {
          defineModel: true,
        },
      }),
      viteVueJsx(),
      
      // 开发工具
      devtools ? viteVueDevTools() : null,
      
      // i18n 插件
      viteVueI18nPlugin({
        compositionOnly: true,
        fullInstall: true,
        runtimeOnly: true,
      }),
      
      // HTML 插件
      viteHtmlPlugin({ minify: true }),
    ],
    server: {
      host: true,
      port,
      proxy: {
        '/api': {
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
          target: 'http://localhost:5320/api',
          ws: true,
        },
      },
      warmup: {
        // 预热文件
        clientFiles: [
          './index.html',
          './src/bootstrap.ts',
          './src/{views,layouts,router,store,api,adapter}/*',
        ],
      },
    },
    build: {
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false,
      sourcemap: false,
      rollupOptions: {
        output: {
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'jse/index-[name]-[hash].js',
        },
      },
      target: 'es2015',
    },
    esbuild: {
      drop: ['debugger'],
      legalComments: 'none',
    },
  };
}); 