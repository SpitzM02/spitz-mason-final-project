const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');


const Coaster = sequelize.define('coasters',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  coasterName:{
    type:Sequelize.STRING,
    allowNull: false
  },
  park:{
    type: Sequelize.STRING,
    allowNull: false
  },
  image:{
    type: Sequelize.STRING,
    allowNull:false
  },
  Description:{
    type:Sequelize.STRING,
    allowNull:false
  }
});

module.exports = Coaster;
