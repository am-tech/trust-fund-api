const Joi = require('joi');

const { Persons } = require('../db/models');
const { validate } = require('../middlewares/validation');

const router = require('koa-router')({
  prefix: '/persons',
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

    const person = await Persons.findById(id);

    if (!person) {
      context.throw(404);
    }

    context.body = person;
  }
);

module.exports = router;
