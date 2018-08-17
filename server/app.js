const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const serve = require('koa-static');
const router = require('./router');

const app = new Koa();

console.log('[Rephic] process.env.NODE_ENV ===', process.env.NODE_ENV);

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
app.use(logger());

if (process.env.NODE_ENV !== 'production') {
  app.use(serve(path.join(__dirname, '../node_modules/.cache/rephic/public')));
}

app.use(serve(path.join(__dirname, 'public')));

app.use(views(path.join(__dirname, 'views'), {
  map: {
    html: 'ejs',
  },
  extension: 'ejs',
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(router.routes(), router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
