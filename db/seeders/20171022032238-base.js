const v4 = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const personOneId = v4();
    const personTwoId = v4();
    const campaignOneId = v4();
    const itemOneId = v4();

    await queryInterface.bulkInsert('persons', [
      {
        id: personOneId,
        firstName: 'Adrienne',
        lastName: 'Tacke',
        email: 'adrienne.tacke@gmail.com',
      },
      {
        id: personTwoId,
        firstName: 'Mario',
        lastName: 'Tacke',
        email: 'tacke.mario@gmail.com',
      },
    ]);

    await queryInterface.bulkInsert('campaigns', [
      {
        id: campaignOneId,
        personId: personOneId,
        name: 'Sample Campaign',
      },
    ]);

    await queryInterface.bulkInsert('items', [
      {
        id: itemOneId,
        campaignId: campaignOneId,
        name: 'Red Shoes',
      },
    ]);

    await queryInterface.bulkInsert('pledges', [
      {
        id: v4(),
        personId: personTwoId,
        itemId: itemOneId,
        name: 'Pledge 1',
      },
      {
        id: v4(),
        personId: personTwoId,
        itemId: itemOneId,
        name: 'Pledge 2',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('pledges', null, {});
    await queryInterface.bulkDelete('items', null, {});
    await queryInterface.bulkDelete('campaigns', null, {});
    await queryInterface.bulkDelete('persons', null, {});
  },
};
