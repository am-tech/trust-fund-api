const Joi = require('joi');

const pledges = require('./pledges');
const items = require('./items');
const { Campaigns } = require('../db/models');
const { validate } = require('../middlewares/validation');

const router = require('koa-router')({
  prefix: '/campaigns',
});

router.get('/browse', async (context) => {
  const campaigns = await Campaigns.findAll();

  context.body = campaigns;
});

router.get(
  '/:id',
  validate({
    params: Joi.object().keys({
      id: Joi.string().guid(),
    }),
  }),
  async (context) => {
    const { id } = context.params;

    const campaign = await Campaigns.findById(id);

    if (!campaign) {
      context.throw(404);
    }

    context.body = campaign;
  }
);

router.use('/:id', pledges.routes());
router.use('/:id', items.routes());

module.exports = router;
