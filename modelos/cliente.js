const { DataTypes } = require('sequelize')
const sequelize = require('../banco')

const Cliente = sequelize.define(
    'Cliente',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,  // Auto-generate UUIDv4
            allowNull: false
        },
        // Model attributes are defined here
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        documento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dataNascimento: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
    {
        timestamps: true
    },
)

module.exports = Cliente