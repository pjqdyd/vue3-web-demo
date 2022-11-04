import { defineConfig, UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv): UserConfigExport => {
  console.log(`当前环境mode=${mode}, command="${command}"`)
  const isBuild = command === 'build'
  return defineConfig({
    base: '/',
    plugins: [
      vue(),
      vueJsx({
        include: /\.(jsx|tsx)/
      }),
      viteMockServe({
        ignore: /^_/,
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        injectCode: `
          import { setupProdMockServer } from '../mock/_createProductionServer';
          setupProdMockServer();
        `
      }),
      viteCompression({
        disable: false, // 是否禁用压缩，默认为 false
        threshold: 10 * 1024, // 对大于 10 kb 的文件进行压缩
        // vue3 + gzip + nginx 部署
        // nginx配置 try_files $uri $uri/ index.html 请求的是123456.js，实际需要访问的是123456.js.gz
        // 所以重定向到html, 即静态文件被识别成text/html的问题 (所以要保留源文件，实际nginx还是会返回gz文件)
        deleteOriginFile: false //压缩后是否删除原文件，默认为 false
        // filter: '/.(js|mjs|json|css|html)$/i'// 过滤器，对哪些类型的文件进行压缩
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: `
          @import "@/styles/mixin.scss";
          @import "@/styles/variables.scss";
          `
        }
      }
    },
    server: {
      port: 8080,
      host: '0.0.0.0',
      proxy: {
        // 字符串简写写法
        '/sys': 'http://someapi.com/xxx',
        // 选项写法
        '/api': {
          target: 'http://someapi.com/xxx',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        // 正则表达式写法
        '^/fallback/.*': {
          target: 'http://someapi.com/xxx',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, '')
        }
        // 使用 proxy 实例
        // "/api": {
        //   target: "http://someapi.com/xxx",
        //   changeOrigin: true,
        //   configure: (proxy, options) => {
        //     // proxy 是 'http-proxy' 的实例
        //   },
        // },
      }
    },
    build: {
      sourcemap: false,
      outDir: 'dist',
      cssCodeSplit: false, // 禁用 CSS 代码拆分,将整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      brotliSize: false, // 关闭打包计算
      target: 'esnext',
      minify: 'esbuild', // 混淆器，terser构建后文件体积更小 ,esbuild
      //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
      assetsInlineLimit: 4096,
      assetsDir: 'static/img/', // 静态资源目录
      // rollup 打包配置
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      },
      // 压缩配置
      terserOptions: {
        compress: {
          drop_console: false, // 生产环境移除console
          drop_debugger: true // 生产环境移除debugger
        }
      }
    }
  })
}
