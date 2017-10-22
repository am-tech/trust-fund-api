const Joi = require('joi');
const ProductApi = require('amazon-product-api');

const pledges = require('./pledges');
const items = require('./items');
const { Persons } = require('../db/models');
const { validate } = require('../middlewares/validation');

const router = require('koa-router')({
  prefix: '/products',
});

const client = ProductApi.createClient({
  awsId: process.env.AMAZON_PRODUCT_API_KEY,
  awsSecret: process.env.AMAZON_PRODUCT_API_SECRET,
});

router.get(
  '/',
  validate({
    query: Joi.object().keys({
      search: Joi.string().required(),
    }),
  }),
  async (context) => {
    const { search } = context.request.query;

    const products = await client.itemSearch({
      keywords: search,
      responseGroup: 'ItemAttributes,Images'
    });

    const filteredProducts = products.map((product) => {
      const image = product.MediumImage;

      return {
        asin: product.ASIN[0],
        imageUrl: image ? image[0].URL[0] : null,
        price: product.ItemAttributes[0].ListPrice[0].Amount[0],
        title: product.ItemAttributes[0].Title[0],
        upc: product.ItemAttributes[0].UPC[0]
      };
    });

    context.body = filteredProducts;
  }
);

module.exports = router;
