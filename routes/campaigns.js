const router = require('koa-router')({
  prefix: '/campaigns',
});

router.get('/', async (context) => {
  context.body = {};
});

module.exports = router;
