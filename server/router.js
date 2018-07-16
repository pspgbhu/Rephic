const base = require('./controller/views/base');
const author = require('./controller/views/author');
const authorInfo = require('./controller/api/authorInfo');

const router = require('koa-router')();

router
  /**
   * 可以增加路由对一些页面进行额外的处理和数据传递
   */
  .get('/author', author)

  /**
   * 通常将这条路由规则防止在所有的页面路由之后，对页面路由进行统一的最终处理。
   *
   * 这个路由会匹配大部分的网络请求，下述情况除外：
   * 1. 路径中含有 “.” 符号
   * 2. 以 /api 开头的请求
   */
  .get(/^\/(?!api)[^.]*$/, base)

  /**
   * 以 /api 开头的路由都不会被上面第一条 base 路由所处理。
   */
  .get('/api/authorInfo', authorInfo);

module.exports = router;
