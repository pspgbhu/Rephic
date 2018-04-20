const _ = require('lodash');
const router = require('koa-router')();
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

module.exports = router;
