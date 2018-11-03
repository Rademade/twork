'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Project', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      workspaceId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    queryInterface.createTable('Subscription', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      endpoint: {
        type: Sequelize.STRING
      },
      auth: {
        type: Sequelize.STRING
      },
      p256dh: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    queryInterface.createTable('User', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      googleId: { type: Sequelize.STRING },
      imgUrl: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING },
      auth: { type: Sequelize.STRING },
      userId: { type: Sequelize.STRING },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    queryInterface.createTable('Workspace', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    queryInterface.createTable('WorkspaceUser', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      workspaceId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    queryInterface.createTable('TimeEntry', {
      id: {
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      billable: { type: Sequelize.BOOLEAN },
      description: { type: Sequelize.STRING },
      startedAt: { type: Sequelize.DATE },
      stoppedAt: { type: Sequelize.DATE },
      userId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      projectId: { type: Sequelize.UUID },
      workspaceId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    return;
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Project');
    queryInterface.dropTable('Subscription');
    queryInterface.dropTable('Workspace');
    queryInterface.dropTable('Workspace_user');
    queryInterface.dropTable('TimeEntry');
    return queryInterface.dropTable('User');
  }
};