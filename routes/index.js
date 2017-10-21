const campaigns = require('./campaigns');

module.exports = (app) => {
  app.use(campaigns.routes());
};
