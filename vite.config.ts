import Vue from '@vitejs/plugin-vue'
import AutoImportTypes from 'auto-import-types'
import { resolve } from 'path'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),
    // https://github.com/Allen-1998/auto-import-types
    AutoImportTypes({ dtsDir: 'src/types' }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'pinia',
        'vue-router',
        { '~/common/pinia-auto-refs': ['useStore'] },
        { '~/common/initSocket': ['useSocket'] },
        { '~/common/utils': ['useUtils'] },
      ],
      dts: 'src/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: 'readonly', // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      dts: 'src/components.d.ts',
      dirs: ['src/components'], // 按需加载的文件夹
      resolvers: [ElementPlusResolver()],
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
  ],
  resolve: { alias: { '~': resolve(__dirname, 'src') } },
  server: {
    port: 3000,
    open: true, //自动打开
    base: './ ', //生产环境路径
    hmr: true,
    proxy: {
      '/wx': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wx/, ''),
      },
    },
  },
  // 打包配置
  build: {
    target: 'modules', // 设置最终构建的浏览器兼容目标。modules:支持原生 ES 模块的浏览器
    outDir: 'dist', // 指定输出路径
    sourcemap: false, // 构建后是否生成 source map 文件
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    }, // 去除 console debugger
    rollupOptions: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return id.toString().split('node_modules/')[1].split('/')[0].toString()
        }
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    }, // 将打包后的资源分开
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/assets/css/global.less";',
      },
    },
  },
})
