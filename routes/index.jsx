import Router from 'koa-router';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import Routes from '../client/routes';

const router = Router();

router.get('*', filterPageRoute, async (ctx) => {
  const context = {};
  const content = renderToString((
    <StaticRouter location={ctx.url} context={context}>
      <Routes></Routes>
    </StaticRouter>
  ));

  await ctx.render('index', {
    html: content,
    title: 'React Isomorphic',
  });
});

/**
 * 将静态资源过滤出去
 */
async function filterPageRoute(ctx, next) {
  // .xxx 结尾的不是页面路径
  if (ctx.path.match(/\.\w*$/)) {
    console.log('Not Page Url'); // eslint-disable-line
    return;
  }
  await next();
}

module.exports = router;
