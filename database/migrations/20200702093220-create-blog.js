const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Blogs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      writer: {
        type: Sequelize.UUID,
      },
      title: {
        type: Sequelize.STRING(100),
      },
      review: {
        type: Sequelize.STRING(255),
      },
      body: {
        type: Sequelize.STRING(255),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    return queryInterface.addConstraint('Blogs', {
      fields: ['writer'],
      type: 'foreign key',
      name: 'FK_Blog_User',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  down: (queryInterface) => queryInterface.dropTable('Blogs'),
};
