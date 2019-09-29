'use strict';
module.exports = (sequelize, DataTypes) => {
  const chat_room_user = sequelize.define('chat_room_user', {
    userId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    active: DataTypes.INTEGER
  }, {});
  chat_room_user.associate = function(models) {
    // associations can be defined here
    //chat_room_user.belongsTo(models.chat_room)
  };
  return chat_room_user;
};