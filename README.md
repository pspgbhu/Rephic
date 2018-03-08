# React isomorphic

React 同构直出。

Koa2 + React + React-Router + Redux + Webpack + Gulp + less

## 目录结构

```bash
.
├── app.js                # Node 程序主入口
├── bin                   # Node 运行脚本
│   └── www
├── build                 # webpack 构建配置
│   ├── webpack.base.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── client                # React 同构代码
│   ├── App.jsx
│   ├── Home.jsx
│   ├── index.jsx
│   ├── router.jsx        # 客户端路由文件（请在 routes.jsx 中写路由逻辑）
│   ├── routes.jsx        # 页面路由，前后端公用此路由文件
│   └── style             # 样式文件
│       └── style.less
├── gulpfile.js           # Gulp 配置文件
├── package.json
├── public                # 打包出的生产环境静态资源
│   ├── css
│   │   └── style.css
│   └── js
│       └── app.js
├── routes                # 服务端路由
│   └── index.jsx
├── views                 # 页面模板文件
│   ├── error.ejs
│   └── index.ejs
└── yarn.lock
```

## 开发

```bash
npm run dev  # 启动 Node 服务，支持 Node 和 jsx 的热更新
```

开发阶段 webpack 会将静态资源打包至 `.dev` 文件夹下。在开发环境下，`/.dev` 和 `/public` 均为静态资源文件夹，且 `/.dev` 文件夹下的资源匹配的优先级更高。

生产环境下，`/public` 将是唯一的静态资源文件夹。


## 构建

```bash
npm run build   # 构建生产环境静态资源
```
编译 jsx 和 less 到 `/public` 文件夹下。


# Todo

- [ ] Working with Redux.
