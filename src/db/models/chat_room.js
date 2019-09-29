'use strict';
module.exports = (sequelize, DataTypes) => {
  const chat_room = sequelize.define('chat_room', {
    petId: DataTypes.INTEGER
  }, {});
  chat_room.associate = function(models) {
    // associations can be defined here
    chat_room.hasMany(models.chat_room_user, {
      foreignKey: 'roomId',
      as: 'User'
    }),

    chat_room.hasMany(models.chat_room_message, {
      foreignKey: 'roomId',
      as: 'Messages'
    })
  };
  return chat_room;
};