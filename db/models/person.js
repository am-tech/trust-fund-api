const Campaigns = require('./campaign');

module.exports = (sequelize, DataTypes) => {
  const Persons = sequelize.define('Persons', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    tableName: 'persons',
  });

  Persons.associate = function (models) {
    Persons.hasMany(models.Campaigns, {
      foreignKey: 'personId',
      as: 'campaigns',
    });
  };

  Persons.findById = function (id) {
    return this.find({
      where: {
        id,
      },
      include: [
        { model: sequelize.models.Campaigns, as: 'campaigns' }
      ]
    });
  };

  Persons.findByUsername = function (username) {
    return this.find({
      where: {
        email: username.toLowerCase(),
      },
    });
  };

  return Persons;
};
