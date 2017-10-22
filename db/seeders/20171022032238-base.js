const v4 = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userOneId = v4();
    const userTwoId = v4();

    await queryInterface.bulkInsert('persons', [
      {
        id: userOneId,
        firstName: 'Adrienne',
        lastName: 'Tacke',
        email: 'adrienne.tacke@gmail.com',
      },
      {
        id: userTwoId,
        firstName: 'Mario',
        lastName: 'Tacke',
        email: 'tacke.mario@gmail.com',
      },
    ]);

    await queryInterface.bulkInsert('campaigns', [
      {
        id: v4(),
        personId: userOneId,
        name: 'Sample Campaign',
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('campaigns', null, {});
    await queryInterface.bulkDelete('persons', null, {});
  },
};
