const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const db = {};
const modelsPath = path.join(__dirname);

const logging = process.env.DATABASE_LOGGING === 'true' ? console.log : false;

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging,
    omitNull: false,
    define: {
      freezeTableName: true,
    },
  },
);

fs
  .readdirSync(modelsPath)
  .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(modelsPath, file));

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;

module.exports = db;
