const router = require('koa-router')({
  prefix: '/items',
});

router.get('/', async (context) => {
  context.body = {};
});

module.exports = router;
