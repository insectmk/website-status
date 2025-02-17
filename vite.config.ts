import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore 忽略ts检查
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(), //Vue
    eslintPlugin({
      // 启用 ESLint 插件
      cache: false, // 禁用缓存以实时检查
      include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'], // 指定需要检查的文件
      exclude: ['node_modules/**/*'] // 排除不需要检查的文件
    }),
    AutoImport({
      //Element-Plus自动导入
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      //Element-Plus自动导入
      resolvers: [ElementPlusResolver()]
    })
  ]
})
