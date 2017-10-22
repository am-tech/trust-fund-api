module.exports = (sequelize, DataTypes) => {
  const Campaigns = sequelize.define('Campaigns', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    personId: {
      type: DataTypes.UUID,
      references: {
        model: 'persons',
        key: 'id',
      },
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'campaigns',
    classMethods: {
      associate: (models) => {
        Campaigns.belongsTo(models.Persons, {
          foreignKey: 'personId',
        });
      },
      findById: function (id) {
        return this.find({
          where: {
            id,
          },
        });
      }
    },
  });

  return Campaigns;
};
