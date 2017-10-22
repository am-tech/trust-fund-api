const router = require('koa-router')({
  prefix: '/pledges',
});

router.get('/', async (context) => {
  context.body = {};
});

module.exports = router;
