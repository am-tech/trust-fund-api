const auth = require('./auth');
const campaigns = require('./campaigns');
const persons = require('./persons');

module.exports = (app) => {
  app.use(auth.routes());
  app.use(campaigns.routes());
  app.use(persons.routes());
};
