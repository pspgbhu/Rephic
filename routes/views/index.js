const router = require('koa-router')();
const _ = require('lodash');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const renderStaticHtml = require('../../utils/render').default;
const reducer = require('../../common/reducers').default;
const { getAuthorInfo } = require('../../controllers');

/**
 * 可以增加路由对一些页面进行额外的处理和数据传递
 */
router.get('/author', async (ctx, next) => {
  // 异步获取数据
  const authorInfo = await getAuthorInfo();

  // 设置初始的 Redux 数据
  ctx.reactState = _.merge({
    authorInfo,
  }, ctx.reactState);

  // 交出 router 控制权
  await next();
});


/**
 * 返回统一的默认页面
 */
router.get('*', filterPageRoute, async (ctx) => {
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
});


/**
 * 通常一些静态资源都会通过 Nginx 直接处理掉了，但是我们还是在 Node 里做了额外的处理。
 *
 * 将那些不属于页面地址的链接过滤出去，不进行路由处理。
 */
async function filterPageRoute(ctx, next) {
  // .xxx 结尾的不是 React 路由路径
  if (ctx.path.match(/\.\w*$/)) {
    return;
  }
  await next();
}

module.exports = router;
