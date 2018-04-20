const router = require('koa-router')();
const viewsRoutes = require('./views');
const apiRoutes = require('./api');

router.use(apiRoutes.routes());
router.use(viewsRoutes.routes());

module.exports = router;
