const { DataTypes } = require('sequelize')
const sequelize = require('../banco')

const Aposta = sequelize.define(
    'Aposta',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,  // Auto-generate UUIDv4
            allowNull: false
        },
        // Model attributes are defined here
        idCliente: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        evento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        valor: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        timestamps: true
    },
)

module.exports = Aposta