module.exports = (sequelize, DataTypes) => {
  const Campaigns = sequelize.define('Campaigns', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    personId: DataTypes.UUID,
    name: DataTypes.STRING,
  }, {
    tableName: 'campaigns',
  });

  Campaigns.associate = function (models) {
    Campaigns.belongsTo(models.Persons, {
      foreignKey: 'personId',
      as: 'person',
    });

    Campaigns.hasMany(models.Items, {
      foreignKey: 'campaignId',
      as: 'items',
    });
  };

  Campaigns.findById = function (id) {
    return this.find({
      where: {
        id,
      },
      include: [
        { model: sequelize.models.Items, as: 'items' },
      ],
    })
  };

  return Campaigns;
};
