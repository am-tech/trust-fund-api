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
  '/:campaignId',
  validate({
    params: Joi.object().keys({
      campaignId: Joi.string().guid(),
    }),
  }),
  async (context) => {
    const { campaignId } = context.params;

    const campaign = await Campaigns.findById(campaignId);

    if (!campaign) {
      context.throw(404);
    }

    context.body = campaign;
  }
);

router.use('/:campaignId', pledges.routes());
router.use('/:campaignId', items.routes());

module.exports = router;
