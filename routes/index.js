import Router from 'koa-router';
import { createStore } from 'redux';
import renderStaticHtml from '../utils/render';
// import { getAuthorInfo } from '../controllers';

const router = Router();

/**
 * 可以增加路由对一些页面进行额外的处理和数据传递
 */
// router.get('/author', async (ctx) => {
//   const context = {};
//   const store = createStore(state => state, { info: await getAuthorInfo() });
//   const content = renderStaticHtml({ ctx, store, context });
//   const preloadedState = store.getState();

//   await ctx.render('index', {
//     NODE_ENV: process.env.NODE_ENV,
//     html: content,
//     state: JSON.stringify(preloadedState),
//   });
// });


/**
 * 返回统一的默认页面
 */
router.get('*', filterPageRoute, async (ctx) => {
  const context = {};
  const store = createStore(state => state, {});
  const content = renderStaticHtml({ ctx, store, context });
  const preloadedState = store.getState();

  await ctx.render('index', {
    NODE_ENV: process.env.NODE_ENV,
    html: content,
    state: JSON.stringify(preloadedState),
  });
});


/**
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
