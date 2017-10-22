const Joi = require('joi');

const pledges = require('./pledges');
const items = require('./items');
const { Persons } = require('../db/models');
const { validate } = require('../middlewares/validation');

const router = require('koa-router')({
  prefix: '/auth',
});

router.post(
  '/login',
  validate({
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  async (context) => {
    const { username, password } = context.request.body;

    const person = await Persons.findByUsername(username);

    if (!person) {
      context.throw(401);
    }

    // HACK: Not using a real password/hashing/validation
    if (password !== 'password') {
      context.throw(401);
    }

    context.body = person;
  }
);

module.exports = router;
