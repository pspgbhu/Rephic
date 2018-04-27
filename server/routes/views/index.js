const router = require('koa-router')();
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const renderStaticHtml = require('../../utils/render').default;
const reducer = require('../../../common/reducers').default;
const routeAuthor = require('./author');

router.use(routeAuthor.routes());

/**
 * 任何请求都会打到这条路由上返回统一的默认页面。
 * 下述情况除外：
 * 1. 路径中含有 “.” 符号
 * 2. 以 /api 开头的请求
 */
router.get(/^\/(?!api)[^.]*$/, async (ctx, next) => {
  const context = {};
  // 在服务端创建 Redux Store
  const store = createStore(reducer, ctx.reactState || {}, applyMiddleware(thunk));
  // 生成 html 字符串
  const content = renderStaticHtml({ ctx, store, context });
  // 从 Store 中获取 State 对象
  const preloadedState = store.getState();

  // 渲染页面
  await ctx.render('index', {
    title: 'React Isomorphic',
    NODE_ENV: process.env.NODE_ENV,
    html: content,
    state: JSON.stringify(preloadedState),
  });

  await next();
});


module.exports = router;
