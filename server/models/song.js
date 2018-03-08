'use strict';
module.exports = function(sequelize, DataTypes) {
  var Song = sequelize.define('Song', {
    song: DataTypes.STRING,
    song_id: DataTypes.STRING,
    uri: DataTypes.TEXT,
    artwork: DataTypes.STRING,
    votes_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Song;
};
