const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Coaster = require('./Coaster');

const Manufacturer = sequelize.define('manufacturer',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  manufacturerName:{
    type:Sequelize.STRING,
    allowNull: false
  }
});

Coaster.belongsTo(Manufacturer);
Manufacturer.hasMany(Coaster);



module.exports = Manufacturer;
