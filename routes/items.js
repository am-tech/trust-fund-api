const Joi = require('joi');

const { Items } = require('../db/models');
const { validate } = require('../middlewares/validation');

const router = require('koa-router')({
  prefix: '/items',
});

router.get(
  '/',
  validate({
    params: Joi.object().keys({
      campaignId: Joi.string().guid(),
    }),
  }),
  async (context) => {
    const { campaignId } = context.params;

    const items = await Items.findByCampaignId(campaignId);

    context.body = items;
  }
);

router.get(
  '/:id',
  validate({
    params: Joi.object().keys({
      id: Joi.string().guid(),
    }),
  }),
  async (context) => {
    const { id } = context.params;

    const item = await Items.findById(id);

    if (!item) {
      context.throw(404);
    }

    context.body = item;
  }
);

module.exports = router;
