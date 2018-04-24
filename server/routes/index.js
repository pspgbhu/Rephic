const router = require('koa-router')();
const viewsRoutes = require('./views');
const apiRoutes = require('./api');

router.use(viewsRoutes.routes());
router.use(apiRoutes.routes());

module.exports = router;
