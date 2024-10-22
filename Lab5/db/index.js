const { Sequelize } = require('sequelize')

module.exports = {
    sequelize: new Sequelize('dblab', 'root', 'root', {
        host: '127.0.0.1',
        port: 3306
    })
}