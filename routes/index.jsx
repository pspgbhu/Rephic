import Router from 'koa-router';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

import Routes from '../assets/src/routes';

const router = Router();

router.get('*', async (ctx) => {
  const content = renderToString((
    <StaticRouter location={ctx.url}>
      <Routes></Routes>
    </StaticRouter>
  ));

  await ctx.render('index', {
    html: content,
    title: '你好',
  });
});


module.exports = router;
