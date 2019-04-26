const Sequelize = require('sequelize');
const sequelize = new Sequelize('my_spitzm2_rides','my.spitzm2','Bl4ckB3lt100!',{
  host:'deltona.birdnest.org',
  dialect: 'mysql'
});

module.exports = sequelize;
