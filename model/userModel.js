import Sequelize from 'sequelize'
import sequelize from '../db/db'

exports.User = sequelize.define('user', {
    studentID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
            isEmail: true,
        },
        get() {
            return this.getDataValue('email');
        }
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    class: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    getterMethods: {
        fullName() {
            return this.firstName + ' ' + this.lastName
        }
    },

    setterMethods: {
        fullName(value) {
            const names = value.split(' ');
            this.setDataValue('firstName', names.slice(0, -1).join(' '));
            this.setDataValue('lastName', names.slice(-1).join(' '));
        },
    }
},{
    tableName: 'users',
    timestamps: true,
});