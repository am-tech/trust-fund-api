const router = require('koa-router')({
  prefix: '/persons',
});

router.get('/:id', async (context) => {
  context.body = {};
});

module.exports = router;
