const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const { renderToString } = require('react-dom/server');
const { App, reducer } = require('../../../client/app/entry/server');

module.exports = async (ctx, next) => {
  const context = {};
  // 在服务端创建 Redux Store
  const store = createStore(reducer, ctx.reactState || {}, applyMiddleware(thunk));
  // 生成 html 字符串
  const content = renderToString(App({ ctx, store, context }));
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
};
