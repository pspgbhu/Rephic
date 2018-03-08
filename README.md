# React Isomorphic

基于 Koa 的 React 同构直出模板。支持 React-Router, Redux 以及 less。

## 环境要求

- Node >= 7.9
- PM2（用户生产环境）

## 安装

```
git clone https://github.com/pspgbhu/react-isomorphic.git
cd react-isomorphic
yarn install
```

## 运行

### 开发

```bash
npm run dev  # 启动 Node 服务，支持 Node, jsx, less 的热更新
```

开发阶段 webpack 会将静态资源打包至 `.dev` 文件夹下。在开发环境下，`/.dev` 和 `/public` 均为静态资源文件夹，且 `/.dev` 文件夹下的资源匹配的优先级更高。

而生产环境下，`/public` 将是唯一的静态资源文件夹

### 生产

```bash
npm run build   # 构建生产环境静态资源，将会更新 /public 文件下的资源
npm run prd     # 启动 pm2
```


## 目录结构

```bash
.
├── app.js                # 程序入口文件
├── bin
│   └── www               # 程序启动脚本
├── build                 # Webpack 配置
├── client                # Client Only Code
├── common                # 客户端和服务端共享代码, React 同构代码
│   ├── App.jsx           # React 入口文件
│   └── style             # 支持 less 样式
├── controllers           # Controllers
├── gulpfile.js           # Gulp 配置
├── middlewares           # Koa 中间件
├── public                # 静态资源文件
├── routes                # Koa 路由
├── utils                 # 工具函数
└── views                 # 页面模板文件
```

## Q&A

**1. 在本地运行，页面打开时会出现一瞬间的页面无样式**

在本地开发时，CSS 样式文件是打包在 JS 文件中的，待到 JS 执行时才将其插入进页面中。 在生产环境下，CSS 文件将会被单独打包出来，生产环境下不会出现这种情况。
