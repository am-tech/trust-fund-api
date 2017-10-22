const campaigns = require('./campaigns');
const persons = require('./persons');

module.exports = (app) => {
  app.use(campaigns.routes());
  app.use(persons.routes());
};
