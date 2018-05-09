<a id="markdown-rephic" name="rephic"></a>
# Rephic

Rephic 是一个基于 Koa 的 React 服务端渲染模板。支持 React-Router, Redux 以及 Less, Sass。

<a id="markdown-目录" name="目录"></a>
## 目录

<!-- TOC -->

- [Rephic](#rephic)
  - [目录](#目录)
  - [环境要求](#环境要求)
  - [安装](#安装)
  - [模板目录结构](#模板目录结构)
  - [运行](#运行)
    - [开发环境下运行](#开发环境下运行)
    - [生产环境下运行](#生产环境下运行)
  - [开发注意事项](#开发注意事项)
    - [1. React 在服务端的生命周期和客户端的不同](#1-react-在服务端的生命周期和客户端的不同)
    - [2. Node 环境中是不具备 DOM 和 BOM 相关API](#2-node-环境中是不具备-dom-和-bom-相关api)
    - [3. 生产环境和开发环境下的静态文件来源的不同](#3-生产环境和开发环境下的静态文件来源的不同)
  - [开发帮助](#开发帮助)
    - [我该怎么在该脚手架的基础上继续开发页面？](#我该怎么在该脚手架的基础上继续开发页面)
    - [如何正确的引入样式文件?](#如何正确的引入样式文件)
    - [我想新增几个页面](#我想新增几个页面)
    - [Nodemon 使用技巧](#nodemon-使用技巧)
  - [Q&A](#qa)
    - [1. 在开发环境下运行，页面打开时会出现一瞬间的页面无样式](#1-在开发环境下运行页面打开时会出现一瞬间的页面无样式)
    - [2. 报错 'window is not defined' 或 'document is not defined'](#2-报错-window-is-not-defined-或-document-is-not-defined)
    - [3. 暂不支持文件修改后自动刷新页面](#3-暂不支持文件修改后自动刷新页面)

<!-- /TOC -->

<a id="markdown-环境要求" name="环境要求"></a>
## 环境要求

- Node.js >= 7.9
- PM2（用户生产环境）

<a id="markdown-安装" name="安装"></a>
## 安装

你可以通过 [smarter](https://github.com/jd-smart-fe/smarter) 脚手架生成工具来安装该模板：

```bash
$ sudo npm i -g smarter                     # 全局安装 smarter
$ smarter create rephic project             # 生成项目到 project 目录下
$ cd project
$ npm i                                     # 使用 npm 来安装项目依赖
```

或者直接 clone 该项目：

```bash
$ git clone https://github.com/pspgbhu/rephic.git
$ cd rephic
$ rm -rf .git && git init                   # 重新初始化 git 仓库
$ npm i
```

<a id="markdown-模板目录结构" name="模板目录结构"></a>
## 模板目录结构

```bash
.
├── bin                   # 项目脚本文件
├── build                 # Webpack 配置
├── client                # 客户端专用代码
├── common                # 前端后端同构代码
│   └── App.jsx           # 一定要将 App.jsx 作为整个 common 文件夹的入口文件
└── server                # 服务端专用代码
    ├── app.js            # Node 服务入口文件
    ├── controllers       # controller 层
    ├── middlewares       # 中间件
    ├── public            # 静态资源
    ├── routes            # 路由
    │   ├── api           # API 路由
    │   ├── index.js      # 全部路由的入口文件
    │   └── views         # 页面路由
    ├── utils             # 工具函数
    └── views             # ejs 渲染模板
```


<a id="markdown-运行" name="运行"></a>
## 运行

<a id="markdown-开发环境下运行" name="开发环境下运行"></a>
### 开发环境下运行

```bash
npm run dev  # 启动 Node 服务，支持 Node, jsx, less 的热更新
```

开发阶段 webpack 会将静态资源打包至 `.dev` 文件夹下。在开发环境下，`/.dev` 和 `/server/public` 均为静态资源文件夹，且 `/.dev` 文件夹下的资源匹配的优先级更高。

而生产环境下，`/server/public` 将是唯一的静态资源文件夹

<a id="markdown-生产环境下运行" name="生产环境下运行"></a>
### 生产环境下运行

```bash
npm run build   # 构建生产环境静态资源，将会更新 /public 文件下的资源
npm run prd     # 启动 pm2
```

<a id="markdown-开发注意事项" name="开发注意事项"></a>
## 开发注意事项

<a id="markdown-1-react-在服务端的生命周期和客户端的不同" name="1-react-在服务端的生命周期和客户端的不同"></a>
### 1. React 在服务端的生命周期和客户端的不同

服务端中 React 的生命周期只走到了 `componentWillMount()`。但是在客户端 React 拥有着完整的生命周期。

<a id="markdown-2-node-环境中是不具备-dom-和-bom-相关api" name="2-node-环境中是不具备-dom-和-bom-相关api"></a>
### 2. Node 环境中是不具备 DOM 和 BOM 相关API

`/common` 中的同构代码在 Node 环境和浏览器环境下都会执行一遍，因此一定要注意的是，Node 没有 `window` `document` 等对象以及相关 API，如果在 Node 环境下执行了便会报错。

但是我们在很多场景下还是需要用到 DOM 和 BOM 的 API，这里还是有一些处理技巧的：

- Node 中 React 生命周期只会走到 `componentWillMount`，因此我们可以将一些 DOM 操作放在该生命周期之后的一些钩子中，比如在 `componentDidMount` 中来执行 DOM 或 BOM 的 API。
- 或者，我们可以使用一些安全判断来保证只在浏览器环境下才执行 DOM 操作。
  ```js
  // node 中没有 document 全局对象，因此便不会执行括号中的代码。
  if (document) {
    document.querySelector('#example').classList.add('hide');
  }
  ```

<a id="markdown-3-生产环境和开发环境下的静态文件来源的不同" name="3-生产环境和开发环境下的静态文件来源的不同"></a>
### 3. 生产环境和开发环境下的静态文件来源的不同

在生产环境下，默认使用 `/server/public` 文件夹作为静态资源文件夹。

但是在开发环境下，我们在 `koa-static` 中间件之前引入了 `webpack-dev-middleware` 中间件，这样 webpack 生产的静态资源便有着更高的匹配优先级。

**因此在开发环境下，我们会优先使用来自 webpack-dev-middleware 打包出的静态资源。**

<a id="markdown-开发帮助" name="开发帮助"></a>
## 开发帮助

<a id="markdown-我该怎么在该脚手架的基础上继续开发页面" name="我该怎么在该脚手架的基础上继续开发页面"></a>
### 我该怎么在该脚手架的基础上继续开发页面？

`/common` 是 React 的同构文件夹，全部的 React 逻辑都应该写在这个文件中，并将 `/common/App.jsx` 作为同构部分的入口文件。

我们需要将将全部的组件都写在 `/common` 文件夹下，写组件时还是依照之前的纯前端开发方式，然后将 `/common/App.jsx` 作为根组件即可。

<a id="markdown-如何正确的引入样式文件" name="如何正确的引入样式文件"></a>
### 如何正确的引入样式文件?

请使用 `require` 而不是 `import` 来引入样式文件。

由于服务端无法处理也无须处理样式文件，我们便使用了 babel-register 的插件 babel-plugin-transform-require-ignore 来忽略掉 `['.css', '.less', '.sass', '.scss']` 这些后缀的文件。由于该插件的限制，我们必须要使用 `require` 命令来引入样式文件才能使这个插件正常工作。

在打包前端静态资源的时候，webpack 的 loader 会去处理对应的样式文件，目前默认支持 Less 和 Sass 样式处理器。

<a id="markdown-我想新增几个页面" name="我想新增几个页面"></a>
### 我想新增几个页面

如果不准备使用 Redux 的话，只需要在 `/common` 中写好 React Router 的逻辑即可。

搭配 Redux 使用的话，请先参考 [Redux 服务端渲染](http://cn.redux.js.org/docs/recipes/ServerRendering.html)。

`/client/index.jsx` 作为浏览器环境下的入口文件，初始化了客户端的 Redux 初始数据。

服务端的 Redux Store 数据首先在 koa-router 中被创建，然后在 `/server/utils/render.jsx` 中被传递进 `/common/App.jsx` 组件中，然后 React 在服务端中便能像在前端中一样使用 Redux 中的数据了。

```js
// /routes/views/index.js

router.get('*', filterPageRoute, async (ctx) => {
  //..
  // 在服务端创建 Redux Store
  const store = createStore(reducer, ctx.reactState || {}, applyMiddleware(thunk));
  // 通过 renderStaticHtml 方法来讲 store 注入到 React 组件中
  const content = renderStaticHtml({ ctx, store, context });
  //..
});
```

<a id="markdown-nodemon-使用技巧" name="nodemon-使用技巧"></a>
### Nodemon 使用技巧

Nodemon 是一款非常实用的 Node.js 开发工具，它能够用来监控 Node.js 源代码的任何变化和自动重启你的服务器。这里有几个技巧或许可以帮到你。

1. **nodemon 启动后，在终端再次输入 rs 命令可以强制重启 Node.js 服务**

<a id="markdown-qa" name="qa"></a>
## Q&A

<a id="markdown-1-在开发环境下运行页面打开时会出现一瞬间的页面无样式" name="1-在开发环境下运行页面打开时会出现一瞬间的页面无样式"></a>
### 1. 在开发环境下运行，页面打开时会出现一瞬间的页面无样式

在本地开发时，CSS 样式是通过 webpack 的 style-loader 打包在 JS 静态资源中的。待到 JS 静态资源在浏览器端执行时才将 JS 中的样式作为样式表通过 style 标签插入页面中的。

在浏览器请求回 HTML 文档，DOM 解析完毕后，一直到 JS 将样式表插入到页面中的这一段时间，页面会产生暂短的没有样式的情况。**这是开发环境下特有的一种情况。**

在生产环境下，webpack 会将 CSS 作为单独的一个文件打包出来，因此**生产环境下不会有这个问题。**

<a id="markdown-2-报错-window-is-not-defined-或-document-is-not-defined" name="2-报错-window-is-not-defined-或-document-is-not-defined"></a>
### 2. 报错 'window is not defined' 或 'document is not defined'

参考 [注意事项 - Node 环境中是不具备 DOM 和 BOM 相关API](#markdown-2-node-环境中是不具备-dom-和-bom-相关api)

<a id="markdown-3-暂不支持文件修改后自动刷新页面" name="3-暂不支持文件修改后自动刷新页面"></a>
### 3. 暂不支持文件修改后自动刷新页面

目前是用 nodemon 来检测 js 变动来重启 node 服务。目前并没有计划加入浏览器自动刷新的功能。
