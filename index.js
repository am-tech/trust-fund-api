const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const errors = require('./middlewares/errors');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = new Koa();

if (process.env.NODE_ENV !== 'production') {
  app.use(require('koa-morgan')('combined'));
}

app.use(bodyParser());
app.use(errors());

routes(app);

app.listen(PORT, () => console.log(`Trust Fund API running on ${PORT}`));
