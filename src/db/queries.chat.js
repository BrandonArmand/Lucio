const Room = require("./models").chat_room;
const User = require("./models").chat_room_user;
const Messages = require("./models").chat_room_message;

module.exports = {
  getAllRooms(user, callback){
    return User.sequelize.query(`
      select "chat_room_users"."roomId", "Pets"."name", "Pets"."tag"
      from "chat_room_users" 
        inner join "chat_rooms" 
          on "chat_room_users"."roomId" = "chat_rooms"."id" 
        inner join "Pets" on "Pets"."id" = "chat_rooms"."petId" 
      where "userId" = ? and "active" = 1`, 
    {
      replacements: [user.id],
      type: User.sequelize.QueryTypes.SELECT
    })
    .then(room=>{
      callback(null,room)
    })
    .catch(err => {
      callback(err)
    })
  },

  getMessages(room, callback){
    return Messages.sequelize.query(`
      select "Users"."name", "chat_room_messages"."message" 
      from "chat_room_messages" 
        inner join "Users" on "Users"."id" = "chat_room_messages"."userId" 
      where "roomId" = ?`,
    {
      replacements: [room],
      type: Messages.sequelize.QueryTypes.SELECT
    })
    .then(messages=>{
      callback(null, messages)
    })
    .catch(err=>{
      callback(err)
    })
  },

  sendMessage(user, message, room, callback){
    return Messages.create({
      roomId: room,
      userId: user.id,
      message: message
    })
    .then(msg=>{
      callback(null, msg)
    })
    .catch(err=>{
      callback(err)
    })
  },

  leaveRoom(user, room, callback){
    return User.destroy({
      where: {
        userId: user.id,
        roomId: room
      }
    })
    .then(res=>{
      callback(null, res)
    })
    .catch(err=>{
      callback(err)
    })
  }
}