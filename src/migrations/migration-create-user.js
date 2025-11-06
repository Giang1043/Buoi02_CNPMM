module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.createTable('users', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                email: {
                    type: Sequelize.STRING
                },
                password: {
                    type: Sequelize.STRING
                },
                firstName: {
                    type: Sequelize.STRING
                },
                lastName: {
                    type: Sequelize.STRING
                },
                address: {
                    type: Sequelize.STRING
                },
                gender: {
                    type: Sequelize.BOOLEAN
                },
                roleId: {
                    type: Sequelize.STRING
                },
                phoneNumber: {
                    type: Sequelize.STRING
                },
                positionId: {
                    type: Sequelize.STRING
                },
                image: {
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
            })
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.dropTable('users')
        ]);
    }
};