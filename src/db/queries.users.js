const User = require("./models").User;
const {genSaltSync, hashSync} = require("bcryptjs");

module.exports = {
  createUser(newUser, callback){
    const salt = genSaltSync();
    const hashedPassword = hashSync(newUser.password, salt);

    return User.create({
      email: newUser.email,
      password: hashedPassword,
      name: newUser.name
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getAllUsers(callback){
    return User.findAll()
    .then((pet) => {
      callback(null, pet);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getUser(user,callback){
    return User.findByPk(user.id)
    .then((user)=>{
      callback(null,user)
    })
    .catch(err => {
      callback(err)
    })
  },
  updateInfo(user, newInfo, callback){
    return user.update(
      {
        name: newInfo.namev || user.name,
        email: newInfo.email || user.email,
        phone: newInfo.phone || user.phone,
        address: newInfo.address || user.address
      },
      {returning: true}
    )
    .then((user)=>{
      callback(null,user)
    })
    .catch(err => {
      callback(err)
    })
  }
}