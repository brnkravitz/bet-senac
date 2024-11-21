const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite'
    }
)

async function conectarBanco() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

conectarBanco()

module.exports = sequelize