module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define('Items', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    campaignId: DataTypes.UUID,
    name: DataTypes.STRING,
  }, {
    tableName: 'items',
  });

  Items.associate = function (models) {
    Items.belongsTo(models.Campaigns, {
      foreignKey: 'campaignId',
      as: 'campaign',
    });

    Items.hasMany(models.Pledges, {
      foreignKey: 'itemId',
      as: 'pledges',
    })
  };

  Items.findByCampaignId = function (campaignId) {
    return this.findAll({
      where: {
        campaignId,
      },
      include: [
        { model: sequelize.models.Pledges, as: 'pledges' },
      ],
    });
  };

  return Items;
};
