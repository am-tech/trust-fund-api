const pledges = require('./pledges');
const items = require('./items');

const router = require('koa-router')({
  prefix: '/campaigns',
});

router.get('/', async (context) => {
  context.body = {};
});

router.get('/:id', async (context) => {
  context.body = {
    id: context.params.id,
  };
});

router.use('/:id', pledges.routes());
router.use('/:id', items.routes());

module.exports = router;
