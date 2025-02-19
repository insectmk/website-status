import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore 忽略ts检查
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(), //Vue
    eslintPlugin({
      // 启用 ESLint 插件
      cache: false, // 禁用缓存以实时检查
      include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'], // 指定需要检查的文件
      exclude: ['node_modules/**/*'], // 排除不需要检查的文件
    }),
    AutoImport({
      resolvers: [
        //Element-Plus自动导入
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          // 修改Icon组件前缀，不设置则默认为i,禁用则设置为false
          prefix: 'icon',
          // 指定collection，即指定为ElementPlus图标集ep
          enabledCollections: ['ep'],
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],
    }),
    Icons({
      // Icons图标自动下载
      autoInstall: true,
    }),
  ],
})
