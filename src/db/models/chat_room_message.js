'use strict';
module.exports = (sequelize, DataTypes) => {
  const chat_room_message = sequelize.define('chat_room_message', {
    userId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {});
  chat_room_message.associate = function(models) {
    // associations can be defined here
    
  };
  return chat_room_message;
};