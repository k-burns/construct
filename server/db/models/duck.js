const Sequelize = require('sequelize')
const db = require('../db')

const Duck = db.define('duck', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Duck
