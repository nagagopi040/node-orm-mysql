const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    database: 'sampledb',
    username: 'root',
    password: null,
    dialect: 'mysql'
});

module.exports = sequelize