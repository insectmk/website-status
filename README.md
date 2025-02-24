# website-status

网站状态监控，基于[UptimeRobot接口](https://uptimerobot.com/api/)制作。
本项目为纯前端项目，使用`vite`+`typescript`+`vue3`+`Element-Plus`。

## 介绍

### 关于项目目录

```tex
my-vite-project/
├── public/
├── src/
│   ├── api/                 # API 请求封装
│   ├── assets/				 # 静态资源文件
│   ├── components/			 # 组件
│   ├── config/			     # 配置文件
│   ├── constants/           # 常量配置
│   ├── router/			     # 路由（可不用的，先加上了）
│   ├── store/			     # 全局消息管理（暂未使用）
│   ├── types/               # TypeScript 类型定义
│   ├── utils/				 # 工具
│   ├── views/               # 页面组件（与 pages/ 类似）
│   ├── App.vue
│   └── main.ts
├── .prettierrc.js			 # prettier代码美化
├── .gitignore				 # git忽略文件
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

### 页面

![image-20250222120016330](./README.assets/image-20250222120016330.png)

## 命令

### ESLint

对语法检测、限制和修复

```bash
# 语法检测
npx eslint yourfile.js
```

### Prettier

代码格式化插件

```bash
# 格式检查
npx prettier . --check
# 格式化并写入
npx prettier . --write
```

## 其他

### 提交规范

**提交信息**

```tex
<类型>(<范围>): <简短描述>

<详细描述>

<关联的任务或问题>
```

**示例**

```tex
feat(auth): 添加用户登录功能

实现了用户登录功能，包括邮箱和密码验证。优化了登录页面的用户体验。

Closes #123
```

**提交类型**：参考[如何管理NPM 包版本号？使用standard-version进行版本控制和发布（全网最全教程）nolan出版](https://blog.csdn.net/weixin_45644335/article/details/137708366)

```tex
{
  "header": "变更日志", // 可自定义添加生成的changelog头部内容
  "types": [
    { "type": "feat", "section": "✨ Features | 新功能" },
    { "type": "fix", "section": "🐛 Bug Fixes | Bug 修复" },
    { "type": "init", "section": "🎉 Init | 初始化" },
    { "type": "docs", "section": "✏️ Documentation | 文档" },
    { "type": "style", "section": "💄 Styles | 风格" },
    { "type": "refactor", "section": "♻️ Code Refactoring | 代码重构" },
    { "type": "perf", "section": "⚡ Performance Improvements | 性能优化" },
    { "type": "test", "section": "✅ Tests | 测试" },
    { "type": "revert", "section": "⏪ Revert | 回退" },
    { "type": "build", "section": "📦 Build System | 打包构建" },
    { "type": "update", "section": "🚀 update | 构建/工程依赖/工具升级" },
    { "type": "tool", "section": "🚀 tool | 工具升级" },
    { "type": "ci", "section": "👷 Continuous Integration | CI 配置" },
    { "type": "chore", "section": "🧹 Chore | 其他杂项" }
  ],
  // 跳过相关内容
  "skip": {
    "bump": false, // 是否跳过更改版本
    "changelog": false, // 是否跳过生产changelog
    "commit": false, // 是否跳过自动commit
    "tag": false // 是否跳过打tag
  }
}
```



### 第三方包

记录部分第三方包的使用

#### standard-version

**自动升级版本、打tag、生成changelog**

```bash
npm i --save-dev standard-version
```

`package.json`添加脚本：

```json
  "scripts": {
    "release": "standard-version",
    "release-major": "standard-version --release-as major",
    "release-minor": "standard-version --release-as minor",
    "release-patch": "standard-version --release-as patch",
    "release-static": "standard-version --release-as 3.3.3",
  },
```

项目根目录添加`.versionrc`文件以记录自定义提交类型（需要去掉注释！）：

```json
{
  "header": "变更日志", // 可自定义添加生成的changelog头部内容
  "types": [
    { "type": "feat", "section": "✨ Features | 新功能" },
    { "type": "fix", "section": "🐛 Bug Fixes | Bug 修复" },
    { "type": "init", "section": "🎉 Init | 初始化" },
    { "type": "docs", "section": "✏️ Documentation | 文档" },
    { "type": "style", "section": "💄 Styles | 风格" },
    { "type": "refactor", "section": "♻️ Code Refactoring | 代码重构" },
    { "type": "perf", "section": "⚡ Performance Improvements | 性能优化" },
    { "type": "test", "section": "✅ Tests | 测试" },
    { "type": "revert", "section": "⏪ Revert | 回退" },
    { "type": "build", "section": "📦 Build System | 打包构建" },
    { "type": "update", "section": "🚀 update | 构建/工程依赖/工具升级" },
    { "type": "tool", "section": "🚀 tool | 工具升级" },
    { "type": "ci", "section": "👷 Continuous Integration | CI 配置" }
  ],
  // 跳过相关内容
  "skip": {
    "bump": false, // 是否跳过更改版本
    "changelog": false, // 是否跳过生产changelog
    "commit": false, // 是否跳过自动commit
    "tag": false // 是否跳过打tag
  }
}
```

执行`npm run release`，即可自动发布

## 参考文档

### 官方

[Vite官方中文文档](https://vitejs.cn/vite3-cn/)

[ESLint官方中文文档](https://zh-hans.eslint.org/docs/latest/use/getting-started)

[Prettier官方文档](https://prettier.io/docs/install)

[Vue Router| Vue.js 的官方路由](https://router.vuejs.org/zh/)

[Element-Plus | 基于 Vue 3，面向设计师和开发者的组件库](https://element-plus.org/zh-CN/)

[Axios 是一个基于 promise 的网络请求库，可以用于浏览器和 node.js](https://www.axios-http.cn/)

[UptimeRobot接口文档](https://uptimerobot.com/api/)

[Pinia符合直觉的 Vue.js 状态管理库](https://pinia.vuejs.org/zh/)

### 博客

[Element Plus 实现Icon图标的自动导入](https://www.cnblogs.com/fuct/p/17533365.html)

[如何管理NPM 包版本号？使用standard-version进行版本控制和发布（全网最全教程）nolan出版](https://blog.csdn.net/weixin_45644335/article/details/137708366)
