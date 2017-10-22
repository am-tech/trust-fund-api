module.exports = (sequelize, DataTypes) => {
  const Pledges = sequelize.define('Pledges', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    personId: DataTypes.UUID,
    itemId: DataTypes.UUID,
    name: DataTypes.STRING,
  }, {
    tableName: 'pledges',
  });

  Pledges.associate = function (models) {
    Pledges.belongsTo(models.Persons, {
      foreignKey: 'personId',
      as: 'person',
    });

    Pledges.belongsTo(models.Items, {
      foreignKey: 'itemId',
      as: 'item',
    });
  }

  return Pledges;
};
