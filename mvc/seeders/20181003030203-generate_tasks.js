'use strict';
// sequelize db:seed:all
// sequelize db:seed:undo
// sequelize db:seed:undo:all
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tasks', [
      { id: 1, description: 'Save the backend course', createdAt: new Date(), updatedAt: new Date()},
      { id: 2, description: 'Edit the videos of backend course', createdAt: new Date, updatedAt: new Date()},
      { id: 3, description: 'Upload the videos', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tasks', null, {});
  }
};
